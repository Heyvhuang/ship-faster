---
name: clean-code-reviewer
description: Analyze code quality based on "Clean Code" principles. Identify naming, function size, duplication, over-engineering, and magic number issues with severity ratings and refactoring suggestions. Use when the user requests code review, quality check, refactoring advice, Clean Code analysis, code smell detection, code health check, or code quality assessment.
---

# Clean Code Review

Based on "Clean Code" principles, focusing on 7 high-value review dimensions.

## Review Workflow

```
Review Progress:
- [ ] 1. Scan codebase: identify files to review
- [ ] 2. Check each dimension (naming, functions, DRY, YAGNI, magic numbers, clarity, conventions)
- [ ] 3. Rate severity (High/Medium/Low) for each issue
- [ ] 4. Generate report sorted by severity
```

## Core Principle: Preserve Functionality

All suggestions target **implementation improvements** only—never suggest changing the code's functionality, output, or behavior.

## Check Dimensions

### 1. Naming Issues【Meaningful Names】

Check for:
- Meaningless names like `data1`, `temp`, `result`, `info`, `obj`
- Inconsistent naming for the same concept (`get`/`fetch`/`retrieve` mixed usage)

```typescript
// ❌ 
const d = new Date();
const data1 = fetchUser();

// ✅ 
const currentDate = new Date();
const userProfile = fetchUser();
```

### 2. Function Issues【Small Functions + SRP】

Check for:
- Functions exceeding **100 lines**
- More than **3 parameters**
- Functions doing multiple things

```typescript
// ❌ 7 parameters
function processOrder(user, items, address, payment, discount, coupon, notes)

// ✅ Use parameter object
interface OrderParams { user: User; items: Item[]; shipping: Address; payment: Payment }
function processOrder(params: OrderParams)
```

### 3. Duplication Issues【DRY】

Check for:
- Similar if-else structures
- Similar data transformation/error handling logic
- Copy-paste traces

### 4. Over-Engineering【YAGNI】

Check for:
- `if (config.legacyMode)` branches that are never true
- Interfaces with only one implementation
- Useless try-catch or if-else blocks

```typescript
// ❌ YAGNI violation: compatibility code never used
if (config.legacyMode) {
  // 100 lines of compatibility code
}
```

### 5. Magic Numbers【Avoid Hardcoding】

Check for:
- Unexplained bare numbers
- Hardcoded strings

```typescript
// ❌ 
if (retryCount > 3) // What is 3?
setTimeout(fn, 86400000) // How long is this?

// ✅ 
const MAX_RETRY_COUNT = 3;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
```

### 6. Structural Clarity【Readability First】

Check for:
- Nested ternary operators
- Overly compact one-liners
- Deep conditional nesting (> 3 levels)

```typescript
// ❌ Nested ternary
const status = a ? (b ? 'x' : 'y') : (c ? 'z' : 'w');

// ✅ Use switch or if/else
function getStatus(a, b, c) {
  if (a) return b ? 'x' : 'y';
  return c ? 'z' : 'w';
}
```

### 7. Project Conventions【Consistency】

Check for:
- Disorganized import order (external libs vs internal modules)
- Inconsistent function declaration styles
- Mixed naming conventions (camelCase vs snake_case)

```typescript
// ❌ Inconsistent style
import { api } from './api'
import axios from 'axios'  // External libs should come first
const handle_click = () => { ... }  // Mixed naming style

// ✅ Unified style
import axios from 'axios'
import { api } from './api'
function handleClick(): void { ... }
```

> [!TIP]
> Project conventions should follow `CLAUDE.md`, `AGENTS.md`, or the project's coding standards.

## Severity Levels

| Level | Criteria |
|-------|----------|
| High | Impacts maintainability/readability, should be fixed immediately |
| Medium | Has room for improvement, recommended to fix |
| Low | Code smell, optional optimization |

## Output Format

```markdown
### [Issue Type]: [Brief Description]

- **Principle**: [Clean Code principle]
- **Location**: `file:line`
- **Severity**: High/Medium/Low
- **Problem**: [Specific description]
- **Suggestion**: [Fix direction]
```

## Artifacts (Pipeline Mode)

- Output: `clean-code-review.md` (human-readable report)
- Output: `clean-code-review.json` (structured issue list for aggregation/deduplication/statistics)

## References

**Detailed examples**: See [references/detailed-examples.md](references/detailed-examples.md)
- Complete examples for each dimension (naming, functions, DRY, YAGNI, magic numbers)

**Language patterns**: See [references/language-patterns.md](references/language-patterns.md)
- TypeScript/JavaScript common issues
- Python common issues
- Go common issues

## Multi-Agent Parallel

Split work across multiple agents by:

1. **By check dimension** - One agent per each of the 7 dimensions
2. **By module/directory** - One agent per different module
3. **By language** - One agent each for TypeScript, Python, Go
4. **By file type** - Components, hooks, utilities, type definitions

Example: `/clean-code-reviewer --scope=components` or `--dimension=naming`

When aggregating, deduplicate and unify severity ratings.
