---
name: 00-workflow-ship-faster
description: "Ship faster end-to-end workflow for Next.js 16.1.1: start from an idea or an existing small prototype, converge on a Next.js baseline, apply design/style rules, add lightweight code+doc guardrails, ship core features, integrate Supabase and Stripe, deploy via GitHub+Vercel, then add AI-era SEO (sitemap/robots/llms.txt). Use when the user wants an opinionated, resumable pipeline under .claude/runs/."
---

# Workflow: Ship Faster (Next.js 16.1.1)

The goal of this pipeline is: **Get an idea or small prototype to production-ready state in the shortest time**, while maintaining velocity for subsequent iterations.

## Core Principles

- **Only pass paths, not content**: Agents/sub-agents only pass `..._path` between each other.
- **Files are first-class citizens**: Every step must produce persisted artifacts; failures can be re-run; everything is replayable.
- **Confirmation points**: Any "high-risk/high-effort/side-effect" action must first write a plan and wait for confirmation.

## Run Directory (Unified Contract)

Create in the target project root: `.claude/runs/ship-faster/<run_id>/`

Recommended structure:

- `01-input/goal.md`: Goals, scope, launch timeline, constraints
- `01-input/context.json`: Project path, entry type (idea|prototype), whether db/billing/deploy/seo is needed
- `02-analysis/`: Detection and evidence (versions, structure, risk assessment)
- `03-plans/`: Executable plans + `approval.md`
- `04-parallel/`: Parallel subtask artifacts
- `05-final/`: Final delivery summary
- `logs/events.jsonl`, `logs/state.json`

## Process (Default Route)

### 0) Initialize Run

1. Create run directory and write:
   - `01-input/goal.md`
   - `01-input/context.json`
2. If missing critical information (project path/whether to integrate DB/whether to add billing/deployment target), fill in `context.json` first.

### 1) Foundation: Next.js Foundation (Required)

Invoke `01-nextjs-foundation`:
- If new project: Create a minimal runnable Next.js **16.1.1** skeleton
- If already Next.js: Try to upgrade to **16.1.1**; but if project is too large/high risk, skip upgrade by default and document the reason
- If other tech stack but small: Can migrate to Next.js (requires confirmation)

Artifacts:
- `02-analysis/foundation.md` (Current state + risk assessment + chosen route)
- `03-plans/foundation-plan.md` (Commands/changes to execute)
- If upgrade/migration needed with significant changes: Write `03-plans/approval.md` and wait for confirmation

### 2) Style Guidelines (Required)

Invoke `02-design-style-selector`: Scan project intent and generate `design-system.md`.

Confirmation point: Deploy only after user confirms the style.

### 3) Code Guardrails (Lightweight, Required)

Invoke `03-nextjs-guardrails`:
- Prefer reusing existing eslint/prettier/tsconfig conventions
- If none exist: Establish minimal lint/format/typecheck entry points (no heavy governance)

Artifacts: `03-plans/guardrails-plan.md`

### 4) Documentation Baseline (Lightweight, Required)

Invoke `04-docs-baseline`:
- Only ensure "new team members can run the project in 5 minutes + know how to deploy + know env vars"
- No deep documentation audit (use `doc-consistency-reviewer` when needed)

Artifacts: `03-plans/docs-plan.md`, plus project README updates

### 5) Core Feature Development (Iterative Loop)

Invoke `05-feature-shipper`:
- Each feature first produces `feature-plan.md` (including acceptance criteria/non-goals)
- Default to PR-sized small steps
- Hand off UI visual changes to frontend design agent (when necessary)

### 6) Database Integration (Optional)

If `context.json` specifies DB is needed: Invoke `06-nextjs-supabase`.

### 7) Payment Integration (Optional)

If `context.json` specifies billing is needed: Invoke `07-nextjs-stripe`.

### 8) GitHub + Vercel Deployment (Optional but Recommended)

Invoke `08-github-vercel-deploy`:
- Set up repo/CI
- Connect to Vercel
- Configure environment variables
- Output accessible preview/prod URLs

### 9) AI-Era SEO (Optional but Recommended)

Invoke `09-ai-seo-nextjs`:
- sitemap/robots
- llms.txt
- metadata/OG/structured data

## Final Delivery

Write to: `05-final/ship-summary.md`, must include at least:
- Current project status (can it run locally, can it build, is it deployed)
- Completed steps and artifact paths
- Next steps (sorted by impact)

After completion, optionally invoke `skill-improver` to retrospect this run.
