<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/browser.md; fetched_at=2026-02-20T10:29:14.658Z; sha256=88555082b924164a59e7cf54a3bf9e124b1ce76ab448543f4d7327650fd0cc5b; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# browser

# `openclaw browser`

Manage OpenClaw’s browser control server and run browser actions (tabs, snapshots, screenshots, navigation, clicks, typing).

Related:

* Browser tool + API: [Browser tool](/tools/browser)
* Chrome extension relay: [Chrome extension](/tools/chrome-extension)

## Common flags

* `--url <gatewayWsUrl>`: Gateway WebSocket URL (defaults to config).
* `--token <token>`: Gateway token (if required).
* `--timeout <ms>`: request timeout (ms).
* `--browser-profile <name>`: choose a browser profile (default from config).
* `--json`: machine-readable output (where supported).

## Quick start (local)

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw browser --browser-profile chrome tabs
openclaw browser --browser-profile openclaw start
openclaw browser --browser-profile openclaw open https://example.com
openclaw browser --browser-profile openclaw snapshot
```

## Profiles

Profiles are named browser routing configs. In practice:

* `openclaw`: launches/attaches to a dedicated OpenClaw-managed Chrome instance (isolated user data dir).
* `chrome`: controls your existing Chrome tab(s) via the Chrome extension relay.

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw browser profiles
openclaw browser create-profile --name work --color "#FF5A36"
openclaw browser delete-profile --name work
```

Use a specific profile:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw browser --browser-profile work tabs
```

## Tabs

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw browser tabs
openclaw browser open https://docs.openclaw.ai
openclaw browser focus <targetId>
openclaw browser close <targetId>
```

## Snapshot / screenshot / actions

Snapshot:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw browser snapshot
```

Screenshot:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw browser screenshot
```

Navigate/click/type (ref-based UI automation):

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw browser navigate https://example.com
openclaw browser click <ref>
openclaw browser type <ref> "hello"
```

## Chrome extension relay (attach via toolbar button)

This mode lets the agent control an existing Chrome tab that you attach manually (it does not auto-attach).

Install the unpacked extension to a stable path:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw browser extension install
openclaw browser extension path
```

Then Chrome → `chrome://extensions` → enable “Developer mode” → “Load unpacked” → select the printed folder.

Full guide: [Chrome extension](/tools/chrome-extension)

## Remote browser control (node host proxy)

If the Gateway runs on a different machine than the browser, run a **node host** on the machine that has Chrome/Brave/Edge/Chromium. The Gateway will proxy browser actions to that node (no separate browser control server required).

Use `gateway.nodes.browser.mode` to control auto-routing and `gateway.nodes.browser.node` to pin a specific node if multiple are connected.

Security + remote setup: [Browser tool](/tools/browser), [Remote access](/gateway/remote), [Tailscale](/gateway/tailscale), [Security](/gateway/security)
