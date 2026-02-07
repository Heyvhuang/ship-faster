#!/usr/bin/env bash
set -euo pipefail

# Create a shareable diagnostic bundle (best-effort).
# It avoids copying raw config files by default, and tries to redact obvious secrets.

OPENCLAW_BIN="${OPENCLAW_BIN:-openclaw}"
OUT_DIR="${OUT_DIR:-$PWD/diag}"
TS="$(date -u +"%Y%m%dT%H%M%SZ")"
BUNDLE_DIR="${OUT_DIR}/openclaw-diag-${TS}"
ARCHIVE="${BUNDLE_DIR}.tar.gz"

mkdir -p "${BUNDLE_DIR}"

note() { echo "[$(date -Is)] $*" | tee -a "${BUNDLE_DIR}/_meta.log"; }

redact() {
  # naive redaction: replace tokens/keys in output text
  sed -E \
    -e 's/([A-Za-z0-9_]*token[A-Za-z0-9_]*\s*[:=]\s*)[^"'\''[:space:]]+/\1<REDACTED>/Ig' \
    -e 's/([A-Za-z0-9_]*key[A-Za-z0-9_]*\s*[:=]\s*)[^"'\''[:space:]]+/\1<REDACTED>/Ig' \
    -e 's/([A-Za-z0-9_]*secret[A-Za-z0-9_]*\s*[:=]\s*)[^"'\''[:space:]]+/\1<REDACTED>/Ig'
}

note "diag bundle start"
note "openclaw bin: ${OPENCLAW_BIN}"

if command -v "${OPENCLAW_BIN}" >/dev/null 2>&1; then
  set +e
  "${OPENCLAW_BIN}" status --all 2>&1 | redact > "${BUNDLE_DIR}/status--all.txt"
  "${OPENCLAW_BIN}" doctor 2>&1 | redact > "${BUNDLE_DIR}/doctor.txt"
  "${OPENCLAW_BIN}" gateway status 2>&1 | redact > "${BUNDLE_DIR}/gateway-status.txt"
  "${OPENCLAW_BIN}" logs --tail 400 2>&1 | redact > "${BUNDLE_DIR}/logs--tail400.txt"
  set -e
else
  note "WARN: openclaw not found; skipping command outputs"
fi

# Basic environment snapshot
(
  echo "uname: $(uname -a 2>/dev/null || true)"
  echo "whoami: $(whoami 2>/dev/null || true)"
  echo "date: $(date -Is 2>/dev/null || true)"
) > "${BUNDLE_DIR}/env.txt"

# Pack
tar -czf "${ARCHIVE}" -C "${OUT_DIR}" "openclaw-diag-${TS}"
note "wrote ${ARCHIVE}"
echo "${ARCHIVE}"
