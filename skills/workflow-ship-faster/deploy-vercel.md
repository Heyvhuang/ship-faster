# Step 8 — GitHub + Vercel Deploy (Ship Faster)

Goal: Quickly turn "runs locally" into "has a URL online (preview/prod)".

## Input (Pass Paths Only)

- `repo_root`
- `run_dir`
- `env-vars.md` (optional): What environment variables are needed (key names only, no secrets)

## Output (Persisted)

- `tasks.md` (Deploy checklist section: tasks + verification)
- `evidence/deploy-summary.md` (URLs + config notes + verification)

## Plan (Checklist Required)

Before any GitHub/Vercel actions, add a Deploy checklist section to `tasks.md`.
If the plan includes secrets, repo settings, or production switches, also add an **Approval** item to `tasks.md` and wait for explicit user confirmation.

## Process

1. GitHub:
   - If no repo yet: Create and push to GitHub (can use `gh`)
   - Set up minimal CI: lint/typecheck/build (per existing project scripts)
2. Vercel:
   - Create/connect project (dashboard or `vercel` CLI)
   - Configure env vars (Supabase/Stripe etc.)
   - Confirm preview auto-deploy
3. Verification:
   - Preview URL is accessible
   - Key pages work correctly

## Confirmation Points

- Any action that modifies GitHub repo settings, writes secrets, or switches production environment: add an **Approval** item to `tasks.md` first and wait for confirmation.
