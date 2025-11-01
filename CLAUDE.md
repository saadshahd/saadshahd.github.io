# Portfolio Site - Project Instructions

## Project Overview

**What**: Personal portfolio for Egyptian Principal Engineer specializing in functional architecture and production systems
**Tech**: Astro v5, Bun, Tailwind v4, Motion One, Egyptian geometric design system
**Audience**: Engineering leaders, senior engineers seeking production-proven depth, Technical recruiters
**Goal**: Content-first showcase with subtle heritage-inspired animations (purposeful, never theatrical)

---

## Design Philosophy

**Persona**: Technical authority with taste
**Approach**: Content-first, animations enhance UX (never distract)

### Egyptian Heritage Brand

**Identity**: Egyptian engineer inspired by Nile, pyramids, Red Sea, 1973 water engineering
**Visual Metaphor**: Creative problem-solving through abstract geometric patterns
**Source of Truth**: `src/styles/global.css` @theme block

**Brand Colors**: Primary gold (`#F4C430`), Secondary blue (`#0EA5E9`), Accent cyan (`#06B6D4`), Background cream (`#F5F1E8`)

**Egyptian Patterns**: PyramidGrid/WaterFlow on homepage hero only. Desktop animations with `prefersReducedMotion()` check. See component files for usage.

---

## Content Style & Voice

**Voice**: Minimalist clarity - every word earns its place
**Tone**: Respectful depth - never condescend, never showboat
**Philosophy**: Production wisdom > trends, first principles > hype

### Core Formula

**Question-led + Collaborative + Humble**

1. **Question-led authority** - Socratic confidence without claiming answers

   - "How do you collect matches without choosing between velocity and correctness?"
   - "What if systems couldn't break by design?"

2. **Collaborative framing** - Team credit, not individual genius

   - "We reduced collection from 16 hours to 4 concurrent collectors"
   - "When teams chase the right questions first, architecture emerges"

3. **Philosophical systems thinking** - Abstract principles, constraints

   - "Architecture shapes possibility"
   - "Reliability stops being aspirational—it becomes structural"

4. **Humble learning orientation** - Ongoing exploration

   - "Still exploring what's possible"
   - "Over 15 years, patterns emerged from production bugs"

5. **Evidence-based confidence** - Proven through production
   - "15 years", "production systems", "at Instabug, Statsbomb, and Wise"

### Do/Don't Table

| Context            | ❌ Avoid                           | ✅ Use                                                           |
| ------------------ | ---------------------------------- | ---------------------------------------------------------------- |
| Introducing work   | "I built editorial infrastructure" | "At Wise, we're solving content collaboration for 20 teams"      |
| Describing results | "I reduced collection time by 75%" | "We reduced collection from 16 hours to 4 concurrent collectors" |
| CTAs               | "See My Work" / "Hire Me"          | "Explore My Work" / "Start a Conversation"                       |

### Writing Rules

**Sentence Rhythm** (Gary Provost): Vary length for musicality - short (punch), medium (flow), long (build to insight)
**Every Sentence Must**: Teach principle, reveal decision, or show impact
**Typography Breaks**: `<wbr>` for long technical terms, `text-wrap: balance` for headlines
**Forbidden**: Hype trends, performative jargon, tutorial-only content, condescension

### Case Study Patterns

**Layout**: TL;DR first (expandable `<details>`), reading metadata upfront, badges (category/status), side-by-side comparisons with border separators, Mermaid diagrams with `<figure>`/`<details>` text alternatives, metric cards with balanced character counts (±15% variance)

**Story Mechanics**: Origin as scene (week one partnership), problem as dialogue (collectors arguing), questions open sections ("How do you...?"), team attribution (name who built what), regret visible ("What I'd change"), italics for transitions, strong verbs (shipped/scaled, not implemented)

**Narrative Flow**: Prioritize narrative tension over chronology - weave technical depth into human story moments (witnessed failure before solution architecture)

**Photo Captions**:

- Individual: `<figcaption class="text-xs text-text-lighter mt-1 text-center italic">`
- Group: `<p class="text-xs text-text-light text-center italic -mt-2 mb-6">`
- Content: Context + year, explain what's shown

### Visual Balance

**Principle**: Grid items (cards, columns, comparisons) must balance character counts (±15% variance) to maintain visual rhythm

**Apply during editing passes** when visual rhythm breaks, not initial drafts. Count characters in descriptions, calculate variance (max - min) / avg, edit if > 20%.

### Pre-Publish Tone Audit

- [ ] Question-led? (Major sections open with Socratic questions)
- [ ] Collaborative? (Achievements credited to teams, not individual)
- [ ] Philosophical? (Systems thinking and first principles visible)
- [ ] Humble? (Ongoing learning: "still exploring", "lesson learned")
- [ ] Evidence-based? (Confidence from proven work: years, companies, metrics)
- [ ] Sentence rhythm varies (short/medium/long)
- [ ] No hype words (revolutionary, game-changing)
- [ ] Strong verbs (shipped/scaled, not implemented)

---

## Design System

