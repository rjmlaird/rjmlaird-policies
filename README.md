# rjmlaird-policies

Legal and policy content for the rjmlaird.co.uk estate, as an importable package. Policies are Markdown;
everything that changes (contact details, providers, cookies, retention, dates, status) lives in typed
registers, validated by tests. `rjmlaird-master` supplies the layout and renders it.

```
rjmlaird-policies/
├── content/      privacy · cookies · terms · disclaimer · accessibility  (.md, H2 and below)
├── data/         site · policy-register · processors · cookies · retention · notices  (.ts)
├── schemas/      policy · processor · cookie  (zod)
├── lib/          placeholders.ts · render.ts
├── docs/         data-flow · review-checklist · publishing-checklist
├── tests/        policies · registers · placeholders
└── index.ts      re-exports everything
```

## Install into rjmlaird-master

The package ships TypeScript source and is consumed through Vite/Astro. Pick one:

```jsonc
// rjmlaird-master/package.json
"@rjmlaird/policies": "github:<your-org>/rjmlaird-policies#v0.1.0"   // pinned git tag
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

One dynamic page replaces the five hand-written ones. This is a sketch: the package and its tests are
verified, the Astro wiring is not run here, so adjust to your Astro version.

```astro
---
// src/pages/[policy].astro
import LegalNoticeLayout from "../layouts/LegalNotice.astro";
import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import { policyRegister, notices, renderPolicyMarkdown, extractSections } from "@rjmlaird/policies";

export function getStaticPaths() {
  return policyRegister.map((p) => ({
    params: { policy: p.route.replaceAll("/", "") },
    props: { slug: p.slug },
  }));
}

const { slug } = Astro.props;
const entry = policyRegister.find((p) => p.slug === slug)!;
const notice = notices[slug];

const files = import.meta.glob("/node_modules/@rjmlaird/policies/content/*.md", { query: "?raw", import: "default", eager: true });
const raw = Object.entries(files).find(([k]) => k.endsWith(`/${slug === "terms" ? "terms" : slug}.md`))![1] as string;

const { markdown } = renderPolicyMarkdown(raw);
const { code } = await (await createMarkdownProcessor()).render(markdown);
---
<LegalNoticeLayout
  title={entry.title}
  description={notice.description}
  eyebrow={notice.eyebrow}
  lead={notice.lead}
  summary={notice.summary}
  lastUpdated={entry.lastUpdated}
  sections={extractSections(markdown)}
  related={notice.related}
>
  <Fragment set:html={code} />
  <p slot="draft-note">{notice.draftNote}</p>
</LegalNoticeLayout>
```

If the glob does not resolve through your install method, import each file with
`import raw from "@rjmlaird/policies/content/privacy.md?raw"` instead. Wire the button
`[data-open-cookie-preferences]` to your consent manager, then set `site.consent.managerConfigured = true`.

## Content syntax

| Syntax | Meaning |
| --- | --- |
| `{{site.contactEmail}}` | Variable from `site` or `policy.<slug>.*` |
| `{{site.contactEmail \| mailto}}` | Filters: `mailto`, `link`, `link:Label`, `date` |
| `{{include:retention}}` | Table or list generated from a register: `processing-activities`, `processors`, `transfers`, `retention`, `cookie-inventory`, `cookie-preferences` |
| `[[TODO: what is needed]]` | Unresolved text. Blocks publishing. `todo()` makes one in data files |

Unconfirmed providers and unverified cookies render with an automatic TODO marker, so the gate catches
register gaps as well as prose gaps.

## Scripts

| Command | Does |
| --- | --- |
| `npm test` | Policy wiring, register integrity, placeholder rules. Drafts may contain TODOs |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | Both |
| `npm run check:publish` | Strict: fails while any TODO remains in any policy or `site.ts` |

## Starting state (what to do first)

All five policies are `draft`. The wording is a faithful conversion of your existing Astro pages.
`npm run check:publish` currently lists what is left. In order:

1. `data/site.ts`: copy `contactEmail`, `privacyEmail`, `impactOrbitUrl` (and confirm `controllerName`,
   `country`, the `/contact/` route in `notices.ts`) from your existing `siteLegal`/`legalLinks`.
2. `data/processors.ts`: seeded with Cloudflare, Stripe, Cal.com, Fillout, HubSpot and Notion as
   `unconfirmed`, plus placeholders for email, newsletter, analytics and accounting. Confirm, correct,
   then mark `active`. Provider privacy links were written from memory: check them.
3. `data/retention.ts` and `data/cookies.ts`: decide periods; replace template cookies with a real audit.
4. `site.accessibility`: response times, last-tested date, tested browser/assistive-tech combinations.

Not included: `security.astro` (stays in master; add `content/security.md` if you want it moved) and the
safeguarding policy that the privacy notice links to. See `docs/` for review and publishing steps.
# rjmlaird-policies
