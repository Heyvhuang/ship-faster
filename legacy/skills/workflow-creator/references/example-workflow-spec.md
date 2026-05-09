---
slug: "seo-schema-fix"
title: "SEO + Schema Fix"
description: "Audit and improve SEO and schema markup for a web project."

triggers:
  - "seo audit"
  - "technical seo"
  - "fix schema markup"
  - "json-ld"
  - "rich snippets"

artifact_store: "auto"
execution: "plan-then-confirm"

skills_sh_lookup: true
required_skills:
  - "workflow-brainstorm"
  - "review-seo-audit"
  - "tool-schema-markup"
  - "review-quality"
optional_skills:
  - "tool-systematic-debugging"
---

# Workflow Spec: SEO + Schema Fix

## Goal & Non-goals

### Goal

- Produce an SEO audit report and a schema markup plan.
- Implement the schema markup changes safely with verification evidence.

### Non-goals

- Redesign the UI.
- Migrate frameworks (e.g., to Next.js) unless explicitly required.

## Skill Chain

### Step 0: Initialize run

- Create/resume `proposal.md`, `tasks.md`, `context.json`.

### Step 1: Diagnose

- Skill: `review-seo-audit`
- Output: `evidence/seo-audit.md`

### Step 2: Implement schema

- Skill: `tool-schema-markup`
- Output: code changes + `evidence/schema-changes.md`

### Step 3: Final quality pass

- Skill: `review-quality`
- Output: `evidence/review-quality.md`

## Verification & Stop Rules

### Verification

- Run project build/typecheck/tests per repo conventions.
- Record outcomes under `evidence/` and index them in `tasks.md`.

### Stop rules

- If verification fails: stop and run `tool-systematic-debugging` before more edits.
- If a required skill is missing: stop and suggest candidates (skills.sh), do not improvise.
- If an action is high-risk (prod deploy, data loss, billing): write an approval item in `tasks.md` and wait.
