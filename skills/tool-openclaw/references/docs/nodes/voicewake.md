<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/nodes/voicewake.md; fetched_at=2026-02-20T10:29:23.567Z; sha256=68ef8d01d29ea45fd170b878dc95bc6d21125300fc5965ff2e68e45c8c256dff; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Voice Wake

# Voice Wake (Global Wake Words)

OpenClaw treats **wake words as a single global list** owned by the **Gateway**.

* There are **no per-node custom wake words**.
* **Any node/app UI may edit** the list; changes are persisted by the Gateway and broadcast to everyone.
* Each device still keeps its own **Voice Wake enabled/disabled** toggle (local UX + permissions differ).

## Storage (Gateway host)

Wake words are stored on the gateway machine at:

* `~/.openclaw/settings/voicewake.json`

Shape:

```json  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{ "triggers": ["openclaw", "claude", "computer"], "updatedAtMs": 1730000000000 }
```

## Protocol

### Methods

* `voicewake.get` → `{ triggers: string[] }`
* `voicewake.set` with params `{ triggers: string[] }` → `{ triggers: string[] }`

Notes:

* Triggers are normalized (trimmed, empties dropped). Empty lists fall back to defaults.
* Limits are enforced for safety (count/length caps).

### Events

* `voicewake.changed` payload `{ triggers: string[] }`

Who receives it:

* All WebSocket clients (macOS app, WebChat, etc.)
* All connected nodes (iOS/Android), and also on node connect as an initial “current state” push.

## Client behavior

### macOS app

* Uses the global list to gate `VoiceWakeRuntime` triggers.
* Editing “Trigger words” in Voice Wake settings calls `voicewake.set` and then relies on the broadcast to keep other clients in sync.

### iOS node

* Uses the global list for `VoiceWakeManager` trigger detection.
* Editing Wake Words in Settings calls `voicewake.set` (over the Gateway WS) and also keeps local wake-word detection responsive.

### Android node

* Exposes a Wake Words editor in Settings.
* Calls `voicewake.set` over the Gateway WS so edits sync everywhere.
