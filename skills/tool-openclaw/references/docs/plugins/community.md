<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/plugins/community.md; fetched_at=2026-02-20T10:29:25.670Z; sha256=305f12cfa751c7812b6bcad1a8918f47cf4491ec89bfaced5a13080e7da11bbb; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Community plugins

# Community plugins

This page tracks high-quality **community-maintained plugins** for OpenClaw.

We accept PRs that add community plugins here when they meet the quality bar.

## Required for listing

* Plugin package is published on npmjs (installable via `openclaw plugins install <npm-spec>`).
* Source code is hosted on GitHub (public repository).
* Repository includes setup/use docs and an issue tracker.
* Plugin has a clear maintenance signal (active maintainer, recent updates, or responsive issue handling).

## How to submit

Open a PR that adds your plugin to this page with:

* Plugin name
* npm package name
* GitHub repository URL
* One-line description
* Install command

## Review bar

We prefer plugins that are useful, documented, and safe to operate.
Low-effort wrappers, unclear ownership, or unmaintained packages may be declined.

## Candidate format

Use this format when adding entries:

* **Plugin Name** — short description
  npm: `@scope/package`
  repo: `https://github.com/org/repo`
  install: `openclaw plugins install @scope/package`
