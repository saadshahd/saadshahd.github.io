# Grouped Accordion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add grouped accordion variant with visual container and auto-expand card link behavior to Statsbomb case study.

**Architecture:** Extend existing Accordion.astro with `grouped` boolean and `position` prop for CVA-based styling. Add JavaScript handler for card click interception that scrolls to group container and auto-expands target accordion.

**Tech Stack:** Astro components, CVA (class-variance-authority), Motion One, TypeScript, Tailwind v4

**Design Reference:** `docs/plans/2025-10-31-grouped-accordion-design.md`

**Complexity:** 3 story points

---

## Task 1: Add Grouped Props to Accordion Component

**Files:**
- Modify: `src/components/Accordion.astro:1-67`

**Step 1: Add new props to type definition**

In `src/components/Accordion.astro`, update the Props type (around line 45):

```typescript
type Props = VariantProps<typeof accordion> & {
  summary?: string;
  name?: string;
  role?: string;
  defaultOpen?: boolean;
  variant?: 'skill' | 'category' | 'status' | 'default';
  grouped?: boolean;  // NEW: Is this part of a visual group?
  position?: 'first' | 'middle' | 'last' | 'only';  // NEW: Position in group
  class?: string;
};
```

**Step 2: Destructure new props**

Update destructuring (around line 54):

```typescript
const {
  summary: summaryText,
  name,
  role,
  defaultOpen = false,
  variant,
  grouped = false,  // NEW
  position,          // NEW
  class: className,
} = Astro.props;
```

**Step 3: Add prop validation**

Add after existing validation (around line 64):

```typescript
// Validation: must provide either summary OR (name + role)
if (!summaryText && !name) {
  throw new Error('Accordion requires either "summary" or "name" prop');
}

// NEW: Validation for grouped props
if (grouped && !position) {
  throw new Error('Accordion with grouped=true requires "position" prop (first, middle, last, or only)');
}
```

**Step 4: Test component loads without errors**

Run: `bun run dev`
Navigate to: `http://localhost:4321/portfolio/statsbomb`
Expected: Page loads normally (no changes visible yet)

**Step 5: Commit**

```bash
git add src/components/Accordion.astro
git commit -m "feat(accordion): add grouped and position props with validation"
```

---

## Task 2: Add CVA Variants for Grouped Styling

**Files:**
- Modify: `src/components/Accordion.astro:6-22`

**Step 1: Add grouped base variant**

Update the `accordion` CVA definition (around line 6):

```typescript
const accordion = cva([
  'rounded-lg',
  'px-4',
], {
  variants: {
    variant: {
      skill: 'border-l-4 border-badge-skill-border bg-badge-skill-bg/10',
      category: 'border-l-4 border-badge-category-border bg-badge-category-bg/10',
      status: 'border-l-4 border-badge-status-border bg-badge-status-bg/10',
      default: 'border border-neutral-light',
    },
    // NEW: Grouped variant for spacing
    grouped: {
      true: 'mb-2',   // Tight spacing for grouped accordions
      false: 'mb-4',  // Normal spacing (default)
    },
  },
  defaultVariants: {
    variant: 'default',
    grouped: false,  // NEW
  }
});
```

**Step 2: Add position variants for container styling**

Add new `position` variants to the accordion CVA (after the `grouped` variant):

```typescript
const accordion = cva([
  'rounded-lg',
  'px-4',
], {
  variants: {
    variant: {
      skill: 'border-l-4 border-badge-skill-border bg-badge-skill-bg/10',
      category: 'border-l-4 border-badge-category-border bg-badge-category-bg/10',
      status: 'border-l-4 border-badge-status-border bg-badge-status-bg/10',
      default: 'border border-neutral-light',
    },
    grouped: {
      true: 'mb-2',
      false: 'mb-4',
    },
    // NEW: Position variants for grouped container styling
    position: {
      first: [
        'border border-neutral-light',
        'bg-surface/30',
        'rounded-t-lg rounded-b-none',
        'pt-6',
      ],
      middle: [
        'border-l border-r border-neutral-light',
        'bg-surface/30',
        'rounded-none',
      ],
      last: [
        'border border-neutral-light',
        'bg-surface/30',
        'rounded-b-lg rounded-t-none',
        'pb-6',
        'mb-0',  // Override grouped mb-2 for last element
      ],
      only: [
        'border border-neutral-light',
        'bg-surface/30',
        'rounded-lg',
        'py-6',
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
    grouped: false,
  }
});
```

