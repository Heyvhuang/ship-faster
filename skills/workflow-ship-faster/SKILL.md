---
name: workflow-ship-faster
description: "Ship Faster end-to-end workflow for small web apps (default: Next.js 16.1.1): idea/prototype → foundation gate → design-system.md → lightweight guardrails + docs → feature iteration → optional Supabase + Stripe → optional GitHub + Vercel deploy → optional AI-era SEO (sitemap/robots/llms.txt). Resumable, artifact-first under .claude/runs/ship-faster/."
---

# Workflow: Ship Faster (Next.js 16.1.1)

The goal of this chain is: **Ship an idea or small prototype to production-ready state in the shortest time**, while maintaining iteration speed afterward.

## Core Principles

- **Pass paths only, not content**: agents/sub-agents only pass `..._path`.
- **Files are first-class citizens**: Every step must persist artifacts; failures can be retried; replayable.
- **Confirmation points**: Any "high-risk/high-effort/side-effect" action must write a plan first and wait for confirmation.
- **Progressive disclosure**: Only open step files in this skill directory (`foundation.md`, `deploy-vercel.md`, etc.) when needed—avoid loading all details at once.

## Run Directory (Unified Contract)

Create in target project root: `.claude/runs/ship-faster/<run_id>/`

### Run Top-Level Navigation (Required)

To solve "run grows too large, LLM doesn't know where to read", **must provide a stable entry point at runs top level** (avoid `ls`/traversal every time).

Create at target project root (if doesn't exist):

- `.claude/runs/ship-faster/ACTIVE`: Plain text, content is current run's `<run_id>` (one line)

Rules:
- **Each new run**: Write/overwrite `ACTIVE` with new `run_id`
- **Each resume**: Read `ACTIVE` first to determine which run to enter; only overwrite when user explicitly specifies `run_id`

### Run Internal Index (Required)

Each `.claude/runs/ship-faster/<run_id>/` should have a **navigable "entry file"** so agent only needs to read 2-5 files to continue:

- `00-index.md`: Current run summary + key artifact paths + next step entry (living document, continuously updated)

Recommended template (minimum viable):

```md
# Ship Faster Run Index

- run_id: <run_id>
- status: active|blocked|done
- scope: full|deploy-only|design-only|feature-only
- last_updated: <ISO8601>

## What we are doing
- <1-3 bullets>

## Next action (single source of truth)
- plan: 03-plans/<next-plan>.md

## Key artifacts
- goal: 01-input/goal.md
- context: 01-input/context.json
- state: logs/state.json
- evidence: 02-analysis/
- parallel: 04-parallel/
- final: 05-final/ship-summary.md

## Disabled steps (if any)
- <step>: <reason>
```

**Default read order** when resuming/replaying (unless user explicitly names a specific file):
1. `.claude/runs/ship-faster/ACTIVE`
2. `.claude/runs/ship-faster/<run_id>/00-index.md`
3. `.claude/runs/ship-faster/<run_id>/logs/state.json`
4. `.claude/runs/ship-faster/<run_id>/01-input/context.json`
5. `.claude/runs/ship-faster/<run_id>/01-input/goal.md`

Consistency rules:
- `logs/state.json` is machine-readable truth; `00-index.md` is human/agent-readable summary (when inconsistent, `state.json` takes precedence, and fix `00-index.md` ASAP)

### Read/Write Hygiene (Mandatory)

Two types of information are layered to avoid "output piling up in chat → context window explosion":

- **Raw evidence (traceable, but not loaded by default)**: Long command output, scan results, logs → dump to `02-analysis/` or `logs/`
- **Actionable summary (default must-read)**: Only write conclusions and navigation → maintain in `00-index.md` (and final `05-final/ship-summary.md`)

Constraints:
- `logs/events.jsonl` can be large, but **don't** paste large chunks in chat; instead "write file + return path only + summarize 3 lines in `00-index.md`"
- Any info needed for "resume positioning" must be written to `00-index.md`, not just in chat history
- When tracing details: first use `rg "<keyword>" logs/events.jsonl` or search in `02-analysis/` to locate, then "open locally" at hit point—don't dump whole sections into context

### Artifact Structure (Within Run)

Recommended structure:

- `00-index.md`: Run navigation index (summary + key paths + next step)
- `01-input/goal.md`: Goals, scope, launch timeline, constraints
- `01-input/context.json`: Project path, entry type (idea|prototype), whether DB/billing/deploy/seo needed
- `02-analysis/`: Detection and evidence (versions, structure, risk assessment)
- `03-plans/`: Executable plans + `approval.md`
- `04-parallel/`: Parallel subtask artifacts
- `05-final/`: Final delivery summary
- `logs/events.jsonl`, `logs/state.json`

### Archiving and Retention (Recommended)

If runs accumulate, default strategy is "read less + archivable", not "keep everything visible forever":

- Completed runs (`status: done`) should be **read-only**, avoid polluting retrospectives
- Optional: Move completed runs to `.claude/runs/ship-faster/_archive/<run_id>/` (keep `00-index.md` and `05-final/`)
- `ACTIVE` always points to "currently running" run; if no active run, points to most recent done run (for easy replay)

### OpenSpec Alignment (Optional but Strongly Recommended)

Separate "stable project truth" from "single change run" (avoid stuffing everything into run):

- **Source of Truth (project-level specs)**: e.g., `design-system.md`, `README.md`, `docs/`, architecture/constraint docs (should be continuously maintained)
- **Change Folder (this change run)**: `.claude/runs/ship-faster/<run_id>/` (only put this run's evidence/plans/process/summary + links to specs)

Implementation rules:
- Run only writes "evidence + navigation + decision records"; conclusions meant for long-term retention should eventually be merged back to project-level specs/docs

## Process (Default Route)

### 0) Initialize Run (Required)

1. Create run directory (if doesn't exist).
2. Ensure `.claude/runs/ship-faster/ACTIVE` points to current `run_id`.
3. Ensure input artifacts exist:
   - `01-input/goal.md`
   - `01-input/context.json`

   Rules:
   - If file doesn't exist: Create and write
   - If file already exists (e.g., produced by `workflow-project-intake`): **Reuse directly**, only append or fill in when "missing fields/missing critical info"; don't blindly overwrite
4. If `context.json` is missing critical info (project path/whether to integrate DB/whether to charge/deploy target etc.), ask user to fill in first, then write back to `context.json` (merge update).
5. Create/update `00-index.md` (at minimum write: run_id, status, next plan, key paths).
6. **Read `context.json` and record to `logs/state.json`**, including:
   ```json
   {
     "workflow": "ship-faster",
     "scope": "full",
     "steps_enabled": {
       "foundation": true,
       "design": true,
       "features": true,
       "guardrails": true,
       "docs": true,
       "database": false,
       "billing": false,
       "deploy": false,
       "seo": false
      },
     "steps_disabled_reasons": {}
    }
   ```

### 0.2) Scope Confirmation (Required)

Problem this solves: a run summary that marks core steps as “skipped” without the user ever choosing to skip them is misleading and hard to audit.

Ask the user to select a scope **before** executing steps beyond build checks:

- **A) full (default)**: Foundation → Design system → UI/UX → Guardrails → Docs → Feature iteration → Deploy
- **B) deploy-only**: Foundation (build + sanity) → Deploy only (no UI work, no guardrails/docs polish)
- **C) design-only**: Design system + UI/UX plan only (no code changes)
- **D) feature-only**: One feature iteration (plan + implementation), skip deploy

