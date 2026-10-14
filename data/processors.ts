import { todo } from "../lib/placeholders";
import type { Processor, ProcessingActivity } from "../schemas/processor";

/**
 * Service providers that handle personal data for this site.
 * Seeded with the services the rjmlaird platform already integrates with, all `unconfirmed`:
 * confirm each against the real account, set location and transfer safeguard, then mark `active`.
 * privacyUrl values are from memory of each provider's public site; click-check them.
 */
export const processors: readonly Processor[] = [
  {
    id: "cloudflare",
    name: "Cloudflare",
    category: "hosting",
    function: "Website hosting, content delivery, DNS and security, including edge compute and storage used by site services.",
    dataCategories: ["IP address", "device and browser information", "request and security logs"],
    location: todo("confirm data location"),
    transferMechanism: "unknown",
    privacyUrl: "https://www.cloudflare.com/privacypolicy/",
    status: "unconfirmed",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "payments",
    function: "Payment processing for bookings and paid services.",
    dataCategories: ["name", "email address", "payment details (handled by Stripe)", "payment status"],
    location: todo("confirm data location"),
    transferMechanism: "unknown",
    privacyUrl: "https://stripe.com/privacy",
    status: "unconfirmed",
  },
  {
    id: "cal-com",
    name: "Cal.com",
    category: "booking",
    function: "Scheduling and booking of calls, sessions and workshops.",
    dataCategories: ["name", "email address", "booking details", "notes you provide"],
    location: todo("confirm data location"),
    transferMechanism: "unknown",
    privacyUrl: "https://cal.com/privacy",
    status: "unconfirmed",
  },
  {
    id: "fillout",
    name: "Fillout",
    category: "forms",
    function: "Contact and enquiry forms.",
    dataCategories: ["name", "email address", "organisation", "message and form responses"],
    location: todo("confirm data location"),
    transferMechanism: "unknown",
    status: "unconfirmed",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "crm",
    function: "Customer-relationship management for enquiries, contacts and professional relationships.",
    dataCategories: ["contact details", "organisation and role", "enquiry and correspondence records"],
    location: todo("confirm data location"),
    transferMechanism: "unknown",
    privacyUrl: "https://legal.hubspot.com/privacy-policy",
    status: "unconfirmed",
  },
  {
    id: "notion",
    name: "Notion",
    category: "storage",
    function: "Project notes, records and document storage.",
    dataCategories: ["contact details", "project information", "meeting notes"],
    location: todo("confirm data location"),
    transferMechanism: "unknown",
    status: "unconfirmed",
  },
  {
    id: "email-calendar",
    name: todo("email and calendar provider"),
    category: "email-calendar",
    function: "Email and calendar services.",
    dataCategories: ["contact details", "correspondence", "calendar entries"],
    location: todo("confirm data location"),
    transferMechanism: "unknown",
    status: "unconfirmed",
  },
  {
    id: "newsletter-provider",
    name: todo("newsletter provider (delete if no newsletter)"),
    category: "newsletter",
    function: "Delivery of optional email updates.",
    dataCategories: ["email address", "name", "subscription preferences", "consent record"],
    location: todo("confirm data location"),
    transferMechanism: "unknown",
    status: "unconfirmed",
  },
  {
    id: "analytics-provider",
    name: todo("analytics provider (delete if none)"),
    category: "analytics",
    function: "Aggregated website analytics.",
    dataCategories: ["cookie identifiers", "device and browser information", "pages viewed", "approximate location"],
    location: todo("confirm data location"),
    transferMechanism: "unknown",
    status: "unconfirmed",
  },
  {
    id: "accounting-provider",
    name: todo("invoicing and accounting provider"),
    category: "accounting",
    function: "Invoicing, bookkeeping and tax records.",
    dataCategories: ["name", "contact details", "invoice details", "payment status"],
    location: todo("confirm data location"),
    transferMechanism: "unknown",
    status: "unconfirmed",
  },
];

