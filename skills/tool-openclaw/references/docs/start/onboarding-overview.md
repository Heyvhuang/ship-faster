<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/start/onboarding-overview.md; fetched_at=2026-02-20T10:29:28.215Z; sha256=e4891279f4e672f9da7e3f45f6df9dedbfdc39e617f76588146d3ce6bcc59c54; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Onboarding Overview

# Onboarding Overview

OpenClaw supports multiple onboarding paths depending on where the Gateway runs
and how you prefer to configure providers.

## Choose your onboarding path

* **CLI wizard** for macOS, Linux, and Windows (via WSL2).
* **macOS app** for a guided first run on Apple silicon or Intel Macs.

## CLI onboarding wizard

Run the wizard in a terminal:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw onboard
```

Use the CLI wizard when you want full control of the Gateway, workspace,
channels, and skills. Docs:

* [Onboarding Wizard (CLI)](/start/wizard)
* [`openclaw onboard` command](/cli/onboard)

## macOS app onboarding

Use the OpenClaw app when you want a fully guided setup on macOS. Docs:

* [Onboarding (macOS App)](/start/onboarding)

## Custom Provider

If you need an endpoint that is not listed, including hosted providers that
expose standard OpenAI or Anthropic APIs, choose **Custom Provider** in the
CLI wizard. You will be asked to:

* Pick OpenAI-compatible, Anthropic-compatible, or **Unknown** (auto-detect).
* Enter a base URL and API key (if required by the provider).
* Provide a model ID and optional alias.
* Choose an Endpoint ID so multiple custom endpoints can coexist.

For detailed steps, follow the CLI onboarding docs above.
