# Grouped Accordion Design

**Date**: 2025-10-31
**Status**: Implemented
**Complexity**: 3 story points
**Context**: Statsbomb case study architecture section needs collapsible technical subsections with visual grouping

---

## Problem

The Statsbomb case study has 3 technical subsections (Domain Configuration, Live-Collection-App, Backend Evolution) that are currently always-visible narrative divs. Users want:

1. Progressive disclosure (collapsed by default)
2. Visual indication these 3 sections are related
3. Card links that scroll to the group AND auto-expand the clicked section
4. Clean presentation without numbered badges

**Current structure**: 3 narrative `<div>` elements with numbered badge headers (lines 244-300 in statsbomb.mdx)

---

## Design Decision

**Approach**: Enhanced Accordion component with `grouped` prop and `position` prop.

**Why this over alternatives**:
- **vs. AccordionGroup wrapper**: Simpler - no new component, just extend existing Accordion
- **vs. Hybrid approach**: More cohesive - styling decisions live in one component, not split across wrapper + variant
- **Confidence**: 90% (proven pattern, declarative API, follows CVA structure)

---

## Component Architecture

### New Props

```typescript
type Props = {
  // ... existing props
  grouped?: boolean;           // Is this part of a visual group?
  position?: 'first' | 'middle' | 'last' | 'only';  // Position in group sequence
}
```

### CVA Variants

**Base accordion** (when `grouped={true}`):
```typescript
// Add to accordion CVA
grouped: {
  true: 'mb-2',  // Tight spacing between grouped accordions
  false: 'mb-4', // Normal spacing (current behavior)
}
```

**Position variants** (when `grouped={true}`):
```typescript
position: {
  first: [
    'border border-neutral-light',
    'bg-surface/30',
    'rounded-t-lg',
    'pt-6 px-6',
    'rounded-b-none', // Remove bottom radius - connects to next
  ],
  middle: [
    'border-l border-r border-neutral-light',
    'bg-surface/30',
    'rounded-none', // No radius - sandwiched between siblings
    'px-6',
  ],
  last: [
    'border border-neutral-light',
    'bg-surface/30',
    'rounded-b-lg',
    'rounded-t-none', // Remove top radius - connects to previous
    'pb-6 px-6',
    'mb-0', // No bottom margin - container provides spacing
  ],
  only: [
    'border border-neutral-light',
    'bg-surface/30',
    'rounded-lg',
    'p-6',
  ],
}
```

**Compound variants**:
```typescript
compoundVariants: [
  {
    grouped: true,
    position: 'first',
    class: 'border-b-0', // Remove border between connected accordions
  },
  {
    grouped: true,
    position: 'middle',
    class: 'border-b-0',
  },
]
```

---

## Visual Design

### Container Styling

**Purpose**: Show 3 accordions are semantically related without heavy visual weight.

**Approach**: Shared background + border creates subtle container effect:
- Background: `bg-surface/30` (30% limestone cream - subtle tint)
- Border: `border-neutral-light` (existing token, WCAG AA safe)
- Spacing: `pt-6` on first, `pb-6` on last (24px vertical padding total)
- Horizontal: `px-6` on all (consistent 24px sides)

**Why this works**:
- Cream tint differentiates from white page background
- Rounded corners on first/last create capsule container effect
- Border provides clear boundary without visual heaviness
- Respects Egyptian design system color palette

### Accordion Spacing

**Normal accordions**: `mb-4` (16px gap)
**Grouped accordions**: `mb-2` (8px gap between siblings)
**Last in group**: `mb-0` (container padding provides spacing)

**Rationale**: Tighter spacing (8px vs 16px) signals visual relationship. Container padding maintains overall rhythm.

---

## Card Link Behavior

### Current State
Cards use standard anchor links:
```astro
<Card href="#domain-config">Domain Configuration</Card>
```

### Enhanced Behavior

**Option 1: Scroll to group wrapper, then expand target** (Recommended)

Update cards to point to group container + target:
```astro
<Card href="#technical-sections" data-target="domain-config">
  Domain Configuration
</Card>
```

JavaScript handler:
1. Intercept clicks on cards with `data-target`
2. Scroll to `#technical-sections` (smooth scroll to group)
3. Find accordion with `id={data-target}`
4. If accordion closed, set `.open = true`
5. Motion One animates expansion (existing logic)

**Graceful degradation**: If JS disabled, falls back to anchor scroll to group.

**Option 2: Keep href="#domain-config", detect parent group** (Alternative)

Cards keep direct anchor links. JavaScript:
1. Detects when user navigates to `#domain-config`
2. Scrolls to parent container first
3. Then triggers accordion expansion

**Decision**: Option 1 (explicit `data-target` is clearer intent)

---

## MDX Usage Pattern

### In statsbomb.mdx

Replace 3 narrative divs (lines 244-300) with:

