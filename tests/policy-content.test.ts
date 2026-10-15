import { describe, expect, it } from "vitest";
import { policyRegister } from "../data/policy-register";
import { renderPolicy } from "../lib/policy-content";

describe("renderPolicy", () => {
  it.each(policyRegister.map((p) => [p.slug] as const))("%s renders with sections and no wiring errors", (slug) => {
    const r = renderPolicy(slug);
    expect(r.missing).toEqual([]);
    expect(r.sections.length).toBeGreaterThanOrEqual(5);
    expect(r.markdown.trim().length).toBeGreaterThan(500);
    expect(r.entry.slug).toBe(slug);
    expect(r.notice.lead.length).toBeGreaterThan(0);
  });
});
