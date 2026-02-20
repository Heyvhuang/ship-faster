<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/logs.md; fetched_at=2026-02-20T10:29:15.392Z; sha256=fb0a0c942cb6357efc8ea15c05efeb9a9a5c24babff343ea13f209a1ec81532e; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# logs

# `openclaw logs`

Tail Gateway file logs over RPC (works in remote mode).

Related:

* Logging overview: [Logging](/logging)

## Examples

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw logs
openclaw logs --follow
openclaw logs --json
openclaw logs --limit 500
openclaw logs --local-time
openclaw logs --follow --local-time
```

Use `--local-time` to render timestamps in your local timezone.
