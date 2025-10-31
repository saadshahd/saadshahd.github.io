# Inline Accordion for Progressive Disclosure

**Date**: 2025-10-31
**Component**: Accordion.astro
**Complexity**: 8 story points
**Status**: In Progress

## Problem

The "When These Patterns Apply" section (statsbomb.mdx:481-506) uses a DefinitionList with 4 dense items totaling 400+ words. This breaks the "Layer 0 = story focus" principle:

**Current friction:**
- All 4 definitions visible simultaneously → cognitive overload
- Reader must scan 110+ character definitions to find relevant conditions
- No progressive disclosure → details compete with main narrative
- Violates scan-then-dive reading pattern

**Reader goal:** Quickly identify which conditions apply to their context, then dive deep on relevant ones only.

## Solution

Add `size="inline"` variant to Accordion component with DefinitionList editorial styling. Replace DefinitionList with inline Accordions using terse summaries (20-30 chars) + collapsible full definitions.

**Benefits:**
- Scan phase: 4 collapsed terms (~25 chars each) → instant pattern recognition
- Dive phase: Click to expand relevant conditions → progressive disclosure
- Visual coherence: Matches DefinitionList typography (editorial, not card-like)
- Reusable: Any dense list needing progressive disclosure can use this variant

## Component Specification

### CVA Variant Architecture

Add `size` variant to all 4 CVA definitions (accordion, summary, chevron, content):

```typescript
size: {
  default: [ /* existing styles */ ],
  inline: [ /* new compact editorial styles */ ],
}
```

### Visual Design: DefinitionList DNA

**Goal:** Inline accordion should feel like a DefinitionList with progressive disclosure, not a compact card.

| Aspect | DefinitionList (current) | Inline Accordion (new) | Rationale |
|--------|-------------------------|----------------------|-----------|
| **Padding** | `px-0` (editorial flow) | `px-0` (match) | Content flows like editorial text, not contained card |
| **Background** | Transparent | Transparent (`bg-transparent`) | No visual container, pure typography |
| **Border** | None | None (`border-none`) | Editorial cleanliness |
| **Spacing** | `space-y-4` (16px) | `mb-2` (8px) | Tighter for collapsible context |
| **Term Typography** | `text-sm font-semibold text-text` (14px) | `text-sm font-semibold text-text` (match) | Visual hierarchy consistency |
| **Definition Typography** | `text-sm text-text-lighter leading-relaxed` (14px) | `text-sm text-text-lighter leading-relaxed` (match) | Same muted editorial style |
| **Chevron** | N/A | `w-3.5 h-3.5` (14px) | Proportional to 14px text, subtle |

### Detailed CVA Specifications

#### 1. Accordion Container

```typescript
const accordion = cva([
  'rounded-lg',
], {
  variants: {
    variant: { /* existing skill/category/status/default */ },
    grouped: { /* existing */ },
    position: { /* existing */ },
    size: {
      default: [
        'px-4',
        'mb-4',
      ],
      inline: [
        'px-0',              // Zero padding for editorial flow
        'mb-2',              // Compact spacing (8px vs 16px)
        'border-none',       // No border
        'bg-transparent',    // Transparent background
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
    grouped: false,
    size: 'default',
  },
});
```

#### 2. Summary (Term)

```typescript
const summary = cva([
  'flex items-center justify-between gap-4',
  'cursor-pointer select-none',
  'transition-colors duration-200',
], {
  variants: {
    size: {
      default: [
        'py-5 pl-6 pr-4',
        'text-base font-medium text-text',
        'bg-neutral-lighter/0',
      ],
      inline: [
        'py-2 px-0',                    // Minimal padding (8px vertical, 0 horizontal)
        'text-sm font-semibold',        // Match DefinitionList term style
        'text-text',                    // Same color as DL terms
        'hover:text-text-light',        // Subtle hover feedback
      ],
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
```

#### 3. Chevron

```typescript
const chevron = cva([
  'text-neutral shrink-0 transition-transform duration-200',
], {
  variants: {
    size: {
      default: 'w-5 h-5',      // 20px
      inline: 'w-3.5 h-3.5',   // 14px (proportional to text-sm)
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
```

#### 4. Content (Definition)

```typescript
const content = cva([
  'accordion-content overflow-hidden',
], {
  variants: {
    size: {
      default: [
        'border-t border-neutral/20',
        'mt-2 pt-2 pb-4',
      ],
      inline: [
        'border-none',               // No border separator
        'mt-1 pt-1 pb-2',           // Minimal spacing (4px top, 8px bottom)
        'text-sm text-text-lighter', // Match DefinitionList definition style
        'leading-relaxed',           // Match DL line-height
      ],
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
```

### TypeScript Type Updates

