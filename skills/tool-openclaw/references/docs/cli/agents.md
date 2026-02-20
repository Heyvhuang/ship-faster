<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/agents.md; fetched_at=2026-02-20T10:29:14.573Z; sha256=a645954f37a1d1b5cad50ea9897529cf026130ea07a503b3d180e34cf2a50329; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# agents

# `openclaw agents`

Manage isolated agents (workspaces + auth + routing).

Related:

* Multi-agent routing: [Multi-Agent Routing](/concepts/multi-agent)
* Agent workspace: [Agent workspace](/concepts/agent-workspace)

## Examples

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw agents list
openclaw agents add work --workspace ~/.openclaw/workspace-work
openclaw agents set-identity --workspace ~/.openclaw/workspace --from-identity
openclaw agents set-identity --agent main --avatar avatars/openclaw.png
openclaw agents delete work
```

## Identity files

Each agent workspace can include an `IDENTITY.md` at the workspace root:

* Example path: `~/.openclaw/workspace/IDENTITY.md`
* `set-identity --from-identity` reads from the workspace root (or an explicit `--identity-file`)

Avatar paths resolve relative to the workspace root.

## Set identity

`set-identity` writes fields into `agents.list[].identity`:

* `name`
* `theme`
* `emoji`
* `avatar` (workspace-relative path, http(s) URL, or data URI)

Load from `IDENTITY.md`:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw agents set-identity --workspace ~/.openclaw/workspace --from-identity
```

Override fields explicitly:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw agents set-identity --agent main --name "OpenClaw" --emoji "🦞" --avatar avatars/openclaw.png
```

Config sample:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  agents: {
    list: [
      {
        id: "main",
        identity: {
          name: "OpenClaw",
          theme: "space lobster",
          emoji: "🦞",
          avatar: "avatars/openclaw.png",
        },
      },
    ],
  },
}
```
