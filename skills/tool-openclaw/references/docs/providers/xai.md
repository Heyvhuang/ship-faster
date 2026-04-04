<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/xai.md; fetched_at=2026-04-04T20:36:07.737Z; sha256=5613753d955774f2914184f27b43a4e3061730ec86138d3249bd5901c49e8a9f; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# xAI

# xAI

OpenClaw ships a bundled `xai` provider plugin for Grok models.

## Setup

1. Create an API key in the xAI console.
2. Set `XAI_API_KEY`, or run:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --auth-choice xai-api-key
```

3. Pick a model such as:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  agents: { defaults: { model: { primary: "xai/grok-4" } } },
}
```

OpenClaw now uses the xAI Responses API as the bundled xAI transport. The same
`XAI_API_KEY` can also power Grok-backed `web_search`, first-class `x_search`,
and remote `code_execution`.
If you store an xAI key under `plugins.entries.xai.config.webSearch.apiKey`,
the bundled xAI model provider now reuses that key as a fallback too.
`code_execution` tuning lives under `plugins.entries.xai.config.codeExecution`.

## Current bundled model catalog

OpenClaw now includes these xAI model families out of the box:

* `grok-3`, `grok-3-fast`, `grok-3-mini`, `grok-3-mini-fast`
* `grok-4`, `grok-4-0709`
* `grok-4-fast`, `grok-4-fast-non-reasoning`
* `grok-4-1-fast`, `grok-4-1-fast-non-reasoning`
* `grok-4.20-beta-latest-reasoning`, `grok-4.20-beta-latest-non-reasoning`
* `grok-code-fast-1`

The plugin also forward-resolves newer `grok-4*` and `grok-code-fast*` ids when
they follow the same API shape.

Fast-model notes:

* `grok-4-fast`, `grok-4-1-fast`, and the `grok-4.20-beta-*` variants are the
  current image-capable Grok refs in the bundled catalog.
* `/fast on` or `agents.defaults.models["xai/<model>"].params.fastMode: true`
  rewrites native xAI requests as follows:
  * `grok-3` -> `grok-3-fast`
  * `grok-3-mini` -> `grok-3-mini-fast`
  * `grok-4` -> `grok-4-fast`
  * `grok-4-0709` -> `grok-4-fast`

Legacy compatibility aliases still normalize to the canonical bundled ids. For
example:

* `grok-4-fast-reasoning` -> `grok-4-fast`
* `grok-4-1-fast-reasoning` -> `grok-4-1-fast`
* `grok-4.20-reasoning` -> `grok-4.20-beta-latest-reasoning`
* `grok-4.20-non-reasoning` -> `grok-4.20-beta-latest-non-reasoning`

## Web search

The bundled `grok` web-search provider uses `XAI_API_KEY` too:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw config set tools.web.search.provider grok
```

## Known limits

* Auth is API-key only today. There is no xAI OAuth/device-code flow in OpenClaw yet.
* `grok-4.20-multi-agent-experimental-beta-0304` is not supported on the normal xAI provider path because it requires a different upstream API surface than the standard OpenClaw xAI transport.

## Notes

* OpenClaw applies xAI-specific tool-schema and tool-call compatibility fixes automatically on the shared runner path.
* Native xAI requests default `tool_stream: true`. Set
  `agents.defaults.models["xai/<model>"].params.tool_stream` to `false` to
  disable it.
* The bundled xAI wrapper strips unsupported strict tool-schema flags and
  reasoning payload keys before sending native xAI requests.
* `web_search`, `x_search`, and `code_execution` are exposed as OpenClaw tools. OpenClaw enables the specific xAI built-in it needs inside each tool request instead of attaching all native tools to every chat turn.
* `x_search` and `code_execution` are owned by the bundled xAI plugin rather than hardcoded into the core model runtime.
* `code_execution` is remote xAI sandbox execution, not local [`exec`](/tools/exec).
* For the broader provider overview, see [Model providers](/providers/index).


Built with [Mintlify](https://mintlify.com).