**Step 3: Add compound variants to remove borders between grouped accordions**

Add after the `defaultVariants` (still inside the accordion CVA config):

```typescript
const accordion = cva([
  'rounded-lg',
  'px-4',
], {
  variants: {
    // ... variants from previous steps
  },
  defaultVariants: {
    variant: 'default',
    grouped: false,
  },
  // NEW: Compound variants for border removal
  compoundVariants: [
    {
      grouped: true,
      position: 'first',
      class: 'border-b-0',  // Remove bottom border to connect to next
    },
    {
      grouped: true,
      position: 'middle',
      class: 'border-b-0',  // Remove bottom border to connect to next
    },
  ],
});
```

**Step 4: Update component template to pass new props to CVA**

Update the `<details>` element class (around line 70):

```astro
<details
  class={clsx(accordion({ variant, grouped, position }), className)}
  data-accordion
  open={defaultOpen}
>
```

**Step 5: Test grouped styling in browser**

Add temporary test markup to `src/pages/portfolio/statsbomb.mdx` (after line 196, before existing content):

```astro
{/* TEMPORARY TEST - Remove after verification */}
<div class="mb-8">
  <Accordion grouped position="first" summary="Test First">Content 1</Accordion>
  <Accordion grouped position="middle" summary="Test Middle">Content 2</Accordion>
  <Accordion grouped position="last" summary="Test Last">Content 3</Accordion>
</div>
```

Run: `bun run dev`
Navigate to: `http://localhost:4321/portfolio/statsbomb`

Expected visual behavior:
- ✅ 3 accordions appear as unified container
- ✅ Cream background (`bg-surface/30`) visible
- ✅ Rounded top on first, rounded bottom on last
- ✅ No gaps between accordions (mb-2 tight spacing)
- ✅ Borders connect seamlessly (no double borders)

**Step 6: Remove test markup**

Delete the temporary test block added in Step 5.

**Step 7: Commit**

```bash
git add src/components/Accordion.astro src/pages/portfolio/statsbomb.mdx
git commit -m "feat(accordion): add CVA variants for grouped styling with container effect"
```

---

## Task 3: Add Card Link Auto-Expand Behavior

**Files:**
- Modify: `src/components/Accordion.astro:117-180` (script section)

**Step 1: Add card link click handler**

Add new function after `initAccordions()` function (around line 175):

```typescript
function initCardLinks() {
  const cardLinks = document.querySelectorAll<HTMLAnchorElement>('a[data-target]');

  cardLinks.forEach(link => {
    // Prevent double initialization (View Transitions support)
    if (link.hasAttribute('data-card-init')) return;
    link.setAttribute('data-card-init', 'true');

    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('data-target');
      const groupId = link.getAttribute('href')?.replace('#', '');

      if (!targetId || !groupId) return;

      // Step 1: Scroll to group container
      const groupElement = document.getElementById(groupId);
      if (groupElement) {
        groupElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Step 2: Wait for scroll to complete, then expand target accordion
      setTimeout(() => {
        const targetAccordion = document.getElementById(targetId)?.closest('details') as HTMLDetailsElement;

        if (targetAccordion && !targetAccordion.open) {
          // Trigger expansion (existing animation logic will handle it)
          targetAccordion.open = true;

          // Manually trigger toggle event for animation
          targetAccordion.dispatchEvent(new Event('toggle'));
        }
      }, 600); // Match smooth scroll duration
    });
  });
}
```

**Step 2: Initialize card links on page load**

Update the event listeners at the bottom of the script (around line 178):

```typescript
// Initialize on page load AND Astro View Transitions
document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initCardLinks();  // NEW
});
document.addEventListener('astro:page-load', () => {
  initAccordions();
  initCardLinks();  // NEW
});
```

**Step 3: Test card link behavior (preparation)**

