# Agent Skills

This directory contains **Agent Skills**—modular, self-contained packages that extend AI agent capabilities with specialized workflows, tool integrations, and domain expertise.

Skills are designed as "composable SOPs" with **workflow orchestration** capabilities:

- Leaf skills focus on one type of task (review, rule generation, MCP integration, etc.)
- Workflow/orchestrator skills chain multiple leaf skills into end-to-end pipelines
- **State lives in files, not context**: All artifacts go to disk; agents only pass paths

**Current focus: Ship Faster** (Next.js + Supabase + Stripe + GitHub + Vercel + AI SEO)

---

## Usage

> **Important**: To use these skills, copy them to your project's `.claude/skills/` directory (or your global `~/.claude/skills/` for personal use).

```bash
# Copy to project
cp -r skills/* your-project/.claude/skills/

# Or copy to global (for personal use across all projects)
cp -r skills/* ~/.claude/skills/
```

---

## 1. Core Principles

### 1) Pass Paths, Not Content

- Main agent does not hold large text blobs
- Sub-agents read input files and write output files themselves
- Return values are paths (or path lists) whenever possible

Benefits: context isolation, parallel-friendly, resumable, traceable.

### 2) Files Are First-Class Citizens (Artifact-first)

The "source of truth" for a workflow run lives on disk, not in chat history.

Recommended artifacts per run:
- `goal.md` (objective/constraints)
- `context.json` (key context)
- `plan*.md` (execution plan + checkpoints)
- `final*.md/.json` (deliverables)
- `events.jsonl` (structured log)

### 3) Determinism First

- Use scripts/rules for deterministic tasks (formatting, batch replacements, schema validation)
- Use LLM for judgment/generation/explanation, not mechanical tasks

### 4) Checkpoints for Write Operations (Human-in-the-loop)

Any action with external side effects (Cloudflare resource changes, Supabase writes, Stripe refunds/cancellations):

- Must first write a plan file (`03-plans/approval.md`)
- Then request explicit user confirmation in chat
- Execute only after confirmation

---

## 2. Directory Structure

### Skill Directory Structure

Each skill contains at minimum:

```
<skill-name>/
  SKILL.md
```

Optional directories:
- `references/`: Reference materials loaded as needed (schemas, checklists, templates)
- `scripts/`: Executable scripts (deterministic fallback)
- `assets/`: Static resources (templates, icons, data files)

### SKILL.md Frontmatter (Discovery Contract)

Each SKILL.md uses YAML frontmatter for discovery/triggering:

```yaml
---
name: skill-name
description: What the skill does and when to use it (include trigger words)
license: optional
compatibility: optional
metadata: optional
allowed-tools: optional
---
```

Constraints:
- `name` must match directory name
- `name` uses lowercase + hyphens (kebab-case)

---

## 3. Workflow Runs (Run Directory Contract)

Workflow/orchestrator skills create runs in the target project root:

```
<project-root>/.claude/runs/<workflow>/<run_id>/
  01-input/
    goal.md
    context.json
  02-analysis/
  03-plans/
    approval.md
  04-parallel/
  05-final/
  logs/
    events.jsonl
    state.json
```

Conventions:
- `01-input/`: User input/background only
- `02-analysis/`: Evidence and analysis (reusable)
- `03-plans/`: Executable plans (must produce and confirm before write ops)
- `04-parallel/`: Parallel sub-task artifacts (subdirectories per task)
- `05-final/`: Final deliverables
- `logs/`: Appendable structured logs and state machine

**Note**: Do not log secrets/tokens/emails in plain text (use redacted versions if needed).

---

## 4. Skills Overview

### 4.1 Orchestrator / Workflows (Ship Faster Pipeline)

| Skill | Description |
|-------|-------------|
| `00-workflow-ship-faster/` | Main pipeline: idea/prototype → style → guardrails → Supabase/Stripe → GitHub+Vercel → AI SEO |
| `00-entry-router/` | Router/dispatcher (path-only, run directories, checkpoints, parallel/resumable) |
| `skill-improver/` | Retrospective on run artifacts/logs, outputs improvement suggestions |

