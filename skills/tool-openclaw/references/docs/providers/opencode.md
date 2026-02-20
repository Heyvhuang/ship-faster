<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/opencode.md; fetched_at=2026-02-20T10:29:26.231Z; sha256=eab9d4309db33c67de8011fe5deb1160656e559020f15b46424bca87dee5cc5d; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenCode Zen

# OpenCode Zen

OpenCode Zen is a **curated list of models** recommended by the OpenCode team for coding agents.
It is an optional, hosted model access path that uses an API key and the `opencode` provider.
Zen is currently in beta.

## CLI setup

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --auth-choice opencode-zen
# or non-interactive
openclaw onboard --opencode-zen-api-key "$OPENCODE_API_KEY"
```

## Config snippet

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  env: { OPENCODE_API_KEY: "sk-..." },
  agents: { defaults: { model: { primary: "opencode/claude-opus-4-6" } } },
}
```

## Notes

* `OPENCODE_ZEN_API_KEY` is also supported.
* You sign in to Zen, add billing details, and copy your API key.
* OpenCode Zen bills per request; check the OpenCode dashboard for details.
