---
name: 08-github-vercel-deploy
description: "Ship faster by wiring GitHub + Vercel for a Next.js project: repo setup, CI checks (lint/typecheck/tests), Vercel project creation, env var configuration, preview deployments, and production promotion. Use when the user mentions Vercel deploy, GitHub repo, CI, previews, or wants a live URL quickly."
---

# GitHub + Vercel Deploy (Ship Faster)

Goal: Quickly turn "runs locally" into "live URL (preview/prod)".

## Input (pass paths only)

- `repo_root`
- `run_dir`
- `env-vars.md` (optional): Which environment variables are needed (key names only, no secrets)

## Output (written to disk)

- `03-plans/deploy-plan.md`
- `05-final/deploy-summary.md`

## Workflow

1. GitHub:
   - If no repo exists: create and push to GitHub (can use `gh`)
   - Set up minimal CI: lint/typecheck/build (based on existing project scripts)
2. Vercel:
   - Create/connect project (dashboard or `vercel` CLI)
   - Configure env vars (Supabase/Stripe etc.)
   - Confirm preview auto-deployment
3. Verification:
   - Preview URL is accessible
   - Key pages work correctly

## Approval Points

- Any action that modifies GitHub repo settings, writes secrets, or switches to production: write `03-plans/approval.md` first and wait for confirmation.
