import type { PolicyNotice, PolicySlug } from "../schemas/policy";
import { site } from "./site";

/** Replaces `legalLinks` in rjmlaird-master/src/data/legal.ts. Keys are used by the layout's `related` prop. */
export const legalLinks = {
  privacy: { href: "/privacy/", label: "Privacy notice" },
  cookies: { href: "/cookies/", label: "Cookie notice" },
  terms: { href: "/terms-of-use/", label: "Terms of use" },
  disclaimer: { href: "/disclaimer/", label: "Website disclaimer" },
  accessibility: { href: "/accessibility/", label: "Accessibility statement" },
  security: { href: "/security/", label: "Security notice" },
  securityTxt: { href: "/.well-known/security.txt", label: "security.txt" },
  safeguarding: { href: "/safeguarding/", label: "Safeguarding policy" },
  contact: { href: "/contact/", label: "Contact" }, // CONFIRM route
  booking: { href: site.bookingUrl, label: "Booking portal" },
} as const;
export type LegalLinkKey = keyof typeof legalLinks;

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
  terms: {
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
};
