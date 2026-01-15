---
name: review-quality
description: "Unified codebase quality review: merge readiness verdict + maintainability (Clean Code) + docs-vs-code consistency. Use for code review, quality check, refactor check, outdated docs check, or merge/production readiness."
---

# Quality Review (Unified)

Goal: turn “is this change good?” into a **repeatable review** with a clear **merge/production readiness** verdict.

This skill intentionally merges three review lenses:

1) **Merge readiness** (requirements alignment + risk + verification)
2) **Code maintainability** (Clean Code-style review)
3) **Documentation consistency** (README/docs vs implementation)

If your diff touches React/Next.js rendering/data fetching/bundle size, additionally run:
- `review-react-best-practices` (perf-first rule library)

## Inputs (recommended)

- `BASE_SHA` and `HEAD_SHA` for diff-based reviews
- Optional: `PLAN_OR_REQUIREMENTS` path (e.g. `run_dir/03-plans/feature-plan.md`)
- Optional: docs scope (`README.md`, `docs/**`, API contracts)

### Suggested scope commands

```bash
# Baseline: main/master merge-base
BASE_SHA=$(git merge-base HEAD main 2>/dev/null || git merge-base HEAD master)
HEAD_SHA=$(git rev-parse HEAD)

git diff --stat "$BASE_SHA..$HEAD_SHA"
git diff "$BASE_SHA..$HEAD_SHA"
```

## Process

### 1) Merge readiness (verdict review)

Use the template: `references/code-reviewer.md`.

Minimum checks:
- Requirements alignment (acceptance criteria hit, non-goals respected)
- Side effects are gated (deploy/payments/DB writes require explicit approval)
- Error handling is explicit (no silent failures)
- Verification evidence exists (tests/build/typecheck/lint/manual steps)

### 2) Clean Code maintainability scan

Review the diff (and nearby touched code) across these dimensions:

1. **Meaningful naming** (avoid `data1`, `tmp`, mixed naming for same concept)
2. **Small functions / SRP** (very long functions, too many params, mixed responsibilities)
3. **Duplication (DRY)** (copy/paste logic, repeated transformations/validation)
4. **Over-engineering (YAGNI)** (unused branches, unnecessary abstractions)
5. **Magic numbers / strings** (hardcoded values without semantic constants)
6. **Structural clarity** (deep nesting, unreadable one-liners, nested ternaries)
7. **Project conventions** (imports/order/style consistency)

### 3) Docs ↔ code consistency scan

Check that docs do not lie:
- Enumerate: `README.md`, `docs/**/*.md`, config examples, env keys, API contracts
- For each claim/config/example: locate the authoritative code/config/contracts
- Record mismatches with evidence (doc location + code location)

## Output (required)

Produce a structured report:

- `quality-review.md`
- `quality-review.json` (optional but recommended)

If you are working inside a Ship Faster run directory, write to:
- `run_dir/02-analysis/quality-review.md`
- `run_dir/02-analysis/quality-review.json`

## Output format (recommended)

```md
## Summary
- Verdict: Ready / With fixes / Not ready
- Scope: BASE_SHA..HEAD_SHA (or file list)

## Strengths
- ...

## Issues
### Critical (Must Fix)
- Location: path:line
  - What
  - Why it matters
  - Minimal fix

### Important (Should Fix)
...

### Minor (Nice to Have)
...
```

