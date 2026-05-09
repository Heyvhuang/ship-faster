---
title: Deduplicate Per-Request Work with React.cache
impact: HIGH
impactDescription: avoids repeated queries within one request
tags: server, cache, react-cache, nextjs, performance
---

## Deduplicate Per-Request Work with React.cache

On the server, `React.cache()` (or `cache` from `react`) can deduplicate identical calls within a single request. This is especially useful for auth/user lookups.

**Detect:**
- Multiple components call `getCurrentUser()` and each hits the DB.

**Example:**

```ts
import { cache } from "react"

export const getCurrentUser = cache(async () => {
  const session = await auth()
  if (!session?.user?.id) return null
  return db.user.findUnique({ where: { id: session.user.id } })
})
```

References:
- https://react.dev/reference/react/cache

