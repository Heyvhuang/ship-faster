> ## Documentation Index
> Fetch the complete documentation index at: https://docs.clawd.bot/llms.txt
> Use this file to discover all available pages before exploring further.

# null

# `clawdbot voicecall`

`voicecall` is a plugin-provided command. It only appears if the voice-call plugin is installed and enabled.

Primary doc:

* Voice-call plugin: [Voice Call](/plugins/voice-call)

## Common commands

```bash  theme={null}
clawdbot voicecall status --call-id <id>
clawdbot voicecall call --to "+15555550123" --message "Hello" --mode notify
clawdbot voicecall continue --call-id <id> --message "Any questions?"
clawdbot voicecall end --call-id <id>
```

## Exposing webhooks (Tailscale)

```bash  theme={null}
clawdbot voicecall expose --mode serve
clawdbot voicecall expose --mode funnel
clawdbot voicecall unexpose
```

Security note: only expose the webhook endpoint to networks you trust. Prefer Tailscale Serve over Funnel when possible.
