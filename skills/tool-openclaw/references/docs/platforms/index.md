> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Platforms

# Platforms

OpenClaw core is written in TypeScript. **Node is the recommended runtime**.
Bun is not recommended for the Gateway (WhatsApp/Telegram bugs).

Companion apps exist for macOS (menu bar app) and mobile nodes (iOS/Android). Windows and
Linux companion apps are planned, but the Gateway is fully supported today.
Native companion apps for Windows are also planned; the Gateway is recommended via WSL2.

## Choose your OS

* macOS: [macOS](/platforms/macos)
* iOS: [iOS](/platforms/ios)
* Android: [Android](/platforms/android)
* Windows: [Windows](/platforms/windows)
* Linux: [Linux](/platforms/linux)

## VPS & hosting

* VPS hub: [VPS hosting](/vps)
* Fly.io: [Fly.io](/platforms/fly)
* Hetzner (Docker): [Hetzner](/platforms/hetzner)
* GCP (Compute Engine): [GCP](/platforms/gcp)
* exe.dev (VM + HTTPS proxy): [exe.dev](/platforms/exe-dev)

## Common links

* Install guide: [Getting Started](/start/getting-started)
* Gateway runbook: [Gateway](/gateway)
* Gateway configuration: [Configuration](/gateway/configuration)
* Service status: `openclaw gateway status`

## Gateway service install (CLI)

Use one of these (all supported):

* Wizard (recommended): `openclaw onboard --install-daemon`
* Direct: `openclaw gateway install`
* Configure flow: `openclaw configure` → select **Gateway service**
* Repair/migrate: `openclaw doctor` (offers to install or fix the service)

The service target depends on OS:

* macOS: LaunchAgent (`bot.molt.gateway` or `bot.molt.<profile>`; legacy `com.openclaw.*`)
* Linux/WSL2: systemd user service (`openclaw-gateway[-<profile>].service`)
