import { describe, expect, it } from "vitest";
import { policyRegister } from "../data/policy-register";
import { legalLinks, policyLinkKeys } from "../data/notices";
import {
  INCLUDE_NAMES,
  findTodos,
  findTokens,
  hasTodo,
  todo,
} from "../lib/placeholders";
import { formatDate, renderPolicyMarkdown } from "../lib/render";
import { site } from "../data/site";
import { readRoot } from "./helpers";

const STRICT = process.env.POLICIES_STRICT === "1";

function renderedPolicy(entry: (typeof policyRegister)[number]) {
  return renderPolicyMarkdown(readRoot(entry.contentFile));
}

describe("placeholder helpers", () => {
  it("finds TODO markers and reports their presence", () => {
    const text = `a ${todo("one")} b ${todo("two words")}`;

    expect(findTodos(text)).toEqual(["one", "two words"]);
    expect(hasTodo(text)).toBe(true);
    expect(hasTodo("clean")).toBe(false);
  });

  it("separates variables from includes", () => {
    const tokens = findTokens(
      "{{site.siteUrl | link}} {{include:retention}}",
    );

    expect(tokens.variables).toEqual(["site.siteUrl"]);
    expect(tokens.includes).toEqual(["retention"]);
  });

  it("applies supported filters", () => {
    const rendered = renderPolicyMarkdown(
      "{{site.siteUrl | link}} {{policy.accessibility.created | date}}",
    );

    expect(rendered.missing).toEqual([]);
    expect(rendered.markdown).toBe(
      `[${site.siteUrl}](${site.siteUrl}) 14 October 2026`,
    );
    expect(formatDate("2026-10-14")).toBe("14 October 2026");
  });

  it("reports unresolved variables, filters and includes", () => {
    const rendered = renderPolicyMarkdown(
      "{{site.nope}} {{site.siteUrl | shout}} {{include:nope}}",
    );

    expect(rendered.missing).toHaveLength(3);
    expect(rendered.todos).toHaveLength(3);
  });
});

describe("site accessibility configuration", () => {
  it("defines at least one feedback route", () => {
    const { otherFeedbackRoutes } = site.accessibility;

    expect(otherFeedbackRoutes).toEqual(expect.any(String));
    expect(otherFeedbackRoutes.trim()).not.toBe("");
    expect(otherFeedbackRoutes).toContain("- ");
    expect(otherFeedbackRoutes).toContain("mailto:");
  });

  it("defines recorded testing combinations", () => {
    const { testedCombinations } = site.accessibility;

    expect(testedCombinations).toEqual(expect.any(String));
    expect(testedCombinations.trim()).not.toBe("");
    expect(testedCombinations).toContain("- ");
  });
});

describe("policy register routes", () => {
  it("matches each policy route to its legal-link entry", () => {
    for (const policy of policyRegister) {
      const linkKey = policyLinkKeys[policy.slug];

      expect(legalLinks[linkKey].href).toBe(policy.route);
    }
  });
});

describe.each(policyRegister.map((entry) => [entry.slug, entry] as const))(
  "%s",
  (_slug, entry) => {
    it("only uses known includes and resolves every variable", () => {
      const raw = readRoot(entry.contentFile);
      const rendered = renderPolicyMarkdown(raw);

      for (const includeName of findTokens(raw).includes) {
        expect(INCLUDE_NAMES as readonly string[]).toContain(includeName);
      }

      expect(rendered.missing).toEqual([]);
    });

    it("leaves no unrendered template tokens", () => {
      expect(renderedPolicy(entry).markdown).not.toMatch(/\{\{|\}\}/);
    });

    it("requires published policies to be complete and reviewed", () => {
      if (entry.status !== "published") return;

      const rendered = renderedPolicy(entry);

      expect(rendered.todos).toEqual([]);
      expect(entry.lastReviewed).not.toBeNull();
    });

    it.skipIf(!STRICT)(
      "strict publishing check: contains no TODOs regardless of status",
      () => {
        const rendered = renderedPolicy(entry);

        expect(
          rendered.todos,
          `${entry.slug} contains unresolved placeholders:\n${rendered.todos
            .map((item) => `- ${item}`)
            .join("\n")}`,
        ).toEqual([]);
      },
    );
  },
);

describe("site configuration", () => {
  it.skipIf(!STRICT)(
    "strict publishing check: site configuration has no TODOs",
    () => {
      expect(JSON.stringify(site)).not.toMatch(/\\[\\[TODO:[^\\]]+\]\]/);
    },
  );
});