### 4.2 Ship Faster Components (by Stage)

| Skill | Description |
|-------|-------------|
| `01-nextjs-foundation/` | Create/upgrade/migrate small projects to Next.js (skip upgrade if project too large) |
| `02-design-style-selector/` | Select and deploy `design-system.md` |
| `03-nextjs-guardrails/` | Minimal lint/format/typecheck baseline (avoid heavy governance blocking dev) |
| `04-docs-baseline/` | Minimal README/env vars/deploy notes |
| `05-feature-shipper/` | Core feature iteration (split + deliver) |
| `06-nextjs-supabase/` | Next.js + Supabase integration (uses `supabase-mcp`) |
| `07-nextjs-stripe/` | Next.js + Stripe integration (default: Payment Links fast path; uses `stripe-mcp`) |
| `08-github-vercel-deploy/` | GitHub + Vercel deployment and preview environments |
| `09-ai-seo-nextjs/` | AI-era SEO (sitemap/robots/llms.txt/structured data) |

### 4.3 Analysis / Review (Report Outputs)

| Skill | Description |
|-------|-------------|
| `clean-code-reviewer/` | Code quality review based on Clean Code principles; outputs `clean-code-review.md` + `.json` |
| `doc-consistency-reviewer/` | Documentation vs implementation consistency audit; outputs `doc-consistency.md` + `.json` |

### 4.4 Rules / Deterministic Transformations

| Skill | Description |
|-------|-------------|
| `ast-grep-rule-crafter/` | Generate `ast-grep` YAML rules (search/rewrite) for batch refactoring, API migration, lint rules |

### 4.5 External System MCP (Side Effects, Strict Gates)

| Skill | Description |
|-------|-------------|
| `cloudflare-mcp/` | Workers/KV/R2/D1/Hyperdrive diagnostics and changes; Diagnose/Change/Super Admin tiers |
| `supabase-mcp/` | DB query/write/migration/logs/type generation; rejects UPDATE/DELETE without WHERE; DDL must use migration |
| `stripe-mcp/` | Customer/product/price/invoice/payment link/subscription/refund/dispute; default test mode; money/contract actions require confirmation |

### 4.6 Meta Skills (Create/Maintain Skills)

| Skill | Description |
|-------|-------------|
| `skill-creator/` | Tools and methodology for creating/validating/packaging skills; includes `scripts/` (scaffolding + validators) |
| `skill-improver/` | Read run artifacts and logs, generate minimal improvement suggestions (no auto-edit) |
| `99-evolution/` | Global hooks to capture failure signals and context, generate `evolution-candidates.md`, use `skill-improver` for patch suggestions |

---

## 5. Recommended Usage (Ship Faster)

### Main Pipeline: Idea/Prototype → Launch

- Use: `00-workflow-ship-faster` (or let `00-entry-router` dispatch)
- Artifacts: `.claude/runs/ship-faster/<run_id>/` (plans, logs, final summary)

### Stage-by-Stage (On Demand)

| Stage | Skill |
|-------|-------|
| Foundation | `01-nextjs-foundation` |
| Design | `02-design-style-selector` |
| Code Standards | `03-nextjs-guardrails` |
| Docs Baseline | `04-docs-baseline` |
| Feature Iteration | `05-feature-shipper` |
| Database | `06-nextjs-supabase` (DB ops via `supabase-mcp`) |
| Billing | `07-nextjs-stripe` (ops/object management via `stripe-mcp`) |
| Deployment | `08-github-vercel-deploy` |
| AI SEO | `09-ai-seo-nextjs` |

### Deep Governance (Optional, Non-blocking)

- Deep code review: `clean-code-reviewer` (can combine with `ast-grep-rule-crafter` for batch fixes)
- Deep doc consistency audit: `doc-consistency-reviewer`

