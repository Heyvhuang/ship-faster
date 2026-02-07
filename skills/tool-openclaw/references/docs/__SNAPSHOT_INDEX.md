# OpenClaw Docs Snapshot Index

Generated: `2026-02-07T23:52:37.848Z`
Snapshot root: `references/docs/`

## Quick Routing (Start Here)

> Rule: use keywords to map the problem to one category, then open the 1-3 most relevant files. Do not skim dozens of pages.

- **Install / onboarding / pairing** → `start/getting-started.md`, `start/setup.md`, `start/pairing.md`, `install/index.md`
- **Updates / upgrade channels** → `install/updating.md`, `install/development-channels.md`, `cli/update.md`
- **Not sure how to use a CLI command** → `cli/index.md` + open `cli/<command>.md`
- **Gateway config / ports / tokens / auth** → `gateway/configuration.md`, `gateway/authentication.md`, `gateway/index.md`
- **Remote access / Tailscale / Bonjour / discovery** → `gateway/remote.md`, `gateway/tailscale.md`, `gateway/discovery.md`
- **Security / sandboxing / elevation** → `gateway/security.md`, `gateway/sandboxing.md`, `gateway/sandbox-vs-tool-policy-vs-elevated.md`
- **Channels (WhatsApp/Telegram/Discord/Slack...)** → `channels/index.md` + `channels/<name>.md` + `channels/troubleshooting.md`
- **Tools (exec/browser/apply_patch/web...)** → `tools/index.md` + `tools/<tool>.md`
- **Providers / config / billing** → `providers/index.md`, `providers/openai.md`, `providers/anthropic.md`, `token-use.md`
- **Troubleshooting** → `help/troubleshooting.md`, `gateway/troubleshooting.md`, `debugging.md`, `cli/logs.md`, `cli/doctor.md`

## Full Directory

### Start / Onboarding

- [Agent Bootstrapping](start/bootstrapping.md) — tags: start, bootstrapping · Remote: https://docs.openclaw.ai/start/bootstrapping.md
- [Docs directory](start/docs-directory.md) — tags: start, docs, directory · Remote: https://docs.openclaw.ai/start/docs-directory.md
- [Getting Started](start/getting-started.md) — tags: start, getting, started · Remote: https://docs.openclaw.ai/start/getting-started.md
- [Docs Hubs](start/hubs.md) — tags: start, hubs · Remote: https://docs.openclaw.ai/start/hubs.md
- [OpenClaw Lore](start/lore.md) — tags: start, lore · Remote: https://docs.openclaw.ai/start/lore.md
- [Onboarding (macOS App)](start/onboarding.md) — tags: start, onboarding · Remote: https://docs.openclaw.ai/start/onboarding.md
- [Personal Assistant Setup](start/openclaw.md) — tags: start, openclaw · Remote: https://docs.openclaw.ai/start/openclaw.md
- [Pairing](start/pairing.md) — tags: start, pairing · Remote: https://docs.openclaw.ai/start/pairing.md
- [Setup](start/setup.md) — tags: start, setup · Remote: https://docs.openclaw.ai/start/setup.md
- [Showcase](start/showcase.md) — tags: start, showcase · Remote: https://docs.openclaw.ai/start/showcase.md
- [CLI Automation](start/wizard-cli-automation.md) — tags: start, wizard, cli, automation · Remote: https://docs.openclaw.ai/start/wizard-cli-automation.md
- [CLI Onboarding Reference](start/wizard-cli-reference.md) — tags: start, wizard, cli, reference · Remote: https://docs.openclaw.ai/start/wizard-cli-reference.md
- [Onboarding Wizard (CLI)](start/wizard.md) — tags: start, wizard · Remote: https://docs.openclaw.ai/start/wizard.md

### Install & Updates

- [Ansible](install/ansible.md) — tags: install, ansible · Remote: https://docs.openclaw.ai/install/ansible.md
- [Bun (Experimental)](install/bun.md) — tags: install, bun · Remote: https://docs.openclaw.ai/install/bun.md
- [Development Channels](install/development-channels.md) — tags: install, development, channels · Remote: https://docs.openclaw.ai/install/development-channels.md
- [Docker](install/docker.md) — tags: install, docker · Remote: https://docs.openclaw.ai/install/docker.md
- [Install Overview](install/index.md) — tags: install · Remote: https://docs.openclaw.ai/install/index.md
- [Installer Internals](install/installer.md) — tags: install, installer · Remote: https://docs.openclaw.ai/install/installer.md
- [Migration Guide](install/migrating.md) — tags: install, migrating · Remote: https://docs.openclaw.ai/install/migrating.md
- [Nix](install/nix.md) — tags: install, nix · Remote: https://docs.openclaw.ai/install/nix.md
- [Node.js + npm (PATH sanity)](install/node.md) — tags: install, node · Remote: https://docs.openclaw.ai/install/node.md
- [Uninstall](install/uninstall.md) — tags: install, uninstall · Remote: https://docs.openclaw.ai/install/uninstall.md
- [Updating](install/updating.md) — tags: install, updating · Remote: https://docs.openclaw.ai/install/updating.md

### CLI Reference

