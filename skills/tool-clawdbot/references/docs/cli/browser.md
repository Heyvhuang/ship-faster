> ## Documentation Index
> Fetch the complete documentation index at: https://docs.clawd.bot/llms.txt
> Use this file to discover all available pages before exploring further.

# null

# `clawdbot browser`

Manage Clawdbot’s browser control server and run browser actions (tabs, snapshots, screenshots, navigation, clicks, typing).

Related:

* Browser tool + API: [Browser tool](/tools/browser)
* Chrome extension relay: [Chrome extension](/tools/chrome-extension)

## Common flags

* `--url <controlUrl>`: override `browser.controlUrl` for this command invocation.
* `--browser-profile <name>`: choose a browser profile (default comes from config).
* `--json`: machine-readable output (where supported).

## Quick start (local)

```bash  theme={null}
clawdbot browser --browser-profile chrome tabs
clawdbot browser --browser-profile clawd start
clawdbot browser --browser-profile clawd open https://example.com
clawdbot browser --browser-profile clawd snapshot
```

## Profiles

Profiles are named browser routing configs. In practice:

* `clawd`: launches/attaches to a dedicated Clawdbot-managed Chrome instance (isolated user data dir).
* `chrome`: controls your existing Chrome tab(s) via the Chrome extension relay.

```bash  theme={null}
clawdbot browser profiles
clawdbot browser create-profile --name work --color "#FF5A36"
clawdbot browser delete-profile --name work
```

Use a specific profile:

```bash  theme={null}
clawdbot browser --browser-profile work tabs
```

## Tabs

```bash  theme={null}
clawdbot browser tabs
clawdbot browser open https://docs.clawd.bot
clawdbot browser focus <targetId>
clawdbot browser close <targetId>
```

## Snapshot / screenshot / actions

Snapshot:

```bash  theme={null}
clawdbot browser snapshot
```

Screenshot:

```bash  theme={null}
clawdbot browser screenshot
```

Navigate/click/type (ref-based UI automation):

```bash  theme={null}
clawdbot browser navigate https://example.com
clawdbot browser click <ref>
clawdbot browser type <ref> "hello"
```

## Chrome extension relay (attach via toolbar button)

This mode lets the agent control an existing Chrome tab that you attach manually (it does not auto-attach).

Install the unpacked extension to a stable path:

```bash  theme={null}
clawdbot browser extension install
clawdbot browser extension path
```

Then Chrome → `chrome://extensions` → enable “Developer mode” → “Load unpacked” → select the printed folder.

Full guide: [Chrome extension](/tools/chrome-extension)

## Remote browser control (`clawdbot browser serve`)

If the Gateway runs on a different machine than the browser, run a standalone browser control server on the machine that runs Chrome:

```bash  theme={null}
clawdbot browser serve --bind 127.0.0.1 --port 18791 --token <token>
```

Then point the Gateway at it using `browser.controlUrl` + `browser.controlToken` (or `CLAWDBOT_BROWSER_CONTROL_TOKEN`).

Security + TLS best-practices: [Browser tool](/tools/browser), [Tailscale](/gateway/tailscale), [Security](/gateway/security)
