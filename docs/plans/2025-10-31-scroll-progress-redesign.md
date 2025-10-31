# Scroll Progress Component Redesign

**Date**: 2025-10-31
**Status**: Approved for Implementation
**Complexity**: 3 story points (simple refactor with clear requirements)

## Problem Statement

The current `ScrollProgress.astro` component is over-engineered:
- 353 lines of code with complex character-level animations
- Motion One library dependency for scroll progress (heavy)
- State management with transition queues and promise chains
- Multiple animation types (scale, blur, slide, rotate, split, shuffle)
- Difficult to maintain and debug
- User requirement: **"minimal, small, away from center of attention"**

## Design Goals

1. **Minimal**: Reduce complexity from 353 lines to ~120 lines total
2. **Small**: Thin progress indicators (4px), small text (12px mobile)
3. **Peripheral**: Desktop in right margin, mobile at bottom (not blocking content)
4. **Zero animations**: Instant text updates (no Motion One, no transitions)
5. **Responsive**: Separate desktop/mobile layouts with clear separation
6. **Selective**: Only load on pages that need it (case studies, blog posts)

## Architecture Decision: Two Separate Components

### Approach Selected
**Two separate components** with CSS breakpoint switching via wrapper.

**Why This Approach?**
- Clearest separation of concerns (desktop vs mobile)
- Independently testable in Astrobook
- CSS `display: none` prevents unused component from initializing scripts
- Single import point for pages: `<ScrollProgress />` just works
- Easier to maintain (edit desktop without affecting mobile)

**Alternatives Considered:**
1. CSS-only responsive (simplest): Would require complex CSS transforms to flip from vertical to horizontal
2. JavaScript viewport detection: Adds runtime complexity and re-render logic

## Component Structure

```
src/components/
  ├── ScrollProgressDesktop.astro  (~40 lines)
  ├── ScrollProgressMobile.astro   (~40 lines)
  └── ScrollProgress.astro          (~10 lines wrapper)
```

### Wrapper Component (ScrollProgress.astro)

```astro
---
import ScrollProgressDesktop from './ScrollProgressDesktop.astro';
import ScrollProgressMobile from './ScrollProgressMobile.astro';
---

<div class="scroll-progress-wrapper">
  <div class="hidden md:block">
    <ScrollProgressDesktop />
  </div>
  <div class="block md:hidden">
    <ScrollProgressMobile />
  </div>
</div>
```

**Key Decision**: No props. Both components independently query `document.querySelectorAll('[data-section]')` on mount, eliminating prop drilling and coordination complexity.

## Desktop Component Design

### Visual Layout

```
┌─────────────────────────────┐
│  [Content Area]             │
│                             │
│                        ║    │  ← Vertical progress bar (4px wide)
│                        ║    │     Fixed: right-4, top-1/4 to bottom-1/4
│                        ▓    │     Fills bottom-to-top (matches reading direction)
│                        │    │
│                     [Section Title] ← Rotated 90° clockwise
│                        │    │        (writing-mode: vertical-rl + rotate(180deg))
└─────────────────────────────┘
```

### Component Structure

```astro
<!-- ScrollProgressDesktop.astro -->
<div class="fixed right-4 top-1/4 bottom-1/4 z-30 flex flex-col items-center gap-4">
  <!-- Progress Bar: Vertical track with fill -->
  <div class="relative w-1 flex-1 bg-neutral-light/30 rounded-full overflow-hidden">
    <div
      class="absolute bottom-0 left-0 right-0 bg-primary transition-[height] duration-100"
      data-progress-bar
      style="height: 0%;"
    ></div>
  </div>

  <!-- Section Title: Rotated 90° clockwise -->
  <div class="text-sm font-medium text-accent whitespace-nowrap"
       style="writing-mode: vertical-rl; transform: rotate(180deg);">
    <span data-section-title>Introduction</span>
  </div>
</div>

<script>
  const initScrollProgress = () => {
    const progressBar = document.querySelector('[data-progress-bar]') as HTMLElement | null;
    const titleEl = document.querySelector('[data-section-title]') as HTMLElement | null;
    const sections = Array.from(document.querySelectorAll('[data-section]')) as HTMLElement[];

    if (!progressBar || !titleEl || sections.length === 0) return;

    // 1. Progress tracking using native scroll events
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      progressBar.style.height = `${progress * 100}%`;
    };

    // 2. Section detection using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement;
            titleEl.textContent = section.dataset.section || ''; // Instant update
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '-20% 0px -75% 0px' // Thin detection zone at 20-25% from top
      }
    );

    sections.forEach(section => observer.observe(section));
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial state

    // Cleanup for Astro View Transitions
    const cleanup = () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
    };

    document.addEventListener('astro:before-swap', cleanup, { once: true });
  };

  document.addEventListener('astro:page-load', initScrollProgress);
</script>
```

