<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/cloudflare-ai-gateway.md; fetched_at=2026-04-04T20:36:07.490Z; sha256=cc4207d490ab7c8278ade5d9b63ac3af4cebf72a27884eef3d89a7433edb9f9e; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare AI Gateway

# Cloudflare AI Gateway

Cloudflare AI Gateway sits in front of provider APIs and lets you add analytics, caching, and controls. For Anthropic, OpenClaw uses the Anthropic Messages API through your Gateway endpoint.

* Provider: `cloudflare-ai-gateway`
* Base URL: `https://gateway.ai.cloudflare.com/v1/<account_id>/<gateway_id>/anthropic`
* Default model: `cloudflare-ai-gateway/claude-sonnet-4-5`
* API key: `CLOUDFLARE_AI_GATEWAY_API_KEY` (your provider API key for requests through the Gateway)

For Anthropic models, use your Anthropic API key.

## Quick start

1. Set the provider API key and Gateway details:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --auth-choice cloudflare-ai-gateway-api-key
```

2. Set a default model:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  agents: {
    defaults: {
      model: { primary: "cloudflare-ai-gateway/claude-sonnet-4-5" },
    },
  },
}
```

## Non-interactive example

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --non-interactive \
  --mode local \
  --auth-choice cloudflare-ai-gateway-api-key \
  --cloudflare-ai-gateway-account-id "your-account-id" \
  --cloudflare-ai-gateway-gateway-id "your-gateway-id" \
  --cloudflare-ai-gateway-api-key "$CLOUDFLARE_AI_GATEWAY_API_KEY"
```

## Authenticated gateways

If you enabled Gateway authentication in Cloudflare, add the `cf-aig-authorization` header (this is in addition to your provider API key).

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  models: {
    providers: {
      "cloudflare-ai-gateway": {
        headers: {
          "cf-aig-authorization": "Bearer <cloudflare-ai-gateway-token>",
        },
      },
    },
  },
}
```

## Environment note

If the Gateway runs as a daemon (launchd/systemd), make sure `CLOUDFLARE_AI_GATEWAY_API_KEY` is available to that process (for example, in `~/.openclaw/.env` or via `env.shellEnv`).


Built with [Mintlify](https://mintlify.com).
