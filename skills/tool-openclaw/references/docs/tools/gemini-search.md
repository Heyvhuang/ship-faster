<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/tools/gemini-search.md; fetched_at=2026-04-04T20:36:08.295Z; sha256=fade921436c44015e70f0ef769b4393638f9894f35d8318f4b514dff4bbd709c; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Gemini Search

# Gemini Search

OpenClaw supports Gemini models with built-in
[Google Search grounding](https://ai.google.dev/gemini-api/docs/grounding),
which returns AI-synthesized answers backed by live Google Search results with
citations.

## Get an API key

<Steps>
  <Step title="Create a key">
    Go to [Google AI Studio](https://aistudio.google.com/apikey) and create an
    API key.
  </Step>

  <Step title="Store the key">
    Set `GEMINI_API_KEY` in the Gateway environment, or configure via:

    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    openclaw configure --section web
    ```
  </Step>
</Steps>

## Config

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  plugins: {
    entries: {
      google: {
        config: {
          webSearch: {
            apiKey: "AIza...", // optional if GEMINI_API_KEY is set
            model: "gemini-2.5-flash", // default
          },
        },
      },
    },
  },
  tools: {
    web: {
      search: {
        provider: "gemini",
      },
    },
  },
}
```

**Environment alternative:** set `GEMINI_API_KEY` in the Gateway environment.
For a gateway install, put it in `~/.openclaw/.env`.

## How it works

Unlike traditional search providers that return a list of links and snippets,
Gemini uses Google Search grounding to produce AI-synthesized answers with
inline citations. The results include both the synthesized answer and the source
URLs.

* Citation URLs from Gemini grounding are automatically resolved from Google
  redirect URLs to direct URLs.
* Redirect resolution uses the SSRF guard path (HEAD + redirect checks +
  http/https validation) before returning the final citation URL.
* Redirect resolution uses strict SSRF defaults, so redirects to
  private/internal targets are blocked.

## Supported parameters

Gemini search supports `query`.

`count` is accepted for shared `web_search` compatibility, but Gemini grounding
still returns one synthesized answer with citations rather than an N-result
list.

Provider-specific filters like `country`, `language`, `freshness`, and
`domain_filter` are not supported.

## Model selection

The default model is `gemini-2.5-flash` (fast and cost-effective). Any Gemini
model that supports grounding can be used via
`plugins.entries.google.config.webSearch.model`.

## Related

* [Web Search overview](/tools/web) -- all providers and auto-detection
* [Brave Search](/tools/brave-search) -- structured results with snippets
* [Perplexity Search](/tools/perplexity-search) -- structured results + content extraction


Built with [Mintlify](https://mintlify.com).
