<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/sglang.md; fetched_at=2026-04-04T20:36:07.686Z; sha256=08bcf2d8fc4ddf16a89207b9d236ab1cd06d8213858181440ac79146b4cfd42d; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# SGLang

# SGLang

SGLang can serve open-source models via an **OpenAI-compatible** HTTP API.
OpenClaw can connect to SGLang using the `openai-completions` API.

OpenClaw can also **auto-discover** available models from SGLang when you opt
in with `SGLANG_API_KEY` (any value works if your server does not enforce auth)
and you do not define an explicit `models.providers.sglang` entry.

## Quick start

1. Start SGLang with an OpenAI-compatible server.

Your base URL should expose `/v1` endpoints (for example `/v1/models`,
`/v1/chat/completions`). SGLang commonly runs on:

* `http://127.0.0.1:30000/v1`

2. Opt in (any value works if no auth is configured):

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
export SGLANG_API_KEY="sglang-local"
```

3. Run onboarding and choose `SGLang`, or set a model directly:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard
```

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  agents: {
    defaults: {
      model: { primary: "sglang/your-model-id" },
    },
  },
}
```

## Model discovery (implicit provider)

When `SGLANG_API_KEY` is set (or an auth profile exists) and you **do not**
define `models.providers.sglang`, OpenClaw will query:

* `GET http://127.0.0.1:30000/v1/models`

and convert the returned IDs into model entries.

If you set `models.providers.sglang` explicitly, auto-discovery is skipped and
you must define models manually.

## Explicit configuration (manual models)

Use explicit config when:

* SGLang runs on a different host/port.
* You want to pin `contextWindow`/`maxTokens` values.
* Your server requires a real API key (or you want to control headers).

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  models: {
    providers: {
      sglang: {
        baseUrl: "http://127.0.0.1:30000/v1",
        apiKey: "${SGLANG_API_KEY}",
        api: "openai-completions",
        models: [
          {
            id: "your-model-id",
            name: "Local SGLang Model",
            reasoning: false,
            input: ["text"],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 128000,
            maxTokens: 8192,
          },
        ],
      },
    },
  },
}
```

## Troubleshooting

* Check the server is reachable:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
curl http://127.0.0.1:30000/v1/models
```

* If requests fail with auth errors, set a real `SGLANG_API_KEY` that matches
  your server configuration, or configure the provider explicitly under
  `models.providers.sglang`.

## Proxy-style behavior

SGLang is treated as a proxy-style OpenAI-compatible `/v1` backend, not a
native OpenAI endpoint.

* native OpenAI-only request shaping does not apply here
* no `service_tier`, no Responses `store`, no prompt-cache hints, and no
  OpenAI reasoning-compat payload shaping
* hidden OpenClaw attribution headers (`originator`, `version`, `User-Agent`)
  are not injected on custom SGLang base URLs


Built with [Mintlify](https://mintlify.com).
