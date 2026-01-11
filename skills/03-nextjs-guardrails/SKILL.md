---
name: 03-nextjs-guardrails
description: "Set up lightweight code guardrails for Next.js to ship faster: minimal lint/format/typecheck scripts, align existing ESLint/Prettier conventions, and add CI hooks only when missing. Use when starting a new Next.js repo, when code style is inconsistent, or when you want a fast baseline before building core features."
---

# Next.js Guardrails (Lightweight Code Standards)

Goal: Establish a code standards baseline with minimal cost that won't slow down development.

## Input (Pass Paths Only)

- `repo_root`: Project root directory
- `run_dir`: `.claude/runs/ship-faster/<run_id>/`

## Output (Persisted to Disk)

- `03-plans/guardrails-plan.md`
- Optional: `02-analysis/guardrails-current.md` (current state scan)

## Principles

- **Prefer reusing existing conventions**: If the project already has eslint/prettier/biome, don't introduce a second set.
- **Make it run first, then make it strict**: No "heavy governance" by default to avoid blocking ship.

## Minimum Viable Baseline

1. Ensure `package.json` has explicit script entries (add as needed based on current project state, don't force reorganization):
   - `dev`, `build`, `start`
   - `lint` (for Next.js projects, prefer `next lint`)
   - `typecheck` (if using TS)
   - `format` (if using Prettier/Biome)
2. If missing a formatter: choose one (Prettier or Biome) with minimal configuration only.
3. If CI already exists: align scripts accordingly; if no CI: recommend completing it together with `08-github-vercel-deploy`.

## Deliverables

- Write `03-plans/guardrails-plan.md`: list files and commands to be added/modified
- After changes are complete, append verification results to `03-plans/guardrails-plan.md`
