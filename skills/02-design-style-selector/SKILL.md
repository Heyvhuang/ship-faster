---
name: 02-design-style-selector
description: Scan project docs to identify intent, recommend the most suitable design system from 30 preset styles, deploy to the project, then (by default) apply UI/UX using design-system.md with a plan + approval. Triggers: design style/design system/UI style/select style/recommend style/project style. Flow: scan project → analyze intent → recommend style → deploy design-system.md after confirmation → apply UI/UX (plan first).
---

# Design Style Selector

Scan project, identify intent, recommend and deploy the most suitable design system style.

## Available Styles (30 total)

### Light Themes (20)
| ID | Style Name | Use Cases |
|----|------------|-----------|
| 01 | Monochrome | Minimalist, content-focused, art/photography |
| 02 | Bauhaus | Geometric, functionalism, design/architecture |
| 04 | Newsprint | News, blogs, content-heavy |
| 05 | SaaS | B2B software, dashboards, tools |
| 06 | Luxury | High-end brands, luxury goods, fashion |
| 08 | Swiss Minimalist | International, clear hierarchy, corporate sites |
| 10 | Flat Design | Modern clean, iOS style, mobile apps |
| 12 | Material Design | Google style, Android, enterprise apps |
| 13 | Neo Brutalism | Bold rebellious, creative agencies, indie projects |
| 15 | Academia | Education, research, knowledge platforms |
| 18 | Playful Geometric | Children, games, creative brands |
| 20 | Claymorphism | 3D texture, modern playful, emerging brands |
| 21 | Professional | Corporate sites, B2B, consulting services |
| 22 | Botanical | Nature, health, organic brands |
| 24 | Enterprise | Large corporations, finance, government |
| 25 | Sketch | Hand-drawn feel, prototypes, creative studios |
| 26 | Industrial | Manufacturing, engineering, tech hardware |
| 27 | Neumorphism | Soft UI, dashboards, control panels |
| 28 | Organic | Fluid shapes, wellness, lifestyle |
| 29 | Maximalism | Visual impact, fashion, art exhibitions |
| 30 | Retro | Nostalgia, vintage brands, indie games |

### Dark Themes (10)
| ID | Style Name | Use Cases |
|----|------------|-----------|
| 03 | Modern Dark | Tech products, dev tools, night mode |
| 07 | Terminal | Developer tools, CLI, geek products |
| 09 | Kinetic | Motion-driven, interactive experiences, creative showcases |
| 11 | Art Deco | High-end events, finance, vintage luxury |
| 14 | Bold Typography | Media, magazines, visual communication |
| 16 | Cyberpunk | Games, futurism, sci-fi |
| 17 | Web3 | Blockchain, cryptocurrency, DeFi |
| 19 | Minimal Dark | Developers, professional tools, focus mode |
| 23 | Vaporwave | Retrofuturism, music, subculture |

## Execution Flow

### Step 1: Scan Project
```
Scan the following files to identify project intent:
- README.md / README
- package.json / pyproject.toml / Cargo.toml
- Existing Claude.md / agent.md / AGENTS.md
- src/ or app/ directory structure
- Existing style files (tailwind.config, globals.css)
- Brand assets (logo, favicon)
```

### Step 2: Analyze Intent
Extract the following information:
- **Project Type**: SaaS/corporate site/e-commerce/blog/tool/game/...
- **Target Users**: Developers/enterprises/consumers/children/professionals/...
- **Brand Tone**: Professional/playful/premium/minimal/bold/...
- **Tech Stack**: React/Vue/Next.js/static site/...
- **Existing Design Constraints**: Current colors/fonts/component libraries

### Step 3: Recommend Styles
Based on analysis results, recommend **Top 3** best matching styles:
```
Recommendation #1: [Style Name] ⭐ Best Match
- Match Score: 95%
- Reason: ...
- Fit Points: ...

Recommendation #2: [Style Name]
- Match Score: 85%
- Reason: ...

Recommendation #3: [Style Name]
- Match Score: 75%
- Reason: ...
```

### Step 4: User Confirmation
- Present recommendation reasons
- Allow user to select or request more options
- Proceed to deployment after confirmation

### Step 5: Deploy Design System
```
1. Copy selected style file to project
2. Rename to design-system.md
3. Placement location:
   - Preferred: Project root directory
   - Alternative: docs/ or .cursor/ or .claude/
4. If Claude.md / agent.md exists:
   - Add reference at the top of that file
   - Explain that design-system.md is the unified design constraint
```

### Step 6: Apply UI/UX from design-system.md (default)

> Goal: make design-system.md show up in the UI, not just exist as a doc.

Requirements:
- Produce an executable UI/UX plan first (pages/components, scope, acceptance criteria, rollback).
- Implement only after user confirmation.
- If changes are large (layout/visual/interaction), include explicit confirmation checkpoints.

Suggested order:
1. Design tokens / global styles (typography, color, spacing, radius, shadow).
2. Component layer (buttons, inputs, cards, dialogs).
3. Page layer (first-impression pages and core flows).

Notes:
- If the user explicitly says “doc only” or “no UI changes”, skip this step and record the reason.

## Output Format

### Scan Report
```
📁 Project Scan Complete

Project Name: [name]
Project Type: [type]
Tech Stack: [stack]
Target Users: [audience]
Brand Tone: [tone]

Existing Design Assets:
- ✅ tailwind.config.js (has color config)
- ❌ No design system documentation
- ⚠️ Claude.md exists (needs integration)
```

### Deployment Confirmation
```
✅ Design System Deployed

File: /design-system.md
Style: [selected style]

Actions Taken:
1. Created design-system.md
2. Added reference in Claude.md

Next Steps (default):
- Produce a UI/UX implementation plan based on design-system.md (scope + acceptance criteria)
- After confirmation, apply the design system to UI/UX (start with tokens, components, then pages)
```

## Integration Rules

### When Claude.md / agent.md Exists
Add at the top of the file:
```markdown
## Design System

This project uses a unified design system, see [design-system.md](./design-system.md).

All UI development must follow the design-system.md specifications for:
- Color palette
- Typography rules
- Component styles
- Spacing system
```

### When No Existing Config Files
Create design-system.md directly in the root directory.

## Style File Location

All style prompt files are located in: `styles/`

File naming: `[id]-[name].md` (e.g., `01-monochrome.md`)

## Notes

1. **Don't overwrite existing files**: If design-system.md already exists, ask whether to replace
2. **Respect user choice**: Recommendations are not mandatory, users can choose any style
3. **Explain integration method**: Clearly explain how to use after deployment
4. **Tech stack adaptation**: Adjust specific implementation suggestions based on project tech stack
5. **Respect opt-out**: If the user wants doc-only, skip UI/UX changes and record why
