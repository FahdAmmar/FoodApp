# Design System Documentation

## Overview
This document outlines the design system for the FoodApp application, including colors, typography, spacing, and component patterns.

---

## Color System

### Primary Brand Color
```css
--primary: 24 95% 53%     /* Vibrant Orange */
```
Used for: CTAs, links, highlights, primary actions

### Semantic Colors
| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--background` | White | Dark Blue | Page backgrounds |
| `--foreground` | Dark | Light | Primary text |
| `--card` | White | Darker | Card backgrounds |
| `--muted` | Light Gray | Dark | Subtle backgrounds |
| `--border` | Light Border | Dark Border | Dividers, outlines |
| `--destructive` | Red | Red | Error states, destructive actions |

### Dark Mode
Implemented using `next-themes` with `class` attribute. Dark mode is automatically applied based on:
1. User preference (if previously selected)
2. System preference (`prefers-color-scheme`)
3. Default: "system"

---

## Typography

### Scale
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Page Title) | `text-3xl md:text-4xl` | `font-bold` | `leading-tight` |
| H2 (Section) | `text-xl md:text-2xl` | `font-bold` | - |
| H3 (Card Title) | `text-base` | `font-semibold` | `leading-tight` |
| Body | `text-sm` | `normal` | - |
| Caption | `text-xs` | `normal` | - |

### Usage
- Use `text-foreground` for primary text
- Use `text-muted-foreground` for secondary/descriptive text
- Use `font-medium` or `font-semibold` for emphasis
- Avoid `font-bold` for long text (use sparingly)

---

## Spacing System

### Container
```html
<div class="container py-8">
```
- Desktop: `max-width` with auto margins
- Vertical padding: `py-8` (32px)
- Section padding: `py-12` (48px)

### Grid Gap
- Cards: `gap-4` (16px mobile), `gap-6` (24px desktop)
- Grid columns: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`

### Component Spacing
- Card padding: `p-4`
- Section spacing: `mb-6` to `mb-12`
- Button groups: `gap-2`

---

## Component Patterns

### Cards
```tsx
<Card className="overflow-hidden shadow-sm hover:shadow-lg border-border/50">
  {/* content */}
</Card>
```
- Use `border-border/50` for subtle borders
- Use `shadow-sm` default, `shadow-lg` on hover
- Use `overflow-hidden` for image containment

### Buttons
```tsx
// Primary CTA
<Button>Action</Button>

// Secondary
<Button variant="secondary">Action</Button>

// Outline
<Button variant="outline">Action</Button>

// Ghost
<Button variant="ghost">Action</Button>

// With icon
<Button><Icon className="h-4 w-4" /> Action</Button>
```

### Badges
```tsx
// Secondary (default for categories)
<Badge variant="secondary">Category</Badge>

// Outline (for cuisine tags)
<Badge variant="outline">Cuisine</Badge>

// With icon
<Badge variant="secondary"><Icon className="h-3 w-3" /> Label</Badge>
```

### Search Input
```tsx
<div className="relative flex-1">
  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
  <Input
    placeholder="Search..."
    className="pl-11 h-12 text-base bg-background shadow-sm border-border/50 focus-visible:ring-primary"
  />
</div>
```

---

## Reusable Components

### Breadcrumb
```tsx
<Breadcrumb items={[
  { label: "Category", href: "/category/name" },
  { label: "Current Page" }
]} />
```

### EmptyState
```tsx
<EmptyState
  icon={SearchX}
  title="No results found"
  description="Try a different search term"
  action={{ label: "Browse Categories", onClick: () => {} }}
/>
```

### ThemeToggle
```tsx
<ThemeToggle /> {/* Auto-handles dark/light mode */}
```

---

## Accessibility

### Focus States
All interactive elements have visible focus states:
```css
*:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

### Semantic HTML
- Use `<Link>` instead of `<a>` for internal navigation
- Use `<button>` for actions
- Include `aria-label` for icon-only buttons

### Color Contrast
- All text combinations meet WCAG AA standards
- Use `text-muted-foreground` for secondary text (lower contrast OK)

---

## Animations

### Fade In
```css
.animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
```

### Slide Up (with stagger)
```css
.animate-slide-up { animation: slideUp 0.5s ease-out forwards; }
.stagger-1 { animation-delay: 0ms; }
.stagger-2 { animation-delay: 100ms; }
/* ... */
```

### Hover Effects
```tsx
// Card lift
<Card className="hover:-translate-y-1 hover:shadow-lg transition-all duration-300" />

// Image zoom
<img className="group-hover:scale-110 transition-transform duration-500" />
```

---

## File Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── breadcrumb.tsx
│   ├── empty-state.tsx
│   ├── theme-toggle.tsx
│   └── theme-provider.tsx
├── pages/
│   └── *.tsx         # Page components
├── index.css         # Tailwind v4 + design tokens
└── lib/
    └── utils.ts      # cn() utility
```

---

## Best Practices

1. **Consistency**: Always use existing components before creating new ones
2. **Responsive**: Design mobile-first, add breakpoints as needed
3. **Accessibility**: Test with keyboard navigation
4. **Performance**: Lazy load images, use proper aspect ratios
5. **Dark Mode**: Test both themes during development
