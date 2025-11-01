# Statsbomb Technical Appendix - Future Work

**Date:** 2025-10-31
**Status:** Future enhancement (not started)
**Complexity:** 5 story points (moderate)
**Priority:** Lower than blog infrastructure or additional case studies

---

## Purpose

Deep technical companion to the Statsbomb case study for engineers interested in implementation details.

**Target audience:** Engineers who want to see HOW we implemented the architectural patterns described in the main case study.

---

## Intended Content

### 1. ANTLR Grammar Evolution
- DSL syntax design decisions
- Parser patterns for domain rules
- How we evolved the grammar over time without breaking existing dataspecs

### 2. XState Configuration
- State machine design patterns
- Transition logic for collection workflows
- How we prevented illegal states structurally

### 3. Functional Pipelines
- Claims-based metadata resolution implementation
- Event graph traversal algorithms
- Temporal dependency resolution

### 4. Complete Code Examples
- Annotated code samples showing key patterns
- Before/after comparisons of refactorings
- Production-tested snippets engineers can reference

---

## Why Not Now?

1. **Main case study is complete** — The architectural narrative stands alone and tells the complete story
2. **Different narrative style required** — Code-first vs story-first writing needs separate focus
3. **Ship complete work first** — Better to publish polished case study, add appendix as enhancement
4. **Uncertain demand** — Don't know if recruiters/engineers will request this level of detail

---

## When to Build

**Trigger conditions:**
- Main case study has been live for 1+ month and received feedback
- Recruiters or engineers specifically request code examples
- Writing blog posts about DSL/state machine patterns and want deeper reference material

**Do NOT build if:**
- No one asks for it (YAGNI principle)
- Blog infrastructure or additional case studies are still pending
- Time better spent on current work at Wise

---

## Implementation Approach

**Estimated effort:** 5 story points

1. **Extract code samples** (2 points)
   - Pull representative snippets from archived Statsbomb repos
   - Anonymize proprietary business logic
   - Create annotated versions with explanatory comments

2. **Write technical narrative** (2 points)
   - Explain implementation choices with code examples
   - Use same Astro/MDX structure as main case study
   - Add MermaidDiagrams for complex flows

3. **Cross-link integration** (1 point)
   - Add "View Technical Appendix" callout back to main case study
   - Ensure both pages reference each other correctly
   - Verify navigation flow works smoothly

---

## Design Constraints

**Must follow:**
- Same Egyptian design system (colors, typography, patterns)
- Code syntax highlighting via Shiki (built into Astro)
- Accessibility requirements (WCAG AA for all code snippets)
- Mobile-responsive layout for code blocks

**Forbidden:**
- Don't turn this into tutorial content (case study, not course)
- Don't include proprietary Statsbomb business logic
- Don't make it required reading (main case study stands alone)

---

## Success Criteria

If we build this, it succeeds when:
- Engineers can understand HOW we implemented the architectural patterns
- Code examples are production-quality and directly applicable
- Appendix complements but doesn't duplicate main case study content
- Loading time stays under 3 seconds despite code examples

---

## Notes

- Main case study removed Technical Appendix reference on 2025-10-31
- Incomplete appendix file deleted from repo (recoverable from git history)
- This document preserves intent without committing to execution
