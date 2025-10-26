# Animation Registry & Reusable Component Strategy

**Version**: 1.2
**Last Updated**: 2025-10-26 (Week 3-4: SS Logo complete with AbortController pattern)
**Stack**: Motion One (motion.dev) + Astro v5 + Egyptian Design System

---

## 📋 Executive Summary

**Primary Recommendation (90% confidence)**: Build animation system with Motion One (5KB) instead of GSAP (50KB+). All analyzed Codrops demos use GSAP, but techniques translate cleanly to Motion One's declarative API.

**Complexity**: 19 story points total (10 points complete, 9 remaining)
**Timeline**: Week 1-2 ✅ → Week 3-4 (53% complete, 10/19 points) → Month 2+ (advanced)

**Key Principle**: Animations enhance, never distract. Egyptian geometric patterns provide visual rhythm without overwhelming technical content.

---

## 🎯 Animation Categories

### 1. **Hero Entrance Animations**
Geometric reveals for pyramid patterns and hero content.

**Techniques Learned**:
- SVG morphing (Codrops: Animate SVG Shapes on Scroll)
- Staggered reveals with golden ratio timing
- Fluid blob animations (optional, high complexity)

**Portfolio Application**:
```typescript
// src/components/patterns/PyramidGrid.astro
import { animate, stagger } from "motion";

const pyramids = document.querySelectorAll('.pyramid-element');

animate(
  pyramids,
  {
    opacity: [0, 0.12],
    scale: [0.8, 1],
    rotate: [15, 0]
  },
  {
    duration: 1.5,
    delay: stagger(0.2, { easing: "ease-out" })
  }
);
```

**Complexity**: 3 story points
**Priority**: Week 1-2

---

### 2. **Scroll-Triggered Reveals**
Content animates in as user scrolls (case studies, blog posts).

**Techniques Learned**:
- IntersectionObserver + Motion One `inView()`
- Staggered word/line reveals (Codrops: Stagger Reveal Animations for Text)
- Progressive disclosure (Layer 0: fade → Layer 1: slide + fade)

**Portfolio Application**:
```typescript
// Utility: src/utils/animations.ts
export function revealOnScroll(selector: string) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    inView(
      el,
      ({ target }) => {
        animate(
          target,
          { opacity: [0, 1], y: [40, 0] },
          { duration: 0.618, easing: [0.65, 0, 0.35, 1] }
        );
      },
      { amount: 0.3 } // Trigger when 30% visible
    );
  });
}
```

**Usage in Components**:
```astro
<!-- src/pages/portfolio/statsbomb.astro -->
<section class="case-study-section reveal-on-scroll">
  <h2>Architecture Decisions</h2>
  <p>Real-time data pipeline handling 10M+ events/day...</p>
</section>

<script>
  import { revealOnScroll } from '@/utils/animations';
  revealOnScroll('.reveal-on-scroll');
</script>
```

**Complexity**: 3 story points
**Priority**: Week 3-4

---

### 3. **Typography Animations**
Text reveals, highlights, and stagger effects for long-form reading.

**Techniques Learned**:
- Word-by-word reveals (Splitting.js pattern)
- Text highlighting on scroll (Codrops: OnScrollTextHighlight)
- Blur reveals (NOT RECOMMENDED - accessibility concerns)

**Reusable Components**:

#### A. Word Reveal (Headings)
```typescript
// src/utils/animations.ts
export function revealWords(selector: string) {
  const container = document.querySelector(selector);
  if (!container) return;

  // Split into words
  const text = container.textContent!;
  const words = text.split(' ');
  container.innerHTML = words
    .map(w => `<span class="word">${w}</span>`)
    .join(' ');

  const wordEls = container.querySelectorAll('.word');

  animate(
    wordEls,
    { opacity: [0, 1], y: [20, 0] },
    {
      duration: 0.6,
      delay: stagger(0.1),
      easing: "ease-out"
    }
  );
}
```

**CSS Styles**:
```css
/* src/styles/animations.css */
.word {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
}

/* Prevent layout shift */
.reveal-words {
  min-height: 1em;
}
```

