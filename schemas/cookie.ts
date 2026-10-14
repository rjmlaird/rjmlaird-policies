import { z } from "zod";

export const cookieCategories = ["strictly-necessary", "analytics", "preferences", "embedded-content", "marketing"] as const;
export const CookieCategorySchema = z.enum(cookieCategories);
export type CookieCategory = z.infer<typeof CookieCategorySchema>;

export const cookieCategoryLabels: Record<CookieCategory, string> = {
  "strictly-necessary": "Strictly necessary",
  analytics: "Analytics",
  preferences: "Preferences",
  "embedded-content": "Embedded content",
  marketing: "Marketing",
};

export const storageTechnologies = ["cookie", "local-storage", "session-storage", "pixel", "script"] as const;

/**
 * template   = placeholder row copied from the original draft; replace or delete.
 * unverified = a real technology, not yet confirmed in a clean-browser audit.
 * verified   = confirmed in an audit (set lastAudited).
 * Anything other than `verified` renders with a TODO marker and blocks publishing.
 */
export const CookieStatusSchema = z.enum(["template", "unverified", "verified"]);

export const CookieSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    category: CookieCategorySchema,
    name: z.string().min(1),
    technology: z.enum(storageTechnologies),
    provider: z.string().min(1),
    /** Optional link to an entry in processors.ts. */
    providerId: z.string().optional(),
    /** Null = not yet known. */
    firstParty: z.boolean().nullable(),
    purpose: z.string().min(1),
    duration: z.string().min(1),
    consentPosition: z.string().min(1),
    status: CookieStatusSchema,
    lastAudited: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  })
  .strict()
  .refine((c) => c.status !== "verified" || c.lastAudited !== null, {
    message: "A verified cookie needs a lastAudited date",
    path: ["lastAudited"],
  });
export type CookieEntry = z.infer<typeof CookieSchema>;
