# OpenClaw Docs Snapshot Index

Generated: `2026-04-04T20:36:08.593Z`
Snapshot root: `references/docs/`

## Quick Routing (Start Here)

> Rule: use keywords to map the problem to one category, then open the 1-3 most relevant files. Do not skim dozens of pages.

- **Install / onboarding / pairing** → `start/getting-started.md`, `start/setup.md`, `channels/pairing.md`, `install/index.md`
- **Updates / upgrade channels** → `install/updating.md`, `install/development-channels.md`, `cli/update.md`
- **Not sure how to use a CLI command** → `cli/index.md` + open `cli/<command>.md`
- **Gateway config / ports / tokens / auth** → `gateway/configuration.md`, `gateway/authentication.md`, `gateway/index.md`
- **Remote access / Tailscale / Bonjour / discovery** → `gateway/remote.md`, `gateway/tailscale.md`, `gateway/discovery.md`
- **Security / sandboxing / elevation** → `gateway/security.md`, `gateway/sandboxing.md`, `gateway/sandbox-vs-tool-policy-vs-elevated.md`
- **Channels (WhatsApp/Telegram/Discord/Slack...)** → `channels/index.md` + `channels/<name>.md` + `channels/troubleshooting.md`
- **Tools (exec/browser/apply_patch/web...)** → `tools/index.md` + `tools/<tool>.md`
- **Providers / config / billing** → `providers/index.md`, `providers/openai.md`, `providers/anthropic.md`, `reference/token-use.md`
- **Troubleshooting** → `help/troubleshooting.md`, `gateway/troubleshooting.md`, `help/debugging.md`, `cli/logs.md`, `cli/doctor.md`

## Full Directory

### Start / Onboarding

- [Agent Bootstrapping](start/bootstrapping.md) — tags: start, bootstrapping · Remote: https://docs.openclaw.ai/start/bootstrapping.md
- [Docs directory](start/docs-directory.md) — tags: start, docs, directory · Remote: https://docs.openclaw.ai/start/docs-directory.md
- [Getting Started](start/getting-started.md) — tags: start, getting, started · Remote: https://docs.openclaw.ai/start/getting-started.md
- [Docs Hubs](start/hubs.md) — tags: start, hubs · Remote: https://docs.openclaw.ai/start/hubs.md
- [OpenClaw Lore](start/lore.md) — tags: start, lore · Remote: https://docs.openclaw.ai/start/lore.md
- [Onboarding Overview](start/onboarding-overview.md) — tags: start, onboarding, overview · Remote: https://docs.openclaw.ai/start/onboarding-overview.md
- [Onboarding (macOS App)](start/onboarding.md) — tags: start, onboarding · Remote: https://docs.openclaw.ai/start/onboarding.md
- [Personal Assistant Setup](start/openclaw.md) — tags: start, openclaw · Remote: https://docs.openclaw.ai/start/openclaw.md
- [Setup](start/setup.md) — tags: start, setup · Remote: https://docs.openclaw.ai/start/setup.md
- [Showcase](start/showcase.md) — tags: start, showcase · Remote: https://docs.openclaw.ai/start/showcase.md
- [CLI Automation](start/wizard-cli-automation.md) — tags: start, wizard, cli, automation · Remote: https://docs.openclaw.ai/start/wizard-cli-automation.md
- [CLI Setup Reference](start/wizard-cli-reference.md) — tags: start, wizard, cli, reference · Remote: https://docs.openclaw.ai/start/wizard-cli-reference.md
- [Onboarding (CLI)](start/wizard.md) — tags: start, wizard · Remote: https://docs.openclaw.ai/start/wizard.md

### Install & Updates

- [Ansible](install/ansible.md) — tags: install, ansible · Remote: https://docs.openclaw.ai/install/ansible.md
- [Azure](install/azure.md) — tags: install, azure · Remote: https://docs.openclaw.ai/install/azure.md
- [Bun (Experimental)](install/bun.md) — tags: install, bun · Remote: https://docs.openclaw.ai/install/bun.md
- [ClawDock](install/clawdock.md) — tags: install, clawdock · Remote: https://docs.openclaw.ai/install/clawdock.md
- [Release Channels](install/development-channels.md) — tags: install, development, channels · Remote: https://docs.openclaw.ai/install/development-channels.md
- [DigitalOcean](install/digitalocean.md) — tags: install, digitalocean · Remote: https://docs.openclaw.ai/install/digitalocean.md
- [Docker VM Runtime](install/docker-vm-runtime.md) — tags: install, docker, vm, runtime · Remote: https://docs.openclaw.ai/install/docker-vm-runtime.md
- [Docker](install/docker.md) — tags: install, docker · Remote: https://docs.openclaw.ai/install/docker.md
- [exe.dev](install/exe-dev.md) — tags: install, exe, dev · Remote: https://docs.openclaw.ai/install/exe-dev.md
- [Fly.io](install/fly.md) — tags: install, fly · Remote: https://docs.openclaw.ai/install/fly.md
- [GCP](install/gcp.md) — tags: install, gcp · Remote: https://docs.openclaw.ai/install/gcp.md
- [Hetzner](install/hetzner.md) — tags: install, hetzner · Remote: https://docs.openclaw.ai/install/hetzner.md
- [Install](install/index.md) — tags: install · Remote: https://docs.openclaw.ai/install/index.md
- [Installer Internals](install/installer.md) — tags: install, installer · Remote: https://docs.openclaw.ai/install/installer.md
- [Kubernetes](install/kubernetes.md) — tags: install, kubernetes · Remote: https://docs.openclaw.ai/install/kubernetes.md
- [macOS VMs](install/macos-vm.md) — tags: install, macos, vm · Remote: https://docs.openclaw.ai/install/macos-vm.md
- [Matrix migration](install/migrating-matrix.md) — tags: install, migrating, matrix · Remote: https://docs.openclaw.ai/install/migrating-matrix.md
- [Migration Guide](install/migrating.md) — tags: install, migrating · Remote: https://docs.openclaw.ai/install/migrating.md
- [Nix](install/nix.md) — tags: install, nix · Remote: https://docs.openclaw.ai/install/nix.md
- [Node.js](install/node.md) — tags: install, node · Remote: https://docs.openclaw.ai/install/node.md
- [Northflank](install/northflank.md) — tags: install, northflank · Remote: https://docs.openclaw.ai/install/northflank.md
- [Oracle Cloud](install/oracle.md) — tags: install, oracle · Remote: https://docs.openclaw.ai/install/oracle.md
- [Podman](install/podman.md) — tags: install, podman · Remote: https://docs.openclaw.ai/install/podman.md
- [Railway](install/railway.md) — tags: install, railway · Remote: https://docs.openclaw.ai/install/railway.md
- [Raspberry Pi](install/raspberry-pi.md) — tags: install, raspberry, pi · Remote: https://docs.openclaw.ai/install/raspberry-pi.md
- [Render](install/render.md) — tags: install, render · Remote: https://docs.openclaw.ai/install/render.md
- [Uninstall](install/uninstall.md) — tags: install, uninstall · Remote: https://docs.openclaw.ai/install/uninstall.md
- [Updating](install/updating.md) — tags: install, updating · Remote: https://docs.openclaw.ai/install/updating.md

