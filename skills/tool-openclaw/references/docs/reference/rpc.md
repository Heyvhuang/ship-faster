<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/reference/rpc.md; fetched_at=2026-04-04T20:36:07.823Z; sha256=4ee0d1d2069b04b40c2423f27ca96204aa7588ecc6c7afd26d13f6cf546bcd70; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# RPC Adapters

# RPC adapters

OpenClaw integrates external CLIs via JSON-RPC. Two patterns are used today.

## Pattern A: HTTP daemon (signal-cli)

* `signal-cli` runs as a daemon with JSON-RPC over HTTP.
* Event stream is SSE (`/api/v1/events`).
* Health probe: `/api/v1/check`.
* OpenClaw owns lifecycle when `channels.signal.autoStart=true`.

See [Signal](/channels/signal) for setup and endpoints.

## Pattern B: stdio child process (legacy: imsg)

> **Note:** For new iMessage setups, use [BlueBubbles](/channels/bluebubbles) instead.

* OpenClaw spawns `imsg rpc` as a child process (legacy iMessage integration).
* JSON-RPC is line-delimited over stdin/stdout (one JSON object per line).
* No TCP port, no daemon required.

Core methods used:

* `watch.subscribe` → notifications (`method: "message"`)
* `watch.unsubscribe`
* `send`
* `chats.list` (probe/diagnostics)

See [iMessage](/channels/imessage) for legacy setup and addressing (`chat_id` preferred).

## Adapter guidelines

* Gateway owns the process (start/stop tied to provider lifecycle).
* Keep RPC clients resilient: timeouts, restart on exit.
* Prefer stable IDs (e.g., `chat_id`) over display strings.


Built with [Mintlify](https://mintlify.com).
