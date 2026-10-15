# rjmlaird-policies

Legal and policy content for the rjmlaird.co.uk estate, as an importable package. Policies are Markdown;
everything that changes (contact details, providers, cookies, retention, commercial terms, dates, status)
lives in typed registers, validated by tests. `rjmlaird-master` supplies the layout and renders it.

```
rjmlaird-policies/
├── content/      14 policies (.md, H2 and below), see the table below
├── data/         site · policy-register · processors · cookies · retention · notices  (.ts)
├── schemas/      policy · processor · cookie  (zod)
├── lib/          placeholders.ts · render.ts · policy-content.ts
├── docs/         data-flow · review-checklist · publishing-checklist
├── tests/        policies · registers · placeholders · policy-content
└── index.ts      re-exports everything except policy-content (Vite-only)
```

## Policies

| Group | Slug | Route | Status |
| --- | --- | --- | --- |
| public | `privacy` | `/privacy/` | draft |
| public | `cookies` | `/cookies/` | draft |
| public | `termsofuse` | `/termsofuse/` | published |
| public | `disclaimer` | `/disclaimer/` | published |
| public | `accessibility` | `/accessibility/` | published |
| public | `security` | `/security/` | draft |
| public | `safeguarding` | `/safeguarding/` | draft |
| public | `complaints` | `/complaints/` | draft |
| client | `termsofservice` | `/termsofservice/` | draft |
| client | `cancellation` | `/cancellation/` | draft |
| client | `payments` | `/payments/` | draft |
| client | `tutoring` | `/tutoring/` | draft |
| client | `mediaconsent` | `/mediaconsent/` | draft |
| client | `acceptableuse` | `/acceptableuse/` | draft |

`public` policies apply to anyone using the site. `client` policies apply when someone books, pays or
commissions work. `data/policy-register.ts` is the source of truth for status; keep this table in step.
Not in the package: the data-processing agreement (a contract template to issue per client, not a web page).

## Install into rjmlaird-master

The package ships TypeScript source and is consumed through Vite/Astro. Pick one:

```jsonc
// rjmlaird-master/package.json
"@rjmlaird/policies": "github:<your-org>/rjmlaird-policies#v0.2.0"   // pinned git tag
"@rjmlaird/policies": "file:../rjmlaird-policies"                    // local development
```

```js
// astro.config.mjs
export default defineConfig({
  vite: { ssr: { noExternal: ["@rjmlaird/policies"] } }, // so Vite compiles the TS
});
```

Replace `src/data/legal.ts` with:

```ts
export { site as siteLegal, legalLinks, type LegalLinkKey } from "@rjmlaird/policies";
```

## Render a policy

One dynamic page replaces the hand-written ones. `renderPolicy()` loads the Markdown through Vite, fills
variables, expands register tables and returns the sections for the "On this page" nav. This is a sketch:
the package and its tests are verified, the Astro wiring is not run here, so adjust to your Astro version.

```astro
---
// src/pages/[policy].astro
import LegalNoticeLayout from "../layouts/LegalNotice.astro";
import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import { policyRegister } from "@rjmlaird/policies";
import { renderPolicy } from "@rjmlaird/policies/policy-content";

export function getStaticPaths() {
  return policyRegister
    .filter((p) => p.status !== "draft" || import.meta.env.DEV) // never ship drafts
    .map((p) => ({ params: { policy: p.route.replaceAll("/", "") }, props: { slug: p.slug } }));
}

const { slug } = Astro.props;
const { markdown, entry, notice, sections } = renderPolicy(slug);
const { code } = await (await createMarkdownProcessor()).render(markdown);
---
<LegalNoticeLayout
  title={entry.title}
  description={notice.description}
  eyebrow={notice.eyebrow}
  lead={notice.lead}
  summary={notice.summary}
  lastUpdated={entry.lastUpdated}
  sections={sections}
  related={notice.related}
>
  <Fragment set:html={code} />
  <p slot="draft-note">{notice.draftNote}</p>
</LegalNoticeLayout>
```

Wire the button `[data-open-cookie-preferences]` to your consent manager, then set
`site.consent.managerConfigured = true`. Routes are `entry.route`: if a policy was previously live at a
different URL (for example `/terms-of-use/`), add a redirect.

## Content syntax

| Syntax | Meaning |
| --- | --- |
| `{{site.contactEmail}}` | Variable from `site` or `policy.<slug>.*` (nested paths work: `site.commercial.invoiceTermsDays`) |
| `{{site.contactEmail \| mailto}}` | Filters: `mailto`, `link`, `link:Label`, `date` |
| `{{include:retention}}` | Table or list generated from a register: `processing-activities`, `processors`, `transfers`, `retention`, `cookie-inventory`, `cookie-preferences` |
| `[[TODO: what is needed]]` | Unresolved text. Blocks publishing. `todo()` makes one in data files |

Unconfirmed providers and unverified cookies render with an automatic TODO marker, so the gate catches
register gaps as well as prose gaps.

Business terms (notice periods, charges, payment terms, liability cap, API limits) live in
`site.commercial`; safeguarding details in `site.safeguarding`; complaint timings in `site.complaints`;
security targets in `site.security`. Each is a decision for you, entered as `todo()` until set, so the
policies cannot contradict each other.

## Scripts

| Command | Does |
| --- | --- |
| `npm test` | Policy wiring, register integrity, placeholder rules. Drafts may contain TODOs |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | Both |
| `npm run check:publish` | Strict: fails while any TODO remains in any policy or `site.ts` |

A policy with `status: "published"` must have no TODOs and a `lastReviewed` date, in normal `npm test`.

## What to do next

`npm run check:publish` lists what is left. In rough order:

1. `data/site.ts`: set every `commercial`, `safeguarding`, `complaints` and `security.encryptedReporting`
   value, and confirm `securityEmail` against your live `security.txt`.
2. `data/processors.ts`, `data/cookies.ts`: confirm providers, locations and transfer safeguards; replace
   template cookies with a real audit; then publish privacy and cookies.
3. Publish the client policies together (terms of service, cancellation, payments, tutoring) because they
   refer to each other, then link them from the published terms of use.
4. Get legal review of the client policies and of safeguarding before using them with consumers or children.

See `docs/` for the review and publishing checklists.
