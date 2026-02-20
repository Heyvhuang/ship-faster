<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/qianfan.md; fetched_at=2026-02-20T10:29:26.363Z; sha256=2f02ab9c36f80671a26a468d08b6bee61803598ab4d31298c1c64f257869a806; content_type=text/markdown; charset=utf-8; status=ok -->

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

## Related Documentation

* [OpenClaw Configuration](/gateway/configuration)
* [Model Providers](/concepts/model-providers)
* [Agent Setup](/concepts/agent)
* [Qianfan API Documentation](https://cloud.baidu.com/doc/qianfan-api/s/3m7of64lb)
