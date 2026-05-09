<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/glm.md; fetched_at=2026-04-04T20:36:07.511Z; sha256=39157d13b1408de5a8f0ce3ce1b75d6bc7fcb564b2f9908921808e8a9d82a31c; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# GLM Models

# GLM models

GLM is a **model family** (not a company) available through the Z.AI platform. In OpenClaw, GLM
models are accessed via the `zai` provider and model IDs like `zai/glm-5`.

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

## Current bundled GLM models

OpenClaw currently seeds the bundled `zai` provider with these GLM refs:

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

* GLM versions and availability can change; check Z.AI's docs for the latest.
* Default bundled model ref is `zai/glm-5`.
* For provider details, see [/providers/zai](/providers/zai).


Built with [Mintlify](https://mintlify.com).
