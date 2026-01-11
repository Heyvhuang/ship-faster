---
name: doc-consistency-reviewer
description: Documentation consistency reviewer that checks alignment between code implementation and documentation. Use this skill when the user requests reviewing documentation-code consistency, checking if README/docs are outdated, or verifying API documentation accuracy. Applicable for: (1) Reviewing README and implementation consistency (2) Checking if docs/ directory documentation is outdated (3) Verifying API/configuration documentation accuracy (4) Generating documentation consistency reports. Trigger phrases include: doc review, documentation consistency, check outdated docs, verify docs.
---

# Documentation Consistency Reviewer

## Objective

Systematically identify all "outdated" or "inconsistent with implementation" descriptions in README + docs/, outputting ≥30 issue items.

## Core Principles

1. **Code is Truth** - When documentation conflicts with code, source code/configuration/contract files take precedence
2. **Evidence Before Conclusions** - Each issue must cite code/configuration location as evidence
3. **Contracts First** - OpenAPI/proto/schema/TS types are treated as SSOT (Single Source of Truth)
4. **Security Default to Strict** - Security-related inconsistencies are prioritized as high severity

## Review Process

### 1. Document Enumeration

```bash
# Scan scope
- README.md (root directory)
- docs/**/*.md (all documentation)
- Contract files: OpenAPI/proto/GraphQL schema/TS types
```

### 2. Per-Document Review

For each document:
1. List key claims/promises/configurations/interface items
2. Search for corresponding implementations in code
3. Compare differences: missing/renamed/behavior mismatch/default value mismatch
4. Record issues using the template

### 3. Cross-Reference Check

- Reverse-check documentation from contract files
- Reverse-check documentation from configuration files

See detailed checklist at [references/checklist.md](references/checklist.md)

## Severity Levels

| Level | Definition | Example |
|-------|------------|---------|
| P0 | Security issue/severe misdirection | Docs claim sandbox enabled but code doesn't |
| P1 | Core functionality inconsistency | Following docs leads to failure |
| P2 | Incomplete examples/naming inconsistency | Doesn't directly block usage |
| P3 | Wording/formatting/link minor issues | Doesn't affect functionality |
| Needs Evidence | Suspected but insufficient evidence | Requires further investigation |

## Output Format

See detailed template at [references/output-format.md](references/output-format.md)

### Single Issue Item

```markdown
### [Title]
- **Severity**: P0/P1/P2/P3/Needs Evidence
- **Location**: `<file-path>:<line-number>`
- **Evidence**:
  - Documentation: [quote]
  - Code: [quote]
- **Impact**: [Consequence of misdirection]
- **Suggestion**: [Minimal fix]
- **Related Principle**: Code is Truth/Contracts First/Security Default to Strict/...
```

### Review Conclusion

```markdown
## Review Conclusion
- **Result**: Pass/Conditional Pass/Fail
- **Summary**: P0:x P1:x P2:x P3:x Needs Evidence:x
- **Fix Priority**: P0 → P1 → P2 → P3
```

## Multi-Agent Parallelization

To accelerate, split work across multiple agents by the following dimensions:

1. **By Document Type** - Separate agents for README, API docs, developer guides
2. **By Module** - Separate agents for different functional module documentation
3. **By Check Direction** - One agent checks docs→code, another checks code→docs

When aggregating, deduplicate and unify severity levels.

## Execution

After review completion, output a `doc-consistency.md` report file, and also output `doc-consistency.json` (structured issue list for aggregation/deduplication/statistics).
