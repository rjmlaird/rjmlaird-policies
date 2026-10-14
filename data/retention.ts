import type { RetentionPeriod } from "../schemas/processor";

/**
 * Standard retention periods referenced by processing activities.
 *
 * Review at least annually and whenever services, suppliers, legal obligations,
 * insurance, or the nature of processing materially changes. Retain data for
 * longer only where necessary for an active relationship, legal obligation,
 * claim, complaint, safeguarding concern, investigation, or dispute.
 */
export const retention: readonly RetentionPeriod[] = [
  {
    id: "general-enquiries",
    label: "General enquiries",
    period:
      "12 months after the last meaningful contact, unless the enquiry develops into an ongoing client, supplier, collaborator or other professional relationship.",
    listedInNotice: true,
  },
  {
    id: "proposals-project-records",
    label: "Proposals and project records",
    period:
      "Unsuccessful proposals are retained for 18 months after the final decision or last meaningful contact. Client project records are retained for 6 years after the end of the engagement, unless a longer period is necessary for tax, accounting, insurance, legal-claim, contractual or professional-record-keeping purposes.",
    listedInNotice: true,
  },
  {
    id: "financial-records",
    label: "Financial records",
    period:
      "Retained for at least 5 years after the 31 January submission deadline for the relevant tax year, or longer where required by applicable tax, accounting, VAT, company-law, audit or legal obligations.",
    listedInNotice: true,
  },
  {
    id: "newsletter",
    label: "Newsletter data",
    period:
      "Retained until you unsubscribe, withdraw consent, the mailing list is retired, or limited suppression information is needed to ensure you are not contacted again against your preference.",
    listedInNotice: true,
  },
  {
    id: "security-logs",
    label: "Website and security logs",
    period:
      "Normally retained for up to 90 days, unless a longer period is necessary to investigate a security incident, prevent abuse, resolve a technical fault, meet a legal obligation, or establish, exercise or defend legal claims.",
    listedInNotice: true,
  },
  {
    id: "safeguarding-complaints-legal",
    label: "Safeguarding, complaints and legal matters",
    period:
      "Retained for as long as necessary to investigate, respond to, resolve and document the matter, and then for 6 years after closure where retention is necessary for legal claims, insurance, safeguarding, regulatory or professional-record-keeping purposes. Records are reviewed case by case and retained for longer only where justified.",
    listedInNotice: true,
  },
  {
    id: "cookies-analytics",
    label: "Cookies and analytics",
    period:
      "Cookie and analytics retention periods vary by technology and are listed in the Cookie Notice. Consent or preference records are retained only for as long as necessary to remember and demonstrate the relevant choice, subject to periodic review.",
    listedInNotice: false,
  },
];