#### B. Text Highlight (Emphasis)
```typescript
// Mark key phrases in Markdown with <mark>
// Animate as they enter viewport

export function highlightOnScroll() {
  const marks = document.querySelectorAll('mark');

  marks.forEach((mark) => {
    inView(
      mark,
      ({ target }) => {
        animate(
          target,
          {
            backgroundColor: [
              "rgba(244, 196, 48, 0)",    // Transparent
              "rgba(244, 196, 48, 0.3)"   // Egyptian gold 30%
            ],
            scaleX: [0, 1]
          },
          { duration: 0.8, easing: "ease-out" }
        );
      },
      { amount: 0.5 }
    );
  });
}
```

**Markdown Usage**:
```markdown
<!-- blog/realtime-data-collection.md -->
We chose PostgreSQL over MongoDB because ==ACID guarantees== were non-negotiable.
```

**Complexity**: 5 story points (includes text splitting logic)
**Priority**: Week 3-4

---

### 4. **Page Transitions**
Smooth transitions between pages using SVG path morphing.

**Techniques Learned**:
- SVG `<path>` `d` attribute animation (Codrops: SVG Path Page Transition)
- Bézier curve interpolation (rectangle → curve → filled)
- Astro View Transitions integration

**Implementation**:
```typescript
// src/components/PageTransition.astro
---
import { ViewTransitions } from 'astro:transitions';
---

<ViewTransitions />

<svg class="page-transition-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
  <path class="transition-path" d="M 0 0 L 100 0 L 100 0 L 0 0 Z" fill="var(--color-primary)" />
</svg>

<script>
  import { timeline } from "motion";

  const overlayPath = document.querySelector('.transition-path');

  // Egyptian wave paths (Nile metaphor)
  const paths = {
    unfilled: "M 0 0 L 100 0 L 100 0 L 0 0 Z",
    wave: "M 0 0 L 100 0 C 70 15, 30 15, 0 0 Z",
    filled: "M 0 0 L 100 0 L 100 100 L 0 100 Z"
  };

  document.addEventListener('astro:before-swap', async () => {
    await timeline([
      [overlayPath, { d: paths.wave }, { duration: 0.4, easing: [0.76, 0, 0.24, 1] }],
      [overlayPath, { d: paths.filled }, { duration: 0.3, at: 0.4 }]
    ]).finished;
  });

  document.addEventListener('astro:after-swap', () => {
    timeline([
      [overlayPath, { d: paths.wave }, { duration: 0.4 }],
      [overlayPath, { d: paths.unfilled }, { duration: 0.3, at: 0.4 }]
    ]);
  });
</script>

<style>
  .page-transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
  }
</style>
```

