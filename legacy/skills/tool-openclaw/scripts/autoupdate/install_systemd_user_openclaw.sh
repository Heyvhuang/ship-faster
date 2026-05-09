#!/usr/bin/env bash
set -euo pipefail

# Install systemd --user timer for OpenClaw auto-update (Linux)
# Enable:
#   systemctl --user enable --now openclaw-autoupdate.timer

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

UNIT_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/systemd/user"
mkdir -p "${UNIT_DIR}"

SERVICE_NAME="openclaw-autoupdate.service"
TIMER_NAME="openclaw-autoupdate.timer"

SERVICE_PATH="${UNIT_DIR}/${SERVICE_NAME}"
TIMER_PATH="${UNIT_DIR}/${TIMER_NAME}"

cat > "${SERVICE_PATH}" <<EOF
[Unit]
Description=OpenClaw Auto Update

[Service]
Type=oneshot
WorkingDirectory=${ROOT}
ExecStart=/usr/bin/env bash ${ROOT}/scripts/autoupdate/openclaw_autoupdate.sh
EOF

cat > "${TIMER_PATH}" <<EOF
[Unit]
Description=Run OpenClaw Auto Update (timer)

[Timer]
OnBootSec=30m
OnCalendar=daily
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
