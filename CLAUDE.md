# Portfolio Site - Project Instructions

## Project Overview

**What**: Personal portfolio for Egyptian Principal Engineer specializing in functional architecture and production systems
**Tech**: Astro v5, Bun, Tailwind v4, Motion One, Egyptian geometric design system (pyramids, water patterns)
**Audience**: Technical recruiters, engineering leaders, and senior engineers seeking production-proven depth
**Goal**: Content-first showcase with subtle heritage-inspired animations (never theatrical, always purposeful)

---

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

**Badge Semantic Colors** (WCAG AA compliant, 7.2-9.1:1 contrast):

- Skill: `#FEF3C7` bg / `#78350F` text / `#F59E0B` border (warm amber/gold)
- Category: `#DBEAFE` bg / `#0C4A6E` text / `#0EA5E9` border (sky blue)
- Status: `#D1FAE5` bg / `#065F46` text / `#10B981` border (emerald green)

### Egyptian Pattern Components

**Purpose**: Heritage-inspired geometric patterns as subtle content backdrop (never theatrical)
**Location**: `src/components/patterns/` (PyramidGrid.astro, WaterFlow.astro)
**Demo**: `/patterns-demo` route

**Usage Rules** (CRITICAL):

1. **Desktop**: Bold animations (scale, flow, reveal) with Egyptian easings
2. **Mobile**: Static or CSS-only (opacity 0.04, scale 0.7, no animation)
3. **Accessibility**: ALWAYS respect `prefers-reduced-motion` (disable animations)
4. **Positioning**: `fixed inset-0 z-0` (full-screen behind content)
5. **Semantic**: `aria-hidden="true"` + `pointer-events: none` (decorative only)
6. **Visual Constraint**: Opacity 0.08-0.25, max 2-3 elements per pattern (elegant minimalism)

**When to Use**:
- Hero sections (PyramidGrid with staggered fade-in)
- Page backgrounds (WaterFlow with scroll-linked opacity)
- Never in body content (distracts from reading)

**Implementation Details**: See component source files and Astrobook stories for SVG paths, animation specs, and variants.

### Animation Decision Tree

**Philosophy**: Bold storytelling on entry, never distract during reading, always respect motion preferences

**Decision Framework**:

1. **Is this a decorative pattern** (PyramidGrid/WaterFlow)?
   - Yes → Use pattern component (desktop only, check `prefersReducedMotion()`)
   - No → Continue to step 2

2. **Is this the hero section?**
   - Yes → Staggered text reveal (0.6s delay, 0.15s stagger, `egyptianEasing.water`)
   - No → Continue to step 3

3. **Is this an element entering viewport?**
   - Yes → InView trigger (30% threshold, 0.6-0.8s duration, Egyptian easing)
   - No → Continue to step 4

4. **Is this interactive feedback** (hover/focus)?
   - Yes → CSS transition only (0.2s, no Motion One)
   - No → **Don't animate** (body content should never animate mid-read)

**All Animations MUST**:
- Check `prefersReducedMotion()` first (apply final state instantly if true)
- Use TypeScript types from Motion One (`DOMKeyframesDefinition`, `AnimationOptions`)
- Apply Egyptian easings from design system (`egyptianEasing.water/pyramid/monument`)
- Duration in seconds (0.8) NOT milliseconds (800)

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

**Typography Breaks**: Use `<wbr>` for long technical terms (e.g., `Statsbomb<wbr>DataCollection<wbr>Pipeline`) and `text-wrap: balance` for headlines

**Every Sentence Must**: Teach principle, reveal decision, or show impact

**Forbidden**: Hype trends, performative jargon, tutorial-only content, condescension

**Clarity**: Write for "intelligent curious person" - explain complexity simply, consistent depth for all

### Reader Goals (Priority Order)

1. Trust (battle-tested experience)
2. Learning (deeper systems thinking)
3. Practical (applicable patterns)
4. Respect (demonstrated technical depth)

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
- [ ] Questions open major sections (Socratic authority)
- [ ] Collaborative framing ("we", "teams", no "I did X" heroics)
- [ ] Philosophical systems thinking present
- [ ] Humble learning visible ("still exploring", "lesson learned")
- [ ] No bold/arrogant claims
- [ ] CTAs are invitational, not commanding

---

## Copy Tone Guidelines

**Core Tone:** Philosophical + Humble + Collaborative Confidence

**Never:** Bold, arrogant, or individual hero narrative