- [acp](cli/acp.md) — tags: cli, acp · Remote: https://docs.openclaw.ai/cli/acp.md
- [agent](cli/agent.md) — tags: cli, agent · Remote: https://docs.openclaw.ai/cli/agent.md
- [agents](cli/agents.md) — tags: cli, agents · Remote: https://docs.openclaw.ai/cli/agents.md
- [approvals](cli/approvals.md) — tags: cli, approvals · Remote: https://docs.openclaw.ai/cli/approvals.md
- [browser](cli/browser.md) — tags: cli, browser · Remote: https://docs.openclaw.ai/cli/browser.md
- [channels](cli/channels.md) — tags: cli, channels · Remote: https://docs.openclaw.ai/cli/channels.md
- [config](cli/config.md) — tags: cli, config · Remote: https://docs.openclaw.ai/cli/config.md
- [configure](cli/configure.md) — tags: cli, configure · Remote: https://docs.openclaw.ai/cli/configure.md
- [cron](cli/cron.md) — tags: cli, cron · Remote: https://docs.openclaw.ai/cli/cron.md
- [dashboard](cli/dashboard.md) — tags: cli, dashboard · Remote: https://docs.openclaw.ai/cli/dashboard.md
- [devices](cli/devices.md) — tags: cli, devices · Remote: https://docs.openclaw.ai/cli/devices.md
- [directory](cli/directory.md) — tags: cli, directory · Remote: https://docs.openclaw.ai/cli/directory.md
- [dns](cli/dns.md) — tags: cli, dns · Remote: https://docs.openclaw.ai/cli/dns.md
- [docs](cli/docs.md) — tags: cli, docs · Remote: https://docs.openclaw.ai/cli/docs.md
- [doctor](cli/doctor.md) — tags: cli, doctor · Remote: https://docs.openclaw.ai/cli/doctor.md
- [gateway](cli/gateway.md) — tags: cli, gateway · Remote: https://docs.openclaw.ai/cli/gateway.md
- [health](cli/health.md) — tags: cli, health · Remote: https://docs.openclaw.ai/cli/health.md
- [hooks](cli/hooks.md) — tags: cli, hooks · Remote: https://docs.openclaw.ai/cli/hooks.md
- [CLI Reference](cli/index.md) — tags: cli · Remote: https://docs.openclaw.ai/cli/index.md
- [logs](cli/logs.md) — tags: cli, logs · Remote: https://docs.openclaw.ai/cli/logs.md
- [memory](cli/memory.md) — tags: cli, memory · Remote: https://docs.openclaw.ai/cli/memory.md
- [message](cli/message.md) — tags: cli, message · Remote: https://docs.openclaw.ai/cli/message.md
- [models](cli/models.md) — tags: cli, models · Remote: https://docs.openclaw.ai/cli/models.md
- [node](cli/node.md) — tags: cli, node · Remote: https://docs.openclaw.ai/cli/node.md
- [nodes](cli/nodes.md) — tags: cli, nodes · Remote: https://docs.openclaw.ai/cli/nodes.md
- [onboard](cli/onboard.md) — tags: cli, onboard · Remote: https://docs.openclaw.ai/cli/onboard.md
- [pairing](cli/pairing.md) — tags: cli, pairing · Remote: https://docs.openclaw.ai/cli/pairing.md
- [plugins](cli/plugins.md) — tags: cli, plugins · Remote: https://docs.openclaw.ai/cli/plugins.md
- [reset](cli/reset.md) — tags: cli, reset · Remote: https://docs.openclaw.ai/cli/reset.md
- [Sandbox CLI](cli/sandbox.md) — tags: cli, sandbox · Remote: https://docs.openclaw.ai/cli/sandbox.md
- [security](cli/security.md) — tags: cli, security · Remote: https://docs.openclaw.ai/cli/security.md
- [sessions](cli/sessions.md) — tags: cli, sessions · Remote: https://docs.openclaw.ai/cli/sessions.md
- [setup](cli/setup.md) — tags: cli, setup · Remote: https://docs.openclaw.ai/cli/setup.md
- [skills](cli/skills.md) — tags: cli, skills · Remote: https://docs.openclaw.ai/cli/skills.md
- [status](cli/status.md) — tags: cli, status · Remote: https://docs.openclaw.ai/cli/status.md
- [system](cli/system.md) — tags: cli, system · Remote: https://docs.openclaw.ai/cli/system.md
- [tui](cli/tui.md) — tags: cli, tui · Remote: https://docs.openclaw.ai/cli/tui.md
- [uninstall](cli/uninstall.md) — tags: cli, uninstall · Remote: https://docs.openclaw.ai/cli/uninstall.md
- [update](cli/update.md) — tags: cli, update · Remote: https://docs.openclaw.ai/cli/update.md
- [voicecall](cli/voicecall.md) — tags: cli, voicecall · Remote: https://docs.openclaw.ai/cli/voicecall.md
- [webhooks](cli/webhooks.md) — tags: cli, webhooks · Remote: https://docs.openclaw.ai/cli/webhooks.md

### Gateway & Ops

