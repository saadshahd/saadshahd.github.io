# Portfolio Site - Project Instructions

## Design Philosophy

**Persona:** Technical authority with taste
**Approach:** Content-first, animations enhance UX (never distract)

### Egyptian Heritage Brand

**Identity**: Egyptian engineer inspired by Nile, pyramids, Red Sea, High Dam, 1973 water engineering (Bar Lev Line breakthrough)
**Aesthetic**: Heritage as backdrop - present but not overwhelming technical content
**Visual Metaphor**: Creative problem-solving through abstract geometric patterns

**Color Palette** (src/styles/global.css @theme):

- Primary: `#F4C430` (bright Egyptian gold) - magical, luminous
- Secondary: `#0EA5E9` (Red Sea blue) - clear water, NOT greenish
- Accent: `#06B6D4` (vibrant cyan-blue)
- Background: `#F5F1E8` (limestone cream)

**Pattern Components** (src/components/patterns/):

#### PyramidGrid Component
**Path**: `src/components/patterns/PyramidGrid.astro`
**User SVG**: `M 0 -45 L -45 0 L 45 0 Z` (refined from `M0-45-45 0H45L0-45`)

**Features**:
- 3 large pyramids (800px, 600px, 700px)
- Golden ratio placement (20%, 65%, 15%)
- Staggered fade-in animation (0s, 0.2s, 0.4s delays)
- One inverted pyramid (180° rotation)
- Opacity 0.08-0.12 (never distracts from content)

**Usage**:
```astro
---
import PyramidGrid from '@/components/patterns/PyramidGrid.astro';
---

<PyramidGrid />
```

**Animation**: Motion One stagger with Egyptian "water" easing `[0.65, 0, 0.35, 1]`

#### WaterFlow Component
**Path**: `src/components/patterns/WaterFlow.astro`
**User SVG**: `M 180 0 C 120 45, 45 -45, 0 0` (refined from `M180 0C120 45 45-45 0 0`)

