<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/xiaomi.md; fetched_at=2026-04-04T20:36:07.773Z; sha256=6ab63f89e10dc341ad823ff1f75f1ac9090eb069758f6e6f1c8e85c75b5b09b0; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Xiaomi MiMo

# Xiaomi MiMo

Xiaomi MiMo is the API platform for **MiMo** models. OpenClaw uses the Xiaomi
OpenAI-compatible endpoint with API-key authentication. Create your API key in the
[Xiaomi MiMo console](https://platform.xiaomimimo.com/#/console/api-keys), then configure the
bundled `xiaomi` provider with that key.

## Built-in catalog

* Base URL: `https://api.xiaomimimo.com/v1`
* API: `openai-completions`
* Authorization: `Bearer $XIAOMI_API_KEY`

| Model ref              | Input       | Context   | Max output | Notes                        |
| ---------------------- | ----------- | --------- | ---------- | ---------------------------- |
| `xiaomi/mimo-v2-flash` | text        | 262,144   | 8,192      | Default model                |
| `xiaomi/mimo-v2-pro`   | text        | 1,048,576 | 32,000     | Reasoning-enabled            |
| `xiaomi/mimo-v2-omni`  | text, image | 262,144   | 32,000     | Reasoning-enabled multimodal |

## CLI setup

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --auth-choice xiaomi-api-key
# or non-interactive
openclaw onboard --auth-choice xiaomi-api-key --xiaomi-api-key "$XIAOMI_API_KEY"
```

## Config snippet

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  env: { XIAOMI_API_KEY: "your-key" },
  agents: { defaults: { model: { primary: "xiaomi/mimo-v2-flash" } } },
  models: {
    mode: "merge",
    providers: {
      xiaomi: {
        baseUrl: "https://api.xiaomimimo.com/v1",
        api: "openai-completions",
        apiKey: "XIAOMI_API_KEY",
        models: [
          {
            id: "mimo-v2-flash",
            name: "Xiaomi MiMo V2 Flash",
            reasoning: false,
            input: ["text"],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 262144,
            maxTokens: 8192,
          },
          {
            id: "mimo-v2-pro",
            name: "Xiaomi MiMo V2 Pro",
            reasoning: true,
            input: ["text"],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 1048576,
            maxTokens: 32000,
          },
          {
            id: "mimo-v2-omni",
            name: "Xiaomi MiMo V2 Omni",
            reasoning: true,
            input: ["text", "image"],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 262144,
            maxTokens: 32000,
          },
        ],
      },
    },
  },
}
```

## Notes

* Default model ref: `xiaomi/mimo-v2-flash`.
* Additional built-in models: `xiaomi/mimo-v2-pro`, `xiaomi/mimo-v2-omni`.
* The provider is injected automatically when `XIAOMI_API_KEY` is set (or an auth profile exists).
* See [/concepts/model-providers](/concepts/model-providers) for provider rules.


Built with [Mintlify](https://mintlify.com).