### Tone Principles

**✅ ALWAYS Use:**

1. **Question-led authority** (Socratic confidence without claiming answers)
   - "How do you collect 90-minute matches without choosing between velocity and correctness?"
   - "What if systems couldn't break by design?"
   - "How do 20 teams collaborate without friction or incorrectness?"

2. **Collaborative framing** (team/collective credit, not individual genius)
   - "We reduced collection from 16 hours to 4 concurrent collectors"
   - "Working in high-velocity environments revealed they're complementary"
   - "When teams chase the right questions first, architecture emerges"

3. **Philosophical systems thinking** (abstract principles, constraints, architecture)
   - "Architecture shapes possibility"
   - "Reliability stops being aspirational—it becomes structural"
   - "Architectural separation eliminates trade-offs that feel inevitable"

4. **Humble learning orientation** (ongoing exploration, lessons from experience)
   - "Still exploring what's possible"
   - "Lesson learned: architectural separation..."
   - "Over 15 years, a pattern revealed itself"
   - "Patterns emerged through production bugs"

5. **Evidence-based confidence** (proven through production, not claims)
   - "15 years", "production systems", "at Instabug, Statsbomb, and Wise"
   - Metrics in service of learning, not bragging

**❌ NEVER Use:**

1. **Bold/arrogant claims**
   - ❌ "I build systems that can't break"
   - ❌ "I solved content collaboration at scale"
   - ❌ "I cut 90-minute match collection..." (individual hero)

2. **First-person hero narrative**
   - ❌ "I designed", "I implemented", "I achieved" (without collaborative context)
   - ❌ "My system", "My architecture" (implies sole ownership)

3. **Command language in CTAs**
   - ❌ "See What I've Built" → ✅ "Explore My Work"
   - ❌ "Get in Touch" → ✅ "Start a Conversation"
   - ❌ "View Full Resume" → ✅ "Full Background"

4. **Definitive statements without humility**
   - ❌ "The right question makes implementation obvious"
   - ✅ "Curious about the 'why' first—it often reveals the 'how'"

5. **Claiming perfection or absolute mastery**
   - ❌ "I've mastered functional programming"
   - ❌ "My approach eliminates all bugs"

### Copy Pattern Template

**Core Formula**: Question-led opening + collaborative framing + humble uncertainty

| Context | ❌ Avoid | ✅ Use |
|---------|---------|--------|
| **Introducing work** | "I built editorial infrastructure for Wise" | "At Wise, we're solving content collaboration for 20 teams" |
| **Describing results** | "I reduced collection time by 75%" | "We reduced collection from 16 hours to 4 concurrent collectors" |
| **Sharing insights** | "I proved velocity and correctness aren't trade-offs" | "Working in high-velocity environments revealed they're complementary" |
| **CTAs** | "See My Work" / "Hire Me" | "Explore My Work" / "Start a Conversation" |

**Approved Hero Section Example**:
- **Headline**: "What if systems couldn't break by design?" (Socratic question)
- **Value Prop**: "Over 15 years, patterns emerged from production systems: when you separate behavior from state and make illegal states unrepresentable, reliability stops being aspirational—it becomes structural. Exploring what's possible when architecture shapes correctness." (passive discovery, humble ongoing learning)

**Tone Audit Checklist** (all must be "yes" before publishing):
- [ ] Question-led? (Major sections open with Socratic questions)
- [ ] Collaborative? (Achievements credited to teams, not individual)
- [ ] Philosophical? (Systems thinking and first principles visible)
- [ ] Humble? (Ongoing learning acknowledged: "still exploring", "lesson learned")
- [ ] Evidence-based? (Confidence from proven work: years, companies, metrics)
- [ ] No arrogance? (Zero "I build X" claims without collaborative context)
- [ ] Invitational CTAs? (Collaborative "Explore"/"Discuss", not commanding)

---

## Content Structure

**Homepage**: Intro (Building realtime systems through functional architecture), 2-3 case studies, blog preview, CTA
**Portfolio**: 3-5 case studies (Problem→Architecture→Impact→Lessons), 2000-3000w + diagrams
**Blog**: Monthly technical articles, start with "Real Time Data Collection System"
**About**: Bio 200-300w, expertise, highlights, headshot
**Resume**: PDF + HTML version
**Contact**: Email, LinkedIn, GitHub, optional form

---

## Success Criteria

**Week 1-2**: Live, one animation, responsive, placeholder content, <3s load
**Week 3-4**: First case study (Statsbomb), bio, resume, contact
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

