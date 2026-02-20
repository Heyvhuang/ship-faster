<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/platforms/mac/health.md; fetched_at=2026-02-20T10:29:24.319Z; sha256=179737e2589cd0d2701ae19d9a16594c804f3294aef491c943124502e53a5205; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Health Checks

# Health Checks on macOS

How to see whether the linked channel is healthy from the menu bar app.

## Menu bar

* Status dot now reflects Baileys health:
  * Green: linked + socket opened recently.
  * Orange: connecting/retrying.
  * Red: logged out or probe failed.
* Secondary line reads "linked · auth 12m" or shows the failure reason.
* "Run Health Check" menu item triggers an on-demand probe.

## Settings

* General tab gains a Health card showing: linked auth age, session-store path/count, last check time, last error/status code, and buttons for Run Health Check / Reveal Logs.
* Uses a cached snapshot so the UI loads instantly and falls back gracefully when offline.
* **Channels tab** surfaces channel status + controls for WhatsApp/Telegram (login QR, logout, probe, last disconnect/error).

## How the probe works

* App runs `openclaw health --json` via `ShellExecutor` every \~60s and on demand. The probe loads creds and reports status without sending messages.
* Cache the last good snapshot and the last error separately to avoid flicker; show the timestamp of each.

## When in doubt

* You can still use the CLI flow in [Gateway health](/gateway/health) (`openclaw status`, `openclaw status --deep`, `openclaw health --json`) and tail `/tmp/openclaw/openclaw-*.log` for `web-heartbeat` / `web-reconnect`.