**SVG Path Design**:
- Use [SVG Path Editor](https://yqnn.github.io/svg-path-editor/) to craft Egyptian wave shapes
- Create pyramid outline → water wave → pyramid sequence
- Store paths in `/src/data/transitionPaths.ts`

**Complexity**: 8 story points (requires custom SVG path design)
**Priority**: Month 2

---

### 5. **Logo & Navigation Animations**

#### A. SS Logo Navigation Animation (Week 3-4) ✅
Inline logo in navigation that animates during View Transitions - water fills from bottom up like the Nile.

**Techniques Learned**:
- **Motion One declarative animations** - Sequential `animate()` calls instead of manual RAF
- **AbortController pattern** for clean listener lifecycle (Web Platform standard)
- Astro View Transitions API (`astro:before-preparation`, `astro:after-preparation`)
- SVG clipPath for water rising effect (bottom → top)
- Linear gradient for realistic water appearance (bright blue #0EA5E9)
- Fresh DOM references on every page load (prevents stale element bugs)

**Key Architecture Decision**:
Replace manual flag tracking with `AbortController` for idiomatic cleanup:
- ❌ **Old approach**: `let listenersAdded = false` guard + module-level state
- ✅ **New approach**: `AbortController` auto-cleanup + page-scoped state

**Implementation** (see `src/components/SSLogo.astro`):
```typescript
import { animate } from 'motion';

// Module-level controller for cleanup
let controller: AbortController | null = null;

function setupLogoAnimation() {
  // Clean up previous page's listeners
  if (controller) {
    controller.abort();
  }

  // Create new controller for this page
  controller = new AbortController();
  const { signal } = controller;

  // Always get fresh reference to DOM element
  const waterRect = document.getElementById('water-rect-logo');
  if (!waterRect) return;

  // Page-scoped animation state (recreated per page load)
  let isAnimating = false;
  let showTime = 0;

  // Add listeners with abort signal (auto-cleanup on next page load)
  document.addEventListener('astro:before-preparation', async () => {
    isAnimating = true;
    showTime = Date.now();

    // Reset and animate through 3 stages
    waterRect!.setAttribute('y', '120');
    waterRect!.setAttribute('height', '0');

    const easing = [0.65, 0, 0.35, 1];

    // Stage 1: 0% → 40%
    await animate(waterRect, { y: [120, 72], height: [0, 48] }, { duration: 0.2, easing }).finished;

    // Stage 2: 40% → 65%
    await animate(waterRect, { y: [72, 42], height: [48, 78] }, { duration: 0.2, easing }).finished;

    // Stage 3: 65% → 90%
    await animate(waterRect, { y: [42, 12], height: [78, 108] }, { duration: 0.2, easing }).finished;
  }, { signal });

  document.addEventListener('astro:after-preparation', async () => {
    // Complete to 100% then drain
    await animate(waterRect, { y: [12, 0], height: [108, 120] }, { duration: 0.2, easing }).finished;
    // ... drain after minimum display time
  }, { signal });
}

// Run on every page load
document.addEventListener('astro:page-load', setupLogoAnimation);
```

**Why AbortController?**:
1. **No manual flags** - Web Platform handles lifecycle automatically
2. **Fresh DOM refs** - Every `astro:page-load` gets new element reference
3. **No memory leaks** - Old listeners removed via `signal.abort()`
4. **Isolated state** - `isAnimating`/`showTime` scoped per page
5. **Idiomatic** - Standard JavaScript pattern (90% confident)

**Animation Phases**:
1. **Phase 1** (600ms): Staggered fill through 3 stages (40% → 65% → 90%)
   - Stage 1 (200ms): 0% → 40%
   - Stage 2 (200ms): 40% → 65%
   - Stage 3 (200ms): 65% → 90%
2. **Phase 2** (200ms): Complete to 100% after page preparation
3. **Phase 3** (300ms): Drain water after minimum 500ms display

**Visual Effect**:
- Egyptian gold outline (always visible) + bright blue water gradient
- Water "fills the SS curves" from bottom to top (staggered phases)
- Gradient creates depth (darker blue at bottom, lighter cyan at top)
- Smooth drain animation returns to empty state

**Complexity**: 3 story points
**Priority**: Week 3-4 ✅ **COMPLETE**

---

#### B. Scroll-Based Logo Morphing (Month 2)
Context-aware logo that morphs based on scroll position (advanced feature).

**Techniques Learned**:
- Scroll-linked SVG morphing (Codrops: ContextAwareLogoAnimationScroll)
- GSAP ScrollTrigger → Motion One `scroll()` adaptation

**Implementation**:
```typescript
// src/components/Logo.astro
<svg id="logo" viewBox="0 0 100 100">
  <path id="logo-path" d="M 50 10 L 90 90 L 10 90 Z" fill="var(--color-primary)" />
</svg>

<script>
  import { scroll, animate } from "motion";

  const logoPath = document.querySelector('#logo-path');

  // Morph: Pyramid → Water Wave → Pyramid
  const shapes = {
    pyramid: "M 50 10 L 90 90 L 10 90 Z",
    wave: "M 0 50 Q 25 40, 50 50 T 100 50 L 100 100 L 0 100 Z"
  };

  scroll(
    animate(logoPath, {
      d: [shapes.pyramid, shapes.wave, shapes.pyramid]
    }),
    {
      target: document.documentElement,
      offset: ["start start", "end end"]
    }
  );
</script>
```

**Use Cases**:
- Navigation logo morphs as user scrolls through sections
- Visual storytelling (pyramid stability → water flow → pyramid return)

**Complexity**: 5 story points
**Priority**: Month 2 (polish, not critical)

---

### 6. **Custom Cursor**
Golden circle cursor with magnetic hover effects.

**Techniques Learned**:
- LERP (Linear Interpolation) for smooth follow (Codrops: Custom Cursor Filled Circle)
- RequestAnimationFrame loop → CSS transition alternative

**Two Approaches**:

#### A. CSS-Only (Recommended for v1)
```css
/* src/styles/cursor.css */
.custom-cursor {
  position: fixed;
  width: 40px;
  height: 40px;
  background: var(--color-primary); /* Egyptian gold */
  border: 2px solid var(--color-accent); /* Cyan outline */
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: transform 0.15s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: 9999;
  mix-blend-mode: difference;
}

.custom-cursor.hover {
  transform: translate(-50%, -50%) scale(1.5);
}

/* Hide default cursor */
body {
  cursor: none;
}

/* Desktop only */
@media (pointer: coarse) {
  .custom-cursor { display: none; }
  body { cursor: auto; }
}
```

```typescript
// src/scripts/cursor.ts
const cursor = document.querySelector('.custom-cursor');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

// Scale on hover
const interactiveEls = document.querySelectorAll('a, button, .card');
interactiveEls.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});
```

#### B. Motion One (Month 2+)
```typescript
import { animate } from "motion";

// Smooth spring-based follow
let cursorX = 0, cursorY = 0;

window.addEventListener('mousemove', (e) => {
  animate(
    cursor,
    { x: e.clientX, y: e.clientY },
    { duration: 0.5, easing: "ease-out" }
  );
});
```

**Complexity**: 1 story point (CSS) or 3 story points (Motion One)
**Priority**: Week 3-4 (CSS), Month 2+ (Motion One)

---

### 7. **Scroll Progress Indicator**
Nile water metaphor - horizontal bar fills as you read.

**Implementation**:
```typescript
// src/utils/animations.ts
export function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--color-secondary); /* Red Sea blue */
    transform-origin: left;
    z-index: 1000;
  `;
  document.body.appendChild(progressBar);

  scroll(
    animate(progressBar, { scaleX: [0, 1] }),
    { target: document.documentElement }
  );
}
```

**Complexity**: 1 story point
**Priority**: Week 3-4

---

## 🎨 Egyptian Design System Integration

### Color Palette Animations
Use design system tokens in animations:

```typescript
// src/utils/animations.ts
export const egyptianColors = {
  primary: '#F4C430',     // Bright gold
  secondary: '#0EA5E9',   // Red Sea blue
  accent: '#06B6D4',      // Vibrant cyan
  background: '#F5F1E8'   // Limestone cream
};

// Example: Animated gradient background
export function animateGradient() {
  const hero = document.querySelector('.hero');

  animate(
    hero,
    {
      background: [
        `linear-gradient(135deg, ${egyptianColors.primary}22, ${egyptianColors.background})`,
        `linear-gradient(135deg, ${egyptianColors.secondary}22, ${egyptianColors.background})`
      ]
    },
    { duration: 3, repeat: Infinity, direction: "alternate" }
  );
}
```

### Golden Ratio Timing
All animations use golden ratio intervals:

```typescript
export const goldenTiming = {
  fast: 0.382,      // 382ms
  medium: 0.618,    // 618ms
  slow: 1.0,        // 1000ms
  extraSlow: 1.618  // 1618ms
};

export const egyptianEasing = {
  pyramid: [0.34, 1.56, 0.64, 1],      // Sharp ascent (like pyramid sides)
  water: [0.65, 0, 0.35, 1],           // Flowing ease (like Nile water)
  monument: [0.76, 0, 0.24, 1]         // Powerful ease-in-out
};
```

### Fibonacci Spacing
Animations respect Fibonacci spacing tokens:

```typescript
// Stagger delays follow Fibonacci sequence
const fibonacciDelays = [0, 0.1, 0.1, 0.2, 0.3, 0.5, 0.8]; // seconds

animate(
  elements,
  { opacity: [0, 1] },
  { delay: stagger(fibonacciDelays) }
);
```

---

## ⚡ Performance Optimizations

### 1. Respect `prefers-reduced-motion`
```typescript
// src/utils/animations.ts
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function conditionalAnimate(
  target: Element,
  keyframes: any,
  options: any
) {
  if (prefersReducedMotion()) {
    // Instant state change, no animation
    const finalState = Array.isArray(keyframes)
      ? keyframes[keyframes.length - 1]
      : keyframes;
    Object.assign((target as HTMLElement).style, finalState);
  } else {
    animate(target, keyframes, options);
  }
}
```

### 2. Mobile vs Desktop
```typescript
// Disable complex animations on mobile
const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (!isMobile) {
  // Desktop: Full animations
  animatePyramidGrid();
} else {
  // Mobile: Static patterns only
  document.querySelectorAll('.pyramid-element').forEach(el => {
    el.style.opacity = '0.12';
  });
}
```

### 3. IntersectionObserver for Lazy Animation
```typescript
// Only animate elements when they're near viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateElement(entry.target);
        observer.unobserve(entry.target); // Animate once
      }
    });
  },
  { rootMargin: '100px' } // Trigger 100px before visible
);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

