---
name: 04-docs-baseline
description: "Create or update minimal project documentation that accelerates shipping: a README that gets a developer running in 5 minutes, env var checklist, deploy notes, and links to design-system.md. Use when starting a new Next.js project, onboarding teammates, or before deploying to Vercel."
---

# Docs Baseline (Minimal Viable Documentation)

Goal: Not about "writing everything", but about **getting people up and running quickly, deployable, and ready to iterate**.

## Input (pass paths only)

- `repo_root`
- `run_dir`

## Output (written to disk)

- `03-plans/docs-plan.md`
- Main deliverable: project `README.md` (in the repo)

## Minimal README Template (recommended sections)

- One-line project description (goal/users)
- Local setup (Node version, install, `dev`)
- Environment variables (list key names, never write secrets)
- Database (if applicable: Supabase)
- Payments (if applicable: Stripe)
- Deployment (Vercel)
- Design system: link to `design-system.md`

## Principles

- Don't introduce a large docs directory unless truly needed
- Content should be "copy-paste runnable", avoid lengthy theory
