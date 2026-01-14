---
name: skill-creator
description: "Create or refactor Ship Faster-style skills (SKILL.md + references/ + scripts/). Use when adding a new skill, tightening trigger descriptions, splitting long docs into references, defining artifact-first I/O contracts, or packaging/validating a skill."
license: "MIT (see repo LICENSE)"
---

# Skill Creator

Build skills that behave like “mini senior engineers”: trigger correctly, run deterministically, and leave resumable artifacts on disk.

## What good looks like (Ship Faster standard)

- `SKILL.md`: short and triggerable (routing + safety + I/O + output contract). Avoid long tutorials here.
- `references/`: deep docs loaded only when needed (progressive disclosure). Link directly from `SKILL.md`.
- `scripts/`: deterministic helpers for repetitive/fragile work (prefer this over re-writing code in chat).
- `assets/`: templates or files to copy (not meant to be loaded into context).

Deep guidance:
- Progressive disclosure + authoring principles: [`references/skill-design-principles.md`](references/skill-design-principles.md)
- Workflow structure patterns: [`workflows.md`](workflows.md)
- Output templates/patterns: [`output-patterns.md`](output-patterns.md)

## Creation flow (recommended)

1. **Collect trigger examples** (real user phrases that should activate the skill).
2. **Define the I/O contract** (paths only) + required artifacts:
   - What files does the skill read?
   - What files must it write (plans, evidence, summaries)?
3. **Implement reusable resources first**:
   - add `scripts/` for deterministic steps
   - add `references/` for heavy documentation
   - add `assets/` for templates / boilerplate
4. **Write `SKILL.md` last**:
   - frontmatter `description` should include trigger phrases
   - body should be short and link out to the resources above
5. **Validate + package** (optional) using the scripts below.

## Scripts

All scripts live in `scripts/` in this skill folder.

### Initialize a new skill folder

```bash
python scripts/init_skill.py <skill-name> --path <output-directory>
```

### Validate a skill (frontmatter + basic conventions)

```bash
python scripts/quick_validate.py /path/to/<skill-name>
```

### Package a skill into a distributable `.skill` zip (optional)

```bash
python scripts/package_skill.py /path/to/<skill-name> [output-directory]
```

## Notes for Ship Faster contributors

- Prefer prefix naming: `workflow-`, `tool-`, `review-`, `mcp-`, `skill-`, `publish-`.
- Keep side effects gated: write a plan first, ask for explicit confirmation, then execute, then verify.
- If you add/remove a skill, update the catalog: `skills/manifest.json`.

## Archived full guide

The previous (long-form) version of this skill is preserved at:
- [`references/legacy-skill-creator.md`](references/legacy-skill-creator.md)

