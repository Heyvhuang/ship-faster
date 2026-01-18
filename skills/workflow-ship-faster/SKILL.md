---
name: workflow-ship-faster
description: "Ship Faster end-to-end workflow for small web apps (default: Next.js 16.1.1): idea/prototype → foundation gate → design-system.md → lightweight guardrails + docs → feature iteration → optional Supabase + Stripe → optional GitHub + Vercel deploy → optional AI-era SEO (sitemap/robots/llms.txt). Resumable, artifact-first under runs/ship-faster/ (or OpenSpec changes/ when available)."
---

# Workflow: Ship Faster (Next.js 16.1.1)

The goal of this chain is: **Ship an idea or small prototype to production-ready state in the shortest time**, while maintaining iteration speed afterward.

## Core Principles

- **Pass paths only, not content**: agents/sub-agents only pass `..._path`.
- **Files are first-class citizens**: Every step must persist artifacts; failures can be retried; replayable.
- **Confirmation points**: Any "high-risk/high-effort/side-effect" action must write a plan first and wait for confirmation.
- **Plans are checklists**: progress is tracked in `tasks.md` via `- [ ]` → `- [x]` (not in chat).
- **Progressive disclosure**: Only open step files in this skill directory (`foundation.md`, `deploy-vercel.md`, etc.) when needed—avoid loading all details at once.

## Artifact Storage (Unified Contract)

This workflow supports two storage backends:

### Backend A (default): `runs/`

- Active: `runs/ship-faster/active/<run_id>/`
- Archive (after completion): `runs/ship-faster/archive/YYYY-MM-DD-<run_id>/`

### Backend B (OpenSpec-compatible): `openspec/`

If the repo is OpenSpec-initialized (detect via `openspec/project.md`), store artifacts as an OpenSpec change:

- Active: `openspec/changes/<change-id>/`
- Archive (after completion): `openspec/changes/archive/YYYY-MM-DD-<change-id>/`

Notes:
- In OpenSpec mode, `run_id` is the `change-id` (kebab-case, verb-led).
- If `openspec` CLI is available, prefer scaffolding the change via `openspec new change <change-id>`.

### Backend selection (must be deterministic)

Resolve `run_dir` using this priority order:

1) If `context.json` includes `"artifact_store": "runs"` or `"openspec"`, follow it.
2) Else if `openspec/project.md` exists in `repo_root`, use OpenSpec backend.
3) Else use the default `runs/` backend.

From this point on, treat `run_dir` as the resolved active directory (`runs/.../active/...` or `openspec/changes/...`).

### Required files (small + resumable)

Each run directory **must** contain:

- `proposal.md`: why/what/scope/constraints (stable context)
- `tasks.md`: executable checklist (`- [ ]` → `- [x]`) + approvals (**resume here**)
- `context.json`: machine-readable switches (`need_database/need_billing/need_deploy/need_seo`) + repo_root/risk preference

Recommended minimal `context.json` (extend as needed):

```json
{
  "repo_root": "",
  "scope": "full",
  "artifact_store": "auto",
  "need_database": false,
  "need_billing": false,
  "need_deploy": false,
  "need_seo": false
}
```

Optional (only create if needed):

- `design.md`: technical decisions (only if ambiguity/risk warrants it)
- `evidence/`: large outputs / scans / screenshots (paths only in chat)
- `logs/`: optional debug logs (`events.jsonl`, `state.json`)

### Proposal template (minimum viable)

```md
# Proposal: <title>

- run_id: <run_id>
- status: active|blocked|done
- created_at: <ISO8601>
- repo_root: <path>

## Why
- <1-3 bullets>

## What changes
- <1-5 bullets>

## Acceptance criteria
- <3-7 bullets>

## Non-goals
- <1-3 bullets>

## Links
- tasks: tasks.md
- evidence: evidence/ (optional)
```

### Tasks template (checklist required)

```md
# Tasks: <title>

- run_id: <run_id>
- status: active|blocked|done
- last_updated: <ISO8601>

## Checklist
- [ ] T1: <small, verifiable>
- [ ] T2: <small, verifiable>
- [ ] T3: <small, verifiable>

## Verification (required for auto-archive)
- [ ] V1: Verification completed (commands + outcomes recorded under Evidence index)

## Approvals (only if needed)
- (none)

## Evidence index (paths only)
- evidence/<...>

## Delivery summary (fill when done)
- <what shipped>
- <how to verify>
- <next steps>
```

### Default read order (resume)

Unless the user points you at a specific file, read:

