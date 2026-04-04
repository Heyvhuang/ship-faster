<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/start/getting-started.md; fetched_at=2026-04-04T20:36:08.020Z; sha256=cb927de45d353de2279de9c0784738d8f6b8940c47c0bf92d101e4bd0da64b39; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Getting Started

# Getting Started

Install OpenClaw, run onboarding, and chat with your AI assistant — all in
about 5 minutes. By the end you will have a running Gateway, configured auth,
and a working chat session.

## What you need

* **Node.js** — Node 24 recommended (Node 22.14+ also supported)
* **An API key** from a model provider (Anthropic, OpenAI, Google, etc.) — onboarding will prompt you

<Tip>
  Check your Node version with `node --version`.
  **Windows users:** both native Windows and WSL2 are supported. WSL2 is more
  stable and recommended for the full experience. See [Windows](/platforms/windows).
  Need to install Node? See [Node setup](/install/node).
</Tip>

## Quick setup

<Steps>
  <Step title="Install OpenClaw">
    <Tabs>
      <Tab title="macOS / Linux">
        ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
        curl -fsSL https://openclaw.ai/install.sh | bash
        ```

        <img src="https://mintcdn.com/clawdhub/U8jr7qEbUc9OU9YR/assets/install-script.svg?fit=max&auto=format&n=U8jr7qEbUc9OU9YR&q=85&s=50706f81e3210a610262f14facb11f65" alt="Install Script Process" className="rounded-lg" width="1370" height="581" data-path="assets/install-script.svg" />
      </Tab>

      <Tab title="Windows (PowerShell)">
        ```powershell  theme={"theme":{"light":"min-light","dark":"min-dark"}}
        iwr -useb https://openclaw.ai/install.ps1 | iex
        ```
      </Tab>
    </Tabs>

    <Note>
      Other install methods (Docker, Nix, npm): [Install](/install).
    </Note>
  </Step>

  <Step title="Run onboarding">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    openclaw onboard --install-daemon
    ```

    The wizard walks you through choosing a model provider, setting an API key,
    and configuring the Gateway. It takes about 2 minutes.

    See [Onboarding (CLI)](/start/wizard) for the full reference.
  </Step>

  <Step title="Verify the Gateway is running">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    openclaw gateway status
    ```

    You should see the Gateway listening on port 18789.
  </Step>

  <Step title="Open the dashboard">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    openclaw dashboard
    ```

    This opens the Control UI in your browser. If it loads, everything is working.
  </Step>

  <Step title="Send your first message">
    Type a message in the Control UI chat and you should get an AI reply.

    Want to chat from your phone instead? The fastest channel to set up is
    [Telegram](/channels/telegram) (just a bot token). See [Channels](/channels)
    for all options.
  </Step>
</Steps>

## What to do next

<Columns>
  <Card title="Connect a channel" href="/channels" icon="message-square">
    Discord, Feishu, iMessage, Matrix, Microsoft Teams, Signal, Slack, Telegram, WhatsApp, Zalo, and more.
  </Card>

  <Card title="Pairing and safety" href="/channels/pairing" icon="shield">
    Control who can message your agent.
  </Card>

  <Card title="Configure the Gateway" href="/gateway/configuration" icon="settings">
    Models, tools, sandbox, and advanced settings.
  </Card>

  <Card title="Browse tools" href="/tools" icon="wrench">
    Browser, exec, web search, skills, and plugins.
  </Card>
</Columns>

<Accordion title="Advanced: environment variables">
  If you run OpenClaw as a service account or want custom paths:

  * `OPENCLAW_HOME` — home directory for internal path resolution
  * `OPENCLAW_STATE_DIR` — override the state directory
  * `OPENCLAW_CONFIG_PATH` — override the config file path

  Full reference: [Environment variables](/help/environment).
</Accordion>


Built with [Mintlify](https://mintlify.com).
