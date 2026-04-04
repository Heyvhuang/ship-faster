<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/tools/exa-search.md; fetched_at=2026-04-04T20:36:08.224Z; sha256=0f2c2e733372355a6b1b313b6e33f61097d6448586fc1dd769aeb7b539f295e5; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Exa Search

# Exa Search

OpenClaw supports [Exa AI](https://exa.ai/) as a `web_search` provider. Exa
offers neural, keyword, and hybrid search modes with built-in content
extraction (highlights, text, summaries).

## Get an API key

<Steps>
  <Step title="Create an account">
    Sign up at [exa.ai](https://exa.ai/) and generate an API key from your
    dashboard.
  </Step>

  <Step title="Store the key">
    Set `EXA_API_KEY` in the Gateway environment, or configure via:

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
      exa: {
        config: {
          webSearch: {
            apiKey: "exa-...", // optional if EXA_API_KEY is set
          },
        },
      },
    },
  },
  tools: {
    web: {
      search: {
        provider: "exa",
      },
    },
  },
}
```

**Environment alternative:** set `EXA_API_KEY` in the Gateway environment.
For a gateway install, put it in `~/.openclaw/.env`.

## Tool parameters

| Parameter     | Description                                                                   |
| ------------- | ----------------------------------------------------------------------------- |
| `query`       | Search query (required)                                                       |
| `count`       | Results to return (1-100)                                                     |
| `type`        | Search mode: `auto`, `neural`, `fast`, `deep`, `deep-reasoning`, or `instant` |
| `freshness`   | Time filter: `day`, `week`, `month`, or `year`                                |
| `date_after`  | Results after this date (YYYY-MM-DD)                                          |
| `date_before` | Results before this date (YYYY-MM-DD)                                         |
| `contents`    | Content extraction options (see below)                                        |

### Content extraction

Exa can return extracted content alongside search results. Pass a `contents`
object to enable:

```javascript  theme={"theme":{"light":"min-light","dark":"min-dark"}}
await web_search({
  query: "transformer architecture explained",
  type: "neural",
  contents: {
    text: true, // full page text
    highlights: { numSentences: 3 }, // key sentences
    summary: true, // AI summary
  },
});
```

| Contents option | Type                                                                  | Description            |
| --------------- | --------------------------------------------------------------------- | ---------------------- |
| `text`          | `boolean \| { maxCharacters }`                                        | Extract full page text |
| `highlights`    | `boolean \| { maxCharacters, query, numSentences, highlightsPerUrl }` | Extract key sentences  |
| `summary`       | `boolean \| { query }`                                                | AI-generated summary   |

### Search modes

| Mode             | Description                       |
| ---------------- | --------------------------------- |
| `auto`           | Exa picks the best mode (default) |
| `neural`         | Semantic/meaning-based search     |
| `fast`           | Quick keyword search              |
| `deep`           | Thorough deep search              |
| `deep-reasoning` | Deep search with reasoning        |
| `instant`        | Fastest results                   |

## Notes

* If no `contents` option is provided, Exa defaults to `{ highlights: true }`
  so results include key sentence excerpts
* Results preserve `highlightScores` and `summary` fields from the Exa API
  response when available
* Result descriptions are resolved from highlights first, then summary, then
  full text — whichever is available
* `freshness` and `date_after`/`date_before` cannot be combined — use one
  time-filter mode
* Up to 100 results can be returned per query (subject to Exa search-type
  limits)
* Results are cached for 15 minutes by default (configurable via
  `cacheTtlMinutes`)
* Exa is an official API integration with structured JSON responses

## Related

* [Web Search overview](/tools/web) -- all providers and auto-detection
* [Brave Search](/tools/brave-search) -- structured results with country/language filters
* [Perplexity Search](/tools/perplexity-search) -- structured results with domain filtering


Built with [Mintlify](https://mintlify.com).
