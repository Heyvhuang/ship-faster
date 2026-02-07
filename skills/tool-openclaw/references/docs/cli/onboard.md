> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# onboard

# `openclaw onboard`

Interactive onboarding wizard (local or remote Gateway setup).

## Related guides

* CLI onboarding hub: [Onboarding Wizard (CLI)](/start/wizard)
* CLI onboarding reference: [CLI Onboarding Reference](/start/wizard-cli-reference)
* CLI automation: [CLI Automation](/start/wizard-cli-automation)
* macOS onboarding: [Onboarding (macOS App)](/start/onboarding)

## Examples

```bash  theme={null}
openclaw onboard
openclaw onboard --flow quickstart
openclaw onboard --flow manual
openclaw onboard --mode remote --remote-url ws://gateway-host:18789
```

Flow notes:

* `quickstart`: minimal prompts, auto-generates a gateway token.
* `manual`: full prompts for port/bind/auth (alias of `advanced`).
* Fastest first chat: `openclaw dashboard` (Control UI, no channel setup).

## Common follow-up commands

```bash  theme={null}
openclaw configure
openclaw agents add <name>
```

<Note>
  `--json` does not imply non-interactive mode. Use `--non-interactive` for scripts.
</Note>
