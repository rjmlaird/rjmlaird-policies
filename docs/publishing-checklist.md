# Publishing checklist

A policy moves `draft` → `review` → `published` by editing `status` in `data/policy-register.ts`.

1. **Fill the gaps.** Replace every `[[TODO: …]]` in `content/` and `data/`. `npm run check:publish`
   lists every one that remains (it fails while any exist).
2. **Resolve registers.** No `unconfirmed` providers, no `template` or `unverified` cookie rows
   (see the Registers section of `review-checklist.md`).
3. **Verify claims against the live site.** Especially accessibility features, consent behaviour,
   retention, and the cookie inventory.
4. **Get legal review where it matters.** The wording is a practical template, not legal advice. Seek
   review for paid consumer services, children, regulated or high-risk subject matter, significant
   commercial contracts or sensitive data.
5. **Set status and dates.** `status: "published"`, `lastReviewed` to today, `lastUpdated` to the date of
   the last text change, bump `version`.
6. **Run `npm run check`** (typecheck + tests). A published policy with a TODO or no `lastReviewed` fails.
7. **Changelog and tag.** Add a CHANGELOG entry, commit, tag `vX.Y.Z`.
8. **Update rjmlaird-master.** Bump the dependency to the new tag and deploy.
9. **Check production.** Each page renders, "Last updated" is correct, in-page contents links work, the
   cookie-preferences button opens your consent manager, footer links point to the right pages, and the
   dev-only `draftNote` does not appear.
10. **Tell people if it matters.** If a change materially affects how personal information is used or
    optional cookies, update the banner/preference centre first and notify affected people as your notice
    promises.
