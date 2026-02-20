<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/openrouter.md; fetched_at=2026-02-20T10:29:26.255Z; sha256=2a882d9c3aaa128ccc8f92cdfb66d04d3e6d1fef1dce5bf4717bfa1a39b22389; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenRouter

# OpenRouter

OpenRouter provides a **unified API** that routes requests to many models behind a single
endpoint and API key. It is OpenAI-compatible, so most OpenAI SDKs work by switching the base URL.

## CLI setup

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --auth-choice apiKey --token-provider openrouter --token "$OPENROUTER_API_KEY"
```

## Config snippet

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  env: { OPENROUTER_API_KEY: "sk-or-..." },
  agents: {
    defaults: {
      model: { primary: "openrouter/anthropic/claude-sonnet-4-5" },
    },
  },
}
```

## Notes

* Model refs are `openrouter/<provider>/<model>`.
* For more model/provider options, see [/concepts/model-providers](/concepts/model-providers).
* OpenRouter uses a Bearer token with your API key under the hood.
