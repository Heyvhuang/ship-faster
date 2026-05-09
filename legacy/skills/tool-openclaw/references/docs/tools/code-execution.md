<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/tools/code-execution.md; fetched_at=2026-04-04T20:36:08.188Z; sha256=464d3c2b07c7c7d8643aaa6d409ab754dda666f8ea15fc9b5d2ec45814d0ad45; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Code Execution

# Code Execution

`code_execution` runs sandboxed remote Python analysis on xAI's Responses API.
This is different from local [`exec`](/tools/exec):

* `exec` runs shell commands on your machine or node
* `code_execution` runs Python in xAI's remote sandbox

Use `code_execution` for:

* calculations
* tabulation
* quick statistics
* chart-style analysis
* analyzing data returned by `x_search` or `web_search`

Do **not** use it when you need local files, your shell, your repo, or paired
devices. Use [`exec`](/tools/exec) for that.

## Setup

You need an xAI API key. Any of these work:

* `XAI_API_KEY`
* `plugins.entries.xai.config.webSearch.apiKey`

Example:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  plugins: {
    entries: {
      xai: {
        config: {
          webSearch: {
            apiKey: "xai-...",
          },
          codeExecution: {
            enabled: true,
            model: "grok-4-1-fast",
            maxTurns: 2,
            timeoutSeconds: 30,
          },
        },
      },
    },
  },
}
```

## How To Use It

Ask naturally and make the analysis intent explicit:

```text  theme={"theme":{"light":"min-light","dark":"min-dark"}}
Use code_execution to calculate the 7-day moving average for these numbers: ...
```

```text  theme={"theme":{"light":"min-light","dark":"min-dark"}}
Use x_search to find posts mentioning OpenClaw this week, then use code_execution to count them by day.
```

```text  theme={"theme":{"light":"min-light","dark":"min-dark"}}
Use web_search to gather the latest AI benchmark numbers, then use code_execution to compare percent changes.
```

The tool takes a single `task` parameter internally, so the agent should send
the full analysis request and any inline data in one prompt.

## Limits

* This is remote xAI execution, not local process execution.
* It should be treated as ephemeral analysis, not a persistent notebook.
* Do not assume access to local files or your workspace.
* For fresh X data, use [`x_search`](/tools/web#x_search) first.

## See Also

* [Web tools](/tools/web)
* [Exec](/tools/exec)
* [xAI](/providers/xai)


Built with [Mintlify](https://mintlify.com).
