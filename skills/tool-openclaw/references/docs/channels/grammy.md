<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/channels/grammy.md; fetched_at=2026-02-20T10:29:13.228Z; sha256=eda88a71e9101627f817ee95d49ee9825ce1cdcaf4096849c4f69178db2752ef; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# grammY

# grammY Integration (Telegram Bot API)

# Why grammY

* TS-first Bot API client with built-in long-poll + webhook helpers, middleware, error handling, rate limiter.
* Cleaner media helpers than hand-rolling fetch + FormData; supports all Bot API methods.
* Extensible: proxy support via custom fetch, session middleware (optional), type-safe context.

# What we shipped

* **Single client path:** fetch-based implementation removed; grammY is now the sole Telegram client (send + gateway) with the grammY throttler enabled by default.
* **Gateway:** `monitorTelegramProvider` builds a grammY `Bot`, wires mention/allowlist gating, media download via `getFile`/`download`, and delivers replies with `sendMessage/sendPhoto/sendVideo/sendAudio/sendDocument`. Supports long-poll or webhook via `webhookCallback`.
* **Proxy:** optional `channels.telegram.proxy` uses `undici.ProxyAgent` through grammY’s `client.baseFetch`.
* **Webhook support:** `webhook-set.ts` wraps `setWebhook/deleteWebhook`; `webhook.ts` hosts the callback with health + graceful shutdown. Gateway enables webhook mode when `channels.telegram.webhookUrl` + `channels.telegram.webhookSecret` are set (otherwise it long-polls).
* **Sessions:** direct chats collapse into the agent main session (`agent:<agentId>:<mainKey>`); groups use `agent:<agentId>:telegram:group:<chatId>`; replies route back to the same channel.
* **Config knobs:** `channels.telegram.botToken`, `channels.telegram.dmPolicy`, `channels.telegram.groups` (allowlist + mention defaults), `channels.telegram.allowFrom`, `channels.telegram.groupAllowFrom`, `channels.telegram.groupPolicy`, `channels.telegram.mediaMaxMb`, `channels.telegram.linkPreview`, `channels.telegram.proxy`, `channels.telegram.webhookSecret`, `channels.telegram.webhookUrl`, `channels.telegram.webhookHost`.
* **Live stream preview:** optional `channels.telegram.streamMode` sends a temporary message and updates it with `editMessageText`. This is separate from channel block streaming.
* **Tests:** grammy mocks cover DM + group mention gating and outbound send; more media/webhook fixtures still welcome.

Open questions

* Optional grammY plugins (throttler) if we hit Bot API 429s.
* Add more structured media tests (stickers, voice notes).
* Make webhook listen port configurable (currently fixed to 8787 unless wired through the gateway).