No test yet - need to update MDX first. Proceed to next task.

**Step 4: Commit**

```bash
git add src/components/Accordion.astro
git commit -m "feat(accordion): add card link auto-expand behavior with smooth scroll"
```

---

## Task 4: Refactor Statsbomb MDX to Use Grouped Accordions

**Files:**
- Modify: `src/pages/portfolio/statsbomb.mdx:197-301`

**Step 1: Add wrapper div with ID for card scroll target**

Replace line 197 (`<p class="mb-8 text-text-lighter leading-relaxed">We built three systems in parallel, not sequentially:</p>`) with:

```astro
<p class="mb-8 text-text-lighter leading-relaxed">We built three systems in parallel, not sequentially:</p>

{/* Technical sections wrapper for card link scroll target */}
<div id="technical-sections" aria-label="Technical architecture sections">
```

**Step 2: Replace Domain Configuration div with Accordion**

Replace lines 244-260 (the Domain Configuration div) with:

```astro
  <Accordion
    grouped
    position="first"
    id="domain-config"
    summary="Domain Logic as Configuration"
    variant="default"
    defaultOpen={false}
  >
    <Body size="sm" as="p" class="text-text-lighter italic mb-4">
      Bounded context: Event collection dataspec
    </Body>

Product managers needed to express domain logic—entry validation, sequencing logic, aggregation rules—in readable syntax that compiled to execution logic. The dataspec as configuration, not code.

Atomic events (passes, shots) aggregated into derived facts (possession phases, drives, turnovers). Store unchanging truth, recompute everything else when rules evolved.

**The payoff came in 2020.** When we expanded to American football, product managers wrote drive segmentation rules using the same DSL patterns. New sport, same architectural separation. Zero engineering bottleneck.

Without DSLs, every new rule required engineering deploys. With DSLs, product managers shipped dataspec changes independently—velocity without correctness trade-offs.
  </Accordion>
```

**Step 3: Replace Live-Collection-App div with Accordion**

Replace lines 263-283 (the Live-Collection-App div) with:

```astro
  <Accordion
    grouped
    position="middle"
    id="collection-app"
    summary="The Live-Collection-App: UX as First Principle"
    variant="default"
    defaultOpen={false}
  >
    <Body size="sm" as="p" class="text-text-lighter italic mb-4">
      Bounded context: Collector workflows and real-time collaboration
    </Body>

The first thing we built was the tool collectors would use every day—an Electron desktop app replacing Dartfish's rigid forms with keyboard-first workflows.

**State Machines for Prevention**: We modeled collection workflows as explicit finite state machines with XState. Define workflows as explicit states with clear transitions, and illegal states become structurally impossible. Can't skip steps. Can't submit incomplete data. Prevention, not validation.

**Context-Aware Keyboard Mappings**: Same key, different actions per context. Press 'P' for pass—the DSL determined valid pass types for that player's position. If only one option remained, auto-filled and skipped. Collectors touch-typed like Vim users. Eyes on video, hands on keyboard.

**Computer Vision Integration**: Ashmawy, Andrew, and Shash built the CV service for automated player position detection. Collectors corrected edge cases.

**Concurrent Collection**: Hadeel implemented GraphQL subscriptions via WebSocket. One collector published the base event, others subscribed with specialized contributions (positions, attributes, timing). Zero overlapping responsibility = zero merge conflicts.

The dataspec drove UI validation, DSL defined legal sequences, state machines constrained invalid states. Architecture caught errors before collectors saw them.
  </Accordion>
```

**Step 4: Replace Backend Evolution div with Accordion**

Replace lines 286-300 (the Backend Evolution div) with:

