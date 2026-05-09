<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/zai.md; fetched_at=2026-04-04T20:36:07.776Z; sha256=930239595a1b492ba93a8f3aa3cdf1c2a6a57b0a558251735d4ec5450100f2f1; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Z.AI

# Z.AI

Z.AI is the API platform for **GLM** models. It provides REST APIs for GLM and uses API keys
for authentication. Create your API key in the Z.AI console. OpenClaw uses the `zai` provider
with a Z.AI API key.

## CLI setup

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
# Generic API-key setup with endpoint auto-detection
openclaw onboard --auth-choice zai-api-key

# Coding Plan Global, recommended for Coding Plan users
openclaw onboard --auth-choice zai-coding-global

# Coding Plan CN (China region), recommended for Coding Plan users
openclaw onboard --auth-choice zai-coding-cn

# General API
openclaw onboard --auth-choice zai-global

# General API CN (China region)
openclaw onboard --auth-choice zai-cn
```

## Config snippet

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  env: { ZAI_API_KEY: "sk-..." },
  agents: { defaults: { model: { primary: "zai/glm-5" } } },
}
```

`zai-api-key` lets OpenClaw detect the matching Z.AI endpoint from the key and
apply the correct base URL automatically. Use the explicit regional choices when
you want to force a specific Coding Plan or general API surface.

## Bundled GLM catalog

OpenClaw currently seeds the bundled `zai` provider with:

* `glm-5.1`
* `glm-5`
* `glm-5-turbo`
* `glm-5v-turbo`
* `glm-4.7`
* `glm-4.7-flash`
* `glm-4.7-flashx`
* `glm-4.6`
* `glm-4.6v`
* `glm-4.5`
* `glm-4.5-air`
* `glm-4.5-flash`
* `glm-4.5v`

## Notes

* GLM models are available as `zai/<model>` (example: `zai/glm-5`).
* Default bundled model ref: `zai/glm-5`
* Unknown `glm-5*` ids still forward-resolve on the bundled provider path by
  synthesizing provider-owned metadata from the `glm-4.7` template when the id
  matches the current GLM-5 family shape.
* `tool_stream` is enabled by default for Z.AI tool-call streaming. Set
  `agents.defaults.models["zai/<model>"].params.tool_stream` to `false` to disable it.
* See [/providers/glm](/providers/glm) for the model family overview.
* Z.AI uses Bearer auth with your API key.


Built with [Mintlify](https://mintlify.com).