### Motion One Animation Requirements

**Library**: Motion One (`motion` package) - Framework-agnostic, 5KB, Web Animations API wrapper
**Documentation**: https://motion.dev

**Project-Specific Requirements**:

1. ✅ **Type Safety**: Always import TypeScript types (`DOMKeyframesDefinition`, `AnimationOptions`, `ScrollOptions`, `InViewOptions`)
2. ✅ **Transform Properties**: Use individual properties (`x`, `y`, `scale`, `rotate`) - NEVER `transform` strings
3. ✅ **Duration Format**: Seconds (0.8) NOT milliseconds (800)
4. ✅ **Accessibility**: Check `prefersReducedMotion()` before ALL animations - apply final state instantly if true
5. ❌ **FORBIDDEN**: `as any` type casts (bypasses type safety), `transform: "translateY(30px)"` strings

**Egyptian Design System Easings** (see `src/utils/animations.ts`):
- `egyptianEasing.water` - `[0.65, 0, 0.35, 1]` (flowing, primary choice)
- `egyptianEasing.pyramid` - `[0.34, 1.56, 0.64, 1]` (sharp, emphasis)
- `egyptianEasing.monument` - `[0.76, 0, 0.24, 1]` (powerful, reveals)

**Example: Type-Safe Animation with Accessibility**

```typescript
import { animate, stagger } from "motion";
import type { DOMKeyframesDefinition, AnimationOptions } from "motion";
import { egyptianEasing, prefersReducedMotion } from "@/utils/animations";

if (!prefersReducedMotion()) {
  const keyframes: DOMKeyframesDefinition = { opacity: [0, 1], y: [30, 0] };
  const options: AnimationOptions = {
    duration: 0.8,
    ease: egyptianEasing.water,
    delay: stagger(0.15, { startDelay: 0.6 })
  };
  animate(".hero-item", keyframes, options);
} else {
  // Apply final state instantly
  document.querySelectorAll(".hero-item").forEach(el => {
    (el as HTMLElement).style.opacity = "1";
  });
}
```

**Complete API Reference**: https://motion.dev/docs/animate

### Code Highlighting

