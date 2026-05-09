<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/webhooks.md; fetched_at=2026-04-04T20:36:06.084Z; sha256=b25d19ce585939d3fdacefab5557950fcca17a30de1a8cb6557d6c0350e91083; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# webhooks

# `openclaw webhooks`

Webhook helpers and integrations (Gmail Pub/Sub, webhook helpers).

Related:

* Webhooks: [Webhooks](/automation/cron-jobs#webhooks)
* Gmail Pub/Sub: [Gmail Pub/Sub](/automation/cron-jobs#gmail-pubsub-integration)

## Gmail

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw webhooks gmail setup --account you@example.com
openclaw webhooks gmail run
```

### `webhooks gmail setup`

Configure Gmail watch, Pub/Sub, and OpenClaw webhook delivery.

Required:

* `--account <email>`

Options:

* `--project <id>`
* `--topic <name>`
* `--subscription <name>`
* `--label <label>`
* `--hook-url <url>`
* `--hook-token <token>`
* `--push-token <token>`
* `--bind <host>`
* `--port <port>`
* `--path <path>`
* `--include-body`
* `--max-bytes <n>`
* `--renew-minutes <n>`
* `--tailscale <funnel|serve|off>`
* `--tailscale-path <path>`
* `--tailscale-target <target>`
* `--push-endpoint <url>`
* `--json`

Examples:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw webhooks gmail setup --account you@example.com
openclaw webhooks gmail setup --account you@example.com --project my-gcp-project --json
openclaw webhooks gmail setup --account you@example.com --hook-url https://gateway.example.com/hooks/gmail
```

### `webhooks gmail run`

Run `gog watch serve` plus the watch auto-renew loop.

Options:

* `--account <email>`
* `--topic <topic>`
* `--subscription <name>`
* `--label <label>`
* `--hook-url <url>`
* `--hook-token <token>`
* `--push-token <token>`
* `--bind <host>`
* `--port <port>`
* `--path <path>`
* `--include-body`
* `--max-bytes <n>`
* `--renew-minutes <n>`
* `--tailscale <funnel|serve|off>`
* `--tailscale-path <path>`
* `--tailscale-target <target>`

Example:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw webhooks gmail run --account you@example.com
```

See [Gmail Pub/Sub documentation](/automation/cron-jobs#gmail-pubsub-integration) for the end-to-end setup flow and operational details.


Built with [Mintlify](https://mintlify.com).
