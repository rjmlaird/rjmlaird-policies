# Changelog

All notable changes to this package. Policy text changes bump the policy's own `version` in
`data/policy-register.ts`; package releases bump `package.json`.

## [0.2.0] - 2026-10-15

### Added
- Nine policies as drafts: `security` (converted from `security.astro`), `safeguarding`, `complaints`,
  and the client suite `termsofservice`, `cancellation`, `payments`, `tutoring`, `mediaconsent`,
  `acceptableuse`. Each has notice copy and a `legalLinks` entry.
- `group` (`public` | `client`) on every register entry.
- `site.security`, `site.safeguarding`, `site.complaints` and `site.commercial`: business terms in one
  place, each an explicit TODO until decided.
- `lib/policy-content.ts` (`renderPolicy(slug)`), exported as `@rjmlaird/policies/policy-content`.

### Fixed
- The `termsofuse` rename was half-done: the content frontmatter still said `terms-of-use`, `notices`
  `related` used a key that does not exist in `legalLinks` (this would have broken `LegalNotice.astro` at
  runtime), and the disclaimer linked to `/terms-of-use/`. Added `policyLinkKeys` (slug to link key) as the
  single mapping and pointed both test files at it.
- Disclaimer bumped to 0.1.1 (link fix); lastUpdated 2026-10-15.
- README render example no longer relies on a fragile `import.meta.glob` path into `node_modules`.
- Removed a stray duplicate title at the end of the README.

### Note
- Route for terms of use is `/termsofuse/` (as set in the register). If `/terms-of-use/` was ever live,
  add a redirect.

## [0.1.0] - 2026-10-14

### Added
- Initial MVP package: five policies as Markdown (`privacy`, `cookies`, `terms`, `disclaimer`,
  `accessibility`), converted from the existing Astro pages with wording unchanged.
- Registers: `site`, `policy-register`, `processors` (with processing activities), `cookies`,
  `retention`, `notices`.
- Zod schemas for policies, processors/retention and cookies.
- `lib/render.ts`: variable interpolation, register-driven table includes, section extraction.
- Tests for policy wiring, register integrity and the placeholder/publishing gate.
- Docs: data flow, review checklist, publishing checklist.

### Changed (from the original Astro pages)
- Dates, status and next review live in one register instead of per-page constants.
- Processing table, provider list, transfers, retention and cookie inventory are generated from data.
- Pre-publish notes moved to `data/notices.ts` (`draftNote`); the privacy page's note previously
  rendered publicly via `footer-note`.
- In-page TODO notes that were instructions to the author rather than text to fill in
  (cookie-audit reminder, "update if you add automated decisions") moved to the review checklist.

### Not included
- `security.astro` (kept in rjmlaird-master; no `content/security.md` yet) and the safeguarding policy.
- Astro layout and components (`LegalNotice`, `DataTable` etc.), which stay in rjmlaird-master.

[0.1.0]: #
