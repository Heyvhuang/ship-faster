> ## Documentation Index
> Fetch the complete documentation index at: https://docs.clawd.bot/llms.txt
> Use this file to discover all available pages before exploring further.

# null

# `clawdbot onboard`

Interactive onboarding wizard (local or remote Gateway setup).

Related:

* Wizard guide: [Onboarding](/start/onboarding)

## Examples

```bash  theme={null}
clawdbot onboard
clawdbot onboard --flow quickstart
clawdbot onboard --flow manual
clawdbot onboard --mode remote --remote-url ws://gateway-host:18789
```

Flow notes:

* `quickstart`: minimal prompts, auto-generates a gateway token.
* `manual`: full prompts for port/bind/auth (alias of `advanced`).
