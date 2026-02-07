#!/usr/bin/env bash
set -euo pipefail

# Install launchd agent for OpenClaw auto-update (macOS) - daily

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

PLIST_DIR="$HOME/Library/LaunchAgents"
mkdir -p "${PLIST_DIR}"

LABEL="ai.openclaw.autoupdate"
PLIST="${PLIST_DIR}/${LABEL}.plist"
LOG_DIR="$HOME/.openclaw/logs"
mkdir -p "${LOG_DIR}"

# Run every 24h
cat > "${PLIST}" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${LABEL}</string>

  <key>ProgramArguments</key>
  <array>
    <string>/usr/bin/env</string>
    <string>bash</string>
    <string>${ROOT}/scripts/autoupdate/openclaw_autoupdate.sh</string>
  </array>

  <key>WorkingDirectory</key>
  <string>${ROOT}</string>

  <key>StartInterval</key>
  <integer>86400</integer>

  <key>StandardOutPath</key>
  <string>${LOG_DIR}/launchd-openclaw-autoupdate.out.log</string>
  <key>StandardErrorPath</key>
  <string>${LOG_DIR}/launchd-openclaw-autoupdate.err.log</string>

  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
EOF

launchctl unload "${PLIST}" >/dev/null 2>&1 || true
launchctl load "${PLIST}"
echo "Installed and loaded LaunchAgent: ${PLIST}"
echo "Check logs in: ${LOG_DIR}"
