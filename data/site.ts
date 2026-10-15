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

  /** Values referenced by content/security.md. */
  security: {
    acknowledgementTarget: "5 working days",
    triageTarget: "10 working days",
    encryptedReporting: todo(
      "if you support encrypted reporting, publish a PGP key or secure reporting form and describe it here; otherwise write 'Encrypted reporting is not currently offered' and say how to arrange a secure transfer",
    ),
  },

  /** Values referenced by content/safeguarding.md and content/tutoring.md. */
  safeguarding: {
    leadName: todo("name of the designated safeguarding lead"),
    leadContact: todo("how to reach the safeguarding lead, for example an email address"),
    checksStatement: todo(
      "state your actual DBS check status and level and the date, or write that checks are available on request; do not claim checks you do not hold",
    ),
    trainingStatement: todo(
      "state the safeguarding training you have actually completed, the provider and the date",
    ),
    recordsRetention: todo("how long safeguarding records are kept, consistent with the retention register"),
  },

  /** Values referenced by content/complaints.md. */
  complaints: {
    acknowledgementDays: todo("business days to acknowledge a complaint, for example 3"),
    responseDays: todo("business days to give a full response, for example 15"),
    adrStatement: todo(
      "name an alternative dispute resolution body if you will use one for consumer complaints, or write that you do not currently use one",
    ),
  },

  /**
   * Commercial terms referenced by content/termsofservice.md, cancellation.md, payments.md and
   * tutoring.md. Every value here is a business decision: set only terms you will actually apply
   * and be able to evidence.
   */
  commercial: {
    rescheduleNotice: todo("minimum notice to reschedule a one-to-one session or call without charge, for example 24 hours"),
    cancellationNotice: todo("minimum notice to cancel a one-to-one session or call for a full refund, for example 48 hours"),
    lateCancellationCharge: todo("what is charged when a client cancels inside the notice period, for example 50% or 100% of the session fee"),
    noShowCharge: todo("what is charged for a no-show, for example 100% of the session fee"),
    lateArrivalWait: todo("how long I wait for a late client before treating the session as a no-show, for example 15 minutes"),
    groupCancellationNotice: todo("minimum notice to cancel or reschedule a workshop, talk or group booking, for example 14 days"),
    groupLateCancellationCharge: todo("what is charged when a workshop, talk or group booking is cancelled inside that notice period, for example the deposit or 50% of the fee"),
    depositTerms: todo("deposit required to secure a larger booking or commission, for example 25% or 50% of the fee, or remove the deposit section"),
    invoiceTermsDays: todo("invoice payment term in days, for example 14"),
    vatStatement: todo("state whether you are VAT-registered and whether quoted fees include or exclude VAT"),
    refundDecisionDays: todo("business days to respond to a refund request, for example 5"),
    refundPaymentDays: todo("business days to return an approved refund to the original payment method, for example 10"),
    liabilityCap: todo("limit on liability to business clients, for example the fees paid for the affected services in the previous 12 months; have this reviewed by a solicitor"),
    apiLimits: todo("state the actual API rate limits and usage allowances, or delete the API section if no API is offered"),
    terminationNotice: todo("notice either side must give to end an ongoing engagement, for example 30 days"),
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
