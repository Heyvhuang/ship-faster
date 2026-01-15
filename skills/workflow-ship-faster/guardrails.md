# Step 3 — Guardrails (Lightweight Code Standards)

Goal: Establish a code standards baseline that "won't slow down development" with minimal cost.

## Scope (Boundaries)

**Applicable:**
- Next.js projects (prioritize `next lint`)
- Non-Next.js frontend projects (like Vite/React/Vue): Can also use this step to establish lint/format/typecheck baseline, but adapt scripts for current stack (e.g., `vite build`, `eslint .`, `tsc -p tsconfig.json`)

**Not applicable:**
- You want "deep governance/refactoring health check" → Use `review-quality` or `tool-ast-grep-rules`

## Input (Pass Paths Only)

- `repo_root`: Project root directory
- `run_dir`: `.claude/runs/ship-faster/<run_id>/`

## Output (Persisted)

- `03-plans/guardrails-plan.md`
- Optional: `02-analysis/guardrails-current.md` (current state scan)

## Principles

- **Prefer reusing existing conventions**: If project already has eslint/prettier/biome etc., don't introduce a second set.
- **Run first, stricten later**: Default to no "heavy governance", avoid blocking ship.

## Minimum Viable Baseline

1. Ensure `package.json` has clear script entries (add as needed per project state, don't force reorganize):
   - `dev`, `build`, `start`
   - `lint` (Next.js projects prioritize `next lint`)
   - `typecheck` (if using TS)
   - `format` (if using Prettier/Biome)
2. If missing formatter: Choose one (Prettier or Biome), only minimal config.
3. If CI already exists: Just align scripts; if no CI: Recommend completing alongside deployment step.

## Delivery

- Write `03-plans/guardrails-plan.md`: List files and commands to be added/modified
- After changes complete, append verification results to `03-plans/guardrails-plan.md`
