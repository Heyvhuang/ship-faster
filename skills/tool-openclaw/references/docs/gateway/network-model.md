<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/gateway/network-model.md; fetched_at=2026-02-20T10:29:20.384Z; sha256=fd335f20b71a4d7541895ee6bbec35ccc01355693e6eb628c8bc51284d879ac0; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Network model

Most operations flow through the Gateway (`openclaw gateway`), a single long-running
process that owns channel connections and the WebSocket control plane.

## Core rules

* One Gateway per host is recommended. It is the only process allowed to own the WhatsApp Web session. For rescue bots or strict isolation, run multiple gateways with isolated profiles and ports. See [Multiple gateways](/gateway/multiple-gateways).
* Loopback first: the Gateway WS defaults to `ws://127.0.0.1:18789`. The wizard generates a gateway token by default, even for loopback. For tailnet access, run `openclaw gateway --bind tailnet --token ...` because tokens are required for non-loopback binds.
* Nodes connect to the Gateway WS over LAN, tailnet, or SSH as needed. The legacy TCP bridge is deprecated.
* Canvas host is served by the Gateway HTTP server on the **same port** as the Gateway (default `18789`):
  * `/__openclaw__/canvas/`
  * `/__openclaw__/a2ui/`
    When `gateway.auth` is configured and the Gateway binds beyond loopback, these routes are protected by Gateway auth. Node clients use node-scoped capability URLs tied to their active WS session. See [Gateway configuration](/gateway/configuration) (`canvasHost`, `gateway`).
* Remote use is typically SSH tunnel or tailnet VPN. See [Remote access](/gateway/remote) and [Discovery](/gateway/discovery).
