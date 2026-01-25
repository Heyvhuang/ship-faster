> ## Documentation Index
> Fetch the complete documentation index at: https://docs.clawd.bot/llms.txt
> Use this file to discover all available pages before exploring further.

# null

# `clawdbot security`

Security tools (audit + optional fixes).

Related:

* Security guide: [Security](/gateway/security)

## Audit

```bash  theme={null}
clawdbot security audit
clawdbot security audit --deep
clawdbot security audit --fix
```

The audit warns when multiple DM senders share the main session and recommends `session.dmScope="per-channel-peer"` for shared inboxes.
It also warns when small models (`<=300B`) are used without sandboxing and with web/browser tools enabled.
