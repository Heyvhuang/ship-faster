<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/concepts/retry.md; fetched_at=2026-02-20T10:29:17.841Z; sha256=4cd3f03c0af268f018afd58018cd0f87dc1fe88b704e8ab0348a58f4ee643d14; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Retry Policy

# Retry policy

## Goals

* Retry per HTTP request, not per multi-step flow.
* Preserve ordering by retrying only the current step.
* Avoid duplicating non-idempotent operations.

## Defaults

* Attempts: 3
* Max delay cap: 30000 ms
* Jitter: 0.1 (10 percent)
* Provider defaults:
  * Telegram min delay: 400 ms
  * Discord min delay: 500 ms

## Behavior

### Discord

* Retries only on rate-limit errors (HTTP 429).
* Uses Discord `retry_after` when available, otherwise exponential backoff.

### Telegram

* Retries on transient errors (429, timeout, connect/reset/closed, temporarily unavailable).
* Uses `retry_after` when available, otherwise exponential backoff.
* Markdown parse errors are not retried; they fall back to plain text.

## Configuration

Set retry policy per provider in `~/.openclaw/openclaw.json`:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  channels: {
    telegram: {
      retry: {
        attempts: 3,
        minDelayMs: 400,
        maxDelayMs: 30000,
        jitter: 0.1,
      },
    },
    discord: {
      retry: {
        attempts: 3,
        minDelayMs: 500,
        maxDelayMs: 30000,
        jitter: 0.1,
      },
    },
  },
}
```

## Notes

* Retries apply per request (message send, media upload, reaction, poll, sticker).
* Composite flows do not retry completed steps.
