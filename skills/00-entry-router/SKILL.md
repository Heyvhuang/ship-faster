---
name: 00-entry-router
description: "Orchestrate end-to-end multi-skill workflows using file-based artifacts and the "only pass paths" principle. Default route is 00-workflow-ship-faster (Next.js 16.1.1) for idea/prototype→launch. Also coordinates guardrails, Supabase/Stripe integration, GitHub+Vercel deploy, and AI SEO with checkpoints/approvals and resumable runs under .claude/runs/."
---

# Workflow Orchestrator

Treat Skills as "stateless execution units" and externalize all state to the file system. The main agent only handles orchestration: create workspace, maintain paths, drive checkpoints, and decide branches.

## Core Principles (Must Follow)

1. **Only pass paths, not content**: Agents/sub-agents only pass `..._path`; the executor reads the file itself.
2. **Files are first-class citizens**: Every step must persist artifacts; failures can be retried; runs can be replayed and traced.
3. **Write operations must have checkpoints**: Any action with side effects (modify/delete cloud resources, DB writes, refunds, cancel subscriptions) must first write a plan and wait for explicit user confirmation.

## Run Directory Structure

Create in target project root: `.claude/runs/<workflow>/<run_id>/`

Recommended structure:

- `01-input/`
  - `goal.md`: User goal (original request + expected output + constraints)
  - `context.json`: Key context (IDs, environment, scope, risk preference)
- `02-analysis/`: Evidence/analysis from each analyzer
- `03-plans/`: Executable plans + confirmation points
- `04-parallel/`: Parallel subtask artifacts (subdirectories named by subtask)
- `05-final/`: Final deliverables
- `logs/`
  - `events.jsonl`: Structured event log (one line appended per step)
  - `state.json`: Current state machine (completed steps, next step, critical path)

## Event Log Format (Recommended)

One JSON per line:

```json
{"ts":"2026-01-11T12:00:00Z","step":"02-analysis","action":"cloudflare.query_worker_observability","status":"ok","artifacts":["02-analysis/observability.md"],"note":"p95 latency spike"}
```

Do not log sensitive raw data (token/email/phone/secret). Write redacted versions when necessary.

## Checkpoint Protocol (Required for Write Operations)

Before executing write operations:

1. Write to `03-plans/approval.md`: List actions to be executed (object IDs, impact scope, verification method)
2. Display the same summary in the conversation and wait for explicit user reply "confirm/yes/proceed"
3. Execute only after user confirmation, then write results to `logs/events.jsonl`

## Routing: Choosing Workflow / Skill

- From idea/small prototype to launch (default): Use `00-workflow-ship-faster`
- Next.js create/upgrade/small project migration: Use `01-nextjs-foundation`
- Lightweight code convention baseline: Use `03-nextjs-guardrails`
- Minimal documentation baseline: Use `04-docs-baseline`
- Feature iteration (split + deliver): Use `05-feature-shipper`
- DB integration: Use `06-nextjs-supabase` (plus `supabase-mcp` for DB operations)
- Payment integration: Use `07-nextjs-stripe` (plus `stripe-mcp` for operations/object management)
- Deployment: Use `08-github-vercel-deploy`
- AI SEO: Use `09-ai-seo-nextjs`

If uncertain: First create run directory + `01-input/goal.md`, then route based on keywords.

## Parallel Execution (Subagent)

Split into parallel subtasks when any of these occur:
- Need to scan by directory/module
- Need to review by dimension (naming/functions/duplication/…)
- Need to generate multiple alternative plans (Plan A/B/C)

Parallel subtask conventions:
- Input: Only receive paths (`goal_path`, `context_path`, `output_dir`)
- Output: Write artifacts to `04-parallel/<task-name>/`, return list of artifact paths

## Resume from Checkpoint

When running again:
- First read `logs/state.json`
- Don't repeat completed steps; only fill in missing artifacts or continue from failure point

## Deliverables (Minimum Requirements)

- `05-final/summary.md`: Conclusions + key evidence + execution summary + next steps
- `logs/events.jsonl`: Traceable execution record

After completion, you can call `skill-improver` to review this run and improve the skill chain.
