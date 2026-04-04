<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/diagnostics/flags.md; fetched_at=2026-04-04T20:36:06.423Z; sha256=e3fcaea15d1ca748d94a88c068bfc58d1fadbefe9cc91d6a9ac5442b9f8ada6a; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Diagnostics Flags

# Diagnostics Flags

Diagnostics flags let you enable targeted debug logs without turning on verbose logging everywhere. Flags are opt-in and have no effect unless a subsystem checks them.

## How it works

* Flags are strings (case-insensitive).
* You can enable flags in config or via an env override.
* Wildcards are supported:
  * `telegram.*` matches `telegram.http`
  * `*` enables all flags

## Enable via config

```json  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  "diagnostics": {
    "flags": ["telegram.http"]
  }
}
```

Multiple flags:

```json  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  "diagnostics": {
    "flags": ["telegram.http", "gateway.*"]
  }
}
```

Restart the gateway after changing flags.

## Env override (one-off)

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
OPENCLAW_DIAGNOSTICS=telegram.http,telegram.payload
```

Disable all flags:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
OPENCLAW_DIAGNOSTICS=0
```

## Where logs go

Flags emit logs into the standard diagnostics log file. By default:

```
/tmp/openclaw/openclaw-YYYY-MM-DD.log
```

If you set `logging.file`, use that path instead. Logs are JSONL (one JSON object per line). Redaction still applies based on `logging.redactSensitive`.

## Extract logs

Pick the latest log file:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
ls -t /tmp/openclaw/openclaw-*.log | head -n 1
```

Filter for Telegram HTTP diagnostics:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
rg "telegram http error" /tmp/openclaw/openclaw-*.log
```

Or tail while reproducing:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
tail -f /tmp/openclaw/openclaw-$(date +%F).log | rg "telegram http error"
```

For remote gateways, you can also use `openclaw logs --follow` (see [/cli/logs](/cli/logs)).

## Notes

* If `logging.level` is set higher than `warn`, these logs may be suppressed. Default `info` is fine.
* Flags are safe to leave enabled; they only affect log volume for the specific subsystem.
* Use [/logging](/logging) to change log destinations, levels, and redaction.


Built with [Mintlify](https://mintlify.com).
