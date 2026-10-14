import { z } from "zod";

/** Every policy this package owns. Add a slug here first, then a register entry, notice and content file. */
export const policySlugs = ["privacy", "cookies", "terms", "disclaimer", "accessibility"] as const;

export const PolicySlugSchema = z.enum(policySlugs);
export type PolicySlug = z.infer<typeof PolicySlugSchema>;

/** draft → review → published. Only `published` policies are subject to the TODO gate. */
export const PolicyStatusSchema = z.enum(["draft", "review", "published"]);
export type PolicyStatus = z.infer<typeof PolicyStatusSchema>;

export const IsoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD")
  .refine((s) => !Number.isNaN(Date.parse(`${s}T00:00:00Z`)), "Not a real date");

/** Which registers/data sources a policy reads. Kept honest by tests/registers.test.ts. */
export const RegisterDependencySchema = z.enum(["site", "processors", "cookies", "retention"]);
export type RegisterDependency = z.infer<typeof RegisterDependencySchema>;

export const PolicyEntrySchema = z
  .object({
    slug: PolicySlugSchema,
    title: z.string().min(1),
    /** Public route in rjmlaird-master, with leading and trailing slash. */
    route: z.string().regex(/^\/[a-z0-9-]+\/$/, "Expected /route/"),
    /** Path relative to the package root. */
    contentFile: z.string().regex(/^content\/[a-z0-9-]+\.md$/),
    status: PolicyStatusSchema,
    /** Semver of the policy text, bumped on every published change. */
    version: z.string().regex(/^\d+\.\d+\.\d+$/),
    created: IsoDateSchema,
    lastUpdated: IsoDateSchema,
    /** Null until someone has formally reviewed the policy against the live site. */
    lastReviewed: IsoDateSchema.nullable(),
    reviewCadenceMonths: z.number().int().min(1).max(36),
    owner: z.string().min(1),
    dependsOn: z.array(RegisterDependencySchema),
  })
  .strict()
  .refine((p) => p.lastUpdated >= p.created, {
    message: "lastUpdated cannot be before created",
    path: ["lastUpdated"],
  })
  .refine((p) => p.lastReviewed === null || p.lastReviewed >= p.created, {
    message: "lastReviewed cannot be before created",
    path: ["lastReviewed"],
  });
export type PolicyEntry = z.infer<typeof PolicyEntrySchema>;

/** The only frontmatter content/*.md files carry. Dates, status and version live in the register. */
export const PolicyFrontmatterSchema = z
  .object({ slug: PolicySlugSchema, title: z.string().min(1) })
  .strict();
export type PolicyFrontmatter = z.infer<typeof PolicyFrontmatterSchema>;

/** Presentation copy the LegalNotice layout needs around each policy body. */
export const PolicyNoticeSchema = z
  .object({
    eyebrow: z.string().min(1),
    description: z.string().min(1),
    lead: z.string().min(1),
    /** Plain-text "In brief" summary. */
    summary: z.string().min(1),
    /** Keys of `legalLinks` in data/notices.ts. */
    related: z.array(z.string().min(1)),
    /** Author-only pre-publish note. Render in dev only (the layout's `draft-note` slot). */
    draftNote: z.string().min(1),
  })
  .strict();
export type PolicyNotice = z.infer<typeof PolicyNoticeSchema>;
