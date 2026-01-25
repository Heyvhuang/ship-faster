# Docs Snapshot (Internal)

This repo keeps an offline Clawdbot docs snapshot at `tool-clawdbot/references/docs/`.

Use it as the primary source of truth when answering Clawdbot questions.

## What the snapshot contains

- Markdown pages under `tool-clawdbot/references/docs/` (mirrors `https://docs.clawd.bot/*.md`)
- `tool-clawdbot/references/docs/INDEX.md` (generated index)
- `tool-clawdbot/references/docs/llms.txt` (the exact crawl frontier used)

## Refreshing the snapshot

Script:

- `tool-clawdbot/scripts/update_docs_snapshot.mjs`

Example:

```bash
node tool-clawdbot/scripts/update_docs_snapshot.mjs \
  --base https://docs.clawd.bot \
  --out tool-clawdbot/references/docs \
  --concurrency 5 \
  --delay-ms 100
```

Smoke test (first 5 pages only):

```bash
node tool-clawdbot/scripts/update_docs_snapshot.mjs --limit 5 --out runs/tool-clawdbot/smoke
```

## Notes

- If you see 403/429 responses, reduce `--concurrency` and increase `--delay-ms`.
