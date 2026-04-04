<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/pi-dev.md; fetched_at=2026-04-04T20:36:07.129Z; sha256=3ac61dabbf1da487bf7902e9065239ef7ab1a2682e1697e9b5349a371406f5ae; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Pi Development Workflow

# Pi Development Workflow

This guide summarizes a sane workflow for working on the pi integration in OpenClaw.

## Type Checking and Linting

* Default local gate: `pnpm check`
* Build gate: `pnpm build` when the change can affect build output, packaging, or lazy-loading/module boundaries
* Full landing gate for Pi-heavy changes: `pnpm check && pnpm test`

## Running Pi Tests

Run the Pi-focused test set directly with Vitest:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
pnpm test \
  "src/agents/pi-*.test.ts" \
  "src/agents/pi-embedded-*.test.ts" \
  "src/agents/pi-tools*.test.ts" \
  "src/agents/pi-settings.test.ts" \
  "src/agents/pi-tool-definition-adapter*.test.ts" \
  "src/agents/pi-hooks/**/*.test.ts"
```

To include the live provider exercise:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
OPENCLAW_LIVE_TEST=1 pnpm test src/agents/pi-embedded-runner-extraparams.live.test.ts
```

This covers the main Pi unit suites:

* `src/agents/pi-*.test.ts`
* `src/agents/pi-embedded-*.test.ts`
* `src/agents/pi-tools*.test.ts`
* `src/agents/pi-settings.test.ts`
* `src/agents/pi-tool-definition-adapter.test.ts`
* `src/agents/pi-hooks/*.test.ts`

## Manual Testing

Recommended flow:

* Run the gateway in dev mode:
  * `pnpm gateway:dev`
* Trigger the agent directly:
  * `pnpm openclaw agent --message "Hello" --thinking low`
* Use the TUI for interactive debugging:
  * `pnpm tui`

For tool call behavior, prompt for a `read` or `exec` action so you can see tool streaming and payload handling.

## Clean Slate Reset

State lives under the OpenClaw state directory. Default is `~/.openclaw`. If `OPENCLAW_STATE_DIR` is set, use that directory instead.

To reset everything:

* `openclaw.json` for config
* `agents/<agentId>/agent/auth-profiles.json` for model auth profiles (API keys + OAuth)
* `credentials/` for provider/channel state that still lives outside the auth profile store
* `agents/<agentId>/sessions/` for agent session history
* `agents/<agentId>/sessions/sessions.json` for the session index
* `sessions/` if legacy paths exist
* `workspace/` if you want a blank workspace

If you only want to reset sessions, delete `agents/<agentId>/sessions/` for that agent. If you want to keep auth, leave `agents/<agentId>/agent/auth-profiles.json` and any provider state under `credentials/` in place.

## References

* [Testing](/help/testing)
* [Getting Started](/start/getting-started)


Built with [Mintlify](https://mintlify.com).