### 4. Will-Change for GPU Acceleration
```css
/* Add to elements that will animate */
.pyramid-element,
.reveal-on-scroll {
  will-change: transform, opacity;
}

/* Remove after animation completes */
.animation-complete {
  will-change: auto;
}
```

---

## 📦 Reusable Components

### Component Architecture

```
src/
├── components/
│   ├── animations/
│   │   ├── RevealOnScroll.astro      // Wrapper component
│   │   ├── WordReveal.astro          // Typography animations
│   │   ├── PageTransition.astro      // SVG path transitions
│   │   └── ScrollProgress.astro      // Progress indicator
│   ├── patterns/
│   │   ├── PyramidGrid.astro         // Animated background pattern
│   │   └── WaterFlow.astro           // Nile-inspired flow lines
├── utils/
│   └── animations.ts                 // Core Motion One utilities
└── styles/
    └── animations.css                // Animation-specific styles
```

### Example: RevealOnScroll Component

```astro
---
// src/components/animations/RevealOnScroll.astro
export interface Props {
  delay?: number;
  duration?: number;
  amount?: number; // IntersectionObserver threshold
}

const { delay = 0, duration = 0.618, amount = 0.3 } = Astro.props;
---

<div class="reveal-container" data-delay={delay} data-duration={duration} data-amount={amount}>
  <slot />
</div>

<script>
  import { inView, animate } from "motion";

  document.querySelectorAll('.reveal-container').forEach((container) => {
    const delay = parseFloat(container.getAttribute('data-delay') || '0');
    const duration = parseFloat(container.getAttribute('data-duration') || '0.618');
    const amount = parseFloat(container.getAttribute('data-amount') || '0.3');

    inView(
      container,
      ({ target }) => {
        animate(
          target,
          { opacity: [0, 1], y: [40, 0] },
          {
            delay,
            duration,
            easing: [0.65, 0, 0.35, 1]
          }
        );
      },
      { amount }
    );
  });
</script>

<style>
  .reveal-container {
    opacity: 0; /* Hidden by default */
  }
</style>
```