- [Authentication](gateway/authentication.md) — tags: gateway, authentication · Remote: https://docs.openclaw.ai/gateway/authentication.md
- [Background Exec and Process Tool](gateway/background-process.md) — tags: gateway, background, process · Remote: https://docs.openclaw.ai/gateway/background-process.md
- [Bonjour Discovery](gateway/bonjour.md) — tags: gateway, bonjour · Remote: https://docs.openclaw.ai/gateway/bonjour.md
- [Bridge Protocol](gateway/bridge-protocol.md) — tags: gateway, bridge, protocol · Remote: https://docs.openclaw.ai/gateway/bridge-protocol.md
- [CLI Backends](gateway/cli-backends.md) — tags: gateway, cli, backends · Remote: https://docs.openclaw.ai/gateway/cli-backends.md
- [Configuration Examples](gateway/configuration-examples.md) — tags: gateway, configuration, examples · Remote: https://docs.openclaw.ai/gateway/configuration-examples.md
- [Configuration](gateway/configuration.md) — tags: gateway, configuration · Remote: https://docs.openclaw.ai/gateway/configuration.md
- [Discovery and Transports](gateway/discovery.md) — tags: gateway, discovery · Remote: https://docs.openclaw.ai/gateway/discovery.md
- [Doctor](gateway/doctor.md) — tags: gateway, doctor · Remote: https://docs.openclaw.ai/gateway/doctor.md
- [Gateway Lock](gateway/gateway-lock.md) — tags: gateway, lock · Remote: https://docs.openclaw.ai/gateway/gateway-lock.md
- [Health Checks](gateway/health.md) — tags: gateway, health · Remote: https://docs.openclaw.ai/gateway/health.md
- [Heartbeat](gateway/heartbeat.md) — tags: gateway, heartbeat · Remote: https://docs.openclaw.ai/gateway/heartbeat.md
- [Gateway Runbook](gateway/index.md) — tags: gateway · Remote: https://docs.openclaw.ai/gateway/index.md
- [Local Models](gateway/local-models.md) — tags: gateway, local, models · Remote: https://docs.openclaw.ai/gateway/local-models.md
- [Logging](gateway/logging.md) — tags: gateway, logging · Remote: https://docs.openclaw.ai/gateway/logging.md
- [Multiple Gateways](gateway/multiple-gateways.md) — tags: gateway, multiple, gateways · Remote: https://docs.openclaw.ai/gateway/multiple-gateways.md
- [Network model](gateway/network-model.md) — tags: gateway, network, model · Remote: https://docs.openclaw.ai/gateway/network-model.md
- [OpenAI Chat Completions](gateway/openai-http-api.md) — tags: gateway, openai, http, api · Remote: https://docs.openclaw.ai/gateway/openai-http-api.md
- [Gateway-Owned Pairing](gateway/pairing.md) — tags: gateway, pairing · Remote: https://docs.openclaw.ai/gateway/pairing.md
- [Gateway Protocol](gateway/protocol.md) — tags: gateway, protocol · Remote: https://docs.openclaw.ai/gateway/protocol.md
- [Remote Gateway Setup](gateway/remote-gateway-readme.md) — tags: gateway, remote, readme · Remote: https://docs.openclaw.ai/gateway/remote-gateway-readme.md
- [Remote Access](gateway/remote.md) — tags: gateway, remote · Remote: https://docs.openclaw.ai/gateway/remote.md
- [Sandbox vs Tool Policy vs Elevated](gateway/sandbox-vs-tool-policy-vs-elevated.md) — tags: gateway, sandbox, vs, tool, policy, elevated · Remote: https://docs.openclaw.ai/gateway/sandbox-vs-tool-policy-vs-elevated.md
- [Sandboxing](gateway/sandboxing.md) — tags: gateway, sandboxing · Remote: https://docs.openclaw.ai/gateway/sandboxing.md
- [Security](gateway/security.md) — tags: gateway, security · Remote: https://docs.openclaw.ai/gateway/security.md
- [Security](gateway/security/index.md) — tags: gateway, security · Remote: https://docs.openclaw.ai/gateway/security/index.md
- [Tailscale](gateway/tailscale.md) — tags: gateway, tailscale · Remote: https://docs.openclaw.ai/gateway/tailscale.md
- [Tools Invoke API](gateway/tools-invoke-http-api.md) — tags: gateway, tools, invoke, http, api · Remote: https://docs.openclaw.ai/gateway/tools-invoke-http-api.md
- [Troubleshooting](gateway/troubleshooting.md) — tags: gateway, troubleshooting · Remote: https://docs.openclaw.ai/gateway/troubleshooting.md

### Channels

