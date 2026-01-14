---
title: Defer Await Until Needed
impact: HIGH
impactDescription: avoids blocking unused code paths
tags: async, await, waterfall, server, performance
---

## Defer Await Until Needed

Move `await` operations into the branches where they’re actually used to avoid blocking fast paths.

**Detect:**
- A function awaits data, then has an early return / branch that doesn’t use it.
- Server Actions / route handlers that always await auth/config before checking cheap conditions.

**Incorrect (blocks both branches):**

```ts
async function handleRequest(userId: string, skip: boolean) {
  const user = await fetchUser(userId)
  if (skip) return { skipped: true }
  return processUser(user)
}
```

**Correct (only blocks when needed):**

```ts
async function handleRequest(userId: string, skip: boolean) {
  if (skip) return { skipped: true }
  const user = await fetchUser(userId)
  return processUser(user)
}
```

