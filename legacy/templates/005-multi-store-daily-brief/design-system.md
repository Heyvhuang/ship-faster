# Design System — Multi-Store Daily Brief

> Premium editorial aesthetic. Think Morning Brew meets Bloomberg Terminal.
> Mobile-first. Data-dense but breathable. Founder-friendly.

---

## 1. Brand Essence

| Attribute | Value |
|-----------|-------|
| **Personality** | Confident, concise, trustworthy |
| **Tone** | Professional warmth — not cold corporate, not casual startup |
| **Metaphor** | "Your personal CFO in a morning newspaper" |

---

## 2. Color Tokens

### Core Palette

```css
:root {
  /* Background */
  --color-paper: #fdfbf7;        /* Warm cream — primary bg */
  --color-paper-elevated: #ffffff; /* Cards, modals */
  --color-paper-subtle: #f5f3ef;  /* Section backgrounds */
  
  /* Text */
  --color-ink: #1a1a1a;          /* Primary text */
  --color-ink-muted: #57534e;    /* Secondary text (stone-600) */
  --color-ink-subtle: #a8a29e;   /* Tertiary/placeholder (stone-400) */
  
  /* Accent */
  --color-accent: #1a1a1a;       /* CTAs, emphasis (dark) */
  --color-accent-hover: #292524; /* Hover state */
  
  /* Semantic */
  --color-success: #15803d;      /* green-700 */
  --color-success-bg: #f0fdf4;   /* green-50 */
  --color-warning: #b45309;      /* amber-700 */
  --color-warning-bg: #fffbeb;   /* amber-50 */
  --color-danger: #b91c1c;       /* red-700 */
  --color-danger-bg: #fef2f2;    /* red-50 */
  --color-info: #1d4ed8;         /* blue-700 */
  --color-info-bg: #eff6ff;      /* blue-50 */
  
  /* Borders */
  --color-border: #e7e5e4;       /* stone-200 */
  --color-border-subtle: #f5f5f4; /* stone-100 */
}
```

### Store Colors (Data Visualization)

```css
:root {
  --store-1: #3b82f6; /* blue-500 */
  --store-2: #10b981; /* emerald-500 */
  --store-3: #f59e0b; /* amber-500 */
  --store-4: #8b5cf6; /* purple-500 */
  --store-5: #f97316; /* orange-500 */
}
```

---

## 3. Typography

### Font Stack

```css
:root {
  --font-serif: 'Merriweather', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Type Scale

| Token | Size | Line Height | Weight | Font | Use Case |
|-------|------|-------------|--------|------|----------|
| `display` | 48px / 3rem | 1.1 | 700 | Serif | Hero numbers |
| `h1` | 32px / 2rem | 1.2 | 700 | Serif | Page titles |
| `h2` | 24px / 1.5rem | 1.3 | 700 | Serif | Section headers |
| `h3` | 18px / 1.125rem | 1.4 | 600 | Sans | Card titles |
| `body` | 16px / 1rem | 1.6 | 400 | Sans | Body text |
| `body-sm` | 14px / 0.875rem | 1.5 | 400 | Sans | Secondary text |
| `caption` | 12px / 0.75rem | 1.4 | 500 | Sans | Labels, meta |
| `overline` | 10px / 0.625rem | 1.2 | 700 | Sans | Uppercase labels |

### Rules
- Headlines: Always `font-serif`
- Body/UI: Always `font-sans`
- Numbers/Data: `font-serif` for large display, `font-sans` for tables
- Uppercase labels: `tracking-widest` (0.1em)

---

## 4. Spacing

```css
:root {
  --space-1: 4px;   /* 0.25rem */
  --space-2: 8px;   /* 0.5rem */
  --space-3: 12px;  /* 0.75rem */
  --space-4: 16px;  /* 1rem */
  --space-5: 20px;  /* 1.25rem */
  --space-6: 24px;  /* 1.5rem */
  --space-8: 32px;  /* 2rem */
  --space-10: 40px; /* 2.5rem */
  --space-12: 48px; /* 3rem */
  --space-16: 64px; /* 4rem */
}
```

### Layout Guidelines
- **Page padding**: `px-4` (16px) on mobile, `px-6` (24px) on desktop
- **Section spacing**: `space-y-8` (32px) between major sections
- **Card padding**: `p-4` to `p-6` depending on density
- **Max content width**: `max-w-lg` (512px) for mobile-first, `max-w-2xl` (672px) for expanded

---

## 5. Effects

### Shadows

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -4px rgba(0,0,0,0.05);
  --shadow-float: 0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.05);
}
```

