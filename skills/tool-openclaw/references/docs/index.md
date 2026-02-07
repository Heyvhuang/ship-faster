> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenClaw

# OpenClaw 🦞

<p align="center">
  <img src="https://mintcdn.com/clawdhub/-t5HSeZ3Y_0_wH4i/assets/openclaw-logo-text-dark.png?fit=max&auto=format&n=-t5HSeZ3Y_0_wH4i&q=85&s=61797dcb0c37d6e9279b8c5ad2e850e4" alt="OpenClaw" width="500" class="dark:hidden" data-og-width="1769" data-og-height="363" data-path="assets/openclaw-logo-text-dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/clawdhub/-t5HSeZ3Y_0_wH4i/assets/openclaw-logo-text-dark.png?w=280&fit=max&auto=format&n=-t5HSeZ3Y_0_wH4i&q=85&s=4eb00205aad113b07614ce563373ca26 280w, https://mintcdn.com/clawdhub/-t5HSeZ3Y_0_wH4i/assets/openclaw-logo-text-dark.png?w=560&fit=max&auto=format&n=-t5HSeZ3Y_0_wH4i&q=85&s=d6b49e9c26ed303f84284140a482668d 560w, https://mintcdn.com/clawdhub/-t5HSeZ3Y_0_wH4i/assets/openclaw-logo-text-dark.png?w=840&fit=max&auto=format&n=-t5HSeZ3Y_0_wH4i&q=85&s=4d955541c50de4d43b761423a1f61e21 840w, https://mintcdn.com/clawdhub/-t5HSeZ3Y_0_wH4i/assets/openclaw-logo-text-dark.png?w=1100&fit=max&auto=format&n=-t5HSeZ3Y_0_wH4i&q=85&s=ed926636a9752c9ce39acccf51c3b271 1100w, https://mintcdn.com/clawdhub/-t5HSeZ3Y_0_wH4i/assets/openclaw-logo-text-dark.png?w=1650&fit=max&auto=format&n=-t5HSeZ3Y_0_wH4i&q=85&s=6eaae3d9d226837a0c97999308cc5774 1650w, https://mintcdn.com/clawdhub/-t5HSeZ3Y_0_wH4i/assets/openclaw-logo-text-dark.png?w=2500&fit=max&auto=format&n=-t5HSeZ3Y_0_wH4i&q=85&s=e7b1ad00141bc8497bee7df9e46ccebd 2500w" />

  <img src="https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/assets/openclaw-logo-text.png?fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=d799bea41acb92d4c9fd1075c575879f" alt="OpenClaw" width="500" class="hidden dark:block" data-og-width="1768" data-og-height="363" data-path="assets/openclaw-logo-text.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/assets/openclaw-logo-text.png?w=280&fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=d6a02fefee0fcacc5f045ee1016cd213 280w, https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/assets/openclaw-logo-text.png?w=560&fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=b0c99fbfcae302b7e6796ae59e3b7b80 560w, https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/assets/openclaw-logo-text.png?w=840&fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=6597187be4a207f22fcb94502b0b78be 840w, https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/assets/openclaw-logo-text.png?w=1100&fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=88255cdd2554a6b341c89ae709743441 1100w, https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/assets/openclaw-logo-text.png?w=1650&fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=e82a8bd9b834bec4f6e97303deb1735b 1650w, https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/assets/openclaw-logo-text.png?w=2500&fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=23160e4a3cd4676702869ea051fd3f6e 2500w" />
</p>

> *"EXFOLIATE! EXFOLIATE!"* — A space lobster, probably

<p align="center">
  <strong>Any OS gateway for AI agents across WhatsApp, Telegram, Discord, iMessage, and more.</strong><br />
  Send a message, get an agent response from your pocket. Plugins add Mattermost and more.
</p>

<Columns>
  <Card title="Get Started" href="/start/getting-started" icon="rocket">
    Install OpenClaw and bring up the Gateway in minutes.
  </Card>

  <Card title="Run the Wizard" href="/start/wizard" icon="sparkles">
    Guided setup with `openclaw onboard` and pairing flows.
  </Card>

  <Card title="Open the Control UI" href="/web/control-ui" icon="layout-dashboard">
    Launch the browser dashboard for chat, config, and sessions.
  </Card>
</Columns>

OpenClaw connects chat apps to coding agents like Pi through a single Gateway process. It powers the OpenClaw assistant and supports local or remote setups.

## How it works

```mermaid  theme={null}
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
    WhatsApp, Telegram, Discord, and iMessage with a single Gateway process.
  </Card>

  <Card title="Plugin channels" icon="plug">
    Add Mattermost and more with extension packages.
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
    Pair iOS and Android nodes with Canvas support.
  </Card>
</Columns>

## Quick start

<Steps>
  <Step title="Install OpenClaw">
    ```bash  theme={null}
    npm install -g openclaw@latest
    ```
  </Step>

  <Step title="Onboard and install the service">
    ```bash  theme={null}
    openclaw onboard --install-daemon
    ```
  </Step>

  <Step title="Pair WhatsApp and start the Gateway">
    ```bash  theme={null}
    openclaw channels login
    openclaw gateway --port 18789
    ```
  </Step>
</Steps>

Need the full install and dev setup? See [Quick start](/start/quickstart).

## Dashboard

Open the browser Control UI after the Gateway starts.

* Local default: [http://127.0.0.1:18789/](http://127.0.0.1:18789/)
* Remote access: [Web surfaces](/web) and [Tailscale](/gateway/tailscale)

<p align="center">
  <img src="https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/whatsapp-openclaw.jpg?fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=b74a3630b0e971f466eff15fbdc642cb" alt="OpenClaw" width="420" data-og-width="471" data-og-height="1024" data-path="whatsapp-openclaw.jpg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/whatsapp-openclaw.jpg?w=280&fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=9529de32661772cb6e807012bd61af05 280w, https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/whatsapp-openclaw.jpg?w=560&fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=c56c7120994a5221cc257ca747e90e59 560w, https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/whatsapp-openclaw.jpg?w=840&fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=410f1066863dfec4e31274aebefe7de1 840w, https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/whatsapp-openclaw.jpg?w=1100&fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=72f5064ba581433011975bde37c74964 1100w, https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/whatsapp-openclaw.jpg?w=1650&fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=e07acd64b4f5b86bf7468cf5719883ef 1650w, https://mintcdn.com/clawdhub/FaXdIfo7gPK_jSWb/whatsapp-openclaw.jpg?w=2500&fit=max&auto=format&n=FaXdIfo7gPK_jSWb&q=85&s=7050f3dda374e9a1adedf3cd08357338 2500w" />
</p>

## Configuration (optional)

Config lives at `~/.openclaw/openclaw.json`.

* If you **do nothing**, OpenClaw uses the bundled Pi binary in RPC mode with per-sender sessions.
* If you want to lock it down, start with `channels.whatsapp.allowFrom` and (for groups) mention rules.

Example:

```json5  theme={null}
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
    Channel-specific setup for WhatsApp, Telegram, Discord, and more.
  </Card>

  <Card title="Nodes" href="/nodes" icon="smartphone">
    iOS and Android nodes with pairing and Canvas.
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
