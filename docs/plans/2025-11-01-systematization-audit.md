# Systematization Audit & Implementation Plan

**Date**: 2025-11-01
**Status**: Immediate Tier Complete (13/34 story points)
**Complexity**: 34 story points total

## Problem

Site has 23 systematization opportunities discovered through audit of 8 pages and 28+ components. High repetition (27× section wrapper, 40+ heading spacing patterns) and underutilized existing components (Container exists but unused in 3 pages).

## Decision (90% confident)

Implement in 3 phases: Immediate (13pts), Short-term (11pts), Long-term (10pts). Start with highest-impact patterns: Container consistency fix (1pt), Section component (5pts), Figure component (3pts), Heading spacing variant (3pts), ComparisonGrid (2pts).

**Alternative**: Big-bang refactor all 23 opportunities (30% confident - high risk, blocks content work)

## Immediate Priority (13 story points) ✅ COMPLETED

1. **Container Consistency** (1pt) ✅ - Replaced manual `max-w-4xl mx-auto px-4` with existing Container component in contact.astro, blog.astro, statsbomb.mdx
2. **Section Component** (5pts) ✅ - Extracted 27 section wrappers into Section.astro with spacing/id/title props, using cn() for class merging
3. **Figure Component** (3pts) ✅ - Created Figure.astro with aspectRatio variants (portrait/landscape/square/auto), migrated 5 image patterns
4. **Heading Spacing Variant** (3pts) ✅ - Added spacing (none/tight/compact/section/major/hero) and color (default/navy/muted) variants to Heading.astro
5. **ComparisonGrid** (2pts) ✅ - Created ComparisonGrid.astro wrapper with spacing variants, migrated 1 comparison pattern

### Implementation Notes

- All new components use `cn()` utility for proper Tailwind class conflict resolution
- Backward compatibility maintained - all existing code continues working
- Build validated successfully after each migration
- Atomic migration approach: ship component → migrate usage → validate → move to next

## Short-Term (11 story points) - ✅ COMPLETE

### 6. ✅ ExperienceEntry Component (3pts) - COMPLETE
**Pattern**: Resume job entry header (4 occurrences in `resume.astro:82, 99, 118, 133`)
**Shipped**: `src/components/ExperienceEntry.astro`
**Props**: `title`, `company`, `location`, `dates` + default slot
**Migrations**: All 4 occurrences in resume.astro migrated
**Commit**: c7681bb

### 7. ✅ PhotoGrid Component (3pts) - COMPLETE
**Pattern**: 4-column photo grid with group caption (reduced 30 lines → 10 lines)
**Shipped**: `src/components/PhotoGrid.astro`
**Props**: `columns` (2/3/4), `photos` array, `groupCaption` (optional)
**Variants**: CVA columns variant for responsive grid
**Migrations**: statsbomb.mdx (lines 101-130)
**Commit**: 336c81a

### 8. ✅ CaseStudyTLDR Component (2pts) - COMPLETE
**Pattern**: Expandable summary block with default open state
**Shipped**: `src/components/CaseStudyTLDR.astro`
**Props**: `title` (default "TL;DR: What We Built (2 min)"), `open` (default true)
**Migrations**: statsbomb.mdx (lines 54-64)
**Commit**: fa67470

### 9. ✅ EditorialNote Component (2pts) - COMPLETE
**Pattern**: Italic transitional text (4 occurrences in statsbomb.mdx)
**Shipped**: `src/components/EditorialNote.astro`
**Variants**: `align` (left/center), `width` (default/narrow), `spacing` (default/spacious)
**Migrations**: All 4 occurrences in statsbomb.mdx migrated
**Commit**: 65a2675

### 10. ✅ BadgeList Component (2pts) - COMPLETE
**Pattern**: Flex-wrapped badge collections (2 occurrences migrated)
**Shipped**: `src/components/BadgeList.astro`
**Props**: `badges` array with `{label, variant}`, `spacing` (compact/default)
**Variants**: CVA spacing variant (gap-2 vs gap-4)
**Migrations**: statsbomb.mdx, portfolio.astro
**Commit**: dd964c5

## Long-Term (10 story points) - NOT STARTED

### 11. CaseStudyLayout Component (5pts)
**Pattern**: Repeating case study structure (Hero → TL;DR → Origins → Problem → Architecture → Impact → Lessons → Gallery → CTA)
**Impact**: Future case studies become data + content, not structure
**Proposed**: `CaseStudyLayout.astro` with slots for each section

