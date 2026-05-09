# Sections

This file defines all sections, their ordering, impact levels, and descriptions.
The section ID (in parentheses) is the filename prefix used to group rules.

---

## 1. Eliminating Waterfalls (async)

**Impact:** CRITICAL  
**Description:** Sequential awaits add full network latency. Remove waterfalls to get the largest wins.

## 2. Bundle Size Optimization (bundle)

**Impact:** CRITICAL  
**Description:** Smaller bundles improve TTI/LCP, reduce memory, and speed up dev/HMR.

## 3. Server-Side Performance (server)

**Impact:** HIGH  
**Description:** Improve server rendering and data fetching, reduce serialization, dedupe work per request.

## 4. Client-Side Data Fetching (client)

**Impact:** MEDIUM-HIGH  
**Description:** Deduplicate requests, reduce redundant work, keep UI responsive under network load.

## 5. Re-render Optimization (rerender)

**Impact:** MEDIUM  
**Description:** Prevent unnecessary re-renders, avoid wasted computation, improve responsiveness.

## 6. Rendering Performance (rendering)

**Impact:** MEDIUM  
**Description:** Reduce DOM work, avoid hydration issues, optimize long lists and expensive layouts.

## 7. JavaScript Performance (js)

**Impact:** LOW-MEDIUM  
**Description:** Micro-optimizations for hot paths. Only worth doing after big wins.

## 8. Advanced Patterns (advanced)

**Impact:** LOW  
**Description:** Patterns that are useful but easy to misuse. Apply only when the signal is strong.

