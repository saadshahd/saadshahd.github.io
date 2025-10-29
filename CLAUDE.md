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

**Badge Semantic Colors** (WCAG AA compliant, 7.2-9.1:1 contrast):

- Skill: `#FEF3C7` bg / `#78350F` text / `#F59E0B` border (warm amber/gold)
- Category: `#DBEAFE` bg / `#0C4A6E` text / `#0EA5E9` border (sky blue)
- Status: `#D1FAE5` bg / `#065F46` text / `#10B981` border (emerald green)

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

### Approved Copy Examples

Use these as templates for new content:

#### Hero Section (Homepage)

**Headline:**
"What if systems couldn't break by design?"

**Value Proposition:**
"Over 15 years, patterns emerged from production systems: when you separate behavior from state and make illegal states unrepresentable, reliability stops being aspirational—it becomes structural. Exploring what's possible when architecture shapes correctness."

**CTAs:**
- "Explore My Work" (invitational)
- "Start a Conversation" (collaborative)

**Why this works:**
- Question opens with Socratic authority
- "Patterns emerged" = passive discovery (not "I discovered")
- "Exploring what's possible" = humble ongoing learning
- CTAs invite partnership, not transactions

#### Case Study Descriptions (Portfolio)

**Opening:**
"How do you collect 90-minute matches without choosing between velocity and correctness?"

**Body:**
"We reduced collection from 16 man-hours to 4 concurrent collectors by building a DSL that let PMs define sports rules without engineering involvement. The architecture separated collection rules from execution logic—new sports became configuration, not code."

**Closing:**
"Lesson learned: architectural separation eliminates trade-offs that feel inevitable."

**Why this works:**
- Socratic question implies deep problem understanding
- "We reduced" = collaborative (not "I cut")
- "let PMs" = team enablement
- "Lesson learned" = humble reflection
- Philosophical insight about false trade-offs

#### About Page

**Opening:**
"Over 15 years, a pattern revealed itself: systems fail when we optimize for 'how' before understanding 'why.' When teams chase the right questions first, architecture emerges from constraints."

**Current Work:**
"At Wise, we're solving content collaboration for 20 teams at scale. Building editorial infrastructure that handles global→local fintech tension—regulations collide with cultural nuances, offerings vary by market. The problem space is architectural: how do we maintain coherence and developer experience when constraints multiply?"

**Philosophy:**
"Functional programming principles emerged through production bugs at Instabug, Statsbomb, and Wise. Traditional thinking treats velocity and correctness as opposing forces. Working in high-velocity environments revealed they're complementary: when you separate behavior from state and make illegal states unrepresentable, both increase together. Still learning what's possible when architecture constrains failure."

**Closing:**
"Curious about the 'why' first—it often reveals the 'how.'"

**Why this works:**
- "Pattern revealed itself" = passive discovery (humble)
- "We're solving" = collaborative present tense
- Question closes with Socratic authority
- "Still learning" = ongoing humble exploration
- "Often reveals" = acknowledges uncertainty (not "always")

### Tone Audit Process

When writing new copy, audit against these questions:

1. **Question-led?** Do major sections open with Socratic questions?
2. **Collaborative?** Are achievements credited to teams/environments, not individual?
3. **Philosophical?** Is systems thinking and first principles depth visible?
4. **Humble?** Is ongoing learning acknowledged ("still exploring", "lesson learned")?
5. **Evidence-based?** Is confidence from proven work (years, companies, metrics)?
6. **No arrogance?** Zero "I build X" claims without collaborative context?
7. **Invitational CTAs?** Are buttons collaborative ("Explore", "Discuss") not commanding?

If any answer is "no", rewrite before publishing.

### Common Copy Patterns

**Introducing work:**
- ❌ "I built editorial infrastructure for Wise"
- ✅ "At Wise, we're solving content collaboration for 20 teams"

**Describing results:**
- ❌ "I reduced collection time by 75%"
- ✅ "We reduced collection from 16 hours to 4 concurrent collectors"

**Sharing insights:**
- ❌ "I proved that velocity and correctness aren't trade-offs"
- ✅ "Working in high-velocity environments revealed they're complementary"

**Closing statements:**
- ❌ "I optimize for the 'why' first"
- ✅ "Curious about the 'why' first—it often reveals the 'how'"

