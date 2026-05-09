# Design System: Kanban Load Mirror

## Style Identity: **Dark Tech / Data Command Center**

A sleek, high-tech aesthetic that feels like a professional data operations center. Deep backgrounds with vibrant accent glows create focus on critical information while particle animations bring data to life.

---

## Color Palette

### Base Colors
```css
--bg-primary: #0a0a0f;      /* Deep void black */
--bg-secondary: #12121a;    /* Card backgrounds */
--bg-tertiary: #1a1a24;     /* Elevated surfaces */
--bg-hover: #22222e;        /* Interactive hover states */
```

### Text Colors
```css
--text-primary: #f0f0f5;    /* Primary text - near white */
--text-secondary: #8888a0;  /* Secondary text - muted */
--text-tertiary: #5a5a70;   /* Tertiary text - subtle */
--text-inverse: #0a0a0f;    /* Text on light backgrounds */
```

### Accent Colors (Neon Glow)
```css
--accent-cyan: #00f0ff;     /* Primary accent - data, links */
--accent-cyan-glow: rgba(0, 240, 255, 0.15);
--accent-magenta: #ff00aa;  /* Alerts, blockers, critical */
--accent-magenta-glow: rgba(255, 0, 170, 0.15);
--accent-lime: #a0ff00;     /* Success, completed, positive */
--accent-lime-glow: rgba(160, 255, 0, 0.15);
--accent-amber: #ffaa00;    /* Warnings, aging, attention */
--accent-amber-glow: rgba(255, 170, 0, 0.15);
```

### Semantic Colors
```css
--status-overloaded: var(--accent-amber);
--status-blocked: var(--accent-magenta);
--status-healthy: var(--accent-lime);
--status-active: var(--accent-cyan);
```

### Gradients
```css
--gradient-card: linear-gradient(135deg, #12121a 0%, #1a1a24 100%);
--gradient-glow-cyan: radial-gradient(ellipse at center, rgba(0, 240, 255, 0.1) 0%, transparent 70%);
--gradient-glow-magenta: radial-gradient(ellipse at center, rgba(255, 0, 170, 0.1) 0%, transparent 70%);
--gradient-hero: linear-gradient(180deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%);
```

---

## Typography

### Font Stack
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Scale
| Token | Size | Weight | Use Case |
|-------|------|--------|----------|
| `display-xl` | 56px | 700 | Hero headlines |
| `display-lg` | 40px | 700 | Section titles |
| `heading-lg` | 24px | 600 | Card titles |
| `heading-md` | 18px | 600 | Subsections |
| `body-lg` | 16px | 400 | Primary body |
| `body-md` | 14px | 400 | Secondary body |
| `body-sm` | 12px | 400 | Captions |
| `mono-md` | 13px | 500 | Data, codes, stats |
| `mono-sm` | 11px | 400 | Labels, IDs |

### Text Glow Effect (for emphasis)
```css
.text-glow-cyan {
  text-shadow: 0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.2);
}
```

---

## Spacing

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

---

## Border & Radius

```css
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;

--border-subtle: 1px solid rgba(255, 255, 255, 0.06);
--border-glow-cyan: 1px solid rgba(0, 240, 255, 0.3);
--border-glow-magenta: 1px solid rgba(255, 0, 170, 0.3);
```

---

## Shadows & Glows

```css
/* Elevation shadows */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.5);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.6);

/* Glow effects */
--glow-cyan: 0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1);
--glow-magenta: 0 0 20px rgba(255, 0, 170, 0.3), 0 0 40px rgba(255, 0, 170, 0.1);
--glow-lime: 0 0 20px rgba(160, 255, 0, 0.3), 0 0 40px rgba(160, 255, 0, 0.1);
```

---

## Component Patterns

### Cards
```
- Background: var(--bg-secondary)
- Border: var(--border-subtle)
- Border-radius: var(--radius-lg)
- Hover: border glows with accent color
- Padding: var(--space-6)
```

### Buttons

**Primary (CTA)**
```
- Background: var(--accent-cyan)
- Text: var(--text-inverse)
- Border-radius: var(--radius-md)
- Shadow: var(--glow-cyan)
- Hover: brighten + intensify glow
```