### CLI Reference

- [acp](cli/acp.md) — tags: cli, acp · Remote: https://docs.openclaw.ai/cli/acp.md
- [agent](cli/agent.md) — tags: cli, agent · Remote: https://docs.openclaw.ai/cli/agent.md
- [agents](cli/agents.md) — tags: cli, agents · Remote: https://docs.openclaw.ai/cli/agents.md
- [approvals](cli/approvals.md) — tags: cli, approvals · Remote: https://docs.openclaw.ai/cli/approvals.md
- [backup](cli/backup.md) — tags: cli, backup · Remote: https://docs.openclaw.ai/cli/backup.md
- [browser](cli/browser.md) — tags: cli, browser · Remote: https://docs.openclaw.ai/cli/browser.md
- [channels](cli/channels.md) — tags: cli, channels · Remote: https://docs.openclaw.ai/cli/channels.md
- [clawbot](cli/clawbot.md) — tags: cli, clawbot · Remote: https://docs.openclaw.ai/cli/clawbot.md
- [completion](cli/completion.md) — tags: cli, completion · Remote: https://docs.openclaw.ai/cli/completion.md
- [config](cli/config.md) — tags: cli, config · Remote: https://docs.openclaw.ai/cli/config.md
- [configure](cli/configure.md) — tags: cli, configure · Remote: https://docs.openclaw.ai/cli/configure.md
- [cron](cli/cron.md) — tags: cli, cron · Remote: https://docs.openclaw.ai/cli/cron.md
- [daemon](cli/daemon.md) — tags: cli, daemon · Remote: https://docs.openclaw.ai/cli/daemon.md
- [dashboard](cli/dashboard.md) — tags: cli, dashboard · Remote: https://docs.openclaw.ai/cli/dashboard.md
- [devices](cli/devices.md) — tags: cli, devices · Remote: https://docs.openclaw.ai/cli/devices.md
- [directory](cli/directory.md) — tags: cli, directory · Remote: https://docs.openclaw.ai/cli/directory.md
- [dns](cli/dns.md) — tags: cli, dns · Remote: https://docs.openclaw.ai/cli/dns.md
- [docs](cli/docs.md) — tags: cli, docs · Remote: https://docs.openclaw.ai/cli/docs.md
- [doctor](cli/doctor.md) — tags: cli, doctor · Remote: https://docs.openclaw.ai/cli/doctor.md
- [flows (redirect)](cli/flows.md) — tags: cli, flows · Remote: https://docs.openclaw.ai/cli/flows.md
- [gateway](cli/gateway.md) — tags: cli, gateway · Remote: https://docs.openclaw.ai/cli/gateway.md
- [health](cli/health.md) — tags: cli, health · Remote: https://docs.openclaw.ai/cli/health.md
- [hooks](cli/hooks.md) — tags: cli, hooks · Remote: https://docs.openclaw.ai/cli/hooks.md
- [CLI Reference](cli/index.md) — tags: cli · Remote: https://docs.openclaw.ai/cli/index.md
- [logs](cli/logs.md) — tags: cli, logs · Remote: https://docs.openclaw.ai/cli/logs.md
- [mcp](cli/mcp.md) — tags: cli, mcp · Remote: https://docs.openclaw.ai/cli/mcp.md
- [memory](cli/memory.md) — tags: cli, memory · Remote: https://docs.openclaw.ai/cli/memory.md
- [message](cli/message.md) — tags: cli, message · Remote: https://docs.openclaw.ai/cli/message.md
- [models](cli/models.md) — tags: cli, models · Remote: https://docs.openclaw.ai/cli/models.md
- [node](cli/node.md) — tags: cli, node · Remote: https://docs.openclaw.ai/cli/node.md
- [nodes](cli/nodes.md) — tags: cli, nodes · Remote: https://docs.openclaw.ai/cli/nodes.md
- [onboard](cli/onboard.md) — tags: cli, onboard · Remote: https://docs.openclaw.ai/cli/onboard.md
- [pairing](cli/pairing.md) — tags: cli, pairing · Remote: https://docs.openclaw.ai/cli/pairing.md
- [plugins](cli/plugins.md) — tags: cli, plugins · Remote: https://docs.openclaw.ai/cli/plugins.md
- [qr](cli/qr.md) — tags: cli, qr · Remote: https://docs.openclaw.ai/cli/qr.md
- [reset](cli/reset.md) — tags: cli, reset · Remote: https://docs.openclaw.ai/cli/reset.md
- [Sandbox CLI](cli/sandbox.md) — tags: cli, sandbox · Remote: https://docs.openclaw.ai/cli/sandbox.md
- [secrets](cli/secrets.md) — tags: cli, secrets · Remote: https://docs.openclaw.ai/cli/secrets.md
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
- [Configuration Reference](gateway/configuration-reference.md) — tags: gateway, configuration, reference · Remote: https://docs.openclaw.ai/gateway/configuration-reference.md
- [Configuration](gateway/configuration.md) — tags: gateway, configuration · Remote: https://docs.openclaw.ai/gateway/configuration.md
- [Discovery and Transports](gateway/discovery.md) — tags: gateway, discovery · Remote: https://docs.openclaw.ai/gateway/discovery.md
- [Doctor](gateway/doctor.md) — tags: gateway, doctor · Remote: https://docs.openclaw.ai/gateway/doctor.md
- [Gateway Lock](gateway/gateway-lock.md) — tags: gateway, lock · Remote: https://docs.openclaw.ai/gateway/gateway-lock.md
- [Health Checks](gateway/health.md) — tags: gateway, health · Remote: https://docs.openclaw.ai/gateway/health.md
- [Heartbeat](gateway/heartbeat.md) — tags: gateway, heartbeat · Remote: https://docs.openclaw.ai/gateway/heartbeat.md
- [Gateway Runbook](gateway/index.md) — tags: gateway · Remote: https://docs.openclaw.ai/gateway/index.md
- [Local Models](gateway/local-models.md) — tags: gateway, local, models · Remote: https://docs.openclaw.ai/gateway/local-models.md
- [Gateway Logging](gateway/logging.md) — tags: gateway, logging · Remote: https://docs.openclaw.ai/gateway/logging.md
- [Multiple Gateways](gateway/multiple-gateways.md) — tags: gateway, multiple, gateways · Remote: https://docs.openclaw.ai/gateway/multiple-gateways.md
- [Network model](gateway/network-model.md) — tags: gateway, network, model · Remote: https://docs.openclaw.ai/gateway/network-model.md
- [OpenAI Chat Completions](gateway/openai-http-api.md) — tags: gateway, openai, http, api · Remote: https://docs.openclaw.ai/gateway/openai-http-api.md
- [OpenResponses API](gateway/openresponses-http-api.md) — tags: gateway, openresponses, http, api · Remote: https://docs.openclaw.ai/gateway/openresponses-http-api.md
- [OpenShell](gateway/openshell.md) — tags: gateway, openshell · Remote: https://docs.openclaw.ai/gateway/openshell.md
- [Gateway-Owned Pairing](gateway/pairing.md) — tags: gateway, pairing · Remote: https://docs.openclaw.ai/gateway/pairing.md
- [Gateway Protocol](gateway/protocol.md) — tags: gateway, protocol · Remote: https://docs.openclaw.ai/gateway/protocol.md
- [Remote Gateway Setup](gateway/remote-gateway-readme.md) — tags: gateway, remote, readme · Remote: https://docs.openclaw.ai/gateway/remote-gateway-readme.md
- [Remote Access](gateway/remote.md) — tags: gateway, remote · Remote: https://docs.openclaw.ai/gateway/remote.md
- [Sandbox vs Tool Policy vs Elevated](gateway/sandbox-vs-tool-policy-vs-elevated.md) — tags: gateway, sandbox, vs, tool, policy, elevated · Remote: https://docs.openclaw.ai/gateway/sandbox-vs-tool-policy-vs-elevated.md
- [Sandboxing](gateway/sandboxing.md) — tags: gateway, sandboxing · Remote: https://docs.openclaw.ai/gateway/sandboxing.md
- [Secrets Apply Plan Contract](gateway/secrets-plan-contract.md) — tags: gateway, secrets, plan, contract · Remote: https://docs.openclaw.ai/gateway/secrets-plan-contract.md
- [Secrets Management](gateway/secrets.md) — tags: gateway, secrets · Remote: https://docs.openclaw.ai/gateway/secrets.md
- [Security](gateway/security/index.md) — tags: gateway, security · Remote: https://docs.openclaw.ai/gateway/security/index.md
- [Tailscale](gateway/tailscale.md) — tags: gateway, tailscale · Remote: https://docs.openclaw.ai/gateway/tailscale.md
- [Tools Invoke API](gateway/tools-invoke-http-api.md) — tags: gateway, tools, invoke, http, api · Remote: https://docs.openclaw.ai/gateway/tools-invoke-http-api.md
- [Troubleshooting](gateway/troubleshooting.md) — tags: gateway, troubleshooting · Remote: https://docs.openclaw.ai/gateway/troubleshooting.md
- [Trusted Proxy Auth](gateway/trusted-proxy-auth.md) — tags: gateway, trusted, proxy, auth · Remote: https://docs.openclaw.ai/gateway/trusted-proxy-auth.md

