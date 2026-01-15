---
name: workflow-feature-shipper
description: "Ship core product features quickly in a Next.js codebase: turn a feature idea into a small executable plan, implement in PR-sized slices, delegate UI styling to a frontend agent when needed, and keep artifacts under .claude/runs/. Use for core feature development, MVP, rapid iteration, implementing features."
---

# Feature Shipper

Turn "I want to build a feature" into a fast execution chain.

## Input (Pass Paths Only)

- `feature.md`: Requirements description (acceptance criteria + non-goals)
- `repo_root`
- `run_dir`

## Output (Persisted)

- `03-plans/feature-plan.md`
- `04-parallel/`: Parallel subtask artifacts (if implementation is split)
- `05-final/feature-summary.md`

## Process

1. Read `feature.md`, fill in: acceptance criteria, boundaries, risks
2. Produce 2 options (A: minimal change; B: cleaner but slower), default to A
3. Split into PR-sized small steps (each can run independently, each is rollback-able)
4. Implement (batch execution + checkpoints):
    - UI visual/layout/animation changes → Must first call `tool-design-style-selector` to load the project's `design-system.md`, then strictly follow design specs. For complex visual/animation/responsive design, delegate to `/gemini` frontend UI/UX senior design agent
    - Business logic/data flow/integration → Can implement directly
    - **Default batch rhythm**: 3 small tasks per batch → run verification → report and wait for feedback; stop immediately for help when blocked/verification fails
    - After each batch (or before merge), recommend using `review-quality` for a conclusive review + verdict to prevent issues from snowballing
    - If the change touches React/Next.js rendering/data fetching/bundle size (or perf regressions are suspected), also recommend `review-react-best-practices` (apply CRITICAL rules first)
5. Verification: can run, can build (and existing tests pass)
6. Write `05-final/feature-summary.md`: what was done, how verified, next steps
7. Wrap up: Do a `skill-evolution` **Evolution checkpoint** (3 questions); if user chooses "want to optimize", run `skill-improver` based on this `run_dir` to produce minimal patch suggestions

## Delivery Requirements

- No "big bang" refactoring
- Don't introduce new complexity (unless it significantly reduces future cost, and user confirms)
