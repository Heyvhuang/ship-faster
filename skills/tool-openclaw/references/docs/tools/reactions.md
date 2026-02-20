<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/tools/reactions.md; fetched_at=2026-02-20T10:29:29.469Z; sha256=9b6d12dee4105a32303f8f784c587f48a45f45f5b0195113655f5f2ff0ec6cba; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Reactions

# Reaction tooling

Shared reaction semantics across channels:

* `emoji` is required when adding a reaction.
* `emoji=""` removes the bot's reaction(s) when supported.
* `remove: true` removes the specified emoji when supported (requires `emoji`).

Channel notes:

* **Discord/Slack**: empty `emoji` removes all of the bot's reactions on the message; `remove: true` removes just that emoji.
* **Google Chat**: empty `emoji` removes the app's reactions on the message; `remove: true` removes just that emoji.
* **Telegram**: empty `emoji` removes the bot's reactions; `remove: true` also removes reactions but still requires a non-empty `emoji` for tool validation.
* **WhatsApp**: empty `emoji` removes the bot reaction; `remove: true` maps to empty emoji (still requires `emoji`).
* **Signal**: inbound reaction notifications emit system events when `channels.signal.reactionNotifications` is enabled.
