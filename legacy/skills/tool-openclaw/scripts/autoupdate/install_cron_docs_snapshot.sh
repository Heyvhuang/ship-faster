#!/usr/bin/env bash
set -euo pipefail

# Install cron job for docs snapshot auto-update
# Run from anywhere; it will compute the skill root based on this script location.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

SCHEDULE="${DOCS_SNAPSHOT_CRON_SCHEDULE:-0 */6 * * *}" # every 6 hours
JOB="cd \"${ROOT}\" && bash \"${ROOT}/scripts/autoupdate/docs_snapshot_autoupdate.sh\""

TMP="$(mktemp)"
( crontab -l 2>/dev/null || true ) > "${TMP}"

if grep -Fq "${JOB}" "${TMP}"; then
  echo "cron job already installed"
  rm -f "${TMP}"
  exit 0
fi

echo "${SCHEDULE} ${JOB}" >> "${TMP}"
crontab "${TMP}"
rm -f "${TMP}"
echo "installed cron job: ${SCHEDULE} ${JOB}"