Rules:
- If scope is not `full`, update `logs/state.json`:
  - Set unrelated steps in `steps_enabled` to `false`
  - Fill `steps_disabled_reasons` (e.g., `"design": "scope=deploy-only (user requested deploy only)"`)
- In `00-index.md`, do **not** mark a default step as “skipped” unless the user explicitly requested skipping it.
  - Prefer: `disabled (scope=...)` with a reason
- Any destructive action (e.g., **force push** overwriting an existing repo) is a high-risk side effect:
  - Write an executable plan under `03-plans/` first
  - Wait for explicit user confirmation before executing

### 0.25) Kickoff Clarification (Brainstorm-lite) (Recommended; required if goal is vague)

Problem this solves: people jump straight into “implement a feature” and end up with a very basic MVP that’s hard to demo.

Run this step if **any** of these are true:
- `01-input/goal.md` is missing clear **acceptance criteria** and **non-goals**
- The user request is “build something like X” / “make a prototype” without specifying the core loop
- The user explicitly wants a “demo-ready” prototype (animation, wow factor, shareable)

How:
- Call `workflow-brainstorm` using the **same `repo_root` + this `run_dir`**.
- Follow the one-question-at-a-time rule and converge on:
  - the one core loop (1 sentence)
  - acceptance criteria (3–5 bullets)
  - non-goals (1–3 bullets)
  - constraints (timeline / risk preference)
  - a “demo moment” direction (see step 0.3)
- Persist the confirmed spec to:
  - `02-analysis/YYYY-MM-DD-kickoff-design.md`
- Then update (merge, don’t overwrite) these inputs:
  - `01-input/goal.md`
  - `01-input/context.json` (ensure `need_database/need_billing/need_deploy/need_seo` are explicitly set)

### 0.3) Demo Moment First (Recommended for prototypes)

Principle: a prototype that **feels real** needs at least one “demo moment” (tastefully showy, not gimmicky).

Examples of “demo moment” (pick 1, keep it small):
- A hero section with a **live interactive preview** (fake data is fine) + smooth, purposeful motion
- A delightful micro-interaction: command palette, draggable cards, timeline scrubber, etc.
- A “before/after” transformation animation (input → output) that makes the core loop obvious

Workflow:
1. Write a small feature spec file (if it doesn’t exist):
   - `01-input/feature-00-demo-moment.md`
   - Include `mode: plan-only`, `feature_slug: demo-moment`, and `quality_bar: demo-ready`
2. Call `workflow-feature-shipper` to generate the plan **only** (no implementation yet).
3. Defer actual UI implementation until after Step 2 (design-system.md exists), so the demo moment follows the chosen design system.

