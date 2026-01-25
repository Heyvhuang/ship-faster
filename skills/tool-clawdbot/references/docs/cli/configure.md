> ## Documentation Index
> Fetch the complete documentation index at: https://docs.clawd.bot/llms.txt
> Use this file to discover all available pages before exploring further.

# null

# `clawdbot configure`

Interactive prompt to set up credentials, devices, and agent defaults.

Note: The **Model** section now includes a multi-select for the
`agents.defaults.models` allowlist (what shows up in `/model` and the model picker).

Tip: `clawdbot config` without a subcommand opens the same wizard. Use
`clawdbot config get|set|unset` for non-interactive edits.

Related:

* Gateway configuration reference: [Configuration](/gateway/configuration)
* Config CLI: [Config](/cli/config)

Notes:

* Choosing where the Gateway runs always updates `gateway.mode`. You can select "Continue" without other sections if that is all you need.
* Channel-oriented services (Slack/Discord/Matrix/Microsoft Teams) prompt for channel/room allowlists during setup. You can enter names or IDs; the wizard resolves names to IDs when possible.

## Examples

```bash  theme={null}
clawdbot configure
clawdbot configure --section models --section channels
```
