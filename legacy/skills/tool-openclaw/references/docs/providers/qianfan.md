<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/qianfan.md; fetched_at=2026-04-04T20:36:07.678Z; sha256=50c2c4b0aea37e7dee25e93727c0839b6624c688210e5346278307caa50da9bd; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Qianfan

# Qianfan Provider Guide

Qianfan is Baidu's MaaS platform, provides a **unified API** that routes requests to many models behind a single
endpoint and API key. It is OpenAI-compatible, so most OpenAI SDKs work by switching the base URL.

## Prerequisites

1. A Baidu Cloud account with Qianfan API access
2. An API key from the Qianfan console
3. OpenClaw installed on your system

## Getting Your API Key

1. Visit the [Qianfan Console](https://console.bce.baidu.com/qianfan/ais/console/apiKey)
2. Create a new application or select an existing one
3. Generate an API key (format: `bce-v3/ALTAK-...`)
4. Copy the API key for use with OpenClaw

## CLI setup

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --auth-choice qianfan-api-key
```

## Config snippet

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  env: { QIANFAN_API_KEY: "bce-v3/ALTAK-..." },
  agents: {
    defaults: {
      model: { primary: "qianfan/deepseek-v3.2" },
      models: {
        "qianfan/deepseek-v3.2": { alias: "QIANFAN" },
      },
    },
  },
  models: {
    providers: {
      qianfan: {
        baseUrl: "https://qianfan.baidubce.com/v2",
        api: "openai-completions",
        models: [
          {
            id: "deepseek-v3.2",
            name: "DEEPSEEK V3.2",
            reasoning: true,
            input: ["text"],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 98304,
            maxTokens: 32768,
          },
          {
            id: "ernie-5.0-thinking-preview",
            name: "ERNIE-5.0-Thinking-Preview",
            reasoning: true,
            input: ["text", "image"],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 119000,
            maxTokens: 64000,
          },
        ],
      },
    },
  },
}
```

## Notes

* Default bundled model ref: `qianfan/deepseek-v3.2`
* Default base URL: `https://qianfan.baidubce.com/v2`
* Bundled catalog currently includes `deepseek-v3.2` and `ernie-5.0-thinking-preview`
* Add or override `models.providers.qianfan` only when you need custom base URL or model metadata
* Qianfan runs through the OpenAI-compatible transport path, not native OpenAI request shaping

## Related Documentation

* [OpenClaw Configuration](/gateway/configuration)
* [Model Providers](/concepts/model-providers)
* [Agent Setup](/concepts/agent)
* [Qianfan API Documentation](https://cloud.baidu.com/doc/qianfan-api/s/3m7of64lb)


Built with [Mintlify](https://mintlify.com).
