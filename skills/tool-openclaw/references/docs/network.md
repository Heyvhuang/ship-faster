> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Network

# Network hub

This hub links the core docs for how OpenClaw connects, pairs, and secures
devices across localhost, LAN, and tailnet.

## Core model

* [Gateway architecture](/concepts/architecture)
* [Gateway protocol](/gateway/protocol)
* [Gateway runbook](/gateway)
* [Web surfaces + bind modes](/web)

## Pairing + identity

* [Pairing overview (DM + nodes)](/start/pairing)
* [Gateway-owned node pairing](/gateway/pairing)
* [Devices CLI (pairing + token rotation)](/cli/devices)
* [Pairing CLI (DM approvals)](/cli/pairing)

Local trust:

* Local connections (loopback or the gateway host’s own tailnet address) can be
  auto‑approved for pairing to keep same‑host UX smooth.
* Non‑local tailnet/LAN clients still require explicit pairing approval.

## Discovery + transports

* [Discovery & transports](/gateway/discovery)
* [Bonjour / mDNS](/gateway/bonjour)
* [Remote access (SSH)](/gateway/remote)
* [Tailscale](/gateway/tailscale)

## Nodes + transports

* [Nodes overview](/nodes)
* [Bridge protocol (legacy nodes)](/gateway/bridge-protocol)
* [Node runbook: iOS](/platforms/ios)
* [Node runbook: Android](/platforms/android)

## Security

* [Security overview](/gateway/security)
* [Gateway config reference](/gateway/configuration)
* [Troubleshooting](/gateway/troubleshooting)
* [Doctor](/gateway/doctor)
