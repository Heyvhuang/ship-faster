---
title: Defer Non-Critical Third-Party Code
impact: HIGH
impactDescription: reduces main-thread work on load
tags: bundle, third-party, performance, analytics
---

## Defer Non-Critical Third-Party Code

Analytics, chat widgets, A/B testing SDKs, and other third-party code should not block first render.

**Detect:**
- Third-party SDK imported at module scope in the app entry.
- Widgets initialized on every page even when not needed.

**Incorrect:**

```ts
import "some-analytics-sdk"
```

**Correct (load after interaction / idle):**

```ts
export async function loadAnalytics() {
  const sdk = await import("some-analytics-sdk")
  sdk.init()
}
```

