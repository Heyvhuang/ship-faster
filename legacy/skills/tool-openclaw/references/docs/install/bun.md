<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/install/bun.md; fetched_at=2026-04-04T20:36:06.800Z; sha256=ea980f8c074dbf7d03d1a3b9b642a8ecd6675d5871be0033afe89ac0959841e8; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Bun (Experimental)

# Bun (Experimental)

<Warning>
  Bun is **not recommended for gateway runtime** (known issues with WhatsApp and Telegram). Use Node for production.
</Warning>

Bun is an optional local runtime for running TypeScript directly (`bun run ...`, `bun --watch ...`). The default package manager remains `pnpm`, which is fully supported and used by docs tooling. Bun cannot use `pnpm-lock.yaml` and will ignore it.

## Install

<Steps>
  <Step title="Install dependencies">
    ```sh  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    bun install
    ```

    `bun.lock` / `bun.lockb` are gitignored, so there is no repo churn. To skip lockfile writes entirely:

    ```sh  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    bun install --no-save
    ```
  </Step>

  <Step title="Build and test">
    ```sh  theme={"theme":{"light":"min-light","dark":"min-dark"}}
    bun run build
    bun run vitest run
    ```
  </Step>
</Steps>

## Lifecycle Scripts

Bun blocks dependency lifecycle scripts unless explicitly trusted. For this repo, the commonly blocked scripts are not required:

* `@whiskeysockets/baileys` `preinstall` -- checks Node major >= 20 (OpenClaw defaults to Node 24 and still supports Node 22 LTS, currently `22.14+`)
* `protobufjs` `postinstall` -- emits warnings about incompatible version schemes (no build artifacts)

If you hit a runtime issue that requires these scripts, trust them explicitly:

```sh  theme={"theme":{"light":"min-light","dark":"min-dark"}}
bun pm trust @whiskeysockets/baileys protobufjs
```

## Caveats

Some scripts still hardcode pnpm (for example `docs:build`, `ui:*`, `protocol:check`). Run those via pnpm for now.


Built with [Mintlify](https://mintlify.com).
