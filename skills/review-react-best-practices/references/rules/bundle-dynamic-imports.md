---
title: Dynamically Import Heavy Components
impact: HIGH
impactDescription: reduces initial JS payload
tags: bundle, dynamic-import, nextjs, performance
---

## Dynamically Import Heavy Components

If a component is large and not needed for the initial view (charts, editors, maps), load it dynamically.

**Detect:**
- Big third-party UI widgets always imported on the main route.
- A “settings” dialog that pulls in a large editor even when closed.

**Incorrect:**

```tsx
import { Chart } from "./Chart"

export function Dashboard() {
  return <Chart />
}
```

**Correct (Next.js):**

```tsx
import dynamic from "next/dynamic"

const Chart = dynamic(() => import("./Chart"), { ssr: false })

export function Dashboard() {
  return <Chart />
}
```

