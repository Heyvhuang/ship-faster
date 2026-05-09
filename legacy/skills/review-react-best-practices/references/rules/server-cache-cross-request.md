---
title: Use Cross-Request Caching Only with Clear Invalidation
impact: MEDIUM
impactDescription: reduces repeated work across requests
tags: server, cache, lru, performance
---

## Use Cross-Request Caching Only with Clear Invalidation

Cross-request caching (LRU/memory) can help hot endpoints, but it can also serve stale data or leak memory. Only do it when you have clear TTL/invalidation.

**Detect:**
- Hot endpoints repeatedly fetching the same config/public data.
- Repeated expensive computations for identical inputs.

**Example (LRU with TTL):**

```ts
import LRUCache from "lru-cache"

const cache = new LRUCache<string, unknown>({ max: 500, ttl: 60_000 })

export async function getConfigCached() {
  const key = "config:v1"
  const hit = cache.get(key)
  if (hit) return hit
  const fresh = await fetchConfig()
  cache.set(key, fresh)
  return fresh
}
```

