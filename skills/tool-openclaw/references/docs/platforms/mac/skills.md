<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/platforms/mac/skills.md; fetched_at=2026-02-20T10:29:24.938Z; sha256=c57df29ff36784fa2b5daa0a06adc2e327288776c1147b3b7a35a6caf969e56c; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Skills

# Skills (macOS)

The macOS app surfaces OpenClaw skills via the gateway; it does not parse skills locally.

## Data source

* `skills.status` (gateway) returns all skills plus eligibility and missing requirements
  (including allowlist blocks for bundled skills).
* Requirements are derived from `metadata.openclaw.requires` in each `SKILL.md`.

## Install actions

* `metadata.openclaw.install` defines install options (brew/node/go/uv).
* The app calls `skills.install` to run installers on the gateway host.
* The gateway surfaces only one preferred installer when multiple are provided
  (brew when available, otherwise node manager from `skills.install`, default npm).

## Env/API keys

* The app stores keys in `~/.openclaw/openclaw.json` under `skills.entries.<skillKey>`.
* `skills.update` patches `enabled`, `apiKey`, and `env`.

## Remote mode

* Install + config updates happen on the gateway host (not the local Mac).
