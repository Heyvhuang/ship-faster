> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# GLM Models

# GLM models

GLM is a **model family** (not a company) available through the Z.AI platform. In OpenClaw, GLM
models are accessed via the `zai` provider and model IDs like `zai/glm-4.7`.

## CLI setup

```bash  theme={null}
openclaw onboard --auth-choice zai-api-key
```

## Config snippet

```json5  theme={null}
{
  env: { ZAI_API_KEY: "sk-..." },
  agents: { defaults: { model: { primary: "zai/glm-4.7" } } },
}
```

## Notes

* GLM versions and availability can change; check Z.AI's docs for the latest.
* Example model IDs include `glm-4.7` and `glm-4.6`.
* For provider details, see [/providers/zai](/providers/zai).
