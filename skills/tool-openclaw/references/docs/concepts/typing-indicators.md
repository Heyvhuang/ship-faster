<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/concepts/typing-indicators.md; fetched_at=2026-04-04T20:36:06.401Z; sha256=26a323e9644747e5b682b24728b490e93e61e7dd9b42f079435820796d17b024; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Typing Indicators

# Typing indicators

Typing indicators are sent to the chat channel while a run is active. Use
`agents.defaults.typingMode` to control **when** typing starts and `typingIntervalSeconds`
to control **how often** it refreshes.

## Defaults

When `agents.defaults.typingMode` is **unset**, OpenClaw keeps the legacy behavior:

* **Direct chats**: typing starts immediately once the model loop begins.
* **Group chats with a mention**: typing starts immediately.
* **Group chats without a mention**: typing starts only when message text begins streaming.
* **Heartbeat runs**: typing is disabled.

## Modes

Set `agents.defaults.typingMode` to one of:

* `never` — no typing indicator, ever.
* `instant` — start typing **as soon as the model loop begins**, even if the run
  later returns only the silent reply token.
* `thinking` — start typing on the **first reasoning delta** (requires
  `reasoningLevel: "stream"` for the run).
* `message` — start typing on the **first non-silent text delta** (ignores
  the `NO_REPLY` silent token).

Order of “how early it fires”:
`never` → `message` → `thinking` → `instant`

## Configuration

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  agent: {
    typingMode: "thinking",
    typingIntervalSeconds: 6,
  },
}
```

You can override mode or cadence per session:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  session: {
    typingMode: "message",
    typingIntervalSeconds: 4,
  },
}
```

## Notes

* `message` mode won’t show typing for silent-only replies (for example
  `NO_REPLY` / `no_reply`, which are treated case-insensitively for exact
  silent-token suppression).
* `thinking` only fires if the run streams reasoning (`reasoningLevel: "stream"`).
  If the model doesn’t emit reasoning deltas, typing won’t start.
* Heartbeats never show typing, regardless of mode.
* `typingIntervalSeconds` controls the **refresh cadence**, not the start time.
  The default is 6 seconds.


Built with [Mintlify](https://mintlify.com).