/** The rows of the privacy notice's processing table. Wording follows the original draft. */
export const processingActivities: readonly ProcessingActivity[] = [
  {
    id: "hosting-security",
    activity: "Website hosting, delivery and security",
    data: "IP address, device and browser information, security logs, site requests and limited technical information.",
    purpose:
      "To host, secure, maintain and troubleshoot rjmlaird.co.uk, and protect it from misuse or attack.",
    lawfulBases: ["legitimate-interests"],
    lawfulBasisNote: "Legitimate interests: maintaining a secure, reliable and effective professional website.",
    processorIds: ["cloudflare"],
    recipientsNote: "Hosting, CDN, DNS, security and form-infrastructure providers.",
    retentionIds: ["security-logs"],
  },
  {
    id: "enquiries",
    activity: "Contact and project enquiries",
    data: "Name, email address, organisation, role, message, relevant links, project context, timescale, budget information and other details you provide.",
    purpose:
      "To respond to your enquiry, assess whether there is a suitable fit, arrange a conversation and prepare a relevant next step.",
    lawfulBases: ["legitimate-interests", "contract"],
    lawfulBasisNote:
      "Legitimate interests: responding to relevant professional enquiries and developing appropriate professional relationships. Contract may apply where you ask me to take steps before entering an agreement.",
    processorIds: ["fillout", "hubspot", "email-calendar"],
    recipientsNote: "Email, form and customer-relationship-management providers.",
    retentionIds: ["general-enquiries"],
  },
  {
    id: "agreed-work",
    activity: "Calls, proposals and agreed work",
    data: "Contact details, meeting notes, project information, scope, agreements, correspondence, deliverables and relevant service records.",
    purpose:
      "To scope, arrange, deliver, manage and review agreed advisory, communication, speaking, editorial, education or collaboration work.",
    lawfulBases: ["contract", "legitimate-interests"],
    lawfulBasisNote:
      "Contract: to take steps at your request before an agreement and to perform the agreement. Legitimate interests may also apply to maintaining records and managing the professional relationship.",
    processorIds: ["email-calendar", "cal-com", "notion", "hubspot"],
    recipientsNote:
      "Email, calendar, document-storage, project-management, invoicing and collaboration providers.",
    retentionIds: ["proposals-project-records"],
  },
  {
    id: "speaking-media",
    activity: "Speaking, media and collaboration requests",
    data: "Contact details, organisation or publication, event details, audience, proposed subject, dates, format, location, travel, access, recording and usage requirements.",
    purpose:
      "To assess, quote for, arrange and deliver a speaking, editorial, media or collaborative contribution.",
    lawfulBases: ["legitimate-interests", "contract"],
    lawfulBasisNote:
      "Legitimate interests: responding to a relevant professional request. Contract applies where a contribution is agreed.",
    processorIds: ["email-calendar"],
    recipientsNote: "Email, calendar, document-storage and relevant event-delivery suppliers.",
    retentionIds: ["general-enquiries", "proposals-project-records"],
  },
  {
    id: "newsletter",
    activity: "Newsletter and optional updates",
    data: "Email address, name where provided, subscription preferences, consent record, delivery and engagement information where enabled.",
    purpose:
      "To send the updates you have chosen to receive and maintain evidence of consent and suppression requests.",
    lawfulBases: ["consent"],
    lawfulBasisNote:
      "Consent. You can withdraw consent at any time by using the unsubscribe link or contacting me.",
    processorIds: ["newsletter-provider"],
    retentionIds: ["newsletter"],
  },
  {
    id: "financial-records",
    activity: "Financial, tax and accounting records",
    data: "Name, contact details, organisation, invoice details, payment status, service information and relevant correspondence.",
    purpose:
      "To issue invoices, manage payments, maintain accounts and meet tax, accounting and legal obligations.",
    lawfulBases: ["legal-obligation", "contract"],
    lawfulBasisNote: "Legal obligation and, where necessary, contract.",
    processorIds: ["stripe", "accounting-provider"],
    recipientsNote: "Payment, invoicing, accounting and professional-adviser providers.",
    retentionIds: ["financial-records"],
  },
  {
    id: "cookies-analytics",
    activity: "Cookies, analytics and website improvement",
    data: "Cookie identifiers, device and browser information, pages viewed, referring source, approximate location and interaction information, depending on the tools used.",
    purpose:
      "To understand whether the site is useful, identify technical issues and improve content and navigation. Non-essential analytics should operate only with the required consent.",
    lawfulBases: ["consent", "legitimate-interests"],
    lawfulBasisNote:
      "Consent for non-essential cookies or analytics. Legitimate interests may apply to strictly necessary security and service-operation technologies.",
    processorIds: ["analytics-provider"],
    recipientsNote: "Analytics, consent-management and embedded-service providers.",
    retentionIds: ["cookies-analytics"],
  },
  {
    id: "legal-claims",
    activity: "Legal claims, complaints and safeguarding concerns",
    data: "Relevant contact details, correspondence, incident information, records and evidence necessary to handle the matter.",
    purpose:
      "To investigate and respond to concerns, protect rights and safety, meet legal obligations, establish or defend legal claims, and comply with relevant safeguarding responsibilities.",
    lawfulBases: ["legal-obligation", "legitimate-interests", "legal-claims"],
    lawfulBasisNote:
      "Legal obligation, legitimate interests and, where applicable, establishment, exercise or defence of legal claims.",
    processorIds: [],
    recipientsNote:
      "Professional advisers, insurers, safeguarding authorities, regulators, law-enforcement bodies or other parties where necessary and lawful.",
    retentionIds: ["safeguarding-complaints-legal"],
  },
];
