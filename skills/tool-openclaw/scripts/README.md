# Scripts (Maintenance / Updates / Operations)

This skill ships with two classes of scripts:

1) **Docs snapshot**: mirror https://docs.openclaw.ai into a local searchable snapshot and generate an index
2) **OpenClaw ops**: auto-update OpenClaw, run local health checks, prune/rotate logs, generate diagnostic bundles, etc.

> The scripts are intentionally conservative by default: they use locks, prevent concurrent runs, and avoid corrupting existing files on failure.

---

## A. Docs Snapshot (Recommended)

### 1) Manual update

```bash
node scripts/update_docs_snapshot.mjs --mode seed
node scripts/update_docs_snapshot.mjs --mode full
node scripts/update_docs_snapshot.mjs --mode index
```

Best-effort localized routing (falls back to English if a page is missing):

```bash
node scripts/update_docs_snapshot.mjs --mode seed --locale zh-CN
```

### 2) Auto-update (scheduled)

- `scripts/autoupdate/docs_snapshot_autoupdate.sh`: runnable wrapper (lock + logs)
- Install a scheduler (pick one):
  - cron: `scripts/autoupdate/install_cron_docs_snapshot.sh`
  - systemd user: `scripts/autoupdate/install_systemd_user_docs_snapshot.sh`
  - launchd (macOS): `scripts/autoupdate/install_launchd_docs_snapshot.sh`
  - Windows Task Scheduler: `scripts/autoupdate/install_schtasks_docs_snapshot.ps1`

---

## B. OpenClaw Auto-Update (Optional)

- `scripts/autoupdate/openclaw_autoupdate.sh`: update OpenClaw (optionally restart)
- Install a scheduler:
  - cron: `scripts/autoupdate/install_cron_openclaw.sh`
  - systemd user: `scripts/autoupdate/install_systemd_user_openclaw.sh`
  - launchd (macOS): `scripts/autoupdate/install_launchd_openclaw.sh`
  - Windows Task Scheduler: `scripts/autoupdate/install_schtasks_openclaw.ps1`

---

## C. Ops Scripts (Optional but Useful)

- `scripts/ops/healthcheck.sh`: minimal healthcheck (ports/processes/basic commands)
- `scripts/ops/diag_bundle.sh`: create a shareable diagnostics bundle (with automatic redaction)
- `scripts/ops/log_prune.sh`: prune/compress logs
- `scripts/ops/backup_state.sh`: backup `~/.openclaw/` (you decide whether to encrypt sensitive data)
- `scripts/ops/security_audit.sh`: quick scan for high-risk config (read-only)
