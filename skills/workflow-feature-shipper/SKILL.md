---
name: workflow-feature-shipper
description: "Ship core product features quickly in a Next.js codebase: turn a feature idea into an executable plan, implement in PR-sized slices, and keep artifacts under .claude/runs/. Supports plan-only mode for early scoping. For prototype UI work, include a demo-ready “wow moment” (animation/micro-interaction) by default unless user opts out."
---

# Feature Shipper

Turn "I want to build a feature" into a fast execution chain.

## Input (Pass Paths Only)

- `feature.md`: Requirements description (acceptance criteria + non-goals)
- `repo_root`
- `run_dir`

### Optional flags (recommended inside `feature.md`)

- `mode`: `plan-only` | `execute` (default: `execute`)
- `feature_slug`: short slug for artifact naming (default: derived from title + timestamp)
- `quality_bar`: `demo-ready` | `functional-only` (default: `demo-ready` for user-facing UI features)

## Output (Persisted)

- `03-plans/features/<feature_slug>-plan.md` (checklist plan: tasks + verification)
- `04-parallel/features/<feature_slug>/` (if implementation is split)
- `05-final/features/<feature_slug>-summary.md`

## Process

1. Read `feature.md`, normalize into: acceptance criteria, boundaries, risks, rollback.
2. **Prototype UI rule (default)**: if this feature affects user-facing UI and `quality_bar` isn’t `functional-only`, propose 1 “demo moment” (animation/micro-interaction) and add it to acceptance criteria. Must respect `prefers-reduced-motion`.
3. Produce 2 options (A: minimal; B: cleaner but slower), default to A. If user cares about “demo feel”, offer A-demo-ready vs A-functional-only as explicit sub-options.
4. Split into PR-sized small steps (each independently runnable + rollback-able).
5. Write plan to `03-plans/features/<feature_slug>-plan.md`.
6. If `mode: plan-only`, stop here and ask for confirmation before implementing.
7. Implement (batch execution + checkpoints):
    - UI visual/layout/animation changes → First call `tool-design-style-selector` to load the project’s `design-system.md`, then strictly follow it. If `tool-ui-ux-pro-max` is installed, use it to ground motion/UX constraints (search “animation” + “accessibility”). For complex visual/animation/responsive design, delegate to `/gemini` frontend UI/UX senior design agent.
    - Business logic/data flow/integration → Implement directly.
    - **Default batch rhythm**: 3 small tasks per batch → run verification → report and wait for feedback; stop immediately for help when blocked/verification fails.
    - After each batch (or before merge), recommend using `review-quality` for a conclusive review + verdict.
    - If the change touches React/Next.js rendering/data fetching/bundle size (or perf regressions are suspected), also recommend `review-react-best-practices` (apply CRITICAL rules first).
8. Verification: can run, can build (and existing tests pass).
9. Write `05-final/features/<feature_slug>-summary.md`: what was done, how verified, next steps.
10. Wrap up: Do a `skill-evolution` **Evolution checkpoint** (3 questions); if user chooses "want to optimize", run `skill-improver` based on this `run_dir` to produce minimal patch suggestions

## Delivery Requirements

- No "big bang" refactoring
- Don't introduce new complexity (unless it significantly reduces future cost, and user confirms)
