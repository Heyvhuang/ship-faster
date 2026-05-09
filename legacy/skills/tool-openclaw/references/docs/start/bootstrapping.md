<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/start/bootstrapping.md; fetched_at=2026-04-04T20:36:08.003Z; sha256=b938f1cffee25d49701e526d5b7665ef241ef65b266dc87076419f1b8c1b2895; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Agent Bootstrapping

# Agent Bootstrapping

Bootstrapping is the **first‑run** ritual that prepares an agent workspace and
collects identity details. It happens after onboarding, when the agent starts
for the first time.

## What bootstrapping does

On the first agent run, OpenClaw bootstraps the workspace (default
`~/.openclaw/workspace`):

* Seeds `AGENTS.md`, `BOOTSTRAP.md`, `IDENTITY.md`, `USER.md`.
* Runs a short Q\&A ritual (one question at a time).
* Writes identity + preferences to `IDENTITY.md`, `USER.md`, `SOUL.md`.
* Removes `BOOTSTRAP.md` when finished so it only runs once.

## Where it runs

Bootstrapping always runs on the **gateway host**. If the macOS app connects to
a remote Gateway, the workspace and bootstrapping files live on that remote
machine.

<Note>
  When the Gateway runs on another machine, edit workspace files on the gateway
  host (for example, `user@gateway-host:~/.openclaw/workspace`).
</Note>

## Related docs

* macOS app onboarding: [Onboarding](/start/onboarding)
* Workspace layout: [Agent workspace](/concepts/agent-workspace)


Built with [Mintlify](https://mintlify.com).
