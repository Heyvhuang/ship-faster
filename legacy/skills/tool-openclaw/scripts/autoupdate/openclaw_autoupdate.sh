#!/usr/bin/env bash
set -euo pipefail

# OpenClaw auto-update wrapper
# Assumptions:
# - `openclaw` is on PATH OR OPENCLAW_BIN is set
# - Restart method depends on platform and how you run gateway (systemd/launchd/manual)

OPENCLAW_BIN="${OPENCLAW_BIN:-openclaw}"
LOG_DIR="${OPENCLAW_LOG_DIR:-$HOME/.openclaw/logs}"
mkdir -p "${LOG_DIR}"
LOG_FILE="${LOG_DIR}/openclaw_autoupdate.log"

LOCK_DIR="${OPENCLAW_LOCK_DIR:-$HOME/.openclaw/.locks}"
mkdir -p "${LOCK_DIR}"
LOCK_KEY="${LOCK_DIR}/openclaw_autoupdate.lock"
if ! mkdir "${LOCK_KEY}" 2>/dev/null; then
  echo "[openclaw] lock busy; exiting"
  exit 0
fi
cleanup() { rmdir "${LOCK_KEY}" 2>/dev/null || true; }
trap cleanup EXIT

RESTART="${OPENCLAW_AUTORESTART:-0}"  # 1 to restart after update (best-effort)

echo "[$(date -Is)] [openclaw] start update" | tee -a "${LOG_FILE}"

set +e
"${OPENCLAW_BIN}" update >> "${LOG_FILE}" 2>&1
RC=$?
set -e

echo "[$(date -Is)] [openclaw] update done rc=${RC}" | tee -a "${LOG_FILE}"

if [[ "${RESTART}" == "1" ]]; then
  echo "[$(date -Is)] [openclaw] attempting restart (best-effort)" | tee -a "${LOG_FILE}"
  set +e
  "${OPENCLAW_BIN}" gateway restart >> "${LOG_FILE}" 2>&1
  "${OPENCLAW_BIN}" gateway status >> "${LOG_FILE}" 2>&1
  set -e
fi

exit "${RC}"
