<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/setup.md; fetched_at=2026-04-04T20:36:06.009Z; sha256=bdbca269066c524b7efb8220d3c17c5a097462ccf736cfe5a08563e46f9edfaa; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# setup

# `openclaw setup`

Initialize `~/.openclaw/openclaw.json` and the agent workspace.

Related:

* Getting started: [Getting started](/start/getting-started)
* CLI onboarding: [Onboarding (CLI)](/start/wizard)

## Examples

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw setup
openclaw setup --workspace ~/.openclaw/workspace
openclaw setup --wizard
openclaw setup --non-interactive --mode remote --remote-url wss://gateway-host:18789 --remote-token <token>
```

## Options

* `--workspace <dir>`: agent workspace directory (stored as `agents.defaults.workspace`)
* `--wizard`: run onboarding
* `--non-interactive`: run onboarding without prompts
* `--mode <local|remote>`: onboarding mode
* `--remote-url <url>`: remote Gateway WebSocket URL
* `--remote-token <token>`: remote Gateway token

To run onboarding via setup:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw setup --wizard
```

Notes:

* Plain `openclaw setup` initializes config + workspace without the full onboarding flow.
* Onboarding auto-runs when any onboarding flags are present (`--wizard`, `--non-interactive`, `--mode`, `--remote-url`, `--remote-token`).


Built with [Mintlify](https://mintlify.com).
