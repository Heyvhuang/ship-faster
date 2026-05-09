<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/health.md; fetched_at=2026-04-04T20:36:05.856Z; sha256=6a9adc38b007f20dfa1e8078ac784365c9b31baa5ff8fe0a03e82743d024b0f5; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# health

# `openclaw health`

Fetch health from the running Gateway.

Options:

* `--json`: machine-readable output
* `--timeout <ms>`: connection timeout in milliseconds (default `10000`)
* `--verbose`: verbose logging
* `--debug`: alias for `--verbose`

Examples:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw health
openclaw health --json
openclaw health --timeout 2500
openclaw health --verbose
openclaw health --debug
```

Notes:

* Default `openclaw health` asks the running gateway for its health snapshot. When the
  gateway already has a fresh cached snapshot, it can return that cached payload and
  refresh in the background.
* `--verbose` forces a live probe, prints gateway connection details, and expands the
  human-readable output across all configured accounts and agents.
* Output includes per-agent session stores when multiple agents are configured.


Built with [Mintlify](https://mintlify.com).
