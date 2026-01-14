---
title: Use Suspense Boundaries to Stream Slow Subtrees
impact: HIGH
impactDescription: improves perceived performance (faster first paint)
tags: async, suspense, nextjs, streaming, performance
---

## Use Suspense Boundaries to Stream Slow Subtrees

When a subtree is slow (data fetching, heavy component), wrap it in a `Suspense` boundary so the rest of the page can render sooner.

**Detect:**
- A page blocks on slow data before rendering anything useful.
- Large layouts that wait for the slowest component.

**Incorrect (everything waits):**

```tsx
export default async function Page() {
  const data = await fetchSlow()
  return <Dashboard data={data} />
}
```

**Correct (stream slow part):**

```tsx
import { Suspense } from "react"

export default function Page() {
  return (
    <main>
      <Header />
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </main>
  )
}
```

References:
- https://react.dev/reference/react/Suspense

