<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/openrouter.md; fetched_at=2026-04-04T20:36:07.647Z; sha256=a77ad2aee54b670e734a01c1d1772e237b5d75fe9cd1e8ddf920d8d6379d6915; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenRouter

# OpenRouter

OpenRouter provides a **unified API** that routes requests to many models behind a single
endpoint and API key. It is OpenAI-compatible, so most OpenAI SDKs work by switching the base URL.

## CLI setup

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --auth-choice openrouter-api-key
```

## Config snippet

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  env: { OPENROUTER_API_KEY: "sk-or-..." },
  agents: {
    defaults: {
      model: { primary: "openrouter/auto" },
    },
  },
}
```

## Notes

* Model refs are `openrouter/<provider>/<model>`.
* Onboarding defaults to `openrouter/auto`. Switch to a concrete model later with
  `openclaw models set openrouter/<provider>/<model>`.
* For more model/provider options, see [/concepts/model-providers](/concepts/model-providers).
* OpenRouter uses a Bearer token with your API key under the hood.
* On real OpenRouter requests (`https://openrouter.ai/api/v1`), OpenClaw also
  adds OpenRouter's documented app-attribution headers:
  `HTTP-Referer: https://openclaw.ai`, `X-OpenRouter-Title: OpenClaw`, and
  `X-OpenRouter-Categories: cli-agent`.
* On verified OpenRouter routes, Anthropic model refs also keep the
  OpenRouter-specific Anthropic `cache_control` markers that OpenClaw uses for
  better prompt-cache reuse on system/developer prompt blocks.
* If you repoint the OpenRouter provider at some other proxy/base URL, OpenClaw
  does not inject those OpenRouter-specific headers or Anthropic cache markers.
* OpenRouter still runs through the proxy-style OpenAI-compatible path, so
  native OpenAI-only request shaping such as `serviceTier`, Responses `store`,
  OpenAI reasoning-compat payloads, and prompt-cache hints is not forwarded.
* Gemini-backed OpenRouter refs stay on the proxy-Gemini path: OpenClaw keeps
  Gemini thought-signature sanitation there, but does not enable native Gemini
  replay validation or bootstrap rewrites.
* On supported non-`auto` routes, OpenClaw maps the selected thinking level to
  OpenRouter proxy reasoning payloads. Unsupported model hints and
  `openrouter/auto` skip that reasoning injection.
* If you pass OpenRouter provider routing under model params, OpenClaw forwards
  it as OpenRouter routing metadata before the shared stream wrappers run.


Built with [Mintlify](https://mintlify.com).
