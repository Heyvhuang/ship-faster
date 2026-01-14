---
title: Start Promises Early, Await Late
impact: CRITICAL
impactDescription: reduces sequential latency (avoids waterfalls)
tags: async, waterfall, promise, performance, server
---

## Start Promises Early, Await Late

When operations are independent, start them immediately and await them together. This avoids adding multiple network RTTs to a single request.

**Detect:**
- Multiple awaits in sequence that don’t depend on each other.
- “Fetch A, then fetch B, then fetch C” in server code.

**Incorrect (sequential, adds latency):**

```ts
const user = await fetchUser()
const org = await fetchOrg()
const flags = await fetchFlags()
```

**Correct (parallel):**

```ts
const userPromise = fetchUser()
const orgPromise = fetchOrg()
const flagsPromise = fetchFlags()

const [user, org, flags] = await Promise.all([userPromise, orgPromise, flagsPromise])
```

