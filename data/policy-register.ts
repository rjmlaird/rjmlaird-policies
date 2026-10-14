import type { PolicyEntry, PolicySlug } from "../schemas/policy";

const owner = "Ryan J. M. Laird";

/**
 * One entry per policy. This is the source of truth for dates, status, version and routes.
 * Content files carry only `slug` and `title` in frontmatter.
 * `created` for the first four is the earliest date known when the register was set up.
 */
export const policyRegister: readonly PolicyEntry[] = [
  {
    slug: "privacy",
    title: "Privacy notice",
    route: "/privacy/",
    contentFile: "content/privacy.md",
    status: "draft",
    version: "0.1.0",
    created: "2026-10-13",
    lastUpdated: "2026-10-13",
    lastReviewed: null,
    reviewCadenceMonths: 12,
    owner,
    dependsOn: ["site", "processors", "retention"],
  },
  {
    slug: "cookies",
    title: "Cookie notice",
    route: "/cookies/",
    contentFile: "content/cookies.md",
    status: "draft",
    version: "0.1.0",
    created: "2026-10-13",
    lastUpdated: "2026-10-13",
    lastReviewed: null,
    reviewCadenceMonths: 12,
    owner,
    dependsOn: ["site", "cookies"],
  },
  {
    slug: "terms",
    title: "Terms of use",
    route: "/terms-of-use/",
    contentFile: "content/terms.md",
    status: "published",
    version: "0.1.0",
    created: "2026-10-13",
    lastUpdated: "2026-10-13",
    lastReviewed: "2026-10-13",
    reviewCadenceMonths: 12,
    owner,
    dependsOn: ["site"],
  },
  {
    slug: "disclaimer",
    title: "Website disclaimer",
    route: "/disclaimer/",
    contentFile: "content/disclaimer.md",
    status: "published",
    version: "0.1.0",
    created: "2026-10-13",
    lastUpdated: "2026-10-13",
    lastReviewed: "2026-10-13",
    reviewCadenceMonths: 12,
    owner,
    dependsOn: ["site"],
  },
  {
    slug: "accessibility",
    title: "Accessibility statement",
    route: "/accessibility/",
    contentFile: "content/accessibility.md",
    status: "published",
    version: "0.1.0",
    created: "2026-10-14",
    lastUpdated: "2026-10-14",
    lastReviewed: "2026-10-14",
    reviewCadenceMonths: 12,
    owner,
    dependsOn: ["site"],
  },
];

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
