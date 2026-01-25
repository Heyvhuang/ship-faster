> ## Documentation Index
> Fetch the complete documentation index at: https://docs.clawd.bot/llms.txt
> Use this file to discover all available pages before exploring further.

# null

# `clawdbot plugins`

Manage Gateway plugins/extensions (loaded in-process).

Related:

* Plugin system: [Plugins](/plugin)
* Plugin manifest + schema: [Plugin manifest](/plugins/manifest)
* Security hardening: [Security](/gateway/security)

## Commands

```bash  theme={null}
clawdbot plugins list
clawdbot plugins info <id>
clawdbot plugins enable <id>
clawdbot plugins disable <id>
clawdbot plugins doctor
clawdbot plugins update <id>
clawdbot plugins update --all
```

Bundled plugins ship with Clawdbot but start disabled. Use `plugins enable` to
activate them.

All plugins must ship a `clawdbot.plugin.json` file with an inline JSON Schema
(`configSchema`, even if empty). Missing/invalid manifests or schemas prevent
the plugin from loading and fail config validation.

### Install

```bash  theme={null}
clawdbot plugins install <path-or-spec>
```

Security note: treat plugin installs like running code. Prefer pinned versions.

Supported archives: `.zip`, `.tgz`, `.tar.gz`, `.tar`.

Use `--link` to avoid copying a local directory (adds to `plugins.load.paths`):

```bash  theme={null}
clawdbot plugins install -l ./my-plugin
```

### Update

```bash  theme={null}
clawdbot plugins update <id>
clawdbot plugins update --all
clawdbot plugins update <id> --dry-run
```

Updates only apply to plugins installed from npm (tracked in `plugins.installs`).
