<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/tools/ollama-search.md; fetched_at=2026-04-04T20:36:08.341Z; sha256=5747ae5d9243334c1ef0ade8b8761486b5c76a06a05fe0ec22b6b29d7e979a89; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Ollama Web Search

# Ollama Web Search

OpenClaw supports **Ollama Web Search** as a bundled `web_search` provider.
It uses Ollama's experimental web-search API and returns structured results
with titles, URLs, and snippets.

Unlike the Ollama model provider, this setup does not need an API key by
default. It does require:

* an Ollama host that is reachable from OpenClaw
* `ollama signin`

## Setup

<Steps>
  <Step title="Start Ollama">
    Make sure Ollama is installed and running.
  </Step>

  <Step title="Sign in">
    Run:

    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    ollama signin
    ```
  </Step>

  <Step title="Choose Ollama Web Search">
    Run:

    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    openclaw configure --section web
    ```

    Then select **Ollama Web Search** as the provider.
  </Step>
</Steps>

If you already use Ollama for models, Ollama Web Search reuses the same
configured host.

## Config

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  tools: {
    web: {
      search: {
        provider: "ollama",
      },
    },
  },
}
```

Optional Ollama host override:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  models: {
    providers: {
      ollama: {
        baseUrl: "http://ollama-host:11434",
      },
    },
  },
}
```

If no explicit Ollama base URL is set, OpenClaw uses `http://127.0.0.1:11434`.

If your Ollama host expects bearer auth, OpenClaw reuses
`models.providers.ollama.apiKey` (or the matching env-backed provider auth)
for web-search requests too.

## Notes

* No web-search-specific API key field is required for this provider.
* If the Ollama host is auth-protected, OpenClaw reuses the normal Ollama
  provider API key when present.
* OpenClaw warns during setup if Ollama is unreachable or not signed in, but
  it does not block selection.
* Runtime auto-detect can fall back to Ollama Web Search when no higher-priority
  credentialed provider is configured.
* The provider uses Ollama's experimental `/api/experimental/web_search`
  endpoint.

## Related

* [Web Search overview](/tools/web) -- all providers and auto-detection
* [Ollama](/providers/ollama) -- Ollama model setup and cloud/local modes


Built with [Mintlify](https://mintlify.com).
