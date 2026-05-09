<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/gateway/gateway-lock.md; fetched_at=2026-04-04T20:36:06.506Z; sha256=ec0bb3437aeb3970006dfe677bab58bd6dcda9e22960dc5fa5f9ec6d837080bf; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Gateway Lock

# Gateway lock

## Why

* Ensure only one gateway instance runs per base port on the same host; additional gateways must use isolated profiles and unique ports.
* Survive crashes/SIGKILL without leaving stale lock files.
* Fail fast with a clear error when the control port is already occupied.

## Mechanism

* The gateway binds the WebSocket listener (default `ws://127.0.0.1:18789`) immediately on startup using an exclusive TCP listener.
* If the bind fails with `EADDRINUSE`, startup throws `GatewayLockError("another gateway instance is already listening on ws://127.0.0.1:<port>")`.
* The OS releases the listener automatically on any process exit, including crashes and SIGKILL—no separate lock file or cleanup step is needed.
* On shutdown the gateway closes the WebSocket server and underlying HTTP server to free the port promptly.

## Error surface

* If another process holds the port, startup throws `GatewayLockError("another gateway instance is already listening on ws://127.0.0.1:<port>")`.
* Other bind failures surface as `GatewayLockError("failed to bind gateway socket on ws://127.0.0.1:<port>: …")`.

## Operational notes

* If the port is occupied by *another* process, the error is the same; free the port or choose another with `openclaw gateway --port <port>`.
* The macOS app still maintains its own lightweight PID guard before spawning the gateway; the runtime lock is enforced by the WebSocket bind.

## Related

* [Multiple Gateways](/gateway/multiple-gateways) — running multiple instances with unique ports
* [Troubleshooting](/gateway/troubleshooting) — diagnosing `EADDRINUSE` and port conflicts


Built with [Mintlify](https://mintlify.com).
