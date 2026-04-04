<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/platforms/mac/webchat.md; fetched_at=2026-04-04T20:36:07.311Z; sha256=80ce10e8e70b9d509f37e76e3c94e474f3915c386cebb770251883fd421f21a1; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# WebChat (macOS)

# WebChat (macOS app)

The macOS menu bar app embeds the WebChat UI as a native SwiftUI view. It
connects to the Gateway and defaults to the **main session** for the selected
agent (with a session switcher for other sessions).

* **Local mode**: connects directly to the local Gateway WebSocket.
* **Remote mode**: forwards the Gateway control port over SSH and uses that
  tunnel as the data plane.

## Launch & debugging

* Manual: Lobster menu → “Open Chat”.

* Auto‑open for testing:

  ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
  dist/OpenClaw.app/Contents/MacOS/OpenClaw --webchat
  ```

* Logs: `./scripts/clawlog.sh` (subsystem `ai.openclaw`, category `WebChatSwiftUI`).

## How it is wired

* Data plane: Gateway WS methods `chat.history`, `chat.send`, `chat.abort`,
  `chat.inject` and events `chat`, `agent`, `presence`, `tick`, `health`.
* `chat.history` returns display-normalized transcript rows: inline directive
  tags are stripped from visible text, pure `NO_REPLY` assistant rows are
  omitted, and oversized rows can be replaced with placeholders.
* Session: defaults to the primary session (`main`, or `global` when scope is
  global). The UI can switch between sessions.
* Onboarding uses a dedicated session to keep first‑run setup separate.

## Security surface

* Remote mode forwards only the Gateway WebSocket control port over SSH.

## Known limitations

* The UI is optimized for chat sessions (not a full browser sandbox).


Built with [Mintlify](https://mintlify.com).
