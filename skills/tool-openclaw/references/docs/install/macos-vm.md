<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/install/macos-vm.md; fetched_at=2026-02-20T10:29:22.794Z; sha256=8c7464256966b2fd684427af163207c667b28e20c96e027c13e833e21d33dc3e; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# macOS VMs

# OpenClaw on macOS VMs (Sandboxing)

## Recommended default (most users)

* **Small Linux VPS** for an always-on Gateway and low cost. See [VPS hosting](/vps).
* **Dedicated hardware** (Mac mini or Linux box) if you want full control and a **residential IP** for browser automation. Many sites block data center IPs, so local browsing often works better.
* **Hybrid:** keep the Gateway on a cheap VPS, and connect your Mac as a **node** when you need browser/UI automation. See [Nodes](/nodes) and [Gateway remote](/gateway/remote).

Use a macOS VM when you specifically need macOS-only capabilities (iMessage/BlueBubbles) or want strict isolation from your daily Mac.

## macOS VM options

### Local VM on your Apple Silicon Mac (Lume)

Run OpenClaw in a sandboxed macOS VM on your existing Apple Silicon Mac using [Lume](https://cua.ai/docs/lume).

This gives you:

* Full macOS environment in isolation (your host stays clean)
* iMessage support via BlueBubbles (impossible on Linux/Windows)
* Instant reset by cloning VMs
* No extra hardware or cloud costs

### Hosted Mac providers (cloud)

If you want macOS in the cloud, hosted Mac providers work too:

* [MacStadium](https://www.macstadium.com/) (hosted Macs)
* Other hosted Mac vendors also work; follow their VM + SSH docs

Once you have SSH access to a macOS VM, continue at step 6 below.

***

## Quick path (Lume, experienced users)

1. Install Lume
2. `lume create openclaw --os macos --ipsw latest`
3. Complete Setup Assistant, enable Remote Login (SSH)
4. `lume run openclaw --no-display`
5. SSH in, install OpenClaw, configure channels
6. Done

***

## What you need (Lume)

* Apple Silicon Mac (M1/M2/M3/M4)
* macOS Sequoia or later on the host
* \~60 GB free disk space per VM
* \~20 minutes

***

## 1) Install Lume

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/trycua/cua/main/libs/lume/scripts/install.sh)"
```

If `~/.local/bin` isn't in your PATH:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
echo 'export PATH="$PATH:$HOME/.local/bin"' >> ~/.zshrc && source ~/.zshrc
```

Verify:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
lume --version
```

Docs: [Lume Installation](https://cua.ai/docs/lume/guide/getting-started/installation)

***

## 2) Create the macOS VM

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
lume create openclaw --os macos --ipsw latest
```

This downloads macOS and creates the VM. A VNC window opens automatically.

Note: The download can take a while depending on your connection.

***

## 3) Complete Setup Assistant

In the VNC window:

1. Select language and region
2. Skip Apple ID (or sign in if you want iMessage later)
3. Create a user account (remember the username and password)
4. Skip all optional features

After setup completes, enable SSH:

1. Open System Settings → General → Sharing
2. Enable "Remote Login"

***

## 4) Get the VM's IP address

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
lume get openclaw
```

Look for the IP address (usually `192.168.64.x`).

***

## 5) SSH into the VM

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
ssh youruser@192.168.64.X
```

Replace `youruser` with the account you created, and the IP with your VM's IP.

***

## 6) Install OpenClaw

Inside the VM:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

Follow the onboarding prompts to set up your model provider (Anthropic, OpenAI, etc.).

***

## 7) Configure channels

Edit the config file:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
nano ~/.openclaw/openclaw.json
```

Add your channels:

```json  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  "channels": {
    "whatsapp": {
      "dmPolicy": "allowlist",
      "allowFrom": ["+15551234567"]
    },
    "telegram": {
      "botToken": "YOUR_BOT_TOKEN"
    }
  }
}
```

Then login to WhatsApp (scan QR):

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw channels login
```

***

## 8) Run the VM headlessly

Stop the VM and restart without display:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
lume stop openclaw
lume run openclaw --no-display
```

The VM runs in the background. OpenClaw's daemon keeps the gateway running.

To check status:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
ssh youruser@192.168.64.X "openclaw status"
```

***

## Bonus: iMessage integration

This is the killer feature of running on macOS. Use [BlueBubbles](https://bluebubbles.app) to add iMessage to OpenClaw.

Inside the VM:

1. Download BlueBubbles from bluebubbles.app
2. Sign in with your Apple ID
3. Enable the Web API and set a password
4. Point BlueBubbles webhooks at your gateway (example: `https://your-gateway-host:3000/bluebubbles-webhook?password=<password>`)

Add to your OpenClaw config:

```json  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  "channels": {
    "bluebubbles": {
      "serverUrl": "http://localhost:1234",
      "password": "your-api-password",
      "webhookPath": "/bluebubbles-webhook"
    }
  }
}
```

Restart the gateway. Now your agent can send and receive iMessages.

Full setup details: [BlueBubbles channel](/channels/bluebubbles)

***

## Save a golden image

Before customizing further, snapshot your clean state:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
lume stop openclaw
lume clone openclaw openclaw-golden
```

Reset anytime:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
lume stop openclaw && lume delete openclaw
lume clone openclaw-golden openclaw
lume run openclaw --no-display
```

***

## Running 24/7

Keep the VM running by:

* Keeping your Mac plugged in
* Disabling sleep in System Settings → Energy Saver
* Using `caffeinate` if needed

For true always-on, consider a dedicated Mac mini or a small VPS. See [VPS hosting](/vps).

***

## Troubleshooting

| Problem                  | Solution                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------- |
| Can't SSH into VM        | Check "Remote Login" is enabled in VM's System Settings                            |
| VM IP not showing        | Wait for VM to fully boot, run `lume get openclaw` again                           |
| Lume command not found   | Add `~/.local/bin` to your PATH                                                    |
| WhatsApp QR not scanning | Ensure you're logged into the VM (not host) when running `openclaw channels login` |

***

## Related docs

* [VPS hosting](/vps)
* [Nodes](/nodes)
* [Gateway remote](/gateway/remote)
* [BlueBubbles channel](/channels/bluebubbles)
* [Lume Quickstart](https://cua.ai/docs/lume/guide/getting-started/quickstart)
* [Lume CLI Reference](https://cua.ai/docs/lume/reference/cli-reference)
* [Unattended VM Setup](https://cua.ai/docs/lume/guide/fundamentals/unattended-setup) (advanced)
* [Docker Sandboxing](/install/docker) (alternative isolation approach)
