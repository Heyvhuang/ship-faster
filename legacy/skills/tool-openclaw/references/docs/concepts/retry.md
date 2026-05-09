<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/concepts/retry.md; fetched_at=2026-04-04T20:36:06.329Z; sha256=4dc6955ebffccfa18cd13b09d8a0c3610ea20f8afb7caa6ca77d92ec1e8bb849; content_type=text/markdown; charset=utf-8; status=ok -->

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


Built with [Mintlify](https://mintlify.com).
