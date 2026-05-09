#!/usr/bin/env bash
set -euo pipefail

# Install cron job for OpenClaw auto-update
SCHEDULE="${OPENCLAW_CRON_SCHEDULE:-0 4 * * *}" # daily at 04:00
JOB="bash \"$HOME/.openclaw/scripts/openclaw_autoupdate.sh\""

# If this skill is used as a repo, also allow installing from here
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
ALT_JOB="cd \"${ROOT}\" && bash \"${ROOT}/scripts/autoupdate/openclaw_autoupdate.sh\""

TMP="$(mktemp)"
( crontab -l 2>/dev/null || true ) > "${TMP}"

if grep -Fq "${ALT_JOB}" "${TMP}"; then
  echo "cron job already installed"
  rm -f "${TMP}"
  exit 0
fi

echo "${SCHEDULE} ${ALT_JOB}" >> "${TMP}"
crontab "${TMP}"
rm -f "${TMP}"
echo "installed cron job: ${SCHEDULE} ${ALT_JOB}"
