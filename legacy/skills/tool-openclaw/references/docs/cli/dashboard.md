<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/dashboard.md; fetched_at=2026-04-04T20:36:05.776Z; sha256=691c944ca7d39271fb6137a2d81103a2a768a0668ee178397b4bef54b658714d; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# dashboard

# `openclaw dashboard`

Open the Control UI using your current auth.

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw dashboard
openclaw dashboard --no-open
```

Notes:

* `dashboard` resolves configured `gateway.auth.token` SecretRefs when possible.
* For SecretRef-managed tokens (resolved or unresolved), `dashboard` prints/copies/opens a non-tokenized URL to avoid exposing external secrets in terminal output, clipboard history, or browser-launch arguments.
* If `gateway.auth.token` is SecretRef-managed but unresolved in this command path, the command prints a non-tokenized URL and explicit remediation guidance instead of embedding an invalid token placeholder.


Built with [Mintlify](https://mintlify.com).
