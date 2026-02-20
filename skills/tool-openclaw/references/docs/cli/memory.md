<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/memory.md; fetched_at=2026-02-20T10:29:15.598Z; sha256=36d626f4c252048d158c53e6f719fab6ae818951978e01d565b1cfb53d34be1a; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# memory

# `openclaw memory`

Manage semantic memory indexing and search.
Provided by the active memory plugin (default: `memory-core`; set `plugins.slots.memory = "none"` to disable).

Related:

* Memory concept: [Memory](/concepts/memory)
* Plugins: [Plugins](/tools/plugin)

## Examples

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw memory status
openclaw memory status --deep
openclaw memory status --deep --index
openclaw memory status --deep --index --verbose
openclaw memory index
openclaw memory index --verbose
openclaw memory search "release checklist"
openclaw memory status --agent main
openclaw memory index --agent main --verbose
```

## Options

Common:

* `--agent <id>`: scope to a single agent (default: all configured agents).
* `--verbose`: emit detailed logs during probes and indexing.

Notes:

* `memory status --deep` probes vector + embedding availability.
* `memory status --deep --index` runs a reindex if the store is dirty.
* `memory index --verbose` prints per-phase details (provider, model, sources, batch activity).
* `memory status` includes any extra paths configured via `memorySearch.extraPaths`.
