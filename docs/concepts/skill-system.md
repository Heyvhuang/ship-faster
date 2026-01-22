# Skill System (SSOT + Generation)

This repo is a **skills package** designed to work with agent skill loaders (e.g. skills.sh / Claude Code / other agent runtimes).

The system is built to minimize drift by making **`skills/*/SKILL.md` the single source of truth (SSOT)**, and generating catalogs/assets from it.

## What is SSOT?

- **SSOT**: `skills/<skill>/SKILL.md` frontmatter (`name`, `description`, optional `metadata`, optional `allowed-tools`, ...)
- **Not SSOT**:
  - `skills/manifest.json` (generated)
  - `skills/assets/skills-map.svg` (generated)
  - `docs/skills-catalog.md` (generated)

## Skill surfaces

- **Default surface**: top-level folders under `skills/` (excluding `skills/assets/` and `skills/_archive/`)
- **Archived surface**: `skills/_archive/*` (reference-only; not published in default catalogs)

## Frontmatter compatibility (ecosystem)

We align with common skills.sh ecosystem conventions:

- `allowed-tools` may be a **string** or a **YAML list of strings**.
- `metadata` may contain common fields such as `version`, `tags`, etc.
- `argument-hint` is allowed (string).

Validation lives in:

- `skills/skill-creator/scripts/quick_validate.py`

## How to sync generated artifacts

Generation scripts live in:

- `skills/skill-creator/scripts/`

Recommended workflow (run from repo root):

```bash
# Generate/refresh catalogs and assets
python skills/skill-creator/scripts/sync_catalog.py

# Lint skills (quality gates)
python skills/skill-creator/scripts/skill_lint.py
```

## Closed-loop improvement (runs -> evolution -> patches)

This repo includes optional hooks that record failures and generate candidates for improvement:

- Hooks: `skills/skill-evolution/hooks/`
- Outputs: `runs/evolution/<run_id>/`
- Analyzer skill: `skills/skill-improver/`

High-level loop:

1. Run agent work as usual
2. Hooks capture failures/events into `runs/evolution/...`
3. Use `skill-improver` to turn those artifacts into concrete patch suggestions
4. Apply changes to skills, re-run lint/sync, and verify the same failure no longer repeats
