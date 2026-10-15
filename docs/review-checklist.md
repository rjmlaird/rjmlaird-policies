# Review checklist

Run at least every `reviewCadenceMonths` (12) per policy, and whenever a trigger below happens.
After a review: set `lastReviewed` in `data/policy-register.ts`, bump `version` if text changed, add a
CHANGELOG line.

## Triggers (review immediately)

- A new provider, form, embed, analytics tool, tag manager or newsletter platform.
- A new subdomain or product that collects data or sets cookies.
- A change to what the webhook gateway, booking flow or CRM stores, or for how long.
- Starting to use AI tools on client or enquirer data, or adding automated decisions or profiling.
- Offering services to under-18s, or starting to process special-category data regularly.
- A data incident, accessibility complaint or rights request that exposed a gap.
- Material changes to UK data-protection or cookie rules (check current ICO guidance).

## Registers

- [ ] `processors.ts`: every provider that touches personal data is listed; each `unconfirmed` one is checked
      against the real account; location, transfer safeguard and a data-processing agreement are confirmed.
- [ ] `processors.ts`: `planned`/`retired` statuses are accurate (they are hidden from the notice).
- [ ] `retention.ts`: every period is decided and actually enforced (deletion jobs, CRM rules, log settings).
      Financial-record periods confirmed with your accountant.
- [ ] `cookies.ts`: replaced the template rows with a real audit (clean profile, accept-all and reject-all,
      every page, forms, embeds, booking links). Set `status: "verified"` and `lastAudited`.
- [ ] `site.ts`: contact and privacy emails work and are monitored; `controllerName` is right; the ICO
      data protection fee is paid or you have confirmed an exemption.

## Per policy

- **Privacy:** the "Information collected" lists match your real forms; the table matches real processing;
  "no automated decisions" is still true; the newsletter section is kept or removed; the special-category
  TODO is resolved; the cookie notice lists everything this page says it lists.
- **Cookies:** the banner or preference control works; reject is as easy as accept; no optional technology
  loads before consent; analytics and preference wording matches the real configuration; marketing section
  matches reality.
- **Terms:** matches real functionality (downloads, logins, embeds, AI tools, bookings). Paid services have
  their own written terms.
- **Disclaimer:** AI-use statement is accurate; service routes and links are current.
- **Accessibility:** each feature claimed is true on the live site; known-limitations rows match reality;
  last-tested date and tested combinations are real; conformance claim is no stronger than the evidence.

## Client and public policies added in 0.2.0

- **Terms of service:** acceptance method recorded; liability cap and IP position reviewed by a solicitor;
  business vs consumer wording is right for who you actually sell to; AI-tools paragraph is true.
- **Booking and cancellation:** every notice period and charge in `site.commercial` matches your booking
  tool's reminders, rescheduling links and Stripe checkout text; the consumer 14-day section is confirmed
  by a legal adviser and the booking flow collects the express request to start early.
- **Payments:** payment methods, VAT position, deposit and late-payment terms are real; refund timings
  match what your payment provider does.
- **Tutoring:** age ranges, platform and parent/carer arrangements are real; consistent with safeguarding.
- **Safeguarding:** lead named, DBS and training statements true and dated (or removed), reviewed by
  someone qualified before working with children.
- **Media consent:** you know whether you record; a consent mechanism exists and consents are recorded.
- **Acceptable use:** delete sections for services you do not run; API limits and content licence set.
- **Complaints and security:** response times you can meet; security inbox monitored.
- [ ] The same figure never appears in prose and in `site.commercial` with different values.

## Cross-checks

- [ ] Every link in the policies works, including the safeguarding page referenced by the privacy notice.
- [ ] `security.astro` and `/.well-known/security.txt` agree with `site.securityEmail`.
- [ ] `npm run check` passes.
