---
name: workflow-project-intake
description: "Project intake + routing: help the user brainstorm and clarify intent, persist goal/context artifacts, then dispatch to the right workflow or step skill. Default route is workflow-ship-faster (Next.js 16.1.1) for idea/prototype→launch. Trigger words: project kickoff, requirements clarification, brainstorm, ideas, discovery, intake."
---

# Project Intake (Brainstorm + Clarify + Route)

Treat Skills as "stateless execution units", externalize all state to the file system.

This skill is positioned as **"project entry / requirements clarification"**:
- When user only has a vague idea: help them clarify requirements (minimum information set) before entering execution chain
- When user provides repo / clear objectives: quickly confirm understanding, then enter the correct workflow/step

This skill is **not responsible** for actual large-scale implementation (that's the job of execution skills like `workflow-ship-faster` / `workflow-feature-shipper`). It's responsible for converging "conversation" into "executable input", then handing off control.

## Core Principles (Must Follow)

1. **Pass paths only, not content**: agents/sub-agents only pass `..._path`, let the executor read the file itself.
2. **Files are first-class citizens**: Every step must persist artifacts; failures can be retried; replayable; traceable.
3. **Write operations must have checkpoints**: Any action with external side effects (delete/modify cloud resources/DB writes/refunds/cancel subscriptions) must write a plan first and wait for explicit user confirmation.
4. **Ask one question at a time**: If information is missing, ask follow-ups, but each message asks only 1 question (prefer multiple choice); break complex topics into multiple rounds.

## 0) Brainstorm Module (Replaces Old Approach)

When user input is still "idea/direction/vague requirement", first use `workflow-brainstorm` module to refine it into an executable design, then enter Intake Checklist.

`workflow-brainstorm` module requirements:
- Check project context first (if repo exists)
- Ask only 1 question at a time (prefer multiple choice)
- Provide 2-3 options with trade-offs explained
- Output design in segments (~200-300 words each), ask "Does this look good?" at the end of each segment

## Minimum Information Set to Produce (Intake Checklist)

Converge user input into the following information (ask for what's missing; if user already provided it, don't ask again).

**Questioning Protocol (Required):**
- Each message asks **1 question** only
- Prefer multiple choice; use open questions only when necessary
- Ask direction-determining questions first (success criteria/non-goals/constraints), then implementation details

### A) Entry Type

- `entry_type`: `idea` | `prototype`
- If `prototype`: `repo_root` (local path or repo link)

### B) Success Criteria (Required)

- The "one core loop" user wants to implement first (one sentence)
- Acceptance criteria (3-5 items)
- Clear non-goals (1-3 items)

### C) Ship Faster Key Switches (Must Clarify)

- `need_database`: Whether database is needed (default Supabase)
- `need_billing`: Whether billing/payment is needed (default Stripe)
- `need_deploy`: Whether deployment to production is needed (default GitHub + Vercel)
- `need_seo`: Whether SEO is needed (sitemap/robots/llms.txt etc.)

### D) Constraints (Optional but Recommended)

- Launch timeline (if any)
- Risk preference (aggressive/conservative)
- Existing design constraints (brand colors/fonts/existing component library)

## Run Directory Specification

Create in target project root: `.claude/runs/<workflow>/<run_id>/`

Recommended structure:

- `01-input/`
  - `goal.md`: User goal (original question + expected output + constraints)
  - `context.json`: Key context (IDs, environment, scope, risk preference)
- `02-analysis/`: Evidence/analysis from each analyzer
- `03-plans/`: Executable plans + confirmation points
- `04-parallel/`: Parallel subtask artifacts (subdirectories named by subtask)
- `05-final/`: Final deliverables
- `logs/`
  - `events.jsonl`: Structured event log (append one line per step)
  - `state.json`: Current state machine (which steps complete, what's next, critical path)

## Event Log Format (Recommended)

One JSON per line:

```json
{"ts":"2026-01-11T12:00:00Z","step":"02-analysis","action":"cloudflare.query_worker_observability","status":"ok","artifacts":["02-analysis/observability.md"],"note":"p95 latency spike"}
```

Don't log sensitive content (token/email/phone/secret). Write redacted versions when necessary.

## Checkpoint Protocol (Required for Write Operations)

Before executing write operations:

1. Write to `03-plans/approval.md`: List actions to be executed (object ID, impact scope, verification method)
2. Show same summary in conversation, wait for explicit user reply "confirm/yes/proceed"
3. Execute only after user confirms, write results to `logs/events.jsonl`

## Artifacts (This Skill Must Persist)

Before routing/execution, write clarification results to:
- `01-input/goal.md`: Goals, scope, acceptance criteria, non-goals, timeline
- `01-input/context.json`: `repo_root`, `entry_type`, `need_*` switches, risk preference, etc.

If this Intake includes "design spec" phase (from `workflow-brainstorm` module), also persist:
- `02-analysis/YYYY-MM-DD-<topic>-design.md`: Confirmed design and key decisions (for downstream plan/implementation reference)

Notes:
- If file already exists: **Only add missing fields / append information**, don't blindly overwrite (avoid duplicate writes with downstream workflow)
- Goal is to let downstream workflow "start running directly" without another round of clarification

`context.json` (recommended minimal structure):
```json
{
  "entry_type": "idea",
  "repo_root": "",
  "need_database": false,
  "need_billing": false,
  "need_deploy": false,
  "need_seo": false
}
```

## Routing: Which Workflow / Skill to Choose (Default to Ship Faster)

Priority recommendations:

1) **From idea/small prototype to launch (default)**: Use `workflow-ship-faster`
- `workflow-ship-faster` will persist to `.claude/runs/ship-faster/<run_id>/` in project, and decide whether to execute DB/payment/deploy/SEO optional steps based on `context.json` switches
- Just style/design system: Use `tool-design-style-selector`
- Just one feature iteration (split+deliver): Use `workflow-feature-shipper`
- Just React/Next.js performance review (waterfalls/bundle/re-renders): Use `review-react-best-practices`
- Just DB-side actions (SQL/migration/logs/type generation): Use `mcp-supabase`
- Just Stripe-side operations (products/prices/payment links/refunds etc.): Use `mcp-stripe`

If unsure: Complete Intake Checklist first → Write `goal.md/context.json` → Then route (don't execute big actions upfront).

## Conversation Convergence at End (Required)

Before handing off control to downstream skill, end this skill with 3 paragraphs:

1) Restate understanding (goal + acceptance criteria + non-goals)
2) Clarify the route to take (default `workflow-ship-faster`, and explain why)
3) Ask user if they want to start execution now:
   - "Ready to start `workflow-ship-faster`? (Will write artifacts to `.claude/runs/ship-faster/<run_id>/` in your project, and require confirmation before critical write operations)"

## Parallel Execution (Subagent)

When any of these situations occur, split into parallel subtasks:
- Need to scan by directory/module
- Need to review by dimension (naming/functions/duplication/...)
- Need to generate multiple alternatives (Plan A/B/C)

Parallel subtask conventions:
- Input: Only receive paths (`goal_path`, `context_path`, `output_dir`)
- Output: Write artifacts to `04-parallel/<task-name>/`, return list of artifact paths

## Resume from Checkpoint

When running again:
- Read `logs/state.json` first
- Don't repeat completed steps; only fill in missing artifacts or continue from failure point

## Deliverables (Minimum Requirements)

- `05-final/summary.md`: Conclusion + key evidence + execution summary + next steps
- `logs/events.jsonl`: Traceable execution record

After completion, do a `skill-evolution` **Evolution checkpoint** (3 questions); if user chooses "want to optimize", call `skill-improver` to review this run and propose minimal patch suggestions.
