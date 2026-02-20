<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/status.md; fetched_at=2026-02-20T10:29:16.445Z; sha256=58b5163861a377b8df486065d9cc6e930c8fd4d46666aef8fa6101e51271be13; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# status

# `openclaw status`

Diagnostics for channels + sessions.

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw status
openclaw status --all
openclaw status --deep
openclaw status --usage
```

Notes:

* `--deep` runs live probes (WhatsApp Web + Telegram + Discord + Google Chat + Slack + Signal).
* Output includes per-agent session stores when multiple agents are configured.
* Overview includes Gateway + node host service install/runtime status when available.
* Overview includes update channel + git SHA (for source checkouts).
* Update info surfaces in the Overview; if an update is available, status prints a hint to run `openclaw update` (see [Updating](/install/updating)).
