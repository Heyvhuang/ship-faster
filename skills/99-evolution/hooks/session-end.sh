#!/usr/bin/env bash
set -euo pipefail

find_root() {
  local dir
  dir="$PWD"
  while [ "$dir" != "/" ]; do
    if [ -d "$dir/.git" ] || [ -d "$dir/.claude" ] || [ -f "$dir/package.json" ] || [ -f "$dir/Cargo.toml" ]; then
      printf "%s" "$dir"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  printf "%s" "$PWD"
}

project_root="$(find_root)"
run_root="$project_root/.claude/runs/evolution"
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
context="$run_dir/logs/context.json"
output="$run_dir/evolution-candidates.md"

if command -v python3 >/dev/null 2>&1; then
  python3 - "$failures" "$context" "$output" <<'PY'
import json,os,sys,datetime
fail_path=sys.argv[1]
context_path=sys.argv[2]
out_path=sys.argv[3]
items=[]
if os.path.isfile(fail_path):
  with open(fail_path,"r") as f:
    for line in f:
      line=line.strip()
      if not line:
        continue
      try:
        items.append(json.loads(line))
      except Exception:
        continue
context={}
if os.path.isfile(context_path):
  try:
    context=json.load(open(context_path))
  except Exception:
    context={}
now=datetime.datetime.utcnow().replace(microsecond=0).isoformat()+"Z"
lines=[]
lines.append("# Evolution Candidates")
lines.append("")
lines.append(f"Generated: {now}")
lines.append("")
lines.append("## Context")
lines.append("")
lines.append("```json")
lines.append(json.dumps(context,ensure_ascii=True,indent=2))
lines.append("```")
lines.append("")
lines.append("## Failures (recent)")
lines.append("")
if items:
  for entry in items[-20:]:
    summary=entry.get("summary","")
    category=entry.get("category","")
    exit_code=entry.get("exit_code","")
    lines.append(f"- [{category}] exit={exit_code} {summary}")
else:
  lines.append("- None")
lines.append("")
lines.append("## Next")
lines.append("")
lines.append("- Run skill-improver with this run_dir to generate patch suggestions")
lines.append("- Review and apply patches manually")
lines.append("")
lines.append("Run directory:")
lines.append(f"- {os.path.dirname(out_path)}")
with open(out_path,"w") as f:
  f.write("\n".join(lines))
PY
fi