### Design Decisions

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| **Position** | `right-4` (16px from edge) | Out of reading path, consistent margin |
| **Vertical Span** | `top-1/4 bottom-1/4` (middle 50%) | Centered, doesn't touch header/footer |
| **Bar Width** | `w-1` (4px) | Minimal but visible |
| **Fill Direction** | Bottom-to-top | Matches reading progress (top → bottom of page) |
| **Colors** | `bg-neutral-light/30` track, `bg-primary` fill | Subtle background, Egyptian gold accent |
| **Text Rotation** | `writing-mode: vertical-rl` + `rotate(180deg)` | Reads top-to-bottom when rotated |
| **Transition** | Only `height` (100ms) | Smooth progress, no animation on text |

## Mobile Component Design

### Visual Layout

```
┌─────────────────────────────┐
│                             │
│    [Content Area]           │
│                             │
│                             │
└─────────────────────────────┘
  ▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░    ← Progress bar (4px tall, bottom)
  Introduction                    ← Section title (12px, centered)
```

### Component Structure

```astro
<!-- ScrollProgressMobile.astro -->
<div class="fixed bottom-0 left-0 right-0 z-30 pb-safe">
  <!-- Progress Bar: Horizontal track with fill -->
  <div class="relative h-1 w-full bg-neutral-light/30">
    <div
      class="absolute top-0 left-0 bottom-0 bg-primary transition-[width] duration-100"
      data-progress-bar
      style="width: 0%;"
    ></div>
  </div>

  <!-- Section Title: Small centered text below bar -->
  <div class="bg-surface/95 backdrop-blur-sm border-t border-neutral-light">
    <div class="px-4 py-2 text-center">
      <span class="text-xs font-medium text-accent" data-section-title>Introduction</span>
    </div>
  </div>
</div>

<script>
  const initScrollProgress = () => {
    const progressBar = document.querySelector('[data-progress-bar]') as HTMLElement | null;
    const titleEl = document.querySelector('[data-section-title]') as HTMLElement | null;
    const sections = Array.from(document.querySelectorAll('[data-section]')) as HTMLElement[];

    if (!progressBar || !titleEl || sections.length === 0) return;

    // 1. Progress tracking using native scroll events
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      progressBar.style.width = `${progress * 100}%`; // Width for horizontal
    };

    // 2. Section detection using IntersectionObserver (same logic as desktop)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement;
            titleEl.textContent = section.dataset.section || '';
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '-20% 0px -75% 0px'
      }
    );

    sections.forEach(section => observer.observe(section));
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // Cleanup for Astro View Transitions
    const cleanup = () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
    };

    document.addEventListener('astro:before-swap', cleanup, { once: true });
  };

  document.addEventListener('astro:page-load', initScrollProgress);
</script>
```

### Design Decisions

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| **Position** | `fixed bottom-0`, `pb-safe` | Respects iOS safe area, doesn't block content |
| **Bar Height** | `h-1` (4px) | Minimal visual weight |
| **Fill Direction** | Left-to-right | Standard horizontal progress convention |
| **Text Size** | `text-xs` (12px) | Very small, unobtrusive |
| **Backdrop** | `bg-surface/95 backdrop-blur-sm` | Readable over content, blends naturally |
| **Total Height** | ~28px (4px bar + 24px title) | Minimal footprint on small screens |

## JavaScript Logic Pattern

### Core Pattern (Shared by Both Components)

**Eliminated Complexity:**
- ❌ Motion One library (0 imports)
- ❌ Animation state management (no queues, promises)
- ❌ Character-level animations (split, shuffle, rotate)
- ❌ `prefersReducedMotion` checks (no animations = no accessibility concerns)
- ❌ Complex transition timing and overlaps

