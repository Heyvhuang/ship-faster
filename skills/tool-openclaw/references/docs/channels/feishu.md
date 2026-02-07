> ## Documentation Index
> Fetch the complete documentation index at: https://docs.openclaw.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Feishu

# Feishu bot

Feishu (Lark) is a team chat platform used by companies for messaging and collaboration. This plugin connects OpenClaw to a Feishu/Lark bot using the platform’s WebSocket event subscription so messages can be received without exposing a public webhook URL.

***

## Plugin required

Install the Feishu plugin:

```bash  theme={null}
openclaw plugins install @openclaw/feishu
```

Local checkout (when running from a git repo):

```bash  theme={null}
openclaw plugins install ./extensions/feishu
```

***

## Quickstart

There are two ways to add the Feishu channel:

### Method 1: onboarding wizard (recommended)

If you just installed OpenClaw, run the wizard:

```bash  theme={null}
openclaw onboard
```

The wizard guides you through:

1. Creating a Feishu app and collecting credentials
2. Configuring app credentials in OpenClaw
3. Starting the gateway

✅ **After configuration**, check gateway status:

* `openclaw gateway status`
* `openclaw logs --follow`

### Method 2: CLI setup

If you already completed initial install, add the channel via CLI:

```bash  theme={null}
openclaw channels add
```

Choose **Feishu**, then enter the App ID and App Secret.

✅ **After configuration**, manage the gateway:

* `openclaw gateway status`
* `openclaw gateway restart`
* `openclaw logs --follow`

***

## Step 1: Create a Feishu app

### 1. Open Feishu Open Platform

