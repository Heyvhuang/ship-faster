<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/install/railway.md; fetched_at=2026-04-04T20:36:07.022Z; sha256=a134a4213aa9a57ff106e2fce0ccf492f8cf3db7c8d1973d1ee6a3fedf95fd08; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Railway

Deploy OpenClaw on Railway with a one-click template and access it through the web Control UI.
This is the easiest "no terminal on the server" path: Railway runs the Gateway for you.

## Quick checklist (new users)

1. Click **Deploy on Railway** (below).
2. Add a **Volume** mounted at `/data`.
3. Set the required **Variables** (at least `OPENCLAW_GATEWAY_PORT` and `OPENCLAW_GATEWAY_TOKEN`).
4. Enable **HTTP Proxy** on port `8080`.
5. Open `https://<your-railway-domain>/openclaw` and connect using the configured shared secret. This template uses `OPENCLAW_GATEWAY_TOKEN` by default; if you replace it with password auth, use that password instead.

## One-click deploy

<a href="https://railway.com/deploy/clawdbot-railway-template" target="_blank" rel="noreferrer">
  Deploy on Railway
</a>

After deploy, find your public URL in **Railway → your service → Settings → Domains**.

Railway will either:

* give you a generated domain (often `https://<something>.up.railway.app`), or
* use your custom domain if you attached one.

Then open:

* `https://<your-railway-domain>/openclaw` — Control UI

## What you get

* Hosted OpenClaw Gateway + Control UI
* Persistent storage via Railway Volume (`/data`) so `openclaw.json`,
  per-agent `auth-profiles.json`, channel/provider state, sessions, and
  workspace survive redeploys

## Required Railway settings

### Public Networking

Enable **HTTP Proxy** for the service.

* Port: `8080`

### Volume (required)

Attach a volume mounted at:

* `/data`

### Variables

Set these variables on the service:

* `OPENCLAW_GATEWAY_PORT=8080` (required — must match the port in Public Networking)
* `OPENCLAW_GATEWAY_TOKEN` (required; treat as an admin secret)
* `OPENCLAW_STATE_DIR=/data/.openclaw` (recommended)
* `OPENCLAW_WORKSPACE_DIR=/data/workspace` (recommended)

## Connect a channel

Use the Control UI at `/openclaw` or run `openclaw onboard` via Railway's shell for channel setup instructions:

* [Telegram](/channels/telegram) (fastest — just a bot token)
* [Discord](/channels/discord)
* [All channels](/channels)

## Backups & migration

Export your state, config, auth profiles, and workspace:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw backup create
```

This creates a portable backup archive with OpenClaw state plus any configured
workspace. See [Backup](/cli/backup) for details.

## Next steps

* Set up messaging channels: [Channels](/channels)
* Configure the Gateway: [Gateway configuration](/gateway/configuration)
* Keep OpenClaw up to date: [Updating](/install/updating)


Built with [Mintlify](https://mintlify.com).
