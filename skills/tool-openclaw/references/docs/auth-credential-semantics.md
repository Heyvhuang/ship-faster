<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/auth-credential-semantics.md; fetched_at=2026-04-04T20:36:05.335Z; sha256=81f1e5f5697ffd5a89d863e660cc5b706498ac20d935af50970d6418bf547f6d; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Auth Credential Semantics

# Auth Credential Semantics

This document defines the canonical credential eligibility and resolution semantics used across:

* `resolveAuthProfileOrder`
* `resolveApiKeyForProfile`
* `models status --probe`
* `doctor-auth`

The goal is to keep selection-time and runtime behavior aligned.

## Stable Probe Reason Codes

* `ok`
* `excluded_by_auth_order`
* `missing_credential`
* `invalid_expires`
* `expired`
* `unresolved_ref`
* `no_model`

## Token Credentials

Token credentials (`type: "token"`) support inline `token` and/or `tokenRef`.

### Eligibility rules

1. A token profile is ineligible when both `token` and `tokenRef` are absent.
2. `expires` is optional.
3. If `expires` is present, it must be a finite number greater than `0`.
4. If `expires` is invalid (`NaN`, `0`, negative, non-finite, or wrong type), the profile is ineligible with `invalid_expires`.
5. If `expires` is in the past, the profile is ineligible with `expired`.
6. `tokenRef` does not bypass `expires` validation.

### Resolution rules

1. Resolver semantics match eligibility semantics for `expires`.
2. For eligible profiles, token material may be resolved from inline value or `tokenRef`.
3. Unresolvable refs produce `unresolved_ref` in `models status --probe` output.

## Explicit Auth Order Filtering

* When `auth.order.<provider>` or the auth-store order override is set for a
  provider, `models status --probe` only probes profile ids that remain in the
  resolved auth order for that provider.
* A stored profile for that provider that is omitted from the explicit order is
  not silently tried later. Probe output reports it with
  `reasonCode: excluded_by_auth_order` and the detail
  `Excluded by auth.order for this provider.`

## Probe Target Resolution

* Probe targets can come from auth profiles, environment credentials, or
  `models.json`.
* If a provider has credentials but OpenClaw cannot resolve a probeable model
  candidate for it, `models status --probe` reports `status: no_model` with
  `reasonCode: no_model`.

## OAuth SecretRef Policy Guard

* SecretRef input is for static credentials only.
* If a profile credential is `type: "oauth"`, SecretRef objects are not supported for that profile credential material.
* If `auth.profiles.<id>.mode` is `"oauth"`, SecretRef-backed `keyRef`/`tokenRef` input for that profile is rejected.
* Violations are hard failures in startup/reload auth resolution paths.

## Legacy-Compatible Messaging

For script compatibility, probe errors keep this first line unchanged:

`Auth profile credentials are missing or expired.`

Human-friendly detail and stable reason codes may be added on subsequent lines.


Built with [Mintlify](https://mintlify.com).
