<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/tools/browser-login.md; fetched_at=2026-04-04T20:36:08.135Z; sha256=7386a6ed63bd26c3c927af78e0c1b526e5ec1bd1b3124143e1f49290ff6a8d31; content_type=text/markdown; charset=utf-8; status=ok -->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Browser Login

# Browser login + X/Twitter posting

## Manual login (recommended)

When a site requires login, **sign in manually** in the **host** browser profile (the openclaw browser).

Do **not** give the model your credentials. Automated logins often trigger anti‑bot defenses and can lock the account.

Back to the main browser docs: [Browser](/tools/browser).

## Which Chrome profile is used?

OpenClaw controls a **dedicated Chrome profile** (named `openclaw`, orange‑tinted UI). This is separate from your daily browser profile.

For agent browser tool calls:

* Default choice: the agent should use its isolated `openclaw` browser.
* Use `profile="user"` only when existing logged-in sessions matter and the user is at the computer to click/approve any attach prompt.
* If you have multiple user-browser profiles, specify the profile explicitly instead of guessing.

Two easy ways to access it:

1. **Ask the agent to open the browser** and then log in yourself.
2. **Open it via CLI**:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw browser start
openclaw browser open https://x.com
```

If you have multiple profiles, pass `--browser-profile <name>` (the default is `openclaw`).

## X/Twitter: recommended flow

* **Read/search/threads:** use the **host** browser (manual login).
* **Post updates:** use the **host** browser (manual login).

## Sandboxing + host browser access

Sandboxed browser sessions are **more likely** to trigger bot detection. For X/Twitter (and other strict sites), prefer the **host** browser.

If the agent is sandboxed, the browser tool defaults to the sandbox. To allow host control:

```json5  theme={"theme":{"light":"min-light","dark":"min-dark"}}
{
  agents: {
    defaults: {
      sandbox: {
        mode: "non-main",
        browser: {
          allowHostControl: true,
        },
      },
    },
  },
}
```

Then target the host browser:

```bash  theme={"theme":{"light":"min-light","dark":"min-dark"}}
openclaw browser open https://x.com --browser-profile openclaw --target host
```

Or disable sandboxing for the agent that posts updates.


Built with [Mintlify](https://mintlify.com).
