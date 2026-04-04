<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/volcengine.md; fetched_at=2026-04-04T20:36:07.741Z; sha256=f3fb04d157cb4b07d7fc9ea64e5d2700fac96ddf4d3c8db349e12b70f165a8e2; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Volcengine (Doubao)

# Volcengine (Doubao)

The Volcengine provider gives access to Doubao models and third-party models
hosted on Volcano Engine, with separate endpoints for general and coding
workloads.

* Providers: `volcengine` (general) + `volcengine-plan` (coding)
* Auth: `VOLCANO_ENGINE_API_KEY`
* API: OpenAI-compatible

## Quick start

1. Set the API key:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --auth-choice volcengine-api-key
```

2. Set a default model:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  agents: {
    defaults: {
      model: { primary: "volcengine-plan/ark-code-latest" },
    },
  },
}
```

## Non-interactive example

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --non-interactive \
  --mode local \
  --auth-choice volcengine-api-key \
  --volcengine-api-key "$VOLCANO_ENGINE_API_KEY"
```

## Providers and endpoints

| Provider          | Endpoint                                  | Use case       |
| ----------------- | ----------------------------------------- | -------------- |
| `volcengine`      | `ark.cn-beijing.volces.com/api/v3`        | General models |
| `volcengine-plan` | `ark.cn-beijing.volces.com/api/coding/v3` | Coding models  |

Both providers are configured from a single API key. Setup registers both
automatically.

## Available models

General provider (`volcengine`):

| Model ref                                    | Name                            | Input       | Context |
| -------------------------------------------- | ------------------------------- | ----------- | ------- |
| `volcengine/doubao-seed-1-8-251228`          | Doubao Seed 1.8                 | text, image | 256,000 |
| `volcengine/doubao-seed-code-preview-251028` | doubao-seed-code-preview-251028 | text, image | 256,000 |
| `volcengine/kimi-k2-5-260127`                | Kimi K2.5                       | text, image | 256,000 |
| `volcengine/glm-4-7-251222`                  | GLM 4.7                         | text, image | 200,000 |
| `volcengine/deepseek-v3-2-251201`            | DeepSeek V3.2                   | text, image | 128,000 |

Coding provider (`volcengine-plan`):

| Model ref                                         | Name                     | Input | Context |
| ------------------------------------------------- | ------------------------ | ----- | ------- |
| `volcengine-plan/ark-code-latest`                 | Ark Coding Plan          | text  | 256,000 |
| `volcengine-plan/doubao-seed-code`                | Doubao Seed Code         | text  | 256,000 |
| `volcengine-plan/glm-4.7`                         | GLM 4.7 Coding           | text  | 200,000 |
| `volcengine-plan/kimi-k2-thinking`                | Kimi K2 Thinking         | text  | 256,000 |
| `volcengine-plan/kimi-k2.5`                       | Kimi K2.5 Coding         | text  | 256,000 |
| `volcengine-plan/doubao-seed-code-preview-251028` | Doubao Seed Code Preview | text  | 256,000 |

`openclaw onboard --auth-choice volcengine-api-key` currently sets
`volcengine-plan/ark-code-latest` as the default model while also registering
the general `volcengine` catalog.

During onboarding/configure model selection, the Volcengine auth choice prefers
both `volcengine/*` and `volcengine-plan/*` rows. If those models are not
loaded yet, OpenClaw falls back to the unfiltered catalog instead of showing an
empty provider-scoped picker.

## Environment note

If the Gateway runs as a daemon (launchd/systemd), make sure
`VOLCANO_ENGINE_API_KEY` is available to that process (for example, in
`~/.openclaw/.env` or via `env.shellEnv`).


Built with [Mintlify](https://mintlify.com).