### Channels

- [BlueBubbles](channels/bluebubbles.md) — tags: channels, bluebubbles · Remote: https://docs.openclaw.ai/channels/bluebubbles.md
- [Broadcast Groups](channels/broadcast-groups.md) — tags: channels, broadcast, groups · Remote: https://docs.openclaw.ai/channels/broadcast-groups.md
- [Channel Routing](channels/channel-routing.md) — tags: channels, channel, routing · Remote: https://docs.openclaw.ai/channels/channel-routing.md
- [Discord](channels/discord.md) — tags: channels, discord · Remote: https://docs.openclaw.ai/channels/discord.md
- [Feishu](channels/feishu.md) — tags: channels, feishu · Remote: https://docs.openclaw.ai/channels/feishu.md
- [Google Chat](channels/googlechat.md) — tags: channels, googlechat · Remote: https://docs.openclaw.ai/channels/googlechat.md
- [grammY](channels/grammy.md) — tags: channels, grammy · status: stale-local · Remote: https://docs.openclaw.ai/channels/grammy.md
- [Group Messages](channels/group-messages.md) — tags: channels, group, messages · Remote: https://docs.openclaw.ai/channels/group-messages.md
- [Groups](channels/groups.md) — tags: channels, groups · Remote: https://docs.openclaw.ai/channels/groups.md
- [iMessage](channels/imessage.md) — tags: channels, imessage · Remote: https://docs.openclaw.ai/channels/imessage.md
- [Chat Channels](channels/index.md) — tags: channels · Remote: https://docs.openclaw.ai/channels/index.md
- [IRC](channels/irc.md) — tags: channels, irc · Remote: https://docs.openclaw.ai/channels/irc.md
- [LINE](channels/line.md) — tags: channels, line · Remote: https://docs.openclaw.ai/channels/line.md
- [Channel Location Parsing](channels/location.md) — tags: channels, location · Remote: https://docs.openclaw.ai/channels/location.md
- [Matrix](channels/matrix.md) — tags: channels, matrix · Remote: https://docs.openclaw.ai/channels/matrix.md
- [Mattermost](channels/mattermost.md) — tags: channels, mattermost · Remote: https://docs.openclaw.ai/channels/mattermost.md
- [Microsoft Teams](channels/msteams.md) — tags: channels, msteams · Remote: https://docs.openclaw.ai/channels/msteams.md
- [Nextcloud Talk](channels/nextcloud-talk.md) — tags: channels, nextcloud, talk · Remote: https://docs.openclaw.ai/channels/nextcloud-talk.md
- [Nostr](channels/nostr.md) — tags: channels, nostr · Remote: https://docs.openclaw.ai/channels/nostr.md
- [Pairing](channels/pairing.md) — tags: channels, pairing · Remote: https://docs.openclaw.ai/channels/pairing.md
- [QQ Bot](channels/qqbot.md) — tags: channels, qqbot · Remote: https://docs.openclaw.ai/channels/qqbot.md
- [Signal](channels/signal.md) — tags: channels, signal · Remote: https://docs.openclaw.ai/channels/signal.md
- [Slack](channels/slack.md) — tags: channels, slack · Remote: https://docs.openclaw.ai/channels/slack.md
- [Synology Chat](channels/synology-chat.md) — tags: channels, synology, chat · Remote: https://docs.openclaw.ai/channels/synology-chat.md
- [Telegram](channels/telegram.md) — tags: channels, telegram · Remote: https://docs.openclaw.ai/channels/telegram.md
- [Tlon](channels/tlon.md) — tags: channels, tlon · Remote: https://docs.openclaw.ai/channels/tlon.md
- [Channel Troubleshooting](channels/troubleshooting.md) — tags: channels, troubleshooting · Remote: https://docs.openclaw.ai/channels/troubleshooting.md
- [Twitch](channels/twitch.md) — tags: channels, twitch · Remote: https://docs.openclaw.ai/channels/twitch.md
- [WhatsApp](channels/whatsapp.md) — tags: channels, whatsapp · Remote: https://docs.openclaw.ai/channels/whatsapp.md
- [Zalo](channels/zalo.md) — tags: channels, zalo · Remote: https://docs.openclaw.ai/channels/zalo.md
- [Zalo Personal](channels/zalouser.md) — tags: channels, zalouser · Remote: https://docs.openclaw.ai/channels/zalouser.md

### Model Providers

