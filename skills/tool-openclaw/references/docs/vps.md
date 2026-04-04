<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/vps.md; fetched_at=2026-04-04T20:36:08.462Z; sha256=ccf4626ae9038380006033e61cd620c0077cc280239fd72ad60525938af652e7; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Linux Server

# Linux Server

Run the OpenClaw Gateway on any Linux server or cloud VPS. This page helps you
pick a provider, explains how cloud deployments work, and covers generic Linux
tuning that applies everywhere.

## Pick a provider

<CardGroup cols={2}>
  <Card title="Railway" href="/install/railway">One-click, browser setup</Card>
  <Card title="Northflank" href="/install/northflank">One-click, browser setup</Card>
  <Card title="DigitalOcean" href="/install/digitalocean">Simple paid VPS</Card>
  <Card title="Oracle Cloud" href="/install/oracle">Always Free ARM tier</Card>
  <Card title="Fly.io" href="/install/fly">Fly Machines</Card>
  <Card title="Hetzner" href="/install/hetzner">Docker on Hetzner VPS</Card>
  <Card title="GCP" href="/install/gcp">Compute Engine</Card>
  <Card title="Azure" href="/install/azure">Linux VM</Card>
  <Card title="exe.dev" href="/install/exe-dev">VM with HTTPS proxy</Card>
  <Card title="Raspberry Pi" href="/install/raspberry-pi">ARM self-hosted</Card>
</CardGroup>

**AWS (EC2 / Lightsail / free tier)** also works well.
A community video walkthrough is available at
[x.com/techfrenAJ/status/2014934471095812547](https://x.com/techfrenAJ/status/2014934471095812547)
(community resource -- may become unavailable).

## How cloud setups work

* The **Gateway runs on the VPS** and owns state + workspace.
* You connect from your laptop or phone via the **Control UI** or **Tailscale/SSH**.
* Treat the VPS as the source of truth and **back up** the state + workspace regularly.
* Secure default: keep the Gateway on loopback and access it via SSH tunnel or Tailscale Serve.
  If you bind to `lan` or `tailnet`, require `gateway.auth.token` or `gateway.auth.password`.

Related pages: [Gateway remote access](/gateway/remote), [Platforms hub](/platforms).

## Shared company agent on a VPS

Running a single agent for a team is a valid setup when every user is in the same trust boundary and the agent is business-only.

* Keep it on a dedicated runtime (VPS/VM/container + dedicated OS user/accounts).
* Do not sign that runtime into personal Apple/Google accounts or personal browser/password-manager profiles.
* If users are adversarial to each other, split by gateway/host/OS user.

Security model details: [Security](/gateway/security).

## Using nodes with a VPS

You can keep the Gateway in the cloud and pair **nodes** on your local devices
(Mac/iOS/Android/headless). Nodes provide local screen/camera/canvas and `system.run`
capabilities while the Gateway stays in the cloud.

Docs: [Nodes](/nodes), [Nodes CLI](/cli/nodes).

## Startup tuning for small VMs and ARM hosts

If CLI commands feel slow on low-power VMs (or ARM hosts), enable Node's module compile cache:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
grep -q 'NODE_COMPILE_CACHE=/var/tmp/openclaw-compile-cache' ~/.bashrc || cat >> ~/.bashrc <<'EOF'
export NODE_COMPILE_CACHE=/var/tmp/openclaw-compile-cache
mkdir -p /var/tmp/openclaw-compile-cache
export OPENCLAW_NO_RESPAWN=1
EOF
source ~/.bashrc
```

* `NODE_COMPILE_CACHE` improves repeated command startup times.
* `OPENCLAW_NO_RESPAWN=1` avoids extra startup overhead from a self-respawn path.
* First command run warms the cache; subsequent runs are faster.
* For Raspberry Pi specifics, see [Raspberry Pi](/install/raspberry-pi).

### systemd tuning checklist (optional)

For VM hosts using `systemd`, consider:

* Add service env for a stable startup path:
  * `OPENCLAW_NO_RESPAWN=1`
  * `NODE_COMPILE_CACHE=/var/tmp/openclaw-compile-cache`
* Keep restart behavior explicit:
  * `Restart=always`
  * `RestartSec=2`
  * `TimeoutStartSec=90`
* Prefer SSD-backed disks for state/cache paths to reduce random-I/O cold-start penalties.

For the standard `openclaw onboard --install-daemon` path, edit the user unit:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
systemctl --user edit openclaw-gateway.service
```

```ini  theme={"theme":{"light":"min-light","dark":"min-dark"}}
[Service]
Environment=OPENCLAW_NO_RESPAWN=1
Environment=NODE_COMPILE_CACHE=/var/tmp/openclaw-compile-cache
Restart=always
RestartSec=2
TimeoutStartSec=90
```

If you deliberately installed a system unit instead, edit
`openclaw-gateway.service` via `sudo systemctl edit openclaw-gateway.service`.

How `Restart=` policies help automated recovery:
[systemd can automate service recovery](https://www.redhat.com/en/blog/systemd-automate-recovery).


Built with [Mintlify](https://mintlify.com).
