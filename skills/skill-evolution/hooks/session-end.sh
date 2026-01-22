#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

find_root() {
  local dir
  dir="$PWD"
  while [ "$dir" != "/" ]; do
    if [ -d "$dir/.git" ] || [ -d "$dir/runs" ] || [ -d "$dir/.claude" ] || [ -f "$dir/package.json" ] || [ -f "$dir/Cargo.toml" ]; then
      printf "%s" "$dir"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  printf "%s" "$PWD"
}

project_root="$(find_root)"
run_root="$project_root/runs/evolution"
if [ ! -d "$run_root" ]; then
  exit 0
fi
current_file="$run_root/.current"
if [ -f "$current_file" ]; then
  run_id="$(< "$current_file")"
else
  run_id="$(date -u +%Y%m%d-%H%M%S)"
  printf "%s" "$run_id" > "$current_file"
fi
run_dir="$run_root/$run_id"
mkdir -p "$run_dir/logs"

failures="$run_dir/logs/failures.jsonl"
events="$run_dir/logs/events.jsonl"
state="$run_dir/logs/state.json"
context_legacy="$run_dir/logs/context.json"
settings="$SCRIPT_DIR/settings.json"
candidates="$run_dir/evolution-candidates.md"
review="$run_dir/evolution-review.md"

if command -v python3 >/dev/null 2>&1; then
  python3 - "$failures" "$events" "$state" "$context_legacy" "$settings" "$candidates" "$review" <<'PY'
import datetime
import json
import os
import re
import sys
from collections import Counter, defaultdict

fail_path=sys.argv[1]
events_path=sys.argv[2]
state_path=sys.argv[3]
legacy_context_path=sys.argv[4]
settings_path=sys.argv[5]
candidates_path=sys.argv[6]
review_path=sys.argv[7]

now=datetime.datetime.utcnow().replace(microsecond=0).isoformat()+"Z"

def read_json(path):
  try:
    return json.load(open(path))
  except Exception:
    return {}

def read_jsonl(path):
  items=[]
  if not os.path.isfile(path):
    return items
  with open(path,"r") as f:
    for line in f:
      line=line.strip()
      if not line:
        continue
      try:
        items.append(json.loads(line))
      except Exception:
        continue
  return items

settings={
  "min_fail_count": 2,
  "noise_filters": {
    "ignore_patterns": [],
    "max_failures_per_run": 20,
    "recent_only": True,
    "recent_window_minutes": 60,
  },
  "output_format": {
    "include_recent_failures": 20,
  },
  "review": {
    "enabled": True,
    "print_hint": True,
    "question_count": 3,
  }
}
if os.path.isfile(settings_path):
  try:
    loaded=read_json(settings_path)
    for k,v in loaded.items():
      settings[k]=v
  except Exception:
    pass

min_fail_count=int(settings.get("min_fail_count",2) or 2)
noise=settings.get("noise_filters",{}) or {}
ignore_patterns=noise.get("ignore_patterns",[]) or []
max_failures_per_run=int(noise.get("max_failures_per_run",20) or 20)
recent_only=bool(noise.get("recent_only",True))
recent_window_minutes=int(noise.get("recent_window_minutes",60) or 60)

output_format=settings.get("output_format",{}) or {}
include_recent_failures=int(output_format.get("include_recent_failures",20) or 20)
summary_only=bool(output_format.get("summary_only", False))
include_context=bool(output_format.get("include_context", True))

state={}
if os.path.isfile(state_path):
  state=read_json(state_path)
elif os.path.isfile(legacy_context_path):
  state=read_json(legacy_context_path)

events=read_jsonl(events_path)
failures=read_jsonl(fail_path)

def parse_ts(ts):
  if not ts:
    return None
  try:
    # Expect RFC3339-ish: 2026-01-11T12:00:00Z
    if ts.endswith("Z"):
      ts=ts[:-1]
    return datetime.datetime.fromisoformat(ts)
  except Exception:
    return None

cutoff_dt=None
if recent_only:
  cutoff_dt=datetime.datetime.utcnow() - datetime.timedelta(minutes=recent_window_minutes)

ignore_res=[]
for pat in ignore_patterns:
  try:
    ignore_res.append(re.compile(pat, re.IGNORECASE))
  except Exception:
    continue

def is_ignored(summary):
  if not summary:
    return False
  for rx in ignore_res:
    if rx.search(summary):
      return True
  return False

filtered=[]
for f in failures:
  ts=parse_ts(f.get("ts",""))
  if cutoff_dt and ts and ts < cutoff_dt:
    continue
  summary=(f.get("summary") or "").strip()
  if is_ignored(summary):
    continue
  filtered.append(f)

