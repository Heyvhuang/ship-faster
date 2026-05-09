<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/completion.md; fetched_at=2026-04-04T20:36:05.731Z; sha256=ba8a3074d83941a7016b647181f711f4baa75aa26849ba9d88da20fc1a424ee7; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# completion

# `openclaw completion`

Generate shell completion scripts and optionally install them into your shell profile.

## Usage

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw completion
openclaw completion --shell zsh
openclaw completion --install
openclaw completion --shell fish --install
openclaw completion --write-state
openclaw completion --shell bash --write-state
```

## Options

* `-s, --shell <shell>`: shell target (`zsh`, `bash`, `powershell`, `fish`; default: `zsh`)
* `-i, --install`: install completion by adding a source line to your shell profile
* `--write-state`: write completion script(s) to `$OPENCLAW_STATE_DIR/completions` without printing to stdout
* `-y, --yes`: skip install confirmation prompts

## Notes

* `--install` writes a small "OpenClaw Completion" block into your shell profile and points it at the cached script.
* Without `--install` or `--write-state`, the command prints the script to stdout.
* Completion generation eagerly loads command trees so nested subcommands are included.


Built with [Mintlify](https://mintlify.com).