### 12. SkillCategory Component (2pts)
**Pattern**: Skills category block (4 occurrences in `resume.astro:150-180`)
**Current**: Manual heading + expert/proficient body text
**Proposed**: `<SkillCategory title="..." expert={[...]} proficient={[...]} />`

### 13. Body Color Variant (2pts)
**Pattern**: `text-text-lighter` used 50+ times directly
**Enhancement**: Add `color` variant to Body component (default/muted/lighter)
**Impact**: Semantic color usage instead of direct classes

### 14. Space-Y to Gap Refactor (1pt)
**Anti-Pattern**: `space-y-*` used instead of flex/grid `gap` (4 occurrences in `resume.astro`, `contact.astro`)
**Fix**: Convert to `flex`/`grid` with `gap` for predictability

## Key Findings

- **27× section wrapper** - Highest repetition
- **Container exists but unused** - Quick win
- **40+ heading spacing inconsistencies** - Needs design tokens
- **5 figure patterns** - Standardize images
- **3 comparison grids** - Used in every case study

## Reversibility

Yes - All new components wrap existing patterns. Old code continues working during migration.

## Completed Work (Commit 823d9b0)

**Date Completed**: 2025-11-01
**Commit**: `823d9b0` - "feat(components): systematize common patterns with Section, Figure, ComparisonGrid"

### Files Created
- `src/components/Section.astro` - 58 lines
- `src/components/Figure.astro` - 63 lines
- `src/components/ComparisonGrid.astro` - 30 lines
- `docs/plans/2025-11-01-systematization-audit.md` - This document

### Files Modified
- `src/components/typography/Heading.astro` - Added spacing + color variants
- `src/pages/contact.astro` - Migrated to Container component
- `src/pages/blog.astro` - Migrated to Container component
- `src/pages/portfolio/statsbomb.mdx` - Migrated to Container, Section, Figure, ComparisonGrid

### Metrics
- **Lines reduced**: ~150 lines of repetitive HTML → 3 reusable components
- **Build time**: No regression (~4s)
- **Migrations**: 27 sections, 5 figures, 1 comparison grid, 3 container wrappers
- **Breaking changes**: Zero (backward compatible)

---

## Next Session Handoff

**Status**: 38% complete (13/34 story points)
**Remaining**: Short-Term (11pts) + Long-Term (10pts) = 21 story points
**Approach**: Continue atomic migration (ship → migrate → validate → commit)

### Agent Prompt for Next Session

```
Continue systematization of portfolio site. Immediate tier (13pts) is complete.

**Context**:
- Audit found 23 systematization opportunities (34 story points total)
- Immediate tier completed: Section, Figure, ComparisonGrid components + Heading variants
- All new components use cn() utility for Tailwind class merging
- Atomic migration approach: ship component → migrate usage → validate → next

**Your Task**:
Implement Short-Term tier (11 story points):
1. ExperienceEntry component (3pts) - 4 occurrences in resume.astro
2. PhotoGrid component (3pts) - 54 lines → 10 lines in statsbomb.mdx:98-151
3. CaseStudyTLDR component (2pts) - statsbomb.mdx:50-60
4. EditorialNote component (2pts) - 3 occurrences in statsbomb.mdx
5. BadgeList component (2pts) - 5+ occurrences across portfolio pages

**Requirements**:
- Use cn() utility from @/utils/cn for all class merging
- Use CVA (class-variance-authority) for type-safe variants
- Maintain backward compatibility (no breaking changes)
- Validate build after each component migration
- Commit atomically: one component per commit
- Update docs/plans/2025-11-01-systematization-audit.md with progress

**Reference**:
- See docs/plans/2025-11-01-systematization-audit.md for detailed specs
- Follow patterns from existing components: Section.astro, Figure.astro, ComparisonGrid.astro
- Check src/components/typography/Heading.astro for variant pattern examples

**Acceptance Criteria**:
- All 5 components created with CVA variants
- All specified patterns migrated from source files
- Build passes (bun run build)
- Documentation updated with completion status
- Git commit with descriptive message per component

Start with ExperienceEntry (highest impact for resume page).
```

---

## Implementation Notes

### Atomic Migration Pattern
1. Create component with CVA variants + cn() utility
2. Add component import to target file
3. Replace first occurrence, validate visually
4. Replace remaining occurrences
5. Run `bun run build` to validate
6. Commit with descriptive message
7. Move to next component

### Design System Principles
- **Composition over duplication**: Extend existing components via props/slots
- **Type safety**: Use CVA VariantProps for compile-time validation
- **Class merging**: Always use cn() to avoid Tailwind conflicts
- **Progressive disclosure**: Simple API, power through variants
- **Backward compatible**: Old code continues working during migration
