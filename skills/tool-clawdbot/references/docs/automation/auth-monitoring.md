> ## Documentation Index
> Fetch the complete documentation index at: https://docs.clawd.bot/llms.txt
> Use this file to discover all available pages before exploring further.

# null

# Auth monitoring

Clawdbot exposes OAuth expiry health via `clawdbot models status`. Use that for
automation and alerting; scripts are optional extras for phone workflows.

## Preferred: CLI check (portable)

```bash  theme={null}
clawdbot models status --check
```

Exit codes:

* `0`: OK
* `1`: expired or missing credentials
* `2`: expiring soon (within 24h)

This works in cron/systemd and requires no extra scripts.

## Optional scripts (ops / phone workflows)

These live under `scripts/` and are **optional**. They assume SSH access to the
gateway host and are tuned for systemd + Termux.

* `scripts/claude-auth-status.sh` now uses `clawdbot models status --json` as the
  source of truth (falling back to direct file reads if the CLI is unavailable),
  so keep `clawdbot` on `PATH` for timers.
* `scripts/auth-monitor.sh`: cron/systemd timer target; sends alerts (ntfy or phone).
* `scripts/systemd/clawdbot-auth-monitor.{service,timer}`: systemd user timer.
* `scripts/claude-auth-status.sh`: Claude Code + Clawdbot auth checker (full/json/simple).
* `scripts/mobile-reauth.sh`: guided re‑auth flow over SSH.
* `scripts/termux-quick-auth.sh`: one‑tap widget status + open auth URL.
* `scripts/termux-auth-widget.sh`: full guided widget flow.
* `scripts/termux-sync-widget.sh`: sync Claude Code creds → Clawdbot.

If you don’t need phone automation or systemd timers, skip these scripts.
