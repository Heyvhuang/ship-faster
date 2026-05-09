<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/vercel-ai-gateway.md; fetched_at=2026-04-04T20:36:07.730Z; sha256=334db3806928fec5d47058c5ce7bc9369f527a12ae89abfa32abcb3abb25b920; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Vercel AI Gateway

# Vercel AI Gateway

The [Vercel AI Gateway](https://vercel.com/ai-gateway) provides a unified API to access hundreds of models through a single endpoint.

* Provider: `vercel-ai-gateway`
* Auth: `AI_GATEWAY_API_KEY`
* API: Anthropic Messages compatible
* OpenClaw auto-discovers the Gateway `/v1/models` catalog, so `/models vercel-ai-gateway`
  includes current model refs such as `vercel-ai-gateway/openai/gpt-5.4`.

## Quick start

1. Set the API key (recommended: store it for the Gateway):

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --auth-choice ai-gateway-api-key
```

2. Set a default model:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  agents: {
    defaults: {
      model: { primary: "vercel-ai-gateway/anthropic/claude-opus-4.6" },
    },
  },
}
```

## Non-interactive example

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --non-interactive \
  --mode local \
  --auth-choice ai-gateway-api-key \
  --ai-gateway-api-key "$AI_GATEWAY_API_KEY"
```

## Environment note

If the Gateway runs as a daemon (launchd/systemd), make sure `AI_GATEWAY_API_KEY`
is available to that process (for example, in `~/.openclaw/.env` or via
`env.shellEnv`).

## Model ID shorthand

OpenClaw accepts Vercel Claude shorthand model refs and normalizes them at
runtime:

* `vercel-ai-gateway/claude-opus-4.6` -> `vercel-ai-gateway/anthropic/claude-opus-4.6`
* `vercel-ai-gateway/opus-4.6` -> `vercel-ai-gateway/anthropic/claude-opus-4-6`


Built with [Mintlify](https://mintlify.com).
