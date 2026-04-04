<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/skills.md; fetched_at=2026-04-04T20:36:06.017Z; sha256=002893d3c2d0f2a79943b3b174b6412bd015f160849582d21b71d902c0c8cc3f; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# skills

# `openclaw skills`

Inspect local skills and install/update skills from ClawHub.

Related:

* Skills system: [Skills](/tools/skills)
* Skills config: [Skills config](/tools/skills-config)
* ClawHub installs: [ClawHub](/tools/clawhub)

## Commands

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw skills search "calendar"
openclaw skills search --limit 20 --json
openclaw skills install <slug>
openclaw skills install <slug> --version <version>
openclaw skills install <slug> --force
openclaw skills update <slug>
openclaw skills update --all
openclaw skills list
openclaw skills list --eligible
openclaw skills list --json
openclaw skills list --verbose
openclaw skills info <name>
openclaw skills info <name> --json
openclaw skills check
openclaw skills check --json
```

`search`/`install`/`update` use ClawHub directly and install into the active
workspace `skills/` directory. `list`/`info`/`check` still inspect the local
skills visible to the current workspace and config.

This CLI `install` command downloads skill folders from ClawHub. Gateway-backed
skill dependency installs triggered from onboarding or Skills settings use the
separate `skills.install` request path instead.

Notes:

* `search [query...]` accepts an optional query; omit it to browse the default
  ClawHub search feed.
* `search --limit <n>` caps returned results.
* `install --force` overwrites an existing workspace skill folder for the same
  slug.
* `update --all` only updates tracked ClawHub installs in the active workspace.
* `list` is the default action when no subcommand is provided.
* `list`, `info`, and `check` write their rendered output to stdout. With
  `--json`, that means the machine-readable payload stays on stdout for pipes
  and scripts.


Built with [Mintlify](https://mintlify.com).