**Usage**:
```astro
<RevealOnScroll delay={0.2} duration={0.8}>
  <h2>Architecture Decisions</h2>
  <p>We chose a microservices approach...</p>
</RevealOnScroll>
```

---

## 🚀 Implementation Roadmap

### Week 1-2: Foundation (3 story points)
- [x] Install Motion One: `bun add motion`
- [x] Create `/src/utils/animations.ts` with core utilities
- [x] Implement hero geometric reveal (PyramidGrid fade-in)
- [x] Add global `prefers-reduced-motion` checks
- [x] Test on desktop + mobile

**Files to Create**:
- `src/utils/animations.ts` (core utilities)
- `src/styles/animations.css` (animation-specific styles)
- `src/components/patterns/PyramidGrid.astro` (hero pattern)

### Week 3-4: Case Studies & UX Polish (8 story points, 5 complete)
- [x] `RevealOnScroll.astro` component
- [ ] `WordReveal.astro` for section headers
- [ ] Text highlighting with `<mark>` in Markdown
- [x] Scroll progress bar (Nile water metaphor)
- [x] CSS-only custom cursor
- [x] SS Logo navigation animation with AbortController pattern (UX critical)

**Files Created**:
- `src/components/animations/RevealOnScroll.astro` ✅
- `src/components/animations/ScrollProgress.astro` ✅
- `src/scripts/cursor.ts` ✅
- `src/components/SSLogo.astro` ✅ (refactored with AbortController)

**Next Steps**:
- `src/components/animations/WordReveal.astro` (3 story points remaining)