```typescript
type Props = VariantProps<typeof accordion> & {
  summary?: string;
  name?: string;
  role?: string;
  defaultOpen?: boolean;
  variant?: 'skill' | 'category' | 'status' | 'default';
  grouped?: boolean;
  position?: 'first' | 'middle' | 'last' | 'only';
  size?: 'default' | 'inline';  // NEW
  class?: string;
};

const {
  summary: summaryText,
  name,
  role,
  defaultOpen = false,
  variant,
  grouped = false,
  position,
  size = 'default',  // NEW with default
  class: className,
} = Astro.props;
```

### Component Invocation

All 4 CVA calls must pass `size` variant:

```diff
- <details class={clsx(accordion({ variant, grouped, position }), className)}>
+ <details class={clsx(accordion({ variant, grouped, position, size }), className)}>

- <summary class={summary()}>
+ <summary class={summary({ size })}>

- <svg class={chevron()}>
+ <svg class={chevron({ size })}>

- <div class={content()}>
+ <div class={content({ size })}>
```

## Content Migration

### Current DefinitionList (statsbomb.mdx:485-505)

```astro
<DefinitionList
  class="mb-6"
  items={[
    {
      term: "Scale Threshold (1000+, not 100)",
      definition: "Separation creates leverage at scale. At 100 collectors, two product managers answered Slack questions faster than building DSLs. At 1000+, manual coordination broke—five people couldn't handle 50+ daily dataspec questions while evolving the spec. Configuration became cheaper than human time."
    },
    {
      term: "Domain Complexity (Tacit Expertise)",
      definition: "Sports analytics, medical diagnosis, legal review—domains where experts have tacit knowledge worth externalizing. The more complex the expertise, the more value in DSLs that let non-engineers express rules."
    },
    {
      term: "Multi-Variant Requirements",
      definition: "Multiple sports, client customization, regional variations. When every customer wants different behavior, configuration prevents maintaining N codebases."
    },
    {
      term: "The Meta-Lesson",
      definition: "More domain knowledge → better problem diagnosis → better architectural decisions → concepts that create value instead of complexity. Context always determines what works."
    }
  ]}
/>
```

### New Inline Accordions

```astro
<div class="space-y-2">
  <Accordion
    size="inline"
    variant="default"
    summary="Scale: 1000+ collectors, not 100"
    defaultOpen={false}
  >
    <Body size="sm" as="p">
      Separation creates leverage at scale. At 100 collectors, two product managers answered Slack questions faster than building DSLs. At 1000+, manual coordination broke—five people couldn't handle 50+ daily dataspec questions while evolving the spec. Configuration became cheaper than human time.
    </Body>
  </Accordion>

  <Accordion
    size="inline"
    variant="default"
    summary="Domain: Tacit expertise worth externalizing"
    defaultOpen={false}
  >
    <Body size="sm" as="p">
      Sports analytics, medical diagnosis, legal review—domains where experts have tacit knowledge worth externalizing. The more complex the expertise, the more value in DSLs that let non-engineers express rules.
    </Body>
  </Accordion>

  <Accordion
    size="inline"
    variant="default"
    summary="Multi-variant: N configurations, not N codebases"
    defaultOpen={false}
  >
    <Body size="sm" as="p">
      Multiple sports, client customization, regional variations. When every customer wants different behavior, configuration prevents maintaining N codebases.
    </Body>
  </Accordion>

  <Accordion
    size="inline"
    variant="default"
    summary="Meta-lesson: Context determines what works"
    defaultOpen={false}
  >
    <Body size="sm" as="p">
      More domain knowledge → better problem diagnosis → better architectural decisions → concepts that create value instead of complexity. Context always determines what works.
    </Body>
  </Accordion>
</div>
```

**Content strategy:**
- Summary: Terse label (20-35 chars) with category prefix ("Scale:", "Domain:", etc.)
- Content: Full definition wrapped in `<Body size="sm">` for semantic sizing
- All collapsed by default → progressive disclosure

## Visual Comparisons

### Before: DefinitionList (Always Visible)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scale Threshold (1000+, not 100)
Separation creates leverage at scale. At 100 collectors,
two product managers answered Slack questions faster than
building DSLs. At 1000+, manual coordination broke...
[16px gap]
Domain Complexity (Tacit Expertise)
Sports analytics, medical diagnosis, legal review—domains
where experts have tacit knowledge worth externalizing...
[16px gap]
Multi-Variant Requirements
Multiple sports, client customization, regional variations...
[16px gap]
The Meta-Lesson
More domain knowledge → better problem diagnosis...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total height: ~400px with all definitions visible
Cognitive load: HIGH (must scan all 4 definitions)
```

### After: Inline Accordions (Collapsed by Default)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scale: 1000+ collectors, not 100 ▼
[8px gap]
Domain: Tacit expertise worth externalizing ▼
[8px gap]
Multi-variant: N configurations, not N codebases ▼
[8px gap]
Meta-lesson: Context determines what works ▼
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total height: ~120px collapsed
Cognitive load: LOW (scan 4 terms, expand relevant ones)

[User clicks "Scale: 1000+ collectors, not 100"]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scale: 1000+ collectors, not 100 ▲
  Separation creates leverage at scale. At 100 collectors,
  two product managers answered Slack questions faster than
  building DSLs. At 1000+, manual coordination broke...
[8px gap]
Domain: Tacit expertise worth externalizing ▼
[8px gap]
Multi-variant: N configurations, not N codebases ▼
[8px gap]
Meta-lesson: Context determines what works ▼
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Progressive disclosure: Only expanded content shown
```

