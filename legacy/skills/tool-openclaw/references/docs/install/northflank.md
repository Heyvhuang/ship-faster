<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/install/northflank.md; fetched_at=2026-04-04T20:36:06.961Z; sha256=ac6b33d0eced9a83dc4e12e372b52d4346b40079013252592cf38a2b4b042890; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Northflank

Deploy OpenClaw on Northflank with a one-click template and access it through the web Control UI.
This is the easiest "no terminal on the server" path: Northflank runs the Gateway for you.

## How to get started

1. Click [Deploy OpenClaw](https://northflank.com/stacks/deploy-openclaw) to open the template.
2. Create an [account on Northflank](https://app.northflank.com/signup) if you don't already have one.
3. Click **Deploy OpenClaw now**.
4. Set the required environment variable: `OPENCLAW_GATEWAY_TOKEN` (use a strong random value).
5. Click **Deploy stack** to build and run the OpenClaw template.
6. Wait for the deployment to complete, then click **View resources**.
7. Open the OpenClaw service.
8. Open the public OpenClaw URL at `/openclaw` and connect using the configured shared secret. This template uses `OPENCLAW_GATEWAY_TOKEN` by default; if you replace it with password auth, use that password instead.

## What you get

* Hosted OpenClaw Gateway + Control UI
* Persistent storage via Northflank Volume (`/data`) so `openclaw.json`,
  per-agent `auth-profiles.json`, channel/provider state, sessions, and
  workspace survive redeploys

## Connect a channel

Use the Control UI at `/openclaw` or run `openclaw onboard` via SSH for channel setup instructions:

* [Telegram](/channels/telegram) (fastest — just a bot token)
* [Discord](/channels/discord)
* [All channels](/channels)

## Next steps

* Set up messaging channels: [Channels](/channels)
* Configure the Gateway: [Gateway configuration](/gateway/configuration)
* Keep OpenClaw up to date: [Updating](/install/updating)


Built with [Mintlify](https://mintlify.com).