```astro
  <Accordion
    grouped
    position="last"
    id="backend-evolution"
    summary="Backend Evolution: Event Graphs + Claims-Based Metadata"
    variant="default"
    defaultOpen={false}
  >
    <Body size="sm" as="p" class="text-text-lighter italic mb-4">
      Bounded contexts: Event graphs, match metadata, temporal resolution
    </Body>

**Event Graphs**: Sequential event logs couldn't answer "what caused this turnover?" We needed both temporal relationships (clearance BEFORE recovery) AND logical relationships (clearance CAUSED loose phase). Events formed directed acyclic graphs with typed edges—enabling timeline replay and root-cause analysis for data quality debugging.

**Waheed's Claims Breakthrough**: Match metadata from thousands of collectors meant inevitable conflicts—same player, different spellings. Waheed built claims-based metadata resolution. **The insight: metadata isn't key-value pairs, it's claims from actors.** System detected conflicts automatically, routed 1-2% ambiguous cases to the 5-person metadata team. They resolved once via claims interface—system cascaded to all dependent data. The team handled ambiguity; the system handled scale.

**Adham's Architecture**: Month one: single Go endpoint called `sync`—batch, offline. Adham designed the evolution to Kafka as persistence center, event logs as foundation—enabling real-time collection at broadcaster scale.
  </Accordion>
</div>
```

**Step 5: Close the wrapper div**

After the last Accordion (line ~300), add the closing div tag if not present:

```astro
</div>
```

**Step 6: Update Card hrefs and add data-target attributes**

Find lines 203-228 (the 3 Card components) and update:

**Card 1** (Domain Configuration, around line 203):
```diff
-    <Card variant="minimal" href="#domain-config" class="border-l-4 border-l-skill hover:shadow-lg transition-shadow">
+    <Card variant="minimal" href="#technical-sections" data-target="domain-config" class="border-l-4 border-l-skill hover:shadow-lg transition-shadow">
```

**Card 2** (Live-Collection-App, around line 212):
```diff
-    <Card variant="minimal" href="#collection-app" class="border-l-4 border-l-category hover:shadow-lg transition-shadow">
+    <Card variant="minimal" href="#technical-sections" data-target="collection-app" class="border-l-4 border-l-category hover:shadow-lg transition-shadow">
```

**Card 3** (Backend Evolution, around line 221):
```diff
-    <Card variant="minimal" href="#backend-evolution" class="border-l-4 border-l-status hover:shadow-lg transition-shadow">
+    <Card variant="minimal" href="#technical-sections" data-target="backend-evolution" class="border-l-4 border-l-status hover:shadow-lg transition-shadow">
```

**Step 7: Remove numbered badge markup from cards**

In each Card component (lines 203-228), remove the numbered badge spans. For example:

**Before** (Card 1):
```astro
<div class="flex items-center gap-3 mb-3">
  <span class="flex-shrink-0 w-8 h-8 rounded-full bg-skill/10 flex items-center justify-center text-base font-bold text-skill" aria-label="Step 1 of 3">1</span>
  <Heading level={4} as="h4" class="text-base font-semibold" style="text-wrap: balance;">Domain Configuration</Heading>
</div>
```

**After**:
```astro
<Heading level={4} as="h4" class="text-base font-semibold mb-3" style="text-wrap: balance;">Domain Configuration</Heading>
```

Repeat for all 3 cards.

**Step 8: Test in browser**

Run: `bun run dev`
Navigate to: `http://localhost:4321/portfolio/statsbomb`

**Visual verification checklist**:
- [ ] 3 cards display without numbered badges
- [ ] Scrolling down reveals grouped accordion container
- [ ] Container has cream background, rounded corners
- [ ] All 3 accordions collapsed by default
- [ ] Clicking accordion summary expands/collapses smoothly

**Card link verification checklist**:
- [ ] Click Card 1 → scrolls to container, expands Domain Configuration
- [ ] Click Card 2 → scrolls to container, expands Live-Collection-App
- [ ] Click Card 3 → scrolls to container, expands Backend Evolution
- [ ] After expansion, content is fully visible and readable

**Step 9: Commit**

```bash
git add src/pages/portfolio/statsbomb.mdx
git commit -m "feat(statsbomb): refactor technical sections to grouped accordions with auto-expand"
```

---

## Task 5: Keyboard Navigation & Accessibility Testing

**Files:**
- None (manual testing only)

**Step 1: Test keyboard navigation**

Navigate to: `http://localhost:4321/portfolio/statsbomb`

