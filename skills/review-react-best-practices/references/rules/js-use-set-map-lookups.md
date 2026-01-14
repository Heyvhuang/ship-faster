---
title: Use Set/Map for Repeated Lookups
impact: LOW-MEDIUM
impactDescription: reduces CPU in hot paths
tags: js, performance, set, map
---

## Use Set/Map for Repeated Lookups

If you repeatedly check membership, use a `Set` (O(1)) instead of `array.includes` (O(n)).

**Detect:**
- Nested loops with `includes`/`find` inside.

**Incorrect:**

```ts
for (const id of ids) {
  if (blockedIds.includes(id)) continue
}
```

**Correct:**

```ts
const blocked = new Set(blockedIds)
for (const id of ids) {
  if (blocked.has(id)) continue
}
```

