<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/channels/location.md; fetched_at=2026-04-04T20:36:05.465Z; sha256=68ce3b31e4df80f775773eb6debff05c5bd7590dfb91be27d949efc4f10cf8b1; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Channel Location Parsing

# Channel location parsing

OpenClaw normalizes shared locations from chat channels into:

* human-readable text appended to the inbound body, and
* structured fields in the auto-reply context payload.

Currently supported:

* **Telegram** (location pins + venues + live locations)
* **WhatsApp** (locationMessage + liveLocationMessage)
* **Matrix** (`m.location` with `geo_uri`)

## Text formatting

Locations are rendered as friendly lines without brackets:

* Pin:
  * `📍 48.858844, 2.294351 ±12m`
* Named place:
  * `📍 Eiffel Tower — Champ de Mars, Paris (48.858844, 2.294351 ±12m)`
* Live share:
  * `🛰 Live location: 48.858844, 2.294351 ±12m`

If the channel includes a caption/comment, it is appended on the next line:

```
📍 48.858844, 2.294351 ±12m
Meet here
```

## Context fields

When a location is present, these fields are added to `ctx`:

* `LocationLat` (number)
* `LocationLon` (number)
* `LocationAccuracy` (number, meters; optional)
* `LocationName` (string; optional)
* `LocationAddress` (string; optional)
* `LocationSource` (`pin | place | live`)
* `LocationIsLive` (boolean)

## Channel notes

* **Telegram**: venues map to `LocationName/LocationAddress`; live locations use `live_period`.
* **WhatsApp**: `locationMessage.comment` and `liveLocationMessage.caption` are appended as the caption line.
* **Matrix**: `geo_uri` is parsed as a pin location; altitude is ignored and `LocationIsLive` is always false.


Built with [Mintlify](https://mintlify.com).
