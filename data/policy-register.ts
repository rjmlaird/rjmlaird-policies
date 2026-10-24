import { parse as parseYaml } from "yaml";
import { PolicyEntrySchema, PolicySlugSchema, type PolicyEntry, type PolicySlug } from "../schemas/policy";

const markdownFiles = import.meta.glob("../content/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** Parses the YAML frontmatter block with a real YAML parser (inline arrays, null, quoting all handled). */
function parseFrontmatter(raw: string, file: string): Record<string, unknown> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return {};
  try {
    const data = parseYaml(match[1]!);
    return data && typeof data === "object" ? (data as Record<string, unknown>) : {};
  } catch (err) {
    throw new Error(`Invalid YAML frontmatter in ${file}: ${(err as Error).message}`);
  }
}

const entriesMap = new Map<string, PolicyEntry>();

for (const [path, raw] of Object.entries(markdownFiles)) {
  const file = path.split("/").pop()!;
  const data = parseFrontmatter(raw, file);
  // Only `content/<slug>.md` is canonical. Anything else (unknown slug, or a second file claiming a slug,
  // e.g. Photography___Video.md vs mediaconsent.md) is ignored here and reported by tests/policies.test.ts.
  if (!PolicySlugSchema.safeParse(data.slug).success || file !== `${data.slug}.md`) continue;

  // Validated strictly here so a typo in frontmatter fails loudly instead of defaulting silently.
  const parsed = PolicyEntrySchema.safeParse({ ...data, contentFile: `content/${file}`, owner: data.owner ?? "Ryan J. M. Laird" });
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter in ${file}: ${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`);
  }
  entriesMap.set(parsed.data.slug, parsed.data);
}

const slugOrder: PolicySlug[] = [
  "privacy",
  "cookies",
  "termsofuse",
  "disclaimer",
  "accessibility",
  "security",
  "safeguarding",
  "complaints",
  "termsofservice",
  "cancellation",
  "payments",
  "tutoring",
  "mediaconsent",
  "acceptableuse",
  "aiuse",
  "dataprotection",
  "retention",
  "informationsecurity",
  "photography",
  "conditionsofsale",
  "subscriptions",
  "sla",
];

export const policyRegister: readonly PolicyEntry[] = slugOrder.map((slug) => {
  const entry = entriesMap.get(slug);
  if (!entry) {
    throw new Error(`Missing policy entry or markdown file for slug: ${slug}`);
  }
  return entry;
});

export function getPolicy(slug: PolicySlug): PolicyEntry {
  const entry = policyRegister.find((p) => p.slug === slug);
  if (!entry) throw new Error(`Unknown policy: ${slug}`);
  return entry;
}

/** lastReviewed (or lastUpdated if never reviewed) plus the review cadence. */
export function nextReviewDue(entry: PolicyEntry): string {
  const d = new Date(`${entry.lastReviewed ?? entry.lastUpdated}T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + entry.reviewCadenceMonths);
  return d.toISOString().slice(0, 10);
}