> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# node

# `openclaw node`

Run a **headless node host** that connects to the Gateway WebSocket and exposes
`system.run` / `system.which` on this machine.

## Why use a node host?

Use a node host when you want agents to **run commands on other machines** in your
network without installing a full macOS companion app there.

Common use cases:

* Run commands on remote Linux/Windows boxes (build servers, lab machines, NAS).
* Keep exec **sandboxed** on the gateway, but delegate approved runs to other hosts.
* Provide a lightweight, headless execution target for automation or CI nodes.

Execution is still guarded by **exec approvals** and per‑agent allowlists on the
node host, so you can keep command access scoped and explicit.

## Browser proxy (zero-config)

Node hosts automatically advertise a browser proxy if `browser.enabled` is not
disabled on the node. This lets the agent use browser automation on that node
without extra configuration.

Disable it on the node if needed:

```json5  theme={null}
{
  nodeHost: {
    browserProxy: {
      enabled: false,
    },
  },
}
```

## Run (foreground)

```bash  theme={null}
openclaw node run --host <gateway-host> --port 18789
```

Options:

* `--host <host>`: Gateway WebSocket host (default: `127.0.0.1`)
* `--port <port>`: Gateway WebSocket port (default: `18789`)
* `--tls`: Use TLS for the gateway connection
* `--tls-fingerprint <sha256>`: Expected TLS certificate fingerprint (sha256)
* `--node-id <id>`: Override node id (clears pairing token)
* `--display-name <name>`: Override the node display name

## Service (background)

Install a headless node host as a user service.

```bash  theme={null}
openclaw node install --host <gateway-host> --port 18789
```

Options:

* `--host <host>`: Gateway WebSocket host (default: `127.0.0.1`)
* `--port <port>`: Gateway WebSocket port (default: `18789`)
* `--tls`: Use TLS for the gateway connection
* `--tls-fingerprint <sha256>`: Expected TLS certificate fingerprint (sha256)
* `--node-id <id>`: Override node id (clears pairing token)
* `--display-name <name>`: Override the node display name
* `--runtime <runtime>`: Service runtime (`node` or `bun`)
* `--force`: Reinstall/overwrite if already installed

Manage the service:

```bash  theme={null}
openclaw node status
openclaw node stop
openclaw node restart
openclaw node uninstall
```

Use `openclaw node run` for a foreground node host (no service).

Service commands accept `--json` for machine-readable output.

## Pairing

The first connection creates a pending node pair request on the Gateway.
Approve it via:

```bash  theme={null}
openclaw nodes pending
openclaw nodes approve <requestId>
```

The node host stores its node id, token, display name, and gateway connection info in
`~/.openclaw/node.json`.

## Exec approvals

`system.run` is gated by local exec approvals:

* `~/.openclaw/exec-approvals.json`
* [Exec approvals](/tools/exec-approvals)
* `openclaw approvals --node <id|name|ip>` (edit from the Gateway)
