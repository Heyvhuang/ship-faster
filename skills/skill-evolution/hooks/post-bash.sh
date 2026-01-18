#!/usr/bin/env bash
set -euo pipefail

output="${1:-}"
exit_code="${2:-}"
if [ -z "$exit_code" ]; then
  exit 0
fi

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
mkdir -p "$run_root"
current_file="$run_root/.current"
if [ -f "$current_file" ]; then
  run_id="$(< "$current_file")"
else
  run_id="$(date -u +%Y%m%d-%H%M%S)"
  printf "%s" "$run_id" > "$current_file"
fi
run_dir="$run_root/$run_id"
mkdir -p "$run_dir/logs"

lower="$(printf "%s" "$output" | tr '[:upper:]' '[:lower:]')"
category="other"
if printf "%s" "$lower" | grep -q "next build"; then
  category="build"
elif printf "%s" "$lower" | grep -q "next lint"; then
  category="lint"
elif printf "%s" "$lower" | grep -q "eslint"; then
  category="lint"
elif printf "%s" "$lower" | grep -q "tsc"; then
  category="typecheck"
elif printf "%s" "$lower" | grep -q "typescript"; then
  category="typecheck"
elif printf "%s" "$lower" | grep -q "jest"; then
  category="test"
elif printf "%s" "$lower" | grep -q "vitest"; then
  category="test"
elif printf "%s" "$lower" | grep -q "vercel"; then
  category="deploy"
elif printf "%s" "$lower" | grep -q "supabase"; then
  category="supabase"
elif printf "%s" "$lower" | grep -q "stripe"; then
  category="stripe"
fi

summary="$(printf "%s" "$output" | tr '\n' ' ' | tr -s ' ' | cut -c1-240)"

export EVOLUTION_PROJECT_ROOT="$project_root"
export EVOLUTION_RUN_DIR="$run_dir"
export EVOLUTION_EXIT_CODE="$exit_code"
export EVOLUTION_CATEGORY="$category"
export EVOLUTION_SUMMARY="$summary"

if command -v python3 >/dev/null 2>&1; then
  python3 - "$run_dir/logs/events.jsonl" <<'PY'
import json,os,sys,datetime
path=sys.argv[1]
exit_code=int(os.environ.get("EVOLUTION_EXIT_CODE","0"))
obj={
  "ts": datetime.datetime.utcnow().replace(microsecond=0).isoformat()+"Z",
  "event": "post-bash",
  "category": os.environ.get("EVOLUTION_CATEGORY","other"),
  "exit_code": exit_code,
  "ok": exit_code == 0,
  "summary": os.environ.get("EVOLUTION_SUMMARY",""),
}
with open(path,"a") as f:
  f.write(json.dumps(obj,ensure_ascii=True)+"\n")
PY

  if [ "$exit_code" != "0" ]; then
    python3 - "$run_dir/logs/failures.jsonl" <<'PY'
import json,os,sys,datetime
path=sys.argv[1]
obj={
  "ts": datetime.datetime.utcnow().replace(microsecond=0).isoformat()+"Z",
  "event": "post-bash",
  "exit_code": int(os.environ.get("EVOLUTION_EXIT_CODE","1")),
  "category": os.environ.get("EVOLUTION_CATEGORY","other"),
  "summary": os.environ.get("EVOLUTION_SUMMARY",""),
}
with open(path,"a") as f:
  f.write(json.dumps(obj,ensure_ascii=True)+"\n")
PY
  fi
fi
