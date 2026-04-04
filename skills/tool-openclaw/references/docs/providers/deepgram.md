<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/providers/deepgram.md; fetched_at=2026-04-04T20:36:07.479Z; sha256=50ccfda36f39c03411fbf5382ab3124188af260a934ee6bbce8edf895b57156f; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Deepgram

# Deepgram (Audio Transcription)

Deepgram is a speech-to-text API. In OpenClaw it is used for **inbound audio/voice note
transcription** via `tools.media.audio`.

When enabled, OpenClaw uploads the audio file to Deepgram and injects the transcript
into the reply pipeline (`{{Transcript}}` + `[Audio]` block). This is **not streaming**;
it uses the pre-recorded transcription endpoint.

Website: [https://deepgram.com](https://deepgram.com)\
Docs: [https://developers.deepgram.com](https://developers.deepgram.com)

## Quick start

1. Set your API key:

```
DEEPGRAM_API_KEY=dg_...
```

2. Enable the provider:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  tools: {
    media: {
      audio: {
        enabled: true,
        models: [{ provider: "deepgram", model: "nova-3" }],
      },
    },
  },
}
```

## Options

* `model`: Deepgram model id (default: `nova-3`)
* `language`: language hint (optional)
* `tools.media.audio.providerOptions.deepgram.detect_language`: enable language detection (optional)
* `tools.media.audio.providerOptions.deepgram.punctuate`: enable punctuation (optional)
* `tools.media.audio.providerOptions.deepgram.smart_format`: enable smart formatting (optional)

Example with language:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  tools: {
    media: {
      audio: {
        enabled: true,
        models: [{ provider: "deepgram", model: "nova-3", language: "en" }],
      },
    },
  },
}
```

Example with Deepgram options:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  tools: {
    media: {
      audio: {
        enabled: true,
        providerOptions: {
          deepgram: {
            detect_language: true,
            punctuate: true,
            smart_format: true,
          },
        },
        models: [{ provider: "deepgram", model: "nova-3" }],
      },
    },
  },
}
```

## Notes

* Authentication follows the standard provider auth order; `DEEPGRAM_API_KEY` is the simplest path.
* Override endpoints or headers with `tools.media.audio.baseUrl` and `tools.media.audio.headers` when using a proxy.
* Output follows the same audio rules as other providers (size caps, timeouts, transcript injection).


Built with [Mintlify](https://mintlify.com).
