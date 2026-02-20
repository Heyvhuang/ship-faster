<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/onboard.md; fetched_at=2026-02-20T10:29:15.898Z; sha256=898c712ee81029d957fd5daeb36e436b137ed4b35a1b8a79c9f0a9a1fe4daaa6; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# onboard

# `openclaw onboard`

Interactive onboarding wizard (local or remote Gateway setup).

## Related guides

* CLI onboarding hub: [Onboarding Wizard (CLI)](/start/wizard)
* Onboarding overview: [Onboarding Overview](/start/onboarding-overview)
* CLI onboarding reference: [CLI Onboarding Reference](/start/wizard-cli-reference)
* CLI automation: [CLI Automation](/start/wizard-cli-automation)
* macOS onboarding: [Onboarding (macOS App)](/start/onboarding)

## Examples

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard
openclaw onboard --flow quickstart
openclaw onboard --flow manual
openclaw onboard --mode remote --remote-url ws://gateway-host:18789
```

Non-interactive custom provider:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard --non-interactive \
  --auth-choice custom-api-key \
  --custom-base-url "https://llm.example.com/v1" \
  --custom-model-id "foo-large" \
  --custom-api-key "$CUSTOM_API_KEY" \
  --custom-compatibility openai
```

`--custom-api-key` is optional in non-interactive mode. If omitted, onboarding checks `CUSTOM_API_KEY`.

Non-interactive Z.AI endpoint choices:

Note: `--auth-choice zai-api-key` now auto-detects the best Z.AI endpoint for your key (prefers the general API with `zai/glm-5`).
If you specifically want the GLM Coding Plan endpoints, pick `zai-coding-global` or `zai-coding-cn`.

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
# Promptless endpoint selection
openclaw onboard --non-interactive \
  --auth-choice zai-coding-global \
  --zai-api-key "$ZAI_API_KEY"

# Other Z.AI endpoint choices:
# --auth-choice zai-coding-cn
# --auth-choice zai-global
# --auth-choice zai-cn
```

Flow notes:

* `quickstart`: minimal prompts, auto-generates a gateway token.
* `manual`: full prompts for port/bind/auth (alias of `advanced`).
* Fastest first chat: `openclaw dashboard` (Control UI, no channel setup).
* Custom Provider: connect any OpenAI or Anthropic compatible endpoint,
  including hosted providers not listed. Use Unknown to auto-detect.

## Common follow-up commands

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw configure
openclaw agents add <name>
```

<Note>
  `--json` does not imply non-interactive mode. Use `--non-interactive` for scripts.
</Note>
