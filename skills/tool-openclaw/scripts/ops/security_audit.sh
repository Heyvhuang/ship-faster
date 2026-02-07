#!/usr/bin/env bash
set -euo pipefail

# Quick-and-dirty security audit for common risky settings (heuristic).
# It does NOT modify anything.

CONF="${CONF:-$HOME/.openclaw/openclaw.json}"

echo "[security_audit] config: ${CONF}"
if [[ ! -f "${CONF}" ]]; then
  echo "[security_audit] WARN: config not found"
  exit 0
fi

# Heuristic checks
echo ""
echo "=== Risky patterns (heuristic grep) ==="

grep -nE '"tools"\s*:\s*{[^}]*"profile"\s*:\s*"full"' "${CONF}" 2>/dev/null && echo "WARN: tools.profile=full (very permissive)" || true
grep -nE '"deny"\s*:\s*\[\s*\]' "${CONF}" 2>/dev/null && echo "NOTE: tools.deny empty" || true
grep -nE '"allow"\s*:\s*\[[^]]*"group:runtime"' "${CONF}" 2>/dev/null && echo "WARN: allow includes group:runtime (exec/process) — ensure approvals" || true
grep -nE '"elevated"\s*:\s*true' "${CONF}" 2>/dev/null && echo "WARN: elevated=true somewhere — confirm you intended host-level exec" || true
grep -nE '"gatewayUrl"\s*:\s*"' "${CONF}" 2>/dev/null && echo "NOTE: gatewayUrl is set — check remote security/token" || true

echo ""
echo "=== Suggestions ==="
echo "- If you don't need exec/process, deny group:runtime."
echo "- If you run remotely, enable authentication and keep token private."
echo "- Prefer least-privilege tools.profile (minimal/coding/messaging) over full."
