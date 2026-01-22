# Archived Skills Catalog

> Generated file. Do not edit by hand.

These skills live under `skills/_archive/` and are not part of the default public surface.

| Name | Summary |
|------|---------|
| `review-clean-code` | Analyze code quality based on "Clean Code" principles. Identify naming, function size, duplication, over-engineering, and magic number issues with severity ratings and refactoring suggestions. Use when the user requests code quality checks, refactoring advice, Clean Code analysis, code smell detection, or mentions terms like code review, code quality, refactoring check. |
| `review-doc-consistency` | Documentation consistency reviewer that checks alignment between code implementation and documentation. Use when user requests reviewing documentation vs code consistency, checking if README/docs are outdated, verifying API documentation accuracy. Applicable for (1) reviewing README vs implementation consistency (2) checking if docs/ directory content is outdated (3) verifying API/config documentation accuracy (4) generating documentation consistency reports. Trigger words include doc review, documentation consistency, check outdated docs, verify docs. |
| `review-merge-readiness` | Request/execute structured code review: use after completing important tasks, at end of each execution batch, or before merge. Based on git diff range, compare against plan and requirements, output issue list by Critical/Important/Minor severity, and provide clear verdict on merge readiness. Trigger words: request code review, PR review, merge readiness, production readiness. |
| `workflow-execute-plans` | Execute written implementation plans: first read and critically review the plan, then implement in small batches (default 3 tasks), produce verification evidence per batch and pause for feedback; must stop immediately and ask for help when blocked/tests fail/plan unclear. Trigger words: execute plan, implement plan, batch execution, follow the plan. |
| `workflow-template-extractor` | Extract a shareable runnable template under templates/NNN-slug/ from a real project: copy + de-brand + remove secrets + add env examples + docs, with minimal refactors. Use when you have a working project and want to turn it into a template. |
| `workflow-template-seeder` | Seed a new runnable template under templates/NNN-slug/ from a short spec by chaining existing skills (intake → ship-faster stages) while keeping it clean and shareable (no secrets, minimal scope). Use when creating a new template quickly. |
