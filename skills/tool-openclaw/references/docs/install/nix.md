<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/install/nix.md; fetched_at=2026-04-04T20:36:06.948Z; sha256=1e69b028bda6aac4a3421ad60c694f57644de5e2a575a139623b5780ef3bcf9c; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Nix

# Nix Installation

Install OpenClaw declaratively with **[nix-openclaw](https://github.com/openclaw/nix-openclaw)** -- a batteries-included Home Manager module.

<Info>
  The [nix-openclaw](https://github.com/openclaw/nix-openclaw) repo is the source of truth for Nix installation. This page is a quick overview.
</Info>

## What You Get

* Gateway + macOS app + tools (whisper, spotify, cameras) -- all pinned
* Launchd service that survives reboots
* Plugin system with declarative config
* Instant rollback: `home-manager switch --rollback`

## Quick Start

<Steps>
  <Step title="Install Determinate Nix">
    If Nix is not already installed, follow the [Determinate Nix installer](https://github.com/DeterminateSystems/nix-installer) instructions.
  </Step>

  <Step title="Create a local flake">
    Use the agent-first template from the nix-openclaw repo:

    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    mkdir -p ~/code/openclaw-local
    # Copy templates/agent-first/flake.nix from the nix-openclaw repo
    ```
  </Step>

  <Step title="Configure secrets">
    Set up your messaging bot token and model provider API key. Plain files at `~/.secrets/` work fine.
  </Step>

  <Step title="Fill in template placeholders and switch">
    ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    home-manager switch
    ```
  </Step>

  <Step title="Verify">
    Confirm the launchd service is running and your bot responds to messages.
  </Step>
</Steps>

See the [nix-openclaw README](https://github.com/openclaw/nix-openclaw) for full module options and examples.

## Nix Mode Runtime Behavior

When `OPENCLAW_NIX_MODE=1` is set (automatic with nix-openclaw), OpenClaw enters a deterministic mode that disables auto-install flows.

You can also set it manually:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
export OPENCLAW_NIX_MODE=1
```

On macOS, the GUI app does not automatically inherit shell environment variables. Enable Nix mode via defaults instead:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
defaults write ai.openclaw.mac openclaw.nixMode -bool true
```

### What changes in Nix mode

* Auto-install and self-mutation flows are disabled
* Missing dependencies surface Nix-specific remediation messages
* UI surfaces a read-only Nix mode banner

### Config and state paths

OpenClaw reads JSON5 config from `OPENCLAW_CONFIG_PATH` and stores mutable data in `OPENCLAW_STATE_DIR`. When running under Nix, set these explicitly to Nix-managed locations so runtime state and config stay out of the immutable store.

| Variable               | Default                                 |
| ---------------------- | --------------------------------------- |
| `OPENCLAW_HOME`        | `HOME` / `USERPROFILE` / `os.homedir()` |
| `OPENCLAW_STATE_DIR`   | `~/.openclaw`                           |
| `OPENCLAW_CONFIG_PATH` | `$OPENCLAW_STATE_DIR/openclaw.json`     |

## Related

* [nix-openclaw](https://github.com/openclaw/nix-openclaw) -- full setup guide
* [Wizard](/start/wizard) -- non-Nix CLI setup
* [Docker](/install/docker) -- containerized setup


Built with [Mintlify](https://mintlify.com).
