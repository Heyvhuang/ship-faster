# MarginLedger Design System

> Professional data-dense dashboard for AI cost analysis. Trust-building, data-driven, precision-focused.

## Design Philosophy

- **Data-Dense + Swiss Modernism**: Maximum information visibility with clean mathematical grid
- **Trust through clarity**: Financial data requires precision and readability
- **Progressive disclosure**: Show summary first, drill-down on demand

---

## Color System

### Core Palette

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `--bg-primary` | `#F8FAFC` | `slate-50` | Page background |
| `--bg-secondary` | `#FFFFFF` | `white` | Cards, panels |
| `--bg-tertiary` | `#F1F5F9` | `slate-100` | Hover states, subtle sections |
| `--text-primary` | `#0F172A` | `slate-900` | Headings, important text |
| `--text-secondary` | `#475569` | `slate-600` | Body text |
| `--text-muted` | `#94A3B8` | `slate-400` | Captions, placeholders |
| `--border` | `#E2E8F0` | `slate-200` | Borders, dividers |

### Semantic Colors

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `--primary` | `#0F172A` | `slate-900` | Primary actions, brand |
| `--primary-hover` | `#1E293B` | `slate-800` | Primary hover |
| `--accent` | `#3B82F6` | `blue-500` | Links, data highlights |
| `--cta` | `#F97316` | `orange-500` | Call-to-action buttons |
| `--cta-hover` | `#EA580C` | `orange-600` | CTA hover |

### Status Colors (Margin Health)

| Status | Hex | Tailwind | Condition |
|--------|-----|----------|-----------|
| `--profit-high` | `#059669` | `emerald-600` | margin ≥ target |
| `--profit-ok` | `#10B981` | `emerald-500` | margin > 0 |
| `--warning` | `#D97706` | `amber-600` | 0 < margin < target |
| `--danger` | `#DC2626` | `red-600` | margin ≤ 0 |
| `--danger-bg` | `#FEF2F2` | `red-50` | Danger card background |

### Heatmap Gradient (Demo Moment)

```
Profit Scale: danger → warning → ok → high
Colors: #DC2626 → #F59E0B → #10B981 → #059669
```

---

## Typography

### Font Stack

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Type Scale

| Element | Size | Weight | Line Height | Class |
|---------|------|--------|-------------|-------|
| Display | 48px | 700 | 1.1 | `text-5xl font-bold` |
| H1 | 36px | 700 | 1.2 | `text-4xl font-bold` |
| H2 | 24px | 600 | 1.3 | `text-2xl font-semibold` |
| H3 | 18px | 600 | 1.4 | `text-lg font-semibold` |
| Body | 16px | 400 | 1.6 | `text-base` |
| Small | 14px | 400 | 1.5 | `text-sm` |
| Caption | 12px | 500 | 1.4 | `text-xs font-medium` |
| Data/Mono | 14px | 500 | 1.4 | `font-mono text-sm font-medium` |

### Usage Rules

- **Headings**: Inter, semibold/bold, tight tracking (`tracking-tight`)
- **Body**: Inter, regular, relaxed line height
- **Data/Numbers**: JetBrains Mono, medium weight
- **Labels**: Inter, medium, uppercase for section headers (`uppercase tracking-wide`)

---

## Spacing & Layout

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight gaps |
| `--space-2` | 8px | Icon gaps, inline spacing |
| `--space-3` | 12px | Compact padding |
| `--space-4` | 16px | Standard padding |
| `--space-6` | 24px | Card padding |
| `--space-8` | 32px | Section gaps |
| `--space-12` | 48px | Large section spacing |
| `--space-20` | 80px | Page section margins |

### Container

```css
.container {
  max-width: 1280px; /* 7xl */
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 640px) {
  .container { padding: 0 24px; }
}

@media (min-width: 1024px) {
  .container { padding: 0 32px; }
}
```

### Grid System

- **Dashboard**: 12-column grid, `gap-4` (16px)
- **Cards**: `gap-4` to `gap-6`
- **Form fields**: `gap-4` vertical, `gap-6` between sections

---

## Components

### Button

```tsx
// Primary (CTA)
className="bg-slate-900 text-white hover:bg-slate-800 
           px-4 py-2 rounded-md font-medium text-sm
           transition-colors duration-200
           focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2
           disabled:opacity-50 disabled:cursor-not-allowed"

// Secondary
className="bg-slate-100 text-slate-900 hover:bg-slate-200 ..."

// Outline
className="border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 ..."

// Danger
className="bg-red-600 text-white hover:bg-red-700 ..."
```

