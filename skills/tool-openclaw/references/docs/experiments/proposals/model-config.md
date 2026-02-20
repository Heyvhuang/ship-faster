<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/experiments/proposals/model-config.md; fetched_at=2026-02-20T10:29:18.811Z; sha256=0f5dd3efaed945a61461602e873643b3dcfa8d6ba4d933d2e99789cdbd56e1d3; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Model Config Exploration

# Model Config (Exploration)

This document captures **ideas** for future model configuration. It is not a
shipping spec. For current behavior, see:

* [Models](/concepts/models)
* [Model failover](/concepts/model-failover)
* [OAuth + profiles](/concepts/oauth)

## Motivation

Operators want:

* Multiple auth profiles per provider (personal vs work).
* Simple `/model` selection with predictable fallbacks.
* Clear separation between text models and image-capable models.

## Possible direction (high level)

* Keep model selection simple: `provider/model` with optional aliases.
* Let providers have multiple auth profiles, with an explicit order.
* Use a global fallback list so all sessions fail over consistently.
* Only override image routing when explicitly configured.

## Open questions

* Should profile rotation be per-provider or per-model?
* How should the UI surface profile selection for a session?
* What is the safest migration path from legacy config keys?
