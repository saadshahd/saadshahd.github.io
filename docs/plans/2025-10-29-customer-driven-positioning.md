# Customer-Driven Copy Positioning Design

**Date:** 2025-10-29
**Status:** Approved
**Complexity:** 3 story points

## Context

This design documents the customer-driven, practitioner-first positioning for the portfolio site. It positions direct engagement with domain experts (1000+ Statsbomb collectors, Wise content teams) as a core architectural skill, not an afterthought or soft skill.

## Core Thesis Statements

Extracted via `/wri:thesis` from real Statsbomb and Wise stories:

1. **"Architecture emerges from interpreting workflow friction, not transcribing feature requests - inference beats explicit requirements"**
2. **"Systems designed for human capability shift validation to prevention, letting practitioners focus on judgment over correction"**

## Real Stories Foundation

### Statsbomb Stories

**2-Collectors-Per-Match Insight:**
- **Before:** 2 collectors per match, each following a team (redundancy on paper)
- **Practitioner insight:** Daily conversations revealed this was duplicated effort, not collaboration
- **Architectural decision:** Break matches by decision, not team → increased correctness without additional effort

**Valid by Default Evolution:**
- **Before:** Validate everything after collection (collectors caught all errors)
- **Practitioner insight:** Observing collectors revealed human capability limits - can't maintain focus while constantly catching errors
- **Architectural decision:** Computer vision + linting catches 99%, humans handle 1% edge cases requiring judgment

**Event Storming Domain Mapping:**
- **Context:** Lead collectors helped map domains (information, collection, operations, media, aggregation)
- **Insight:** "pass, pass, dribble" are instantaneous events AND durational carry; multiple carries = possession
- **Impact:** System needed to model facts at atomic and aggregate levels simultaneously

**Keyboard Experience & Muscle Memory:**
- **Insight:** Contextual keyboard mappings reduce decision-making load
- **Impact:** Collectors develop muscle memory, work faster without thinking

### Wise Stories

**Layer Inference from Friction:**
- **Context:** Content teams (designers, developers, copy creators) as main users of Editorial stack
- **Practitioner behavior:** Daily workflow friction showed separation needs
- **Architectural decision:** Constructing (lower layer) → Governance (approval/compliance) → Guidance (on-brand)
- **Key insight:** Teams never explicitly requested this separation - it was inferred from watching their work

**DX & Adoption Balance:**
- **Goal:** Enhance developer experience and adoption while maintaining creativity, flexibility, on-brand without thinking
- **Approach:** Iterative feedback loops with teams using the stack

## Copy Implementation

### About Page: "Architecture from the Source" Section

**Placement:** After technical expertise, before highlights
**Word count:** ~205 words
**Purpose:** Position practitioner engagement as core architectural skill

---

**Architecture from the Source**

Over 15 years, a pattern emerged: architecture doesn't come from transcribing feature requests - it emerges from interpreting workflow friction. At Statsbomb, daily conversations with 1000+ collectors revealed not just bugs, but what mattered: keyboard experiences that built muscle memory, decision flows that reduced cognitive load, collaboration patterns that eliminated rework. When collectors described working "2 per match, each following a team," they weren't asking for a feature - they were showing us redundant effort. Breaking matches down by decision rather than team wasn't on any requirements doc.

The best systems shift validation to prevention, letting practitioners focus on judgment over correction. Event storming sessions with lead collectors mapped domains - collection, operations, media, aggregation - revealing that "pass, pass, dribble" needed to be both instantaneous events and durational carry. That insight became architectural: valid by default, with computer vision and linting catching 99% of issues, leaving humans for the 1% edge cases requiring actual judgment.

At Wise, content teams never asked to "separate constructing from governance" - but watching their daily friction revealed the layers. When architecture responds to what practitioners *show* through their work, systems fit their reality instead of forcing reality to fit systems.

---

### Case Study Narrative Integration Patterns

#### Pattern 1: Problem Section with Practitioner Context

**Structure:**
1. Open with question (Socratic authority)
2. Ground in practitioner constraint/insight
3. Show what was revealed through conversation
4. Connect to architectural decision

**Example (Statsbomb):**

> How do you design a collection system when collectors process 90-minute matches in real-time? Daily conversations with collectors revealed the actual constraints: they needed keyboard flows that built muscle memory, contextual mappings that reduced decision-making load, and collaboration patterns that eliminated rework. The existing approach—2 collectors per match, each following a team—looked like redundancy on paper. Talking with collectors showed it was duplicated effort.
>
> Event storming sessions with lead collectors mapped the domain into contexts: information, collection, operations, media, aggregation. One insight reshaped the architecture: "pass, pass, dribble" were instantaneous events *and* durational carry. Multiple carries became possession. The system needed to model facts at atomic and aggregate levels simultaneously—something requirements documents wouldn't have surfaced.

#### Pattern 2: Architecture Section with Inference

**Structure:**
1. State thesis ("architecture emerged from interpreting friction")
2. Show specific decision that wasn't explicitly requested
3. Explain the shift (validation → prevention, or other principle)
4. Connect to human capability/practitioner reality

**Example (Statsbomb):**

> Architecture emerged from interpreting workflow friction, not transcribing requests. Breaking matches down by decision rather than team—something no collector explicitly asked for—increased correctness without additional effort. The collection experience was redesigned to be valid by default: computer vision assisted input, contextual keyboard mappings reduced cognitive load, and linting caught 99% of errors automatically.
>
> This shifted validation to prevention. Collectors focused on judgment over correction—handling the 1% edge cases where human expertise mattered (event type conflicts, judgment calls on data points) rather than catching preventable mistakes. Systems designed for human capability let practitioners work within their actual limits, not aspirational ones.

