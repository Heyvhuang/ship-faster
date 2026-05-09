#!/usr/bin/env bash
set -euo pipefail

output="${1:-}"
exit_code="${2:-0}"

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

tool_name="${TOOL_NAME:-${TOOL:-}}"

if command -v python3 >/dev/null 2>&1; then
  python3 - "$run_dir/logs/events.jsonl" "$project_root" "$tool_name" "$exit_code" "$output" <<'PY'
import json,os,sys,datetime

path=sys.argv[1]
project_root=sys.argv[2]
tool=sys.argv[3] or ""
try:
  exit_code=int(sys.argv[4])
except Exception:
  exit_code=0
raw=sys.argv[5] if len(sys.argv) > 5 else ""

def safe_extract_paths(s):
  # Best-effort: extract file paths without storing content.
  # Handles JSON-ish outputs containing filePath or paths.
  paths=[]
  try:
    data=json.loads(s)
    if isinstance(data, dict):
      for k in ("filePath","path","file","target","output"):
        v=data.get(k)
        if isinstance(v, str):
          paths.append(v)
      v=data.get("files")
      if isinstance(v, list):
        for item in v:
          if isinstance(item, dict):
            p=item.get("name") or item.get("path")
            if isinstance(p, str):
              paths.append(p)
  except Exception:
    pass

  # fallback: nothing
  out=[]
  for p in paths:
    p=p.strip()
    if not p:
      continue
    # normalize to repo-relative if possible
    if project_root and p.startswith(project_root.rstrip("/") + "/"):
      p=p[len(project_root.rstrip("/"))+1:]
    if p not in out:
      out.append(p)
  return out[:10]

obj={
  "ts": datetime.datetime.utcnow().replace(microsecond=0).isoformat()+"Z",
  "event": "post-tool",
  "tool": tool,
  "exit_code": exit_code,
  "ok": exit_code == 0,
  "output_len": len(raw or ""),
}

paths=safe_extract_paths(raw or "")
if paths:
  obj["paths"]=paths

with open(path,"a") as f:
  f.write(json.dumps(obj,ensure_ascii=True)+"\n")
PY
fi
