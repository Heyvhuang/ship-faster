<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/experiments/onboarding-config-protocol.md; fetched_at=2026-02-20T10:29:18.624Z; sha256=9300fbe8f0ce9d72c31df1d5e4d7d864420a91a028cc9465630e0c7a6772d375; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Onboarding and Config Protocol

# Onboarding + Config Protocol

Purpose: shared onboarding + config surfaces across CLI, macOS app, and Web UI.

## Components

* Wizard engine (shared session + prompts + onboarding state).
* CLI onboarding uses the same wizard flow as the UI clients.
* Gateway RPC exposes wizard + config schema endpoints.
* macOS onboarding uses the wizard step model.
* Web UI renders config forms from JSON Schema + UI hints.

## Gateway RPC

* `wizard.start` params: `{ mode?: "local"|"remote", workspace?: string }`
* `wizard.next` params: `{ sessionId, answer?: { stepId, value? } }`
* `wizard.cancel` params: `{ sessionId }`
* `wizard.status` params: `{ sessionId }`
* `config.schema` params: `{}`

Responses (shape)

* Wizard: `{ sessionId, done, step?, status?, error? }`
* Config schema: `{ schema, uiHints, version, generatedAt }`

## UI Hints

* `uiHints` keyed by path; optional metadata (label/help/group/order/advanced/sensitive/placeholder).
* Sensitive fields render as password inputs; no redaction layer.
* Unsupported schema nodes fall back to the raw JSON editor.

## Notes

* This doc is the single place to track protocol refactors for onboarding/config.