if max_failures_per_run > 0:
  filtered=filtered[-max_failures_per_run:]

category_counts=Counter()
issue_counts=Counter()
recent_lines=[]
for f in filtered:
  cat=f.get("category","other") or "other"
  summary=(f.get("summary") or "").strip()
  category_counts[cat]+=1
  key=(cat, summary or "<empty>")
  issue_counts[key]+=1

for f in filtered[-include_recent_failures:]:
  cat=f.get("category","other") or "other"
  exit_code=f.get("exit_code","")
  summary=(f.get("summary") or "").strip()
  recent_lines.append(f"- [{cat}] exit={exit_code} {summary}".rstrip())

repeated=[]
for (cat, summary), count in issue_counts.most_common():
  if count >= min_fail_count:
    repeated.append((cat, summary, count))

def fmt_table(rows):
  lines=[]
  for row in rows:
    lines.append(f"- [{row[0]}] x{row[2]} {row[1]}")
  return lines

def suggested_targets(top_cats):
  mapping={
    "build": ["workflow-ship-faster/guardrails.md"],
    "lint": ["workflow-ship-faster/guardrails.md"],
    "typecheck": ["workflow-ship-faster/guardrails.md"],
    "test": ["workflow-ship-faster/guardrails.md"],
    "deploy": ["workflow-ship-faster/deploy-vercel.md"],
    "supabase": ["workflow-ship-faster/supabase-integration.md","supabase/SKILL.md"],
    "stripe": ["workflow-ship-faster/stripe-integration.md","stripe/SKILL.md"],
  }
  targets=[]
  for cat,_ in top_cats:
    for t in mapping.get(cat, []):
      if t not in targets:
        targets.append(t)
  return targets

top_categories=category_counts.most_common(5)
targets=suggested_targets(top_categories)

# evolution-candidates.md (artifact-first, for skill-improver)
c_lines=[]
c_lines.append("# Evolution Candidates")
c_lines.append("")
c_lines.append(f"Generated: {now}")
c_lines.append("")
if include_context and not summary_only:
  c_lines.append("## State")
  c_lines.append("")
  c_lines.append("```json")
  c_lines.append(json.dumps(state,ensure_ascii=True,indent=2))
  c_lines.append("```")
  c_lines.append("")
c_lines.append("## Failure Summary (windowed)")
c_lines.append("")
c_lines.append(f"- total_failures: {len(filtered)} (recent_window_minutes={recent_window_minutes} recent_only={recent_only})")
if category_counts:
  c_lines.append("- by_category:")
  for cat,count in top_categories:
    c_lines.append(f"  - {cat}: {count}")
else:
  c_lines.append("- by_category: none")
c_lines.append("")
c_lines.append("## Repeated Issues (>= min_fail_count)")
c_lines.append("")
if repeated:
  c_lines.extend(fmt_table(repeated[:20]))
else:
  c_lines.append("- None")
c_lines.append("")
if not summary_only:
  c_lines.append("## Recent Failures")
  c_lines.append("")
  if recent_lines:
    c_lines.extend(recent_lines)
  else:
    c_lines.append("- None")
  c_lines.append("")
c_lines.append("## Suggested Skill Targets (heuristic)")
c_lines.append("")
if targets:
  for t in targets:
    c_lines.append(f"- {t}")
else:
  c_lines.append("- None")
c_lines.append("")
c_lines.append("## Next")
c_lines.append("")
c_lines.append("- If you want to evolve skills: run `skill-improver` with this run_dir (or the workflow run_dir)")
c_lines.append("- Review and apply patches manually (no auto edits)")
c_lines.append("")
c_lines.append("Run directory:")
c_lines.append(f"- {os.path.dirname(candidates_path)}")

with open(candidates_path,"w") as f:
  f.write("\n".join(c_lines))

# evolution-review.md (human-facing quick questions)
r_lines=[]
r_lines.append("# Evolution Review (Quick)")
r_lines.append("")
r_lines.append(f"Generated: {now}")
r_lines.append("")
r_lines.append("## Signal Summary")
r_lines.append("")
r_lines.append(f"- events_total: {len(events)}")
r_lines.append(f"- failures_total (windowed): {len(filtered)}")
if category_counts:
  r_lines.append("- top_categories:")
  for cat,count in top_categories:
    r_lines.append(f"  - {cat}: {count}")
else:
  r_lines.append("- top_categories: none")