- [BlueBubbles](channels/bluebubbles.md) — tags: channels, bluebubbles · Remote: https://docs.openclaw.ai/channels/bluebubbles.md
- [Discord](channels/discord.md) — tags: channels, discord · Remote: https://docs.openclaw.ai/channels/discord.md
- [Feishu](channels/feishu.md) — tags: channels, feishu · Remote: https://docs.openclaw.ai/channels/feishu.md
- [Google Chat](channels/googlechat.md) — tags: channels, googlechat · Remote: https://docs.openclaw.ai/channels/googlechat.md
- [grammY](channels/grammy.md) — tags: channels, grammy · Remote: https://docs.openclaw.ai/channels/grammy.md
- [iMessage](channels/imessage.md) — tags: channels, imessage · Remote: https://docs.openclaw.ai/channels/imessage.md
- [Chat Channels](channels/index.md) — tags: channels · Remote: https://docs.openclaw.ai/channels/index.md
- [LINE](channels/line.md) — tags: channels, line · Remote: https://docs.openclaw.ai/channels/line.md
- [Channel Location Parsing](channels/location.md) — tags: channels, location · Remote: https://docs.openclaw.ai/channels/location.md
- [Matrix](channels/matrix.md) — tags: channels, matrix · Remote: https://docs.openclaw.ai/channels/matrix.md
- [Mattermost](channels/mattermost.md) — tags: channels, mattermost · Remote: https://docs.openclaw.ai/channels/mattermost.md
- [Microsoft Teams](channels/msteams.md) — tags: channels, msteams · Remote: https://docs.openclaw.ai/channels/msteams.md
- [Nextcloud Talk](channels/nextcloud-talk.md) — tags: channels, nextcloud, talk · Remote: https://docs.openclaw.ai/channels/nextcloud-talk.md
- [Nostr](channels/nostr.md) — tags: channels, nostr · Remote: https://docs.openclaw.ai/channels/nostr.md
- [Signal](channels/signal.md) — tags: channels, signal · Remote: https://docs.openclaw.ai/channels/signal.md
- [Slack](channels/slack.md) — tags: channels, slack · Remote: https://docs.openclaw.ai/channels/slack.md
- [Telegram](channels/telegram.md) — tags: channels, telegram · Remote: https://docs.openclaw.ai/channels/telegram.md
- [Tlon](channels/tlon.md) — tags: channels, tlon · Remote: https://docs.openclaw.ai/channels/tlon.md
- [Channel Troubleshooting](channels/troubleshooting.md) — tags: channels, troubleshooting · Remote: https://docs.openclaw.ai/channels/troubleshooting.md
- [Twitch](channels/twitch.md) — tags: channels, twitch · Remote: https://docs.openclaw.ai/channels/twitch.md
- [WhatsApp](channels/whatsapp.md) — tags: channels, whatsapp · Remote: https://docs.openclaw.ai/channels/whatsapp.md
- [Zalo](channels/zalo.md) — tags: channels, zalo · Remote: https://docs.openclaw.ai/channels/zalo.md
- [Zalo Personal](channels/zalouser.md) — tags: channels, zalouser · Remote: https://docs.openclaw.ai/channels/zalouser.md

### Model Providers

- [Anthropic](providers/anthropic.md) — tags: providers, anthropic · Remote: https://docs.openclaw.ai/providers/anthropic.md
- [Claude Max API Proxy](providers/claude-max-api-proxy.md) — tags: providers, claude, max, api, proxy · Remote: https://docs.openclaw.ai/providers/claude-max-api-proxy.md
- [Deepgram](providers/deepgram.md) — tags: providers, deepgram · Remote: https://docs.openclaw.ai/providers/deepgram.md
- [GLM Models](providers/glm.md) — tags: providers, glm · Remote: https://docs.openclaw.ai/providers/glm.md
- [Model Providers](providers/index.md) — tags: providers · Remote: https://docs.openclaw.ai/providers/index.md
- [MiniMax](providers/minimax.md) — tags: providers, minimax · Remote: https://docs.openclaw.ai/providers/minimax.md
- [Model Provider Quickstart](providers/models.md) — tags: providers, models · Remote: https://docs.openclaw.ai/providers/models.md
- [Moonshot AI](providers/moonshot.md) — tags: providers, moonshot · Remote: https://docs.openclaw.ai/providers/moonshot.md
- [Ollama](providers/ollama.md) — tags: providers, ollama · Remote: https://docs.openclaw.ai/providers/ollama.md
- [OpenAI](providers/openai.md) — tags: providers, openai · Remote: https://docs.openclaw.ai/providers/openai.md
- [OpenCode Zen](providers/opencode.md) — tags: providers, opencode · Remote: https://docs.openclaw.ai/providers/opencode.md
- [OpenRouter](providers/openrouter.md) — tags: providers, openrouter · Remote: https://docs.openclaw.ai/providers/openrouter.md
- [Qwen](providers/qwen.md) — tags: providers, qwen · Remote: https://docs.openclaw.ai/providers/qwen.md
- [Synthetic](providers/synthetic.md) — tags: providers, synthetic · Remote: https://docs.openclaw.ai/providers/synthetic.md
- [Venice AI](providers/venice.md) — tags: providers, venice · Remote: https://docs.openclaw.ai/providers/venice.md
- [Vercel AI Gateway](providers/vercel-ai-gateway.md) — tags: providers, vercel, ai, gateway · Remote: https://docs.openclaw.ai/providers/vercel-ai-gateway.md
- [Xiaomi MiMo](providers/xiaomi.md) — tags: providers, xiaomi · Remote: https://docs.openclaw.ai/providers/xiaomi.md
- [Z.AI](providers/zai.md) — tags: providers, zai · Remote: https://docs.openclaw.ai/providers/zai.md

### Tools & Skills

