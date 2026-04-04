<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/dns.md; fetched_at=2026-04-04T20:36:05.790Z; sha256=1f43579123ed830ab46934581321f75430c7d5047d7674d406b6ede78e6e6589; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# dns

# `openclaw dns`

DNS helpers for wide-area discovery (Tailscale + CoreDNS). Currently focused on macOS + Homebrew CoreDNS.

Related:

* Gateway discovery: [Discovery](/gateway/discovery)
* Wide-area discovery config: [Configuration](/gateway/configuration)

## Setup

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw dns setup
openclaw dns setup --domain openclaw.internal
openclaw dns setup --apply
```

## `dns setup`

Plan or apply CoreDNS setup for unicast DNS-SD discovery.

Options:

* `--domain <domain>`: wide-area discovery domain (for example `openclaw.internal`)
* `--apply`: install or update CoreDNS config and restart the service (requires sudo; macOS only)

What it shows:

* resolved discovery domain
* zone file path
* current tailnet IPs
* recommended `openclaw.json` discovery config
* the Tailscale Split DNS nameserver/domain values to set

Notes:

* Without `--apply`, the command is a planning helper only and prints the recommended setup.
* If `--domain` is omitted, OpenClaw uses `discovery.wideArea.domain` from config.
* `--apply` currently supports macOS only and expects Homebrew CoreDNS.
* `--apply` bootstraps the zone file if needed, ensures the CoreDNS import stanza exists, and restarts the `coredns` brew service.


Built with [Mintlify](https://mintlify.com).
