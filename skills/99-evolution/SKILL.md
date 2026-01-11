---
name: 99-evolution
description: "Global evolution system for ship-faster skills. Uses hooks to capture context, failures, and session summaries, then generates patch suggestions (no auto edits) via skill-improver. Use when you want the skills to self-improve safely and continuously."
---

# 99 Evolution

This skill makes the skills library evolve based on real development signals without auto-editing skills. The default output is a patch suggestion only.

## Default strategy

- Capture context and failures into run artifacts
- Generate evolution candidates
- Use `skill-improver` to propose a minimal patch
- Human reviews and applies the patch

## Global hooks (recommended)

Hooks live in: `~/.claude/skills/99-evolution/hooks/`

Add to your global settings (or project settings) so hooks run automatically.

Example (merge into `~/.claude/settings.json` or `<project>/.claude/settings.json`):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash|Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/skills/99-evolution/hooks/pre-tool.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/skills/99-evolution/hooks/post-bash.sh \"$TOOL_OUTPUT\" \"$EXIT_CODE\""
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/skills/99-evolution/hooks/session-end.sh"
          }
        ]
      }
    ]
  }
}
```

## Run artifacts

Hooks write to project-local run folders:

```
<project-root>/.claude/runs/evolution/<run_id>/
  logs/
    events.jsonl
    failures.jsonl
    context.json
  evolution-candidates.md
```

`run_id` is stored in `<project-root>/.claude/runs/evolution/.current` so all hooks in a session write to the same run.

## When to evolve (Ship Faster focus)

- Next.js upgrade or migration issue solved
- Guardrails problem fixed (lint/typecheck/build)
- Supabase error or migration pattern learned
- Stripe setup or billing flow resolved
- Vercel deploy or GitHub CI issue resolved
- AI SEO setup or indexing issue solved

## How to evolve

1. Hooks create `evolution-candidates.md` with the latest signals.
2. Run `skill-improver` with `run_dir` to propose a patch.
3. Apply the patch manually and re-validate skills.

## Example event

```json
{"ts":"2026-01-11T12:00:00Z","event":"post-bash","category":"build","exit_code":1,"summary":"next build failed: Module not found","artifacts":["logs/failures.jsonl"]}
```

## Outputs

- `evolution-candidates.md` (auto-generated)
- Suggested patch from `skill-improver` (manual apply)

No skills are edited automatically.
