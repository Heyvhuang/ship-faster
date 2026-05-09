<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/index.md; fetched_at=2026-04-04T20:36:07.532Z; sha256=36438db455ebaab1e4d7a6879f19637a9d60ed55986612c1667921818070288d; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Provider Directory

# Model Providers

OpenClaw can use many LLM providers. Pick a provider, authenticate, then set the
default model as `provider/model`.

Looking for chat channel docs (WhatsApp/Telegram/Discord/Slack/Mattermost (plugin)/etc.)? See [Channels](/channels).

## Quick start

1. Authenticate with the provider (usually via `openclaw onboard`).
2. Set the default model:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  agents: { defaults: { model: { primary: "anthropic/claude-opus-4-6" } } },
}
```

## Provider docs

* [Amazon Bedrock](/providers/bedrock)
* [Anthropic (API + Claude Code CLI)](/providers/anthropic)
* [BytePlus (International)](/concepts/model-providers#byteplus-international)
* [Chutes](/providers/chutes)
* [Cloudflare AI Gateway](/providers/cloudflare-ai-gateway)
* [DeepSeek](/providers/deepseek)
* [GitHub Copilot](/providers/github-copilot)
* [GLM models](/providers/glm)
* [Google (Gemini)](/providers/google)
* [Groq (LPU inference)](/providers/groq)
* [Hugging Face (Inference)](/providers/huggingface)
* [Kilocode](/providers/kilocode)
* [LiteLLM (unified gateway)](/providers/litellm)
* [MiniMax](/providers/minimax)
* [Mistral](/providers/mistral)
* [Moonshot AI (Kimi + Kimi Coding)](/providers/moonshot)
* [NVIDIA](/providers/nvidia)
* [Ollama (cloud + local models)](/providers/ollama)
* [OpenAI (API + Codex)](/providers/openai)
* [OpenCode](/providers/opencode)
* [OpenCode Go](/providers/opencode-go)
* [OpenRouter](/providers/openrouter)
* [Perplexity (web search)](/providers/perplexity-provider)
* [Qianfan](/providers/qianfan)
* [Qwen Cloud](/providers/qwen)
* [Qwen / Model Studio (endpoint detail; `qwen-*` canonical, `modelstudio-*` legacy)](/providers/qwen_modelstudio)
* [SGLang (local models)](/providers/sglang)
* [StepFun](/providers/stepfun)
* [Synthetic](/providers/synthetic)
* [Together AI](/providers/together)
* [Venice (Venice AI, privacy-focused)](/providers/venice)
* [Vercel AI Gateway](/providers/vercel-ai-gateway)
* [vLLM (local models)](/providers/vllm)
* [Volcengine (Doubao)](/providers/volcengine)
* [xAI](/providers/xai)
* [Xiaomi](/providers/xiaomi)
* [Z.AI](/providers/zai)

## Shared overview pages

* [Additional bundled variants](/providers/models#additional-bundled-provider-variants) - Anthropic Vertex, Copilot Proxy, and Gemini CLI OAuth

## Transcription providers

* [Deepgram (audio transcription)](/providers/deepgram)

## Community tools

* [Claude Max API Proxy](/providers/claude-max-api-proxy) - Community proxy for Claude subscription credentials (verify Anthropic policy/terms before use)

For the full provider catalog (xAI, Groq, Mistral, etc.) and advanced configuration,
see [Model providers](/concepts/model-providers).


Built with [Mintlify](https://mintlify.com).