- [Anthropic](providers/anthropic.md) — tags: providers, anthropic · Remote: https://docs.openclaw.ai/providers/anthropic.md
- [Amazon Bedrock](providers/bedrock.md) — tags: providers, bedrock · Remote: https://docs.openclaw.ai/providers/bedrock.md
- [Chutes](providers/chutes.md) — tags: providers, chutes · Remote: https://docs.openclaw.ai/providers/chutes.md
- [Claude Max API Proxy](providers/claude-max-api-proxy.md) — tags: providers, claude, max, api, proxy · Remote: https://docs.openclaw.ai/providers/claude-max-api-proxy.md
- [Cloudflare AI Gateway](providers/cloudflare-ai-gateway.md) — tags: providers, cloudflare, ai, gateway · Remote: https://docs.openclaw.ai/providers/cloudflare-ai-gateway.md
- [Deepgram](providers/deepgram.md) — tags: providers, deepgram · Remote: https://docs.openclaw.ai/providers/deepgram.md
- [Deepseek](providers/deepseek.md) — tags: providers, deepseek · Remote: https://docs.openclaw.ai/providers/deepseek.md
- [GitHub Copilot](providers/github-copilot.md) — tags: providers, github, copilot · Remote: https://docs.openclaw.ai/providers/github-copilot.md
- [GLM Models](providers/glm.md) — tags: providers, glm · Remote: https://docs.openclaw.ai/providers/glm.md
- [Google (Gemini)](providers/google.md) — tags: providers, google · Remote: https://docs.openclaw.ai/providers/google.md
- [Groq](providers/groq.md) — tags: providers, groq · Remote: https://docs.openclaw.ai/providers/groq.md
- [Hugging Face (Inference)](providers/huggingface.md) — tags: providers, huggingface · Remote: https://docs.openclaw.ai/providers/huggingface.md
- [Provider Directory](providers/index.md) — tags: providers · Remote: https://docs.openclaw.ai/providers/index.md
- [Kilo Gateway](providers/kilocode.md) — tags: providers, kilocode · Remote: https://docs.openclaw.ai/providers/kilocode.md
- [LiteLLM](providers/litellm.md) — tags: providers, litellm · Remote: https://docs.openclaw.ai/providers/litellm.md
- [MiniMax](providers/minimax.md) — tags: providers, minimax · Remote: https://docs.openclaw.ai/providers/minimax.md
- [Mistral](providers/mistral.md) — tags: providers, mistral · Remote: https://docs.openclaw.ai/providers/mistral.md
- [Model Provider Quickstart](providers/models.md) — tags: providers, models · Remote: https://docs.openclaw.ai/providers/models.md
- [Moonshot AI](providers/moonshot.md) — tags: providers, moonshot · Remote: https://docs.openclaw.ai/providers/moonshot.md
- [NVIDIA](providers/nvidia.md) — tags: providers, nvidia · Remote: https://docs.openclaw.ai/providers/nvidia.md
- [Ollama](providers/ollama.md) — tags: providers, ollama · Remote: https://docs.openclaw.ai/providers/ollama.md
- [OpenAI](providers/openai.md) — tags: providers, openai · Remote: https://docs.openclaw.ai/providers/openai.md
- [OpenCode Go](providers/opencode-go.md) — tags: providers, opencode, go · Remote: https://docs.openclaw.ai/providers/opencode-go.md
- [OpenCode](providers/opencode.md) — tags: providers, opencode · Remote: https://docs.openclaw.ai/providers/opencode.md
- [OpenRouter](providers/openrouter.md) — tags: providers, openrouter · Remote: https://docs.openclaw.ai/providers/openrouter.md
- [Perplexity (Provider)](providers/perplexity-provider.md) — tags: providers, perplexity, provider · Remote: https://docs.openclaw.ai/providers/perplexity-provider.md
- [Qianfan](providers/qianfan.md) — tags: providers, qianfan · Remote: https://docs.openclaw.ai/providers/qianfan.md
- [Qwen modelstudio](providers/qwen_modelstudio.md) — tags: providers, qwen, modelstudio · Remote: https://docs.openclaw.ai/providers/qwen_modelstudio.md
- [Qwen](providers/qwen.md) — tags: providers, qwen · Remote: https://docs.openclaw.ai/providers/qwen.md
- [SGLang](providers/sglang.md) — tags: providers, sglang · Remote: https://docs.openclaw.ai/providers/sglang.md
- [StepFun](providers/stepfun.md) — tags: providers, stepfun · Remote: https://docs.openclaw.ai/providers/stepfun.md
- [Synthetic](providers/synthetic.md) — tags: providers, synthetic · Remote: https://docs.openclaw.ai/providers/synthetic.md
- [Together AI](providers/together.md) — tags: providers, together · Remote: https://docs.openclaw.ai/providers/together.md
- [Venice AI](providers/venice.md) — tags: providers, venice · Remote: https://docs.openclaw.ai/providers/venice.md
- [Vercel AI Gateway](providers/vercel-ai-gateway.md) — tags: providers, vercel, ai, gateway · Remote: https://docs.openclaw.ai/providers/vercel-ai-gateway.md
- [vLLM](providers/vllm.md) — tags: providers, vllm · Remote: https://docs.openclaw.ai/providers/vllm.md
- [Volcengine (Doubao)](providers/volcengine.md) — tags: providers, volcengine · Remote: https://docs.openclaw.ai/providers/volcengine.md
- [xAI](providers/xai.md) — tags: providers, xai · Remote: https://docs.openclaw.ai/providers/xai.md
- [Xiaomi MiMo](providers/xiaomi.md) — tags: providers, xiaomi · Remote: https://docs.openclaw.ai/providers/xiaomi.md
- [Z.AI](providers/zai.md) — tags: providers, zai · Remote: https://docs.openclaw.ai/providers/zai.md

### Tools & Skills

