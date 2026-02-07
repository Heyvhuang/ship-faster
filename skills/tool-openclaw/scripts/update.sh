#!/bin/bash
# Update the bundled OpenClaw docs snapshot from https://docs.openclaw.ai
# Usage:
#   ./scripts/update.sh --mode index
#   ./scripts/update.sh --mode seed --locale zh-CN
#   ./scripts/update.sh --mode full --filter "^gateway/"

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"

# Check Node.js version
NODE_VERSION=$(node -v 2>/dev/null | sed 's/v//' | cut -d. -f1)
if [ -z "$NODE_VERSION" ] || [ "$NODE_VERSION" -lt 18 ]; then
  echo "Error: Node.js >= 18 required (found: $(node -v 2>/dev/null || echo 'none'))" >&2
  exit 1
fi

echo "Updating OpenClaw docs snapshot..."
echo "Source: https://docs.openclaw.ai"
echo "Target: $SKILL_DIR/references/docs/"
echo ""

node "$SCRIPT_DIR/update_docs_snapshot.mjs" \
  --base https://docs.openclaw.ai \
  "$@"

echo ""
echo "Done. Check $SKILL_DIR/references/docs/__SNAPSHOT_INDEX.md for summary."
