---
title: Use Promise.all for Independent Work
impact: CRITICAL
impactDescription: collapses N round-trips into 1
tags: async, promise-all, waterfall, server, performance
---

## Use Promise.all for Independent Work

If multiple async operations are independent, use `Promise.all()` so they run concurrently.

**Detect:**
- Sequential awaits with no data dependency.

**Incorrect:**

```ts
const profile = await fetchProfile(userId)
const feed = await fetchFeed(userId)
```

**Correct:**

```ts
const [profile, feed] = await Promise.all([fetchProfile(userId), fetchFeed(userId)])
```

