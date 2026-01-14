# Design System: Minimalist Modern (SaaS)

## Design Philosophy
Clarity through structure, character through bold detail. Use generous whitespace, a single strong accent, and restrained motion to keep the UI professional and confident.

## Color Tokens
- background: #FAFAFA
- foreground: #0F172A
- muted: #F1F5F9
- muted-foreground: #64748B
- accent: #0052FF
- accent-secondary: #4D7CFF
- accent-foreground: #FFFFFF
- border: #E2E8F0
- card: #FFFFFF
- ring: #0052FF

Signature gradient:
- linear-gradient(to right, #0052FF, #4D7CFF)

## Typography
- Display: Calistoga, Georgia, serif (headlines only)
- UI and body: Inter, system-ui, sans-serif
- Monospace accents: JetBrains Mono, monospace

Type scale guidance:
- Hero: 5xl to 6xl, tight tracking
- Section headings: 3xl
- Body: base to lg, relaxed line-height
- Labels: 12px uppercase with letter spacing

## Layout and Spacing
- Container: max-w-6xl to max-w-7xl, centered
- Section padding: large vertical spacing (py-28 to py-40)
- Grid gaps: 5 to 8
- Use asymmetry to break rigid grids when appropriate

## Components
Buttons:
- Primary: gradient background, white text, subtle lift on hover
- Secondary: transparent with border, muted hover fill
- Ghost: no border, muted text, brighten on hover

Cards:
- White surfaces with 1px border, rounded-xl
- Default shadow-md, stronger shadow on hover

Inputs:
- Height 48 to 56
- Border 1px, rounded-lg or rounded-xl
- Focus ring: ring-2 ring-offset-2, accent color

Badges:
- Pill shape with subtle accent border
- Optional dot indicator
- Monospace uppercase label

## Motion
- Use subtle transitions for hover and focus (200-300ms)
- Avoid noisy animation; motion should be purposeful

## Responsive
- Mobile first, stack columns, maintain touch targets (44px+)
- Hide decorative elements on small screens if needed

## Accessibility
- Maintain AA contrast for all text
- Visible focus states for all interactive elements
- Avoid motion that conflicts with reduced motion settings
