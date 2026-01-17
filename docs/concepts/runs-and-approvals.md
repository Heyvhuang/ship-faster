# Runs + Approval Gates

Ship Faster is designed around two constraints:

1) **Context is expensive** (chat history is limited, easy to lose state)
2) **External side effects are risky** (deployments, payments, DB writes)

So the workflows are built to be **resumable** and **auditable**, and to require explicit confirmation before doing anything irreversible.

## Resumable runs (artifact-first)

When you run `workflow-ship-faster`, it creates a run directory inside your target project:

```
.claude/
  runs/
    ship-faster/
      ACTIVE
      <run_id>/
        00-index.md
        01-input/
        02-analysis/
        03-plans/
        04-parallel/
        05-final/
        logs/
```

Key files:

- `ACTIVE`: points to the current run id (1 line)
- `00-index.md`: the “resume here” entry file (human/agent navigable)
- `logs/state.json`: machine-readable state (source of truth)
- `03-plans/`: executable **checklist plans** (`- [ ]` → `- [x]`) + approvals before risky actions
- `02-analysis/`: evidence and audits (keep big output out of chat)

Design goal: an agent should be able to resume by reading **2–5 small files**, not scrolling a giant chat transcript.

Practical resume loop (human-friendly):
1) Open `00-index.md`
2) Follow `Next action` → the current plan in `03-plans/`
3) Progress lives in the plan checklist (not in chat)
4) Only dig into `02-analysis/` / `logs/` when you need evidence or debugging

## Approval gates (side effects require confirmation)

Ship Faster treats certain actions as “side-effecting” and requires an explicit approval step before executing them, e.g.:

- Deployments (Vercel, Cloudflare, etc.)
- Payments / billing setup (Stripe)
- Database schema changes / migrations (Supabase)
- Any destructive operation (deletes, resets, overwrites)

Typical pattern:

1) Write a plan into `.claude/runs/ship-faster/<run_id>/03-plans/<name>.md`
2) Summarize the plan in `00-index.md`
3) Ask for confirmation
4) Only then execute

This makes the workflow safer for personal use and more trustworthy for public users.

## For skill authors (what “good” looks like)

- Keep `SKILL.md` short: routing + constraints + output contract.
- Put detailed reference material in `references/` (progressive disclosure).
- Prefer scripts for deterministic work; print human status to stderr and machine output (JSON) to stdout when practical.
- Always write evidence and long outputs to `02-analysis/` or `logs/`, and keep chat + `00-index.md` concise.
