<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/nodes.md; fetched_at=2026-04-04T20:36:06.114Z; sha256=6130a1ac220de03a157b523b169782ecee4e2460236e022e3e372ad288aed1d9; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# nodes

# `openclaw nodes`

Manage paired nodes (devices) and invoke node capabilities.

Related:

* Nodes overview: [Nodes](/nodes)
* Camera: [Camera nodes](/nodes/camera)
* Images: [Image nodes](/nodes/images)

Common options:

* `--url`, `--token`, `--timeout`, `--json`

## Common commands

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw nodes list
openclaw nodes list --connected
openclaw nodes list --last-connected 24h
openclaw nodes pending
openclaw nodes approve <requestId>
openclaw nodes reject <requestId>
openclaw nodes rename --node <id|name|ip> --name <displayName>
openclaw nodes status
openclaw nodes status --connected
openclaw nodes status --last-connected 24h
```

`nodes list` prints pending/paired tables. Paired rows include the most recent connect age (Last Connect).
Use `--connected` to only show currently-connected nodes. Use `--last-connected <duration>` to
filter to nodes that connected within a duration (e.g. `24h`, `7d`).

Approval note:

* `openclaw nodes pending` only needs pairing scope.
* `openclaw nodes approve <requestId>` inherits extra scope requirements from the
  pending request:
  * commandless request: pairing only
  * non-exec node commands: pairing + write
  * `system.run` / `system.run.prepare` / `system.which`: pairing + admin

## Invoke

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw nodes invoke --node <id|name|ip> --command <command> --params <json>
```

Invoke flags:

* `--params <json>`: JSON object string (default `{}`).
* `--invoke-timeout <ms>`: node invoke timeout (default `15000`).
* `--idempotency-key <key>`: optional idempotency key.
* `system.run` and `system.run.prepare` are blocked here; use the `exec` tool with `host=node` for shell execution.

For shell execution on a node, use the `exec` tool with `host=node` instead of `openclaw nodes run`.
The `nodes` CLI is now capability-focused: direct RPC via `nodes invoke`, plus pairing, camera,
screen, location, canvas, and notifications.


Built with [Mintlify](https://mintlify.com).
