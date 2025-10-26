# Component System

Egyptian heritage-inspired component library using CVA (class-variance-authority) for maintainable variant management.

## Color Palette (Egyptian Brand)

### Primary (Egyptian Gold)
- `primary`: #F4C430 - Bright Egyptian gold, magical and luminous
- `primary-light`: #FFD700
- `primary-dark`: #DAA520

### Secondary (Red Sea Blue)
- `secondary`: #0EA5E9 - Clear Red Sea water (NOT greenish)
- `secondary-light`: #38BDF8
- `secondary-dark`: #0369A1

### Accent (Blueprint Ink / Dark Navy)
- `accent`: #0F172A - Primary text color, dark navy for maximum contrast
- `accent-light`: #1E293B
- `accent-dark`: #020617

### Background
- `background`: #F5F1E8 - Limestone cream
- `surface`: #FFFFFF - Pure white for elevated surfaces

---

## ⚠️ Accessibility Requirements (WCAG AA)

**All interactive elements MUST meet WCAG AA contrast requirements:**
- Normal text: Minimum 4.5:1 contrast ratio
- Large text (18px+ or 14px+ bold): Minimum 3:1 contrast ratio

### ✅ APPROVED Color Combinations

| Foreground | Background | Contrast Ratio | Usage |
|------------|------------|----------------|-------|
| `#0F172A` (accent) | `#F4C430` (primary) | 11.2:1 ✅ AAA | Primary buttons |
| `#0F172A` (accent) | `#F5F1E8` (background) | 14.1:1 ✅ AAA | Body text |
| `#0EA5E9` (secondary) | `#0F172A` (accent) | 5.2:1 ✅ AA | Links on dark backgrounds |
| `#FFFFFF` (surface) | `#0F172A` (accent) | 18.1:1 ✅ AAA | Dark mode text |

### ❌ FORBIDDEN Color Combinations

**NEVER use these combinations - they fail WCAG AA:**

```astro
<!-- ❌ FORBIDDEN: 1.8:1 contrast (fails AA) -->
<a class="bg-primary text-background">Button</a>

<!-- ❌ FORBIDDEN: 2.1:1 contrast (fails AA) -->
<button class="bg-primary text-surface">Click me</button>

<!-- ❌ FORBIDDEN: Any yellow/gold on cream/white -->
<div class="bg-primary text-white">Content</div>
```