---

## 6. Project-Level Overrides

Global skills (this directory) should stay generic.

If a skill needs project-specific info (DB schema, business rules, brand guidelines), override in the project:

```
<project-root>/.claude/skills/<skill-name>/
  SKILL.md
  references/
```

Example: Put project-specific schema in project, not in global `supabase-mcp`.

---

## 7. Validation & Maintenance

### Validate a Single Skill

```bash
python skill-creator/scripts/quick_validate.py <skill-dir>
```

### Validate All Skills

```bash
for d in */; do [ -f "${d}SKILL.md" ] && python skill-creator/scripts/quick_validate.py "${d%/}" || exit 1; done
```

### Create a New Skill (Scaffold)

```bash
python skill-creator/scripts/init_skill.py my-new-skill --path .
```

### Package a Skill (Distributable .skill File)

```bash
python skill-creator/scripts/package_skill.py ./my-new-skill ./dist
```

---

## 8. Maintenance Constraints

- Directory name must match `SKILL.md` frontmatter `name`
- `SKILL.md` must describe triggers and boundaries (when to use / not use) to avoid skills competing for triggers
- Workflows must "plan before execute": write plan first, then execute changes
- `references/` uses single-level references only (no deep linking)
- Never log secrets in artifacts/logs

---

## 9. Quick Guide: How to Use

Think of these skills as two layers:

- **Numbered prefix (`00-` ~ `09-`)**: Ship Faster main pipeline "step buttons"—numbers indicate recommended execution order
- **No prefix**: Base capabilities (atomic tools, review, rules, MCP)—use wherever needed

### Most Common Usage

1. Provide an entry point:
   - **From idea**: Describe what the product should do
   - **From prototype**: Give repo path or link
2. Specify what you need: DB (Supabase) / Billing (Stripe) / Deploy (Vercel) / SEO
3. Run the main pipeline: `00-workflow-ship-faster`

The pipeline writes all plans, evidence, and artifacts to the project: `.claude/runs/ship-faster/<run_id>/`, so:
- Stopping midway is fine (resume from last checkpoint)
- Everything is traceable (what was done and why)

### Run a Single Stage

Just invoke the corresponding number:
- Foundation only: `01-nextjs-foundation`
- Design only: `02-design-style-selector`
- Deploy only: `08-github-vercel-deploy`

### Deep Capabilities (No Prefix)

- Deep code review / batch rule-based refactoring: `clean-code-reviewer` / `ast-grep-rule-crafter`
- Deep doc consistency audit: `doc-consistency-reviewer`
- DB operations: `supabase-mcp`
- Stripe operations: `stripe-mcp`
- Cloudflare (troubleshooting/observability/resource changes): `cloudflare-mcp`

### Auto-Evolution (Optional)

- Enable `99-evolution` global hooks (see `99-evolution/hooks/settings.example.json`)
- After session ends, generates `evolution-candidates.md`
- Use `skill-improver` to produce patch suggestions, manually confirm before editing skills

### Main Pipeline Diagram

```text
(idea) / (small prototype)
          |
          v
  00-workflow-ship-faster
          |
          +--> 01-nextjs-foundation      (create/upgrade/migrate to Next.js)
          |
          +--> 02-design-style-selector  (choose + deploy design-system.md)
          |
          +--> 03-nextjs-guardrails      (lint/format/typecheck baseline)
          |
          +--> 04-docs-baseline          (README/env/deploy notes baseline)
          |
          +--> 05-feature-shipper        (iterate core features)  <loop>
          |
          +--> 06-nextjs-supabase        (optional DB)
          |
          +--> 07-nextjs-stripe          (optional billing)
          |
          +--> 08-github-vercel-deploy   (optional but recommended)
          |
          +--> 09-ai-seo-nextjs          (optional but recommended)
          |
          v
     launchable app + artifacts under .claude/runs/
```