### Side-by-Side Typography Comparison

| Element | DefinitionList | Inline Accordion | Match? |
|---------|---------------|------------------|--------|
| Term font-size | 14px (`text-sm`) | 14px (`text-sm`) | ✅ |
| Term font-weight | 600 (`font-semibold`) | 600 (`font-semibold`) | ✅ |
| Term color | `#0F172A` (`text-text`) | `#0F172A` (`text-text`) | ✅ |
| Definition font-size | 14px (`text-sm`) | 14px (`text-sm`) | ✅ |
| Definition color | `#475569` (`text-text-lighter`) | `#475569` (`text-text-lighter`) | ✅ |
| Definition line-height | 1.625 (`leading-relaxed`) | 1.625 (`leading-relaxed`) | ✅ |
| Horizontal padding | 0 | 0 | ✅ |
| Background | Transparent | Transparent | ✅ |
| Border | None | None | ✅ |

**Verdict:** Inline accordion is typographically identical to DefinitionList, only adding collapsible behavior.

## Implementation Tasks

### Task 1: Update Accordion.astro (5 story points)

**File:** `src/components/Accordion.astro`

1. Add `size` variant to `accordion` CVA definition (lines 28-89)
2. Add `size` variant to `summary` CVA definition (lines 91-98)
3. Add `size` variant to `chevron` CVA definition (lines 100-103)
4. Add `size` variant to `content` CVA definition (lines 105-110)
5. Update TypeScript `Props` type to include `size?: 'default' | 'inline'` (line 112-121)
6. Update prop destructuring to include `size = 'default'` (line 123-132)
7. Update all 4 CVA invocations to pass `size` parameter:
   - Line 146: `accordion({ variant, grouped, position, size })`
   - Line 151: `summary({ size })`
   - Line 160: `chevron({ size })`
   - Line 173: `content({ size })`

**Validation:**
- [ ] Component compiles without TypeScript errors
- [ ] Default size maintains existing visual appearance
- [ ] Inline size renders without padding/borders/background
- [ ] Chevron scales proportionally (14px vs 20px)

### Task 2: Migrate Content in statsbomb.mdx (2 story points)

**File:** `src/pages/portfolio/statsbomb.mdx`

1. Locate "When These Patterns Apply" section (lines 481-506)
2. Replace DefinitionList import usage with inline Accordions
3. Wrap in `<div class="space-y-2">` container for consistent 8px spacing
4. Rewrite 4 items with terse summaries + full content:
   - Scale Threshold → "Scale: 1000+ collectors, not 100"
   - Domain Complexity → "Domain: Tacit expertise worth externalizing"
   - Multi-Variant Requirements → "Multi-variant: N configurations, not N codebases"
   - Meta-Lesson → "Meta-lesson: Context determines what works"
5. Wrap each definition in `<Body size="sm" as="p">` for semantic sizing

**Before (lines 485-505):**
```astro
<DefinitionList
  class="mb-6"
  items={[...]}
/>
```

**After:**
```astro
<div class="space-y-2 mb-6">
  <Accordion size="inline" variant="default" summary="Scale: 1000+ collectors, not 100" defaultOpen={false}>
    <Body size="sm" as="p">Separation creates leverage at scale...</Body>
  </Accordion>
  {/* 3 more accordions */}
</div>
```

**Validation:**
- [ ] Section heading "When These Patterns Apply" unchanged
- [ ] All 4 definitions preserved with full detail
- [ ] Summaries scannable (20-35 chars)
- [ ] Collapsed by default (`defaultOpen={false}`)
- [ ] Visual spacing matches editorial flow

### Task 3: Add Astrobook Story (1 story point)

**File:** `src/pages/design-system/index.astro` (or dedicated story file)

Add example showcasing inline variant:

```astro
<section id="accordion-inline">
  <h3>Accordion - Inline Variant (Progressive Disclosure)</h3>
  <p>Editorial-style collapsible for dense content lists. Matches DefinitionList typography.</p>

  <h4>Single Inline Accordion</h4>
  <Accordion
    size="inline"
    variant="default"
    summary="Scale: 1000+ collectors, not 100"
    defaultOpen={false}
  >
    <Body size="sm" as="p">
      Separation creates leverage at scale. At 100 collectors, two product managers answered Slack questions faster than building DSLs. At 1000+, manual coordination broke.
    </Body>
  </Accordion>

  <h4>Comparison: DefinitionList vs Inline Accordion</h4>
  <div class="grid grid-cols-2 gap-8">
    <div>
      <p class="text-xs text-text-lighter mb-2">DefinitionList (always visible)</p>
      <DefinitionList items={[{
        term: "Scale Threshold",
        definition: "Separation creates leverage at scale..."
      }]} />
    </div>
    <div>
      <p class="text-xs text-text-lighter mb-2">Inline Accordion (progressive disclosure)</p>
      <Accordion size="inline" variant="default" summary="Scale: 1000+ collectors, not 100">
        <Body size="sm" as="p">Separation creates leverage at scale...</Body>
      </Accordion>
    </div>
  </div>

  <h4>Grouped Inline Accordions</h4>
  <div class="space-y-2">
    <Accordion size="inline" variant="default" summary="Scale: 1000+ collectors, not 100">
      <Body size="sm" as="p">Separation creates leverage at scale...</Body>
    </Accordion>
    <Accordion size="inline" variant="default" summary="Domain: Tacit expertise worth externalizing">
      <Body size="sm" as="p">Sports analytics, medical diagnosis, legal review...</Body>
    </Accordion>
    <Accordion size="inline" variant="default" summary="Multi-variant: N configurations">
      <Body size="sm" as="p">Multiple sports, client customization...</Body>
    </Accordion>
  </div>
</section>
```

**Validation:**
- [ ] Story renders on `/design-system` route
- [ ] Side-by-side comparison shows visual equivalence
- [ ] Grouped example demonstrates progressive disclosure

## Accessibility

**Maintained from existing Accordion component:**
- ✅ Native `<details>/<summary>` semantic HTML
- ✅ Keyboard navigation (Space/Enter to toggle)
- ✅ `aria-hidden="true"` on chevron icon
- ✅ `role="region"` on content container
- ✅ Respects `prefers-reduced-motion` (existing script)
- ✅ Works with View Transitions (`data-accordion-init` guard)

**New considerations for inline variant:**
- ✅ Summary text meets WCAG AA contrast (17.56:1 on white background)
- ✅ Chevron size (14px) large enough for touch targets when combined with padding
- ✅ Hover state (`hover:text-text-light`) provides visual feedback

**Testing checklist:**
- [ ] VoiceOver announces summary text correctly
- [ ] Keyboard navigation works (Tab → Space/Enter)
- [ ] Hover state visible and meets 3:1 contrast
- [ ] Animation respects `prefers-reduced-motion`
- [ ] Touch targets ≥44x44px (including padding)

## Success Metrics

**Pre-implementation (DefinitionList):**
- 4 terms + 4 definitions = 400+ words visible
- Vertical height: ~400px
- Time to scan: 20-30 seconds (must read all definitions)

**Post-implementation (Inline Accordions):**
- 4 collapsed summaries = 120 chars visible
- Vertical height: ~120px (collapsed)
- Time to scan: 5-8 seconds (read summaries only)
- Progressive disclosure: Expand 1-2 relevant conditions → 10-15 seconds each

**Expected improvement:**
- **70% reduction in initial cognitive load** (400px → 120px)
- **60% faster scanning** (30s → 8s for overview)
- **Maintains depth**: All 400+ words accessible via expansion

## Related Documentation

- **Accordion Component**: `src/components/Accordion.astro`
- **Grouped Accordion Design**: `docs/plans/2025-10-31-grouped-accordion-design.md`
- **DefinitionList Component**: `src/components/DefinitionList.astro`
- **Typography System**: Project CLAUDE.md (Design System section)
- **Motion System**: `src/utils/animations.ts` (Egyptian easings)

## Notes

**Why not just use `<details>` directly?**
- CVA variants ensure design system consistency
- Existing animation logic (Motion One, golden timing, Egyptian easings)
- Type-safe props prevent drift
- Astrobook documentation for future use cases

**When to use inline vs default Accordion?**
- **Inline**: Dense lists needing progressive disclosure within body content (editorial flow)
- **Default**: Standalone sections with visual separation (cards, FAQs, technical deep dives)
- **Grouped**: Related sections with exclusive expansion (current technical sections in case study)

**Reusability:**
- This pattern applies to any section with 3+ dense items (definitions, principles, lessons)
- Consider for "Lessons" section if it grows beyond 3 items
- Blog posts with technical appendices could use inline accordions for optional details
