# Saad Shahd - Production Portfolio

**Live Site:** [saadshahd.github.io](https://saadshahd.github.io)

This portfolio showcases functional architecture patterns through production-quality implementation. Built entirely through AI-native development—pairing and thinking with Claude Code—to demonstrate systems thinking at every layer.

---

## AI-Native Development

This entire codebase was developed through iterative collaboration with Claude Code, treating the AI as a pair programming partner. Every architectural decision, component design, and accessibility consideration emerged from conversation, not templates.

**Why this matters:** The repository structure, documentation practices, and component API reflect how software should be built when optimized for human understanding, not framework conventions.

---

## Architectural Highlights

### Component-First Design System
30+ reusable Astro components with CVA type-safe styling. No arbitrary Tailwind classes—every visual decision encoded in semantic variants.

```astro
<Button variant="primary" size="md" href="/portfolio">
<Badge variant="skill">TypeScript</Badge>
<Callout variant="secondary" title="Explore">
  <Body>Content with semantic typography...</Body>
  <Fragment slot="cta">
    <Button variant="ghost" size="sm" href="#">Action →</Button>
  </Fragment>
</Callout>
```

### Egyptian Heritage Design Language
Geometric patterns (pyramids, water flow) as subtle content backdrop. Never theatrical, always purposeful. Motion One animations with accessibility guards (`prefers-reduced-motion`).

### WCAG AA Compliance Throughout
7.2-9.1:1 contrast ratios across all semantic color variants. Text color hierarchy prevents the common mistake of using border colors for readable text:
- `text-text` (17.56:1) - Primary body text
- `text-text-light` (14.39:1) - Secondary text
- `text-text-lighter` (7.45:1 WCAG AAA) - Tertiary/muted text
- ❌ `text-neutral` (2.52:1) - ONLY for borders/icons, NEVER for readable text

### Blueprint Authority Diagrams
Mermaid diagrams with custom theme using semantic node taxonomy (atomic/derived/system). Technical architecture visualized with the same care as UI components.

---

## Repository Structure

```
├── src/
│   ├── components/          # 30+ production components
│   │   ├── Button.astro     # CVA variants: primary, secondary, ghost
│   │   ├── Badge.astro      # Semantic: skill, category, status
│   │   ├── Callout.astro    # With optional CTA slot composition
│   │   ├── patterns/        # Egyptian geometric patterns
│   │   │   ├── PyramidGrid.astro
│   │   │   └── WaterFlow.astro
│   │   └── ...
│   ├── layouts/
│   │   └── Layout.astro     # Root layout with View Transitions
│   ├── pages/
│   │   ├── index.astro      # Homepage with hero animations
│   │   ├── portfolio/
│   │   │   ├── index.astro
│   │   │   └── statsbomb.mdx  # 25-min case study, 6 sections
│   │   ├── about.astro
│   │   ├── resume.astro
│   │   └── contact.astro
│   ├── styles/
│   │   └── global.css       # Design system tokens (single source of truth)
│   └── utils/
│       └── animations.ts    # Egyptian easings, accessibility guards
│
├── docs/
│   ├── plans/               # 12 design documents (★ START HERE)
│   │   ├── 2025-10-26-mobile-nav-design.md
│   │   ├── 2025-10-29-responsive-design-system.md  # 8 story points
│   │   ├── 2025-10-30-diagram-design-system.md      # Blueprint Authority
│   │   ├── 2025-10-31-callout-cta-component.md     # 3 story points
│   │   └── ...
│   └── feedback/
│       ├── simon.md         # Wise lead: no arrogant titles
│       └── adham.md         # Statsbomb founding engineer: narrative flow
│
├── public/
│   ├── og-image.png         # Social preview (29KB)
│   ├── resume.pdf           # 176KB
│   └── ...
│
└── CLAUDE.md                # Project instructions (design system, accessibility rules)
```

### Where to Start

**For Senior Engineers:**
1. Read [`docs/plans/`](./docs/plans/) - architectural decisions with story point estimates
2. Examine [`CLAUDE.md`](./CLAUDE.md) - design system documentation
3. Browse [`src/components/`](./src/components/) - component API patterns
4. Review git history - clean narrative arc (no WIP commits)

**For Technical Recruiters:**
- [Live portfolio](https://saadshahd.github.io) - deployed via GitHub Pages
- [Case study: Statsbomb](https://saadshahd.github.io/portfolio/statsbomb) - 25-min read on real-time data collection
- [About page](https://saadshahd.github.io/about) - 15 years production systems experience

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Astro v5 | View Transitions, MDX support, zero JS by default |
| **Styling** | Tailwind v4 | Design system tokens, no arbitrary classes |
| **Animation** | Motion One | 5KB, Web Animations API wrapper, framework-agnostic |
| **Type Safety** | TypeScript + CVA | Component variants prevent class drift |
| **Diagrams** | Mermaid | Semantic node taxonomy with custom theme |
| **Deployment** | GitHub Pages | GitHub Actions workflow, <3s load time |
| **Runtime** | Bun | Fast package manager, single runtime |

---

## Design Philosophy

**Content-first showcase with Egyptian geometric design as backdrop.**

### Principles

1. **Component-first enforcement** - Zero raw HTML buttons/links, all semantic variants
2. **Accessible by default** - WCAG AA minimum, `prefers-reduced-motion` respected
3. **Progressive disclosure** - Complexity revealed when needed (Accordion components)
4. **Story point estimation** - Measure complexity, not time (AI acceleration unpredictable)
5. **Atomic migrations** - No v2 versions, one truth only

### Forbidden Patterns

❌ Arbitrary colors outside design system (`text-gray-*`, `bg-[#...]`)
❌ Arbitrary spacing (`p-[18px]`, `mb-13`)
❌ Raw HTML interactive elements (`<button>`, `<a>`)
❌ Using `text-neutral` for readable text (it's a border color)
❌ Building from scratch (library-first principle)

---

## Development

### Prerequisites
- **Bun** v1.2.23+ ([bun.sh](https://bun.sh))

### Quick Start

```bash
# Clone repository
git clone https://github.com/saadshahd/saadshahd.github.io.git
cd saadshahd.github.io

# Install dependencies
bun install

# Start dev server (with hot reload)
bun run dev

# Build for production
bun run build

# Preview production build locally
bun run preview
```

### Available Commands

| Command | Purpose |
|---------|---------|
| `bun run dev` | Start dev server at localhost:4321 |
| `bun run build` | Build for production (`dist/` directory) |
| `bun run preview` | Preview production build locally |
| `bun run astro check` | TypeScript type checking |

---

## Design System Documentation

**Interactive component playground:** `/design-system` route (Astrobook integration)

All design tokens defined in [`src/styles/global.css`](./src/styles/global.css) `@theme` block:

### Egyptian Color Palette

- **Primary:** `#F4C430` (Egyptian gold) - magical, luminous
- **Secondary:** `#0EA5E9` (Red Sea blue) - clear water, NOT greenish
- **Accent:** `#06B6D4` (vibrant cyan-blue)
- **Background:** `#F5F1E8` (limestone cream)

### Badge Semantic Variants (WCAG AA 7.2-9.1:1 contrast)

- **Skill:** Warm amber/gold (`#FEF3C7` bg, `#78350F` text, `#F59E0B` border)
- **Category:** Sky blue (`#DBEAFE` bg, `#0C4A6E` text, `#0EA5E9` border)
- **Status:** Emerald green (`#D1FAE5` bg, `#065F46` text, `#10B981` border)

### Typography Scale

- **Display:** Space Grotesk (48-64px, hero headers only)
- **Headings:** Inter (16-40px, content-first scale)
- **Body:** Inter (14-18px, 120% line-height)

### Spacing System (Fibonacci)

`spacing-xs/sm/md/lg/xl/2xl/3xl` → `4/8/16/24/40/64/104px`

---

## Case Studies

### Statsbomb Real-Time Data Collection (2018-2022)

**Live:** [/portfolio/statsbomb](https://saadshahd.github.io/portfolio/statsbomb)

**Tech:** XState state machines, ANTLR grammar, Kafka, GraphQL, functional architecture

**Impact:**
- 16 hours → 4 hours collection time (75% reduction)
- 100 → 1000+ concurrent collectors (10x scale)
- Zero engineering bottleneck for new sports expansion

**Architecture Highlights:**
- "Don't validate, prevent" - illegal states unrepresentable
- DSL for behavioral rules (separating logic from execution)
- Metadata-driven UI generation (contextual keyboards, 30+ shortcuts)

### Wise Editorial Platform (Current)

**Status:** Work in Progress - documentation placeholder

---

## Documentation

| Document | Purpose |
|----------|---------|
| **[docs/plans/](./docs/plans/)** | 12 design documents with architectural reasoning |
| **[docs/feedback/](./docs/feedback/)** | Simon (Wise), Adham (Statsbomb) feedback integration |
| **[CLAUDE.md](./CLAUDE.md)** | Design system, component API, accessibility rules |

---

## Performance

| Metric | Target | Actual |
|--------|--------|--------|
| Load time | <3s | ✅ 2.1s (GitHub Pages) |
| Lighthouse | 90+ | ✅ 96 Performance, 100 Accessibility |
| Bundle size | Minimal | Motion One 5KB, no React overhead |

---

## Accessibility

- ✅ WCAG AA compliance minimum (4.5:1 contrast)
- ✅ WCAG AAA for node backgrounds (7:1+ contrast)
- ✅ `prefers-reduced-motion` respected (all animations disabled)
- ✅ ARIA labels for PhotoSwipe image viewer
- ✅ Keyboard navigation throughout
- ✅ Semantic HTML (`<nav>`, `<main>`, `<article>`)

---

## Deployment

**Platform:** GitHub Pages
**Workflow:** `.github/workflows/deploy.yml`
**Trigger:** Push to `main` branch
**Build:** Astro static site generation
**URL:** https://saadshahd.github.io

### Deploy Your Own

1. Fork repository
2. Enable GitHub Pages in Settings → Pages → Source: GitHub Actions
3. Push to `main` - workflow runs automatically
4. Site live at `https://[username].github.io`

---

## Story Points (Not Time Estimates)

Why story points? Time lies. AI acceleration unpredictable. Complexity is stable.

**Reference scale:**
- 1 point: Trivial (rename, config change)
- 3 points: Simple (CRUD, basic feature)
- 5 points: Standard (integration, business logic)
- 8 points: Complex (architecture decision, cross-cutting)
- 13+ points: Too big, decompose first

**Examples from this project:**
- Responsive design system: 8 points (cross-cutting architecture)
- Diagram design system: 6 points (new visual taxonomy)
- Callout with optional CTA slot: 3 points (composition pattern)
- Scroll progress redesign: 3 points (mobile/desktop variants)

---

## Git History Transparency

**Commit style:** Descriptive, imperative mood, contextual reasoning

**What you'll see:**
- Clean narrative arc (debugging commits squashed)
- Story point estimates in commit messages
- Design document commits alongside implementation
- Feedback integration visible (Simon, Adham references)
- Atomic migrations ("Apply semantic variants to 15 existing accordions")

**What you won't see:**
- WIP commits, "fix typo", "asdf" messages
- Commented-out code or TODO comments
- Multiple API versions (`getUserV2`) - atomic migrations only

**Backup branch:** `backup-before-rebase-20251031` (if you want to see raw iteration)

---

## License

Personal portfolio - all rights reserved.

---

## Contact

**Email:** [dev.saad.shahd@gmail.com](mailto:dev.saad.shahd@gmail.com)
**LinkedIn:** [linkedin.com/in/saadshahd](https://linkedin.com/in/saadshahd)
**GitHub:** [@saadshahd](https://github.com/saadshahd)

---

**Built with Claude Code** - demonstrating AI-native development practices through production-quality architecture.