**Secondary**
```
- Background: transparent
- Border: var(--border-glow-cyan)
- Text: var(--accent-cyan)
- Hover: background rgba(0, 240, 255, 0.1)
```

**Danger/Alert**
```
- Background: var(--accent-magenta)
- Shadow: var(--glow-magenta)
```

### Inputs
```
- Background: var(--bg-tertiary)
- Border: var(--border-subtle)
- Focus: var(--border-glow-cyan) + subtle glow
- Text: var(--text-primary)
- Placeholder: var(--text-tertiary)
```

### Stats/Metrics Display
```
- Large mono numbers with accent color
- Subtle glow behind critical values
- Unit labels in text-tertiary
```

---

## Animation Principles

### Timing
```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;
--duration-particle: 2000ms;

--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Motion Guidelines
1. **Particles**: Continuous, organic movement (2-4s cycles)
2. **Hover states**: Quick response (150ms)
3. **Page transitions**: Smooth fade + subtle slide (300ms)
4. **Data updates**: Number morphing with spring easing
5. **Loading**: Pulsing glow + particle convergence

---

## Particle System Specifications

### Particle Field (Core Feature)
The signature "flow field" animation where data points flow and converge:

**Visual Behavior:**
- Particles represent individual kanban cards
- Flow toward assignee clusters
- Color-coded by status (cyan=active, magenta=blocked, amber=aging)
- Glow intensity increases for critical items
- Smooth physics-based movement with attraction/repulsion

**Technical Specs:**
```
- Canvas-based rendering (WebGL if possible)
- 100-300 particles for typical board
- 60fps target
- Particle size: 2-6px with glow halo
- Trail effect: subtle fade (0.3 opacity decay)
```

**Interaction:**
- Hover on particle: expand + show card title tooltip
- Click: highlight related cards
- Assignee nodes act as gravity wells

---

## Page-Specific Guidelines

### Landing Page
- Full-bleed dark gradient background
- Hero with display-xl text + cyan glow
- Subtle particle animation in background (ambient)
- High contrast CTA button with pulse animation
- "Before/After" comparison with dramatic glow difference

### Import Flow
- Centered card on dark void
- Code editor aesthetic for JSON input (mono font, syntax-ish colors)
- Step indicators with glow progression
- File drop zone with dashed cyan border

### Processing
- Particle convergence animation (cards → clusters)
- Progress steps with sequential glow activation
- Ambient particle field in background
- "Analyzing" text with typing/pulse effect

### Dashboard
- **Header stats**: Large glowing numbers, grid layout
- **Particle field**: Main visual - cards flowing to assignee nodes
- **Team load section**: Dark cards with status-colored accents
- **Agenda panel**: Dark panel with magenta accent for alerts
- Nav bar: Frosted glass effect (backdrop-blur + subtle border)

### Billing Modal
- Backdrop blur over dark background
- Card with gradient border (cyan → magenta)
- Feature list with glow checkmarks
- CTA with full glow treatment

---

## Tailwind Class Mappings

For quick implementation with Tailwind CDN:

```
bg-primary     → bg-[#0a0a0f]
bg-secondary   → bg-[#12121a]
bg-tertiary    → bg-[#1a1a24]
text-primary   → text-[#f0f0f5]
text-secondary → text-[#8888a0]
accent-cyan    → text-[#00f0ff] / bg-[#00f0ff]
accent-magenta → text-[#ff00aa] / bg-[#ff00aa]
accent-lime    → text-[#a0ff00] / bg-[#a0ff00]
accent-amber   → text-[#ffaa00] / bg-[#ffaa00]
glow-cyan      → shadow-[0_0_20px_rgba(0,240,255,0.3)]
border-subtle  → border-white/5
```

---

## Do's and Don'ts

### Do
- Use generous spacing between elements
- Apply glow effects sparingly for emphasis
- Maintain high contrast for readability
- Let particles be the visual hero
- Use mono font for all data/numbers

### Don't
- Overuse neon colors (they lose impact)
- Apply glow to every element
- Use pure white (#fff) - always slightly tinted
- Block particle animations with overlays
- Mix too many accent colors in one view
