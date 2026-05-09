<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/opencode-go.md; fetched_at=2026-04-04T20:36:07.613Z; sha256=ed8795287120516be98534c63041b80b7b94c57ee5c203c7e1e810d89dff5193; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenCode Go

# OpenCode Go

OpenCode Go is the Go catalog within [OpenCode](/providers/opencode).
It uses the same `OPENCODE_API_KEY` as the Zen catalog, but keeps the runtime
provider id `opencode-go` so upstream per-model routing stays correct.

## Supported models

* `opencode-go/kimi-k2.5`
* `opencode-go/glm-5`
* `opencode-go/minimax-m2.5`

## CLI setup

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --auth-choice opencode-go
# or non-interactive
openclaw onboard --opencode-go-api-key "$OPENCODE_API_KEY"
```

## Config snippet

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  env: { OPENCODE_API_KEY: "YOUR_API_KEY_HERE" }, // pragma: allowlist secret
  agents: { defaults: { model: { primary: "opencode-go/kimi-k2.5" } } },
}
```

## Routing behavior

OpenClaw handles per-model routing automatically when the model ref uses `opencode-go/...`.

## Notes

* Use [OpenCode](/providers/opencode) for the shared onboarding and catalog overview.
* Runtime refs stay explicit: `opencode/...` for Zen, `opencode-go/...` for Go.


Built with [Mintlify](https://mintlify.com).
