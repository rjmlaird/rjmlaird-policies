import { describe, expect, it } from "vitest";
import { processors, processingActivities } from "../data/processors";
import { cookies } from "../data/cookies";
import { retention } from "../data/retention";
import { policyRegister } from "../data/policy-register";
import { ProcessorSchema, ProcessingActivitySchema, RetentionPeriodSchema } from "../schemas/processor";
import { CookieSchema } from "../schemas/cookie";
import { findTokens } from "../lib/placeholders";
import type { RegisterDependency } from "../schemas/policy";
import { readRoot } from "./helpers";

const unique = (ids: string[]) => new Set(ids).size === ids.length;

describe("processors", () => {
  it("match the schema and have unique ids", () => {
    for (const p of processors) expect(ProcessorSchema.safeParse(p).success, p.id).toBe(true);
    expect(unique(processors.map((p) => p.id))).toBe(true);
  });

  it("an active provider has a confirmed location and transfer mechanism", () => {
    for (const p of processors.filter((x) => x.status === "active")) {
      expect(p.transferMechanism, p.id).not.toBe("unknown");
      expect(p.location, p.id).not.toMatch(/\[\[TODO/);
    }
  });
});

describe("retention", () => {
  it("matches the schema and has unique ids", () => {
    for (const r of retention) expect(RetentionPeriodSchema.safeParse(r).success, r.id).toBe(true);
    expect(unique(retention.map((r) => r.id))).toBe(true);
  });
});

describe("processing activities", () => {
  it("match the schema and have unique ids", () => {
    for (const a of processingActivities) expect(ProcessingActivitySchema.safeParse(a).success, a.id).toBe(true);
    expect(unique(processingActivities.map((a) => a.id))).toBe(true);
  });

  it("reference only existing processors and retention periods", () => {
    const pIds = new Set(processors.map((p) => p.id));
    const rIds = new Set(retention.map((r) => r.id));
    for (const a of processingActivities) {
      for (const id of a.processorIds) expect(pIds.has(id), `${a.id} → processor ${id}`).toBe(true);
      for (const id of a.retentionIds) expect(rIds.has(id), `${a.id} → retention ${id}`).toBe(true);
    }
  });

  it("use every public processor and every listed retention period at least once", () => {
    const usedProcessors = new Set([
      ...processingActivities.flatMap((a) => a.processorIds),
      ...cookies.map((c) => c.providerId).filter(Boolean),
    ]);
    for (const p of processors.filter((x) => x.status === "active" || x.status === "unconfirmed")) {
      expect(usedProcessors.has(p.id), `processor ${p.id} is used`).toBe(true);
    }
    const usedRetention = new Set(processingActivities.flatMap((a) => a.retentionIds));
    for (const r of retention) expect(usedRetention.has(r.id), `retention ${r.id} is used`).toBe(true);
  });
});

describe("cookies", () => {
  it("match the schema and have unique ids", () => {
    for (const c of cookies) expect(CookieSchema.safeParse(c).success, c.id).toBe(true);
    expect(unique(cookies.map((c) => c.id))).toBe(true);
  });

  it("providerId, when set, refers to a processor", () => {
    const pIds = new Set(processors.map((p) => p.id));
    for (const c of cookies) if (c.providerId) expect(pIds.has(c.providerId), c.id).toBe(true);
  });
});

describe("policy dependencies", () => {
  const includeDeps: Record<string, RegisterDependency> = {
    "processing-activities": "processors",
    processors: "processors",
    transfers: "processors",
    retention: "retention",
    "cookie-inventory": "cookies",
    "cookie-preferences": "cookies",
  };

  it.each(policyRegister.map((p) => [p.slug, p] as const))("%s dependsOn matches what its content reads", (_s, entry) => {
    const { variables, includes } = findTokens(readRoot(entry.contentFile));
    const derived = new Set<RegisterDependency>();
    if (variables.some((v) => v.startsWith("site."))) derived.add("site");
    for (const inc of includes) derived.add(includeDeps[inc]!);
    expect([...derived].sort()).toEqual([...entry.dependsOn].sort());
  });
});
