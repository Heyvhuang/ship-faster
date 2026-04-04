<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/nvidia.md; fetched_at=2026-04-04T20:36:07.600Z; sha256=781d4333c6a525838ec1fe791e08f2487996d0675c74c33a2730d7fe6984fa85; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# NVIDIA

# NVIDIA

NVIDIA provides an OpenAI-compatible API at `https://integrate.api.nvidia.com/v1` for Nemotron and NeMo models. Authenticate with an API key from [NVIDIA NGC](https://catalog.ngc.nvidia.com/).

## CLI setup

Export the key once, then run onboarding and set an NVIDIA model:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
export NVIDIA_API_KEY="nvapi-..."
openclaw onboard --auth-choice skip
openclaw models set nvidia/nvidia/llama-3.1-nemotron-70b-instruct
```

If you still pass `--token`, remember it lands in shell history and `ps` output; prefer the env var when possible.

## Config snippet

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  env: { NVIDIA_API_KEY: "nvapi-..." },
  models: {
    providers: {
      nvidia: {
        baseUrl: "https://integrate.api.nvidia.com/v1",
        api: "openai-completions",
      },
    },
  },
  agents: {
    defaults: {
      model: { primary: "nvidia/nvidia/llama-3.1-nemotron-70b-instruct" },
    },
  },
}
```

## Model IDs

| Model ref                                            | Name                                     | Context | Max output |
| ---------------------------------------------------- | ---------------------------------------- | ------- | ---------- |
| `nvidia/nvidia/llama-3.1-nemotron-70b-instruct`      | NVIDIA Llama 3.1 Nemotron 70B Instruct   | 131,072 | 4,096      |
| `nvidia/meta/llama-3.3-70b-instruct`                 | Meta Llama 3.3 70B Instruct              | 131,072 | 4,096      |
| `nvidia/nvidia/mistral-nemo-minitron-8b-8k-instruct` | NVIDIA Mistral NeMo Minitron 8B Instruct | 8,192   | 2,048      |

## Notes

* OpenAI-compatible `/v1` endpoint; use an API key from NVIDIA NGC.
* Provider auto-enables when `NVIDIA_API_KEY` is set.
* The bundled catalog is static; costs default to `0` in source.


Built with [Mintlify](https://mintlify.com).
