> ## Documentation Index
> Fetch the complete documentation index at: https://docs.clawd.bot/llms.txt
> Use this file to discover all available pages before exploring further.

# null

# `clawdbot memory`

Manage semantic memory indexing and search.
Provided by the active memory plugin (default: `memory-core`; set `plugins.slots.memory = "none"` to disable).

Related:

* Memory concept: [Memory](/concepts/memory)
* Plugins: [Plugins](/plugins)

## Examples

```bash  theme={null}
clawdbot memory status
clawdbot memory status --deep
clawdbot memory status --deep --index
clawdbot memory status --deep --index --verbose
clawdbot memory index
clawdbot memory index --verbose
clawdbot memory search "release checklist"
clawdbot memory status --agent main
clawdbot memory index --agent main --verbose
```

## Options

Common:

* `--agent <id>`: scope to a single agent (default: all configured agents).
* `--verbose`: emit detailed logs during probes and indexing.

Notes:

* `memory status --deep` probes vector + embedding availability.
* `memory status --deep --index` runs a reindex if the store is dirty.
* `memory index --verbose` prints per-phase details (provider, model, sources, batch activity).
