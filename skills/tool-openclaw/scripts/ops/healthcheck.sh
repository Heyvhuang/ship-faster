#!/usr/bin/env bash
set -euo pipefail

OPENCLAW_BIN="${OPENCLAW_BIN:-openclaw}"
GATEWAY_HOST="${GATEWAY_HOST:-127.0.0.1}"
GATEWAY_PORT="${GATEWAY_PORT:-18789}"

echo "[healthcheck] openclaw bin: ${OPENCLAW_BIN}"

if ! command -v "${OPENCLAW_BIN}" >/dev/null 2>&1; then
  echo "[healthcheck] ERROR: openclaw not found on PATH (set OPENCLAW_BIN if needed)"
  exit 2
fi

echo "[healthcheck] running: openclaw status"
set +e
"${OPENCLAW_BIN}" status
RC=$?
set -e
echo "[healthcheck] openclaw status rc=${RC}"

# Optional port check
if command -v nc >/dev/null 2>&1; then
  echo "[healthcheck] checking gateway port: ${GATEWAY_HOST}:${GATEWAY_PORT}"
  if nc -z "${GATEWAY_HOST}" "${GATEWAY_PORT}" >/dev/null 2>&1; then
    echo "[healthcheck] gateway port reachable"
  else
    echo "[healthcheck] WARN: gateway port not reachable"
  fi
else
  echo "[healthcheck] nc not found; skipping port check"
fi

exit "${RC}"
