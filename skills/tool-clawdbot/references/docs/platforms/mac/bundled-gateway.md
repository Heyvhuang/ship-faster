> ## Documentation Index
> Fetch the complete documentation index at: https://docs.clawd.bot/llms.txt
> Use this file to discover all available pages before exploring further.

# null

# Gateway on macOS (external launchd)

Clawdbot.app no longer bundles Node/Bun or the Gateway runtime. The macOS app
expects an **external** `clawdbot` CLI install, does not spawn the Gateway as a
child process, and manages a per‑user launchd service to keep the Gateway
running (or attaches to an existing local Gateway if one is already running).

## Install the CLI (required for local mode)

You need Node 22+ on the Mac, then install `clawdbot` globally:

```bash  theme={null}
npm install -g clawdbot@<version>
```

The macOS app’s **Install CLI** button runs the same flow via npm/pnpm (bun not recommended for Gateway runtime).

## Launchd (Gateway as LaunchAgent)

Label:

* `com.clawdbot.gateway` (or `com.clawdbot.<profile>`)

Plist location (per‑user):

* `~/Library/LaunchAgents/com.clawdbot.gateway.plist`
  (or `~/Library/LaunchAgents/com.clawdbot.<profile>.plist`)

Manager:

* The macOS app owns LaunchAgent install/update in Local mode.
* The CLI can also install it: `clawdbot gateway install`.

Behavior:

* “Clawdbot Active” enables/disables the LaunchAgent.
* App quit does **not** stop the gateway (launchd keeps it alive).
* If a Gateway is already running on the configured port, the app attaches to
  it instead of starting a new one.

Logging:

* launchd stdout/err: `/tmp/clawdbot/clawdbot-gateway.log`

## Version compatibility

The macOS app checks the gateway version against its own version. If they’re
incompatible, update the global CLI to match the app version.

## Smoke check

```bash  theme={null}
clawdbot --version

CLAWDBOT_SKIP_CHANNELS=1 \
CLAWDBOT_SKIP_CANVAS_HOST=1 \
clawdbot gateway --port 18999 --bind loopback
```

Then:

```bash  theme={null}
clawdbot gateway call health --url ws://127.0.0.1:18999 --timeout 3000
```
