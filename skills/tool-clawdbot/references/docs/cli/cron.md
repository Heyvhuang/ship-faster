> ## Documentation Index
> Fetch the complete documentation index at: https://docs.clawd.bot/llms.txt
> Use this file to discover all available pages before exploring further.

# null

# `clawdbot cron`

Manage cron jobs for the Gateway scheduler.

Related:

* Cron jobs: [Cron jobs](/automation/cron-jobs)

Tip: run `clawdbot cron --help` for the full command surface.

## Common edits

Update delivery settings without changing the message:

```bash  theme={null}
clawdbot cron edit <job-id> --deliver --channel telegram --to "123456789"
```

Disable delivery for an isolated job:

```bash  theme={null}
clawdbot cron edit <job-id> --no-deliver
```
