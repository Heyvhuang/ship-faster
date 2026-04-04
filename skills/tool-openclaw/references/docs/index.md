<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/index.md; fetched_at=2026-04-04T20:36:06.772Z; sha256=c26d054e3a98e18e0ad7cac2f4fa0c48bd922f4f6e9f63eef7596a8848d5e0d8; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenClaw

# OpenClaw 🦞

<p align="center">
  <img src="https://mintcdn.com/clawdhub/-t5HSeZ3Y_0_wH4i/assets/openclaw-logo-text-dark.png?fit=max&auto=format&n=-t5HSeZ3Y_0_wH4i&q=85&s=61797dcb0c37d6e9279b8c5ad2e850e4" alt="OpenClaw" width="500" class="dark:hidden" data-path="assets/openclaw-logo-text-dark.png" />

  <img src="https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/assets/openclaw-logo-text.png?fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=d799bea41acb92d4c9fd1075c575879f" alt="OpenClaw" width="500" class="hidden dark:block" data-path="assets/openclaw-logo-text.png" />
</p>

> *"EXFOLIATE! EXFOLIATE!"* — A space lobster, probably

<p align="center">
  <strong>Any OS gateway for AI agents across Discord, Google Chat, iMessage, Matrix, Microsoft Teams, Signal, Slack, Telegram, WhatsApp, Zalo, and more.</strong><br />
  Send a message, get an agent response from your pocket. Run one Gateway across built-in channels, bundled channel plugins, WebChat, and mobile nodes.
</p>

<Columns>
  <Card title="Get Started" href="/start/getting-started" icon="rocket">
    Install OpenClaw and bring up the Gateway in minutes.
  </Card>

  <Card title="Run Onboarding" href="/start/wizard" icon="sparkles">
    Guided setup with `openclaw onboard` and pairing flows.
  </Card>

  <Card title="Open the Control UI" href="/web/control-ui" icon="layout-dashboard">
    Launch the browser dashboard for chat, config, and sessions.
  </Card>
</Columns>

## What is OpenClaw?

OpenClaw is a **self-hosted gateway** that connects your favorite chat apps and channel surfaces — built-in channels plus bundled or external channel plugins such as Discord, Google Chat, iMessage, Matrix, Microsoft Teams, Signal, Slack, Telegram, WhatsApp, Zalo, and more — to AI coding agents like Pi. You run a single Gateway process on your own machine (or a server), and it becomes the bridge between your messaging apps and an always-available AI assistant.

**Who is it for?** Developers and power users who want a personal AI assistant they can message from anywhere — without giving up control of their data or relying on a hosted service.

**What makes it different?**

* **Self-hosted**: runs on your hardware, your rules
* **Multi-channel**: one Gateway serves built-in channels plus bundled or external channel plugins simultaneously
* **Agent-native**: built for coding agents with tool use, sessions, memory, and multi-agent routing
* **Open source**: MIT licensed, community-driven

**What do you need?** Node 24 (recommended), or Node 22 LTS (`22.14+`) for compatibility, an API key from your chosen provider, and 5 minutes. For best quality and security, use the strongest latest-generation model available.

## How it works

```mermaid  theme={"theme":{"light":"min-light","dark":"min-dark"}}
flowchart LR
  A["Chat apps + plugins"] --> B["Gateway"]
  B --> C["Pi agent"]
  B --> D["CLI"]
  B --> E["Web Control UI"]
  B --> F["macOS app"]
  B --> G["iOS and Android nodes"]
```

The Gateway is the single source of truth for sessions, routing, and channel connections.

## Key capabilities

<Columns>
  <Card title="Multi-channel gateway" icon="network">
    Discord, iMessage, Signal, Slack, Telegram, WhatsApp, WebChat, and more with a single Gateway process.
  </Card>

  <Card title="Plugin channels" icon="plug">
    Bundled plugins add Matrix, Nostr, Twitch, Zalo, and more in normal current releases.
  </Card>

  <Card title="Multi-agent routing" icon="route">
    Isolated sessions per agent, workspace, or sender.
  </Card>

  <Card title="Media support" icon="image">
    Send and receive images, audio, and documents.
  </Card>

  <Card title="Web Control UI" icon="monitor">
    Browser dashboard for chat, config, sessions, and nodes.
  </Card>

  <Card title="Mobile nodes" icon="smartphone">
    Pair iOS and Android nodes for Canvas, camera, and voice-enabled workflows.
  </Card>
</Columns>

## Quick start

<Steps>
  <Step title="Install OpenClaw">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    npm install -g openclaw@latest
    ```
  </Step>

  <Step title="Onboard and install the service">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    openclaw onboard --install-daemon
    ```
  </Step>

  <Step title="Chat">
    Open the Control UI in your browser and send a message:

    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    openclaw dashboard
    ```

    Or connect a channel ([Telegram](/channels/telegram) is fastest) and chat from your phone.
  </Step>
</Steps>

Need the full install and dev setup? See [Getting Started](/start/getting-started).

## Dashboard

Open the browser Control UI after the Gateway starts.

* Local default: [http://127.0.0.1:18789/](http://127.0.0.1:18789/)
* Remote access: [Web surfaces](/web) and [Tailscale](/gateway/tailscale)

<p align="center">
  <img src="https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/whatsapp-openclaw.jpg?fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=b74a3630b0e971f466eff15fbdc642cb" alt="OpenClaw" width="420" data-path="whatsapp-openclaw.jpg" />
</p>

## Configuration (optional)

Config lives at `~/.openclaw/openclaw.json`.

* If you **do nothing**, OpenClaw uses the bundled Pi binary in RPC mode with per-sender sessions.
* If you want to lock it down, start with `channels.whatsapp.allowFrom` and (for groups) mention rules.

Example:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  channels: {
    whatsapp: {
      allowFrom: ["+15555550123"],
      groups: { "*": { requireMention: true } },
    },
  },
  messages: { groupChat: { mentionPatterns: ["@openclaw"] } },
}
```

## Start here

<Columns>
  <Card title="Docs hubs" href="/start/hubs" icon="book-open">
    All docs and guides, organized by use case.
  </Card>

  <Card title="Configuration" href="/gateway/configuration" icon="settings">
    Core Gateway settings, tokens, and provider config.
  </Card>

  <Card title="Remote access" href="/gateway/remote" icon="globe">
    SSH and tailnet access patterns.
  </Card>

  <Card title="Channels" href="/channels/telegram" icon="message-square">
    Channel-specific setup for Feishu, Microsoft Teams, WhatsApp, Telegram, Discord, and more.
  </Card>

  <Card title="Nodes" href="/nodes" icon="smartphone">
    iOS and Android nodes with pairing, Canvas, camera, and device actions.
  </Card>

  <Card title="Help" href="/help" icon="life-buoy">
    Common fixes and troubleshooting entry point.
  </Card>
</Columns>

## Learn more

<Columns>
  <Card title="Full feature list" href="/concepts/features" icon="list">
    Complete channel, routing, and media capabilities.
  </Card>

  <Card title="Multi-agent routing" href="/concepts/multi-agent" icon="route">
    Workspace isolation and per-agent sessions.
  </Card>

  <Card title="Security" href="/gateway/security" icon="shield">
    Tokens, allowlists, and safety controls.
  </Card>

  <Card title="Troubleshooting" href="/gateway/troubleshooting" icon="wrench">
    Gateway diagnostics and common errors.
  </Card>

  <Card title="About and credits" href="/reference/credits" icon="info">
    Project origins, contributors, and license.
  </Card>
</Columns>


Built with [Mintlify](https://mintlify.com).
