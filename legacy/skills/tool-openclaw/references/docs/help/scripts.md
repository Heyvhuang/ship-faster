<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/help/scripts.md; fetched_at=2026-04-04T20:36:06.738Z; sha256=5edd1f6a6ca4823edb7a708e4a0e98fd3937da4392a8acd27da4032423107973; content_type=text/markdown; charset=utf-8; status=ok -->

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

Auth monitoring is covered in [Authentication](/gateway/authentication). The scripts under `scripts/` are optional extras for systemd/Termux phone workflows.

## When adding scripts

* Keep scripts focused and documented.
* Add a short entry in the relevant doc (or create one if missing).


Built with [Mintlify](https://mintlify.com).
