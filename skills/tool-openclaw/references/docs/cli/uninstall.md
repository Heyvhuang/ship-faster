<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/uninstall.md; fetched_at=2026-04-04T20:36:06.085Z; sha256=617edcfd611eb1352c02338e43c45dbb61f26670f9bc1ebda442eff10c788e2b; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# uninstall

# `openclaw uninstall`

Uninstall the gateway service + local data (CLI remains).

Options:

* `--service`: remove the gateway service
* `--state`: remove state and config
* `--workspace`: remove workspace directories
* `--app`: remove the macOS app
* `--all`: remove service, state, workspace, and app
* `--yes`: skip confirmation prompts
* `--non-interactive`: disable prompts; requires `--yes`
* `--dry-run`: print actions without removing files

Examples:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw backup create
openclaw uninstall
openclaw uninstall --service --yes --non-interactive
openclaw uninstall --state --workspace --yes --non-interactive
openclaw uninstall --all --yes
openclaw uninstall --dry-run
```

Notes:

* Run `openclaw backup create` first if you want a restorable snapshot before removing state or workspaces.
* `--all` is shorthand for removing service, state, workspace, and app together.
* `--non-interactive` requires `--yes`.


Built with [Mintlify](https://mintlify.com).
