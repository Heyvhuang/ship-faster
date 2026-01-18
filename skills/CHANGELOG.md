# Skills Changelog

This changelog tracks changes to the `skills/` toolkit (not template app code).

## 2026-01-18

- Migrated run artifacts to an OpenSpec-style lifecycle: `runs/<workflow>/{active,archive}/` (or `openspec/changes/` when OpenSpec is detected).
- Simplified per-run structure: `proposal.md` + `tasks.md` (+ `context.json`) with `evidence/` for large outputs (no more `00-index/03-plans/02-analysis/05-final` by default).
- Updated review skills to persist reports under `run_dir/evidence/` when `run_dir` is provided.

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

## 2026-01-16

- Fixed `tool-ui-ux-pro-max/SKILL.md` line endings to LF (CRLF can cause some skill loaders to miss the skill entirely).
- Expanded UI/UX trigger phrases (added `UIUX`/`uiux` and common UX design synonyms) to improve routing accuracy.
- Made `tool-ui-ux-pro-max` enrichment default when installed in `tool-design-style-selector` and `workflow-ship-faster`.
- Added a “Brainstorm-lite + demo moment” kickoff to `workflow-ship-faster` to avoid shipping a basic, hard-to-demo MVP.
- Added a required scope confirmation step to `workflow-ship-faster` so core steps are not silently marked as skipped.
- Updated `workflow-feature-shipper` to support `mode: plan-only` and demo-ready UI acceptance criteria by default.
- Changed feature plan artifact naming to `03-plans/features/<feature_slug>-plan.md` to avoid overwriting plans across multiple iterations.
- Tightened `skill-creator/scripts/quick_validate.py` to reject CRLF/CR in `SKILL.md`.
- Standardized skill docs to be English-only (removed non-English trigger phrases and symbols).
