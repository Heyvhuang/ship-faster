# Artifact Contract (runs/ + OpenSpec)

This document defines the **artifact-first, resumable run directory contract** used by `workflow-ship-faster`.

> Design goal: keep the workflow resumable and auditable **without requiring chat history**.

## Storage backends

This workflow supports two storage backends.

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

## Backend selection (must be deterministic)

Resolve `run_dir` using this priority order:

1) If `context.json` includes `"artifact_store": "runs"` or `"openspec"`, follow it.
2) Else if `openspec/project.md` exists in `repo_root`, use OpenSpec backend.
3) Else use the default `runs/` backend.

From this point on, treat `run_dir` as the resolved active directory (`runs/.../active/...` or `openspec/changes/...`).

## Required files (small + resumable)

Each run directory **must** contain:

- `proposal.md`: why/what/scope/constraints (stable context)
- `tasks.md`: executable checklist (`- [ ]` → `- [x]`) + approvals (**resume here**)
- `context.json`: machine-readable switches + repo_root + risk preference

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

## Templates (minimum viable)

### `proposal.md`

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

### `tasks.md`

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

## Default read order (resume)

Unless the user points you at a specific file, read:

1) `tasks.md` (resume + progress)
2) `proposal.md` (context)
3) `context.json` (switches)
4) `design.md` (if exists)
5) Only then: `evidence/` / `logs/`

## Read/write hygiene (mandatory)

Layer info to avoid "output piling up in chat → context window explosion":

- **Raw evidence (traceable, not loaded by default)**: long command output, scans, screenshots → write to `evidence/` or `logs/`
- **Actionable state (default must-read)**: keep the checklist + the current truth in `tasks.md`

Constraints:
- Don’t paste large chunks into chat; write file(s) and return **paths only**
- Any info needed to resume must be written into `tasks.md`, not only in chat
- When tracing details: use `rg` inside `logs/` or search under `evidence/` first

## Archiving and retention (recommended)

If runs accumulate, default strategy is "read less + archivable", not "keep everything visible forever":

- Completed runs (`status: done`) should be **read-only**, avoid polluting retrospectives
- After completion: move `active/<run_id>/` → `archive/YYYY-MM-DD-<run_id>/`

## Auto-archive (fully automatic)

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

## OpenSpec alignment (recommended)

Separate "stable project truth" from "single change run" (avoid stuffing everything into run):

- **Source of truth (project-level docs)**: `design-system.md`, `README.md`, `docs/`, architecture/constraint docs
- **Change folder (this run)**: `run_dir/` (only this run’s proposal/tasks/evidence/logs)

Implementation rule:
- This run folder only stores **process + evidence + decisions**; anything that should live long-term gets merged back to project docs