- [Agent Send](tools/agent-send.md) — tags: tools, agent, send · Remote: https://docs.openclaw.ai/tools/agent-send.md
- [apply_patch Tool](tools/apply-patch.md) — tags: tools, apply, patch · Remote: https://docs.openclaw.ai/tools/apply-patch.md
- [Browser Troubleshooting](tools/browser-linux-troubleshooting.md) — tags: tools, browser, linux, troubleshooting · Remote: https://docs.openclaw.ai/tools/browser-linux-troubleshooting.md
- [Browser Login](tools/browser-login.md) — tags: tools, browser, login · Remote: https://docs.openclaw.ai/tools/browser-login.md
- [Browser (OpenClaw-managed)](tools/browser.md) — tags: tools, browser · Remote: https://docs.openclaw.ai/tools/browser.md
- [Chrome Extension](tools/chrome-extension.md) — tags: tools, chrome, extension · Remote: https://docs.openclaw.ai/tools/chrome-extension.md
- [ClawHub](tools/clawhub.md) — tags: tools, clawhub · Remote: https://docs.openclaw.ai/tools/clawhub.md
- [Elevated Mode](tools/elevated.md) — tags: tools, elevated · Remote: https://docs.openclaw.ai/tools/elevated.md
- [Exec Approvals](tools/exec-approvals.md) — tags: tools, exec, approvals · Remote: https://docs.openclaw.ai/tools/exec-approvals.md
- [Exec Tool](tools/exec.md) — tags: tools, exec · Remote: https://docs.openclaw.ai/tools/exec.md
- [Firecrawl](tools/firecrawl.md) — tags: tools, firecrawl · Remote: https://docs.openclaw.ai/tools/firecrawl.md
- [Tools](tools/index.md) — tags: tools · Remote: https://docs.openclaw.ai/tools/index.md
- [LLM Task](tools/llm-task.md) — tags: tools, llm, task · Remote: https://docs.openclaw.ai/tools/llm-task.md
- [Lobster](tools/lobster.md) — tags: tools, lobster · Remote: https://docs.openclaw.ai/tools/lobster.md
- [Reactions](tools/reactions.md) — tags: tools, reactions · Remote: https://docs.openclaw.ai/tools/reactions.md
- [Skills Config](tools/skills-config.md) — tags: tools, skills, config · Remote: https://docs.openclaw.ai/tools/skills-config.md
- [Skills](tools/skills.md) — tags: tools, skills · Remote: https://docs.openclaw.ai/tools/skills.md
- [Slash Commands](tools/slash-commands.md) — tags: tools, slash, commands · Remote: https://docs.openclaw.ai/tools/slash-commands.md
- [Sub-Agents](tools/subagents.md) — tags: tools, subagents · Remote: https://docs.openclaw.ai/tools/subagents.md
- [Thinking Levels](tools/thinking.md) — tags: tools, thinking · Remote: https://docs.openclaw.ai/tools/thinking.md
- [Web Tools](tools/web.md) — tags: tools, web · Remote: https://docs.openclaw.ai/tools/web.md

### Nodes

- [Audio and Voice Notes](nodes/audio.md) — tags: nodes, audio · Remote: https://docs.openclaw.ai/nodes/audio.md
- [Camera Capture](nodes/camera.md) — tags: nodes, camera · Remote: https://docs.openclaw.ai/nodes/camera.md
- [Image and Media Support](nodes/images.md) — tags: nodes, images · Remote: https://docs.openclaw.ai/nodes/images.md
- [Nodes](nodes/index.md) — tags: nodes · Remote: https://docs.openclaw.ai/nodes/index.md
- [Location Command](nodes/location-command.md) — tags: nodes, location, command · Remote: https://docs.openclaw.ai/nodes/location-command.md
- [Talk Mode](nodes/talk.md) — tags: nodes, talk · Remote: https://docs.openclaw.ai/nodes/talk.md
- [Voice Wake](nodes/voicewake.md) — tags: nodes, voicewake · Remote: https://docs.openclaw.ai/nodes/voicewake.md

### Platforms

