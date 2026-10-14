# Changelog

All notable changes to this package. Policy text changes bump the policy's own `version` in
`data/policy-register.ts`; package releases bump `package.json`.

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
