<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/health.md; fetched_at=2026-02-20T10:29:15.239Z; sha256=385f12a554b24753c9ac87d2edc70656754a5f8978246bf73379a825aeff1c33; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# health

# `openclaw health`

Fetch health from the running Gateway.

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw health
openclaw health --json
openclaw health --verbose
```

Notes:

* `--verbose` runs live probes and prints per-account timings when multiple accounts are configured.
* Output includes per-agent session stores when multiple agents are configured.