**CTAs:**
- ❌ "See My Work" / "Hire Me"
- ✅ "Explore My Work" / "Start a Conversation"

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

### Motion One Idiomatic Usage Rules

**CRITICAL:** Motion One is the core animation library. ALL animations must follow these type-safe patterns to prevent runtime bugs and maintain code quality.

#### Type Safety Requirements

**✅ ALWAYS import proper TypeScript types:**

```typescript
import { animate, scroll, inView, stagger } from "motion";
import type {
  DOMKeyframesDefinition,
  AnimationOptions,
  ScrollOptions,
  InViewOptions,
} from "motion";
```

**❌ NEVER use `as any` to bypass types:**

```typescript
// ❌ FORBIDDEN - Type evasion
animate(el, { x: 100 } as any, { duration: 1 } as any);

// ✅ REQUIRED - Proper typing
const keyframes: DOMKeyframesDefinition = { x: 100 };
const options: AnimationOptions = { duration: 1 };
animate(el, keyframes, options);
```

**Why:** TypeScript catches animation bugs at compile time. Runtime animation failures are expensive to debug.

#### Transform Properties

**✅ ALWAYS use individual transform properties:**

- `x`, `y` - Translate X/Y axis (numbers in pixels)
- `scale` - Scale transform (number, 1 = 100%)
- `rotate` - Rotation (number in degrees)
- `opacity` - Opacity (0 to 1)

**❌ NEVER use `transform` string property:**

```typescript
// ❌ FORBIDDEN - Transform strings
{ transform: "translateY(30px)" }
{ transform: "scale(1.2) rotate(45deg)" }

// ✅ REQUIRED - Individual properties
{ y: 30 }
{ scale: 1.2, rotate: 45 }
```

**Why:** Motion One optimizes individual properties for GPU acceleration. String transforms bypass these optimizations and break type safety.

#### Keyframes Syntax

**✅ Two valid keyframes formats:**

**1. Object with arrays (most common):**

```typescript
const keyframes: DOMKeyframesDefinition = {
  opacity: [0, 1], // From 0 to 1
  y: [40, 0], // From 40px to 0
  scale: [0.9, 1], // From 0.9 to 1
};
```

**2. Array of objects (for complex timing):**

```typescript
const keyframes: DOMKeyframesDefinition = [
  { opacity: 0, y: 40 }, // Start state
  { opacity: 1, y: 0 }, // End state
];
```

**❌ FORBIDDEN patterns:**

```typescript
{ transform: [...] }         // String transforms
{ translateY: [...] }        // Non-existent property
```

#### Animation Options

**✅ All AnimationOptions properties (all optional):**

```typescript
const options: AnimationOptions = {
  duration: 0.8, // Seconds (NOT milliseconds)
  delay: 0.2, // Seconds
  ease: [0.65, 0, 0.35, 1], // Cubic bezier array OR string
  repeat: 3, // Number of repeats
  direction: "alternate", // 'normal' | 'reverse' | 'alternate'
  endDelay: 0.1, // Delay after animation
};
```

**Common easing values:**

- Cubic bezier array: `[x1, y1, x2, y2]` (e.g., `[0.65, 0, 0.35, 1]`)
- String presets: `"linear"`, `"ease-in"`, `"ease-out"`, `"ease-in-out"`

**Egyptian Design System Easings** (from `src/utils/animations.ts`):

```typescript
import { egyptianEasing } from "@/utils/animations";

{
  ease: egyptianEasing.water; // [0.65, 0, 0.35, 1] - Flowing
  ease: egyptianEasing.pyramid; // [0.34, 1.56, 0.64, 1] - Sharp
  ease: egyptianEasing.monument; // [0.76, 0, 0.24, 1] - Powerful
}
```

#### Stagger Usage

**✅ Proper stagger with delay function:**

```typescript
import { stagger } from "motion";

const options: AnimationOptions = {
  duration: 0.8,
  delay: stagger(0.15), // 150ms between elements
  // OR with options:
  delay: stagger(0.15, {
    startDelay: 0.6, // Initial delay before stagger
    from: "first", // 'first' | 'last' | 'center' | number
  }),
};
```

**Why:** Stagger creates sequential animations across multiple elements (e.g., hero text lines appearing one after another).

#### Scroll-Linked Animations

**✅ Proper scroll() API usage:**