**Source**: `src/styles/global.css` @theme block, component files in `src/components/`

### Critical Rules

**Text Color Hierarchy** (WCAG AA compliance):

- `text-text` (primary body), `text-text-light` (secondary), `text-text-lighter` (muted on surfaces)
- **NEVER use `text-neutral` for readable text** (border-only color, fails WCAG AA at 2.52:1)

**Component-First**: Use Button, Badge, Card, Callout, Heading, Body, Link for all UI
**Exception**: Raw HTML + Tailwind acceptable for custom layouts not covered by design system (photo grids, multi-column comparisons)

### Component Composition Pattern

**Principle**: Extend existing components via composition, not duplication
**Example**: CalloutCTA wraps Callout, inheriting all variants (44 lines vs 119 lines)
**Type-safe approach**: Use `ComponentProps<typeof BaseComponent>` for props inheritance
**When to use**: Adding features to existing components (CTA slots, optional sections)

### Badge Semantic Variants (WCAG AA 7.2-9.1:1 contrast)

- `variant="skill"`: Warm amber/gold (`#FEF3C7` bg, `#78350F` text, `#F59E0B` border)
- `variant="category"`: Sky blue (`#DBEAFE` bg, `#0C4A6E` text, `#0EA5E9` border)
- `variant="status"`: Emerald green (`#D1FAE5` bg, `#065F46` text, `#10B981` border)

### Pre-Commit Blockers

**BLOCKING** (must pass):

- [ ] All interactive elements meet WCAG AA contrast (4.5:1 minimum)
- [ ] All buttons/links use components (no raw `<button>`, `<a>`)
- [ ] Zero arbitrary colors outside design system (`text-gray-*`, `bg-[#...]`)
- [ ] Text color correct: `text-text-lighter` for muted text, NEVER `text-neutral`

### Technical Diagrams

**Design System**: See `docs/plans/2025-10-30-diagram-design-system.md` for complete specs
**Mermaid classDef** (copy-paste):

```mermaid
classDef atomic fill:#FEF3C7,stroke:#F59E0B,stroke-width:2px,color:#78350F
classDef derived fill:#DBEAFE,stroke:#0EA5E9,stroke-width:2px,color:#0C4A6E
classDef system fill:#D1FAE5,stroke:#10B981,stroke-width:2px,color:#065F46
```

**Accessibility**: Wrap diagrams in `<figure>` + `<figcaption>`, add `<details>` text alternative, test with screen reader, verify 4.5:1 contrast, respect `prefers-reduced-motion`

---

## Tech Stack

**Core**: Astro v5, Bun, Tailwind v4, Motion One, GitHub Pages
**Animation**: Motion One via `@/utils/animations` (egyptianEasing, prefersReducedMotion)
**Code highlighting**: Shiki (built into Astro)
**Forbidden**: Framer Motion (React-only), anime.js (removed), complex build systems

### Animation Requirements

**Use Motion One via `@/utils/animations`** - import egyptianEasing, prefersReducedMotion
**Type safety**: Import `DOMKeyframesDefinition`, `AnimationOptions` from `motion`
**Always check `prefersReducedMotion()`** before animating (apply final state instantly if true)
**Duration**: Seconds (0.8) NOT milliseconds (800)
**Transforms**: Use `x`, `y`, `scale`, `rotate` (NEVER `transform` strings)

---

## Workflow Patterns

### Design Document Practice

**When**: Before changes >3 story points or introducing new components
**Structure**: Problem (with line refs) → Decision (with confidence %) → Implementation → Reversibility
**Location**: `docs/plans/YYYY-MM-DD-feature-name.md`
**Why**: Prevents scope creep, documents decisions, enables future refactoring

### Story-First Restructure

**Principle**: Narrative tension over chronology - weave technical into human moments
**Example**: Real-Time Test (2am debugging) placed BEFORE Architecture section (not after) to ground technical decisions in witnessed failure
**Pattern**: Origins (human) → Problem (friction) → Witnessing (failure) → Solution (architecture) → Epilogue → Impact (metrics) → Lessons (principles)

---

## Content Structure

**Homepage**: Intro (question-led value prop), 2-3 case studies, blog preview, CTA
**Portfolio**: 3-5 case studies (Problem Story→Architecture→Impact→Lessons), 2000-3000w + diagrams/vsiual minimally as needed to increase clarity without competing with the story and the narrative
**About**: Bio 200-300w, expertise, highlights, headshot
**Resume**: PDF + HTML version
**Contact**: Email, LinkedIn, GitHub

---

## Project Status: ✅ Launched (2025-10-31)

**Live**: 2.1s load time, WCAG AA compliant, fully responsive
**Content**: Statsbomb case study (25-min read, 6 sections), bio, resume, contact
**Components**: 30+ design system composoble patterns
**Documentation**: 12 design docs in `docs/plans/`

### Next: Content Expansion

**Priority 1**: Blog infrastructure (template, RSS feed)
**Priority 2**: Additional case studies (Wise Editorial Platform, Instabug highlights)
**Priority 3**: SEO (meta descriptions, structured data, sitemap)