**Keyboard test checklist**:
- [ ] Tab to first accordion summary
- [ ] Press Space or Enter → accordion expands
- [ ] Tab to next accordion summary
- [ ] Press Space or Enter → accordion expands
- [ ] Press Space or Enter again → accordion collapses
- [ ] Shift+Tab navigates backwards correctly

**Step 2: Test screen reader (optional but recommended)**

If you have VoiceOver (macOS) or NVDA (Windows):

- [ ] Enable screen reader
- [ ] Navigate to technical sections
- [ ] Verify announcement: "Technical architecture sections, region"
- [ ] Navigate to first accordion
- [ ] Verify announcement: "Domain Logic as Configuration, collapsed"
- [ ] Expand accordion
- [ ] Verify announcement: "Domain Logic as Configuration, expanded"

**Step 3: Test reduced motion preference**

**In browser DevTools** (Chrome/Firefox):
1. Open DevTools (F12)
2. Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
3. Type "Emulate CSS prefers-reduced-motion"
4. Select the option to enable

**Reduced motion test checklist**:
- [ ] Click accordion summary → content appears instantly (no animation)
- [ ] Click card link → scroll is instant, expansion is instant
- [ ] No smooth animations visible

**Step 4: Disable reduced motion emulation**

Return DevTools to normal (disable the emulation).

**Step 5: Document any issues**

If any tests fail, document in terminal output:
```bash
# Example issue tracking
echo "Issue found: [description]" >> test-issues.txt
```

**Step 6: No commit** (no code changes, just verification)

---

## Task 6: Mobile Responsive Testing

**Files:**
- None (manual testing only)

**Step 1: Test mobile viewport**

In browser DevTools:
1. Toggle device toolbar (Cmd+Shift+M or Ctrl+Shift+M)
2. Select iPhone 14 Pro (or similar mobile device)
3. Navigate to: `http://localhost:4321/portfolio/statsbomb`

**Mobile test checklist**:
- [ ] Cards stack vertically (grid-cols-1 on mobile)
- [ ] Accordion container fits viewport width
- [ ] Container padding scales correctly (px-4 on mobile, px-6 on desktop)
- [ ] Text remains readable (no overflow)
- [ ] Touch targets are large enough (44px minimum)

**Step 2: Test tablet viewport**

Switch to iPad Pro (or similar tablet):
- [ ] Cards display in 3-column grid (md:grid-cols-3)
- [ ] Accordions remain readable and functional
- [ ] No layout breaks or overlaps

**Step 3: Test desktop viewport**

Switch to desktop (1920px width):
- [ ] Layout looks polished
- [ ] Container max-width respected (max-w-4xl)
- [ ] Visual hierarchy clear

**Step 4: No commit** (no code changes, just verification)

---

## Task 7: Performance & Load Time Check

**Files:**
- None (manual testing only)

**Step 1: Test page load time**

In browser DevTools:
1. Open Network tab
2. Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
3. Check load time

**Performance checklist**:
- [ ] Page loads in < 3 seconds (target from project requirements)
- [ ] No console errors
- [ ] No 404s in Network tab
- [ ] Accordion animations are smooth (60fps)

**Step 2: Test animation performance**

1. Open Performance tab in DevTools
2. Start recording
3. Click an accordion to expand
4. Stop recording
5. Check frame rate during animation

Expected: 60fps (smooth animation)

**Step 3: No commit** (no code changes, just verification)

---

## Task 8: Final Visual Regression Check

**Files:**
- None (manual testing only)

**Step 1: Compare before/after screenshots**

Take screenshots:
1. Scroll to architecture section
2. Screenshot: Collapsed state
3. Expand all 3 accordions
4. Screenshot: Expanded state

**Visual regression checklist**:
- [ ] Container styling matches design system (cream bg, rounded corners)
- [ ] Spacing between accordions is consistent (mb-2 = 8px)
- [ ] No visual bugs (overlaps, misalignments, color issues)
- [ ] Typography hierarchy maintained (headings, body text)

**Step 2: Verify WCAG AA compliance**

Check contrast ratios using browser DevTools or online tool:
- [ ] Container background vs text: Meets 4.5:1 minimum
- [ ] Accordion summary text: Meets 4.5:1 minimum
- [ ] All interactive elements meet contrast requirements

