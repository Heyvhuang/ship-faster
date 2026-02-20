<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/approvals.md; fetched_at=2026-02-20T10:29:14.654Z; sha256=fff1f795aaeb408680c223749d0cc60865aff22b466887d3033f187af78c21d0; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# approvals

# `openclaw approvals`

Manage exec approvals for the **local host**, **gateway host**, or a **node host**.
By default, commands target the local approvals file on disk. Use `--gateway` to target the gateway, or `--node` to target a specific node.

Related:

* Exec approvals: [Exec approvals](/tools/exec-approvals)
* Nodes: [Nodes](/nodes)

## Common commands

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw approvals get
openclaw approvals get --node <id|name|ip>
openclaw approvals get --gateway
```

## Replace approvals from a file

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw approvals set --file ./exec-approvals.json
openclaw approvals set --node <id|name|ip> --file ./exec-approvals.json
openclaw approvals set --gateway --file ./exec-approvals.json
```

## Allowlist helpers

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw approvals allowlist add "~/Projects/**/bin/rg"
openclaw approvals allowlist add --agent main --node <id|name|ip> "/usr/bin/uptime"
openclaw approvals allowlist add --agent "*" "/usr/bin/uname"

openclaw approvals allowlist remove "~/Projects/**/bin/rg"
```

## Notes

* `--node` uses the same resolver as `openclaw nodes` (id, name, ip, or id prefix).
* `--agent` defaults to `"*"`, which applies to all agents.
* The node host must advertise `system.execApprovals.get/set` (macOS app or headless node host).
* Approvals files are stored per host at `~/.openclaw/exec-approvals.json`.
