<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/experiments/plans/group-policy-hardening.md; fetched_at=2026-02-20T10:29:19.020Z; sha256=8a131904ae0e56d050ed68034ede73d35a4da2c2680ef9f1fa45b60a548faa58; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Telegram Allowlist Hardening

# Telegram Allowlist Hardening

**Date**: 2026-01-05\
**Status**: Complete\
**PR**: #216

## Summary

Telegram allowlists now accept `telegram:` and `tg:` prefixes case-insensitively, and tolerate
accidental whitespace. This aligns inbound allowlist checks with outbound send normalization.

## What changed

* Prefixes `telegram:` and `tg:` are treated the same (case-insensitive).
* Allowlist entries are trimmed; empty entries are ignored.

## Examples

All of these are accepted for the same ID:

* `telegram:123456`
* `TG:123456`
* `tg:123456`

## Why it matters

Copy/paste from logs or chat IDs often includes prefixes and whitespace. Normalizing avoids
false negatives when deciding whether to respond in DMs or groups.

## Related docs

* [Group Chats](/channels/groups)
* [Telegram Provider](/channels/telegram)