**Why these fail:** Egyptian gold (#F4C430) is too light for text-on-light combinations. It MUST be used as a background color with dark text.

### 🎯 Correct Usage Pattern

```astro
<!-- ✅ CORRECT: Use Button component -->
import Button from '../components/Button.astro';

<Button variant="primary">View Work</Button>
<!-- Renders: bg-primary text-accent (11.2:1 contrast ✅) -->

<!-- ✅ CORRECT: Use Link component -->
import Link from '../components/Link.astro';

<Link variant="inline" href="/about">Learn more</Link>
<!-- Renders: text-secondary with proper contrast -->
```

### 🚫 Component Enforcement

**ALWAYS use design system components. NEVER create custom buttons or links with inline styles.**

```astro
<!-- ❌ WRONG: Custom inline button -->
<a href="/page" class="bg-primary text-background px-6 py-3">
  Click me
</a>

<!-- ✅ RIGHT: Use Button component -->
<Button href="/page" variant="primary">
  Click me
</Button>
```

---

## Button Component

**File:** `Button.astro`

### Variants (All WCAG AA Compliant ✅)

#### variant
- `primary`: Egyptian gold background (#F4C430) with dark text (#0F172A) - **11.2:1 contrast ✅ AAA** (default)
- `secondary`: Transparent background with dark border, fills on hover - **WCAG AA compliant**

#### size
- `sm`: Compact (px-4 py-2, text-sm, rounded-md)
- `md`: Medium (px-6 py-3, text-base, rounded-lg) - default
- `lg`: Large (px-8 py-4, text-lg, rounded-lg)

### Props
- `variant?: 'primary' | 'secondary'`
- `size?: 'sm' | 'md' | 'lg'`
- `href?: string` - Creates `<a>` link instead of `<button>`
- `type?: 'button' | 'submit' | 'reset'` - Button type (default: 'button')
- `class?: string` - Additional classes (use sparingly)

### Usage Examples

```astro
<!-- Primary CTA button -->
<Button variant="primary" size="lg" href="/portfolio">
  View Work
</Button>

<!-- Secondary action button -->
<Button variant="secondary" href="/contact">
  Get in Touch
</Button>

<!-- Form submit button -->
<Button variant="primary" type="submit">
  Send Message
</Button>

<!-- Small button -->
<Button variant="secondary" size="sm">
  Learn More
</Button>
```

### Design System Compliance

✅ All button variants use pre-approved accessible color combinations
✅ Focus states include visible outline for keyboard navigation
✅ Hover states provide clear visual feedback
✅ Disabled states reduce opacity and prevent interaction

---

## Card Component

**File:** `Card.astro`

### Variants

- `case-study`: Large card with hover lift animation (for portfolio items)
- `blog`: Compact card with border hover (for blog posts)
- `minimal`: Clean bordered card (default)

### Props
- `variant?: 'case-study' | 'blog' | 'minimal'`
- `href?: string` - Makes entire card clickable
- `class?: string` - Additional classes

### Usage

```astro
<Card variant="case-study" href="/portfolio/statsbomb">
  <img src="..." alt="..." />
  <h3>Case Study Title</h3>
  <p>Description...</p>
</Card>

<Card variant="blog">
  <Badge variant="category">Architecture</Badge>
  <h4>Blog Post Title</h4>
  <time>Oct 25, 2025</time>
</Card>

<Card variant="minimal">
  <p>Simple card content</p>
</Card>
```

---

## Link Component

**File:** `Link.astro`

### Variants

- `nav`: Navigation links with active state
- `inline`: Content links with underline (default)
- `external`: External links with icon

### Props
- `variant?: 'nav' | 'inline' | 'external'`
- `href: string` - Required
- `active?: boolean` - Active state (for nav variant)
- `external?: boolean` - Opens in new tab
- `class?: string` - Additional classes

### Usage

```astro
<!-- Navigation -->
<Link variant="nav" href="/" active={currentPath === '/'}>
  Home
</Link>

<!-- Inline content link -->
<Link href="/about">
  Learn more about me
</Link>

<!-- External link with icon -->
<Link variant="external" href="https://github.com/..." external>
  View on GitHub
</Link>
```

---

## Badge Component

**File:** `Badge.astro`

### Variants

- `skill`: Amber background (for skills like TypeScript, Rust)
- `category`: Blue background (for categories like Architecture, Performance) - default
- `status`: Cyan background (for status like Featured, New)

### Props
- `variant?: 'skill' | 'category' | 'status'`
- `class?: string` - Additional classes

### Usage

```astro
<Badge variant="skill">TypeScript</Badge>
<Badge variant="skill">Rust</Badge>

<Badge variant="category">Architecture</Badge>
<Badge variant="category">Performance</Badge>

<Badge variant="status">Featured</Badge>
<Badge variant="status">New</Badge>
```

---

## Typography (Prose)

For Markdown content, wrap in `prose` classes:

```astro
<article class="prose prose-lg prose-slate max-w-none">
  <slot /> <!-- Your markdown content -->
</article>
```

Custom prose configuration (from tailwind.config.js):
- Links: Sea blue with cyan hover
- Code: Amber background
- Headings: Deep slate

---

## Best Practices

1. **Always use design system components** - NEVER create custom buttons/links with inline styles
2. **Accessibility is mandatory** - All interactive elements MUST meet WCAG AA (4.5:1 for normal text)
3. **Forbidden: bg-primary text-background** - Egyptian gold requires dark text for contrast
4. **Use components consistently** - Don't bypass the design system with one-off Tailwind classes
5. **Leverage variants** - Add new variants to components instead of creating duplicates
6. **Extend with class prop sparingly** - Use the `class` prop only for layout tweaks, never for colors
7. **Keep semantic HTML** - Button components render `<a>` when given `href`, `<button>` otherwise
8. **Test with keyboard navigation** - All interactive elements must be keyboard accessible

---

**Built with:**
- [class-variance-authority](https://cva.style/docs) - Variant management
- [clsx](https://github.com/lukeed/clsx) - Conditional classes
- [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) - Prose styling
