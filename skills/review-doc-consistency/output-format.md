# Output Format Templates

## Report File Structure

```markdown
# Documentation Consistency Review Report

> Review Date: YYYY-MM-DD
> Project: [Project Name]
> Review Scope: README.md, docs/**/*.md

## Issue List

[Issue items 1-N...]

## Review Conclusion

[Conclusion summary...]
```

---

## Single Issue Item Template

```markdown
### [Number]. [One-sentence problem summary]

- **Severity**: P0 / P1 / P2 / P3 / Pending Evidence
- **Location**:
  - Documentation: `<file_path>:<line_number>`
  - Code: `<file_path>:<line_number>`
- **Evidence**:
  - Documentation excerpt:
    ```
    [Brief quote of relevant description]
    ```
  - Code excerpt:
    ```typescript
    [Brief quote of key implementation/config]
    ```
- **Impact**:
  - [How will it mislead users/callers/developers? What consequences might occur?]
- **Suggestion (minimal fix)**:
  - [Suggest modifying "documentation" or "code"? Provide minimal viable fix direction]
- **Related Principle**:
  - [Code is truth / Contracts first / User-facing commitments first / Security default tightening / Terminology consistency / Reproducibility]
```

---

## Review Conclusion Template

```markdown
## Review Conclusion

### Verdict

- [ ] **Pass** - No P0/P1 issues
- [ ] **Conditional Pass** - Must fix these prerequisites first:
  1. [Issues that must be fixed first]
  2. ...
- [ ] **Fail** - These blocking issues exist:
  1. [Blocking issues]
  2. ...

### Summary Statistics

| Level | Count |
|-------|-------|
| P0 Blocker | x |
| P1 Major | x |
| P2 Minor | x |
| P3 Nit | x |
| Pending Evidence | x |
| **Total** | **x** |

### Suggested Fix Priority

1. **Fix Immediately (P0)**:
   - #[issue number]: [brief description]
2. **Priority Fix (P1)**:
   - #[issue number]: [brief description]
3. **Planned Fix (P2)**:
   - #[issue number]: [brief description]
4. **Low Priority (P3)**:
   - Handle uniformly based on schedule

### Change Impact

| Impact Area | Required | Notes |
|-------------|----------|-------|
| Demo Update | Yes/No | [Specific notes] |
| Screenshot Update | Yes/No | [Specific notes] |
| Script Update | Yes/No | [Specific notes] |
| Changelog | Yes/No | [Specific notes] |
| External Notification | Yes/No | [Specific notes] |
```

---

## Example Issue Items

### 1. contextIsolation security config doesn't match documentation

- **Severity**: P0
- **Location**:
  - Documentation: `docs/security.md:45`
  - Code: `src/main/window.ts:23`
- **Evidence**:
  - Documentation excerpt:
    ```
    All renderer processes have contextIsolation enabled, ensuring preload scripts are isolated from page scripts
    ```
  - Code excerpt:
    ```typescript
    webPreferences: {
      contextIsolation: false, // Actually not enabled
      nodeIntegration: true
    }
    ```
- **Impact**:
  - Users/auditors will mistakenly believe the app has security isolation enabled, but there's actually XSS attack risk
- **Suggestion (minimal fix)**:
  - Modify code to set `contextIsolation` to `true`, and expose necessary APIs through preload script
- **Related Principle**:
  - Security default tightening, Code is truth

---

### 2. API endpoint /api/users return fields don't match documentation

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
  - Frontend using camelCase per documentation won't get values
- **Suggestion (minimal fix)**:
  - Update documentation to indicate actual field names are snake_case
- **Related Principle**:
  - Code is truth, Terminology consistency