```astro
{/* Wrapper for card link scroll target + accessibility */}
<div id="technical-sections" aria-label="Technical architecture sections">
  <Accordion
    grouped
    position="first"
    id="domain-config"
    summary="Domain Logic as Configuration"
    variant="default"
    defaultOpen={false}
  >
    <Body size="sm" as="p" class="text-text-lighter italic">
      Bounded context: Event collection dataspec
    </Body>

    <p>Product managers needed to express domain logic...</p>
    {/* Rest of content from lines 253-260 */}
  </Accordion>

  <Accordion
    grouped
    position="middle"
    id="collection-app"
    summary="The Live-Collection-App: UX as First Principle"
    variant="default"
    defaultOpen={false}
  >
    <Body size="sm" as="p" class="text-text-lighter italic">
      Bounded context: Collector workflows and real-time collaboration
    </Body>

    <p>The first thing we built was the tool collectors would use every day...</p>
    {/* Rest of content from lines 272-283 */}
  </Accordion>

  <Accordion
    grouped
    position="last"
    id="backend-evolution"
    summary="Backend Evolution: Event Graphs + Claims-Based Metadata"
    variant="default"
    defaultOpen={false}
  >
    <Body size="sm" as="p" class="text-text-lighter italic">
      Bounded contexts: Event graphs, match metadata, temporal resolution
    </Body>

    <p>**Event Graphs**: Sequential event logs couldn't answer...</p>
    {/* Rest of content from lines 295-300 */}
  </Accordion>
</div>
```

### Update Card Links (lines 203-228)

```diff
- <Card variant="minimal" href="#domain-config" class="...">
+ <Card variant="minimal" href="#technical-sections" data-target="domain-config" class="...">
```

**Key changes**:
- Remove numbered badge markup (user preference - cleaner summaries)
- Keep semantic variant colors via border-l
- All collapsed by default (progressive disclosure)
- Wrapper div provides scroll target + ARIA label

---

## Accessibility

### Screen Reader Experience

**Container announcement**:
```html
<div aria-label="Technical architecture sections">
  <!-- Screen reader: "Technical architecture sections, region" -->
</div>
```

**Accordion navigation**:
- Native `<details>` keyboard support (Space/Enter to toggle)
- Each summary announces: "Domain Logic as Configuration, collapsed"
- Content revealed on expansion

### Motion Preferences

**Already implemented** in Accordion.astro:
```typescript
if (prefersReducedMotion()) {
  // Skip animation, apply final state instantly
  return;
}
```

**Auto-expansion animation**:
- User clicks card → scroll to group (smooth, 0.6s)
- Then expand accordion (0.4s, egyptianEasing.water)
- **No stagger** (user explicitly clicked one section, instant feedback)

---

## Implementation Checklist

**Accordion.astro changes**:
- [ ] Add `grouped` and `position` props to type definition
- [ ] Add CVA variants for grouped styling
- [ ] Add compound variants for border removal
- [ ] Update prop validation (position requires grouped)

**Card link behavior**:
- [ ] Add `data-target` attribute to 3 architecture cards
- [ ] Update hrefs from `#domain-config` to `#technical-sections`
- [ ] Write JavaScript handler for card click interception
- [ ] Test graceful degradation (JS disabled)

**Statsbomb.mdx refactor**:
- [ ] Wrap 3 sections in `<div id="technical-sections">`
- [ ] Convert 3 narrative divs to Accordion components
- [ ] Remove numbered badge markup
- [ ] Verify content preserved (no copy loss)

**Testing**:
- [ ] Visual regression (container styling matches design system)
- [ ] Keyboard navigation (Tab/Space/Enter on accordions)
- [ ] Card link scroll + auto-expand behavior
- [ ] Reduced motion preference (instant state changes)
- [ ] Mobile responsive (container padding scales correctly)

---

## Edge Cases

**What if only 2 accordions in a group?**
- First: rounded-t, no rounded-b
- Last: rounded-b, no rounded-t
- Position prop handles this automatically

**What if `position="only"` is used?**
- Applies full rounded corners + padding
- Use case: Single accordion with grouped styling

**What if user directly navigates to `#domain-config`?**
- Standard anchor scroll works (no JS interception)
- Accordion remains collapsed (user can expand manually)
- Alternative: Add scroll listener to detect anchor navigation and auto-expand

**What if accordions have different heights?**
- Container expands naturally (no fixed height)
- Background fills dynamically as accordions expand

---

## Success Criteria

**Visual**:
- [ ] 3 accordions appear as unified container
- [ ] Cream background differentiates from page
- [ ] Collapsed state shows clean summaries
- [ ] Expanded state reveals full content

**Interaction**:
- [ ] Cards scroll to group and expand target
- [ ] Keyboard navigation works natively
- [ ] Motion respects user preferences

**Content**:
- [ ] All original narrative content preserved
- [ ] Reading flow improved (progressive disclosure)
- [ ] Long-form case study feels less overwhelming

---

## Future Extensions

**Potential new variants**:
- `variant="nested"`: Accordions inside accordions (deeper hierarchy)
- `variant="exclusive"`: Only one accordion open at a time (radio behavior)

**Potential animation enhancements**:
- Scroll to group with ViewTimeline API (scroll-linked animation)
- Stagger expand all 3 sections sequentially (for "expand all" button)

**Not in scope for MVP**: Keep focused on single use case (Statsbomb technical sections).

---

## References

**Design system**: `src/styles/global.css` @theme tokens
**Existing component**: `src/components/Accordion.astro`
**Usage context**: `src/pages/portfolio/statsbomb.mdx` lines 186-301
**Related docs**: `docs/plans/2025-10-30-diagram-design-system.md` (color palette decisions)