- [ACP Agents](tools/acp-agents.md) — tags: tools, acp, agents · Remote: https://docs.openclaw.ai/tools/acp-agents.md
- [Agent Send](tools/agent-send.md) — tags: tools, agent, send · Remote: https://docs.openclaw.ai/tools/agent-send.md
- [apply_patch Tool](tools/apply-patch.md) — tags: tools, apply, patch · Remote: https://docs.openclaw.ai/tools/apply-patch.md
- [Brave Search](tools/brave-search.md) — tags: tools, brave, search · Remote: https://docs.openclaw.ai/tools/brave-search.md
- [Browser Troubleshooting](tools/browser-linux-troubleshooting.md) — tags: tools, browser, linux, troubleshooting · Remote: https://docs.openclaw.ai/tools/browser-linux-troubleshooting.md
- [Browser Login](tools/browser-login.md) — tags: tools, browser, login · Remote: https://docs.openclaw.ai/tools/browser-login.md
- [WSL2 + Windows + remote Chrome CDP troubleshooting](tools/browser-wsl2-windows-remote-cdp-troubleshooting.md) — tags: tools, browser, wsl2, windows, remote, cdp, troubleshooting · Remote: https://docs.openclaw.ai/tools/browser-wsl2-windows-remote-cdp-troubleshooting.md
- [Browser (OpenClaw-managed)](tools/browser.md) — tags: tools, browser · Remote: https://docs.openclaw.ai/tools/browser.md
- [BTW Side Questions](tools/btw.md) — tags: tools, btw · Remote: https://docs.openclaw.ai/tools/btw.md
- [Chrome Extension](tools/chrome-extension.md) — tags: tools, chrome, extension · status: stale-local · Remote: https://docs.openclaw.ai/tools/chrome-extension.md
- [ClawHub](tools/clawhub.md) — tags: tools, clawhub · Remote: https://docs.openclaw.ai/tools/clawhub.md
- [Code Execution](tools/code-execution.md) — tags: tools, code, execution · Remote: https://docs.openclaw.ai/tools/code-execution.md
- [Creating Skills](tools/creating-skills.md) — tags: tools, creating, skills · Remote: https://docs.openclaw.ai/tools/creating-skills.md
- [Diffs](tools/diffs.md) — tags: tools, diffs · Remote: https://docs.openclaw.ai/tools/diffs.md
- [DuckDuckGo Search](tools/duckduckgo-search.md) — tags: tools, duckduckgo, search · Remote: https://docs.openclaw.ai/tools/duckduckgo-search.md
- [Elevated Mode](tools/elevated.md) — tags: tools, elevated · Remote: https://docs.openclaw.ai/tools/elevated.md
- [Exa Search](tools/exa-search.md) — tags: tools, exa, search · Remote: https://docs.openclaw.ai/tools/exa-search.md
- [Exec Approvals](tools/exec-approvals.md) — tags: tools, exec, approvals · Remote: https://docs.openclaw.ai/tools/exec-approvals.md
- [Exec Tool](tools/exec.md) — tags: tools, exec · Remote: https://docs.openclaw.ai/tools/exec.md
- [Firecrawl](tools/firecrawl.md) — tags: tools, firecrawl · Remote: https://docs.openclaw.ai/tools/firecrawl.md
- [Gemini Search](tools/gemini-search.md) — tags: tools, gemini, search · Remote: https://docs.openclaw.ai/tools/gemini-search.md
- [Grok Search](tools/grok-search.md) — tags: tools, grok, search · Remote: https://docs.openclaw.ai/tools/grok-search.md
- [Image Generation](tools/image-generation.md) — tags: tools, image, generation · Remote: https://docs.openclaw.ai/tools/image-generation.md
- [Tools and Plugins](tools/index.md) — tags: tools · Remote: https://docs.openclaw.ai/tools/index.md
- [Kimi Search](tools/kimi-search.md) — tags: tools, kimi, search · Remote: https://docs.openclaw.ai/tools/kimi-search.md
- [LLM Task](tools/llm-task.md) — tags: tools, llm, task · Remote: https://docs.openclaw.ai/tools/llm-task.md
- [Lobster](tools/lobster.md) — tags: tools, lobster · Remote: https://docs.openclaw.ai/tools/lobster.md
- [Tool-loop detection](tools/loop-detection.md) — tags: tools, loop, detection · Remote: https://docs.openclaw.ai/tools/loop-detection.md
- [Multi-Agent Sandbox & Tools](tools/multi-agent-sandbox-tools.md) — tags: tools, multi, agent, sandbox · Remote: https://docs.openclaw.ai/tools/multi-agent-sandbox-tools.md
- [Ollama Web Search](tools/ollama-search.md) — tags: tools, ollama, search · Remote: https://docs.openclaw.ai/tools/ollama-search.md
- [PDF Tool](tools/pdf.md) — tags: tools, pdf · Remote: https://docs.openclaw.ai/tools/pdf.md
- [Perplexity Search](tools/perplexity-search.md) — tags: tools, perplexity, search · Remote: https://docs.openclaw.ai/tools/perplexity-search.md
- [Plugins](tools/plugin.md) — tags: tools, plugin · Remote: https://docs.openclaw.ai/tools/plugin.md
- [Reactions](tools/reactions.md) — tags: tools, reactions · Remote: https://docs.openclaw.ai/tools/reactions.md
- [SearXNG Search](tools/searxng-search.md) — tags: tools, searxng, search · Remote: https://docs.openclaw.ai/tools/searxng-search.md
- [Skills Config](tools/skills-config.md) — tags: tools, skills, config · Remote: https://docs.openclaw.ai/tools/skills-config.md
- [Skills](tools/skills.md) — tags: tools, skills · Remote: https://docs.openclaw.ai/tools/skills.md
- [Slash Commands](tools/slash-commands.md) — tags: tools, slash, commands · Remote: https://docs.openclaw.ai/tools/slash-commands.md
- [Sub-Agents](tools/subagents.md) — tags: tools, subagents · Remote: https://docs.openclaw.ai/tools/subagents.md
- [Tavily](tools/tavily.md) — tags: tools, tavily · Remote: https://docs.openclaw.ai/tools/tavily.md
- [Thinking Levels](tools/thinking.md) — tags: tools, thinking · Remote: https://docs.openclaw.ai/tools/thinking.md
- [Text-to-Speech](tools/tts.md) — tags: tools, tts · Remote: https://docs.openclaw.ai/tools/tts.md
- [Web Fetch](tools/web-fetch.md) — tags: tools, web, fetch · Remote: https://docs.openclaw.ai/tools/web-fetch.md
- [Web Search](tools/web.md) — tags: tools, web · Remote: https://docs.openclaw.ai/tools/web.md

### Nodes

- [Audio and Voice Notes](nodes/audio.md) — tags: nodes, audio · Remote: https://docs.openclaw.ai/nodes/audio.md
- [Camera Capture](nodes/camera.md) — tags: nodes, camera · Remote: https://docs.openclaw.ai/nodes/camera.md
- [Image and Media Support](nodes/images.md) — tags: nodes, images · Remote: https://docs.openclaw.ai/nodes/images.md
- [Nodes](nodes/index.md) — tags: nodes · Remote: https://docs.openclaw.ai/nodes/index.md
- [Location Command](nodes/location-command.md) — tags: nodes, location, command · Remote: https://docs.openclaw.ai/nodes/location-command.md
- [Media Understanding](nodes/media-understanding.md) — tags: nodes, media, understanding · Remote: https://docs.openclaw.ai/nodes/media-understanding.md
- [Talk Mode](nodes/talk.md) — tags: nodes, talk · Remote: https://docs.openclaw.ai/nodes/talk.md
- [Node Troubleshooting](nodes/troubleshooting.md) — tags: nodes, troubleshooting · Remote: https://docs.openclaw.ai/nodes/troubleshooting.md
- [Voice Wake](nodes/voicewake.md) — tags: nodes, voicewake · Remote: https://docs.openclaw.ai/nodes/voicewake.md

### Platforms