### Month 2: Advanced (8 story points)
- [ ] Context-aware logo morphing
- [ ] SVG path page transitions (custom Egyptian shapes)
- [ ] Motion One custom cursor (upgrade from CSS)
- [ ] Blog post typography animations
- [ ] Design custom SVG paths for transitions

**Files to Create**:
- `src/components/Logo.astro` (animated logo)
- `src/components/PageTransition.astro` (SVG path transitions)
- `src/data/transitionPaths.ts` (SVG path definitions)

### Optional / Future (13 story points - DEFER)
- [ ] Custom SVG letter animations for hero title
- [ ] Complex fluid blob animations (Canvas or complex SVG filters)
- [ ] Interactive text destruction effects
- [ ] 3D text reveals with WebGL

---

## 🧪 Testing Checklist

Before shipping any animation:

- [ ] Works on Chrome, Firefox, Safari (latest versions)
- [ ] Respects `prefers-reduced-motion: reduce`
- [ ] Performs at 60fps on desktop
- [ ] Disabled or simplified on mobile (unless explicitly mobile-optimized)
- [ ] No layout shift (elements reserve space)
- [ ] No janky scroll (use `transform` not `top`/`left`)
- [ ] Accessible (doesn't hide content from screen readers)
- [ ] <3s total page load (check with Lighthouse)

---

## 📚 Resources & Credits

### Libraries
- **Motion One**: https://motion.dev (5KB, WAAPI-based)
- **SplitType**: https://splitting.js.org (text splitting for typography animations)
- **Astro View Transitions**: https://docs.astro.build/en/guides/view-transitions/

### Inspiration Sources
- Codrops: Animate SVG Shapes on Scroll
- Codrops: Recreating Gradient Mask Hover Effect from Evervault
- Codrops: Stagger Reveal Animations for Text
- Codrops: Preview to Full Content Page Transition
- Codrops: Context-Aware Logo Animation on Scroll
- Codrops: On-Scroll Text Highlight
- Codrops: Custom Cursor Filled Circle

### Design References
- Johannes Itten: Chromatic Circle (RYBitten color theory)
- Egyptian geometric art (pyramid, water, hieroglyphs)
- Josh Comeau: https://www.joshwcomeau.com (animation philosophy)
- Dan Abramov: https://overreacted.io (minimal animation approach)

---

## 🎯 Success Metrics

### Performance
- **Target**: <3s page load (Lighthouse score)
- **Animation FPS**: 60fps sustained on desktop
- **Bundle Size**: Motion One core (5KB) + scroll (5KB) = 10KB total

### User Experience
- **Distraction Score**: 0 complaints about "too much motion"
- **Accessibility**: 100% WCAG AA compliance
- **Mobile**: Animations disabled/simplified on touch devices

### Development
- **Reusability**: 80%+ of animations use shared components
- **Maintainability**: Single source of truth (`animations.ts`)
- **Documentation**: Every animation has usage example

---

## 🔑 Key Principles

1. **Content-First**: Animations never distract from reading
2. **Egyptian Aesthetic**: Geometric patterns, golden ratio timing, Nile metaphors
3. **Performance**: WAAPI hardware acceleration, `prefers-reduced-motion` respect
4. **Accessibility**: Screen reader friendly, no motion sickness
5. **Progressive Enhancement**: Works without JS, enhanced with Motion One
6. **Library-First**: Motion One over custom RAF loops
7. **Golden Ratio**: All timing follows 0.382 / 0.618 / 1.0 / 1.618
8. **Elegant Minimalism**: 2-3 elements max per pattern

---

**Confidence**: 90% (based on extensive Codrops analysis + Motion One documentation)
**Alternative**: Native CSS `@scroll-timeline` (70% confident - browser support concerns)
**Reversible**: Yes (Motion One can swap for GSAP if needed)
**Key Assumption**: Egyptian patterns can be created as static SVG + animated (if blocked, use CSS shapes)

**Applied Patterns**:
- **Inversion**: Identified failure modes (motion sickness, distraction, performance)
- **Library-First**: Motion One = production library vs custom code
- **Progressive Disclosure**: Layer 0 (CSS) → Layer 1 (Motion One basics) → Layer 2 (Complex SVG morphs)
- **Story Points**: 16 points total (not time estimates)
