<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/voicecall.md; fetched_at=2026-04-04T20:36:06.092Z; sha256=37a6f5380fc5d20a56708c238ac60e3981cfd13131e6b14244ceb357ff82d43a; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# voicecall

# `openclaw voicecall`

`voicecall` is a plugin-provided command. It only appears if the voice-call plugin is installed and enabled.

Primary doc:

* Voice-call plugin: [Voice Call](/plugins/voice-call)

## Common commands

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw voicecall status --call-id <id>
openclaw voicecall call --to "+15555550123" --message "Hello" --mode notify
openclaw voicecall continue --call-id <id> --message "Any questions?"
openclaw voicecall end --call-id <id>
```

## Exposing webhooks (Tailscale)

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw voicecall expose --mode serve
openclaw voicecall expose --mode funnel
openclaw voicecall expose --mode off
```

Security note: only expose the webhook endpoint to networks you trust. Prefer Tailscale Serve over Funnel when possible.


Built with [Mintlify](https://mintlify.com).
