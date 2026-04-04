<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/reset.md; fetched_at=2026-04-04T20:36:05.962Z; sha256=4219d7eac1682ac9b8fee3022033b7cce45a0d5597761f8081cb7439d584a007; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# reset

# `openclaw reset`

Reset local config/state (keeps the CLI installed).

Options:

* `--scope <scope>`: `config`, `config+creds+sessions`, or `full`
* `--yes`: skip confirmation prompts
* `--non-interactive`: disable prompts; requires `--scope` and `--yes`
* `--dry-run`: print actions without removing files

Examples:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw backup create
openclaw reset
openclaw reset --dry-run
openclaw reset --scope config --yes --non-interactive
openclaw reset --scope config+creds+sessions --yes --non-interactive
openclaw reset --scope full --yes --non-interactive
```

Notes:

* Run `openclaw backup create` first if you want a restorable snapshot before removing local state.
* If you omit `--scope`, `openclaw reset` uses an interactive prompt to choose what to remove.
* `--non-interactive` is only valid when both `--scope` and `--yes` are set.


Built with [Mintlify](https://mintlify.com).
