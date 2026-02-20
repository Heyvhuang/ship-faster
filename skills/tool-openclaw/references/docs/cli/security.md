<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/security.md; fetched_at=2026-02-20T10:29:16.197Z; sha256=35feea773a0656e9a5ad33e0e616261dc9e68fbb4a13f3227c704f1fe618b7e3; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# security

# `openclaw security`

Security tools (audit + optional fixes).

Related:

* Security guide: [Security](/gateway/security)

## Audit

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw security audit
openclaw security audit --deep
openclaw security audit --fix
openclaw security audit --json
```

The audit warns when multiple DM senders share the main session and recommends **secure DM mode**: `session.dmScope="per-channel-peer"` (or `per-account-channel-peer` for multi-account channels) for shared inboxes.
It also warns when small models (`<=300B`) are used without sandboxing and with web/browser tools enabled.
For webhook ingress, it warns when `hooks.defaultSessionKey` is unset, when request `sessionKey` overrides are enabled, and when overrides are enabled without `hooks.allowedSessionKeyPrefixes`.
It also warns when sandbox Docker settings are configured while sandbox mode is off, when `gateway.nodes.denyCommands` uses ineffective pattern-like/unknown entries, when global `tools.profile="minimal"` is overridden by agent tool profiles, and when installed extension plugin tools may be reachable under permissive tool policy.
It also warns when npm-based plugin/hook install records are unpinned, missing integrity metadata, or drift from currently installed package versions.
It warns when `gateway.auth.mode="none"` leaves Gateway HTTP APIs reachable without a shared secret (`/tools/invoke` plus any enabled `/v1/*` endpoint).

## JSON output

Use `--json` for CI/policy checks:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw security audit --json | jq '.summary'
openclaw security audit --deep --json | jq '.findings[] | select(.severity=="critical") | .checkId'
```

If `--fix` and `--json` are combined, output includes both fix actions and final report:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw security audit --fix --json | jq '{fix: .fix.ok, summary: .report.summary}'
```

## What `--fix` changes

`--fix` applies safe, deterministic remediations:

* flips common `groupPolicy="open"` to `groupPolicy="allowlist"` (including account variants in supported channels)
* sets `logging.redactSensitive` from `"off"` to `"tools"`
* tightens permissions for state/config and common sensitive files (`credentials/*.json`, `auth-profiles.json`, `sessions.json`, session `*.jsonl`)

`--fix` does **not**:

* rotate tokens/passwords/API keys
* disable tools (`gateway`, `cron`, `exec`, etc.)
* change gateway bind/auth/network exposure choices
* remove or rewrite plugins/skills