**✅ Shiki** (https://shiki.style): Built into Astro

### Design System Documentation

**✅ Astrobook** (https://astrobook.pages.dev): Native Astro component playground
**Why:** Storybook CSF v3 compatible, zero React overhead, same dev server
**Location:** `/design-system` route with live component examples

---

## Design System (Single Source of Truth)

**Source**: All tokens defined in `src/styles/global.css` @theme block
**Documentation**: `/design-system` route (Astrobook integration)

### Egyptian Color Palette

**Brand Colors** (see earlier Egyptian Heritage Brand section):
- Primary: `#F4C430` (Egyptian gold)
- Secondary: `#0EA5E9` (Red Sea blue)
- Accent: `#06B6D4` (cyan-blue)
- Background: `#F5F1E8` (limestone cream)

**Badge Semantic Variants** (WCAG AA 7.2-9.1:1 contrast):
- `variant="skill"`: Warm amber/gold (`#FEF3C7` bg, `#78350F` text, `#F59E0B` border)
- `variant="category"`: Sky blue (`#DBEAFE` bg, `#0C4A6E` text, `#0EA5E9` border)
- `variant="status"`: Emerald green (`#D1FAE5` bg, `#065F46` text, `#10B981` border)

**Semantic Tokens** (use these in components):
- Text: `text-accent` (body), `text-accent-light` (secondary), `text-neutral` (muted)
- Backgrounds: `bg-primary`, `bg-secondary`, `bg-surface`, `bg-background`
- Borders: `border-accent`, `border-neutral`, `border-primary`

**Text Color Hierarchy** (WCAG AA compliance on white/surface backgrounds):
- `text-text` (`#0F172A`, 17.56:1) - Primary body text, headings
- `text-text-light` (`#1E293B`, 14.39:1) - Secondary text, subheadings
- `text-text-lighter` (`#475569`, 7.45:1 WCAG AAA) - **Tertiary text, muted content on Cards/surfaces, metadata**
- `text-text-navy` (`#0C4A6E`, 9.8:1 WCAG AAA) - Egyptian brand case study titles
- ❌ `text-neutral` (`#94A3B8`, 2.52:1) - **ONLY for borders/icons, NEVER for text**
- ❌ `text-neutral-light` (`#CBD5E1`, 1.8:1) - **ONLY for borders, NEVER for text**

**Critical Rule**: Always use `text-text-lighter` (NOT `text-neutral` or `text-neutral-light`) for muted text on Card components or any white/surface backgrounds. The `neutral` color tokens are designed exclusively for borders and visual elements, NOT for readable text.

### Typography Scale

**Display Scale** (Space Grotesk, hero headers only): `text-4xl/5xl` (48-64px)
**Content-First Scale** (all body/headings): `text-xs` to `text-3xl` (12-40px)
**Rationale**: Display for impact, content-first for readability at 120% line-height

**Heading Hierarchy:**
- `<Heading level={1}>` (h1): Display scale, hero only (48-64px)
- `<Heading level={2}>` (h2): Major section headings (32-40px)
- `<Heading level={3}>` (h3): Subsections (24-32px)
- `<Heading level={4}>` (h4): **Subsection details, technical breakdowns** (18-20px, semibold, `text-navy` for Egyptian brand coherence when used as case study subsections)
- `<Heading level={5}>` (h5): Tertiary headings if needed (16px)

### Spacing System

**Fibonacci Tokens**: `spacing-xs/sm/md/lg/xl/2xl/3xl` (4/8/16/24/40/64/104px)
**Tailwind Mapping**: `p-1/2/4/6/10/16/26` (same pixel values)

### Component-First Enforcement

✅ **ALWAYS use these components**:
```astro
<Button variant="primary" size="md" href="/portfolio">View Work</Button>
<Badge variant="skill">JavaScript</Badge>
<Card variant="default">Content</Card>
<Link href="/about">About</Link>
```

❌ **FORBIDDEN patterns**:
- Raw HTML: `<button>`, `<a>`, `<div>` with manual Tailwind classes
- Arbitrary colors: `text-gray-*`, `bg-[#...]`, `text-slate-*`
- Arbitrary sizes: `text-[22px]`, `p-[18px]`, `mb-13`

**Why**: Type-safe CVA variants prevent class drift, ensure WCAG AA compliance

### Pre-Commit Checklist (BLOCKING = must pass)

**BLOCKING**:
- [ ] All interactive elements meet WCAG AA contrast (4.5:1 minimum)
- [ ] All buttons/links use components (no raw `<button>`, `<a>`)
- [ ] Zero arbitrary colors/sizes outside design system

**REQUIRED**:
- [ ] Zero `text-gray-*`, `text-slate-*`, `bg-blue-*` classes
- [ ] Zero arbitrary spacing values outside Fibonacci sequence

**RECOMMENDED**:
- [ ] Component examples added to Astrobook stories (if new component)

### Responsive Design Note

Tailwind 4: Theme variables are global. Use responsive utility variants (`text-xl md:text-2xl`, `p-4 md:p-6`) in markup, not custom `@media` around tokens.

### Technical Diagrams

**Design System**: See `docs/plans/2025-10-30-diagram-design-system.md` for complete specifications
**CSS Variables**: Added to `src/styles/global.css` @theme block (lines 102-165)

**Quick Reference**:
- **Palette**: Blueprint Authority (limestone cream canvas, Egyptian gold/blue accents)
- **Node Types**: Atomic (amber), Derived (blue), System (emerald), Default (cream)
- **Typography**: Inter 14px titles, 12px labels, 11px annotations
- **Accessibility**: WCAG AA minimum (4.5:1 text), AAA for node backgrounds (7:1+)
- **Implementation**: Hybrid approach - Mermaid for standard flows, custom SVG for hero diagrams

**Mermaid classDef Standards** (copy-paste into diagrams):
```mermaid
classDef atomic fill:#FEF3C7,stroke:#F59E0B,stroke-width:2px,color:#78350F
classDef derived fill:#DBEAFE,stroke:#0EA5E9,stroke-width:2px,color:#0C4A6E
classDef system fill:#D1FAE5,stroke:#10B981,stroke-width:2px,color:#065F46
```

**Accessibility Requirements**:
- [ ] Wrap diagrams in `<figure>` with `<figcaption>` description
- [ ] Add `<details>` with text alternative for relationships
- [ ] Test with screen reader (VoiceOver, NVDA)
- [ ] Verify all text meets 4.5:1 contrast minimum
- [ ] Respect `prefers-reduced-motion` (disable animations)

---

## Done = Week 2: Shareable + animation + responsive | Month 1: Case study + bio/resume