Visit [Feishu Open Platform](https://open.feishu.cn/app) and sign in.

Lark (global) tenants should use [https://open.larksuite.com/app](https://open.larksuite.com/app) and set `domain: "lark"` in the Feishu config.

### 2. Create an app

1. Click **Create enterprise app**
2. Fill in the app name + description
3. Choose an app icon

<img src="https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step2-create-app.png?fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=a3d0a511fea278250c353f5c33f03584" alt="Create enterprise app" data-og-width="2888" width="2888" data-og-height="1070" height="1070" data-path="images/feishu-step2-create-app.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step2-create-app.png?w=280&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=4ffcf64d6a76220152e76c4bfabaa62d 280w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step2-create-app.png?w=560&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=24900d0ddd1de10e4a32c321ae8f6372 560w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step2-create-app.png?w=840&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=62e9203c34fb4216bed8d0de8529c89b 840w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step2-create-app.png?w=1100&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=1eb92424c734bff1c0e004a3d85c5d77 1100w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step2-create-app.png?w=1650&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=6761ca220e7751910a4b753c594d0b11 1650w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step2-create-app.png?w=2500&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=557c61a223bc55c58ca1bdc30165ef38 2500w" />

### 3. Copy credentials

From **Credentials & Basic Info**, copy:

* **App ID** (format: `cli_xxx`)
* **App Secret**

❗ **Important:** keep the App Secret private.

<img src="https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step3-credentials.png?fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=3a6ac22e96d76e4b85a1171ea207608b" alt="Get credentials" data-og-width="2870" width="2870" data-og-height="1266" height="1266" data-path="images/feishu-step3-credentials.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step3-credentials.png?w=280&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=d2662f17a15898237647d0e4dbad2b33 280w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step3-credentials.png?w=560&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=7d848229a7cc89f191a1fcdddeaf6241 560w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step3-credentials.png?w=840&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=82b2984cb3199b91478021339efe353a 840w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step3-credentials.png?w=1100&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=fad3a366183ca561c8b6a0d808aa7158 1100w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step3-credentials.png?w=1650&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=bc45a5b1a5735f97f53134ab03b716f8 1650w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step3-credentials.png?w=2500&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=0a70aa721db7c57bfe8f2ea01cb93e78 2500w" />

### 4. Configure permissions

On **Permissions**, click **Batch import** and paste:

```json  theme={null}
{
  "scopes": {
    "tenant": [
      "aily:file:read",
      "aily:file:write",
      "application:application.app_message_stats.overview:readonly",
      "application:application:self_manage",
      "application:bot.menu:write",
      "contact:user.employee_id:readonly",
      "corehr:file:download",
      "event:ip_list",
      "im:chat.access_event.bot_p2p_chat:read",
      "im:chat.members:bot_access",
      "im:message",
      "im:message.group_at_msg:readonly",
      "im:message.p2p_msg:readonly",
      "im:message:readonly",
      "im:message:send_as_bot",
      "im:resource"
    ],
    "user": ["aily:file:read", "aily:file:write", "im:chat.access_event.bot_p2p_chat:read"]
  }
}
```

<img src="https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step4-permissions.png?fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=a386d201628f65771d9d423056d9dc59" alt="Configure permissions" data-og-width="2866" width="2866" data-og-height="1312" height="1312" data-path="images/feishu-step4-permissions.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step4-permissions.png?w=280&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=c1aec31f0d59907669b93775c8701bf1 280w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step4-permissions.png?w=560&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=012ae662bfe843e7c5837ea6b3c596c8 560w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step4-permissions.png?w=840&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=9e5dbe887ab3549fec66e918f676ad85 840w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step4-permissions.png?w=1100&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=04c44566762d323e6dafec830b3b12f2 1100w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step4-permissions.png?w=1650&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=b2c45f350ad16025cc60d516ce140865 1650w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step4-permissions.png?w=2500&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=3a255ce38f028ee2eb0086d5897b82e1 2500w" />

### 5. Enable bot capability

In **App Capability** > **Bot**:

1. Enable bot capability
2. Set the bot name

<img src="https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step5-bot-capability.png?fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=4c330500fd7db2e72569dc2a379697ee" alt="Enable bot capability" data-og-width="2888" width="2888" data-og-height="1386" height="1386" data-path="images/feishu-step5-bot-capability.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step5-bot-capability.png?w=280&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=0fc9e0cd641ff71a7c6e48e8cb99fc9a 280w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step5-bot-capability.png?w=560&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=475309c74e732d60a6242c6930e72dd6 560w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step5-bot-capability.png?w=840&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=cbbb8cdbd30bdd76b0141f0a8ea111da 840w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step5-bot-capability.png?w=1100&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=29107c5a0a58b1e8cfe033ae2d76b011 1100w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step5-bot-capability.png?w=1650&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=c628d853222de2a8958217e76aba1ccf 1650w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step5-bot-capability.png?w=2500&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=97dcaf96c2bc7e0f6b803b4135a35a2a 2500w" />

### 6. Configure event subscription

⚠️ **Important:** before setting event subscription, make sure:

1. You already ran `openclaw channels add` for Feishu
2. The gateway is running (`openclaw gateway status`)

In **Event Subscription**:

1. Choose **Use long connection to receive events** (WebSocket)
2. Add the event: `im.message.receive_v1`

⚠️ If the gateway is not running, the long-connection setup may fail to save.

<img src="https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step6-event-subscription.png?fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=00aeb4809d9df159d846e0be19bc871e" alt="Configure event subscription" data-og-width="2886" width="2886" data-og-height="1488" height="1488" data-path="images/feishu-step6-event-subscription.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step6-event-subscription.png?w=280&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=080bfac95f9b7e574947104c6bfef1ab 280w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step6-event-subscription.png?w=560&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=87d1b5c8142e12af5f37bbbe3c2f11cb 560w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step6-event-subscription.png?w=840&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=0e9a17e7b79e58204ed6bceb4892d814 840w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step6-event-subscription.png?w=1100&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=f11ce5b381e1820794d2020c82f07be9 1100w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step6-event-subscription.png?w=1650&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=6481ac2279de0a5858e0537af700e727 1650w, https://mintcdn.com/clawdhub/6NERQ7Dymau_gJ4k/images/feishu-step6-event-subscription.png?w=2500&fit=max&auto=format&n=6NERQ7Dymau_gJ4k&q=85&s=bd43f9b379e63e537950aaad8baed907 2500w" />

### 7. Publish the app

1. Create a version in **Version Management & Release**
2. Submit for review and publish
3. Wait for admin approval (enterprise apps usually auto-approve)

***

## Step 2: Configure OpenClaw

### Configure with the wizard (recommended)

```bash  theme={null}
openclaw channels add
```

Choose **Feishu** and paste your App ID + App Secret.

### Configure via config file

Edit `~/.openclaw/openclaw.json`:

```json5  theme={null}
{
  channels: {
    feishu: {
      enabled: true,
      dmPolicy: "pairing",
      accounts: {
        main: {
          appId: "cli_xxx",
          appSecret: "xxx",
          botName: "My AI assistant",
        },
      },
    },
  },
}
```

### Configure via environment variables

```bash  theme={null}
export FEISHU_APP_ID="cli_xxx"
export FEISHU_APP_SECRET="xxx"
```

### Lark (global) domain

If your tenant is on Lark (international), set the domain to `lark` (or a full domain string). You can set it at `channels.feishu.domain` or per account (`channels.feishu.accounts.<id>.domain`).

```json5  theme={null}
{
  channels: {
    feishu: {
      domain: "lark",
      accounts: {
        main: {
          appId: "cli_xxx",
          appSecret: "xxx",
        },
      },
    },
  },
}
```

***

## Step 3: Start + test

### 1. Start the gateway

```bash  theme={null}
openclaw gateway
```

### 2. Send a test message

In Feishu, find your bot and send a message.

### 3. Approve pairing

By default, the bot replies with a pairing code. Approve it:

```bash  theme={null}
openclaw pairing approve feishu <CODE>
```

After approval, you can chat normally.

***

## Overview

* **Feishu bot channel**: Feishu bot managed by the gateway
* **Deterministic routing**: replies always return to Feishu
* **Session isolation**: DMs share a main session; groups are isolated
* **WebSocket connection**: long connection via Feishu SDK, no public URL needed

***

## Access control

### Direct messages

* **Default**: `dmPolicy: "pairing"` (unknown users get a pairing code)
* **Approve pairing**:
  ```bash  theme={null}
  openclaw pairing list feishu
  openclaw pairing approve feishu <CODE>
  ```
* **Allowlist mode**: set `channels.feishu.allowFrom` with allowed Open IDs

### Group chats

**1. Group policy** (`channels.feishu.groupPolicy`):

* `"open"` = allow everyone in groups (default)
* `"allowlist"` = only allow `groupAllowFrom`
* `"disabled"` = disable group messages

**2. Mention requirement** (`channels.feishu.groups.<chat_id>.requireMention`):

* `true` = require @mention (default)
* `false` = respond without mentions

***

## Group configuration examples

### Allow all groups, require @mention (default)

```json5  theme={null}
{
  channels: {
    feishu: {
      groupPolicy: "open",
      // Default requireMention: true
    },
  },
}
```

### Allow all groups, no @mention required

```json5  theme={null}
{
  channels: {
    feishu: {
      groups: {
        oc_xxx: { requireMention: false },
      },
    },
  },
}
```

### Allow specific users in groups only

```json5  theme={null}
{
  channels: {
    feishu: {
      groupPolicy: "allowlist",
      groupAllowFrom: ["ou_xxx", "ou_yyy"],
    },
  },
}
```

***

## Get group/user IDs

### Group IDs (chat\_id)

Group IDs look like `oc_xxx`.

**Method 1 (recommended)**

1. Start the gateway and @mention the bot in the group
2. Run `openclaw logs --follow` and look for `chat_id`

**Method 2**

Use the Feishu API debugger to list group chats.

### User IDs (open\_id)

User IDs look like `ou_xxx`.

**Method 1 (recommended)**

1. Start the gateway and DM the bot
2. Run `openclaw logs --follow` and look for `open_id`

**Method 2**

Check pairing requests for user Open IDs:

```bash  theme={null}
openclaw pairing list feishu
```

***

## Common commands

| Command   | Description       |
| --------- | ----------------- |
| `/status` | Show bot status   |
| `/reset`  | Reset the session |
| `/model`  | Show/switch model |

> Note: Feishu does not support native command menus yet, so commands must be sent as text.

## Gateway management commands

| Command                    | Description                   |
| -------------------------- | ----------------------------- |
| `openclaw gateway status`  | Show gateway status           |
| `openclaw gateway install` | Install/start gateway service |
| `openclaw gateway stop`    | Stop gateway service          |
| `openclaw gateway restart` | Restart gateway service       |
| `openclaw logs --follow`   | Tail gateway logs             |

***

## Troubleshooting

### Bot does not respond in group chats

1. Ensure the bot is added to the group
2. Ensure you @mention the bot (default behavior)
3. Check `groupPolicy` is not set to `"disabled"`
4. Check logs: `openclaw logs --follow`

### Bot does not receive messages

1. Ensure the app is published and approved
2. Ensure event subscription includes `im.message.receive_v1`
3. Ensure **long connection** is enabled
4. Ensure app permissions are complete
5. Ensure the gateway is running: `openclaw gateway status`
6. Check logs: `openclaw logs --follow`

### App Secret leak

1. Reset the App Secret in Feishu Open Platform
2. Update the App Secret in your config
3. Restart the gateway

### Message send failures

1. Ensure the app has `im:message:send_as_bot` permission
2. Ensure the app is published
3. Check logs for detailed errors

***

## Advanced configuration

### Multiple accounts

```json5  theme={null}
{
  channels: {
    feishu: {
      accounts: {
        main: {
          appId: "cli_xxx",
          appSecret: "xxx",
          botName: "Primary bot",
        },
        backup: {
          appId: "cli_yyy",
          appSecret: "yyy",
          botName: "Backup bot",
          enabled: false,
        },
      },
    },
  },
}
```

### Message limits

* `textChunkLimit`: outbound text chunk size (default: 2000 chars)
* `mediaMaxMb`: media upload/download limit (default: 30MB)

### Streaming

Feishu supports streaming replies via interactive cards. When enabled, the bot updates a card as it generates text.

```json5  theme={null}
{
  channels: {
    feishu: {
      streaming: true, // enable streaming card output (default true)
      blockStreaming: true, // enable block-level streaming (default true)
    },
  },
}
```

Set `streaming: false` to wait for the full reply before sending.

### Multi-agent routing

Use `bindings` to route Feishu DMs or groups to different agents.

```json5  theme={null}
{
  agents: {
    list: [
      { id: "main" },
      {
        id: "clawd-fan",
        workspace: "/home/user/clawd-fan",
        agentDir: "/home/user/.openclaw/agents/clawd-fan/agent",
      },
      {
        id: "clawd-xi",
        workspace: "/home/user/clawd-xi",
        agentDir: "/home/user/.openclaw/agents/clawd-xi/agent",
      },
    ],
  },
  bindings: [
    {
      agentId: "main",
      match: {
        channel: "feishu",
        peer: { kind: "dm", id: "ou_xxx" },
      },
    },
    {
      agentId: "clawd-fan",
      match: {
        channel: "feishu",
        peer: { kind: "dm", id: "ou_yyy" },
      },
    },
    {
      agentId: "clawd-xi",
      match: {
        channel: "feishu",
        peer: { kind: "group", id: "oc_zzz" },
      },
    },
  ],
}
```

Routing fields:

* `match.channel`: `"feishu"`
* `match.peer.kind`: `"dm"` or `"group"`
* `match.peer.id`: user Open ID (`ou_xxx`) or group ID (`oc_xxx`)

See [Get group/user IDs](#get-groupuser-ids) for lookup tips.

***

## Configuration reference

Full configuration: [Gateway configuration](/gateway/configuration)

Key options:

| Setting                                           | Description                     | Default   |
| ------------------------------------------------- | ------------------------------- | --------- |
| `channels.feishu.enabled`                         | Enable/disable channel          | `true`    |
| `channels.feishu.domain`                          | API domain (`feishu` or `lark`) | `feishu`  |
| `channels.feishu.accounts.<id>.appId`             | App ID                          | -         |
| `channels.feishu.accounts.<id>.appSecret`         | App Secret                      | -         |
| `channels.feishu.accounts.<id>.domain`            | Per-account API domain override | `feishu`  |
| `channels.feishu.dmPolicy`                        | DM policy                       | `pairing` |
| `channels.feishu.allowFrom`                       | DM allowlist (open\_id list)    | -         |
| `channels.feishu.groupPolicy`                     | Group policy                    | `open`    |
| `channels.feishu.groupAllowFrom`                  | Group allowlist                 | -         |
| `channels.feishu.groups.<chat_id>.requireMention` | Require @mention                | `true`    |
| `channels.feishu.groups.<chat_id>.enabled`        | Enable group                    | `true`    |
| `channels.feishu.textChunkLimit`                  | Message chunk size              | `2000`    |
| `channels.feishu.mediaMaxMb`                      | Media size limit                | `30`      |
| `channels.feishu.streaming`                       | Enable streaming card output    | `true`    |
| `channels.feishu.blockStreaming`                  | Enable block streaming          | `true`    |

***

## dmPolicy reference

| Value         | Behavior                                                        |
| ------------- | --------------------------------------------------------------- |
| `"pairing"`   | **Default.** Unknown users get a pairing code; must be approved |
| `"allowlist"` | Only users in `allowFrom` can chat                              |
| `"open"`      | Allow all users (requires `"*"` in allowFrom)                   |
| `"disabled"`  | Disable DMs                                                     |

***

## Supported message types

### Receive

* ✅ Text
* ✅ Rich text (post)
* ✅ Images
* ✅ Files
* ✅ Audio
* ✅ Video
* ✅ Stickers

### Send

* ✅ Text
* ✅ Images
* ✅ Files
* ✅ Audio
* ⚠️ Rich text (partial support)
