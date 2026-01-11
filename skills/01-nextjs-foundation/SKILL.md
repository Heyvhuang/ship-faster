---
name: 01-nextjs-foundation
description: "Create, upgrade, or migrate to a Next.js 16.1.1 baseline for shipping fast. Use when starting a project from an idea, when an existing repo is already Next.js and needs a safe upgrade, or when a small non-Next prototype should migrate to Next.js. Includes a decision gate: upgrade if safe, skip if project is large, migrate only if small and confirmed."
---

# Next.js Foundation (target: 16.1.1)

Goal: Land the project on a sustainable, iterable Next.js baseline (preferring **16.1.1**) with minimal risk.

## Input (pass paths only)

- `repo_root`: Project root directory path (if not exists, means "create new project")
- `run_dir`: `.claude/runs/ship-faster/<run_id>/`
- `target_next_version`: Default `16.1.1`

## Output (write to disk)

- `02-analysis/foundation.md`
- `03-plans/foundation-plan.md`
- `03-plans/approval.md` (only when major upgrade/migration/large-scale changes are needed)

## Decision Tree (must follow)

### A) New Project (idea → project)

- Goal: Get a runnable Next.js app as fast as possible (can `dev`, can `build`)
- Constraint: Minimize customization, get the main chain running first

Recommendation: Use `create-next-app` to create, then pin `next` version to `16.1.1`.

### B) Already a Next.js Project

1. Identify current version (from `package.json` or lockfile)
2. If already `16.1.1`: Do not upgrade, just record "already compliant"
3. If not `16.1.1`: Evaluate "whether the project is too large"

**Signals that project is too large (default: do not upgrade)** (stop if any is met):
- Heavy custom build: Complex `next.config.*` (webpack overrides, complex rewrites/headers)
- Multi-package/monorepo structure is complex and CI build time is long
- Has obvious framework migration history or many unconverged experimental features

When "too large" is met:
- Only output `foundation-plan.md` (upgrade risks, step-by-step plan, rollback strategy)
- Do not auto-upgrade, wait for user confirmation

When "too large" is not met:
- Upgrade to `16.1.1` (and record changes and verification results)

### C) Not Next.js but a Small Prototype (can migrate)

Only proceed when "very small and migration confirmed":
- Very small: Single package, few dependencies, simple routing/build logic
- Migration is always high effort: Must write `approval.md` first and wait for confirmation

Recommended migration path:
1. Create new Next.js 16.1.1 baseline project
2. Migrate UI components/business logic (prioritize no UI style changes)
3. Gradually replace routing and data fetching methods

## Verification (required after every change)

- `pnpm dev` can start
- `build` passes (if project is configured)
- Key pages can be opened

Write verification results to `02-analysis/foundation.md`.
