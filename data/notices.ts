import type { PolicyNotice, PolicySlug } from "../schemas/policy";
import { site } from "./site";

/** Replaces `legalLinks` in rjmlaird-master/src/data/legal.ts. Keys are used by the layout's `related` prop. */
export const legalLinks = {
  privacy: { href: "/privacy/", label: "Privacy notice" },
  cookies: { href: "/cookies/", label: "Cookie notice" },
  terms: { href: "/termsofuse/", label: "Terms of use" },
  disclaimer: { href: "/disclaimer/", label: "Website disclaimer" },
  accessibility: { href: "/accessibility/", label: "Accessibility statement" },
  security: { href: "/security/", label: "Security notice" },
  complaints: { href: "/complaints/", label: "Complaints policy" },
  termsofservice: { href: "/termsofservice/", label: "Terms of service" },
  cancellation: { href: "/cancellation/", label: "Booking and cancellation policy" },
  payments: { href: "/payments/", label: "Payment and refund policy" },
  tutoring: { href: "/tutoring/", label: "Tutoring terms" },
  mediaconsent: { href: "/mediaconsent/", label: "Photography and media consent" },
  acceptableuse: { href: "/acceptableuse/", label: "Acceptable use policy" },
  securityTxt: { href: "/.well-known/security.txt", label: "security.txt" },
  safeguarding: { href: "/safeguarding/", label: "Safeguarding policy" },
  aiuse: { href: "/aiuse/", label: "AI use policy" },
  dataprotection: { href: "/dataprotection/", label: "Data protection policy" },
  retention: { href: "/retention/", label: "Data retention policy" },
  informationsecurity: { href: "/informationsecurity/", label: "Information security policy" },
  photography: { href: "/photography/", label: "Photography and video policy" },
  conditionsofsale: { href: "/conditionsofsale/", label: "Conditions of sale" },
  subscriptions: { href: "/subscriptions/", label: "Subscription terms" },
  sla: { href: "/sla/", label: "Service level agreement" },
  contact: { href: "/contact/", label: "Contact" }, // CONFIRM route
  booking: { href: site.bookingUrl, label: "Booking portal" },
} as const;
export type LegalLinkKey = keyof typeof legalLinks;

/**
 * Policy slug -> legalLinks key. Slugs follow the register; link keys follow what rjmlaird-master
 * already uses in `related` props (`terms`, not `termsofuse`). Tests check both agree with the register.
 */
export const policyLinkKeys = {
  privacy: "privacy",
  cookies: "cookies",
  termsofuse: "terms",
  disclaimer: "disclaimer",
  accessibility: "accessibility",
  security: "security",
  safeguarding: "safeguarding",
  complaints: "complaints",
  termsofservice: "termsofservice",
  cancellation: "cancellation",
  payments: "payments",
  tutoring: "tutoring",
  mediaconsent: "mediaconsent",
  acceptableuse: "acceptableuse",
  aiuse: "aiuse",
  dataprotection: "dataprotection",
  retention: "retention",
  informationsecurity: "informationsecurity",
  photography: "photography",
  conditionsofsale: "conditionsofsale",
  subscriptions: "subscriptions",
  sla: "sla",
} as const satisfies Record<PolicySlug, LegalLinkKey>;

