<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/nodes/voicewake.md; fetched_at=2026-04-04T20:36:07.155Z; sha256=a6570d724c9deb4870cabe36097e8f888ac9a613d7b3ebbcd77ccb0ca2ce5a8f; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Voice Wake

# Voice Wake (Global Wake Words)

OpenClaw treats **wake words as a single global list** owned by the **Gateway**.

* There are **no per-node custom wake words**.
* **Any node/app UI may edit** the list; changes are persisted by the Gateway and broadcast to everyone.
* macOS and iOS keep local **Voice Wake enabled/disabled** toggles (local UX + permissions differ).
* Android currently keeps Voice Wake off and uses a manual mic flow in the Voice tab.

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

* Voice Wake is currently disabled in Android runtime/Settings.
* Android voice uses manual mic capture in the Voice tab instead of wake-word triggers.


Built with [Mintlify](https://mintlify.com).
