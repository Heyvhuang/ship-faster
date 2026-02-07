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

## Common edits

Update delivery settings without changing the message:

```bash  theme={null}
openclaw cron edit <job-id> --announce --channel telegram --to "123456789"
```

Disable delivery for an isolated job:

```bash  theme={null}
openclaw cron edit <job-id> --no-deliver
```

Announce to a specific channel:

```bash  theme={null}
openclaw cron edit <job-id> --announce --channel slack --to "channel:C1234567890"
```
