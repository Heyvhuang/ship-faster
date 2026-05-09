<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/perplexity-provider.md; fetched_at=2026-04-04T20:36:07.639Z; sha256=c12367a073185c7bcc577a11eb97eb9bd7daf0e014df1130eaae8082597aa1df; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Perplexity (Provider)

# Perplexity (Web Search Provider)

The Perplexity plugin provides web search capabilities through the Perplexity
Search API or Perplexity Sonar via OpenRouter.

<Note>
  This page covers the Perplexity **provider** setup. For the Perplexity
  **tool** (how the agent uses it), see [Perplexity tool](/tools/perplexity-search).
</Note>

* Type: web search provider (not a model provider)
* Auth: `PERPLEXITY_API_KEY` (direct) or `OPENROUTER_API_KEY` (via OpenRouter)
* Config path: `plugins.entries.perplexity.config.webSearch.apiKey`

## Quick start

1. Set the API key:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw configure --section web
```

Or set it directly:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw config set plugins.entries.perplexity.config.webSearch.apiKey "pplx-xxxxxxxxxxxx"
```

2. The agent will automatically use Perplexity for web searches when configured.

## Search modes

The plugin auto-selects the transport based on API key prefix:

| Key prefix | Transport                    | Features                                         |
| ---------- | ---------------------------- | ------------------------------------------------ |
| `pplx-`    | Native Perplexity Search API | Structured results, domain/language/date filters |
| `sk-or-`   | OpenRouter (Sonar)           | AI-synthesized answers with citations            |

## Native API filtering

When using the native Perplexity API (`pplx-` key), searches support:

* **Country**: 2-letter country code
* **Language**: ISO 639-1 language code
* **Date range**: day, week, month, year
* **Domain filters**: allowlist/denylist (max 20 domains)
* **Content budget**: `max_tokens`, `max_tokens_per_page`

## Environment note

If the Gateway runs as a daemon (launchd/systemd), make sure
`PERPLEXITY_API_KEY` is available to that process (for example, in
`~/.openclaw/.env` or via `env.shellEnv`).


Built with [Mintlify](https://mintlify.com).
