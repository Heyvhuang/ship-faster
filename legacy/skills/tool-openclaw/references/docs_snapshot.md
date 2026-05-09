# Docs Snapshot (Local + Indexed)

This skill keeps a local snapshot of the OpenClaw documentation under:

- Snapshot: `references/docs/`
- Human/agent index: `references/docs/__SNAPSHOT_INDEX.md`
- Machine index: `references/docs/__SNAPSHOT_INDEX.json`
- Manifest: `references/docs/__SNAPSHOT_MANIFEST.json`

Some repos may contain a mix of:

- **Full pages** (real Markdown content)
- **Placeholders** (`status=placeholder` header) which can be fetched on demand

## Common maintenance commands

Rebuild index only (fast, no network):

```bash
cd tool-openclaw
# If you are working inside this repo instead of an installed skill:
# cd skills/tool-openclaw
./scripts/update.sh --mode index
```

Refresh placeholders + legacy/no-header pages + stale pages (recommended default):

```bash
./scripts/update.sh --mode seed
```

Tune seed freshness window (days):

```bash
./scripts/update.sh --mode seed --seed-max-age-days 7
```

Sync `/llms.txt` frontier (create missing placeholders + rebuild index, no page fetch):

```bash
./scripts/update.sh --mode sync
```

Sync and prune stale local pages not in current frontier (recommended weekly):

```bash
./scripts/update.sh --mode sync --prune
```

Best-effort zh-CN routing (falls back to English unless `--no-fallback`):

```bash
./scripts/update.sh --mode seed --locale zh-CN
```

Fetch a single page:

```bash
./scripts/update.sh --mode single --url https://docs.openclaw.ai/cli/update.md
```

Dry-run validation (no file writes, including index files):

```bash
./scripts/update.sh --mode full --dry-run --prune
```