**Example (Wise):**

> When content teams at Wise surfaced daily workflow friction, the Editorial stack had to respond. They didn't ask to "separate constructing from governance"—but watching their work revealed the layers. Constructing (building content) was a lower-level concern than governance (approval flows, compliance) and guidance (staying on-brand without thinking).
>
> Inference beat explicit requirements. The architecture separated layers not because teams requested it, but because their friction showed what mattered: rapid iteration, cross-team collaboration, creativity within constraints, and satisfactory flexibility without sacrificing brand consistency. Systems that interpret workflow friction fit practitioner reality instead of forcing reality to fit the system.

## Tone Compliance Checklist

Per CLAUDE.md tone guidelines (Philosophical + Humble + Collaborative):

- [x] **Question-led authority** - Opens with Socratic questions, not claims
- [x] **Collaborative framing** - "conversations revealed", "watching their work", "teams surfaced"
- [x] **Philosophical systems thinking** - "architecture emerges", "inference beats requirements", "validation to prevention"
- [x] **Humble learning orientation** - "pattern emerged", "revealed", "showed us"
- [x] **Evidence-based confidence** - 15 years, 1000+ collectors, specific companies, 99% metric
- [x] **No arrogance** - Zero "I built X" without collaborative context
- [x] **Invitational CTAs** - Not applicable in this content (no CTAs in About/case studies)

## Forbidden Patterns Avoided

- ❌ Bold claims: "I build systems that can't break"
- ❌ Hero narrative: "I designed", "I achieved" (without team context)
- ❌ Definitive statements without humility: "The right question makes implementation obvious"
- ❌ Generic platitudes: "listen to users", "customer-first" (without real stories)

## Implementation Notes

### Files to Update

1. **About page:** `src/pages/about.astro`
   - Add "Architecture from the Source" section
   - Place after expertise, before highlights
   - ~205 words

2. **Case studies:** Apply narrative integration patterns
   - Problem sections: Open with practitioner constraint question
   - Architecture sections: Show inference and validation→prevention shift
   - Use real stories from this document

### Maintenance

- When adding new case studies: Use narrative integration patterns
- When describing new work: Apply thesis statements naturally
- Always ground in real practitioner stories, not generic positioning
- Run tone compliance checklist before publishing

## Success Metrics

- About page explicitly positions practitioner engagement as architectural skill
- Case studies show HOW work happened (event storming, daily conversations, inference)
- Zero generic "listen to users" language - all backed by real stories
- Tone audit passes (collaborative, humble, evidence-based)

---

## Refactoring: Eliminating Redundancy (2025-10-29)

### Issues Identified

1. **About page redundancy**: "Architecture from the Source" section repeated specific Statsbomb stories that belong in case study
2. **Pass/carry insight incomplete**: Original description said "instantaneous events AND durational carry"—missed the core insight about arbitrary aggregation from atomic facts
3. **Missing metadata story**: Golden entity resolution (5 people supporting thousands) demonstrates same thesis as event collection
4. **Ops scaling underemphasized**: 100 → thousands of collectors context needed

### Refactoring Decisions

#### About Page (src/pages/about.astro:59-71)
**Before:** Full Statsbomb stories with specific details (2-collectors, event storming, computer vision, 99% metrics)
**After:** Abstract principles applicable to any project
- Removed all company-specific examples
- Kept thesis statements as general principles
- Reduced from ~205 to ~150 words
- Maintains philosophical + humble + collaborative tone

**Rationale:** About page should position the APPROACH, case studies show the EXECUTION

#### Statsbomb Case Study

**Problem Section - Added metadata challenge:**
- New paragraph after event storming insight
- Emphasizes different architectural problem: crowd-sourced reference data vs real-time event collection
- Shows 5-person team supporting thousands (architectural leverage)

**Architecture Section - Split into subsections:**

1. **"Event Collection: Aggregation from Atomic Facts"**
   - Fixed pass/carry insight: emphasizes arbitrary aggregation (pass+carry → possession)
   - Valid by default with computer vision + linting
   - Ops scaling (100 → thousands)
   - DSL for configuration-driven sports rules

2. **"Metadata Management: Automated Entity Resolution"**
   - Golden entity resolution from crowd-sourced data
   - 5 people supporting thousands via automation
   - Confidence scoring + edge case escalation
   - Same thesis: validation → prevention, judgment > correction

**Rationale:** Two parallel stories demonstrate thesis breadth—not just event collection, but reference data management at scale

### Updated Real Stories

**Arbitrary Aggregation Insight:**
- **Context:** Event storming with lead collectors
- **Insight:** Individual passes and carries are atomic events; multiple carries in sequence become "possession" (derived higher-level fact)
- **Impact:** System needed to support any aggregation pattern, not just predefined ones

**Metadata Architectural Leverage:**
- **Challenge:** Thousands of collectors, crowd-sourced data, conflicting sources (same player, different spellings)
- **Constraint:** 5-person metadata team couldn't manually reconcile
- **Solution:** Automated golden entity resolution with confidence scoring
- **Result:** 5 people supporting thousands via architectural leverage (1-2% edge cases require human domain expertise)

---

**Document Status:** Complete, validated, and refactored to eliminate redundancy
**Implementation Status:** All changes deployed to About page and Statsbomb case study
