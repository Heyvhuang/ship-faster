<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/update.md; fetched_at=2026-04-04T20:36:06.062Z; sha256=1b953b0dff236ec4b3df7b1d56fd7c96ebcb0e7fe2a58d77d7f625f5f7f97da0; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# update

# `openclaw update`

Safely update OpenClaw and switch between stable/beta/dev channels.

If you installed via **npm/pnpm/bun** (global install, no git metadata),
updates happen via the package-manager flow in [Updating](/install/updating).

## Usage

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw update
openclaw update status
openclaw update wizard
openclaw update --channel beta
openclaw update --channel dev
openclaw update --tag beta
openclaw update --tag main
openclaw update --dry-run
openclaw update --no-restart
openclaw update --yes
openclaw update --json
openclaw --update
```

## Options

* `--no-restart`: skip restarting the Gateway service after a successful update.
* `--channel <stable|beta|dev>`: set the update channel (git + npm; persisted in config).
* `--tag <dist-tag|version|spec>`: override the package target for this update only. For package installs, `main` maps to `github:openclaw/openclaw#main`.
* `--dry-run`: preview planned update actions (channel/tag/target/restart flow) without writing config, installing, syncing plugins, or restarting.
* `--json`: print machine-readable `UpdateRunResult` JSON.
* `--timeout <seconds>`: per-step timeout (default is 1200s).
* `--yes`: skip confirmation prompts (for example downgrade confirmation)

Note: downgrades require confirmation because older versions can break configuration.

## `update status`

Show the active update channel + git tag/branch/SHA (for source checkouts), plus update availability.

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw update status
openclaw update status --json
openclaw update status --timeout 10
```

Options:

* `--json`: print machine-readable status JSON.
* `--timeout <seconds>`: timeout for checks (default is 3s).

## `update wizard`

Interactive flow to pick an update channel and confirm whether to restart the Gateway
after updating (default is to restart). If you select `dev` without a git checkout, it
offers to create one.

Options:

* `--timeout <seconds>`: timeout for each update step (default `1200`)

## What it does

When you switch channels explicitly (`--channel ...`), OpenClaw also keeps the
install method aligned:

* `dev` → ensures a git checkout (default: `~/openclaw`, override with `OPENCLAW_GIT_DIR`),
  updates it, and installs the global CLI from that checkout.
* `stable` → installs from npm using `latest`.
* `beta` → prefers npm dist-tag `beta`, but falls back to `latest` when beta is
  missing or older than the current stable release.

The Gateway core auto-updater (when enabled via config) reuses this same update path.

## Git checkout flow

Channels:

* `stable`: checkout the latest non-beta tag, then build + doctor.
* `beta`: prefer the latest `-beta` tag, but fall back to the latest stable tag
  when beta is missing or older.
* `dev`: checkout `main`, then fetch + rebase.

High-level:

1. Requires a clean worktree (no uncommitted changes).
2. Switches to the selected channel (tag or branch).
3. Fetches upstream (dev only).
4. Dev only: preflight lint + TypeScript build in a temp worktree; if the tip fails, walks back up to 10 commits to find the newest clean build.
5. Rebases onto the selected commit (dev only).
6. Installs deps (pnpm preferred; npm fallback; bun remains available as a secondary compatibility fallback).
7. Builds + builds the Control UI.
8. Runs `openclaw doctor` as the final “safe update” check.
9. Syncs plugins to the active channel (dev uses bundled extensions; stable/beta uses npm) and updates npm-installed plugins.

## `--update` shorthand

`openclaw --update` rewrites to `openclaw update` (useful for shells and launcher scripts).

## See also

* `openclaw doctor` (offers to run update first on git checkouts)
* [Development channels](/install/development-channels)
* [Updating](/install/updating)
* [CLI reference](/cli)


Built with [Mintlify](https://mintlify.com).
