---
slug: "<kebab-case-without-workflow-prefix>"
title: "<Human readable title>"
description: "<1-2 sentences: what this workflow achieves, for who>"

triggers:
  - "<real user phrase that should trigger this workflow>"
  - "<keyword cluster>"
  - "<...5-10 total>"

artifact_store: "auto"   # auto|runs|openspec
execution: "plan-then-confirm"

skills_sh_lookup: true
required_skills:
  - "workflow-brainstorm"
optional_skills: []

inputs:
  - name: "repo_root"
    kind: "path"
    required: true
    notes: "Project root"
  - name: "run_dir"
    kind: "path"
    required: false
    notes: "If provided, use it; otherwise resolve per artifact_store"

outputs:
  required:
    - "proposal.md"
    - "tasks.md"
    - "context.json"
  optional:
    - "design.md"
    - "evidence/"
    - "logs/"
---

# Workflow Spec: <title>

## Goal & Non-goals

### Goal

- <What "done" means, in 1 sentence>
- <3-7 acceptance criteria bullets>

### Non-goals

- <1-5 bullets: what we explicitly will not do>

### Constraints (optional)

- Timeline:
- Risk preference:
- Stack constraints:
- External access constraints (prod, billing, secrets):

## Skill Chain

Write steps as a chain. Each step must map to ONE skill (or a tiny, verifiable manual action).

### Step 0: Initialize run (Ship Faster artifact contract)

- Purpose: create/resume `proposal.md`, `tasks.md`, `context.json`
- Notes: OpenSpec auto-detect; never rely on chat history for resume

### Step 1: Brainstorm (when goal is vague)

- Skill: `workflow-brainstorm`
- Inputs (paths only): `repo_root`, `run_dir`
- Writes: `evidence/YYYY-MM-DD-<topic>-design.md`
- Outcome: acceptance criteria + non-goals + constraints

### Step 2: Plan the chain into `tasks.md`

- Skill: <your planning skill or "this workflow itself">
- Writes: `tasks.md` checklist + `## Approvals` placeholder

### Step 3+: Execution steps (each mapped to a skill)

For each step:

- Skill: `<skill-name>`
- Inputs (paths only):
- Output artifacts (paths only):
- Confirmation points (if any):
- Failure handling / fallback:

## Verification & Stop Rules

### Verification (minimum)

- <commands to run, or checks to perform>
- <where to write evidence: `evidence/...` and index it in `tasks.md`>

### Stop rules (hard)

- If verification fails: stop and run `tool-systematic-debugging` before more edits
- If a required skill is missing: stop and suggest candidates (skills.sh), do not improvise
- If an action is high-risk (data loss, billing, prod deploy): write an approval item in `tasks.md` and wait

### Confirm-to-execute policy (required)

- Default behavior: write plan first, then ask user "Start execution?"
- If user confirms in chat: begin execution and append an approval record under `tasks.md -> ## Approvals` (timestamp + scope)
