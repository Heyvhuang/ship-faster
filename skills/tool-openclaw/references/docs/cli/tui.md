<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/tui.md; fetched_at=2026-04-04T20:36:06.050Z; sha256=0a0a4f6f0a52c82938cea2f6354442968b72d83c43a6475804bc9a3a55efb24f; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# tui

# `openclaw tui`

Open the terminal UI connected to the Gateway.

Related:

* TUI guide: [TUI](/web/tui)

Notes:

* `tui` resolves configured gateway auth SecretRefs for token/password auth when possible (`env`/`file`/`exec` providers).
* When launched from inside a configured agent workspace directory, TUI auto-selects that agent for the session key default (unless `--session` is explicitly `agent:<id>:...`).

## Examples

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw tui
openclaw tui --url ws://127.0.0.1:18789 --token <token>
openclaw tui --session main --deliver
# when run inside an agent workspace, infers that agent automatically
openclaw tui --session bugfix
```


Built with [Mintlify](https://mintlify.com).
