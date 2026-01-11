---
name: 05-feature-shipper
description: "Ship core product features quickly in a Next.js codebase: turn a feature idea into a small executable plan, implement in PR-sized slices, delegate UI styling to a frontend agent when needed, and keep artifacts under .claude/runs/. Use for core feature development, MVP, rapid iteration, building a feature, or implementing requirements."
---

# Feature Shipper

Turn "I want to build a feature" into a fast, executable workflow.

## Input (pass paths only)

- `feature.md`: Feature description (acceptance criteria + non-goals)
- `repo_root`
- `run_dir`

## Output (persisted)

- `03-plans/feature-plan.md`
- `04-parallel/`: Parallel subtask artifacts (e.g., split implementations)
- `05-final/feature-summary.md`

## Workflow

1. Read `feature.md`, fill in: acceptance criteria, boundaries, risks
2. Produce 2 options (A: minimal change; B: cleaner but slower), default to A
3. Break into PR-sized small steps (each step runnable, each rollbackable)
4. Implement:
   - UI visual/layout/animation changes → delegate to `frontend-ui-ux-engineer`
   - Business logic/data flow/integration → implement directly
5. Verify: runs, builds (and existing tests pass)
6. Write `05-final/feature-summary.md`: what was done, how to verify, next steps

## Delivery Requirements

- No "big bang" refactors
- No new complexity (unless it significantly reduces future cost, and user confirms)
