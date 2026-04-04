<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/docs.md; fetched_at=2026-04-04T20:36:05.801Z; sha256=b4f3854a7ad4197eafd0e75ca149511e6f3a05b4e8747199d846f25f1d140f38; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# docs

# `openclaw docs`

Search the live docs index.

Arguments:

* `[query...]`: search terms to send to the live docs index

Examples:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw docs
openclaw docs browser existing-session
openclaw docs sandbox allowHostControl
openclaw docs gateway token secretref
```

Notes:

* With no query, `openclaw docs` opens the live docs search entrypoint.
* Multi-word queries are passed through as one search request.


Built with [Mintlify](https://mintlify.com).
