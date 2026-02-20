<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/automation/troubleshooting.md; fetched_at=2026-02-20T10:29:12.589Z; sha256=d22146d89604376128218c427f740a7fb37a94562a220691875606542d2aa00b; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Automation Troubleshooting

# Automation troubleshooting

Use this page for scheduler and delivery issues (`cron` + `heartbeat`).

## Command ladder

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw status
openclaw gateway status
openclaw logs --follow
openclaw doctor
openclaw channels status --probe
```

Then run automation checks:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw cron status
openclaw cron list
openclaw system heartbeat last
```

## Cron not firing

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw cron status
openclaw cron list
openclaw cron runs --id <jobId> --limit 20
openclaw logs --follow
```

Good output looks like:

* `cron status` reports enabled and a future `nextWakeAtMs`.
* Job is enabled and has a valid schedule/timezone.
* `cron runs` shows `ok` or explicit skip reason.

Common signatures:

* `cron: scheduler disabled; jobs will not run automatically` → cron disabled in config/env.
* `cron: timer tick failed` → scheduler tick crashed; inspect surrounding stack/log context.
* `reason: not-due` in run output → manual run called without `--force` and job not due yet.

## Cron fired but no delivery

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw cron runs --id <jobId> --limit 20
openclaw cron list
openclaw channels status --probe
openclaw logs --follow
```

Good output looks like:

* Run status is `ok`.
* Delivery mode/target are set for isolated jobs.
* Channel probe reports target channel connected.

Common signatures:

* Run succeeded but delivery mode is `none` → no external message is expected.
* Delivery target missing/invalid (`channel`/`to`) → run may succeed internally but skip outbound.
* Channel auth errors (`unauthorized`, `missing_scope`, `Forbidden`) → delivery blocked by channel credentials/permissions.

## Heartbeat suppressed or skipped

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw system heartbeat last
openclaw logs --follow
openclaw config get agents.defaults.heartbeat
openclaw channels status --probe
```

Good output looks like:

* Heartbeat enabled with non-zero interval.
* Last heartbeat result is `ran` (or skip reason is understood).

Common signatures:

* `heartbeat skipped` with `reason=quiet-hours` → outside `activeHours`.
* `requests-in-flight` → main lane busy; heartbeat deferred.
* `empty-heartbeat-file` → interval heartbeat skipped because `HEARTBEAT.md` has no actionable content and no tagged cron event is queued.
* `alerts-disabled` → visibility settings suppress outbound heartbeat messages.

## Timezone and activeHours gotchas

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw config get agents.defaults.heartbeat.activeHours
openclaw config get agents.defaults.heartbeat.activeHours.timezone
openclaw config get agents.defaults.userTimezone || echo "agents.defaults.userTimezone not set"
openclaw cron list
openclaw logs --follow
```

Quick rules:

* `Config path not found: agents.defaults.userTimezone` means the key is unset; heartbeat falls back to host timezone (or `activeHours.timezone` if set).
* Cron without `--tz` uses gateway host timezone.
* Heartbeat `activeHours` uses configured timezone resolution (`user`, `local`, or explicit IANA tz).
* ISO timestamps without timezone are treated as UTC for cron `at` schedules.

Common signatures:

* Jobs run at the wrong wall-clock time after host timezone changes.
* Heartbeat always skipped during your daytime because `activeHours.timezone` is wrong.

Related:

* [/automation/cron-jobs](/automation/cron-jobs)
* [/gateway/heartbeat](/gateway/heartbeat)
* [/automation/cron-vs-heartbeat](/automation/cron-vs-heartbeat)
* [/concepts/timezone](/concepts/timezone)