r_lines.append("")
r_lines.append("## Suggested Skill Targets (heuristic)")
r_lines.append("")
if targets:
  for t in targets:
    r_lines.append(f"- {t}")
else:
  r_lines.append("- None")
r_lines.append("")
r_lines.append("## 60s Questions (choose A/B/C...)")
r_lines.append("")
r_lines.append("1) Do you want to optimize skills based on this run?")
r_lines.append("   A. Yes, propose a patch now (recommend using skill-improver first to generate minimal patch)")
r_lines.append("   B. Record the issue first, optimize later")
r_lines.append("   C. Not needed")
r_lines.append("")
r_lines.append("2) What was the biggest blocker this time?")
r_lines.append("   A. Missing input/context fields (need clearer I/O contracts)")
r_lines.append("   B. Unclear plan/granularity too large (need to split or clarify validation steps)")
r_lines.append("   C. Environment/dependency/command issues (need scripting or fixed commands)")
r_lines.append("   D. UI/design iterations (need clearer design-system or UI subtask splitting)")
r_lines.append("   E. External service/permissions/configuration (need clearer confirmation points and verification)")
r_lines.append("   F. Other (explain in one sentence)")
r_lines.append("")
r_lines.append("3) Which direction do you want to prioritize for optimization?")
r_lines.append("   A. I/O contracts: Fix artifact names, fields, paths")
r_lines.append("   B. Index/summary: Less context, better resume navigation (proposal/tasks)")
r_lines.append("   C. Scripts/templates: Turn repetitive steps into deterministic scripts")
r_lines.append("   D. Confirmation points: Reduce risky actions, confirm earlier/more clearly")
r_lines.append("")
r_lines.append("## If you choose 1A")
r_lines.append("")
r_lines.append("- Next step: run `skill-improver` using one of:")
r_lines.append(f"  - {os.path.dirname(candidates_path)}  (evolution run_dir)")
r_lines.append("- Then apply the minimal patch manually.")
r_lines.append("")
r_lines.append("Artifacts:")
r_lines.append(f"- candidates: {candidates_path}")
r_lines.append(f"- failures: {fail_path}")
r_lines.append(f"- events: {events_path}")

with open(review_path,"w") as f:
  f.write("\n".join(r_lines))
PY
fi

# Optional: if we are in the Ship Faster skills repo, run repo checks in check-mode
# and write results to the evolution run_dir (do not modify repo state).
repo_lint="$project_root/skills/skill-creator/scripts/skill_lint.py"
if [ -f "$repo_lint" ] && command -v python3 >/dev/null 2>&1; then
  repo_check="$run_dir/skill-repo-check.md"
  set +e
  python3 - "$repo_check" "$repo_lint" <<'PY'
import datetime
import subprocess
import sys

out_path=sys.argv[1]
lint_path=sys.argv[2]

ts=datetime.datetime.utcnow().replace(microsecond=0).isoformat()+"Z"
cmd=[sys.executable, lint_path, "--check-generated"]
res=subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
output=(res.stdout or "")

max_chars=6000
truncated=output
was_truncated=False
if len(truncated) > max_chars:
  truncated=truncated[:max_chars] + "\n... (truncated)\n"
  was_truncated=True

lines=[]
lines.append("# Skill Repo Check")
lines.append("")
lines.append(f"Generated: {ts}")
lines.append("")
lines.append("Command:")
lines.append("")
lines.append("```bash")
lines.append(" ".join(cmd))
lines.append("```")
lines.append("")
lines.append(f"Exit code: {res.returncode}")
lines.append("")
if truncated.strip():
  lines.append("## Output")
  lines.append("")
  lines.append("```text")
  lines.append(truncated.rstrip())
  lines.append("```")
  lines.append("")
if res.returncode != 0:
  lines.append("## Fix")
  lines.append("")
  lines.append("Run:")
  lines.append("")
  lines.append("```bash")
  lines.append("python skills/skill-creator/scripts/sync_catalog.py")
  lines.append("python skills/skill-creator/scripts/skill_lint.py --check-generated")
  lines.append("```")
  lines.append("")
elif was_truncated:
  lines.append("## Note")
  lines.append("")
  lines.append("Output was truncated.")
  lines.append("")

with open(out_path, "w") as f:
  f.write("\n".join(lines) + "\n")

sys.exit(0)
PY
  set -e
fi

if [ -f "$review" ]; then
  printf "\n[Evolution] Review written: %s\n" "$review"
  printf "[Evolution] If you want to improve skills, open it and answer Q1 (A/B/C).\n"
fi
