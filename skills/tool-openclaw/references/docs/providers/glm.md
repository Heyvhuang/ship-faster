<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/glm.md; fetched_at=2026-02-20T10:29:25.669Z; sha256=fa474d7688277e405fe1339ad293433162f43e04ac92e553042c7ced407e9813; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# GLM Models

# GLM models

GLM is a **model family** (not a company) available through the Z.AI platform. In OpenClaw, GLM
models are accessed via the `zai` provider and model IDs like `zai/glm-5`.

## CLI setup

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --auth-choice zai-api-key
```

## Config snippet

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  env: { ZAI_API_KEY: "sk-..." },
  agents: { defaults: { model: { primary: "zai/glm-5" } } },
}
```

## Notes

* GLM versions and availability can change; check Z.AI's docs for the latest.
* Example model IDs include `glm-5`, `glm-4.7`, and `glm-4.6`.
* For provider details, see [/providers/zai](/providers/zai).
