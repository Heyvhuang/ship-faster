<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/install/bun.md; fetched_at=2026-02-20T10:29:21.567Z; sha256=94ac04377a25af4f4b31cc541d980bccce5f7545733a33865045aded6498c759; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Bun (Experimental)

# Bun (experimental)

Goal: run this repo with **Bun** (optional, not recommended for WhatsApp/Telegram)
without diverging from pnpm workflows.

⚠️ **Not recommended for Gateway runtime** (WhatsApp/Telegram bugs). Use Node for production.

## Status

* Bun is an optional local runtime for running TypeScript directly (`bun run …`, `bun --watch …`).
* `pnpm` is the default for builds and remains fully supported (and used by some docs tooling).
* Bun cannot use `pnpm-lock.yaml` and will ignore it.

## Install

Default:

```sh  theme={"theme":{"light":"min-light","dark":"min-dark"}}
bun install
```

Note: `bun.lock`/`bun.lockb` are gitignored, so there’s no repo churn either way. If you want *no lockfile writes*:

```sh  theme={"theme":{"light":"min-light","dark":"min-dark"}}
bun install --no-save
```

## Build / Test (Bun)

```sh  theme={"theme":{"light":"min-light","dark":"min-dark"}}
bun run build
bun run vitest run
```

## Bun lifecycle scripts (blocked by default)

Bun may block dependency lifecycle scripts unless explicitly trusted (`bun pm untrusted` / `bun pm trust`).
For this repo, the commonly blocked scripts are not required:

* `@whiskeysockets/baileys` `preinstall`: checks Node major >= 20 (we run Node 22+).
* `protobufjs` `postinstall`: emits warnings about incompatible version schemes (no build artifacts).

If you hit a real runtime issue that requires these scripts, trust them explicitly:

```sh  theme={"theme":{"light":"min-light","dark":"min-dark"}}
bun pm trust @whiskeysockets/baileys protobufjs
```

## Caveats

* Some scripts still hardcode pnpm (e.g. `docs:build`, `ui:*`, `protocol:check`). Run those via pnpm for now.