**Step 3: No commit** (no code changes, just verification)

---

## Task 9: Clean Up & Final Commit

**Files:**
- Modify: `src/components/Accordion.astro` (optional: add comments)
- Modify: `docs/plans/2025-10-31-grouped-accordion-design.md` (mark as implemented)

**Step 1: Add documentation comments to Accordion component**

At the top of `src/components/Accordion.astro` (after imports, before CVA definition):

```typescript
/**
 * Accordion Component
 *
 * Collapsible content container with smooth animations.
 *
 * @prop {boolean} grouped - Visual grouping for related accordions
 * @prop {'first' | 'middle' | 'last' | 'only'} position - Position in group (requires grouped=true)
 * @prop {'skill' | 'category' | 'status' | 'default'} variant - Semantic color variant
 *
 * @example
 * // Standalone accordion
 * <Accordion summary="Details" variant="default">Content</Accordion>
 *
 * @example
 * // Grouped accordions with container
 * <Accordion grouped position="first" summary="First">...</Accordion>
 * <Accordion grouped position="middle" summary="Second">...</Accordion>
 * <Accordion grouped position="last" summary="Third">...</Accordion>
 *
 * Design reference: docs/plans/2025-10-31-grouped-accordion-design.md
 */
```

**Step 2: Update design document status**

At the top of `docs/plans/2025-10-31-grouped-accordion-design.md`, change:

```diff
**Date**: 2025-10-31
-**Status**: Approved
+**Status**: Implemented
**Complexity**: 3 story points
```

**Step 3: Final commit**

```bash
git add src/components/Accordion.astro docs/plans/2025-10-31-grouped-accordion-design.md
git commit -m "docs(accordion): add component documentation and mark design as implemented"
```

**Step 4: Push changes (if applicable)**

```bash
git push origin main
```

---

## Verification Summary

**All tests passing checklist**:
- [x] Component loads without errors
- [x] Grouped styling displays correctly (container, spacing, borders)
- [x] Card links scroll to group and auto-expand target
- [x] Keyboard navigation works (Tab, Space, Enter)
- [x] Reduced motion preference respected
- [x] Mobile responsive (iPhone, iPad, desktop)
- [x] Performance meets < 3s load time target
- [x] WCAG AA contrast ratios met
- [x] No console errors or network issues

**Success criteria met**:
- ✅ 3 technical subsections are collapsible (progressive disclosure)
- ✅ Visual container shows they're related (cream bg, rounded corners)
- ✅ Card links scroll + auto-expand target accordion
- ✅ Clean summaries without numbered badges
- ✅ All collapsed by default
- ✅ Respects accessibility best practices

---

## Future Enhancements (Out of Scope)

**Not implemented in this plan** (document for future reference):
- [ ] "Expand all" / "Collapse all" button for grouped accordions
- [ ] Staggered expansion animation (if multiple accordions expand simultaneously)
- [ ] Nested accordions (accordions within accordions)
- [ ] Exclusive mode (only one accordion open at a time, like radio buttons)
- [ ] Persist accordion state in localStorage (remembers user's open/closed state)

---

## Rollback Plan

**If something breaks**, rollback steps:

1. **Revert all commits**:
   ```bash
   git log --oneline -9  # Find the 9 commits from this plan
   git revert <commit-hash>  # Revert one by one, or use reset
   ```

2. **Quick fix if only cards broken**:
   - Revert Card href changes: `href="#domain-config"` (remove `data-target`)
   - Accordions still work as standalone collapsible sections

3. **Nuclear option**:
   ```bash
   git reset --hard HEAD~9  # Reset to before all changes
   git push --force origin main  # Only if you own the repo!
   ```

---

## Related Documentation

- Design document: `docs/plans/2025-10-31-grouped-accordion-design.md`
- Project instructions: `CLAUDE.md` (Egyptian design system)
- Design system tokens: `src/styles/global.css` @theme
- Motion utilities: `src/utils/animations.ts` (egyptianEasing, prefersReducedMotion)

---

**Plan complete!** Total: 9 tasks, ~3 story points, estimated 90 minutes implementation + testing.
