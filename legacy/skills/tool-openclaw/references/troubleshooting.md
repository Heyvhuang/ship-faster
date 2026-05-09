# OpenClaw Troubleshooting Playbook

Use the snapshot as the source of truth, and prefer documented commands.

## First checks

- Confirm what environment: OS, install method (npm/pnpm/git/docker/nix), and whether a gateway service is installed.
- Find the relevant doc page first:
  - `references/docs/help/troubleshooting.md`
  - `references/docs/gateway/troubleshooting.md`
  - `references/docs/channels/troubleshooting.md`
  - `references/docs/cli/doctor.md`
  - `references/docs/cli/logs.md`

## Common issues to route

- "Dashboard won't open": check gateway running + bind/port + remote access docs.
- "WhatsApp login / QR issues": route to WhatsApp channel docs + channel troubleshooting.
- "Remote access": route to `gateway/remote.md` and `gateway/tailscale.md`.
- "Token/auth problems": route to `gateway/authentication.md` and `concepts/oauth.md`.
- "Multi-agent/sandbox confusion": route to `gateway/sandboxing.md` and `concepts/multi-agent.md`.

## When you need more precision

- Ask for the exact command run and the full error text.
- Ask for the relevant config snippet (redact secrets).
- Then search the snapshot for the error string and read the most relevant page.
