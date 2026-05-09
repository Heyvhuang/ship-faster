<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/system.md; fetched_at=2026-04-04T20:36:06.018Z; sha256=7647453456f5b5fad59b49bcc0c91fc333fe258891fb059bfb8be2a6eb955747; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# system

# `openclaw system`

System-level helpers for the Gateway: enqueue system events, control heartbeats,
and view presence.

All `system` subcommands use Gateway RPC and accept the shared client flags:

* `--url <url>`
* `--token <token>`
* `--timeout <ms>`
* `--expect-final`

## Common commands

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw system event --text "Check for urgent follow-ups" --mode now
openclaw system event --text "Check for urgent follow-ups" --url ws://127.0.0.1:18789 --token "$OPENCLAW_GATEWAY_TOKEN"
openclaw system heartbeat enable
openclaw system heartbeat last
openclaw system presence
```

## `system event`

Enqueue a system event on the **main** session. The next heartbeat will inject
it as a `System:` line in the prompt. Use `--mode now` to trigger the heartbeat
immediately; `next-heartbeat` waits for the next scheduled tick.

Flags:

* `--text <text>`: required system event text.
* `--mode <mode>`: `now` or `next-heartbeat` (default).
* `--json`: machine-readable output.
* `--url`, `--token`, `--timeout`, `--expect-final`: shared Gateway RPC flags.

## `system heartbeat last|enable|disable`

Heartbeat controls:

* `last`: show the last heartbeat event.
* `enable`: turn heartbeats back on (use this if they were disabled).
* `disable`: pause heartbeats.

Flags:

* `--json`: machine-readable output.
* `--url`, `--token`, `--timeout`, `--expect-final`: shared Gateway RPC flags.

## `system presence`

List the current system presence entries the Gateway knows about (nodes,
instances, and similar status lines).

Flags:

* `--json`: machine-readable output.
* `--url`, `--token`, `--timeout`, `--expect-final`: shared Gateway RPC flags.

## Notes

* Requires a running Gateway reachable by your current config (local or remote).
* System events are ephemeral and not persisted across restarts.


Built with [Mintlify](https://mintlify.com).