**Retained Essentials:**
- ✅ Native `scroll` event with passive listener
- ✅ `IntersectionObserver` for section detection
- ✅ Instant text updates (`titleEl.textContent = ...`)
- ✅ Astro View Transitions cleanup

### Performance Benefits

1. **No JavaScript bundle overhead**: Motion One removed (saves ~5KB gzipped)
2. **Passive scroll listeners**: Browser-optimized, runs off main thread
3. **IntersectionObserver**: Native API, highly performant
4. **Zero layout thrashing**: Only updates `style.height` or `style.width` (GPU-accelerated)

## Race Conditions & Section Detection Audit

### Identified Race Conditions

#### 1. Multiple IntersectionObserver Callbacks Firing Simultaneously

**Problem**: Fast scrolling can cause multiple sections to trigger `isIntersecting: true` callbacks before previous callbacks complete. Last callback wins, which may not be the "current" section.

**Example Scenario**:
```
Time 0ms:  Section A enters detection zone → callback A queued
Time 50ms: User scrolls fast, Section B enters → callback B queued
Time 60ms: Callback A fires, sets title to "A"
Time 65ms: Callback B fires, sets title to "B" (overwrites)
Result: Title shows "B" even if "A" is more visible
```

**Solution**: Disambiguate which section should be "current" using visibility ranking.

```typescript
// Track which sections are currently intersecting
const visibleSections = new Map<HTMLElement, IntersectionObserverEntry>();

const observer = new IntersectionObserver(
  (entries) => {
    // Update visibility map
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleSections.set(entry.target as HTMLElement, entry);
      } else {
        visibleSections.delete(entry.target as HTMLElement);
      }
    });

    // Pick the "most current" section from all visible sections
    if (visibleSections.size > 0) {
      const currentSection = getMostCurrentSection(visibleSections);
      titleEl.textContent = currentSection.dataset.section || '';
    }
  },
  {
    threshold: 0,
    rootMargin: '-20% 0px -75% 0px'
  }
);

// Determine which section is "most current"
function getMostCurrentSection(visible: Map<HTMLElement, IntersectionObserverEntry>): HTMLElement {
  // Strategy: Pick the section closest to the detection zone center (22.5% from top)
  const targetY = window.innerHeight * 0.225; // Center of detection zone

  let closest: HTMLElement | null = null;
  let minDistance = Infinity;

  visible.forEach((entry, section) => {
    const rect = entry.boundingClientRect;
    const sectionCenter = rect.top + (rect.height / 2);
    const distance = Math.abs(sectionCenter - targetY);

    if (distance < minDistance) {
      minDistance = distance;
      closest = section;
    }
  });

  return closest || visible.keys().next().value; // Fallback to first visible
}
```

**Why This Works**:
- All visible sections tracked in Map
- Selection happens AFTER all callbacks complete (single microtask)
- Closest to center wins (natural reading position)

#### 2. Astro View Transitions Cleanup Timing

**Problem**: What if `astro:page-load` fires for new page before `astro:before-swap` cleanup completes?

**Analysis**: Astro guarantees sequential event order:
1. `astro:before-swap` (old page cleanup)
2. DOM swap occurs
3. `astro:page-load` (new page initialization)

**Solution**: Trust Astro's event order, but add defensive guards:

```typescript
let isInitialized = false;

const initScrollProgress = () => {
  // Guard: Prevent double initialization
  if (isInitialized) {
    console.warn('ScrollProgress already initialized, skipping');
    return;
  }

  // ... setup code ...

  isInitialized = true;

  const cleanup = () => {
    observer.disconnect();
    window.removeEventListener('scroll', updateProgress);
    visibleSections.clear();
    isInitialized = false; // Reset for next page
  };

  document.addEventListener('astro:before-swap', cleanup, { once: true });
};
```

**Why This Works**:
- `isInitialized` flag prevents double setup
- Flag reset in cleanup allows re-initialization on next page
- `{ once: true }` ensures cleanup only runs once per page lifecycle

#### 3. Initial Page Load Race

**Problem**: IntersectionObserver might fire callbacks before initial state is set, causing title flicker.

**Solution**: Set initial state synchronously, THEN attach observer:

```typescript
const initScrollProgress = () => {
  // ... DOM queries ...

  // 1. Set initial state FIRST (synchronous)
  const initialSection = findInitialSection(sections);
  if (initialSection) {
    titleEl.textContent = initialSection.dataset.section || '';
    visibleSections.set(initialSection, null as any); // Mark as visible
  }

  // 2. THEN attach observer (may fire async callbacks)
  const observer = new IntersectionObserver(/* ... */);
  sections.forEach(section => observer.observe(section));

  // 3. Attach scroll listener last
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress(); // Set initial progress
};

// Find section that should be visible on page load
function findInitialSection(sections: HTMLElement[]): HTMLElement | null {
  const targetY = window.innerHeight * 0.225; // Detection zone center

  // Find section whose bounds contain the target Y position
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= targetY && rect.bottom >= targetY) {
      return section;
    }
  }

  // Fallback: First section if at top of page, last if at bottom
  if (window.scrollY < 100) return sections[0];
  if (window.scrollY > document.documentElement.scrollHeight - window.innerHeight - 100) {
    return sections[sections.length - 1];
  }

  return sections[0]; // Default fallback
}
```

**Why This Works**:
- Synchronous initial state prevents flicker
- Observer attached after initial state set
- Fallbacks handle edge cases (top/bottom of page)

### Section Detection Logic Refinements

#### Detection Zone Strategy

**Current**: `rootMargin: '-20% 0px -75% 0px'` creates 5% detection zone at 20-25% from top.

**Edge Cases to Handle**:

1. **Multiple sections in zone**: Use `getMostCurrentSection()` (closest to center)
2. **No sections in zone** (between sections): Keep showing last known section
3. **Very short sections**: May pass through zone without triggering (threshold: 0 handles this)
4. **Top of page**: Show first section even if below detection zone
5. **Bottom of page**: Show last section even if above detection zone

**Refined Logic**:

```typescript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleSections.set(entry.target as HTMLElement, entry);
      } else {
        visibleSections.delete(entry.target as HTMLElement);
      }
    });

    // Edge case: No sections in detection zone
    if (visibleSections.size === 0) {
      // Keep showing last known section (don't update titleEl)
      return;
    }

    // Normal case: Pick most current section
    const currentSection = getMostCurrentSection(visibleSections);
    titleEl.textContent = currentSection.dataset.section || '';
  },
  {
    threshold: 0, // Fire on ANY intersection (handles tiny sections)
    rootMargin: '-20% 0px -75% 0px' // 5% detection zone at 20-25%
  }
);
```

**Additional Safety**: Handle scroll-to-top and scroll-to-bottom explicitly:

```typescript
const updateProgress = () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollTop = window.scrollY;
  const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

  progressBar.style.height = `${progress * 100}%`; // or width for mobile

  // Edge case: At very top of page, force first section
  if (scrollTop < 50 && sections.length > 0) {
    titleEl.textContent = sections[0].dataset.section || '';
    return;
  }

  // Edge case: At very bottom of page, force last section
  if (scrollTop > scrollHeight - 50 && sections.length > 0) {
    titleEl.textContent = sections[sections.length - 1].dataset.section || '';
    return;
  }

  // Otherwise: Let IntersectionObserver handle it
};
```

### Race Condition Summary

| Race Condition | Impact | Solution | Complexity |
|----------------|--------|----------|------------|
| Multiple callbacks | Wrong section shown | Track all visible, pick closest to center | Medium |
| View Transitions timing | Double initialization | `isInitialized` flag + trust event order | Low |
| Initial load race | Title flicker | Set initial state synchronously first | Low |
| No sections in zone | Title disappears | Keep last known section | Low |
| Top/bottom edge cases | Wrong section at extremes | Force first/last section in updateProgress | Low |

**Total Added Complexity**: ~30 lines of defensive code per component (still <70 lines total)

## Astro View Transitions Handling

### Lifecycle Events

```typescript
// Initialize on page load (handles both initial load + View Transitions)
document.addEventListener('astro:page-load', initScrollProgress);

// Cleanup before page swap (prevents memory leaks)
document.addEventListener('astro:before-swap', cleanup, { once: true });
```

### Transition Scenarios Covered

