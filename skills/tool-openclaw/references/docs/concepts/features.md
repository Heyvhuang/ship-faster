<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/concepts/features.md; fetched_at=2026-02-20T10:29:17.108Z; sha256=d1ed9b85724cda3f9177df7cf21fb07a6a5ff146c0a976d8fba5694b2d483b37; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Features

## Highlights

<Columns>
  <Card title="Channels" icon="message-square">
    WhatsApp, Telegram, Discord, and iMessage with a single Gateway.
  </Card>

  <Card title="Plugins" icon="plug">
    Add Mattermost and more with extensions.
  </Card>

  <Card title="Routing" icon="route">
    Multi-agent routing with isolated sessions.
  </Card>

  <Card title="Media" icon="image">
    Images, audio, and documents in and out.
  </Card>

  <Card title="Apps and UI" icon="monitor">
    Web Control UI and macOS companion app.
  </Card>

  <Card title="Mobile nodes" icon="smartphone">
    iOS and Android nodes with Canvas support.
  </Card>
</Columns>

## Full list

* WhatsApp integration via WhatsApp Web (Baileys)
* Telegram bot support (grammY)
* Discord bot support (channels.discord.js)
* Mattermost bot support (plugin)
* iMessage integration via local imsg CLI (macOS)
* Agent bridge for Pi in RPC mode with tool streaming
* Streaming and chunking for long responses
* Multi-agent routing for isolated sessions per workspace or sender
* Subscription auth for Anthropic and OpenAI via OAuth
* Sessions: direct chats collapse into shared `main`; groups are isolated
* Group chat support with mention based activation
* Media support for images, audio, and documents
* Optional voice note transcription hook
* WebChat and macOS menu bar app
* iOS node with pairing and Canvas surface
* Android node with pairing, Canvas, chat, and camera

<Note>
  Legacy Claude, Codex, Gemini, and Opencode paths have been removed. Pi is the only
  coding agent path.
</Note>
