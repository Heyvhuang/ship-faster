#!/usr/bin/env bash
set -euo pipefail

# Install systemd --user service+timer for docs snapshot updates (Linux)
# Usage:
#   bash scripts/autoupdate/install_systemd_user_docs_snapshot.sh
#
# Enable:
#   systemctl --user enable --now openclaw-docs-snapshot.timer

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

UNIT_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/systemd/user"
mkdir -p "${UNIT_DIR}"

SERVICE_NAME="openclaw-docs-snapshot.service"
TIMER_NAME="openclaw-docs-snapshot.timer"

SERVICE_PATH="${UNIT_DIR}/${SERVICE_NAME}"
TIMER_PATH="${UNIT_DIR}/${TIMER_NAME}"

cat > "${SERVICE_PATH}" <<EOF
[Unit]
Description=OpenClaw Docs Snapshot Auto Update

[Service]
Type=oneshot
WorkingDirectory=${ROOT}
ExecStart=/usr/bin/env bash ${ROOT}/scripts/autoupdate/docs_snapshot_autoupdate.sh
EOF

# default: every 6 hours
cat > "${TIMER_PATH}" <<EOF
[Unit]
Description=Run OpenClaw Docs Snapshot Auto Update (timer)

[Timer]
OnBootSec=10m
OnUnitActiveSec=6h
Persistent=true

[Install]
WantedBy=timers.target
EOF

systemctl --user daemon-reload
echo "Installed:"
echo "  ${SERVICE_PATH}"
echo "  ${TIMER_PATH}"
echo "Next:"
echo "  systemctl --user enable --now ${TIMER_NAME}"