- [Android App](platforms/android.md) — tags: platforms, android · Remote: https://docs.openclaw.ai/platforms/android.md
- [exe.dev](platforms/exe-dev.md) — tags: platforms, exe, dev · Remote: https://docs.openclaw.ai/platforms/exe-dev.md
- [Fly.io](platforms/fly.md) — tags: platforms, fly · Remote: https://docs.openclaw.ai/platforms/fly.md
- [GCP](platforms/gcp.md) — tags: platforms, gcp · Remote: https://docs.openclaw.ai/platforms/gcp.md
- [Hetzner](platforms/hetzner.md) — tags: platforms, hetzner · Remote: https://docs.openclaw.ai/platforms/hetzner.md
- [Platforms](platforms/index.md) — tags: platforms · Remote: https://docs.openclaw.ai/platforms/index.md
- [iOS App](platforms/ios.md) — tags: platforms, ios · Remote: https://docs.openclaw.ai/platforms/ios.md
- [Linux App](platforms/linux.md) — tags: platforms, linux · Remote: https://docs.openclaw.ai/platforms/linux.md
- [Gateway on macOS](platforms/mac/bundled-gateway.md) — tags: platforms, mac, bundled, gateway · Remote: https://docs.openclaw.ai/platforms/mac/bundled-gateway.md
- [Canvas](platforms/mac/canvas.md) — tags: platforms, mac, canvas · Remote: https://docs.openclaw.ai/platforms/mac/canvas.md
- [Gateway Lifecycle](platforms/mac/child-process.md) — tags: platforms, mac, child, process · Remote: https://docs.openclaw.ai/platforms/mac/child-process.md
- [macOS Dev Setup](platforms/mac/dev-setup.md) — tags: platforms, mac, dev, setup · Remote: https://docs.openclaw.ai/platforms/mac/dev-setup.md
- [Health Checks](platforms/mac/health.md) — tags: platforms, mac, health · Remote: https://docs.openclaw.ai/platforms/mac/health.md
- [Menu Bar Icon](platforms/mac/icon.md) — tags: platforms, mac, icon · Remote: https://docs.openclaw.ai/platforms/mac/icon.md
- [macOS Logging](platforms/mac/logging.md) — tags: platforms, mac, logging · Remote: https://docs.openclaw.ai/platforms/mac/logging.md
- [Menu Bar](platforms/mac/menu-bar.md) — tags: platforms, mac, menu, bar · Remote: https://docs.openclaw.ai/platforms/mac/menu-bar.md
- [Peekaboo Bridge](platforms/mac/peekaboo.md) — tags: platforms, mac, peekaboo · Remote: https://docs.openclaw.ai/platforms/mac/peekaboo.md
- [macOS Permissions](platforms/mac/permissions.md) — tags: platforms, mac, permissions · Remote: https://docs.openclaw.ai/platforms/mac/permissions.md
- [macOS Release](platforms/mac/release.md) — tags: platforms, mac, release · Remote: https://docs.openclaw.ai/platforms/mac/release.md
- [Remote Control](platforms/mac/remote.md) — tags: platforms, mac, remote · Remote: https://docs.openclaw.ai/platforms/mac/remote.md
- [macOS Signing](platforms/mac/signing.md) — tags: platforms, mac, signing · Remote: https://docs.openclaw.ai/platforms/mac/signing.md
- [Skills](platforms/mac/skills.md) — tags: platforms, mac, skills · Remote: https://docs.openclaw.ai/platforms/mac/skills.md
- [Voice Overlay](platforms/mac/voice-overlay.md) — tags: platforms, mac, voice, overlay · Remote: https://docs.openclaw.ai/platforms/mac/voice-overlay.md
- [Voice Wake](platforms/mac/voicewake.md) — tags: platforms, mac, voicewake · Remote: https://docs.openclaw.ai/platforms/mac/voicewake.md
- [WebChat](platforms/mac/webchat.md) — tags: platforms, mac, webchat · Remote: https://docs.openclaw.ai/platforms/mac/webchat.md
- [macOS IPC](platforms/mac/xpc.md) — tags: platforms, mac, xpc · Remote: https://docs.openclaw.ai/platforms/mac/xpc.md
- [macOS VMs](platforms/macos-vm.md) — tags: platforms, macos, vm · Remote: https://docs.openclaw.ai/platforms/macos-vm.md
- [macOS App](platforms/macos.md) — tags: platforms, macos · Remote: https://docs.openclaw.ai/platforms/macos.md
- [Windows (WSL2)](platforms/windows.md) — tags: platforms, windows · Remote: https://docs.openclaw.ai/platforms/windows.md

### Web & UI

- [Control UI](web/control-ui.md) — tags: web, control, ui · Remote: https://docs.openclaw.ai/web/control-ui.md
- [Dashboard](web/dashboard.md) — tags: web, dashboard · Remote: https://docs.openclaw.ai/web/dashboard.md
- [Web](web/index.md) — tags: web · Remote: https://docs.openclaw.ai/web/index.md
- [WebChat](web/webchat.md) — tags: web, webchat · Remote: https://docs.openclaw.ai/web/webchat.md

### Automation

- [Auth Monitoring](automation/auth-monitoring.md) — tags: automation, auth, monitoring · Remote: https://docs.openclaw.ai/automation/auth-monitoring.md
- [Cron Jobs](automation/cron-jobs.md) — tags: automation, cron, jobs · Remote: https://docs.openclaw.ai/automation/cron-jobs.md
- [Cron vs Heartbeat](automation/cron-vs-heartbeat.md) — tags: automation, cron, vs, heartbeat · Remote: https://docs.openclaw.ai/automation/cron-vs-heartbeat.md
- [Gmail PubSub](automation/gmail-pubsub.md) — tags: automation, gmail, pubsub · Remote: https://docs.openclaw.ai/automation/gmail-pubsub.md
- [Polls](automation/poll.md) — tags: automation, poll · Remote: https://docs.openclaw.ai/automation/poll.md
- [Webhooks](automation/webhook.md) — tags: automation, webhook · Remote: https://docs.openclaw.ai/automation/webhook.md

### Core Concepts

