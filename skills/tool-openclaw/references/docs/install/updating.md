<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/install/updating.md; fetched_at=2026-04-04T20:36:07.032Z; sha256=eae2dc0f82f823463afff54d0bcf6db1adc6bafeb50aadceae9792bb7fb4f411; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Updating

# Updating

Keep OpenClaw up to date.

## Recommended: `openclaw update`

The fastest way to update. It detects your install type (npm or git), fetches the latest version, runs `openclaw doctor`, and restarts the gateway.

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw update
```

To switch channels or target a specific version:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw update --channel beta
openclaw update --tag main
openclaw update --dry-run   # preview without applying
```

`--channel beta` prefers beta, but the runtime falls back to stable/latest when
the beta tag is missing or older than the latest stable release. Use `--tag beta`
if you want the raw npm beta dist-tag for a one-off package update.

See [Development channels](/install/development-channels) for channel semantics.

## Alternative: re-run the installer

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
curl -fsSL https://openclaw.ai/install.sh | bash
```

Add `--no-onboard` to skip onboarding. For source installs, pass `--install-method git --no-onboard`.

## Alternative: manual npm, pnpm, or bun

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
npm i -g openclaw@latest
```

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
pnpm add -g openclaw@latest
```

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
bun add -g openclaw@latest
```

## Auto-updater

The auto-updater is off by default. Enable it in `~/.openclaw/openclaw.json`:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  update: {
    channel: "stable",
    auto: {
      enabled: true,
      stableDelayHours: 6,
      stableJitterHours: 12,
      betaCheckIntervalHours: 1,
    },
  },
}
```

| Channel  | Behavior                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| `stable` | Waits `stableDelayHours`, then applies with deterministic jitter across `stableJitterHours` (spread rollout). |
| `beta`   | Checks every `betaCheckIntervalHours` (default: hourly) and applies immediately.                              |
| `dev`    | No automatic apply. Use `openclaw update` manually.                                                           |

The gateway also logs an update hint on startup (disable with `update.checkOnStart: false`).

## After updating

<Steps>
  ### Run doctor

  ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
  openclaw doctor
  ```

  Migrates config, audits DM policies, and checks gateway health. Details: [Doctor](/gateway/doctor)

  ### Restart the gateway

  ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
  openclaw gateway restart
  ```

  ### Verify

  ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
  openclaw health
  ```
</Steps>

## Rollback

### Pin a version (npm)

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
npm i -g openclaw@<version>
openclaw doctor
openclaw gateway restart
```

Tip: `npm view openclaw version` shows the current published version.

### Pin a commit (source)

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
git fetch origin
git checkout "$(git rev-list -n 1 --before=\"2026-01-01\" origin/main)"
pnpm install && pnpm build
openclaw gateway restart
```

To return to latest: `git checkout main && git pull`.

## If you are stuck

* Run `openclaw doctor` again and read the output carefully.
* Check: [Troubleshooting](/gateway/troubleshooting)
* Ask in Discord: [https://discord.gg/clawd](https://discord.gg/clawd)

## Related

* [Install Overview](/install) — all installation methods
* [Doctor](/gateway/doctor) — health checks after updates
* [Migrating](/install/migrating) — major version migration guides


Built with [Mintlify](https://mintlify.com).
