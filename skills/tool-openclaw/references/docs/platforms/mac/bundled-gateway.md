<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/platforms/mac/bundled-gateway.md; fetched_at=2026-04-04T20:36:07.202Z; sha256=05c96a4966ab5a6cd4a30ed8bfdfe4aa0afc52cd5df9b5d2f08651572ff271b2; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Gateway on macOS

# Gateway on macOS (external launchd)

OpenClaw\.app no longer bundles Node/Bun or the Gateway runtime. The macOS app
expects an **external** `openclaw` CLI install, does not spawn the Gateway as a
child process, and manages a per‑user launchd service to keep the Gateway
running (or attaches to an existing local Gateway if one is already running).

## Install the CLI (required for local mode)

Node 24 is the default runtime on the Mac. Node 22 LTS, currently `22.14+`, still works for compatibility. Then install `openclaw` globally:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
npm install -g openclaw@<version>
```

The macOS app’s **Install CLI** button runs the same global install flow the app
uses internally: it prefers npm first, then pnpm, then bun if that is the only
detected package manager. Node remains the recommended Gateway runtime.

## Launchd (Gateway as LaunchAgent)

Label:

* `ai.openclaw.gateway` (or `ai.openclaw.<profile>`; legacy `com.openclaw.*` may remain)

Plist location (per‑user):

* `~/Library/LaunchAgents/ai.openclaw.gateway.plist`
  (or `~/Library/LaunchAgents/ai.openclaw.<profile>.plist`)

Manager:

* The macOS app owns LaunchAgent install/update in Local mode.
* The CLI can also install it: `openclaw gateway install`.

Behavior:

* “OpenClaw Active” enables/disables the LaunchAgent.
* App quit does **not** stop the gateway (launchd keeps it alive).
* If a Gateway is already running on the configured port, the app attaches to
  it instead of starting a new one.

Logging:

* launchd stdout/err: `/tmp/openclaw/openclaw-gateway.log`

## Version compatibility

The macOS app checks the gateway version against its own version. If they’re
incompatible, update the global CLI to match the app version.

## Smoke check

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw --version

OPENCLAW_SKIP_CHANNELS=1 \
OPENCLAW_SKIP_CANVAS_HOST=1 \
openclaw gateway --port 18999 --bind loopback
```

Then:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw gateway call health --url ws://127.0.0.1:18999 --timeout 3000
```


Built with [Mintlify](https://mintlify.com).
