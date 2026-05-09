<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/tools/index.md; fetched_at=2026-04-04T20:36:08.302Z; sha256=42451a964d3b00e81b47f90b24300713827465b950e6ce4db58e7095ad6b202b; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Tools and Plugins

# Tools and Plugins

Everything the agent does beyond generating text happens through **tools**.
Tools are how the agent reads files, runs commands, browses the web, sends
messages, and interacts with devices.

## Tools, skills, and plugins

OpenClaw has three layers that work together:

<Steps>
  <Step title="Tools are what the agent calls">
    A tool is a typed function the agent can invoke (e.g. `exec`, `browser`,
    `web_search`, `message`). OpenClaw ships a set of **built-in tools** and
    plugins can register additional ones.

    The agent sees tools as structured function definitions sent to the model API.
  </Step>

  <Step title="Skills teach the agent when and how">
    A skill is a markdown file (`SKILL.md`) injected into the system prompt.
    Skills give the agent context, constraints, and step-by-step guidance for
    using tools effectively. Skills live in your workspace, in shared folders,
    or ship inside plugins.

    [Skills reference](/tools/skills) | [Creating skills](/tools/creating-skills)
  </Step>

  <Step title="Plugins package everything together">
    A plugin is a package that can register any combination of capabilities:
    channels, model providers, tools, skills, speech, realtime transcription,
    realtime voice, media understanding, image generation, video generation,
    web fetch, web search, and more. Some plugins are **core** (shipped with
    OpenClaw), others are **external** (published on npm by the community).

    [Install and configure plugins](/tools/plugin) | [Build your own](/plugins/building-plugins)
  </Step>
</Steps>

## Built-in tools

These tools ship with OpenClaw and are available without installing any plugins:

| Tool                                       | What it does                                                          | Page                                    |
| ------------------------------------------ | --------------------------------------------------------------------- | --------------------------------------- |
| `exec` / `process`                         | Run shell commands, manage background processes                       | [Exec](/tools/exec)                     |
| `code_execution`                           | Run sandboxed remote Python analysis                                  | [Code Execution](/tools/code-execution) |
| `browser`                                  | Control a Chromium browser (navigate, click, screenshot)              | [Browser](/tools/browser)               |
| `web_search` / `x_search` / `web_fetch`    | Search the web, search X posts, fetch page content                    | [Web](/tools/web)                       |
| `read` / `write` / `edit`                  | File I/O in the workspace                                             |                                         |
| `apply_patch`                              | Multi-hunk file patches                                               | [Apply Patch](/tools/apply-patch)       |
| `message`                                  | Send messages across all channels                                     | [Agent Send](/tools/agent-send)         |
| `canvas`                                   | Drive node Canvas (present, eval, snapshot)                           |                                         |
| `nodes`                                    | Discover and target paired devices                                    |                                         |
| `cron` / `gateway`                         | Manage scheduled jobs; inspect, patch, restart, or update the gateway |                                         |
| `image` / `image_generate`                 | Analyze or generate images                                            |                                         |
| `tts`                                      | One-shot text-to-speech conversion                                    | [TTS](/tools/tts)                       |
| `sessions_*` / `subagents` / `agents_list` | Session management, status, and sub-agent orchestration               | [Sub-agents](/tools/subagents)          |
| `session_status`                           | Lightweight `/status`-style readback and session model override       | [Session Tools](/concepts/session-tool) |

For image work, use `image` for analysis and `image_generate` for generation or editing. If you target `openai/*`, `google/*`, `fal/*`, or another non-default image provider, configure that provider's auth/API key first.

`session_status` is the lightweight status/readback tool in the sessions group.
It answers `/status`-style questions about the current session and can
optionally set a per-session model override; `model=default` clears that
override. Like `/status`, it can backfill sparse token/cache counters and the
active runtime model label from the latest transcript usage entry.

`gateway` is the owner-only runtime tool for gateway operations:

* `config.schema.lookup` for one path-scoped config subtree before edits
* `config.get` for the current config snapshot + hash
* `config.patch` for partial config updates with restart
* `config.apply` only for full-config replacement
* `update.run` for explicit self-update + restart

For partial changes, prefer `config.schema.lookup` then `config.patch`. Use
`config.apply` only when you intentionally replace the entire config.

### Plugin-provided tools

Plugins can register additional tools. Some examples:

* [Lobster](/tools/lobster) — typed workflow runtime with resumable approvals
* [LLM Task](/tools/llm-task) — JSON-only LLM step for structured output
* [Diffs](/tools/diffs) — diff viewer and renderer
* [OpenProse](/prose) — markdown-first workflow orchestration

## Tool configuration

### Allow and deny lists

Control which tools the agent can call via `tools.allow` / `tools.deny` in
config. Deny always wins over allow.

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  tools: {
    allow: ["group:fs", "browser", "web_search"],
    deny: ["exec"],
  },
}
```

### Tool profiles

`tools.profile` sets a base allowlist before `allow`/`deny` is applied.
Per-agent override: `agents.list[].tools.profile`.

| Profile     | What it includes                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| `full`      | No restriction (same as unset)                                                                                |
| `coding`    | `group:fs`, `group:runtime`, `group:web`, `group:sessions`, `group:memory`, `cron`, `image`, `image_generate` |
| `messaging` | `group:messaging`, `sessions_list`, `sessions_history`, `sessions_send`, `session_status`                     |
| `minimal`   | `session_status` only                                                                                         |

### Tool groups

Use `group:*` shorthands in allow/deny lists:

| Group              | Tools                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| `group:runtime`    | exec, process, code\_execution (`bash` is accepted as an alias for `exec`)                                      |
| `group:fs`         | read, write, edit, apply\_patch                                                                                 |
| `group:sessions`   | sessions\_list, sessions\_history, sessions\_send, sessions\_spawn, sessions\_yield, subagents, session\_status |
| `group:memory`     | memory\_search, memory\_get                                                                                     |
| `group:web`        | web\_search, x\_search, web\_fetch                                                                              |
| `group:ui`         | browser, canvas                                                                                                 |
| `group:automation` | cron, gateway                                                                                                   |
| `group:messaging`  | message                                                                                                         |
| `group:nodes`      | nodes                                                                                                           |
| `group:agents`     | agents\_list                                                                                                    |
| `group:media`      | image, image\_generate, tts                                                                                     |
| `group:openclaw`   | All built-in OpenClaw tools (excludes plugin tools)                                                             |

`sessions_history` returns a bounded, safety-filtered recall view. It strips
thinking tags, `<relevant-memories>` scaffolding, plain-text tool-call XML
payloads, downgraded tool-call scaffolding, leaked model control tokens, and
malformed MiniMax tool-call XML from assistant text, then applies
redaction/truncation and possible oversized-row placeholders instead of acting
as a raw transcript dump.

### Provider-specific restrictions

Use `tools.byProvider` to restrict tools for specific providers without
changing global defaults:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  tools: {
    profile: "coding",
    byProvider: {
      "google-antigravity": { profile: "minimal" },
    },
  },
}
```


Built with [Mintlify](https://mintlify.com).
