# Runs + Approval Gates

Ship Faster is designed around two constraints:

1) **Context is expensive** (chat history is limited, easy to lose state)
2) **External side effects are risky** (deployments, payments, DB writes)

So the workflows are built to be **resumable** and **auditable**, and to require explicit confirmation before doing anything irreversible.

## Resumable runs (artifact-first)

When you run `workflow-ship-faster`, it creates a run folder inside your target project:

```
runs/
  ship-faster/
    active/
      <run_id>/
        proposal.md
        tasks.md
        context.json
        evidence/
        logs/
    archive/
      YYYY-MM-DD-<run_id>/
        ...
```

If the repo is OpenSpec-initialized (`openspec/project.md` exists), Ship Faster can also store the same artifacts as an OpenSpec change:

```
openspec/
  changes/
    <change-id>/
      proposal.md
      tasks.md
      design.md        # optional
      evidence/        # Ship Faster evidence (optional)
      logs/            # Ship Faster logs (optional)
    archive/
      YYYY-MM-DD-<change-id>/
        ...
```

Key files:

- `proposal.md`: the “what/why/scope” document (stable context)
- `tasks.md`: executable **checklist** (`- [ ]` → `- [x]`) + approvals before risky actions
- `context.json`: machine-readable switches and critical context (repo_root, need_* flags, etc.)
- `evidence/`: evidence and audits (keep big output out of chat; only open when needed)
- `logs/`: optional debug logs (events/state)

Design goal: an agent should be able to resume by reading **2–5 small files**, not scrolling a giant chat transcript.

Practical resume loop (human-friendly):
1) Open `tasks.md` (resume here)
2) Execute the next unchecked items (checkboxes are the source of truth)
3) Use `proposal.md` for “why/what” context if needed
4) Only dig into `evidence/` / `logs/` when you need proof or debugging

## Approval gates (side effects require confirmation)

Ship Faster treats certain actions as “side-effecting” and requires an explicit approval step before executing them, e.g.:

- Deployments (Vercel, Cloudflare, etc.)
- Payments / billing setup (Stripe)
- Database schema changes / migrations (Supabase)
- Any destructive operation (deletes, resets, overwrites)

Typical pattern:

1) Write the approval plan into `tasks.md` (under an **Approvals** section)
2) Reference any long details in `evidence/` (e.g., SQL, diffs, screenshots)
3) Ask for confirmation
4) Only then execute

This makes the workflow safer for personal use and more trustworthy for public users.

## Auto-archive (fully automatic)

Runs can be archived **automatically** when work is complete.

Eligibility rules:
- `tasks.md` has a verification section (`## Verification` or `## Testing`) with at least one checkbox item
- All checkbox items in `tasks.md` are checked (`- [x]`)

Automation:
- `workflow-ship-faster` invokes a deterministic script after batches:
  - `python3 ~/.claude/skills/workflow-ship-faster/scripts/auto_archive.py --run-dir "<run_dir>"`
- If eligible, it moves the run from `active/` to `archive/` (or the OpenSpec change into `openspec/changes/archive/`).

## For skill authors (what “good” looks like)

- Keep `SKILL.md` short: routing + constraints + output contract.
- Put detailed reference material in `references/` (progressive disclosure).
- Prefer scripts for deterministic work; print human status to stderr and machine output (JSON) to stdout when practical.
- Always write evidence and long outputs to `evidence/` or `logs/`, and keep chat + `tasks.md` concise.
