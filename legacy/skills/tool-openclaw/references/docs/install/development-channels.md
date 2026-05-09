<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/install/development-channels.md; fetched_at=2026-04-04T20:36:06.811Z; sha256=c655c9e5a48165710e89bdf3a3deaa4e809c701c77bcbe4ef2265da385433fdd; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Release Channels

# Development channels

OpenClaw ships three update channels:

* **stable**: npm dist-tag `latest`. Recommended for most users.
* **beta**: npm dist-tag `beta` when it is current; if beta is missing or older than
  the latest stable release, the update flow falls back to `latest`.
* **dev**: moving head of `main` (git). npm dist-tag: `dev` (when published).
  The `main` branch is for experimentation and active development. It may contain
  incomplete features or breaking changes. Do not use it for production gateways.

We usually ship stable builds to **beta** first, test them there, then run an
explicit promotion step that moves the vetted build to `latest` without
changing the version number. Maintainers can also publish a stable release
directly to `latest` when needed. Dist-tags are the source of truth for npm
installs.

## Switching channels

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw update --channel stable
openclaw update --channel beta
openclaw update --channel dev
```

`--channel` persists your choice in config (`update.channel`) and aligns the
install method:

* **`stable`** (package installs): updates via npm dist-tag `latest`.
* **`beta`** (package installs): prefers npm dist-tag `beta`, but falls back to
  `latest` when `beta` is missing or older than the current stable tag.
* **`stable`** (git installs): checks out the latest stable git tag.
* **`beta`** (git installs): prefers the latest beta git tag, but falls back to
  the latest stable git tag when beta is missing or older.
* **`dev`**: ensures a git checkout (default `~/openclaw`, override with
  `OPENCLAW_GIT_DIR`), switches to `main`, rebases on upstream, builds, and
  installs the global CLI from that checkout.

Tip: if you want stable + dev in parallel, keep two clones and point your
gateway at the stable one.

## One-off version or tag targeting

Use `--tag` to target a specific dist-tag, version, or package spec for a single
update **without** changing your persisted channel:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
# Install a specific version
openclaw update --tag 2026.4.1-beta.1

# Install from the beta dist-tag (one-off, does not persist)
openclaw update --tag beta

# Install from GitHub main branch (npm tarball)
openclaw update --tag main

# Install a specific npm package spec
openclaw update --tag openclaw@2026.4.1-beta.1
```

Notes:

* `--tag` applies to **package (npm) installs only**. Git installs ignore it.
* The tag is not persisted. Your next `openclaw update` uses your configured
  channel as usual.
* Downgrade protection: if the target version is older than your current version,
  OpenClaw prompts for confirmation (skip with `--yes`).
* `--channel beta` is different from `--tag beta`: the channel flow can fall back
  to stable/latest when beta is missing or older, while `--tag beta` targets the
  raw `beta` dist-tag for that one run.

## Dry run

Preview what `openclaw update` would do without making changes:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw update --dry-run
openclaw update --channel beta --dry-run
openclaw update --tag 2026.4.1-beta.1 --dry-run
openclaw update --dry-run --json
```

The dry run shows the effective channel, target version, planned actions, and
whether a downgrade confirmation would be required.

## Plugins and channels

When you switch channels with `openclaw update`, OpenClaw also syncs plugin
sources:

* `dev` prefers bundled plugins from the git checkout.
* `stable` and `beta` restore npm-installed plugin packages.
* npm-installed plugins are updated after the core update completes.

## Checking current status

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw update status
```

Shows the active channel, install kind (git or package), current version, and
source (config, git tag, git branch, or default).

## Tagging best practices

* Tag releases you want git checkouts to land on (`vYYYY.M.D` for stable,
  `vYYYY.M.D-beta.N` for beta).
* `vYYYY.M.D.beta.N` is also recognized for compatibility, but prefer `-beta.N`.
* Legacy `vYYYY.M.D-<patch>` tags are still recognized as stable (non-beta).
* Keep tags immutable: never move or reuse a tag.
* npm dist-tags remain the source of truth for npm installs:
  * `latest` -> stable
  * `beta` -> candidate build or beta-first stable build
  * `dev` -> main snapshot (optional)

## macOS app availability

Beta and dev builds may **not** include a macOS app release. That is OK:

* The git tag and npm dist-tag can still be published.
* Call out "no macOS build for this beta" in release notes or changelog.


Built with [Mintlify](https://mintlify.com).
