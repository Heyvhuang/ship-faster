#!/usr/bin/env bash
set -euo pipefail

# Backup ~/.openclaw
# WARNING: may contain secrets (tokens/credentials). Treat the archive as sensitive.

SRC="${SRC:-$HOME/.openclaw}"
OUT_DIR="${OUT_DIR:-$PWD/backups}"
TS="$(date -u +"%Y%m%dT%H%M%SZ")"
OUT="${OUT_DIR}/openclaw-state-${TS}.tar.gz"

mkdir -p "${OUT_DIR}"

if [[ ! -d "${SRC}" ]]; then
  echo "ERROR: ${SRC} not found"
  exit 2
fi

tar -czf "${OUT}" -C "$(dirname "${SRC}")" "$(basename "${SRC}")"
echo "${OUT}"
echo "NOTE: this archive may contain secrets. Store/encrypt it appropriately."
