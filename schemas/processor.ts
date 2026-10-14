import { z } from "zod";

const kebabId = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Expected kebab-case id");

export const processorCategories = [
  "hosting", "security", "forms", "crm", "email-calendar", "booking",
  "payments", "accounting", "newsletter", "analytics", "storage", "other",
] as const;
export const ProcessorCategorySchema = z.enum(processorCategories);

export const transferMechanisms = ["none", "uk-adequacy", "idta", "uk-addendum", "other", "unknown"] as const;
export const TransferMechanismSchema = z.enum(transferMechanisms);
export type TransferMechanism = z.infer<typeof TransferMechanismSchema>;

export const transferMechanismLabels: Record<Exclude<TransferMechanism, "unknown">, string> = {
  none: "No restricted transfer",
  "uk-adequacy": "UK adequacy regulations",
  idta: "UK International Data Transfer Agreement",
  "uk-addendum": "UK Addendum to EU Standard Contractual Clauses",
  other: "Other lawful transfer mechanism",
};

/**
 * `unconfirmed` = listed because the service is in use or likely in use, but not yet checked against
 * the real account/contract. Unconfirmed providers render with a TODO marker, which blocks publishing.
 * `planned` and `retired` providers are never rendered into public notices.
 */
export const ProcessorStatusSchema = z.enum(["active", "unconfirmed", "planned", "retired"]);

export const ProcessorSchema = z
  .object({
    id: kebabId,
    name: z.string().min(1),
    category: ProcessorCategorySchema,
    /** What the provider does for this site, in plain English. */
    function: z.string().min(1),
    /** Categories of personal data the provider handles. */
    dataCategories: z.array(z.string().min(1)).min(1),
    /** Where data is stored or accessed from. */
    location: z.string().min(1),
    transferMechanism: TransferMechanismSchema,
    privacyUrl: z.string().url().optional(),
    status: ProcessorStatusSchema,
  })
  .strict();
export type Processor = z.infer<typeof ProcessorSchema>;

export const lawfulBases = ["consent", "contract", "legal-obligation", "legitimate-interests", "legal-claims"] as const;
export const LawfulBasisSchema = z.enum(lawfulBases);

/** One row of the privacy notice's processing table. */
export const ProcessingActivitySchema = z
  .object({
    id: kebabId,
    activity: z.string().min(1),
    data: z.string().min(1),
    purpose: z.string().min(1),
    lawfulBases: z.array(LawfulBasisSchema).min(1),
    /** Public wording explaining the basis, as it appears in the notice. */
    lawfulBasisNote: z.string().min(1),
    /** Ids from processors.ts. */
    processorIds: z.array(kebabId),
    /** Recipients that are categories rather than named providers (advisers, authorities…). */
    recipientsNote: z.string().optional(),
    /** Ids from retention.ts. */
    retentionIds: z.array(kebabId).min(1),
  })
  .strict();
export type ProcessingActivity = z.infer<typeof ProcessingActivitySchema>;

export const RetentionPeriodSchema = z
  .object({
    id: kebabId,
    label: z.string().min(1),
    /** Public wording. Use todo() until a period is decided. */
    period: z.string().min(1),
    /** Show as a line in the privacy notice's retention section. */
    listedInNotice: z.boolean(),
  })
  .strict();
export type RetentionPeriod = z.infer<typeof RetentionPeriodSchema>;
