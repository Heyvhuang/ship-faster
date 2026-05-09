<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/concepts/session-pruning.md; fetched_at=2026-04-04T20:36:06.331Z; sha256=6acdb4d9d0eba50f531da4c1cc726572a2518d52f3032e04834eb2bcf522b533; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Session Pruning

# Session Pruning

Session pruning trims **old tool results** from the context before each LLM
call. It reduces context bloat from accumulated tool outputs (exec results, file
reads, search results) without rewriting normal conversation text.

<Info>
  Pruning is in-memory only -- it does not modify the on-disk session transcript.
  Your full history is always preserved.
</Info>

## Why it matters

Long sessions accumulate tool output that inflates the context window. This
increases cost and can force [compaction](/concepts/compaction) sooner than
necessary.

Pruning is especially valuable for **Anthropic prompt caching**. After the cache
TTL expires, the next request re-caches the full prompt. Pruning reduces the
cache-write size, directly lowering cost.

## How it works

1. Wait for the cache TTL to expire (default 5 minutes).
2. Find old tool results for normal pruning (conversation text is left alone).
3. **Soft-trim** oversized results -- keep the head and tail, insert `...`.
4. **Hard-clear** the rest -- replace with a placeholder.
5. Reset the TTL so follow-up requests reuse the fresh cache.

## Legacy image cleanup

OpenClaw also runs a separate idempotent cleanup for older legacy sessions that
persisted raw image blocks in history.

* It preserves the **3 most recent completed turns** byte-for-byte so prompt
  cache prefixes for recent follow-ups stay stable.
* Older already-processed image blocks in `user` or `toolResult` history can be
  replaced with `[image data removed - already processed by model]`.
* This is separate from normal cache-TTL pruning. It exists to stop repeated
  image payloads from busting prompt caches on later turns.

## Smart defaults

OpenClaw auto-enables pruning for Anthropic profiles:

| Profile type                    | Pruning enabled | Heartbeat |
| ------------------------------- | --------------- | --------- |
| Claude CLI or legacy token auth | Yes             | 1 hour    |
| API key                         | Yes             | 30 min    |

If you set explicit values, OpenClaw does not override them.

## Enable or disable

Pruning is off by default for non-Anthropic providers. To enable:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  agents: {
    defaults: {
      contextPruning: { mode: "cache-ttl", ttl: "5m" },
    },
  },
}
```

To disable: set `mode: "off"`.

## Pruning vs compaction

|            | Pruning            | Compaction              |
| ---------- | ------------------ | ----------------------- |
| **What**   | Trims tool results | Summarizes conversation |
| **Saved?** | No (per-request)   | Yes (in transcript)     |
| **Scope**  | Tool results only  | Entire conversation     |

They complement each other -- pruning keeps tool output lean between
compaction cycles.

## Further reading

* [Compaction](/concepts/compaction) -- summarization-based context reduction
* [Gateway Configuration](/gateway/configuration) -- all pruning config knobs
  (`contextPruning.*`)


Built with [Mintlify](https://mintlify.com).
