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

next_version=""
if [ -f "$project_root/package.json" ] && command -v python3 >/dev/null 2>&1; then
  next_version="$(python3 - "$project_root/package.json" <<'PY'
import json,sys
path=sys.argv[1]
try:
    data=json.load(open(path))
except Exception:
    print("")
    raise SystemExit(0)
for key in ("dependencies","devDependencies"):
    if key in data and isinstance(data[key], dict) and "next" in data[key]:
        print(str(data[key]["next"]))
        raise SystemExit(0)
print("")
PY
)"
fi

pkg_manager=""
if [ -f "$project_root/pnpm-lock.yaml" ]; then
  pkg_manager="pnpm"
elif [ -f "$project_root/yarn.lock" ]; then
  pkg_manager="yarn"
elif [ -f "$project_root/package-lock.json" ]; then
  pkg_manager="npm"
elif [ -f "$project_root/bun.lockb" ]; then
  pkg_manager="bun"
fi

tool_name="${TOOL_NAME:-${TOOL:-}}"

export EVOLUTION_PROJECT_ROOT="$project_root"
export EVOLUTION_RUN_DIR="$run_dir"
export EVOLUTION_RUN_ID="$run_id"
export EVOLUTION_NEXT_VERSION="$next_version"
export EVOLUTION_PACKAGE_MANAGER="$pkg_manager"
export EVOLUTION_TOOL_NAME="$tool_name"
export EVOLUTION_SETTINGS_PATH="$SCRIPT_DIR/settings.json"

if command -v python3 >/dev/null 2>&1; then
  python3 - "$run_dir/logs/state.json" "$run_dir/logs/context.json" <<'PY'
import json,os,sys,datetime
state_path=sys.argv[1]
legacy_context_path=sys.argv[2]

now=datetime.datetime.utcnow().replace(microsecond=0).isoformat()+"Z"

prev={}
if os.path.isfile(state_path):
  try:
    prev=json.load(open(state_path))
  except Exception:
    prev={}

created_at=prev.get("created_at") or now
obj={
  "workflow": "evolution",
  "run_id": os.environ.get("EVOLUTION_RUN_ID",""),
  "created_at": created_at,
  "last_updated": now,
  "project_root": os.environ.get("EVOLUTION_PROJECT_ROOT",""),
  "next_version": os.environ.get("EVOLUTION_NEXT_VERSION",""),
  "package_manager": os.environ.get("EVOLUTION_PACKAGE_MANAGER",""),
  "last_tool": os.environ.get("EVOLUTION_TOOL_NAME",""),
  "hooks": {
    "settings_path": os.environ.get("EVOLUTION_SETTINGS_PATH",""),
    "version": 2,
  },
}

with open(state_path,"w") as f:
  json.dump(obj,f,ensure_ascii=True,indent=2)

# Back-compat: older versions read context.json
with open(legacy_context_path,"w") as f:
  json.dump(obj, f, ensure_ascii=True,indent=2)
PY

  python3 - "$run_dir/logs/events.jsonl" <<'PY'
import json,os,sys,datetime
path=sys.argv[1]
obj={
  "ts": datetime.datetime.utcnow().replace(microsecond=0).isoformat()+"Z",
  "event": "pre-tool",
  "run_id": os.environ.get("EVOLUTION_RUN_ID",""),
  "project_root": os.environ.get("EVOLUTION_PROJECT_ROOT",""),
  "next_version": os.environ.get("EVOLUTION_NEXT_VERSION",""),
  "package_manager": os.environ.get("EVOLUTION_PACKAGE_MANAGER",""),
  "tool": os.environ.get("EVOLUTION_TOOL_NAME",""),
}
with open(path,"a") as f:
  f.write(json.dumps(obj,ensure_ascii=True)+"\n")
PY
fi
