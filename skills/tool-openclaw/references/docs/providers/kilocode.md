<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/kilocode.md; fetched_at=2026-04-04T20:36:07.554Z; sha256=1d8ffac134deac6731c5a6b01025ac5eed2035faa300a9f6dbbc3b1038cb9afe; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Kilo Gateway

# Kilo Gateway

Kilo Gateway provides a **unified API** that routes requests to many models behind a single
endpoint and API key. It is OpenAI-compatible, so most OpenAI SDKs work by switching the base URL.

## Getting an API key

1. Go to [app.kilo.ai](https://app.kilo.ai)
2. Sign in or create an account
3. Navigate to API Keys and generate a new key

## CLI setup

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --auth-choice kilocode-api-key
```

Or set the environment variable:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
export KILOCODE_API_KEY="<your-kilocode-api-key>" # pragma: allowlist secret
```

## Config snippet

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  env: { KILOCODE_API_KEY: "<your-kilocode-api-key>" }, // pragma: allowlist secret
  agents: {
    defaults: {
      model: { primary: "kilocode/kilo/auto" },
    },
  },
}
```

## Default model

The default model is `kilocode/kilo/auto`, a provider-owned smart-routing
model managed by Kilo Gateway.

OpenClaw treats `kilocode/kilo/auto` as the stable default ref, but does not
publish a source-backed task-to-upstream-model mapping for that route.

## Available models

OpenClaw dynamically discovers available models from the Kilo Gateway at startup. Use
`/models kilocode` to see the full list of models available with your account.

Any model available on the gateway can be used with the `kilocode/` prefix:

```
kilocode/kilo/auto              (default - smart routing)
kilocode/anthropic/claude-sonnet-4
kilocode/openai/gpt-5.4
kilocode/google/gemini-3-pro-preview
...and many more
```

## Notes

* Model refs are `kilocode/<model-id>` (e.g., `kilocode/anthropic/claude-sonnet-4`).
* Default model: `kilocode/kilo/auto`
* Base URL: `https://api.kilo.ai/api/gateway/`
* Bundled fallback catalog always includes `kilocode/kilo/auto` (`Kilo Auto`) with
  `input: ["text", "image"]`, `reasoning: true`, `contextWindow: 1000000`,
  and `maxTokens: 128000`
* At startup, OpenClaw tries `GET https://api.kilo.ai/api/gateway/models` and
  merges discovered models ahead of the static fallback catalog
* Exact upstream routing behind `kilocode/kilo/auto` is owned by Kilo Gateway,
  not hard-coded in OpenClaw
* Kilo Gateway is documented in source as OpenRouter-compatible, so it stays on
  the proxy-style OpenAI-compatible path rather than native OpenAI request shaping
* Gemini-backed Kilo refs stay on the proxy-Gemini path, so OpenClaw keeps
  Gemini thought-signature sanitation there without enabling native Gemini
  replay validation or bootstrap rewrites.
* Kilo's shared stream wrapper adds the provider app header and normalizes
  proxy reasoning payloads for supported concrete model refs. `kilocode/kilo/auto`
  and other proxy-reasoning-unsupported hints skip that reasoning injection.
* For more model/provider options, see [/concepts/model-providers](/concepts/model-providers).
* Kilo Gateway uses a Bearer token with your API key under the hood.


Built with [Mintlify](https://mintlify.com).
