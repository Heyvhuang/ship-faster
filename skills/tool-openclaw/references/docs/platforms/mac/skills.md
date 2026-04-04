<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/platforms/mac/skills.md; fetched_at=2026-04-04T20:36:07.289Z; sha256=9d8cd9722e77fe5cc871eb532ce09439211ff894277cda0bf0b964cbaad646d2; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Skills (macOS)

# Skills (macOS)

The macOS app surfaces OpenClaw skills via the gateway; it does not parse skills locally.

## Data source

* `skills.status` (gateway) returns all skills plus eligibility and missing requirements
  (including allowlist blocks for bundled skills).
* Requirements are derived from `metadata.openclaw.requires` in each `SKILL.md`.

## Install actions

* `metadata.openclaw.install` defines install options (brew/node/go/uv).
* The app calls `skills.install` to run installers on the gateway host.
* Built-in dangerous-code `critical` findings block `skills.install` by default; suspicious findings still warn only. The dangerous override exists on the gateway request, but the default app flow stays fail-closed.
* If every install option is `download`, the gateway surfaces all download
  choices.
* Otherwise, the gateway picks one preferred installer using the current
  install preferences and host binaries: Homebrew first when
  `skills.install.preferBrew` is enabled and `brew` exists, then `uv`, then the
  configured node manager from `skills.install.nodeManager`, then later
  fallbacks like `go` or `download`.
* Node install labels reflect the configured node manager, including `yarn`.

## Env/API keys

* The app stores keys in `~/.openclaw/openclaw.json` under `skills.entries.<skillKey>`.
* `skills.update` patches `enabled`, `apiKey`, and `env`.

## Remote mode

* Install + config updates happen on the gateway host (not the local Mac).


Built with [Mintlify](https://mintlify.com).
