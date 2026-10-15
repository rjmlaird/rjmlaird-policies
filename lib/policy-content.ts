/// <reference types="vite/client" />
/**
 * Loads policy Markdown through Vite, so it works in Astro (with
 * `vite.ssr.noExternal: ["@rjmlaird/policies"]`) and in Vitest. Not re-exported from index.ts
 * because `import.meta.glob` only exists under Vite; import from "@rjmlaird/policies/policy-content".
 */
import { getPolicy } from "../data/policy-register";
import { notices } from "../data/notices";
import type { PolicySlug } from "../schemas/policy";
import { extractSections, renderPolicyMarkdown } from "./render";

const files = import.meta.glob("../content/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** Raw Markdown (including frontmatter) for a policy. */
export function getPolicyRaw(slug: PolicySlug): string {
  const entry = getPolicy(slug);
  const name = entry.contentFile.split("/").pop()!;
  const raw = files[`../content/${name}`];
  if (raw === undefined) throw new Error(`No content file loaded for ${slug} (${entry.contentFile})`);
  return raw;
}

/** Everything a page needs: rendered Markdown, its H2 sections, the register entry and notice copy. */
export function renderPolicy(slug: PolicySlug) {
  const entry = getPolicy(slug);
  const result = renderPolicyMarkdown(getPolicyRaw(slug));
  return {
    ...result,
    entry,
    notice: notices[slug],
    sections: extractSections(result.markdown),
  };
}
