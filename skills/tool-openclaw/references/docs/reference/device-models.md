<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/reference/device-models.md; fetched_at=2026-02-20T10:29:26.762Z; sha256=7c1a72a6db678d22af5331b11d1c04c3253187fc65cd7fe1a839756e4f6b56a6; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Device Model Database

# Device model database (friendly names)

The macOS companion app shows friendly Apple device model names in the **Instances** UI by mapping Apple model identifiers (e.g. `iPad16,6`, `Mac16,6`) to human-readable names.

The mapping is vendored as JSON under:

* `apps/macos/Sources/OpenClaw/Resources/DeviceModels/`

## Data source

We currently vendor the mapping from the MIT-licensed repository:

* `kyle-seongwoo-jun/apple-device-identifiers`

To keep builds deterministic, the JSON files are pinned to specific upstream commits (recorded in `apps/macos/Sources/OpenClaw/Resources/DeviceModels/NOTICE.md`).

## Updating the database

1. Pick the upstream commits you want to pin to (one for iOS, one for macOS).
2. Update the commit hashes in `apps/macos/Sources/OpenClaw/Resources/DeviceModels/NOTICE.md`.
3. Re-download the JSON files, pinned to those commits:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
IOS_COMMIT="<commit sha for ios-device-identifiers.json>"
MAC_COMMIT="<commit sha for mac-device-identifiers.json>"

curl -fsSL "https://raw.githubusercontent.com/kyle-seongwoo-jun/apple-device-identifiers/${IOS_COMMIT}/ios-device-identifiers.json" \
  -o apps/macos/Sources/OpenClaw/Resources/DeviceModels/ios-device-identifiers.json

curl -fsSL "https://raw.githubusercontent.com/kyle-seongwoo-jun/apple-device-identifiers/${MAC_COMMIT}/mac-device-identifiers.json" \
  -o apps/macos/Sources/OpenClaw/Resources/DeviceModels/mac-device-identifiers.json
```

4. Ensure `apps/macos/Sources/OpenClaw/Resources/DeviceModels/LICENSE.apple-device-identifiers.txt` still matches upstream (replace it if the upstream license changes).
5. Verify the macOS app builds cleanly (no warnings):

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
swift build --package-path apps/macos
```
