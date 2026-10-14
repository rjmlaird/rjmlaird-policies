import { site } from "../data/site";
import { policyRegister, nextReviewDue } from "../data/policy-register";
import { processors, processingActivities } from "../data/processors";
import { cookies } from "../data/cookies";
import { retention } from "../data/retention";
import { cookieCategoryLabels } from "../schemas/cookie";
import { transferMechanismLabels } from "../schemas/processor";
import {
  INCLUDE_NAMES,
  VARIABLE_PATTERN,
  findTodos,
  hasTodo,
  todo,
  type IncludeName,
} from "./placeholders";

export interface RenderContext {
  site: typeof site;
  policy: Record<string, Record<string, string | null>>;
}

export interface RenderResult {
  /** Markdown with variables resolved and includes expanded. Frontmatter removed. */
  markdown: string;
  /** Variables, filters or includes that could not be resolved. Always a wiring bug. */
  missing: string[];
  /** Outstanding [[TODO: …]] markers in the rendered output. */
  todos: string[];
}

export function buildContext(): RenderContext {
  const policy: RenderContext["policy"] = {};
  for (const p of policyRegister) {
    policy[p.slug] = {
      title: p.title,
      route: p.route,
      version: p.version,
      status: p.status,
      created: p.created,
      lastUpdated: p.lastUpdated,
      lastReviewed: p.lastReviewed,
      nextReview: nextReviewDue(p),
    };
  }
  return { site, policy };
}

export function stripFrontmatter(raw: string): string {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
}

export function formatDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(iso));
}

/** Matches github-slugger for plain headings, which is what Astro's markdown pipeline uses. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\p{M}_\- ]/gu, "")
    .replace(/ /g, "-");
}

/** H2 headings as `{ id, label }`, ready for the LegalNotice layout's `sections` prop. */
export function extractSections(markdown: string): { id: string; label: string }[] {
  return [...markdown.matchAll(/^## +(.+?)\s*#*\s*$/gm)].map((m) => {
    const label = m[1]!.trim();
    return { id: slugifyHeading(label), label };
  });
}

function resolvePath(root: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as object)) return (acc as Record<string, unknown>)[key];
    return undefined;
  }, root);
}

function applyFilter(filter: string, value: string): string | undefined {
  const idx = filter.indexOf(":");
  const name = (idx === -1 ? filter : filter.slice(0, idx)).trim();
  const arg = idx === -1 ? undefined : filter.slice(idx + 1).trim();
  switch (name) {
    case "date":
      return formatDate(value);
    case "mailto":
      return hasTodo(value) ? value : `[${value}](mailto:${value})`;
    case "link":
      return hasTodo(value) ? `${arg ?? ""} ${value}`.trim() : `[${arg ?? value}](${value})`;
    default:
      return undefined;
  }
}

// ---------------------------------------------------------------- includes

const cell = (s: string) => s.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");

function table(headers: string[], rows: string[][]): string {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.map(cell).join(" | ")} |`),
  ].join("\n");
}

const flag = (text: string, needsConfirmation: boolean, what: string) =>
  needsConfirmation && !hasTodo(text) ? `${text} ${todo(what)}` : text;

const publicProcessors = () => processors.filter((p) => p.status === "active" || p.status === "unconfirmed");

function processorName(id: string): string {
  const p = processors.find((x) => x.id === id);
  return p ? flag(p.name, p.status === "unconfirmed", "confirm provider") : todo(`unknown provider ${id}`);
}

function retentionText(ids: string[]): string {
  const rows = ids.map((id) => retention.find((r) => r.id === id));
  if (rows.length === 1) return rows[0]?.period ?? todo(`unknown retention ${ids[0]}`);
  return rows.map((r, i) => (r ? `${r.label}: ${r.period}` : todo(`unknown retention ${ids[i]}`))).join("; ");
}

const includes: Record<IncludeName, () => string> = {
  "processing-activities": () =>
    table(
      ["Activity", "Information used", "Purpose and lawful basis", "Recipients and retention"],
      processingActivities.map((a) => {
        const named = a.processorIds.map(processorName);
        const recipients = [a.recipientsNote, named.length ? `Named providers: ${named.join(", ")}.` : ""]
          .filter(Boolean)
          .join(" ");
        return [
          a.activity,
          a.data,
          `**Purpose:** ${a.purpose}<br>**Lawful basis:** ${a.lawfulBasisNote}`,
          `**Recipients:** ${recipients || "None beyond those described in this notice."}<br>**Retention:** ${retentionText(a.retentionIds)}`,
        ];
      }),
    ),

  processors: () =>
    table(
      ["Provider", "What it does", "Information involved", "Location", "Privacy information"],
      publicProcessors().map((p) => [
        flag(p.name, p.status === "unconfirmed", "confirm provider"),
        p.function,
        p.dataCategories.join(", "),
        p.location,
        p.privacyUrl ? `[Privacy notice](${p.privacyUrl})` : "—",
      ]),
    ),

  transfers: () =>
    table(
      ["Provider", "Destination", "Safeguard"],
      publicProcessors().map((p) => [
        flag(p.name, p.status === "unconfirmed", "confirm provider"),
        p.location,
        p.transferMechanism === "unknown" ? todo("confirm transfer mechanism") : transferMechanismLabels[p.transferMechanism],
      ]),
    ),

  retention: () =>
    retention
      .filter((r) => r.listedInNotice)
      .map((r) => `- **${r.label}:** ${r.period}`)
      .join("\n"),

  "cookie-inventory": () =>
    table(
      ["Category", "Name or technology", "Provider", "Purpose", "Duration", "Consent position"],
      cookies.map((c) => [
        cookieCategoryLabels[c.category],
        flag(c.name, c.status !== "verified", "verify in cookie audit"),
        c.provider,
        c.purpose,
        c.duration,
        c.consentPosition,
      ]),
    ),

  "cookie-preferences": () => {
    const button = `<p><button type="button" data-open-cookie-preferences>Manage cookie preferences</button></p>`;
    return site.consent.managerConfigured
      ? button
      : `${button}\n\n${todo("connect this button to your consent platform, or remove it and state that only essential technologies are used")}`;
  },
};

// ---------------------------------------------------------------- render

export function renderPolicyMarkdown(raw: string, ctx: RenderContext = buildContext()): RenderResult {
  const missing: string[] = [];

  const markdown = stripFrontmatter(raw).replace(VARIABLE_PATTERN, (_m, exprRaw: string) => {
    const expr = exprRaw.trim();

    if (expr.startsWith("include:")) {
      const name = expr.slice("include:".length).trim();
      if (!(INCLUDE_NAMES as readonly string[]).includes(name)) {
        missing.push(expr);
        return todo(`unknown include ${name}`);
      }
      return includes[name as IncludeName]();
    }

    const [path = "", ...filters] = expr.split("|").map((s) => s.trim());
    const value = resolvePath(ctx, path);
    if (value === undefined || value === null || typeof value === "object") {
      missing.push(path);
      return todo(`missing ${path}`);
    }

    let text = String(value);
    for (const f of filters) {
      const next = applyFilter(f, text);
      if (next === undefined) {
        missing.push(`${path} | ${f}`);
        return todo(`unknown filter ${f}`);
      }
      text = next;
    }
    return text;
  });

  return { markdown, missing, todos: findTodos(markdown) };
}
