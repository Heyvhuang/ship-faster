<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/github-copilot.md; fetched_at=2026-04-04T20:36:07.511Z; sha256=e550a5a1204746447b1f905c8533129d14151d231da0519f0a447fcfd2bafa60; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# GitHub Copilot

# GitHub Copilot

## What is GitHub Copilot?

GitHub Copilot is GitHub's AI coding assistant. It provides access to Copilot
models for your GitHub account and plan. OpenClaw can use Copilot as a model
provider in two different ways.

## Two ways to use Copilot in OpenClaw

### 1) Built-in GitHub Copilot provider (`github-copilot`)

Use the native device-login flow to obtain a GitHub token, then exchange it for
Copilot API tokens when OpenClaw runs. This is the **default** and simplest path
because it does not require VS Code.

### 2) Copilot Proxy plugin (`copilot-proxy`)

Use the **Copilot Proxy** VS Code extension as a local bridge. OpenClaw talks to
the proxy’s `/v1` endpoint and uses the model list you configure there. Choose
this when you already run Copilot Proxy in VS Code or need to route through it.
You must enable the plugin and keep the VS Code extension running.

Use GitHub Copilot as a model provider (`github-copilot`). The login command runs
the GitHub device flow, saves an auth profile, and updates your config to use that
profile.

## CLI setup

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw models auth login-github-copilot
```

You'll be prompted to visit a URL and enter a one-time code. Keep the terminal
open until it completes.

### Optional flags

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw models auth login-github-copilot --yes
```

To also apply the provider's recommended default model in one step, use the
generic auth command instead:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw models auth login --provider github-copilot --method device --set-default
```

## Set a default model

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw models set github-copilot/gpt-4o
```

### Config snippet

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  agents: { defaults: { model: { primary: "github-copilot/gpt-4o" } } },
}
```

## Notes

* Requires an interactive TTY; run it directly in a terminal.
* Copilot model availability depends on your plan; if a model is rejected, try
  another ID (for example `github-copilot/gpt-4.1`).
* Claude model IDs use the Anthropic Messages transport automatically; GPT, o-series,
  and Gemini models keep the OpenAI Responses transport.
* The login stores a GitHub token in the auth profile store and exchanges it for a
  Copilot API token when OpenClaw runs.


Built with [Mintlify](https://mintlify.com).
