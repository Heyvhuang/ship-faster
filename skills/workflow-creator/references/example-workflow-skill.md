# Example: Generated Workflow Skill

This is an example `workflow-<slug>/SKILL.md` generated from a workflow spec.

```md
---
name: workflow-seo-schema-fix
description: "Plan-then-confirm workflow to audit and improve SEO + structured data for a web project. Use when the user asks for an SEO audit, technical SEO fixes, schema markup/JSON-LD, rich snippets, structured data, or indexing issues. Triggers: SEO audit, technical SEO, schema markup, JSON-LD, rich snippets."
---

# Workflow: SEO + Schema Fix (Plan -> Confirm -> Execute)

## Core principles

- Pass paths only (never paste large content into chat).
- Artifact-first and resumable: `proposal.md`, `tasks.md`, `context.json` are the resume surface.
- Confirmation points: plan first; for any high-risk action, record approval in `tasks.md`.

## Inputs (paths only)

- `repo_root`: project root (default ".")
- Optional: `run_dir` (if the user already has an active run)

## Outputs (written under `run_dir/`)

- Required: `proposal.md`, `tasks.md`, `context.json`
- Optional: `design.md`, `evidence/`, `logs/`

## Spec (SSOT)

- Read first: `references/workflow-spec.md`

## Run directory backend (Ship Faster standard)

Resolve the active `run_dir` deterministically:

1) If `context.json` sets `artifact_store: runs|openspec`, follow it.
2) Else if `openspec/project.md` exists under `repo_root`, use `openspec/changes/<change-id>/`.
3) Else use `runs/seo-schema-fix/active/<run_id>/`.

## Required skills

- `workflow-brainstorm` (spec clarification when goal is vague)
- `review-seo-audit` (diagnose)
- `tool-schema-markup` (implement structured data)
- `review-quality` (final quality/verdict)
- Optional fallback: `tool-systematic-debugging` (when build/tests fail)

If a required skill is missing locally:

- Stop.
- Suggest 2-3 candidates from `https://skills.sh/` (do not install automatically).

## Process

### 0) Initialize run (required)

- Create/resume `proposal.md`, `tasks.md`, `context.json`.
- In `tasks.md`, ensure sections exist:
  - `## Checklist`
  - `## Verification`
  - `## Approvals`
  - `## Evidence index`

### 1) Load spec and write plan (required)

- Open: `references/workflow-spec.md`
- Populate `proposal.md` and `tasks.md` with an executable checklist + verification.

### 2) Confirm -> execute (required)

- Ask the user: "Start execution?"
- When the user confirms in chat:
  - Append an approval record to `tasks.md -> ## Approvals` with timestamp + scope
  - Execute the checklist in small batches with verification evidence

### 3) Stop rules (hard)

- If verification fails: stop and run `tool-systematic-debugging` before more edits.
- If any action is high-risk (prod deploy, data loss, billing): write an explicit approval item in `tasks.md` and wait.
```
