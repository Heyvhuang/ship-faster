#!/bin/bash
# Update Clawdbot docs snapshot from https://docs.clawd.bot
# Usage: ./scripts/update.sh [--limit N]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"

# Check Node.js version
NODE_VERSION=$(node -v 2>/dev/null | sed 's/v//' | cut -d. -f1)
if [ -z "$NODE_VERSION" ] || [ "$NODE_VERSION" -lt 18 ]; then
  echo "Error: Node.js >= 18 required (found: $(node -v 2>/dev/null || echo 'none'))"
  exit 1
fi

echo "Updating Clawdbot docs snapshot..."
echo "Source: https://docs.clawd.bot"
echo "Target: $SKILL_DIR/references/docs/"
echo ""

node "$SCRIPT_DIR/update_docs_snapshot.mjs" \
  --base https://docs.clawd.bot \
  --out "$SKILL_DIR/references/docs" \
  "$@"

echo ""
echo "Done. Check $SKILL_DIR/references/docs/INDEX.md for summary."
