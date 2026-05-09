<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/install/clawdock.md; fetched_at=2026-04-04T20:36:06.791Z; sha256=26000c159ed94bf30282ab53d45ebbe91f6fc49dd4e7f17808a9b932bfbe0dc1; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# ClawDock

# ClawDock

ClawDock is a small shell-helper layer for Docker-based OpenClaw installs.

It gives you short commands like `clawdock-start`, `clawdock-dashboard`, and `clawdock-fix-token` instead of longer `docker compose ...` invocations.

If you have not set up Docker yet, start with [Docker](/install/docker).

## Install

Use the canonical helper path:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
mkdir -p ~/.clawdock && curl -sL https://raw.githubusercontent.com/openclaw/openclaw/main/scripts/clawdock/clawdock-helpers.sh -o ~/.clawdock/clawdock-helpers.sh
echo 'source ~/.clawdock/clawdock-helpers.sh' >> ~/.zshrc && source ~/.zshrc
```

If you previously installed ClawDock from `scripts/shell-helpers/clawdock-helpers.sh`, reinstall from the new `scripts/clawdock/clawdock-helpers.sh` path. The old raw GitHub path was removed.

## What you get

### Basic operations

| Command            | Description            |
| ------------------ | ---------------------- |
| `clawdock-start`   | Start the gateway      |
| `clawdock-stop`    | Stop the gateway       |
| `clawdock-restart` | Restart the gateway    |
| `clawdock-status`  | Check container status |
| `clawdock-logs`    | Follow gateway logs    |

### Container access

| Command                   | Description                                   |
| ------------------------- | --------------------------------------------- |
| `clawdock-shell`          | Open a shell inside the gateway container     |
| `clawdock-cli <command>`  | Run OpenClaw CLI commands in Docker           |
| `clawdock-exec <command>` | Execute an arbitrary command in the container |

### Web UI and pairing

| Command                 | Description                  |
| ----------------------- | ---------------------------- |
| `clawdock-dashboard`    | Open the Control UI URL      |
| `clawdock-devices`      | List pending device pairings |
| `clawdock-approve <id>` | Approve a pairing request    |

### Setup and maintenance

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `clawdock-fix-token` | Configure the gateway token inside the container |
| `clawdock-update`    | Pull, rebuild, and restart                       |
| `clawdock-rebuild`   | Rebuild the Docker image only                    |
| `clawdock-clean`     | Remove containers and volumes                    |

### Utilities

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `clawdock-health`      | Run a gateway health check              |
| `clawdock-token`       | Print the gateway token                 |
| `clawdock-cd`          | Jump to the OpenClaw project directory  |
| `clawdock-config`      | Open `~/.openclaw`                      |
| `clawdock-show-config` | Print config files with redacted values |
| `clawdock-workspace`   | Open the workspace directory            |

## First-time flow

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
clawdock-start
clawdock-fix-token
clawdock-dashboard
```

If the browser says pairing is required:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
clawdock-devices
clawdock-approve <request-id>
```

## Config and secrets

ClawDock works with the same Docker config split described in [Docker](/install/docker):

* `<project>/.env` for Docker-specific values like image name, ports, and the gateway token
* `~/.openclaw/.env` for env-backed provider keys and bot tokens
* `~/.openclaw/agents/<agentId>/agent/auth-profiles.json` for stored provider OAuth/API-key auth
* `~/.openclaw/openclaw.json` for behavior config

Use `clawdock-show-config` when you want to inspect the `.env` files and `openclaw.json` quickly. It redacts `.env` values in its printed output.

## Related pages

* [Docker](/install/docker)
* [Docker VM Runtime](/install/docker-vm-runtime)
* [Updating](/install/updating)


Built with [Mintlify](https://mintlify.com).
