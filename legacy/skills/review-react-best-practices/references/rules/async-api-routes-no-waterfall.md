---
title: Avoid Waterfall Chains in Route Handlers / Server Actions
impact: HIGH
impactDescription: reduces server response latency
tags: async, server-actions, route-handler, nextjs, performance
---

## Avoid Waterfall Chains in Route Handlers / Server Actions

In a route handler / server action, start independent work immediately even if you need auth first. Await the minimum dependency, then join the rest.

**Detect:**
- Handler does `await auth()` then `await fetchConfig()` then `await fetchData()`.

**Incorrect (waterfall):**

```ts
export async function GET() {
  const session = await auth()
  const config = await fetchConfig()
  const data = await fetchData(session.user.id)
  return Response.json({ config, data })
}
```

**Correct (start early):**

```ts
export async function GET() {
  const sessionPromise = auth()
  const configPromise = fetchConfig()

  const session = await sessionPromise
  const [config, data] = await Promise.all([configPromise, fetchData(session.user.id)])
  return Response.json({ config, data })
}
```

