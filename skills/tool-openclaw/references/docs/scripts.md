> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Scripts

# Scripts

The `scripts/` directory contains helper scripts for local workflows and ops tasks.
Use these when a task is clearly tied to a script; otherwise prefer the CLI.

## Conventions

* Scripts are **optional** unless referenced in docs or release checklists.
* Prefer CLI surfaces when they exist (example: auth monitoring uses `openclaw models status --check`).
* Assume scripts are host‑specific; read them before running on a new machine.

## Auth monitoring scripts

Auth monitoring scripts are documented here:
[/automation/auth-monitoring](/automation/auth-monitoring)

## When adding scripts

* Keep scripts focused and documented.
* Add a short entry in the relevant doc (or create one if missing).
