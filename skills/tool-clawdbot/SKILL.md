---
name: tool-clawdbot
description: "Help users install, configure, and operate Clawdbot (gateway, channels, nodes, plugins). Use when answering Clawdbot setup/debug questions; use the local docs snapshot under tool-clawdbot/references/docs/ as the source of truth. Triggers: clawdbot, clawd, clawdhub, gateway, onboard, channels login, whatsapp, telegram, discord, mattermost, pairing, nodes, sandboxing, tailscale."
---

# Clawdbot Expert

Goal: answer Clawdbot install/config/ops questions using the bundled docs snapshot under `tool-clawdbot/references/docs/`.

Default assumption: the snapshot is the source of truth. Do not guess command flags or config keys.

## Inputs / I-O Contract (Required)

Reads (primary):

- `tool-clawdbot/references/docs/**` (offline mirror of `https://docs.clawd.bot/*.md`)
- `tool-clawdbot/references/entrypoints.md` (curated map)
- `tool-clawdbot/references/troubleshooting.md` (routing/playbook)

Writes:

- None by default.
- If refreshing the snapshot: `tool-clawdbot/references/docs/**` + `tool-clawdbot/references/docs/INDEX.md` + `tool-clawdbot/references/docs/llms.txt`

## Process (Required)

1) Triage the question into one area:

- install / onboarding
- gateway
- channel (whatsapp/telegram/discord/mattermost/imessage)
- nodes / web surfaces
- remote access (ssh/tailscale)
- auth / oauth
- sandboxing / tools policy

2) Search the snapshot before responding.

- Prefer searching by the user's exact error string.
- If no error string, search by the specific command/config key.
- Open 1-2 relevant pages and extract the exact command/config fields.

3) Respond using the template below and cite the docs you consulted.

## Safety Notes (Required)

- Never ask for or echo secrets (tokens, API keys). If the user shares config/logs, ask them to redact.
- Be explicit when a step is destructive (resetting sessions/state, deleting a profile). Require confirmation.
- Do not recommend weakening security defaults (auth, sandboxing) unless the docs explicitly say so and you explain trade-offs.

## Search Workflow (Recommended)

Use grep-style search first; do not read the entire snapshot.

Examples (regex search over Markdown):

- Search by error text:
  - pattern: the exact error line (escape regex metacharacters if needed)
  - path: `tool-clawdbot/references/docs`
  - include: `*.md`

- Search by config key:
  - `canvasHost`
  - `allowFrom`
  - `requireMention`
  - `session.mainKey`

- Search by command:
  - `clawdbot onboard`
  - `clawdbot gateway`
  - `clawdbot channels login`
  - `clawdbot doctor`

If you need a page map, start with:

- `tool-clawdbot/references/docs/INDEX.md`

If the snapshot looks stale or missing pages, refresh it (see `tool-clawdbot/references/docs_snapshot.md`).

## Key Entry Points (Snapshot)

- `tool-clawdbot/references/docs/start/getting-started.md`
- `tool-clawdbot/references/docs/start/wizard.md`
- `tool-clawdbot/references/docs/gateway/configuration.md`
- `tool-clawdbot/references/docs/gateway/troubleshooting.md`
- `tool-clawdbot/references/docs/help/troubleshooting.md`

## Output Format (Required)

Answer using this structure:

```
Diagnosis: <1 sentence>

Docs consulted:
- <path 1>
- <path 2>

Steps:
1) <actionable step>
2) <actionable step>

Verify:
- <how to confirm it worked>

If still failing:
- <what exact command output / log / config snippet to ask for>
```

## Updating the Docs Snapshot

To refresh the bundled docs from https://docs.clawd.bot:

```bash
cd skills/tool-clawdbot
./scripts/update.sh
```

Options:
- `--limit N` — Only download first N pages (for testing)
- `--concurrency N` — Parallel downloads (default: 5)

Requires Node.js >= 18.

## Searching Community Skills

Search 565+ community-built Clawdbot skills from awesome-clawdbot-skills:

```bash
cd skills/tool-clawdbot
./scripts/search-skills.sh discord      # Search by keyword
./scripts/search-skills.sh pdf document # Multiple keywords
./scripts/search-skills.sh --list       # List categories
./scripts/search-skills.sh --refresh    # Force refresh cache
```

Install found skills: `npx clawdhub@latest install <skill-slug>`

## Resources

- Curated map into the snapshot: `tool-clawdbot/references/entrypoints.md`
- Troubleshooting playbook: `tool-clawdbot/references/troubleshooting.md`
- Snapshot notes + refresh: `tool-clawdbot/references/docs_snapshot.md`
