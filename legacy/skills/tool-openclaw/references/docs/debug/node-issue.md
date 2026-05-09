<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/debug/node-issue.md; fetched_at=2026-04-04T20:36:06.416Z; sha256=5c7e5f86e6921c55d0dff019759ba3b6c641f2721dd711fbb8925b5ddcd45b4a; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Node + tsx Crash

# Node + tsx "\_\_name is not a function" crash

## Summary

Running OpenClaw via Node with `tsx` fails at startup with:

```
[openclaw] Failed to start CLI: TypeError: __name is not a function
    at createSubsystemLogger (.../src/logging/subsystem.ts:203:25)
    at .../src/agents/auth-profiles/constants.ts:25:20
```

This began after switching dev scripts from Bun to `tsx` (commit `2871657e`, 2026-01-06). The same runtime path worked with Bun.

## Environment

* Node: v25.x (observed on v25.3.0)
* tsx: 4.21.0
* OS: macOS (repro also likely on other platforms that run Node 25)

## Repro (Node-only)

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
# in repo root
node --version
pnpm install
node --import tsx src/entry.ts status
```

## Minimal repro in repo

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
node --import tsx scripts/repro/tsx-name-repro.ts
```

## Node version check

* Node 25.3.0: fails
* Node 22.22.0 (Homebrew `node@22`): fails
* Node 24: not installed here yet; needs verification

## Notes / hypothesis

* `tsx` uses esbuild to transform TS/ESM. esbuild’s `keepNames` emits a `__name` helper and wraps function definitions with `__name(...)`.
* The crash indicates `__name` exists but is not a function at runtime, which implies the helper is missing or overwritten for this module in the Node 25 loader path.
* Similar `__name` helper issues have been reported in other esbuild consumers when the helper is missing or rewritten.

## Regression history

* `2871657e` (2026-01-06): scripts changed from Bun to tsx to make Bun optional.
* Before that (Bun path), `openclaw status` and `gateway:watch` worked.

## Workarounds

* Use Bun for dev scripts (current temporary revert).

* Use Node + tsc watch, then run compiled output:

  ```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
  pnpm exec tsc --watch --preserveWatchOutput
  node --watch openclaw.mjs status
  ```

* Confirmed locally: `pnpm exec tsc -p tsconfig.json` + `node openclaw.mjs status` works on Node 25.

* Disable esbuild keepNames in the TS loader if possible (prevents `__name` helper insertion); tsx does not currently expose this.

* Test Node LTS (22/24) with `tsx` to see if the issue is Node 25–specific.

## References

* [https://opennext.js.org/cloudflare/howtos/keep\_names](https://opennext.js.org/cloudflare/howtos/keep_names)
* [https://esbuild.github.io/api/#keep-names](https://esbuild.github.io/api/#keep-names)
* [https://github.com/evanw/esbuild/issues/1031](https://github.com/evanw/esbuild/issues/1031)

## Next steps

* Repro on Node 22/24 to confirm Node 25 regression.
* Test `tsx` nightly or pin to earlier version if a known regression exists.
* If reproduces on Node LTS, file a minimal repro upstream with the `__name` stack trace.


Built with [Mintlify](https://mintlify.com).