- [Android App](platforms/android.md) — tags: platforms, android · Remote: https://docs.openclaw.ai/platforms/android.md
- [Platforms](platforms/index.md) — tags: platforms · Remote: https://docs.openclaw.ai/platforms/index.md
- [iOS App](platforms/ios.md) — tags: platforms, ios · Remote: https://docs.openclaw.ai/platforms/ios.md
- [Linux App](platforms/linux.md) — tags: platforms, linux · Remote: https://docs.openclaw.ai/platforms/linux.md
- [Gateway on macOS](platforms/mac/bundled-gateway.md) — tags: platforms, mac, bundled, gateway · Remote: https://docs.openclaw.ai/platforms/mac/bundled-gateway.md
- [Canvas](platforms/mac/canvas.md) — tags: platforms, mac, canvas · Remote: https://docs.openclaw.ai/platforms/mac/canvas.md
- [Gateway Lifecycle](platforms/mac/child-process.md) — tags: platforms, mac, child, process · Remote: https://docs.openclaw.ai/platforms/mac/child-process.md
- [macOS Dev Setup](platforms/mac/dev-setup.md) — tags: platforms, mac, dev, setup · Remote: https://docs.openclaw.ai/platforms/mac/dev-setup.md
- [Health Checks (macOS)](platforms/mac/health.md) — tags: platforms, mac, health · Remote: https://docs.openclaw.ai/platforms/mac/health.md
- [Menu Bar Icon](platforms/mac/icon.md) — tags: platforms, mac, icon · Remote: https://docs.openclaw.ai/platforms/mac/icon.md
- [macOS Logging](platforms/mac/logging.md) — tags: platforms, mac, logging · Remote: https://docs.openclaw.ai/platforms/mac/logging.md
- [Menu Bar](platforms/mac/menu-bar.md) — tags: platforms, mac, menu, bar · Remote: https://docs.openclaw.ai/platforms/mac/menu-bar.md
- [Peekaboo Bridge](platforms/mac/peekaboo.md) — tags: platforms, mac, peekaboo · Remote: https://docs.openclaw.ai/platforms/mac/peekaboo.md
- [macOS Permissions](platforms/mac/permissions.md) — tags: platforms, mac, permissions · Remote: https://docs.openclaw.ai/platforms/mac/permissions.md
- [macOS Release](platforms/mac/release.md) — tags: platforms, mac, release · status: stale-local · Remote: https://docs.openclaw.ai/platforms/mac/release.md
- [Remote Control](platforms/mac/remote.md) — tags: platforms, mac, remote · Remote: https://docs.openclaw.ai/platforms/mac/remote.md
- [macOS Signing](platforms/mac/signing.md) — tags: platforms, mac, signing · Remote: https://docs.openclaw.ai/platforms/mac/signing.md
- [Skills (macOS)](platforms/mac/skills.md) — tags: platforms, mac, skills · Remote: https://docs.openclaw.ai/platforms/mac/skills.md
- [Voice Overlay](platforms/mac/voice-overlay.md) — tags: platforms, mac, voice, overlay · Remote: https://docs.openclaw.ai/platforms/mac/voice-overlay.md
- [Voice Wake (macOS)](platforms/mac/voicewake.md) — tags: platforms, mac, voicewake · Remote: https://docs.openclaw.ai/platforms/mac/voicewake.md
- [WebChat (macOS)](platforms/mac/webchat.md) — tags: platforms, mac, webchat · Remote: https://docs.openclaw.ai/platforms/mac/webchat.md
- [macOS IPC](platforms/mac/xpc.md) — tags: platforms, mac, xpc · Remote: https://docs.openclaw.ai/platforms/mac/xpc.md
- [macOS App](platforms/macos.md) — tags: platforms, macos · Remote: https://docs.openclaw.ai/platforms/macos.md
- [Windows](platforms/windows.md) — tags: platforms, windows · Remote: https://docs.openclaw.ai/platforms/windows.md

### Web & UI

- [Control UI](web/control-ui.md) — tags: web, control, ui · Remote: https://docs.openclaw.ai/web/control-ui.md
- [Dashboard](web/dashboard.md) — tags: web, dashboard · Remote: https://docs.openclaw.ai/web/dashboard.md
- [Web](web/index.md) — tags: web · Remote: https://docs.openclaw.ai/web/index.md
- [TUI](web/tui.md) — tags: web, tui · Remote: https://docs.openclaw.ai/web/tui.md
- [WebChat](web/webchat.md) — tags: web, webchat · Remote: https://docs.openclaw.ai/web/webchat.md

### Automation

- [Auth Monitoring](automation/auth-monitoring.md) — tags: automation, auth, monitoring · status: stale-local · Remote: https://docs.openclaw.ai/automation/auth-monitoring.md
- [Scheduled Tasks](automation/cron-jobs.md) — tags: automation, cron, jobs · Remote: https://docs.openclaw.ai/automation/cron-jobs.md
- [Cron vs Heartbeat](automation/cron-vs-heartbeat.md) — tags: automation, cron, vs, heartbeat · status: stale-local · Remote: https://docs.openclaw.ai/automation/cron-vs-heartbeat.md
- [Gmail PubSub](automation/gmail-pubsub.md) — tags: automation, gmail, pubsub · status: stale-local · Remote: https://docs.openclaw.ai/automation/gmail-pubsub.md
- [Hooks](automation/hooks.md) — tags: automation, hooks · Remote: https://docs.openclaw.ai/automation/hooks.md
- [Automation & Tasks](automation/index.md) — tags: automation · Remote: https://docs.openclaw.ai/automation/index.md
- [Polls](automation/poll.md) — tags: automation, poll · status: stale-local · Remote: https://docs.openclaw.ai/automation/poll.md
- [Standing Orders](automation/standing-orders.md) — tags: automation, standing, orders · Remote: https://docs.openclaw.ai/automation/standing-orders.md
- [Task Flow](automation/taskflow.md) — tags: automation, taskflow · Remote: https://docs.openclaw.ai/automation/taskflow.md
- [Background Tasks](automation/tasks.md) — tags: automation, tasks · Remote: https://docs.openclaw.ai/automation/tasks.md
- [Automation Troubleshooting](automation/troubleshooting.md) — tags: automation, troubleshooting · status: stale-local · Remote: https://docs.openclaw.ai/automation/troubleshooting.md
- [Webhooks](automation/webhook.md) — tags: automation, webhook · status: stale-local · Remote: https://docs.openclaw.ai/automation/webhook.md

### Core Concepts

