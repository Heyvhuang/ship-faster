<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/system.md; fetched_at=2026-02-20T10:29:16.500Z; sha256=8ec29c9cc1f004c06f1b9c70e11702f2938a36ee00e943120bd5a4afc82e3669; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# system

# `openclaw system`

System-level helpers for the Gateway: enqueue system events, control heartbeats,
and view presence.

## Common commands

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw system event --text "Check for urgent follow-ups" --mode now
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

## `system heartbeat last|enable|disable`

Heartbeat controls:

* `last`: show the last heartbeat event.
* `enable`: turn heartbeats back on (use this if they were disabled).
* `disable`: pause heartbeats.

Flags:

* `--json`: machine-readable output.

## `system presence`

List the current system presence entries the Gateway knows about (nodes,
instances, and similar status lines).

Flags:

* `--json`: machine-readable output.

## Notes

* Requires a running Gateway reachable by your current config (local or remote).
* System events are ephemeral and not persisted across restarts.
