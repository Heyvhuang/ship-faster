# Archived skills

This folder contains **skills kept for reference or uncommon workflows**.

They are intentionally **not part of the default public surface**:
- They are **excluded from** `skills/manifest.json`
- They are **not listed** in the main README skill table

## How to use an archived skill

Most agents only discover skills by scanning the **top level** of the skills directory (e.g. `~/.claude/skills/<skill>/SKILL.md`).

If you want to use one of these archived skills:

1) Copy it out to the top level of your agent skills directory:

```bash
cp -r skills/_archive/<skill-name> ~/.claude/skills/
```

2) Then trigger it by name as usual.

## What’s inside (and why it’s archived)

### Reviews

- `review-merge-readiness/`
  - **Status**: archived (kept as a standalone “merge verdict” template)
  - **Replacement**: `review-quality` (unified “verdict + maintainability + docs consistency”)

- `review-clean-code/`
  - **Status**: archived (kept as a standalone “Clean Code” lens)
  - **Replacement**: `review-quality` (includes the same maintainability dimensions)

- `review-doc-consistency/`
  - **Status**: archived (kept as a standalone “docs vs code” lens)
  - **Replacement**: `review-quality` (includes docs↔code consistency checks)

> Note: React/Next.js performance review remains **separate** as `review-react-best-practices` (not archived).

### Workflows

- `workflow-execute-plans/`
  - **Status**: archived
  - **Why**: the “3 tasks per batch + verify + pause” rhythm is still useful, but the dedicated workflow is less commonly needed when using strong specs (e.g. OpenSpec) and `workflow-feature-shipper`.

- `workflow-template-extractor/` and `workflow-template-seeder/`
  - **Status**: archived
  - **Why**: template maintenance is a separate activity from “ship an app/feature”; these are kept for when you want to maintain `templates/` as a library.

## Compatibility note

Archived skills are kept as working packages (they still have `SKILL.md`), but they may receive fewer updates than the default surface.

