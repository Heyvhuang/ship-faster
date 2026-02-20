<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/cron.md; fetched_at=2026-02-20T10:29:14.838Z; sha256=f74188a0dd99e9f6d3d985df18724743b15e0a9d443b2386b8e1d74aaa5648b2; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# cron

# `openclaw cron`

Manage cron jobs for the Gateway scheduler.

Related:

* Cron jobs: [Cron jobs](/automation/cron-jobs)

Tip: run `openclaw cron --help` for the full command surface.

Note: isolated `cron add` jobs default to `--announce` delivery. Use `--no-deliver` to keep
output internal. `--deliver` remains as a deprecated alias for `--announce`.

Note: one-shot (`--at`) jobs delete after success by default. Use `--keep-after-run` to keep them.

Note: recurring jobs now use exponential retry backoff after consecutive errors (30s → 1m → 5m → 15m → 60m), then return to normal schedule after the next successful run.

## Common edits

Update delivery settings without changing the message:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw cron edit <job-id> --announce --channel telegram --to "123456789"
```

Disable delivery for an isolated job:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw cron edit <job-id> --no-deliver
```

Announce to a specific channel:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw cron edit <job-id> --announce --channel slack --to "channel:C1234567890"
```