1) `tasks.md` (resume + progress)
2) `proposal.md` (context)
3) `context.json` (switches)
4) `design.md` (if exists)
5) Only then: `evidence/` / `logs/`

### Read/Write hygiene (mandatory)

Layer info to avoid "output piling up in chat → context window explosion":

- **Raw evidence (traceable, not loaded by default)**: long command output, scans, screenshots → write to `evidence/` or `logs/`
- **Actionable state (default must-read)**: keep the checklist + the current truth in `tasks.md`

Constraints:
- Don’t paste large chunks into chat; write file(s) and return **paths only**
- Any info needed to resume must be written into `tasks.md`, not only in chat
- When tracing details: use `rg` inside `logs/` or search under `evidence/` first

### Archiving and retention (recommended)

If runs accumulate, default strategy is "read less + archivable", not "keep everything visible forever":

- Completed runs (`status: done`) should be **read-only**, avoid polluting retrospectives
- After completion: move `active/<run_id>/` → `archive/YYYY-MM-DD-<run_id>/`

### Auto-archive (fully automatic)

Ship Faster supports **fully automatic archiving** when a run is complete.

Archiving eligibility (must all be true):
- `tasks.md` contains a verification section (`## Verification` or `## Testing`) with at least one checkbox item
- **All** checkbox items in `tasks.md` are checked (`- [x]`)

Automation rule (mandatory):
- After every execution batch (or any time you update checkboxes), run:
  - `python3 ~/.claude/skills/workflow-ship-faster/scripts/auto_archive.py --run-dir "<run_dir>"`
- The script is deterministic:
  - If eligible: it archives the run directory immediately (no confirmation)
  - If not eligible: it prints a short reason and does nothing

### OpenSpec alignment (recommended)

Separate "stable project truth" from "single change run" (avoid stuffing everything into run):

- **Source of truth (project-level docs)**: `design-system.md`, `README.md`, `docs/`, architecture/constraint docs
- **Change folder (this run)**: `run_dir/` (only this run’s proposal/tasks/evidence/logs)

Implementation rule:
- This run folder only stores **process + evidence + decisions**; anything that should live long-term gets merged back to project docs

## Process (Default Route)

### 0) Initialize Run (Required)

1. Create the active run directory (if it doesn’t exist):
   - `run_dir/`
2. Ensure core artifacts exist (create if missing; merge/append if already present):
   - `proposal.md`
   - `tasks.md`
   - `context.json`

   Rules:
   - If file doesn’t exist: create and write
   - If file already exists (e.g., produced by `workflow-project-intake`): **reuse directly**, only fill missing fields; don’t blindly overwrite
3. If `context.json` is missing critical info (repo_root / need_* switches / risk preference / scope), ask the user to fill it first, then merge-update `context.json`.
4. In `tasks.md`, ensure there is:
   - a `status: active|blocked|done` field near the top
   - a short **Next action** section (1–3 items)
   - an **Approvals** section (empty is fine until needed)
5. Create `evidence/` and `logs/` folders only when you actually have large outputs to store.

### 0.2) Scope Confirmation (Required)

Problem this solves: a run summary that marks core steps as “skipped” without the user ever choosing to skip them is misleading and hard to audit.

Ask the user to select a scope **before** executing steps beyond build checks:

- **A) full (default)**: Foundation → Design system → UI/UX → Guardrails → Docs → Feature iteration → Deploy
- **B) deploy-only**: Foundation (build + sanity) → Deploy only (no UI work, no guardrails/docs polish)
- **C) design-only**: Design system + UI/UX plan only (no code changes)
- **D) feature-only**: One feature iteration (plan + implementation), skip deploy

Rules:
- Persist the chosen scope to `context.json` (add/update a `scope` field).
- In `tasks.md`, do **not** mark a default step as “skipped” unless the user explicitly requested skipping it.
  - Prefer: `disabled (scope=...)` with a short reason under a “Scope / Disabled steps” section
- Any destructive action (e.g., **force push** overwriting an existing repo) is a high-risk side effect:
  - Write an executable approval item under `tasks.md` first
  - Wait for explicit user confirmation before executing

### 0.25) Kickoff Clarification (Brainstorm-lite) (Recommended; required if goal is vague)

Problem this solves: people jump straight into “implement a feature” and end up with a very basic MVP that’s hard to demo.

Run this step if **any** of these are true:
- `proposal.md` is missing clear **acceptance criteria** and **non-goals**
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
  - `evidence/YYYY-MM-DD-kickoff-design.md`
