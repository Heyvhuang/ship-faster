<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/gateway/bridge-protocol.md; fetched_at=2026-04-04T20:36:06.481Z; sha256=85d003a92c15368c052ac1697dc6ea7e40690ef59ffe10fe7897141049b9ae1c; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Bridge Protocol

# Bridge protocol (legacy node transport)

<Warning>
  The TCP bridge has been **removed**. Current OpenClaw builds do not ship the bridge listener and `bridge.*` config keys are no longer in the schema. This page is kept for historical reference only. Use the [Gateway Protocol](/gateway/protocol) for all node/operator clients.
</Warning>

## Why it existed

* **Security boundary**: the bridge exposes a small allowlist instead of the
  full gateway API surface.
* **Pairing + node identity**: node admission is owned by the gateway and tied
  to a per-node token.
* **Discovery UX**: nodes can discover gateways via Bonjour on LAN, or connect
  directly over a tailnet.
* **Loopback WS**: the full WS control plane stays local unless tunneled via SSH.

## Transport

* TCP, one JSON object per line (JSONL).
* Optional TLS (when `bridge.tls.enabled` is true).
* Historical default listener port was `18790` (current builds do not start a
  TCP bridge).

When TLS is enabled, discovery TXT records include `bridgeTls=1` plus
`bridgeTlsSha256` as a non-secret hint. Note that Bonjour/mDNS TXT records are
unauthenticated; clients must not treat the advertised fingerprint as an
authoritative pin without explicit user intent or other out-of-band verification.

## Handshake + pairing

1. Client sends `hello` with node metadata + token (if already paired).
2. If not paired, gateway replies `error` (`NOT_PAIRED`/`UNAUTHORIZED`).
3. Client sends `pair-request`.
4. Gateway waits for approval, then sends `pair-ok` and `hello-ok`.

Historically, `hello-ok` returned `serverName` and could include
`canvasHostUrl`.

## Frames

Client → Gateway:

* `req` / `res`: scoped gateway RPC (chat, sessions, config, health, voicewake, skills.bins)
* `event`: node signals (voice transcript, agent request, chat subscribe, exec lifecycle)

Gateway → Client:

* `invoke` / `invoke-res`: node commands (`canvas.*`, `camera.*`, `screen.record`,
  `location.get`, `sms.send`)
* `event`: chat updates for subscribed sessions
* `ping` / `pong`: keepalive

Legacy allowlist enforcement lived in `src/gateway/server-bridge.ts` (removed).

## Exec lifecycle events

Nodes can emit `exec.finished` or `exec.denied` events to surface system.run activity.
These are mapped to system events in the gateway. (Legacy nodes may still emit `exec.started`.)

Payload fields (all optional unless noted):

* `sessionKey` (required): agent session to receive the system event.
* `runId`: unique exec id for grouping.
* `command`: raw or formatted command string.
* `exitCode`, `timedOut`, `success`, `output`: completion details (finished only).
* `reason`: denial reason (denied only).

## Historical tailnet usage

* Bind the bridge to a tailnet IP: `bridge.bind: "tailnet"` in
  `~/.openclaw/openclaw.json` (historical only; `bridge.*` is no longer valid).
* Clients connect via MagicDNS name or tailnet IP.
* Bonjour does **not** cross networks; use manual host/port or wide-area DNS‑SD
  when needed.

## Versioning

The bridge was **implicit v1** (no min/max negotiation). This section is
historical reference only; current node/operator clients use the WebSocket
[Gateway Protocol](/gateway/protocol).


Built with [Mintlify](https://mintlify.com).
