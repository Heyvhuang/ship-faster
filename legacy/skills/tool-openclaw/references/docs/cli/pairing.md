<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/pairing.md; fetched_at=2026-04-04T20:36:05.936Z; sha256=229eeff02ebaff515c326a0570cc470247e3cd0a93644b79c647bd1bd204d9c3; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# pairing

# `openclaw pairing`

Approve or inspect DM pairing requests (for channels that support pairing).

Related:

* Pairing flow: [Pairing](/channels/pairing)

## Commands

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw pairing list telegram
openclaw pairing list --channel telegram --account work
openclaw pairing list telegram --json

openclaw pairing approve <code>
openclaw pairing approve telegram <code>
openclaw pairing approve --channel telegram --account work <code> --notify
```

## `pairing list`

List pending pairing requests for one channel.

Options:

* `[channel]`: positional channel id
* `--channel <channel>`: explicit channel id
* `--account <accountId>`: account id for multi-account channels
* `--json`: machine-readable output

Notes:

* If multiple pairing-capable channels are configured, you must provide a channel either positionally or with `--channel`.
* Extension channels are allowed as long as the channel id is valid.

## `pairing approve`

Approve a pending pairing code and allow that sender.

Usage:

* `openclaw pairing approve <channel> <code>`
* `openclaw pairing approve --channel <channel> <code>`
* `openclaw pairing approve <code>` when exactly one pairing-capable channel is configured

Options:

* `--channel <channel>`: explicit channel id
* `--account <accountId>`: account id for multi-account channels
* `--notify`: send a confirmation back to the requester on the same channel

## Notes

* Channel input: pass it positionally (`pairing list telegram`) or with `--channel <channel>`.
* `pairing list` supports `--account <accountId>` for multi-account channels.
* `pairing approve` supports `--account <accountId>` and `--notify`.
* If only one pairing-capable channel is configured, `pairing approve <code>` is allowed.


Built with [Mintlify](https://mintlify.com).
