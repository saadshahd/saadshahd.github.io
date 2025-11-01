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

## Short-Term (11 story points)

6. ExperienceEntry (3pts), PhotoGrid (3pts), CaseStudyTLDR (2pts), EditorialNote (2pts), BadgeList (2pts)

## Long-Term (10 story points)

7. CaseStudyLayout (5pts), SkillCategory (2pts), Color variants (2pts), Space-Y refactor (1pt)

## Key Findings

- **27× section wrapper** - Highest repetition
- **Container exists but unused** - Quick win
- **40+ heading spacing inconsistencies** - Needs design tokens
- **5 figure patterns** - Standardize images
- **3 comparison grids** - Used in every case study

## Reversibility

Yes - All new components wrap existing patterns. Old code continues working during migration.

## Implementation

Execute Immediate tier (13pts) in order: Container fix → Section → Figure → Heading → ComparisonGrid. Each component ships independently, no big-bang refactor.