**Features**:
- Repeating S-curve wave pattern (4 waves, 720px wide)
- Stroke-dashoffset animation (flowing effect, 3s loop)
- Opacity increases on scroll (0.15 → 0.25)
- Echo wave layer for depth (cyan accent, blurred)
- Secondary color (#0EA5E9 Red Sea blue)

**Usage**:
```astro
---
import WaterFlow from '@/components/patterns/WaterFlow.astro';
---

<WaterFlow variant="horizontal" />
<!-- or -->
<WaterFlow variant="vertical" />
```

**Animation**: Infinite stroke-dashoffset loop + scroll-linked opacity

#### Pattern Demo
**URL**: `/patterns-demo` - Test page showing both patterns with controls

**Pattern Rules**:

- Desktop-optimized, bold animations (scale, flow, reveal)
- Mobile: static or minimal CSS-only (opacity 0.04, scale 0.7, no animation)
- `prefers-reduced-motion` respected (animations disabled)
- Full-screen `fixed inset-0` behind content (z-index: 0)
- Elegant minimalism: fewer elements, larger scale, breathing room
- NO visual noise - 2-3 clean elements per pattern max
- `aria-hidden="true"` (hidden from screen readers)
- `pointer-events: none` (doesn't block clicks)

### Animation Strategy

**Hero**: Geometric reveal (1.5s patterns → content fades)
**Principles**: Bold storytelling, never distract from content, respect motion preferences
**Inspiration**: Josh Comeau, Cassie Evans, Dan Abramov + Egyptian geometric art

---

## Content Style & Voice

**Voice**: Minimalist clarity - every word earns its place
**Tone**: Respectful depth - never condescend, never showboat
**Philosophy**: Production wisdom > trends, first principles > hype

### Writing Rules

**Sentence Rhythm** (Gary Provost): Vary length for musicality

- Short: punch and emphasis
- Medium: natural flow and connection
- Long: build energy toward architectural insights that matter

**Typography Breaks**: Use `<wbr>` for long technical terms (e.g., `StatsBomb<wbr>DataCollection<wbr>Pipeline`) and `text-wrap: balance` for headlines

**Every Sentence Must**: Teach principle, reveal decision, or show impact

**Forbidden**: Hype trends, performative jargon, tutorial-only content, condescension

**Clarity**: Write for "intelligent curious person" - explain complexity simply, consistent depth for all

### Reader Goals (Priority Order)

1. Trust (battle-tested experience)
2. Learning (deeper systems thinking)
3. Practical (applicable patterns)
4. Respect (principal-level thought)

### Case Study: Problem → Architecture → Impact → Lessons

- Problem (300-500w): Context, challenge, why it mattered
- Architecture (1000-1500w): Decisions, tradeoffs, diagrams, insights
- Impact (300-500w): Results, effects, what shipped
- Lessons (200-400w): What worked/didn't, principles, when to use

### Blog: Hook → Context → Deep Dive → Principle → Application

### Pre-Publish Checklist

- [ ] Sentence lengths vary (short/medium/long)
- [ ] No hype words (revolutionary, game-changing)
- [ ] No unnecessary jargon
- [ ] Every paragraph teaches
- [ ] Production wisdom evident
- [ ] First principles explained

---

## Content Structure

**Homepage**: Intro (Principal Engineer, realtime systems & functional thinking), 2-3 case studies, blog preview, CTA
**Portfolio**: 3-5 case studies (Problem→Architecture→Impact→Lessons), 2000-3000w + diagrams
**Blog**: Monthly technical articles, start with "Real-Time Data Collection System"
**About**: Bio 200-300w, expertise, highlights, headshot
**Resume**: PDF + HTML version
**Contact**: Email, LinkedIn, GitHub, optional form

---

## Success Criteria

**Week 1-2**: Live, one animation, responsive, placeholder content, <3s load
**Week 3-4**: First case study (StatsBomb), bio, resume, contact
**Month 2+**: Blog posts, more case studies, SEO

---

## Tech Stack

**Core:** Astro v5, Bun, Tailwind v4, Motion One (motion.dev), GitHub Pages/Actions
**Current:** View Transitions API built into Astro
**Optional:** Markdown for blog/case studies
**Forbidden:** Complex build systems, heavy frameworks, over-engineering

### Animation Library

**✅ Motion One** (`motion` package): Framework-agnostic, 5KB, Web Animations API - https://motion.dev
**❌ Framer Motion**: React-only (we don't use React)
**❌ anime.js**: Export issues, removed
**Rule**: Motion One or native CSS only. No React libs without React integration.

### Code Highlighting

**✅ Shiki** (https://shiki.style): Built into Astro

### Design System Documentation

**✅ Astrobook** (https://astrobook.pages.dev): Native Astro component playground
**Why:** Storybook CSF v3 compatible, zero React overhead, same dev server
**Location:** `/design-system` route with live component examples

---

## Design System Enforcement

### Mandatory Component-First Rule

**✅ ALWAYS use:** Button, Card, Badge, Link components
**❌ NEVER use:** Raw `<button>`, `<a>`, `<div>` with manual styling
**Why:** Type-safe variants (CVA) prevent class drift, ensure WCAG AA compliance

**Examples:**
```astro
<!-- ✅ CORRECT -->
<Button variant="primary" size="md" href="/portfolio">View Work</Button>

<!-- ❌ FORBIDDEN -->
<a href="/portfolio" class="px-6 py-3 bg-amber-500 text-slate-900 rounded-lg">View Work</a>
```

### Color Token Enforcement

**✅ ALWAYS use:** Semantic design system tokens
- Text: `text-accent` (body), `text-accent-light` (secondary), `text-neutral` (muted)
- Backgrounds: `bg-primary`, `bg-secondary`, `bg-surface`, `bg-background`
- Borders: `border-accent`, `border-neutral`, `border-primary`

**❌ FORBIDDEN:** Raw Tailwind arbitrary colors
- `text-gray-*`, `text-slate-*`, `text-zinc-*`
- `bg-blue-*`, `bg-amber-*`, `bg-cyan-*`
- Arbitrary hex values `text-[#...]`, `bg-[#...]`

**Why:** Single source of truth for Egyptian brand palette, guaranteed WCAG AA contrast

### Typography Scale Enforcement

**✅ ALWAYS use:** Content-First scale (src/styles/global.css @theme)
- Display: `text-3xl` (48px), `text-2xl` (40px), `text-xl` (32px)
- Headings: `text-lg` (24px), `text-base` (18px)
- Body/UI: `text-base` (18px), `text-sm` (14px), `text-xs` (12px)
- Responsive: Use Tailwind utilities (e.g., `text-2xl md:text-3xl` for mobile→desktop scaling)

**❌ FORBIDDEN:** Arbitrary Tailwind sizes outside design system
- `text-5xl`, `text-4xl`, `text-6xl` (not in content-first scale)
- Arbitrary values `text-[22px]`, `text-[1.75rem]`

**Why:** Professional scale prioritizes readability and content scanning over theatrical impact, serving technical hiring managers who value substance over spectacle

### Spacing Enforcement

**✅ ALWAYS use:** Fibonacci spacing tokens
- `spacing-xs` (4px), `spacing-sm` (8px), `spacing-md` (16px)
- `spacing-lg` (24px), `spacing-xl` (40px), `spacing-2xl` (64px), `spacing-3xl` (104px)
- Maps to Tailwind: `p-1` (4px), `p-2` (8px), `p-4` (16px), `p-6` (24px), `p-10` (40px), `p-16` (64px), `p-26` (104px)

**❌ FORBIDDEN:** Arbitrary spacing values
- `p-7`, `mb-13`, `gap-11` (breaks Fibonacci sequence)
- Arbitrary values `p-[18px]`, `mt-[2.5rem]`

**Why:** Natural mathematical progression creates visual rhythm

### Responsive Design Rule

**Tailwind 4 Constraint:** Theme variables (`@theme` block) cannot be nested in media queries or selectors - they are always top-level and global. For responsive behavior, use Tailwind's responsive utility variants (`text-xl md:text-2xl`, `p-4 md:p-6`) in component markup, not custom `@media` rules around theme tokens.

### Pre-Commit Checklist

Before any component/page changes:
- [ ] All buttons use `<Button>` component with `variant` prop
- [ ] All links use `<Link>` component (if standalone) or `<Button href>`
- [ ] All cards use `<Card>` component with `variant` prop
- [ ] Zero `text-gray-*`, `text-slate-*`, `text-zinc-*` classes
- [ ] Zero arbitrary font sizes outside design system scale
- [ ] Zero arbitrary spacing values outside Fibonacci sequence
- [ ] All interactive elements meet WCAG AA contrast ratio (4.5:1 minimum)
- [ ] Component examples added to Astrobook stories (if new component)

### Design System Location

**Documentation:** `/design-system` route (Astrobook integration)
**Source Files:**
- Tokens: `src/styles/global.css` (@theme block)
- Components: `src/components/*.astro`
- Stories: `src/components/*.stories.ts`

---

## Done = Week 2: Shareable + animation + responsive | Month 1: Case study + bio/resume
