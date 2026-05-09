#!/bin/bash
set -e

CACHE_DIR="${XDG_CACHE_HOME:-$HOME/.cache}/clawdbot-skills"
CACHE_FILE="$CACHE_DIR/awesome-list.md"
CACHE_TTL=3600
REPO_URL="https://raw.githubusercontent.com/VoltAgent/awesome-clawdbot-skills/main/README.md"

usage() {
  echo "Usage: search-skills.sh <keyword> [keyword2...]"
  echo ""
  echo "Search 565+ community OpenClaw/Clawdbot skills from awesome-clawdbot-skills."
  echo ""
  echo "Examples:"
  echo "  search-skills.sh discord"
  echo "  search-skills.sh pdf document"
  echo "  search-skills.sh --refresh telegram"
  echo ""
  echo "Options:"
  echo "  --refresh    Force refresh the cache before searching"
  echo "  --list       List all categories"
  exit 1
}

refresh_cache() {
  mkdir -p "$CACHE_DIR"
  echo "Fetching skills catalog..." >&2
  if command -v curl &>/dev/null; then
    curl -fsSL "$REPO_URL" -o "$CACHE_FILE"
  elif command -v wget &>/dev/null; then
    wget -q "$REPO_URL" -O "$CACHE_FILE"
  else
    echo "Error: curl or wget required" >&2
    exit 1
  fi
  echo "Cached to $CACHE_FILE" >&2
}

ensure_cache() {
  if [ ! -f "$CACHE_FILE" ]; then
    refresh_cache
    return
  fi
  
  local age=$(($(date +%s) - $(stat -f%m "$CACHE_FILE" 2>/dev/null || stat -c%Y "$CACHE_FILE" 2>/dev/null)))
  if [ "$age" -gt "$CACHE_TTL" ]; then
    refresh_cache
  fi
}

list_categories() {
  ensure_cache
  grep -E "^## " "$CACHE_FILE" | grep -v "Table of Contents\|Installation\|Contributing" | sed 's/^## //'
}

search_skills() {
  ensure_cache
  local pattern="$1"
  
  echo "Searching for: $pattern"
  echo "---"
  
  grep -i "$pattern" "$CACHE_FILE" | grep -E "^\- \[" | while read -r line; do
    local name=$(echo "$line" | sed -E 's/^- \[([^]]+)\].*/\1/')
    local desc=$(echo "$line" | sed -E 's/^- \[[^]]+\]\([^)]+\) - //')
    
    printf "%-25s %s\n" "$name" "$desc"
  done
  
  echo "---"
  local count=$(grep -i "$pattern" "$CACHE_FILE" | grep -cE "^\- \[" 2>/dev/null || echo "0")
  echo "Found $count skills. Install: npx clawdhub@latest install <skill-slug>"
}

if [ $# -eq 0 ]; then
  usage
fi

case "$1" in
  --refresh)
    refresh_cache
    shift
    if [ $# -gt 0 ]; then
      search_skills "$*"
    fi
    ;;
  --list)
    list_categories
    ;;
  --help|-h)
    usage
    ;;
  *)
    search_skills "$*"
    ;;
esac
