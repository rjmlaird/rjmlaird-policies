import { todo } from "../lib/placeholders";

/**
 * Identity, contact and site-wide policy values.
 *
 * Anything wrapped in todo() must be replaced with verified information before
 * the relevant policy is published. Do not invent providers, retention periods,
 * data locations, legal bases, or accessibility-test results.
 */
export const site = {
  /**
   * Use the name that appears in your legal notices and, if applicable, ICO
   * registration.
   */
  controllerName: "Ryan J. M. Laird",

  siteUrl: "https://rjmlaird.co.uk",
  bookingUrl: "https://booking.rjmlaird.co.uk",
  impactOrbitUrl: "https://impactorbit.co",

  contactEmail: "contact@mail.rjmlaird.co.uk",
  privacyEmail: "privacy@mail.rjmlaird.co.uk",
  securityEmail: "security@mail.rjmlaird.co.uk",

  country: "England, United Kingdom",
  icoComplaintUrl: "https://ico.org.uk/make-a-complaint/",

  consent: {
    /**
     * Set to true only once the cookie-preferences control opens a working
     * consent-management interface and the site applies the saved choices.
     */
    managerConfigured: false,
  },

  /**
   * Values referenced by content/accessibility.md.
   *
   * `testedCombinations` and `otherFeedbackRoutes` are Markdown strings rather
   * than arrays because the policy renderer substitutes variables into Markdown.
   * Update them only when the underlying facts are verified.
   */
  accessibility: {
    /**
     * We aim to acknowledge accessibility feedback within two business days.
     */
    ackBusinessDays: 2,

    /**
     * We aim to provide an initial response, practical alternative, or expected
     * resolution timescale within ten business days.
     */
    responseBusinessDays: 10,

    /**
     * Date of the most recent recorded hands-on accessibility check.
     *
     * Change this date only after completing and recording the checks below.
     */
    lastTested: "2026-10-14",

    /**
     * Keep only browser and assistive-technology combinations actually tested
     * against the published site.
     */
    testedCombinations: [
      "- Safari on macOS with VoiceOver",
      "- Firefox on macOS with keyboard-only navigation",
      "- Chrome on macOS with keyboard-only navigation",
    ].join("\n"),

    /**
     * Provide more than one feedback route where practical. These entries are
     * rendered directly into the accessibility statement as a Markdown list.
     */
    otherFeedbackRoutes: [
      "- [Email accessibility feedback](mailto:contact@mail.rjmlaird.co.uk?subject=Accessibility%20feedback) — report an accessibility barrier or request content in another format.",
      "- [GitHub accessibility issues](https://github.com/rjmlaird/rjmlaird-master/issues/new?labels=accessibility&title=Accessibility%20issue%3A%20) — report a reproducible accessibility issue.",
      "- [Contact form](https://rjmlaird.co.uk/contact/) — describe the barrier you encountered or request an alternative format.",
    ].join("\n"),
  },

  /**
   * Keep values that are not yet factually verified as explicit TODOs. This
   * causes `npm run check:publish` to fail until the policy is ready to publish.
   */
  policyCompletion: {
    privacy: {
      providerDetails: todo(
        "replace each privacy-policy provider placeholder with the actual provider and service",
      ),
      retentionPeriods: todo(
        "replace each privacy-policy retention placeholder with a verified retention period",
      ),
      dataLocations: todo(
        "replace each privacy-policy data-location placeholder with verified provider information",
      ),
      internationalTransfers: todo(
        "replace each international-transfer placeholder with the applicable transfer safeguard",
      ),
    },

    cookies: {
      consentControl: todo(
        "configure a functioning cookie-preferences control or remove non-essential cookies",
      ),
      technologyInventory: todo(
        "replace cookie and similar-technology placeholders with the actual technologies in use",
      ),
    },
  },
};

export type Site = typeof site;