### 0.5) Dynamic Branch Decision (Required)

Dynamically adjust execution order based on `context.json` content:

- **Database integration**: Only execute when `context.json` has `"need_database": true`
- **Payment integration**: Only execute when `context.json` has `"need_billing": true` or `"need_stripe": true`
- **Deployment**: Only execute when `context.json` has `"need_deploy": true` or user explicitly requests deployment
- **SEO**: Only execute when `context.json` has `"need_seo": true` or project is already live

Before starting each optional step, check `steps_enabled` field in `logs/state.json`. If `false`, skip that step and log skip reason to `logs/events.jsonl`.

### 1) Foundation: Next.js Foundation (Default Required)

Open and follow: [foundation.md](foundation.md).

Artifact requirements (minimum):
- `02-analysis/foundation.md` (current state + risk assessment + chosen route)
- `03-plans/foundation-plan.md` (commands/changes to execute)
- If upgrade/migration needed with significant changes: Write `03-plans/approval.md` and wait for confirmation

**Branch rules (important)**:
- If conclusion is **keep-current-stack** (e.g., Vite static site), don't force continuing "Next.js-specific steps".
  - Only continue steps that still apply to current stack: style (2), guardrails (3, adapted for current stack), docs (4), deploy (8 optional), SEO (9 optional)
  - If DB/payment integration still needed: First ask user "want to migrate to Next.js?", or add integration step for that stack (not in this chain's default scope)

### 2) Style Specification (Default Required)

Call `tool-design-style-selector`: Scan project intent and persist `design-system.md`.

Confirmation point: After user confirms style, deploy `design-system.md`, and enter **2.5 UI/UX Implementation** (default required; if user explicitly skips, log reason).

### 2.5) UI/UX Implementation (Default Required)

Goal: Make `design-system.md` actually reflected in the interface, not "wrote spec but UI unchanged".

Recommended approach: Treat "redo UI/UX per design-system.md" as an independent feature and hand to `workflow-feature-shipper`:
- Input: `design-system.md` (as sole design constraint) + current UI page list (from code scan)
- Output: `03-plans/features/<feature_slug>-plan.md` (scope/acceptance criteria/non-goals/risks/rollback) + code changes

Default enrichment (when installed):
- If `tool-ui-ux-pro-max` is installed, use it to enrich the UI/UX plan with concrete palette/typography/UX guardrails, and use its pre-delivery checklist as acceptance criteria.
- Only skip `tool-ui-ux-pro-max` enrichment if the user explicitly asks to skip it (e.g., “don’t over-design / keep it simple”), and log the reason.

For large-scale refactoring: Write `03-plans/approval.md` first and wait for user confirmation before implementing.

### 3) Code Standards (Lightweight Required)

Open and follow: [guardrails.md](guardrails.md).

Artifact: `03-plans/guardrails-plan.md`

### 4) Documentation Standards (Lightweight Required)

Open and follow: [docs-baseline.md](docs-baseline.md).

Artifact: `03-plans/docs-plan.md` (and project README update)

### 5) Core Feature Development (Iterative Loop)

Call `workflow-feature-shipper`:
- Each feature first produces `03-plans/features/<feature_slug>-plan.md` (with acceptance criteria/non-goals)
- Default split into PR-able small steps
- After each batch (or before merge), recommend calling `review-quality` for a conclusive review + verdict
- If the batch touches React/Next.js rendering/data fetching/bundle size, also recommend `review-react-best-practices` (apply CRITICAL rules first)

### 6) Database Integration (Optional)

**Execution condition**: `context.json` has `"need_database": true` or `"database": "supabase"`

Open and follow: [supabase-integration.md](supabase-integration.md).

### 7) Payment Integration (Optional)

**Execution condition**: `context.json` has `"need_billing": true` or `"need_stripe": true` or `"payment": true`

Open and follow: [stripe-integration.md](stripe-integration.md).

### 8) GitHub + Vercel Deployment (Optional but Recommended)

**Execution condition**: `context.json` has `"need_deploy": true` or `"deploy_target"` field exists and non-empty

Open and follow: [deploy-vercel.md](deploy-vercel.md).

### 9) AI-Era SEO (Optional but Recommended)

**Execution condition**: `context.json` has `"need_seo": true` or `"seo": true`, or step 8 completed successfully (already deployed)

Open and follow: [ai-seo-nextjs.md](ai-seo-nextjs.md).

## Final Delivery

Write to: `05-final/ship-summary.md`, at minimum include:
- Current project status (can run locally, can build, is deployed)
- Completed steps and artifact paths
- Next steps (prioritized by value)

And wrap up:
- Update `00-index.md` `status` to `done`, and write `last_updated`
- If run is complete and starting new run next: next run will overwrite `ACTIVE`; don't reuse old `run_id`
- Do a `skill-evolution` **Evolution checkpoint** (3 questions); if user chooses "want to optimize", run `skill-improver` based on this `run_dir` to produce minimal patch suggestions
