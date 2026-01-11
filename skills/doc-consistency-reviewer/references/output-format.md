# Output Format Template

## Report File Structure

```markdown
# Documentation Consistency Audit Report

> Audit Date: YYYY-MM-DD
> Project: [Project Name]
> Scope: README.md, docs/**/*.md

## Issue List

[Issue items 1-N...]

## Audit Conclusion

[Conclusion summary...]
```

---

## Single Issue Item Template

```markdown
### [序号]. [Brief summary of the issue]

- **Severity**: P0 / P1 / P2 / P3 / Needs Evidence
- **Location**:
  - Documentation: `<file-path>:<line-number>`
  - Code: `<file-path>:<line-number>`
- **Evidence**:
  - Documentation excerpt:
    ```
    [Brief quote of relevant description]
    ```
  - Code excerpt:
    ```typescript
    [Brief quote of key implementation/configuration]
    ```
- **Impact**:
  - [How will this mislead users/integrators/developers? What consequences may arise?]
- **Recommendation (Minimal Fix)**:
  - [Which side (documentation or code) should be modified? Give minimal viable fix direction]
- **Related Principles**:
  - [Code as source of truth / Contracts first / User-facing commitment priority / Security defaults tighter / Terminology and enum consistency / Runnable and reproducible]
```

---

## Audit Conclusion Template

```markdown
## Audit Conclusion

### Result

- [ ] **Pass** - No P0/P1 issues
- [ ] **Conditional Pass** - The following prerequisites must be fixed first:
  1. [Issues that must be fixed first]
  2. ...
- [ ] **Fail** - The following blockers exist:
  1. [Blocker issues]
  2. ...

### Summary Statistics

| Severity | Count |
|----------|-------|
| P0 Blocker | x |
| P1 Major | x |
| P2 Minor | x |
| P3 Nit | x |
| Needs Evidence | x |
| **Total** | **x** |

### Recommended Fix Priority

1. **Fix Immediately (P0)**:
   - #[Issue Number]: [Brief description]
2. **Prioritize Fix (P1)**:
   - #[Issue Number]: [Brief description]
3. **Plan Fix (P2)**:
   - #[Issue Number]: [Brief description]
4. **Low Priority (P3)**:
   - Handle according to schedule

### Change Impact

| Impact Area | Required | Description |
|-------------|----------|-------------|
| Demo Update | Yes/No | [Specific description] |
| Screenshot Update | Yes/No | [Specific description] |
| Script Update | Yes/No | [Specific description] |
| Changelog | Yes/No | [Specific description] |
| External Notification | Yes/No | [Specific description] |
```

---

## Example Issue Items

### 1. contextIsolation Security Configuration Inconsistency with Documentation

- **Severity**: P0
- **Location**:
  - Documentation: `docs/security.md:45`
  - Code: `src/main/window.ts:23`
- **Evidence**:
  - Documentation excerpt:
    ```
    All render processes have contextIsolation enabled, ensuring preload scripts are isolated from page scripts
    ```
  - Code excerpt:
    ```typescript
    webPreferences: {
      contextIsolation: false, // Actually not enabled
      nodeIntegration: true
    }
    ```
- **Impact**:
  - Users/auditors will assume the app has security isolation enabled, but there's actually an XSS attack risk
- **Recommendation (Minimal Fix)**:
  - Modify code to set `contextIsolation` to `true` and expose necessary APIs via preload script
- **Related Principles**:
  - Security defaults tighter, Code as source of truth

---

### 2. API Endpoint /api/users Response Fields Inconsistent with Documentation

- **Severity**: P1
- **Location**:
  - Documentation: `docs/api.md:120`
  - Code: `src/routes/users.ts:45`
- **Evidence**:
  - Documentation excerpt:
    ```
    Return fields: id, name, email, createdAt, updatedAt
    ```
  - Code excerpt:
    ```typescript
    return { id, name, email, created_at, updated_at }; // snake_case
    ```
- **Impact**:
  - Frontend using camelCase per documentation will not get values
- **Recommendation (Minimal Fix)**:
  - Update documentation to note actual field names are snake_case
- **Related Principles**:
  - Code as source of truth, Terminology and enum consistency
