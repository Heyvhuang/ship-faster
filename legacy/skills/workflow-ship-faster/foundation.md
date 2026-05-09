# Step 1 — Next.js Foundation (target: 16.1.1)

Goal: Get the project to a sustainable Next.js baseline (preferably **16.1.1**) with minimal risk.

## Input (Pass Paths Only)

- `repo_root`: Project root directory path (doesn't exist means "new project")
- `run_dir`: Resolved run directory (see `workflow-ship-faster` → **Artifact Storage**)
- `target_next_version`: Default `16.1.1`

## Output (Persisted)

- `evidence/foundation.md`
- `tasks.md` (Foundation checklist section: tasks + verification)

## Plan (Checklist Required)

Before making changes:
- Add a **Foundation** checklist section to `tasks.md` (checkboxes + verification)
- If the plan includes risky migrations/upgrades, add an **Approval** item under `tasks.md` and wait for explicit user confirmation

## 0) Stack Assessment Gate (Decide Whether to Migrate First)

> Purpose of this step: Avoid "migrating to Next.js for the sake of Next.js".  
> Especially: **Vite/static sites/pure display pages** often aren't worth forcing migration for Ship Faster.

### 0.1 Quick Stack Identification (Required When Repo Exists)

Use minimum evidence set to determine current stack (don't guess):
- `package.json` dependencies/scripts: `next`, `vite`, `react-scripts`, `astro`, `nuxt`, `sveltekit`...
- Framework config exists: `next.config.*`, `vite.config.*`, `astro.config.*`, `nuxt.config.*`
- Routing/page structure: `app/` `pages/` (Next), `src/pages` (common in Vite/SPA), `public/` (static assets)
- Deploy/output: `vercel.json`, `netlify.toml`, build scripts (build output directory)

Write conclusion to `evidence/foundation.md`:
- Current stack: <detected>
- Evidence: <files/keys>

### 0.2 Ask One Question: Need to Migrate to Next.js?

When repo is **not Next.js**, ask user (multiple choice):

> Which situation best describes this project?
> 1) Pure static site/marketing page/display page (no SSR/API/auth/DB needed) → **Don't migrate**
> 2) Simple now, but soon becoming "full Web App" (auth, DB, dashboard, SEO, SSR/ISR) → **Recommend migrate**
> 3) Already mature engineering (lots of custom build/multi-package/complex routing) → **Don't auto-migrate**, only provide migration plan

Decision persisted (write to top of `evidence/foundation.md`, one clear line):
- Decision: `keep-current-stack` | `migrate-to-nextjs` | `plan-only-no-auto-migrate`

> Rule: When user chooses 1), don't "migrate anyway". This isn't a bug, it's strategy.

## Decision Tree (Must Follow)

### A) New Project (idea → project)

- Goal: Fastest path to runnable Next.js app (can `dev`, can `build`)
- Constraint: Minimize modifications, get main chain running first

Recommendation: Use `create-next-app` to create, then pin `next` version to `16.1.1`.

### B) Already Next.js Project

1. Identify current version (from `package.json` or lockfile)
2. If already `16.1.1`: No upgrade needed, just record "already at target"
3. If not `16.1.1`: Evaluate "is project too large"

**Project too large (default don't upgrade)** signals (any one triggers stop first):
- Lots of custom build: Complex `next.config.*` (webpack rewrites, complex rewrites/headers)
- Multi-package/monorepo structure is complex and CI build time is long
- Obvious framework migration history or lots of unconverged experimental features

When "too large":
- In `tasks.md`, write a **plan-only** Foundation section (upgrade risks, phased approach, rollback strategy)
- Don't auto-upgrade, wait for user confirmation

When not "too large":
- Upgrade to `16.1.1` (and record changes and verification results)

### C) Not Next.js but Very Small Prototype (Can Migrate)

Only migrate when "very small and confirmed migrate (Decision = migrate-to-nextjs)":
- Very small: Single package, few dependencies, simple routing/build logic
- Migration is definitely high effort: add an **Approval** item to `tasks.md` and wait for confirmation

Recommended migration route:
1. Create new Next.js 16.1.1 baseline project
2. Migrate UI components/business logic (prioritize no UI style changes)
3. Gradually replace routing and data fetching patterns

### D) Not Next.js and Not Migrating (Keep Current Stack)

When Decision = `keep-current-stack`:
- Don't do Next.js migration/upgrade actions
- In `tasks.md`, write a short "keep current stack" plan (e.g.: design system → guardrails → docs → deploy)
- Clearly state: Subsequent "Supabase/Stripe integration" are **Next.js adapters**; if still need DB/payment integration, need to:
  - Either migrate to Next.js first
  - Or add integration step for that stack (e.g., `vite + supabase`), underlying DB operations still reuse `supabase` skill

## Verification (Required After Every Change)

- `npm/pnpm/yarn dev` can start
- `build` passes (if project has it configured)
- Key pages can open

Write verification results to `evidence/foundation.md`.
