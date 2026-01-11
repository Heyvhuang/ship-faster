---
name: skill-improver
description: "Improve skills and workflows by analyzing run artifacts and execution logs (events.jsonl/state.json) under .claude/runs/. Use when you want to iterate on skills based on real runs: find failure modes, bottlenecks, unclear prompts, missing I/O contracts, and propose concrete edits."
---

# Skill Improver

Review and improve Skills/Workflows based on real execution artifacts, making skill chains more stable over time.

## Input (pass paths only)

- `run_dir`: `.claude/runs/<workflow>/<run_id>/`

## Output

- `improvements.md`: Improvement suggestions (can be directly converted to action items)
- Optional: Minimal patches to related `SKILL.md` files (only change what's necessary)

## Workflow

1. Read `logs/state.json` and `logs/events.jsonl`, extract:
   - Failure points (error types, frequency, missing context)
   - Bottlenecks (repeated steps, ineffective searches, oversized context)
   - Manual confirmation points (whether too early/too late/missing)
2. Check artifact contracts:
   - Whether each step has persisted output
   - Whether only paths are passed instead of content
   - Whether there are inconsistent naming/paths
3. Output improvement suggestions (sorted by impact):
   - Prompt/trigger word optimization
   - I/O contract completion (add required fields, fix artifact filenames)
   - Error handling and rejection strategies
   - Suggest new deterministic scripts (only when necessary)

## Output Template (Recommended)

- Overview: Core issues of this run
- Top Issues (high→low): Each includes "symptom/root cause/fix suggestion/related skill/suggested changes"
- Suggested minimal change list: Listed by file
