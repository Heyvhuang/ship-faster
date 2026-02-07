#!/usr/bin/env bash
set -euo pipefail

# Docs snapshot auto-update wrapper (safe-by-default)
# - Uses a lock to prevent concurrent runs
# - Writes logs to <skillroot>/logs/
# - Default: seed mode (only placeholders)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

MODE="${DOCS_SNAPSHOT_MODE:-seed}"              # seed|full|index
LOCALE="${DOCS_SNAPSHOT_LOCALE:-}"              # e.g. zh-CN
FILTER="${DOCS_SNAPSHOT_FILTER:-}"              # regex
NODE_BIN="${DOCS_SNAPSHOT_NODE_BIN:-node}"
LOCK_DIR="${DOCS_SNAPSHOT_LOCK_DIR:-${ROOT}/.locks/docs_snapshot}"
LOG_DIR="${DOCS_SNAPSHOT_LOG_DIR:-${ROOT}/logs}"
LOG_FILE="${LOG_DIR}/docs_snapshot_autoupdate.log"

mkdir -p "${LOCK_DIR}" "${LOG_DIR}"

# simple lock: mkdir a pid dir
LOCK_KEY="${LOCK_DIR}/lock"
if ! mkdir "${LOCK_KEY}" 2>/dev/null; then
  echo "[docs-snapshot] lock busy; exiting"
  exit 0
fi
cleanup() { rmdir "${LOCK_KEY}" 2>/dev/null || true; }
trap cleanup EXIT

echo "[$(date -Is)] [docs-snapshot] start mode=${MODE} locale=${LOCALE} filter=${FILTER}" | tee -a "${LOG_FILE}"

cd "${ROOT}"

ARGS=( "scripts/update_docs_snapshot.mjs" "--mode" "${MODE}" )
if [[ -n "${LOCALE}" ]]; then
  ARGS+=( "--locale" "${LOCALE}" )
fi
if [[ -n "${FILTER}" ]]; then
  ARGS+=( "--filter" "${FILTER}" )
fi

set +e
"${NODE_BIN}" "${ARGS[@]}" >> "${LOG_FILE}" 2>&1
RC=$?
set -e

echo "[$(date -Is)] [docs-snapshot] done rc=${RC}" | tee -a "${LOG_FILE}"
exit "${RC}"
