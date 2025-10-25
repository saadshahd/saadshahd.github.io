# Component System

Mediterranean-inspired component library using CVA (class-variance-authority) for maintainable variant management.

## Color Palette

### Primary (Amber Gold)
- `primary`: #D97706 (amber-600) - Pyramid authority, warm wisdom
- `primary-light`: #F59E0B (amber-500)
- `primary-dark`: #B45309 (amber-700)

### Secondary (Sea Blue)
- `secondary`: #2563EB (blue-600) - Deep, trustworthy
- `secondary-light`: #3B82F6 (blue-500)
- `secondary-dark`: #1E40AF (blue-700)

### Accent (Sky Cyan)
- `accent`: #22D3EE (cyan-400) - Fresh, modern
- `accent-light`: #67E8F9 (cyan-300)
- `accent-dark`: #06B6D4 (cyan-500)

---

## Button Component

**File:** `Button.astro`

### Variants

#### variant
- `primary`: Amber background, white text (default)
- `secondary`: Blue border, blue text, fills on hover
- `ghost`: Transparent, gray hover

#### size
- `sm`: Compact (px-4 py-2)
- `md`: Medium (px-6 py-3) - default
- `lg`: Large (px-8 py-4)

### Props
- `variant?: 'primary' | 'secondary' | 'ghost'`
- `size?: 'sm' | 'md' | 'lg'`
- `href?: string` - Creates link instead of button
- `type?: 'button' | 'submit' | 'reset'` - Button type (default: 'button')
- `class?: string` - Additional classes

### Usage

```astro
<Button variant="primary" size="lg" href="/portfolio">
  View Work
</Button>

<Button variant="secondary">
  Get in Touch
</Button>

<Button variant="ghost" size="sm">
  Learn More
</Button>

<Button type="submit">
  Submit Form
</Button>
```

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

1. **Use components consistently** - Don't mix component styles with one-off Tailwind classes
2. **Leverage variants** - Add new variants instead of creating duplicate components
3. **Extend with class prop** - Use the `class` prop for layout-specific tweaks
4. **Keep semantic HTML** - Button components render `<a>` when given `href`, `<button>` otherwise

---

**Built with:**
- [class-variance-authority](https://cva.style/docs) - Variant management
- [clsx](https://github.com/lukeed/clsx) - Conditional classes
- [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) - Prose styling
