<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/install/ansible.md; fetched_at=2026-04-04T20:36:06.782Z; sha256=95e044c61f02bcddaf5dfa6985eae7476d800a804daedcd7f6e435c0ceb51027; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Ansible

# Ansible Installation

Deploy OpenClaw to production servers with **[openclaw-ansible](https://github.com/openclaw/openclaw-ansible)** -- an automated installer with security-first architecture.

<Info>
  The [openclaw-ansible](https://github.com/openclaw/openclaw-ansible) repo is the source of truth for Ansible deployment. This page is a quick overview.
</Info>

## Prerequisites

| Requirement | Details                                                   |
| ----------- | --------------------------------------------------------- |
| **OS**      | Debian 11+ or Ubuntu 20.04+                               |
| **Access**  | Root or sudo privileges                                   |
| **Network** | Internet connection for package installation              |
| **Ansible** | 2.14+ (installed automatically by the quick-start script) |

## What You Get

* **Firewall-first security** -- UFW + Docker isolation (only SSH + Tailscale accessible)
* **Tailscale VPN** -- secure remote access without exposing services publicly
* **Docker** -- isolated sandbox containers, localhost-only bindings
* **Defense in depth** -- 4-layer security architecture
* **Systemd integration** -- auto-start on boot with hardening
* **One-command setup** -- complete deployment in minutes

## Quick Start

One-command install:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
curl -fsSL https://raw.githubusercontent.com/openclaw/openclaw-ansible/main/install.sh | bash
```

## What Gets Installed

The Ansible playbook installs and configures:

1. **Tailscale** -- mesh VPN for secure remote access
2. **UFW firewall** -- SSH + Tailscale ports only
3. **Docker CE + Compose V2** -- for agent sandboxes
4. **Node.js 24 + pnpm** -- runtime dependencies (Node 22 LTS, currently `22.14+`, remains supported)
5. **OpenClaw** -- host-based, not containerized
6. **Systemd service** -- auto-start with security hardening

<Note>
  The gateway runs directly on the host (not in Docker), but agent sandboxes use Docker for isolation. See [Sandboxing](/gateway/sandboxing) for details.
</Note>

## Post-Install Setup

<Steps>
  <Step title="Switch to the openclaw user">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    sudo -i -u openclaw
    ```
  </Step>

  <Step title="Run the onboarding wizard">
    The post-install script guides you through configuring OpenClaw settings.
  </Step>

  <Step title="Connect messaging providers">
    Log in to WhatsApp, Telegram, Discord, or Signal:

    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    openclaw channels login
    ```
  </Step>

  <Step title="Verify the installation">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    sudo systemctl status openclaw
    sudo journalctl -u openclaw -f
    ```
  </Step>

  <Step title="Connect to Tailscale">
    Join your VPN mesh for secure remote access.
  </Step>
</Steps>

### Quick Commands

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
# Check service status
sudo systemctl status openclaw

# View live logs
sudo journalctl -u openclaw -f

# Restart gateway
sudo systemctl restart openclaw

# Provider login (run as openclaw user)
sudo -i -u openclaw
openclaw channels login
```

## Security Architecture

The deployment uses a 4-layer defense model:

1. **Firewall (UFW)** -- only SSH (22) + Tailscale (41641/udp) exposed publicly
2. **VPN (Tailscale)** -- gateway accessible only via VPN mesh
3. **Docker isolation** -- DOCKER-USER iptables chain prevents external port exposure
4. **Systemd hardening** -- NoNewPrivileges, PrivateTmp, unprivileged user

To verify your external attack surface:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
nmap -p- YOUR_SERVER_IP
```

Only port 22 (SSH) should be open. All other services (gateway, Docker) are locked down.

Docker is installed for agent sandboxes (isolated tool execution), not for running the gateway itself. See [Multi-Agent Sandbox and Tools](/tools/multi-agent-sandbox-tools) for sandbox configuration.

## Manual Installation

If you prefer manual control over the automation:

<Steps>
  <Step title="Install prerequisites">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    sudo apt update && sudo apt install -y ansible git
    ```
  </Step>

  <Step title="Clone the repository">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    git clone https://github.com/openclaw/openclaw-ansible.git
    cd openclaw-ansible
    ```
  </Step>

  <Step title="Install Ansible collections">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    ansible-galaxy collection install -r requirements.yml
    ```
  </Step>

  <Step title="Run the playbook">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    ./run-playbook.sh
    ```

    Alternatively, run directly and then manually execute the setup script afterward:

    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    ansible-playbook playbook.yml --ask-become-pass
    # Then run: /tmp/openclaw-setup.sh
    ```
  </Step>
</Steps>

## Updating

The Ansible installer sets up OpenClaw for manual updates. See [Updating](/install/updating) for the standard update flow.

To re-run the Ansible playbook (for example, for configuration changes):

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
cd openclaw-ansible
./run-playbook.sh
```

This is idempotent and safe to run multiple times.

## Troubleshooting

<AccordionGroup>
  <Accordion title="Firewall blocks my connection">
    * Ensure you can access via Tailscale VPN first
    * SSH access (port 22) is always allowed
    * The gateway is only accessible via Tailscale by design
  </Accordion>

  <Accordion title="Service will not start">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    # Check logs
    sudo journalctl -u openclaw -n 100

    # Verify permissions
    sudo ls -la /opt/openclaw

    # Test manual start
    sudo -i -u openclaw
    cd ~/openclaw
    openclaw gateway run
    ```
  </Accordion>

  <Accordion title="Docker sandbox issues">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    # Verify Docker is running
    sudo systemctl status docker

    # Check sandbox image
    sudo docker images | grep openclaw-sandbox

    # Build sandbox image if missing
    cd /opt/openclaw/openclaw
    sudo -u openclaw ./scripts/sandbox-setup.sh
    ```
  </Accordion>

  <Accordion title="Provider login fails">
    Make sure you are running as the `openclaw` user:

    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    sudo -i -u openclaw
    openclaw channels login
    ```
  </Accordion>
</AccordionGroup>

## Advanced Configuration

For detailed security architecture and troubleshooting, see the openclaw-ansible repo:

* [Security Architecture](https://github.com/openclaw/openclaw-ansible/blob/main/docs/security.md)
* [Technical Details](https://github.com/openclaw/openclaw-ansible/blob/main/docs/architecture.md)
* [Troubleshooting Guide](https://github.com/openclaw/openclaw-ansible/blob/main/docs/troubleshooting.md)

## Related

* [openclaw-ansible](https://github.com/openclaw/openclaw-ansible) -- full deployment guide
* [Docker](/install/docker) -- containerized gateway setup
* [Sandboxing](/gateway/sandboxing) -- agent sandbox configuration
* [Multi-Agent Sandbox and Tools](/tools/multi-agent-sandbox-tools) -- per-agent isolation


Built with [Mintlify](https://mintlify.com).