- Then update (merge, don’t overwrite) these inputs:
  - `proposal.md`
  - `context.json` (ensure `need_database/need_billing/need_deploy/need_seo` are explicitly set)

### 0.3) Demo Moment First (Recommended for prototypes)

Principle: a prototype that **feels real** needs at least one “demo moment” (tastefully showy, not gimmicky).

Examples of “demo moment” (pick 1, keep it small):
- A hero section with a **live interactive preview** (fake data is fine) + smooth, purposeful motion
- A delightful micro-interaction: command palette, draggable cards, timeline scrubber, etc.
- A “before/after” transformation animation (input → output) that makes the core loop obvious

Workflow:
1. Write a small feature spec file (if it doesn’t exist):
   - `evidence/feature-00-demo-moment.md`
   - Include `mode: plan-only`, `feature_slug: demo-moment`, and `quality_bar: demo-ready`
2. Call `workflow-feature-shipper` to generate the plan **only** (no implementation yet).
3. Defer actual UI implementation until after Step 2 (design-system.md exists), so the demo moment follows the chosen design system.

### 0.5) Dynamic Branch Decision (Required)

Dynamically adjust execution order based on `context.json` content:

- **Database integration**: Only execute when `context.json` has `"need_database": true`
- **Payment integration**: Only execute when `context.json` has `"need_billing": true` or `"need_stripe": true`
- **Deployment**: Only execute when `context.json` has `"need_deploy": true` or user explicitly requests deployment
- **SEO**: Only execute when `context.json` has `"need_seo": true` or project is already live

Before starting each optional step:
- Check `context.json` (and your chosen `scope`) to decide whether the step applies
- If skipped, write a 1-line reason into `tasks.md` (so resume/audit doesn’t require chat history)

### 1) Foundation: Next.js Foundation (Default Required)

Open and follow: [foundation.md](foundation.md).

Artifact requirements (minimum):
- `evidence/foundation.md` (current state + risk assessment + chosen route)
- `tasks.md`: add a **Foundation** checklist section (tasks + verification commands)
- If upgrade/migration needed with significant changes: add an **Approval** item to `tasks.md` and wait for confirmation

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
- Output: `evidence/features/<feature_slug>-plan.md` (scope/acceptance criteria/non-goals/risks/rollback) + code changes

Default enrichment (when installed):
- If `tool-ui-ux-pro-max` is installed, use it to enrich the UI/UX plan with concrete palette/typography/UX guardrails, and use its pre-delivery checklist as acceptance criteria.
- Only skip `tool-ui-ux-pro-max` enrichment if the user explicitly asks to skip it (e.g., “don’t over-design / keep it simple”), and log the reason.

For large-scale refactoring: add an **Approval** item to `tasks.md` first and wait for user confirmation before implementing.

### 3) Code Standards (Lightweight Required)

Open and follow: [guardrails.md](guardrails.md).

Artifact: `tasks.md` (Guardrails checklist section)

### 3.5) Trace Cleanup (De-branding & Source Hygiene) (Required if project was copied)

Problem this solves: many starter projects imported from Google AI Studio / v0 / Lovable ship with vendor branding, broken remnants (like `importmap`), and misleading README instructions.

Open and follow: [cleanup-traces.md](cleanup-traces.md).

Artifacts:
- `evidence/trace-scan.md`
- `tasks.md` (Trace cleanup checklist section)

### 4) Documentation Standards (Lightweight Required)

Open and follow: [docs-baseline.md](docs-baseline.md).

Artifact: `tasks.md` (Docs checklist section, plus project README update)

### 5) Core Feature Development (Iterative Loop)

Call `workflow-feature-shipper`:
- Each feature first produces `evidence/features/<feature_slug>-plan.md` (with acceptance criteria/non-goals)
- Default split into PR-able small steps
- After each batch (or before merge), recommend calling `review-quality` for a conclusive review + verdict
- `review-quality` is the single entry point and will auto-triage: if React/Next.js performance risk is detected, it will also run `review-react-best-practices` (CRITICAL rules first)

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

Write to: `final.md` (in the run root), at minimum include:
- Current project status (can run locally, can build, is deployed)
- Completed steps and artifact paths
- Next steps (prioritized by value)

And wrap up:
- Update `tasks.md` `status` to `done`, and fill the **Delivery summary**
- If you want a clean workspace: move `active/<run_id>/` → `archive/YYYY-MM-DD-<run_id>/`
- Do a `skill-evolution` **Evolution checkpoint** (3 questions); if user chooses "want to optimize", run `skill-improver` based on this `run_dir` to produce minimal patch suggestions
