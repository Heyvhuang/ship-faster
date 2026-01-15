# Skills Changelog

This changelog tracks changes to the `skills/` toolkit (not template app code).

## 2026-01-14

- Adopted the latest skills set as the repo’s `skills/` baseline (workflow/tool/review/mcp prefixes).
- Added `skills/manifest.json` (machine-readable skill catalog).
- Added `workflow-template-seeder` / `workflow-template-extractor` to standardize template creation/extraction.
- Migrated the old SaaS starter pack content into `snippets/product-starter/` (skills-first; no packs).
- Refactored long skills for progressive disclosure (moved deep docs into `references/` where applicable).
- Added `review-react-best-practices` (React/Next.js performance rule library) and wired it into the main workflows as a recommended review step.

## 2026-01-15

- Added `tool-ui-ux-pro-max` (searchable UI/UX design intelligence) to the `skills/` catalog.
- Wired optional `tool-ui-ux-pro-max` enrichment into `tool-design-style-selector` and `workflow-ship-faster` to make design specs more concrete (palette/typography/UX guardrails).
- Added `review-quality` as the unified “merge verdict + Clean Code + docs consistency” review entrypoint.
- Archived less-used skills under `skills/_archive/` to keep the default surface area smaller.
- Renamed `publish-x-article` → `tool-x-article-publisher` (tool-prefixed naming).
