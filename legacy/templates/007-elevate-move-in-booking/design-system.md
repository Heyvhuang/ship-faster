# Elevate Design System

## Brand Identity
**Positioning**: Premium property management tech. Clean, confident, effortless.
**Mood**: Modern SaaS meets luxury hospitality. Think Stripe × Airbnb × Linear.

---

## Color Palette

### Primary (Brand)
```
brand-50:  #ecfeff  (bg tints)
brand-100: #cffafe  (hover states)
brand-200: #a5f3fc  (borders)
brand-400: #22d3ee  (accent)
brand-500: #06b6d4  (primary)
brand-600: #0891b2  (primary hover)
brand-700: #0e7490  (pressed)
brand-900: #164e63  (text on light)
```

### Neutrals (Slate)
```
slate-50:  #f8fafc  (page bg light)
slate-100: #f1f5f9  (card bg)
slate-200: #e2e8f0  (borders)
slate-300: #cbd5e1  (disabled)
slate-400: #94a3b8  (placeholder)
slate-500: #64748b  (secondary text)
slate-600: #475569  (body text)
slate-700: #334155  (headings)
slate-800: #1e293b  (dark card bg)
slate-900: #0f172a  (dark bg)
slate-950: #020617  (deepest bg)
```

### Semantic
```
success: #10b981 (emerald-500)
warning: #f59e0b (amber-500)
error:   #ef4444 (red-500)
info:    #3b82f6 (blue-500)
```

### Gradients
```css
--gradient-brand: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
--gradient-dark: linear-gradient(180deg, #0f172a 0%, #020617 100%);
--gradient-glow: radial-gradient(ellipse at center, rgba(6,182,212,0.15) 0%, transparent 70%);
--gradient-shimmer: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
```

---

## Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Scale
| Token | Size | Weight | Use |
|-------|------|--------|-----|
| display | 48-72px | 700 | Hero headlines |
| h1 | 36px | 700 | Page titles |
| h2 | 24px | 600 | Section headers |
| h3 | 18px | 600 | Card titles |
| body | 16px | 400 | Body copy |
| body-sm | 14px | 400 | Secondary text |
| caption | 12px | 500 | Labels, badges |
| mono | 14px | 500 | Code, numbers |

### Letter Spacing
- Headlines: -0.02em (tight)
- Body: 0
- Labels: 0.05em (wide, uppercase)

---

## Spacing & Layout

### Scale (4px base)
```
1: 4px    5: 20px   9: 36px
2: 8px    6: 24px   10: 40px
3: 12px   7: 28px   12: 48px
4: 16px   8: 32px   16: 64px
```

### Container
- Max width: 1280px (7xl)
- Padding: 24px mobile, 32px desktop

### Border Radius
```
sm: 6px    (buttons, inputs)
md: 8px    (small cards)
lg: 12px   (cards)
xl: 16px   (large cards, modals)
2xl: 24px  (hero sections)
full: 9999px (pills, avatars)
```

---

## Shadows & Elevation

### Light Mode
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
--shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
```

### Brand Glow
```css
--shadow-glow: 0 0 40px rgba(6,182,212,0.3);
--shadow-glow-sm: 0 0 20px rgba(6,182,212,0.2);
```

---

## Motion & Animation

### Timing
```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;
--duration-slower: 600ms;

--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Keyframes
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes shimmer {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.2); }
  50% { box-shadow: 0 0 40px rgba(6,182,212,0.4); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

---

## Components

### Buttons
- Primary: brand gradient bg, white text, glow shadow on hover
- Secondary: slate-800 bg, white text
- Outline: transparent bg, slate-300 border, darkens on hover
- Ghost: transparent, text only, subtle bg on hover
- States: hover (+brightness), active (scale 0.98), disabled (opacity 50%)

### Cards
- Background: white (light) / slate-800 (dark)
- Border: 1px slate-200 / slate-700
- Shadow: shadow-sm default, shadow-md on hover
- Radius: lg (12px)

### Inputs
- Height: 44px
- Border: slate-300, brand-500 on focus
- Ring: 2px brand-500/20 on focus
- Placeholder: slate-400

### Timeline Slot Picker (Hero Component)
- Horizontal scrollable track
- Slots as pill buttons with gradient bg when selected
- Heat indicator: warm colors for popular times
- Smooth scroll snap
- Current time indicator with pulse animation
- Glass morphism on selected state

---

## Patterns

### Glass Morphism
```css
.glass {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
}
```

### Glow Effect
```css
.glow {
  position: relative;
}
.glow::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: var(--gradient-brand);
  border-radius: inherit;
  filter: blur(12px);
  opacity: 0.5;
  z-index: -1;
}
```

### Noise Texture
```css
.noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
}
```

---

## Usage Guidelines

1. **Contrast**: Ensure 4.5:1 minimum for body text
2. **Animation**: Use sparingly, for feedback and delight only
3. **Spacing**: Stick to the scale, no magic numbers
4. **Color**: Brand color for CTAs only, don't overuse
5. **Dark Mode**: Support both, test both
