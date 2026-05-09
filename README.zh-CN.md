# Ship Faster

**面向 builder 的开放 Agent Packs** by Voxyz AI

Ship Faster 是 Voxyz 生成和维护的公开仓库：里面放 agent packs、小工具、以及经过批准的真实输出。它不是旧模板堆，也不是一个新的 SaaS 入口。

```text
需求信号
  -> agent pack
  -> 可见结果
  -> 需要托管执行时回到 Voxyz
```

## 从这里开始

| 你要什么 | 去哪里 |
|----------|--------|
| 使用严肃的 builder pack | [Packs](./packs/) |
| 看精选 examples 和 briefs | [Examples](./examples/) |
| 查看 Radar 生成页面的 HTML 源文件 | [Generated Sites](./generated-sites/) |
| 把 brief 变成简单页面 | [Brief to HTML Page](./tools/brief-to-html-page/) |
| 理解 pack 结构 | [什么是 Agent Pack?](./docs/what-is-an-agent-pack.md) |
| 用 Codex 跑 | [Codex 指南](./docs/run-with-codex.md) |
| 用 Claude Code 跑 | [Claude Code 指南](./docs/run-with-claude-code.md) |

## 第一批 Packs

| Pack | 方向 | 结果 | 链接 |
|------|------|------|------|
| Timeline Forager | creator | Turn a messy timeline or niche into a ranked list of article angles, evidence, and launch hooks. | [Open](./packs/creator/timeline-forager/) |
| Codebase Cartographer | developer | Map the product surface, key files, commands, risks, and first safe change in one pass. | [Open](./packs/developer/codebase-cartographer/) |
| Search Presence Operator | growth | Turn product truth into directories, comparison pages, answer pages, and measurement hooks. | [Open](./packs/growth/search-presence-operator/) |

## Voxyz 链接

- Cloud: https://www.voxyz.ai/cloud?utm_source=github&utm_medium=ship_faster&utm_campaign=ship_faster_reboot
- Studio: https://www.voxyz.ai/studio?utm_source=github&utm_medium=ship_faster&utm_campaign=ship_faster_reboot
- Marketplace: https://www.voxyz.ai/marketplace?utm_source=github&utm_medium=ship_faster&utm_campaign=ship_faster_reboot
- Radar: https://www.voxyz.ai/radar?utm_source=github&utm_medium=ship_faster&utm_campaign=ship_faster_reboot

## 仓库结构

```text
packs/      开放 agent packs
examples/   真实输出和批准后的 source briefs
generated-sites/ Radar/tool 生成的静态 HTML 源文件，不是 starter template
tools/      小工具
docs/       使用说明
legacy/     旧 skills/templates，仅保留历史
```

旧的根目录 `skills/`、`templates/`、`pixel-office-kit/` 已经归档到 `legacy/`。新的可复用入口是 `packs/`、`examples/`、`tools/`；自动生成的证明页面放在 `generated-sites/`。