- [Agent Loop](concepts/agent-loop.md) — tags: concepts, agent, loop · Remote: https://docs.openclaw.ai/concepts/agent-loop.md
- [Agent Workspace](concepts/agent-workspace.md) — tags: concepts, agent, workspace · Remote: https://docs.openclaw.ai/concepts/agent-workspace.md
- [Agent Runtime](concepts/agent.md) — tags: concepts, agent · Remote: https://docs.openclaw.ai/concepts/agent.md
- [Gateway Architecture](concepts/architecture.md) — tags: concepts, architecture · Remote: https://docs.openclaw.ai/concepts/architecture.md
- [Channel Routing](concepts/channel-routing.md) — tags: concepts, channel, routing · Remote: https://docs.openclaw.ai/concepts/channel-routing.md
- [Compaction](concepts/compaction.md) — tags: concepts, compaction · Remote: https://docs.openclaw.ai/concepts/compaction.md
- [Context](concepts/context.md) — tags: concepts, context · Remote: https://docs.openclaw.ai/concepts/context.md
- [Features](concepts/features.md) — tags: concepts, features · Remote: https://docs.openclaw.ai/concepts/features.md
- [Group Messages](concepts/group-messages.md) — tags: concepts, group, messages · Remote: https://docs.openclaw.ai/concepts/group-messages.md
- [Groups](concepts/groups.md) — tags: concepts, groups · Remote: https://docs.openclaw.ai/concepts/groups.md
- [Markdown Formatting](concepts/markdown-formatting.md) — tags: concepts, markdown, formatting · Remote: https://docs.openclaw.ai/concepts/markdown-formatting.md
- [null](concepts/memory.md) — tags: concepts, memory · Remote: https://docs.openclaw.ai/concepts/memory.md
- [Messages](concepts/messages.md) — tags: concepts, messages · Remote: https://docs.openclaw.ai/concepts/messages.md
- [Model Failover](concepts/model-failover.md) — tags: concepts, model, failover · Remote: https://docs.openclaw.ai/concepts/model-failover.md
- [Model Providers](concepts/model-providers.md) — tags: concepts, model, providers · Remote: https://docs.openclaw.ai/concepts/model-providers.md
- [Models CLI](concepts/models.md) — tags: concepts, models · Remote: https://docs.openclaw.ai/concepts/models.md
- [Multi-Agent Routing](concepts/multi-agent.md) — tags: concepts, multi, agent · Remote: https://docs.openclaw.ai/concepts/multi-agent.md
- [OAuth](concepts/oauth.md) — tags: concepts, oauth · Remote: https://docs.openclaw.ai/concepts/oauth.md
- [Presence](concepts/presence.md) — tags: concepts, presence · Remote: https://docs.openclaw.ai/concepts/presence.md
- [Command Queue](concepts/queue.md) — tags: concepts, queue · Remote: https://docs.openclaw.ai/concepts/queue.md
- [Retry Policy](concepts/retry.md) — tags: concepts, retry · Remote: https://docs.openclaw.ai/concepts/retry.md
- [null](concepts/session-pruning.md) — tags: concepts, session, pruning · Remote: https://docs.openclaw.ai/concepts/session-pruning.md
- [Session Tools](concepts/session-tool.md) — tags: concepts, session, tool · Remote: https://docs.openclaw.ai/concepts/session-tool.md
- [Session Management](concepts/session.md) — tags: concepts, session · Remote: https://docs.openclaw.ai/concepts/session.md
- [Sessions](concepts/sessions.md) — tags: concepts, sessions · Remote: https://docs.openclaw.ai/concepts/sessions.md
- [Streaming and Chunking](concepts/streaming.md) — tags: concepts, streaming · Remote: https://docs.openclaw.ai/concepts/streaming.md
- [System Prompt](concepts/system-prompt.md) — tags: concepts, system, prompt · Remote: https://docs.openclaw.ai/concepts/system-prompt.md
- [Timezones](concepts/timezone.md) — tags: concepts, timezone · Remote: https://docs.openclaw.ai/concepts/timezone.md
- [TypeBox](concepts/typebox.md) — tags: concepts, typebox · Remote: https://docs.openclaw.ai/concepts/typebox.md
- [Typing Indicators](concepts/typing-indicators.md) — tags: concepts, typing, indicators · Remote: https://docs.openclaw.ai/concepts/typing-indicators.md
- [Usage Tracking](concepts/usage-tracking.md) — tags: concepts, usage, tracking · Remote: https://docs.openclaw.ai/concepts/usage-tracking.md

### Reference & Templates

- [null](reference/AGENTS.default.md) — tags: reference, agents.default · Remote: https://docs.openclaw.ai/reference/AGENTS.default.md
- [Credits](reference/credits.md) — tags: reference, credits · Remote: https://docs.openclaw.ai/reference/credits.md
- [Device Model Database](reference/device-models.md) — tags: reference, device, models · Remote: https://docs.openclaw.ai/reference/device-models.md
- [null](reference/RELEASING.md) — tags: reference, releasing · Remote: https://docs.openclaw.ai/reference/RELEASING.md
- [RPC Adapters](reference/rpc.md) — tags: reference, rpc · Remote: https://docs.openclaw.ai/reference/rpc.md
- [Session Management Deep Dive](reference/session-management-compaction.md) — tags: reference, session, management, compaction · Remote: https://docs.openclaw.ai/reference/session-management-compaction.md
- [null](reference/templates/AGENTS.md) — tags: reference, templates, agents · Remote: https://docs.openclaw.ai/reference/templates/AGENTS.md
- [null](reference/templates/BOOT.md) — tags: reference, templates, boot · Remote: https://docs.openclaw.ai/reference/templates/BOOT.md
- [null](reference/templates/BOOTSTRAP.md) — tags: reference, templates, bootstrap · Remote: https://docs.openclaw.ai/reference/templates/BOOTSTRAP.md
- [null](reference/templates/HEARTBEAT.md) — tags: reference, templates, heartbeat · Remote: https://docs.openclaw.ai/reference/templates/HEARTBEAT.md
- [null](reference/templates/IDENTITY.md) — tags: reference, templates, identity · Remote: https://docs.openclaw.ai/reference/templates/IDENTITY.md
- [null](reference/templates/SOUL.md) — tags: reference, templates, soul · Remote: https://docs.openclaw.ai/reference/templates/SOUL.md
- [null](reference/templates/TOOLS.md) — tags: reference, templates, tools · Remote: https://docs.openclaw.ai/reference/templates/TOOLS.md
- [null](reference/templates/USER.md) — tags: reference, templates, user · Remote: https://docs.openclaw.ai/reference/templates/USER.md
- [Tests](reference/test.md) — tags: reference, test · Remote: https://docs.openclaw.ai/reference/test.md

