<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/agent.md; fetched_at=2026-02-20T10:29:14.324Z; sha256=17083edd128b7944178fb441e21cb349c4690723f06682a3b4701684c6ce3a4d; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# agent

# `openclaw agent`

Run an agent turn via the Gateway (use `--local` for embedded).
Use `--agent <id>` to target a configured agent directly.

Related:

* Agent send tool: [Agent send](/tools/agent-send)

## Examples

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw agent --to +15555550123 --message "status update" --deliver
openclaw agent --agent ops --message "Summarize logs"
openclaw agent --session-id 1234 --message "Summarize inbox" --thinking medium
openclaw agent --agent ops --message "Generate report" --deliver --reply-channel slack --reply-to "#reports"
```
