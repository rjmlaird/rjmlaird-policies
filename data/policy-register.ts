import type { PolicyEntry, PolicySlug } from "../schemas/policy";

const markdownFiles = import.meta.glob("./content/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, any> } {
  const match = raw.match(/^---\s*([\s\S]*?)\s*---([\s\S]*)$/);
  if (!match) return { data: {} };
  
  const yamlLines = match[1].split("\n");
  const data: Record<string, any> = {};
  let currentKey: string | null = null;
  let currentArray: string[] | null = null;

  for (const line of yamlLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed.startsWith("- ") && currentKey) {
      if (!currentArray) {
        currentArray = [];
        data[currentKey] = currentArray;
      }
      currentArray.push(trimmed.slice(2).trim().replace(/^['"]|['"]$/g, ""));
      continue;
    }

    const colonIdx = trimmed.indexOf(":");
    if (colonIdx !== -1) {
      currentKey = trimmed.slice(0, colonIdx).trim();
      let val = trimmed.slice(colonIdx + 1).trim();
      currentArray = null;

      if (val === "" || val === "|") continue;

      if (val === "null" || val === "~" || val === "") {
        data[currentKey] = null;
      } else if (val === "true") {
        data[currentKey] = true;
      } else if (val === "false") {
        data[currentKey] = false;
      } else if (!isNaN(Number(val))) {
        data[currentKey] = Number(val);
      } else {
        data[currentKey] = val.replace(/^['"]|['"]$/g, "");
      }
    }
  }

  return { data };
}

const entriesMap = new Map<string, PolicyEntry>();

for (const [path, raw] of Object.entries(markdownFiles)) {
  const { data } = parseFrontmatter(raw);
  if (!data.slug) continue;
  
  const filename = path.split("/").pop() || `${data.slug}.md`;

  entriesMap.set(data.slug, {
    slug: data.slug as PolicySlug,
    group: data.group || "public",
    title: data.title,
    route: data.route || `/${data.slug}/`,
    status: data.status || "draft",
    version: data.version || "0.1.0",
    created: data.created || "2026-10-13",
    lastUpdated: data.lastUpdated || data.created || "2026-10-13",
    lastReviewed: data.lastReviewed !== undefined ? data.lastReviewed : null,
    reviewCadenceMonths: data.reviewCadenceMonths ?? 12,
    owner: data.owner || "Ryan J. M. Laird",
    dependsOn: data.dependsOn,
  });
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