### Security

- [Formal Verification (Security Models)](security/formal-verification.md) — tags: security, formal, verification · Remote: https://docs.openclaw.ai/security/formal-verification.md

### Help

- [FAQ](help/faq.md) — tags: help, faq · Remote: https://docs.openclaw.ai/help/faq.md
- [Help](help/index.md) — tags: help · Remote: https://docs.openclaw.ai/help/index.md
- [Troubleshooting](help/troubleshooting.md) — tags: help, troubleshooting · Remote: https://docs.openclaw.ai/help/troubleshooting.md

### Misc

- [Amazon Bedrock](bedrock.md) — tags: bedrock · Remote: https://docs.openclaw.ai/bedrock.md
- [Brave Search](brave-search.md) — tags: brave, search · Remote: https://docs.openclaw.ai/brave-search.md
- [Broadcast Groups](broadcast-groups.md) — tags: broadcast, groups · Remote: https://docs.openclaw.ai/broadcast-groups.md
- [Features](concepts.md) — tags: concepts · Remote: https://docs.openclaw.ai/concepts.md
- [Date and Time](date-time.md) — tags: date, time · Remote: https://docs.openclaw.ai/date-time.md
- [Debugging](debugging.md) — tags: debugging · Remote: https://docs.openclaw.ai/debugging.md
- [Environment Variables](environment.md) — tags: environment · Remote: https://docs.openclaw.ai/environment.md
- [Gateway Runbook](gateway.md) — tags: gateway · Remote: https://docs.openclaw.ai/gateway.md
- [Hooks](hooks.md) — tags: hooks · Remote: https://docs.openclaw.ai/hooks.md
- [SOUL Evil Hook](hooks/soul-evil.md) — tags: hooks, soul, evil · Remote: https://docs.openclaw.ai/hooks/soul-evil.md
- [OpenClaw](index.md) · Remote: https://docs.openclaw.ai/index.md
- [OpenClaw](llms.txt) — tags: llms · Remote: https://docs.openclaw.ai/llms.txt
- [Logging](logging.md) — tags: logging · Remote: https://docs.openclaw.ai/logging.md
- [Multi-Agent Sandbox & Tools](multi-agent-sandbox-tools.md) — tags: multi, agent, sandbox, tools · Remote: https://docs.openclaw.ai/multi-agent-sandbox-tools.md
- [Network](network.md) — tags: network · Remote: https://docs.openclaw.ai/network.md
- [Nodes](nodes.md) — tags: nodes · Remote: https://docs.openclaw.ai/nodes.md
- [Deploy on Northflank](northflank.md) — tags: northflank · Remote: https://docs.openclaw.ai/northflank.md
- [Perplexity Sonar](perplexity.md) — tags: perplexity · Remote: https://docs.openclaw.ai/perplexity.md
- [Platforms](platforms.md) — tags: platforms · Remote: https://docs.openclaw.ai/platforms.md
- [Plugins](plugin.md) — tags: plugin · Remote: https://docs.openclaw.ai/plugin.md
- [Voice Call Plugin](plugins/voice-call.md) — tags: plugins, voice, call · Remote: https://docs.openclaw.ai/plugins/voice-call.md
- [Zalo Personal Plugin](plugins/zalouser.md) — tags: plugins, zalouser · Remote: https://docs.openclaw.ai/plugins/zalouser.md
- [Deploy on Railway](railway.md) — tags: railway · Remote: https://docs.openclaw.ai/railway.md
- [Deploy on Render](render.md) — tags: render · Remote: https://docs.openclaw.ai/render.md
- [Scripts](scripts.md) — tags: scripts · Remote: https://docs.openclaw.ai/scripts.md
- [Testing](testing.md) — tags: testing · Remote: https://docs.openclaw.ai/testing.md
- [Token Use and Costs](token-use.md) — tags: token, use · Remote: https://docs.openclaw.ai/token-use.md
- [Tools](tools.md) — tags: tools · Remote: https://docs.openclaw.ai/tools.md
- [Text-to-Speech](tts.md) — tags: tts · Remote: https://docs.openclaw.ai/tts.md
- [TUI](tui.md) — tags: tui · Remote: https://docs.openclaw.ai/tui.md
- [VPS Hosting](vps.md) — tags: vps · Remote: https://docs.openclaw.ai/vps.md
- [Web](web.md) — tags: web · Remote: https://docs.openclaw.ai/web.md