```typescript
import { scroll, animate } from "motion";
import type { ScrollOptions, DOMKeyframesDefinition } from "motion";

const keyframes: DOMKeyframesDefinition = {
  opacity: [0, 1],
  y: [100, 0],
};

const scrollOptions: ScrollOptions = {
  target: document.documentElement, // Element to track scroll
  offset: ["start end", "end start"], // Intersection points
};

// Pass animation controls to scroll()
scroll(animate(element, keyframes), scrollOptions);
```

**Common offset patterns:**

- `['start start', 'end end']` - Full document scroll (0% to 100%)
- `['start end', 'end start']` - Element entering/leaving viewport
- `['start center', 'end center']` - Element centered in viewport

**Why:** `scroll()` wraps an animation and links it to scroll position instead of time.

#### InView (Intersection Observer)

**✅ Proper inView() API usage:**

```typescript
import { inView, animate } from "motion";
import type {
  InViewOptions,
  DOMKeyframesDefinition,
  AnimationOptions,
} from "motion";

const inViewOptions: InViewOptions = {
  amount: 0.3, // Trigger when 30% visible (0 to 1)
  margin: "0px 0px -100px 0px", // Optional margin (like CSS)
};

inView(
  element,
  (entry) => {
    const keyframes: DOMKeyframesDefinition = { opacity: [0, 1], y: [40, 0] };
    const options: AnimationOptions = {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1],
    };

    animate(element, keyframes, options);
  },
  inViewOptions
);
```

**amount values:**

- `0` - Trigger as soon as any part enters viewport
- `0.5` - Trigger when 50% visible
- `1` - Trigger only when fully visible
- `"some"` - At least one pixel visible
- `"all"` - Entire element visible

**Why:** InView triggers animations when elements scroll into view, better UX than animating everything on page load.

#### Return Value: AnimationPlaybackControls

**✅ All animate() calls return playback controls:**

```typescript
const controls = animate(element, keyframes, options);

// Available methods:
controls.play(); // Resume animation
controls.pause(); // Pause animation
controls.stop(); // Stop and reset
controls.cancel(); // Cancel animation
controls.finish(); // Jump to end state

// Promise for animation completion:
await controls.finished; // Resolves when animation completes
```

**Common pattern for chained animations:**

```typescript
await animate(el, { opacity: [0, 1] }, { duration: 0.3 }).finished;
await animate(el, { y: [0, -20] }, { duration: 0.2 }).finished;
// Second animation starts after first completes
```

#### SVG Animations

**✅ SVG-specific properties (camelCase in keyframes):**

```typescript
const svgKeyframes: DOMKeyframesDefinition = {
  strokeDashoffset: [1000, 0], // SVG stroke animation
  strokeDasharray: [100, 200], // Dash pattern
  fill: ["#F4C430", "#0EA5E9"], // Fill color
  stroke: ["#0EA5E9", "#06B6D4"], // Stroke color
};
```

**Why:** Motion One handles SVG attribute updates automatically with proper camelCase property names.

#### Accessibility: prefers-reduced-motion

**✅ ALWAYS respect motion preferences:**

```typescript
import { prefersReducedMotion } from "@/utils/animations";

if (prefersReducedMotion()) {
  // Apply final state instantly without animation
  element.style.opacity = "1";
  element.style.transform = "translateY(0)";
} else {
  // Animate normally
  animate(element, keyframes, options);
}
```

**Why:** Users with vestibular disorders need reduced motion. Ignoring this preference violates WCAG 2.1 Level AA (Success Criterion 2.3.3).

#### Code Examples

**✅ Complete type-safe animation example:**

```typescript
import { animate, stagger } from "motion";
import type { DOMKeyframesDefinition, AnimationOptions } from "motion";
import { egyptianEasing, prefersReducedMotion } from "@/utils/animations";

function animateHero() {
  if (prefersReducedMotion()) {
    document.querySelectorAll(".hero-item").forEach((el) => {
      (el as HTMLElement).style.opacity = "1";
    });
    return;
  }

  const keyframes: DOMKeyframesDefinition = {
    opacity: [0, 1],
    y: [30, 0],
  };

  const options: AnimationOptions = {
    duration: 0.8,
    ease: egyptianEasing.water,
    delay: stagger(0.15, { startDelay: 0.6 }),
  };

  animate(".hero-item", keyframes, options);
}
```

**✅ Scroll-linked animation example:**