### Card

```tsx
className="bg-white border border-slate-200 rounded-lg
           shadow-[0_1px_3px_rgba(0,0,0,0.05)]
           hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]
           transition-shadow duration-200"

// Card header
className="px-6 py-4 border-b border-slate-100"

// Card body
className="p-6"
```

### Input

```tsx
className="w-full px-3 py-2 
           border border-slate-300 rounded-md
           text-slate-900 placeholder:text-slate-400
           focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent
           transition-colors duration-200"
```

### Badge / Status Pill

```tsx
// Profit (green)
className="inline-flex items-center px-2 py-0.5 rounded-full
           text-xs font-semibold font-mono
           bg-emerald-100 text-emerald-800"

// Warning (amber)
className="... bg-amber-100 text-amber-800"

// Danger (red)
className="... bg-red-100 text-red-800"
```

### Table

```tsx
// Header
className="bg-slate-100 text-slate-600 uppercase text-xs font-semibold tracking-wider"

// Row hover
className="hover:bg-slate-50 transition-colors"

// Numeric cells
className="text-right font-mono"
```

---

## Animation & Motion

### Timing

| Type | Duration | Easing |
|------|----------|--------|
| Micro (hover, focus) | 150ms | `ease-out` |
| Standard (modals, cards) | 200ms | `ease-out` |
| Complex (page transitions) | 300ms | `ease-in-out` |

### Motion Tokens

```css
:root {
  --transition-fast: 150ms ease-out;
  --transition-base: 200ms ease-out;
  --transition-slow: 300ms ease-in-out;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Patterns

```tsx
// Fade in up (entry animation)
className="animate-fade-in-up"
// keyframes: 0% { opacity: 0; transform: translateY(10px); }
//           100% { opacity: 1; transform: translateY(0); }

// Pulse (loading, attention)
className="animate-pulse"

// Spin (loading indicator only)
className="animate-spin"
```

### Interaction States

| State | Effect |
|-------|--------|
| Hover (card) | `shadow` increase, no layout shift |
| Hover (button) | Background color change |
| Hover (row) | Background `slate-50` |
| Focus | `ring-2 ring-slate-900 ring-offset-2` |
| Active | Slightly darker background |
| Disabled | `opacity-50 cursor-not-allowed` |

---

## Data Visualization

### Chart Colors

```tsx
const chartColors = {
  profit: '#059669',    // emerald-600
  warning: '#D97706',   // amber-600
  danger: '#DC2626',    // red-600
  neutral: '#64748B',   // slate-500
  grid: '#E2E8F0',      // slate-200
  reference: '#94A3B8', // slate-400 (dashed)
};
```

### Heatmap / Bubble Map (Demo Moment)

```tsx
// Size: Revenue (larger = more revenue)
// Color: Margin health
const getMarginColor = (marginPercent: number, target: number) => {
  if (marginPercent < 0) return '#DC2626';      // danger
  if (marginPercent < target) return '#D97706'; // warning  
  if (marginPercent < target * 1.5) return '#10B981'; // ok
  return '#059669'; // high profit
};

// Opacity for density
// Glow effect for danger customers
className="animate-pulse" // subtle pulse for margin < 0
```

### Tooltip Style

```tsx
contentStyle={{
  backgroundColor: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: '6px',
  fontSize: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}}
```

---

## Accessibility Checklist

- [x] Color contrast ≥ 4.5:1 for text
- [x] Focus states visible (`ring-2`)
- [x] No color-only indicators (use icons + color)
- [x] Respect `prefers-reduced-motion`
- [x] Interactive elements have `cursor-pointer`
- [x] Form inputs have labels
- [x] Images have alt text
- [x] Keyboard navigable

---

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Ultra-wide |

### Mobile-First Patterns

```tsx
// Stack on mobile, grid on desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"

// Hide on mobile
className="hidden sm:block"

// Responsive padding
className="px-4 sm:px-6 lg:px-8"
```

---

## File Structure

```
components/
├── Button.tsx      # Button variants
├── Card.tsx        # Card with header/body
├── Layout.tsx      # Page layout + nav
├── Input.tsx       # Form inputs
├── Badge.tsx       # Status badges
├── Table.tsx       # Data tables
└── charts/
    ├── MarginChart.tsx
    └── ProfitHeatmap.tsx  # Demo moment
```