- [Agent Loop](concepts/agent-loop.md) — tags: concepts, agent, loop · Remote: https://docs.openclaw.ai/concepts/agent-loop.md
- [Agent Workspace](concepts/agent-workspace.md) — tags: concepts, agent, workspace · Remote: https://docs.openclaw.ai/concepts/agent-workspace.md
- [Agent Runtime](concepts/agent.md) — tags: concepts, agent · Remote: https://docs.openclaw.ai/concepts/agent.md
- [Gateway Architecture](concepts/architecture.md) — tags: concepts, architecture · Remote: https://docs.openclaw.ai/concepts/architecture.md
- [Compaction](concepts/compaction.md) — tags: concepts, compaction · Remote: https://docs.openclaw.ai/concepts/compaction.md
- [Context Engine](concepts/context-engine.md) — tags: concepts, context, engine · Remote: https://docs.openclaw.ai/concepts/context-engine.md
- [Context](concepts/context.md) — tags: concepts, context · Remote: https://docs.openclaw.ai/concepts/context.md
- [Delegate Architecture](concepts/delegate-architecture.md) — tags: concepts, delegate, architecture · Remote: https://docs.openclaw.ai/concepts/delegate-architecture.md
- [Features](concepts/features.md) — tags: concepts, features · Remote: https://docs.openclaw.ai/concepts/features.md
- [Markdown Formatting](concepts/markdown-formatting.md) — tags: concepts, markdown, formatting · Remote: https://docs.openclaw.ai/concepts/markdown-formatting.md
- [Builtin Memory Engine](concepts/memory-builtin.md) — tags: concepts, memory, builtin · Remote: https://docs.openclaw.ai/concepts/memory-builtin.md
- [Dreaming (experimental)](concepts/memory-dreaming.md) — tags: concepts, memory, dreaming · Remote: https://docs.openclaw.ai/concepts/memory-dreaming.md
- [Honcho Memory](concepts/memory-honcho.md) — tags: concepts, memory, honcho · Remote: https://docs.openclaw.ai/concepts/memory-honcho.md
- [QMD Memory Engine](concepts/memory-qmd.md) — tags: concepts, memory, qmd · Remote: https://docs.openclaw.ai/concepts/memory-qmd.md
- [Memory Search](concepts/memory-search.md) — tags: concepts, memory, search · Remote: https://docs.openclaw.ai/concepts/memory-search.md
- [Memory Overview](concepts/memory.md) — tags: concepts, memory · Remote: https://docs.openclaw.ai/concepts/memory.md
- [Messages](concepts/messages.md) — tags: concepts, messages · Remote: https://docs.openclaw.ai/concepts/messages.md
- [Model Failover](concepts/model-failover.md) — tags: concepts, model, failover · Remote: https://docs.openclaw.ai/concepts/model-failover.md
- [Model Providers](concepts/model-providers.md) — tags: concepts, model, providers · Remote: https://docs.openclaw.ai/concepts/model-providers.md
- [Models CLI](concepts/models.md) — tags: concepts, models · Remote: https://docs.openclaw.ai/concepts/models.md
- [Multi-Agent Routing](concepts/multi-agent.md) — tags: concepts, multi, agent · Remote: https://docs.openclaw.ai/concepts/multi-agent.md
- [OAuth](concepts/oauth.md) — tags: concepts, oauth · Remote: https://docs.openclaw.ai/concepts/oauth.md
- [Presence](concepts/presence.md) — tags: concepts, presence · Remote: https://docs.openclaw.ai/concepts/presence.md
- [Command Queue](concepts/queue.md) — tags: concepts, queue · Remote: https://docs.openclaw.ai/concepts/queue.md
- [Retry Policy](concepts/retry.md) — tags: concepts, retry · Remote: https://docs.openclaw.ai/concepts/retry.md
- [Session Pruning](concepts/session-pruning.md) — tags: concepts, session, pruning · Remote: https://docs.openclaw.ai/concepts/session-pruning.md
- [Session Tools](concepts/session-tool.md) — tags: concepts, session, tool · Remote: https://docs.openclaw.ai/concepts/session-tool.md
- [Session Management](concepts/session.md) — tags: concepts, session · Remote: https://docs.openclaw.ai/concepts/session.md
- [Sessions](concepts/sessions.md) — tags: concepts, sessions · status: stale-local · Remote: https://docs.openclaw.ai/concepts/sessions.md
- [SOUL.md Personality Guide](concepts/soul.md) — tags: concepts, soul · Remote: https://docs.openclaw.ai/concepts/soul.md
- [Streaming and Chunking](concepts/streaming.md) — tags: concepts, streaming · Remote: https://docs.openclaw.ai/concepts/streaming.md
- [System Prompt](concepts/system-prompt.md) — tags: concepts, system, prompt · Remote: https://docs.openclaw.ai/concepts/system-prompt.md
- [Timezones](concepts/timezone.md) — tags: concepts, timezone · Remote: https://docs.openclaw.ai/concepts/timezone.md
- [TypeBox](concepts/typebox.md) — tags: concepts, typebox · Remote: https://docs.openclaw.ai/concepts/typebox.md
- [Typing Indicators](concepts/typing-indicators.md) — tags: concepts, typing, indicators · Remote: https://docs.openclaw.ai/concepts/typing-indicators.md
- [Usage Tracking](concepts/usage-tracking.md) — tags: concepts, usage, tracking · Remote: https://docs.openclaw.ai/concepts/usage-tracking.md

### Reference & Templates

- [Default AGENTS.md](reference/AGENTS.default.md) — tags: reference, agents.default · Remote: https://docs.openclaw.ai/reference/AGENTS.default
- [API Usage and Costs](reference/api-usage-costs.md) — tags: reference, api, usage, costs · Remote: https://docs.openclaw.ai/reference/api-usage-costs.md
- [Credits](reference/credits.md) — tags: reference, credits · Remote: https://docs.openclaw.ai/reference/credits.md
- [Device Model Database](reference/device-models.md) — tags: reference, device, models · Remote: https://docs.openclaw.ai/reference/device-models.md
- [Memory configuration reference](reference/memory-config.md) — tags: reference, memory, config · Remote: https://docs.openclaw.ai/reference/memory-config.md
- [Prompt Caching](reference/prompt-caching.md) — tags: reference, prompt, caching · Remote: https://docs.openclaw.ai/reference/prompt-caching.md
- [Release Policy](reference/RELEASING.md) — tags: reference, releasing · Remote: https://docs.openclaw.ai/reference/RELEASING.md
- [RPC Adapters](reference/rpc.md) — tags: reference, rpc · Remote: https://docs.openclaw.ai/reference/rpc.md
- [SecretRef Credential Surface](reference/secretref-credential-surface.md) — tags: reference, secretref, credential, surface · Remote: https://docs.openclaw.ai/reference/secretref-credential-surface.md
- [Session Management Deep Dive](reference/session-management-compaction.md) — tags: reference, session, management, compaction · Remote: https://docs.openclaw.ai/reference/session-management-compaction.md
- [AGENTS.md Template](reference/templates/AGENTS.md) — tags: reference, templates, agents · Remote: https://docs.openclaw.ai/reference/templates/AGENTS.md
- [BOOT.md Template](reference/templates/BOOT.md) — tags: reference, templates, boot · Remote: https://docs.openclaw.ai/reference/templates/BOOT.md
- [BOOTSTRAP.md Template](reference/templates/BOOTSTRAP.md) — tags: reference, templates, bootstrap · Remote: https://docs.openclaw.ai/reference/templates/BOOTSTRAP.md
- [HEARTBEAT.md Template](reference/templates/HEARTBEAT.md) — tags: reference, templates, heartbeat · Remote: https://docs.openclaw.ai/reference/templates/HEARTBEAT.md
- [IDENTITY Template](reference/templates/IDENTITY.md) — tags: reference, templates, identity · Remote: https://docs.openclaw.ai/reference/templates/IDENTITY.md
- [SOUL.md Template](reference/templates/SOUL.md) — tags: reference, templates, soul · Remote: https://docs.openclaw.ai/reference/templates/SOUL.md
- [TOOLS.md Template](reference/templates/TOOLS.md) — tags: reference, templates, tools · Remote: https://docs.openclaw.ai/reference/templates/TOOLS.md
- [USER Template](reference/templates/USER.md) — tags: reference, templates, user · Remote: https://docs.openclaw.ai/reference/templates/USER.md
- [Tests](reference/test.md) — tags: reference, test · Remote: https://docs.openclaw.ai/reference/test.md
- [Token Use and Costs](reference/token-use.md) — tags: reference, token, use · Remote: https://docs.openclaw.ai/reference/token-use.md
- [Transcript Hygiene](reference/transcript-hygiene.md) — tags: reference, transcript, hygiene · Remote: https://docs.openclaw.ai/reference/transcript-hygiene.md
- [Onboarding Reference](reference/wizard.md) — tags: reference, wizard · Remote: https://docs.openclaw.ai/reference/wizard.md