```typescript
import { scroll, animate } from "motion";
import type { DOMKeyframesDefinition, ScrollOptions } from "motion";

const progressBar = document.querySelector(".scroll-progress");

const keyframes: DOMKeyframesDefinition = {
  scaleX: [0, 1],
};

const scrollOptions: ScrollOptions = {
  target: document.documentElement,
  offset: ["start start", "end end"],
};

scroll(animate(progressBar, keyframes), scrollOptions);
```

**✅ InView reveal animation example:**

```typescript
import { inView, animate } from "motion";
import type {
  InViewOptions,
  DOMKeyframesDefinition,
  AnimationOptions,
} from "motion";

const inViewOptions: InViewOptions = { amount: 0.3 };

document.querySelectorAll(".reveal").forEach((element) => {
  inView(
    element,
    () => {
      const keyframes: DOMKeyframesDefinition = { opacity: [0, 1], y: [40, 0] };
      const options: AnimationOptions = {
        duration: 0.6,
        ease: [0.65, 0, 0.35, 1],
      };

      animate(element, keyframes, options);
    },
    inViewOptions
  );
});
```

#### Pre-Animation Checklist

Before writing ANY Motion One animation code:

- [ ] Imported proper TypeScript types (`DOMKeyframesDefinition`, `AnimationOptions`, etc.)
- [ ] Used individual transform properties (`x`, `y`, `scale`, `rotate`) NOT `transform` strings
- [ ] Defined keyframes with proper type annotation
- [ ] Defined options with proper type annotation
- [ ] NO `as any` type casts anywhere
- [ ] Checked `prefersReducedMotion()` for accessibility
- [ ] Used Egyptian design system easings when appropriate
- [ ] Duration in SECONDS not milliseconds (0.8, not 800)

#### Common Mistakes to Avoid

**❌ FORBIDDEN patterns that will break at runtime:**

1. **Type evasion:**

   ```typescript
   animate(el, {...} as any, {...} as any)  // BREAKS TYPE SAFETY
   ```

2. **Transform strings:**

   ```typescript
   {
     transform: "translateY(30px)";
   } // USE: { y: 30 }
   ```

3. **Milliseconds instead of seconds:**

   ```typescript
   {
     duration: 800;
   } // USE: { duration: 0.8 }
   ```

4. **Wrong easing property name:**

   ```typescript
   { ease: [...] }                          // USE: { ease: [...] }
   ```

5. **Ignoring reduced motion:**
   ```typescript
   animate(...)  // Always run
   // SHOULD: Check prefersReducedMotion() first
   ```

**Enforcement:** Any PR with `as any` in animation code will be rejected. Fix types, don't evade them.

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
<!-- ✅ CORRECT - Button component -->
<Button variant="primary" size="md" href="/portfolio">View Work</Button>

<!-- ✅ CORRECT - Badge semantic variants -->
<Badge variant="skill">JavaScript</Badge>
<Badge variant="category">Backend</Badge>
<Badge variant="status">Production</Badge>

<!-- ❌ FORBIDDEN -->
<a href="/portfolio" class="px-6 py-3 bg-amber-500 text-slate-900 rounded-lg">View Work</a>
<span class="inline-flex px-3 py-1 bg-gray-100 text-gray-700 rounded-full">Manual Badge</span>
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

**✅ ALWAYS use:** Two-tier scale system (src/styles/global.css @theme)

**Display Scale** (Space Grotesk, hero headers only):
- `text-5xl` (64px) - Reserved for hero headers (Display component level 1)
- `text-4xl` (48px) - Large hero headlines (Display/Heading desktop)
- `text-3xl` (40px) - Sub-hero headlines

**Content-First Scale** (all body/headings):
- Headings: `text-3xl` (40px), `text-2xl` (32px), `text-xl` (24px), `text-lg` (20px)
- Body/UI: `text-base` (16px → 19.2px at 120%), `text-sm` (14px), `text-xs` (12px)
- Responsive: Use Tailwind utilities (e.g., `text-2xl md:text-3xl` for mobile→desktop scaling)

**❌ FORBIDDEN:** Arbitrary font sizes outside design system

- Arbitrary values `text-[22px]`, `text-[1.75rem]`, `text-[11px]`
- Random use of display scale in body content

**Why:** Display scale provides hero impact; content scale prioritizes readability for technical depth. Clear separation prevents theatrical sizes in body text while allowing bold hero statements.

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
