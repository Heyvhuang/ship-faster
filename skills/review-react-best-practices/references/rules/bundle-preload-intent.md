---
title: Preload Based on User Intent
impact: MEDIUM
impactDescription: improves perceived navigation speed
tags: bundle, preload, performance, ux
---

## Preload Based on User Intent

Preload heavy routes/components when there’s strong intent (hover, focus, intersection) rather than on page load.

**Detect:**
- Users frequently click into a heavy route; navigation feels slow.

**Example (preload on hover):**

```tsx
const preloadSettings = () => import("./SettingsPanel")

export function SettingsLink() {
  return (
    <a href="/settings" onMouseEnter={() => void preloadSettings()}>
      Settings
    </a>
  )
}
```

