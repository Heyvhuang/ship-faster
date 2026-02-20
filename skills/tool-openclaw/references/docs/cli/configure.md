<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/cli/configure.md; fetched_at=2026-02-20T10:29:14.751Z; sha256=b1767ad1bff6fe67f98c3bdaa4620e83608aa90487d13b061e423f0f1f477d06; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# configure

# `openclaw configure`

Interactive prompt to set up credentials, devices, and agent defaults.

Note: The **Model** section now includes a multi-select for the
`agents.defaults.models` allowlist (what shows up in `/model` and the model picker).

Tip: `openclaw config` without a subcommand opens the same wizard. Use
`openclaw config get|set|unset` for non-interactive edits.

Related:

* Gateway configuration reference: [Configuration](/gateway/configuration)
* Config CLI: [Config](/cli/config)

Notes:

* Choosing where the Gateway runs always updates `gateway.mode`. You can select "Continue" without other sections if that is all you need.
* Channel-oriented services (Slack/Discord/Matrix/Microsoft Teams) prompt for channel/room allowlists during setup. You can enter names or IDs; the wizard resolves names to IDs when possible.

## Examples

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw configure
openclaw configure --section models --section channels
```