| Scenario | Behavior | Why It Works |
|----------|----------|--------------|
| Page WITH progress → page WITHOUT | Cleanup runs, observers disconnect | `astro:before-swap` fires before DOM swap |
| Page WITHOUT → page WITH progress | Initializes cleanly on new page | `astro:page-load` runs after swap completes |
| Two pages WITH progress | Old cleans up, new initializes fresh | Sequential event order ensures no overlap |
| Browser back/forward | Correct initialization | `astro:page-load` fires on history navigation |

### Safety Mechanisms

1. **Early returns**: Check for required DOM elements before setup
2. **Passive listeners**: Scroll events won't block rendering
3. **Once handlers**: `{ once: true }` ensures single execution per lifecycle
4. **Disconnect on cleanup**: IntersectionObserver properly disposed

## Usage Patterns

### Selective Page Loading

```astro
---
// ✅ Long-form content pages (case studies, blog posts)
// src/pages/portfolio/statsbomb.mdx
import ScrollProgress from '@/components/ScrollProgress.astro';
---

<ScrollProgress />

<article>
  <section data-section="Introduction">
    <!-- Content -->
  </section>

  <section data-section="Problem Space">
    <!-- Content -->
  </section>
</article>
```

```astro
---
// ✅ Short pages (homepage, about) - NO import
// src/pages/index.astro
---

<Layout>
  <h1>Welcome</h1>
</Layout>
```

### Required Markup Pattern

**Pages MUST include** `data-section` attributes:

```html
<section data-section="Introduction">...</section>
<section data-section="Architecture">...</section>
<section data-section="Lessons Learned">...</section>
```

**Removed attribute**: `data-animation` (no longer needed)

## Migration Strategy

### Step-by-Step

1. **Backup**: `git mv ScrollProgress.astro ScrollProgress.astro.backup`
2. **Create**: Three new component files (Desktop, Mobile, Wrapper)
3. **Test**: Manual testing on statsbomb.mdx page
4. **Verify**: Astro View Transitions navigation works
5. **Cleanup**: Remove backup if all tests pass

### No Page Changes Required

Existing pages using `<ScrollProgress />` continue to work without modification. Only the `[data-section]` attributes are needed (already present).

## Success Criteria

- [ ] Desktop (>768px) shows vertical indicator on right side
- [ ] Mobile (<768px) shows horizontal bar at bottom
- [ ] Section titles update instantly (no animations)
- [ ] No console errors during scroll
- [ ] Astro View Transitions cleanup works (no memory leaks)
- [ ] Total code <150 lines across all three components
- [ ] Motion One removed from bundle (if not used elsewhere)

## Complexity Comparison

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total Lines** | 353 | ~180 (includes race condition guards) | -49% |
| **Dependencies** | Motion One | None | Native APIs |
| **Animation States** | 6 types (scale, blur, slide, rotate, split, shuffle) | 0 | Eliminated |
| **State Management** | Transition queues, promises | Visibility Map only | Simplified |
| **Accessibility** | `prefersReducedMotion` required | Not needed | No animations |
| **Bundle Size** | +5KB (Motion One) | 0KB | Native only |
| **Race Condition Handling** | None (animations hide issues) | 5 strategies (explicit fixes) | Improved |

**Note**: Added ~30 lines per component for race condition guards and section detection logic. Still 49% reduction in total code while improving correctness.

## Design Patterns Applied

1. **Separation of Concerns**: Desktop/Mobile components isolated
2. **YAGNI**: Removed unused animation complexity
3. **Native First**: Zero external dependencies
4. **Progressive Enhancement**: Works without JavaScript (progress bar still visible)
5. **Defensive Programming**: Early returns, null checks, passive listeners

## Future Enhancements (Out of Scope)

- [ ] Scroll-to-section navigation on click (clickable section titles)
- [ ] Progress percentage indicator (e.g., "45%" next to bar)
- [ ] Smooth scroll animation when clicking sections
- [ ] Dark mode color variations

**Note**: These are explicitly deferred to keep the initial redesign minimal and focused.

---

**Confidence**: 95% (clear requirements, validated design, proven patterns)
**Reversible**: Yes (backup file kept until testing confirms success)
**Complexity**: 3 story points (straightforward refactor, no architectural unknowns)
**Applied Patterns**: [YAGNI, Native-First, Separation of Concerns, Defensive Programming]
