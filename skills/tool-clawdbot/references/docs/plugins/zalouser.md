> ## Documentation Index
> Fetch the complete documentation index at: https://docs.clawd.bot/llms.txt
> Use this file to discover all available pages before exploring further.

# null

# Zalo Personal (plugin)

Zalo Personal support for Clawdbot via a plugin, using `zca-cli` to automate a normal Zalo user account.

> **Warning:** Unofficial automation may lead to account suspension/ban. Use at your own risk.

## Naming

Channel id is `zalouser` to make it explicit this automates a **personal Zalo user account** (unofficial). We keep `zalo` reserved for a potential future official Zalo API integration.

## Where it runs

This plugin runs **inside the Gateway process**.

If you use a remote Gateway, install/configure it on the **machine running the Gateway**, then restart the Gateway.

## Install

### Option A: install from npm

```bash  theme={null}
clawdbot plugins install @clawdbot/zalouser
```

Restart the Gateway afterwards.

### Option B: install from a local folder (dev)

```bash  theme={null}
clawdbot plugins install ./extensions/zalouser
cd ./extensions/zalouser && pnpm install
```

Restart the Gateway afterwards.

## Prerequisite: zca-cli

The Gateway machine must have `zca` on `PATH`:

```bash  theme={null}
zca --version
```

## Config

Channel config lives under `channels.zalouser` (not `plugins.entries.*`):

```json5  theme={null}
{
  channels: {
    zalouser: {
      enabled: true,
      dmPolicy: "pairing"
    }
  }
}
```

## CLI

```bash  theme={null}
clawdbot channels login --channel zalouser
clawdbot channels logout --channel zalouser
clawdbot channels status --probe
clawdbot message send --channel zalouser --target <threadId> --message "Hello from Clawdbot"
clawdbot directory peers list --channel zalouser --query "name"
```

## Agent tool

Tool name: `zalouser`

Actions: `send`, `image`, `link`, `friends`, `groups`, `me`, `status`
