import { todo } from "../lib/placeholders";
import type { CookieEntry } from "../schemas/cookie";

/**
 * Cookie and similar-technology inventory. These six rows are the placeholder rows from the original
 * cookie notice. Replace them with the results of a real audit (clean browser profile, each consent
 * category accepted and rejected) and delete any row for a technology you do not use.
 */
export const cookies: readonly CookieEntry[] = [
  {
    id: "tpl-consent-preference",
    category: "strictly-necessary",
    name: todo("cookie-consent preference cookie"),
    technology: "cookie",
    provider: todo("your consent-management provider or first-party site"),
    firstParty: null,
    purpose: "Stores your cookie preference so the site can remember and apply your choice.",
    duration: todo("insert actual duration"),
    consentPosition: "Not required where strictly necessary to remember your choice.",
    status: "template",
    lastAudited: null,
  },
  {
    id: "tpl-security",
    category: "strictly-necessary",
    name: todo("security or anti-bot cookie"),
    technology: "cookie",
    provider: todo("hosting, CDN, WAF or security provider"),
    firstParty: null,
    purpose:
      "Helps protect the website, forms and infrastructure from malicious traffic, abuse or security threats.",
    duration: todo("insert actual duration"),
    consentPosition: "Not required where strictly necessary for security.",
    status: "template",
    lastAudited: null,
  },
  {
    id: "tpl-analytics",
    category: "analytics",
    name: todo("analytics identifier"),
    technology: "cookie",
    provider: todo("analytics provider, for example Plausible, Fathom, GA4 or Cloudflare"),
    firstParty: null,
    purpose:
      "Measures aggregated use of the site, such as page views, referral sources and technical performance, to help improve content and usability.",
    duration: todo("insert actual duration"),
    consentPosition: todo(
      "state whether consent is required, or whether you rely on a current exemption with a clear and simple opt-out",
    ),
    status: "template",
    lastAudited: null,
  },
  {
    id: "tpl-preferences",
    category: "preferences",
    name: todo("appearance or accessibility preference"),
    technology: "local-storage",
    provider: "First-party site",
    firstParty: true,
    purpose:
      "Remembers a choice such as theme, language, text or display preference, where this feature is offered.",
    duration: todo("insert actual duration"),
    consentPosition: todo(
      "state whether it is strictly necessary, consent-based, or operated using a current appearance/functionality exemption with opt-out",
    ),
    status: "template",
    lastAudited: null,
  },
  {
    id: "tpl-embeds",
    category: "embedded-content",
    name: todo("third-party embed cookies"),
    technology: "cookie",
    provider: todo("video, map, social-media, booking or form provider"),
    firstParty: false,
    purpose:
      "Supports content or functionality supplied by a third party, such as video, maps, social content, forms or booking tools.",
    duration: todo("insert actual duration or refer to provider notice"),
    consentPosition:
      "Consent required before loading unless the technology is strictly necessary for a service you explicitly request.",
    status: "template",
    lastAudited: null,
  },
  {
    id: "tpl-marketing",
    category: "marketing",
    name: todo("marketing pixel or advertising cookie"),
    technology: "pixel",
    provider: todo("advertising or social-media provider"),
    firstParty: false,
    purpose: "Measures advertising activity, limits repeat adverts, builds audiences or supports remarketing.",
    duration: todo("insert actual duration"),
    consentPosition:
      "Consent required before it is set or read. Remove this row if you do not use marketing or advertising technologies.",
    status: "template",
    lastAudited: null,
  },
];
