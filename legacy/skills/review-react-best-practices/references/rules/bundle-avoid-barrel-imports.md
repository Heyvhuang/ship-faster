---
title: Avoid Barrel Imports for Large Libraries
impact: CRITICAL
impactDescription: reduces dev startup + bundle bloat
tags: bundle, imports, barrel-files, nextjs, performance
---

## Avoid Barrel Imports for Large Libraries

Avoid importing from “barrel” entrypoints that re-export thousands of modules (icons, component suites). Import directly from the specific path when possible.

**Detect:**
- `import { X } from "some-big-lib"` (icons/components) where the package is known to have huge re-exports.
- Slow dev startup / slow HMR after adding a library.

**Incorrect (can pull in too much):**

```tsx
import { Check, X } from "lucide-react"
```

**Correct (direct imports, when supported):**

```tsx
import Check from "lucide-react/dist/esm/icons/check"
import X from "lucide-react/dist/esm/icons/x"
```

**Next.js alternative (if available):**

```js
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ["lucide-react"]
  }
}
```

