---
title: Use content-visibility for Long Lists
impact: MEDIUM
impactDescription: reduces offscreen rendering work
tags: rendering, css, content-visibility, performance
---

## Use content-visibility for Long Lists

For long pages/lists where most content is offscreen, `content-visibility: auto` can reduce initial rendering cost.

**Detect:**
- Large lists rendered without virtualization.

**Example:**

```css
.listItem {
  content-visibility: auto;
  contain-intrinsic-size: 1px 80px;
}
```

