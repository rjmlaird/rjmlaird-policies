import { describe, expect, it } from "vitest";
import matter from "gray-matter";
import { existsSync } from "node:fs";
import path from "node:path";
import { policyRegister } from "../data/policy-register";
import { notices, legalLinks, policyLinkKeys } from "../data/notices";
import {
  PolicyEntrySchema,
  PolicyFrontmatterSchema,
  PolicyNoticeSchema,
  policySlugs,
} from "../schemas/policy";
import { extractSections, slugifyHeading, stripFrontmatter } from "../lib/render";
import { readRoot, root } from "./helpers";

describe("policy register", () => {
  it("has exactly one entry per policy slug", () => {
    expect(policyRegister.map((p) => p.slug).sort()).toEqual([...policySlugs].sort());
  });

  it("has unique routes", () => {
    const routes = policyRegister.map((p) => p.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it("every policy belongs to a group, and both groups are used", () => {
    const groups = new Set(policyRegister.map((p) => p.group));
    expect([...groups].sort()).toEqual(["client", "public"]);
  });

  it("policyLinkKeys cover every slug with unique keys", () => {
    const keys = policySlugs.map((s) => policyLinkKeys[s]);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it.each(policyRegister.map((p) => [p.slug, p] as const))("%s entry matches the schema", (_s, entry) => {
    expect(PolicyEntrySchema.safeParse(entry).success).toBe(true);
  });

  it("every policy route is in legalLinks with the same href", () => {
    for (const p of policyRegister) {
      expect(legalLinks[policyLinkKeys[p.slug]].href).toBe(p.route);
    }
  });
});

describe("notices", () => {
  it.each(policySlugs.map((s) => [s] as const))("%s has valid notice copy with known related links", (slug) => {
    const notice = notices[slug];
    expect(PolicyNoticeSchema.safeParse(notice).success).toBe(true);
    for (const key of notice.related) expect(legalLinks).toHaveProperty(key);
    expect(notice.related).not.toContain(slug);
  });
});

describe("content files", () => {
  const knownHrefs = new Set<string>([
    ...policyRegister.map((p) => p.route),
    ...Object.values(legalLinks).map((l) => l.href),
  ]);

  it.each(policyRegister.map((p) => [p.slug, p] as const))("%s", (_slug, entry) => {
    const file = path.join(root, entry.contentFile);
    expect(existsSync(file), `${entry.contentFile} exists`).toBe(true);

    const raw = readRoot(entry.contentFile);
    const fm = matter(raw).data;
    const parsed = PolicyFrontmatterSchema.safeParse(fm);
    expect(parsed.success, "frontmatter valid").toBe(true);
    expect(fm.slug).toBe(entry.slug);
    expect(fm.title).toBe(entry.title);

    const body = stripFrontmatter(raw);

    // The layout renders the H1; content starts at H2.
    expect(body).not.toMatch(/^# /m);

    const sections = extractSections(body);
    expect(sections.length).toBeGreaterThanOrEqual(5);
    const ids = sections.map((s) => s.id);
    expect(new Set(ids).size, "unique section ids").toBe(ids.length);

    // In-page anchors must resolve to a heading.
    const headingIds = new Set(
      [...body.matchAll(/^#{2,3} +(.+?)\s*$/gm)].map((m) => slugifyHeading(m[1]!)),
    );
    for (const m of body.matchAll(/\]\(#([^)]+)\)/g)) {
      expect(headingIds.has(m[1]!), `anchor #${m[1]} resolves`).toBe(true);
    }

    // Site-relative links must point at a known route.
    for (const m of body.matchAll(/\]\((\/[^)#]*)\)/g)) {
      expect(knownHrefs.has(m[1]!), `link ${m[1]} is a known route`).toBe(true);
    }
  });

  it("has no content file without a register entry", async () => {
    const { readdirSync } = await import("node:fs");
    const files = readdirSync(path.join(root, "content")).filter((f) => f.endsWith(".md"));
    expect(files.sort()).toEqual(policyRegister.map((p) => path.basename(p.contentFile)).sort());
  });
});