export const notices: Record<PolicySlug, PolicyNotice> = {
  privacy: {
    eyebrow: "Legal",
    description: "How rjmlaird.co.uk collects, uses, stores and protects personal information.",
    lead: "This notice explains how personal information is collected and used when you visit this website, contact me, enquire about work, subscribe to updates or otherwise engage with my professional services.",
    summary:
      "I use personal information to respond to relevant enquiries, arrange and deliver agreed work, maintain necessary professional and financial records, send updates where you have opted in, and keep this website secure. I do not sell personal information.",
    related: ["cookies", "terms", "accessibility", "safeguarding"],
    draftNote:
      "Before publication: replace all TODO text with your actual providers, jurisdictions, transfer safeguards, retention periods, form purposes and operational processes. Review this notice whenever you add or remove a supplier, form, booking process, analytics tool, newsletter platform or service. (The original draft showed this note publicly; it is now dev-only.)",
  },
  cookies: {
    eyebrow: "Legal",
    description: "Information about cookies and similar technologies used on rjmlaird.co.uk.",
    lead: "This notice explains how cookies and similar technologies may be used on this website, what they do and how you can manage your choices.",
    summary:
      "Essential technologies may be used to keep the site secure and working. Optional analytics, preferences, embedded content and marketing technologies should be used only in line with the choices available to you.",
    related: ["privacy", "terms", "accessibility", "booking"],
    draftNote:
      "Before publishing: run a proper cookie audit and replace every TODO. Your published notice, consent banner and actual scripts must match. Do not describe consent, opt-out, analytics minimisation, essential cookies or third-party tools unless they are configured and working as stated. The ICO requires clear, comprehensive information about cookies and their purposes, and consent for non-essential technologies unless a specific exemption applies.",
  },
  termsofuse: {
    eyebrow: "Legal",
    description: "Terms governing use of rjmlaird.co.uk.",
    lead: "These terms explain the rules for using rjmlaird.co.uk, including how website content may be used and the limits that apply to information and external links.",
    summary:
      "You may use this website for lawful, personal and professional purposes. Website content remains protected by intellectual-property rights, and separate written terms apply where services, bookings or paid work are agreed.",
    related: ["privacy", "cookies", "accessibility", "disclaimer"],
    draftNote:
      "Before publishing: review the terms against the actual functionality of your site, including downloads, log-in areas, embedded media, AI tools, analytics, booking platforms, ecommerce, community features and any user-generated content. This page is a website-use notice and should not replace professionally reviewed client-service, tutoring, speaking, event or booking terms where those are needed.",
  },
  disclaimer: {
    eyebrow: "Legal",
    description: "Important information about the content, links and limitations of rjmlaird.co.uk.",
    lead: "This disclaimer explains the limits that apply to information published on this website, including articles, resources, tools, external links and professional commentary.",
    summary:
      "Content on this website is provided for general information, education and professional context. It is not a substitute for advice tailored to your circumstances, and separate written terms apply if professional services are agreed.",
    related: ["terms", "privacy", "cookies", "accessibility"],
    draftNote:
      "Before publishing: review this disclaimer against your actual content, service routes, booking tools, external links, AI use, downloadable resources and contractual arrangements. This is a practical template, not legal advice. Obtain professional legal review where your work involves regulated advice, children, high-risk technical subjects, paid consumer services, significant commercial contracts or sensitive data.",
  },
  accessibility: {
    eyebrow: "Accessibility",
    description:
      "Accessibility information for rjmlaird.co.uk, including conformance status, known limitations and how to request support.",
    lead: "I aim to make this website usable by as many people as possible, including people who use assistive technologies, navigate by keyboard, use magnification or require reduced motion.",
    summary:
      "This website is partially conformant with WCAG 2.2 Level AA. Some content and third-party services have known limitations, listed below. If you meet a barrier, contact me and I will work to provide the information in a format you can use.",
    related: ["privacy", "cookies", "terms", "contact"],
    draftNote:
      "Before publishing: replace every TODO, then check each claim against the live site. In particular confirm that the skip link, reduced-motion support, form error handling, language attributes and 'no JavaScript needed for basic reading' statements are true, and that you have run the automated and screen-reader checks listed under assessment. Remove any limitation row that does not apply. Do not claim more than 'partially conformant' without a documented full assessment. Remove leftover Accessible Astro theme material if present (template notice, theme links, generic footer, sample astronaut image credit). Link this statement from the footer of every page.",
  },
  security: {
    eyebrow: "Security",
    description: "Security information and vulnerability-disclosure guidance for rjmlaird.co.uk.",
    lead: "This notice explains how to report a potential security vulnerability affecting this website or the booking portal, and how good-faith reports will be handled.",
    summary:
      "If you believe you have found a security vulnerability, report it privately to the security contact. Please do not publicly disclose the issue, access other people's data or disrupt the service while it is being investigated.",
    related: ["privacy", "terms", "accessibility", "securityTxt"],
    draftNote:
      "Before publishing: create, monitor and test the security inbox; set response targets you can actually meet; confirm the assets you control; publish a valid /.well-known/security.txt that matches site.securityEmail; and ensure your hosting, booking, payment and infrastructure suppliers each have their own vulnerability-reporting routes. The NCSC recommends a clear, secure reporting channel, defined researcher boundaries and an explanation of how reports will be handled.",
  },
  safeguarding: {
    eyebrow: "Safeguarding",
    description: "How safeguarding concerns are recognised, reported and handled in connection with tutoring, mentoring, workshops and other work involving children, young people or adults at risk.",
    lead: "This policy sets out how I protect children, young people and adults at risk when I teach, mentor, speak or run activities, and what to do if you have a concern.",
    summary:
      "The welfare of children and adults at risk comes first. If someone is in immediate danger, call 999. This policy explains who to contact about a concern and how concerns are handled.",
    related: ["privacy", "tutoring", "mediaconsent", "complaints"],
    draftNote:
      "Before publishing: this is a template, not a substitute for proper safeguarding training. Name the safeguarding lead, state your real DBS position (or delete that line), complete recognised safeguarding training before working with children, and have the policy reviewed by someone qualified, for example a school, local authority or safeguarding consultant. Do not publish statements about checks or training you have not completed.",
  },
  complaints: {
    eyebrow: "Legal",
    description: "How to raise a complaint about rjmlaird.co.uk, services, bookings or conduct, and how complaints are handled.",
    lead: "If something has gone wrong, I want to hear about it and put it right. This policy explains how to complain and what happens next.",
    summary:
      "Tell me what happened and what outcome you would like. I will acknowledge your complaint, look into it fairly and reply in writing. Safeguarding, data-protection and security matters have their own routes.",
    related: ["terms", "privacy", "safeguarding", "contact"],
    draftNote:
      "Before publishing: set acknowledgement and response times you can meet, and decide whether you will name an alternative dispute resolution body for consumer complaints. Make sure the contact address is monitored.",
  },
  termsofservice: {
    eyebrow: "Services",
    description: "Terms that apply when you engage me for paid advisory, consultancy, communication, digital, speaking, facilitation or similar services.",
    lead: "These terms apply when you commission paid services from me. They sit alongside any proposal, quote or booking confirmation, which sets out the specific work, fees and timescales.",
    summary:
      "These terms cover how services are agreed, delivered, paid for and ended, who owns what, how confidentiality and data are handled, and the limits of my responsibility. A signed proposal or booking confirmation takes priority over these terms where they differ.",
    related: ["terms", "cancellation", "payments", "privacy"],
    draftNote:
      "Before publishing: have these terms reviewed by a solicitor, particularly the liability, intellectual-property, confidentiality and consumer sections. Decide how they are accepted (proposal wording, booking checkbox, signature) and keep a record of the version each client accepted. Fill in every TODO value in site.commercial.",
  },
  cancellation: {
    eyebrow: "Services",
    description: "How booking, rescheduling and cancellation work for calls, sessions, workshops, talks and other bookings.",
    lead: "This policy explains how to book, how to change or cancel a booking, and what happens if a session is missed or I need to cancel.",
    summary:
      "You can reschedule or cancel with the notice stated below. Later changes and missed sessions may be charged. If I cancel, you can reschedule or receive a refund. Consumers also have statutory rights, which this policy does not limit.",
    related: ["payments", "termsofservice", "tutoring", "booking"],
    draftNote:
      "Before publishing: replace every TODO notice period and charge in site.commercial with terms you will actually apply, and make sure the booking tool (reminders, rescheduling links, Stripe checkout wording) matches this policy. Have the consumer cancellation section checked by a legal adviser, including whether any dated workshops or events fall within the leisure-activity exemption.",
  },
  payments: {
    eyebrow: "Services",
    description: "How fees, invoices, deposits, card payments, late payments and refunds work.",
    lead: "This policy explains how and when you pay, what happens if a payment is late or fails, and how refunds are handled.",
    summary:
      "Fees are set out in your proposal, quote or booking page. Payment is due as stated there. Refunds follow the cancellation policy and your statutory rights. Card payments are handled by a payment provider; I do not store full card details.",
    related: ["cancellation", "termsofservice", "privacy", "booking"],
    draftNote:
      "Before publishing: state your real payment methods and VAT position, confirm the payment-provider wording against your actual checkout, and decide the late-payment and deposit terms. Check that refund timings match what your payment provider can do.",
  },
  tutoring: {
    eyebrow: "Services",
    description: "Terms for one-to-one and group tutoring and mentoring, including the role of parents and carers, conduct, attendance and online sessions.",
    lead: "These terms apply to tutoring and mentoring. They explain what to expect, what is expected of tutors, learners and parents or carers, and how sessions are run safely.",
    summary:
      "Tutoring is arranged with a parent or carer where the learner is under 18. Sessions follow the safeguarding policy, attendance and cancellation rules apply, and no particular grade or outcome can be guaranteed.",
    related: ["safeguarding", "cancellation", "payments", "disclaimer"],
    draftNote:
      "Before publishing: confirm age ranges and subjects you actually teach, the platform used for online sessions, whether a parent or carer must be present or reachable, and your real checks and training. Align every rule with the safeguarding policy. Have these terms reviewed before accepting under-18 learners.",
  },
  mediaconsent: {
    eyebrow: "Services",
    description: "How photographs, video and audio recordings are handled at workshops, talks, tutoring sessions and events, and how to give or withdraw consent.",
    lead: "This policy explains when images or recordings may be made, how they may be used, and how to say no or change your mind.",
    summary:
      "Images or recordings of you or your child are made or published only where this policy says so or you have agreed. You can refuse or withdraw consent for future use at any time, and children's images need a parent or carer's consent.",
    related: ["privacy", "safeguarding", "tutoring", "termsofservice"],
    draftNote:
      "Before publishing: decide whether you record sessions at all, where recordings are stored, how long they are kept, and where they may be published. Provide a consent form or booking-flow checkbox that matches this policy and keep a record of consents.",
  },
  acceptableuse: {
    eyebrow: "Services",
    description: "Rules for using interactive tools, submitted content, client areas, communities and APIs provided by rjmlaird.co.uk.",
    lead: "This policy sets out what is and is not allowed when you submit content, use interactive tools, access client areas or use APIs and data services.",
    summary:
      "Use these services lawfully and considerately. Do not submit unlawful, harmful or infringing content, attempt to disrupt or bypass controls, or misuse data and access. Breaches can lead to content removal or access being restricted.",
    related: ["terms", "security", "privacy", "complaints"],
    draftNote:
      "Before publishing: confirm which of these services actually exist (submissions, member areas, client portals, APIs, tools) and delete the sections for those that do not. Set real API limits and a real content-licence position. Make sure a working reporting route exists.",
  },
  aiuse: {
    eyebrow: "Legal",
    description: "How AI tools are used in research, writing, code, design, teaching and client work, and the limits that apply.",
    lead: "This policy explains how I use artificial-intelligence tools, what I will not do with them, and how I check their output.",
    summary:
      "I use AI tools as assistants, not authorities. A person remains responsible for everything I publish or deliver, and I do not put confidential or personal information into tools that are not suitable for it.",
    related: ["privacy", "informationsecurity", "dataprotection", "disclaimer"],
    draftNote:
      "Before publishing: list the AI tools you actually use for client work (or say the list is available on request), confirm any training opt-outs, and say whether the tools on this site use AI features. Keep every statement accurate.",
  },
  dataprotection: {
    eyebrow: "Legal",
    description: "How UK GDPR and the Data Protection Act 2018 are met in practice, including rights, breaches and accountability.",
    lead: "This policy explains how I meet my obligations under UK data-protection law and the standards I hold myself to when handling personal data.",
    summary:
      "The privacy notice says what data I collect and why. This policy describes how I look after it: lawful bases, rights requests, suppliers, risk assessment, breach handling and records.",
    related: ["privacy", "retention", "informationsecurity", "complaints"],
    draftNote:
      "Before publishing: confirm the ICO registration or exemption in site.dataProtection, add or link your current processors, and check the lawful bases against the privacy notice.",
  },
  retention: {
    eyebrow: "Legal",
    description: "How long personal data and other records are kept, and how they are deleted or anonymised.",
    lead: "This policy explains how long I keep personal data and other records, how they are reviewed, and how they are deleted or anonymised.",
    summary:
      "I keep personal data only as long as it is needed, or as long as the law requires. The retention schedule sets each period and the reason for it.",
    related: ["privacy", "dataprotection", "informationsecurity", "mediaconsent"],
    draftNote:
      "Before publishing: review every period in the schedule with your accountant and a legal adviser, and make sure it matches the privacy notice and the safeguarding records setting.",
  },
  informationsecurity: {
    eyebrow: "Legal",
    description: "The measures used to protect information, accounts, devices, code and websites from loss, misuse and unauthorised access.",
    lead: "This policy sets out how I protect information, including personal data, client material, accounts, devices, code and websites.",
    summary:
      "It describes the measures I use and the standards I work to. It is a statement of practice, not a guarantee that incidents cannot happen.",
    related: ["security", "dataprotection", "retention", "aiuse"],
    draftNote:
      "Before publishing: check each measure described is actually in place (MFA, encryption, backups, device controls) and remove any that are not.",
  },
  photography: {
    eyebrow: "Legal",
    description: "When photographs, video and audio are taken, used and shared, and how consent works.",
    lead: "This policy explains when I take, record, use and share photographs, video and audio, and how consent works.",
    summary:
      "Images or recordings of an identifiable person are personal data. I handle them with care, only with a lawful basis, and with extra care for children and young people.",
    related: ["privacy", "dataprotection", "safeguarding", "mediaconsent"],
    draftNote:
      "Before publishing: decide the lawful basis for event photography (consent or legitimate interests) and make registration forms and venue signs match. This overlaps with the media consent policy, so decide whether to merge them.",
  },
  conditionsofsale: {
    eyebrow: "Services",
    description: "Conditions that apply when you buy services, digital products, subscriptions or other items.",
    lead: "These conditions apply when you buy services, digital products, subscriptions or other items from me.",
    summary:
      "They cover making a contract, prices, delivery, your right to cancel, faulty items, liability and ending a contract. Nothing in them limits your statutory consumer rights.",
    related: ["termsofservice", "cancellation", "payments", "subscriptions"],
    draftNote:
      "Before publishing: confirm governing law, list only the products you sell, and have a legal adviser review the cancellation, digital-content and liability wording.",
  },
  subscriptions: {
    eyebrow: "Services",
    description: "Terms for recurring plans that renew automatically until cancelled.",
    lead: "These terms apply when you sign up for a recurring plan, such as paid access to a tool, API, resource library, membership or support plan.",
    summary:
      "Plans renew until you cancel. These terms explain trials, billing, price changes, cancelling, your content and data, and how the plan can be suspended or ended.",
    related: ["conditionsofsale", "payments", "acceptableuse", "sla"],
    draftNote:
      "Before publishing: list the plans you actually offer (or hold this policy back), check the cooling-off wording against current subscription-contract rules, and state data export and retention after cancellation.",
  },
  sla: {
    eyebrow: "Services",
    description: "The service levels aimed for on paid, ongoing digital services such as hosted websites, tools and APIs.",
    lead: "This agreement sets out the service levels I aim to meet for paid, ongoing digital services that a client has agreed to in writing.",
    summary:
      "It covers availability, maintenance, support response targets, security incidents, backups, your responsibilities and the remedies if a target is missed.",
    related: ["conditionsofsale", "subscriptions", "informationsecurity", "security"],
    draftNote:
      "Before publishing: set only targets you can measure and meet in site.sla, and delete the reporting and recovery sections if you do not offer them.",
  },
};
