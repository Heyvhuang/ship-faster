<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/plugins/zalouser.md; fetched_at=2026-02-20T10:29:25.389Z; sha256=c4c95d4a863097e54d7d465987f3ca9079b3d902bd5351c08b8fdcaef7fb8baa; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Zalo Personal Plugin

# Zalo Personal (plugin)

Zalo Personal support for OpenClaw via a plugin, using `zca-cli` to automate a normal Zalo user account.

> **Warning:** Unofficial automation may lead to account suspension/ban. Use at your own risk.

## Naming

Channel id is `zalouser` to make it explicit this automates a **personal Zalo user account** (unofficial). We keep `zalo` reserved for a potential future official Zalo API integration.

## Where it runs

This plugin runs **inside the Gateway process**.

If you use a remote Gateway, install/configure it on the **machine running the Gateway**, then restart the Gateway.

## Install

### Option A: install from npm

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw plugins install @openclaw/zalouser
```

Restart the Gateway afterwards.

### Option B: install from a local folder (dev)

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw plugins install ./extensions/zalouser
cd ./extensions/zalouser && pnpm install
```

Restart the Gateway afterwards.

## Prerequisite: zca-cli

The Gateway machine must have `zca` on `PATH`:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
zca --version
```

## Config

Channel config lives under `channels.zalouser` (not `plugins.entries.*`):

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  channels: {
    zalouser: {
      enabled: true,
      dmPolicy: "pairing",
    },
  },
}
```

## CLI

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw channels login --channel zalouser
openclaw channels logout --channel zalouser
openclaw channels status --probe
openclaw message send --channel zalouser --target <threadId> --message "Hello from OpenClaw"
openclaw directory peers list --channel zalouser --query "name"
```

## Agent tool

Tool name: `zalouser`

Actions: `send`, `image`, `link`, `friends`, `groups`, `me`, `status`