### Security

- [Contributing to the Threat Model](security/CONTRIBUTING-THREAT-MODEL.md) — tags: security, contributing, threat, model · Remote: https://docs.openclaw.ai/security/CONTRIBUTING-THREAT-MODEL.md
- [Formal Verification (Security Models)](security/formal-verification.md) — tags: security, formal, verification · Remote: https://docs.openclaw.ai/security/formal-verification.md
- [Threat Model (MITRE ATLAS)](security/THREAT-MODEL-ATLAS.md) — tags: security, threat, model, atlas · Remote: https://docs.openclaw.ai/security/THREAT-MODEL-ATLAS.md

### Help

- [Debugging](help/debugging.md) — tags: help, debugging · Remote: https://docs.openclaw.ai/help/debugging.md
- [Environment Variables](help/environment.md) — tags: help, environment · Remote: https://docs.openclaw.ai/help/environment.md
- [FAQ](help/faq.md) — tags: help, faq · Remote: https://docs.openclaw.ai/help/faq.md
- [Help](help/index.md) — tags: help · Remote: https://docs.openclaw.ai/help/index.md
- [Scripts](help/scripts.md) — tags: help, scripts · Remote: https://docs.openclaw.ai/help/scripts.md
- [Testing](help/testing.md) — tags: help, testing · Remote: https://docs.openclaw.ai/help/testing.md
- [General Troubleshooting](help/troubleshooting.md) — tags: help, troubleshooting · Remote: https://docs.openclaw.ai/help/troubleshooting.md

### Misc

- [api reference: openapi.json](api-reference/openapi.json.md) — tags: api, reference, openapi.json · Remote: https://docs.openclaw.ai/api-reference/openapi.json
- [Auth Credential Semantics](auth-credential-semantics.md) — tags: auth, credential, semantics · Remote: https://docs.openclaw.ai/auth-credential-semantics.md
- [CI Pipeline](ci.md) — tags: ci · Remote: https://docs.openclaw.ai/ci.md
- [Date and Time](date-time.md) — tags: date, time · Remote: https://docs.openclaw.ai/date-time.md
- [Node + tsx Crash](debug/node-issue.md) — tags: debug, node, issue · Remote: https://docs.openclaw.ai/debug/node-issue.md
- [Diagnostics Flags](diagnostics/flags.md) — tags: diagnostics, flags · Remote: https://docs.openclaw.ai/diagnostics/flags.md
- [Onboarding and Config Protocol](experiments/onboarding-config-protocol.md) — tags: experiments, onboarding, config, protocol · status: stale-local · Remote: https://docs.openclaw.ai/experiments/onboarding-config-protocol.md
- [Cron Add Hardening](experiments/plans/cron-add-hardening.md) — tags: experiments, plans, cron, add, hardening · status: stale-local · Remote: https://docs.openclaw.ai/experiments/plans/cron-add-hardening.md
- [Telegram Allowlist Hardening](experiments/plans/group-policy-hardening.md) — tags: experiments, plans, group, policy, hardening · status: stale-local · Remote: https://docs.openclaw.ai/experiments/plans/group-policy-hardening.md
- [Model Config Exploration](experiments/proposals/model-config.md) — tags: experiments, proposals, model, config · status: stale-local · Remote: https://docs.openclaw.ai/experiments/proposals/model-config.md
- [Workspace Memory Research](experiments/research/memory.md) — tags: experiments, research, memory · status: stale-local · Remote: https://docs.openclaw.ai/experiments/research/memory.md
- [OpenClaw](index.md) · Remote: https://docs.openclaw.ai/index.md
- [Logging Overview](logging.md) — tags: logging · Remote: https://docs.openclaw.ai/logging.md
- [Network](network.md) — tags: network · Remote: https://docs.openclaw.ai/network.md
- [Pi Development Workflow](pi-dev.md) — tags: pi, dev · Remote: https://docs.openclaw.ai/pi-dev.md
- [Pi Integration Architecture](pi.md) — tags: pi · Remote: https://docs.openclaw.ai/pi.md
- [Plugin Internals](plugins/architecture.md) — tags: plugins, architecture · Remote: https://docs.openclaw.ai/plugins/architecture.md
- [Building Plugins](plugins/building-plugins.md) — tags: plugins, building · Remote: https://docs.openclaw.ai/plugins/building-plugins.md
- [Plugin Bundles](plugins/bundles.md) — tags: plugins, bundles · Remote: https://docs.openclaw.ai/plugins/bundles.md
- [Community Plugins](plugins/community.md) — tags: plugins, community · Remote: https://docs.openclaw.ai/plugins/community.md
- [Plugin Manifest](plugins/manifest.md) — tags: plugins, manifest · Remote: https://docs.openclaw.ai/plugins/manifest.md
- [Building Channel Plugins](plugins/sdk-channel-plugins.md) — tags: plugins, sdk, channel · Remote: https://docs.openclaw.ai/plugins/sdk-channel-plugins.md
- [Plugin Entry Points](plugins/sdk-entrypoints.md) — tags: plugins, sdk, entrypoints · Remote: https://docs.openclaw.ai/plugins/sdk-entrypoints.md
- [Plugin SDK Migration](plugins/sdk-migration.md) — tags: plugins, sdk, migration · Remote: https://docs.openclaw.ai/plugins/sdk-migration.md
- [Plugin SDK Overview](plugins/sdk-overview.md) — tags: plugins, sdk, overview · Remote: https://docs.openclaw.ai/plugins/sdk-overview.md
- [Building Provider Plugins](plugins/sdk-provider-plugins.md) — tags: plugins, sdk, provider · Remote: https://docs.openclaw.ai/plugins/sdk-provider-plugins.md
- [Plugin Runtime Helpers](plugins/sdk-runtime.md) — tags: plugins, sdk, runtime · Remote: https://docs.openclaw.ai/plugins/sdk-runtime.md
- [Plugin Setup and Config](plugins/sdk-setup.md) — tags: plugins, sdk, setup · Remote: https://docs.openclaw.ai/plugins/sdk-setup.md
- [Plugin Testing](plugins/sdk-testing.md) — tags: plugins, sdk, testing · Remote: https://docs.openclaw.ai/plugins/sdk-testing.md
- [Voice Call Plugin](plugins/voice-call.md) — tags: plugins, voice, call · Remote: https://docs.openclaw.ai/plugins/voice-call.md
- [Zalo Personal Plugin](plugins/zalouser.md) — tags: plugins, zalouser · status: stale-local · Remote: https://docs.openclaw.ai/plugins/zalouser.md
- [OpenProse](prose.md) — tags: prose · Remote: https://docs.openclaw.ai/prose.md
- [Linux Server](vps.md) — tags: vps · Remote: https://docs.openclaw.ai/vps.md

