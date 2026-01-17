# Step 4 — Docs Baseline (Minimum Viable Documentation)

Goal: Not "write everything", but **let people quickly run it, deploy it, and iterate**.

## Input (Pass Paths Only)

- `repo_root`
- `run_dir`

## Output (Persisted)

- `03-plans/docs-plan.md` (checklist plan: tasks + verification)
- Main artifact is: Project `README.md` (in repo)

## Plan (Checklist Required)

Write `03-plans/docs-plan.md` as a checkbox checklist plan (see `workflow-ship-faster/SKILL.md` → **Plan Files**) before editing docs.
Mark tasks complete only after verifying docs match the actual scripts/env requirements.

## Minimum README Template (Recommended Contents)

- One-sentence project description (goal/users)
- Local startup (Node version, install, `dev`)
- Environment variables (list key names, don't write secret values)
- Database (if applicable: Supabase)
- Payments (if applicable: Stripe)
- Deployment (Vercel)
- Design system: Link to `design-system.md`

## Principles

- Don't introduce large docs directories unless actually needed
- Content should be "copy-paste runnable", avoid lengthy theory
