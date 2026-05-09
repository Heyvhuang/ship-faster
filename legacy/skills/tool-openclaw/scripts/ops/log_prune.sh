#!/usr/bin/env bash
set -euo pipefail

# Prune logs older than N days.
DAYS="${DAYS:-14}"

paths=(
  "$HOME/.openclaw/logs"
  "$HOME/.openclaw/gateway/logs"
  "/tmp/openclaw"
  "$PWD/logs"
)

echo "[log_prune] days=${DAYS}"

for p in "${paths[@]}"; do
  if [[ -d "${p}" ]]; then
    echo "[log_prune] pruning: ${p}"
    # find may differ on mac/linux; this is the common subset
    find "${p}" -type f -mtime +"${DAYS}" -print -delete 2>/dev/null || true
  fi
done

echo "[log_prune] done"