### Border Radius

```css
:root {
  --radius-sm: 6px;   /* Buttons, badges */
  --radius-md: 8px;   /* Inputs */
  --radius-lg: 12px;  /* Cards */
  --radius-xl: 16px;  /* Modals, hero cards */
  --radius-full: 9999px; /* Pills, avatars */
}
```

---

## 6. Animation

### Timing

```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Motion Principles
1. **Purposeful**: Animation should convey meaning (data loading, state change)
2. **Quick**: UI feedback < 200ms, content transitions < 500ms
3. **Subtle**: Avoid flashy effects; prefer opacity + transform
4. **Staggered**: Lists animate in sequence (50-100ms delay each)

### Signature Animations

```css
/* Number counter */
@keyframes countUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Ring chart segment */
@keyframes ringGrow {
  from { stroke-dashoffset: var(--circumference); }
  to { stroke-dashoffset: var(--target-offset); }
}

/* Fade in up (for cards, sections) */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Pulse for positive indicators */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

---

## 7. Component Specs

### Card

```
- Background: var(--color-paper-elevated)
- Border: 1px solid var(--color-border)
- Radius: var(--radius-lg)
- Shadow: var(--shadow-sm)
- Padding: var(--space-4) to var(--space-6)
- Hover: shadow-md, subtle transform translateY(-1px)
```

### Button (Primary)

```
- Background: var(--color-accent)
- Text: white
- Radius: var(--radius-full) for CTAs, var(--radius-sm) for inline
- Padding: py-3 px-6 (12px 24px)
- Font: font-sans, font-medium
- Hover: var(--color-accent-hover), translateY(-1px), shadow-lg
- Active: scale(0.98)
```

### Badge

```
- Padding: px-2 py-0.5 (8px 2px)
- Radius: var(--radius-full)
- Font: caption size, font-medium
- Variants:
  - Success: bg-green-50 text-green-700
  - Warning: bg-amber-50 text-amber-700
  - Danger: bg-red-50 text-red-700
  - Neutral: bg-stone-100 text-stone-700
```

### Data Visualization (Ring Chart)

```
- Stroke width: 24-32px (thick, confident)
- Background ring: var(--color-border-subtle)
- Segment colors: --store-1 through --store-5
- Animation: 1s duration, staggered 100ms per segment
- Center text: display size, font-serif
- Hover: segment expands stroke-width +4px, shows tooltip
```

---

## 8. Responsive Breakpoints

```css
/* Tailwind defaults, mobile-first */
sm: 640px   /* Large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Mobile-First Rules
1. Design for 375px width first
2. Stack elements vertically by default
3. Side-by-side layouts only at `md:` and above
4. Touch targets minimum 44x44px

---

## 9. Accessibility

- Color contrast: Minimum 4.5:1 for body text, 3:1 for large text
- Focus states: Visible ring (`ring-2 ring-offset-2 ring-stone-900`)
- Motion: Respect `prefers-reduced-motion`
- Semantic HTML: Use proper headings hierarchy, landmarks

---

## 10. Do's and Don'ts

### Do
- Use serif for headlines, sans for body
- Keep data dense but scannable
- Use whitespace generously
- Animate data changes meaningfully
- Use warm neutrals (stone palette)

### Don't
- Use pure white (#fff) as page background
- Mix multiple accent colors
- Add decorative animations without purpose
- Use thin/light font weights for important text
- Crowd the interface with borders
