<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/gateway/secrets-plan-contract.md; fetched_at=2026-04-04T20:36:06.641Z; sha256=81379ef160f821e5180cb26cbe4e09c134e2c83e2fb0d0635a2863858bad2922; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Secrets Apply Plan Contract

# Secrets apply plan contract

This page defines the strict contract enforced by `openclaw secrets apply`.

If a target does not match these rules, apply fails before mutating configuration.

## Plan file shape

`openclaw secrets apply --from <plan.json>` expects a `targets` array of plan targets:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  version: 1,
  protocolVersion: 1,
  targets: [
    {
      type: "models.providers.apiKey",
      path: "models.providers.openai.apiKey",
      pathSegments: ["models", "providers", "openai", "apiKey"],
      providerId: "openai",
      ref: { source: "env", provider: "default", id: "OPENAI_API_KEY" },
    },
    {
      type: "auth-profiles.api_key.key",
      path: "profiles.openai:default.key",
      pathSegments: ["profiles", "openai:default", "key"],
      agentId: "main",
      ref: { source: "env", provider: "default", id: "OPENAI_API_KEY" },
    },
  ],
}
```

## Supported target scope

Plan targets are accepted for supported credential paths in:

* [SecretRef Credential Surface](/reference/secretref-credential-surface)

## Target type behavior

General rule:

* `target.type` must be recognized and must match the normalized `target.path` shape.

Compatibility aliases remain accepted for existing plans:

* `models.providers.apiKey`
* `skills.entries.apiKey`
* `channels.googlechat.serviceAccount`

## Path validation rules

Each target is validated with all of the following:

* `type` must be a recognized target type.
* `path` must be a non-empty dot path.
* `pathSegments` can be omitted. If provided, it must normalize to exactly the same path as `path`.
* Forbidden segments are rejected: `__proto__`, `prototype`, `constructor`.
* The normalized path must match the registered path shape for the target type.
* If `providerId` or `accountId` is set, it must match the id encoded in the path.
* `auth-profiles.json` targets require `agentId`.
* When creating a new `auth-profiles.json` mapping, include `authProfileProvider`.

## Failure behavior

If a target fails validation, apply exits with an error like:

```text  theme={"theme":{"light":"min-light","dark":"min-dark"}}
Invalid plan target path for models.providers.apiKey: models.providers.openai.baseUrl
```

No writes are committed for an invalid plan.

## Exec provider consent behavior

* `--dry-run` skips exec SecretRef checks by default.
* Plans containing exec SecretRefs/providers are rejected in write mode unless `--allow-exec` is set.
* When validating/applying exec-containing plans, pass `--allow-exec` in both dry-run and write commands.

## Runtime and audit scope notes

* Ref-only `auth-profiles.json` entries (`keyRef`/`tokenRef`) are included in runtime resolution and audit coverage.
* `secrets apply` writes supported `openclaw.json` targets, supported `auth-profiles.json` targets, and optional scrub targets.

## Operator checks

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
# Validate plan without writes
openclaw secrets apply --from /tmp/openclaw-secrets-plan.json --dry-run

# Then apply for real
openclaw secrets apply --from /tmp/openclaw-secrets-plan.json

# For exec-containing plans, opt in explicitly in both modes
openclaw secrets apply --from /tmp/openclaw-secrets-plan.json --dry-run --allow-exec
openclaw secrets apply --from /tmp/openclaw-secrets-plan.json --allow-exec
```

If apply fails with an invalid target path message, regenerate the plan with `openclaw secrets configure` or fix the target path to a supported shape above.

## Related docs

* [Secrets Management](/gateway/secrets)
* [CLI `secrets`](/cli/secrets)
* [SecretRef Credential Surface](/reference/secretref-credential-surface)
* [Configuration Reference](/gateway/configuration-reference)


Built with [Mintlify](https://mintlify.com).
