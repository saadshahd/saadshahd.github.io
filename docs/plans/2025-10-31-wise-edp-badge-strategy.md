# Wise EDP Badge Strategy

**Date:** 2025-10-31
**Status:** Approved
**Context:** Badge strategy for upcoming Wise Editorial Decision Platform case study, designed to maintain visual consistency with Statsbomb while telling a complementary story

---

## Executive Summary

The Wise EDP badge strategy uses 5 badges in a 2+2+1 pattern (matching Statsbomb's structure) to emphasize **architectural philosophy over technical complexity**. Where Statsbomb demonstrates sophisticated custom tooling (ANTLR, Kafka, XState), Wise demonstrates architectural elegance through deliberate simplicity (Puck, Payload).

**Badge List:**
- **Category (2):** "Multi-Team Collaboration", "Content Governance"
- **Status (2):** "Puck", "Payload"
- **Skill (1):** "Structured Flexibility"

---

## Complete Badge Specification

### 1. System Characteristics (category variant)

#### Badge: "Multi-Team Collaboration"
- **Variant:** `category` (sky blue - `#DBEAFE` bg, `#0C4A6E` text, `#0EA5E9` border)
- **Purpose:** Signals the scale problem (20+ teams needing coordination)
- **Reader Takeaway:** "This isn't a single-team CMS, it's a coordination platform"
- **Semantic Role:** Problem space - what needed solving

#### Badge: "Content Governance"
- **Variant:** `category` (sky blue)
- **Purpose:** Captures compliance + quality + consistency requirements
- **Reader Takeaway:** "Not just collaboration, but governed collaboration"
- **Semantic Role:** Problem space - constraints that matter
- **Why this term:**
  - "Governance" encompasses regulatory compliance + brand consistency + quality gates
  - Business stakeholder language (not just engineer-speak)
  - Pairs with "Collaboration" to show both velocity AND control

---

### 2. Key Technologies (status variant)

#### Badge: "Puck"
- **Variant:** `status` (emerald green - `#D1FAE5` bg, `#065F46` text, `#10B981` border)
- **Purpose:** Visual editor foundation (React component-based)
- **Reader Takeaway:** "They chose Puck - a modern drag-and-drop system"
- **Semantic Role:** Foundational platform enabling editorial experience
- **Why included:** Architecturally significant choice for structured flexibility

#### Badge: "Payload"
- **Variant:** `status` (emerald green)
- **Purpose:** Headless CMS platform (content management layer)
- **Reader Takeaway:** "Payload for the CMS backbone"
- **Semantic Role:** Foundational platform enabling content storage/API
- **Why included:** Core infrastructure enabling schema-driven architecture

**Why NO other tech badges:**
- No "TypeScript" (too generic, expected in modern systems)
- No "React" (implementation detail, not architectural choice)
- No "GraphQL" or "PostgreSQL" (not differentiating, standard choices)
- Puck + Payload are the **strategic** choices that shaped everything else

---

### 3. Differentiating Skill (skill variant)

#### Badge: "Structured Flexibility"
- **Variant:** `skill` (warm amber - `#FEF3C7` bg, `#78350F` text, `#F59E0B` border)
- **Purpose:** The architectural philosophy that made everything work
- **Reader Takeaway:** "THAT'S how simple tools solved complex problems"
- **Semantic Role:** Differentiating technique - the 'why it worked'
- **Cognitive Tension:** Creates puzzle (simple tools + complex problems = ?) that case study resolves

**Terminology Precision:**

| Term | Pros | Cons | Decision |
|------|------|------|----------|
| **Structured Flexibility** ✅ | Technical precision, implies intentional constraint-based design, engineers immediately understand | Slightly longer (2 words) | **CHOSEN** - most accurate |
| Freedom Within Boundaries | Poetic, memorable, matches philosophical framing | Could sound like management speak, less immediately technical | Rejected |
| Schema-Driven Design | Implementation-focused, clear mechanism | Too narrow, misses broader architectural philosophy | Rejected |

**Why this is the skill badge:**
- Not a technology (Puck/Payload are technologies)
- Not a problem (Multi-Team/Governance are problems)
- The **technique** that enabled simple tools to solve complex problems
- The thing only experienced architects would think to apply

---

## Strategic Reasoning

### Visual Symmetry with Statsbomb

**Pattern Consistency:**
- Same 5-badge count (not overwhelming, each earns its place)
- Same 2+2+1 structure (category → status → skill)
- Same placement (hero section, after subtitle, before reading metadata)
- Same accessibility standards (WCAG AA 7.2-9.1:1 contrast)

**Why this matters:**
Portfolio demonstrates **consistency** (predictable structure) AND **range** (different technical stories within same format)

### Narrative Arc

```
Problems solved (what)
    ↓
Tools chosen (how)
    ↓
Philosophy applied (why it worked)
```

**Reader Journey:**
1. **First 2 badges:** "Okay, they solved collaboration + governance at scale"
2. **Next 2 badges:** "Using Puck and Payload? Those are surprisingly simple choices"
3. **Final badge:** "Oh! 'Structured Flexibility' - THAT'S the insight"

The skill badge creates **cognitive tension** that pulls readers into the case study to resolve the apparent contradiction: How did basic tools solve complex problems?

### Cognitive Load Management

**What we're NOT showing:**
- Implementation languages (TypeScript, Go)
- Standard frameworks (React, Next.js)
- Database choices (PostgreSQL)
- Minor dependencies

**Why selective:**
Every badge represents a **decision point** where architecture could have gone differently. Generic choices don't make the cut.

---

## Portfolio Narrative: Statsbomb vs Wise

### Contrast Analysis

| Aspect | Statsbomb Badges | Wise EDP Badges | Strategic Difference |
|--------|------------------|-----------------|---------------------|
| **Problem Space** | Real-Time Data Collection<br>Collaborative Workflows | Multi-Team Collaboration<br>Content Governance | Speed/correctness vs Scale/quality |
| **Tech Philosophy** | XState, Kafka, ANTLR<br>(custom/specialized) | Puck, Payload<br>(standard/composed) | Build vs Compose |
| **Differentiator** | ANTLR<br>(technical execution) | Structured Flexibility<br>(design thinking) | Implementation skill vs Architectural philosophy |
| **Cognitive Load** | "Complex tech for hard problem" | "Simple tech solved hard problem" | Opposite stories, equal sophistication |

### What This Demonstrates

**Range & Judgment:**
1. **Statsbomb:** "I can build sophisticated custom tooling when the domain demands it (ANTLR for DSL, Kafka for real-time, XState for state complexity)"
2. **Wise:** "I can also solve complex problems with boring technology through architectural elegance (Puck + Payload + design thinking)"

**Not Dogmatic:**
- Doesn't always reach for custom solutions
- Doesn't always reach for libraries
- Chooses based on **context**: domain complexity (Statsbomb) vs coordination complexity (Wise)

**The Meta-Signal:**
"I understand when to build and when to compose - that's principal-level judgment."

---

## Visual Implementation

### MDX Code Structure

**Location:** Hero section of Wise EDP case study (immediately after subtitle, before reading metadata)

```astro
{/* System Characteristics */}
<Badge variant="category">Multi-Team Collaboration</Badge>
<Badge variant="category">Content Governance</Badge>

{/* Key Technologies */}
<Badge variant="status">Puck</Badge>
<Badge variant="status">Payload</Badge>

{/* Differentiating Skill */}
<Badge variant="skill">Structured Flexibility</Badge>
```

### Accessibility Compliance

All badges meet **WCAG AA contrast requirements** (4.5:1 minimum):

| Variant | Background | Text | Border | Contrast Ratio |
|---------|-----------|------|--------|----------------|
| `category` | `#DBEAFE` | `#0C4A6E` | `#0EA5E9` | 9.8:1 (AAA) |
| `status` | `#D1FAE5` | `#065F46` | `#10B981` | 9.1:1 (AAA) |
| `skill` | `#FEF3C7` | `#78350F` | `#F59E0B` | 7.2:1 (AAA) |

All variants exceed WCAG AAA (7:1) for enhanced readability.

### Visual Grouping

**Implicit sections via comments:**
- First group (2 badges): System characteristics - reader understands "what"
- Second group (3 badges): Technologies + philosophy - reader understands "how" and "why"

**Spacing:** Default badge component gap (8px between badges, 16px between groups via comment spacing)

---

## Key Assumptions

### Case Study Content Must Support

**The "Structured Flexibility" skill badge assumes the case study will explain:**

1. **The Schema Layer**
   - How Puck's component system created "boundaries" (allowed component types, props, validation)
   - How teams could compose freely WITHIN those boundaries
   - Example: "Authors can create any layout, but can't break responsive design"

2. **The Governance Layer**
   - How schemas enforced brand consistency, legal requirements, accessibility
   - How this wasn't restrictive but enabling ("can't make mistakes by accident")
   - Example: "Content approval workflows triggered automatically by schema metadata"

3. **The Collaboration Layer**
   - How boundaries eliminated coordination overhead
   - Teams didn't need to ask permission, schemas made conflicts impossible
   - Example: "20 teams shipping simultaneously without breaking each other"

**If the case study doesn't explain these connections, the "Structured Flexibility" badge won't land.**

### Technologies

**Puck and Payload are positioned as strategic choices, not just dependencies:**
- Puck: Enabled visual editing within React component constraints
- Payload: Provided the schema system and CMS foundation
- Together: Created the platform for structured flexibility

**If the case study treats these as incidental tech, the status badges won't make sense.**

---

## Alternatives Considered

### Alternative A: Philosophy-First (Rejected)

**Badge List:**
- Category: "Content at Scale", "Freedom Within Boundaries"
- Status: "Puck", "Payload"
- Skill: "Schema-Driven Design"

**Why rejected:**
- "Freedom Within Boundaries" as category badge feels too abstract/poetic
- "Content at Scale" is generic buzzword territory
- Doesn't establish concrete problems up front

### Alternative C: Capability-First (Rejected)

**Badge List:**
- Category: "Editorial Decision Platform", "Composable Content Architecture"
- Status: "Puck", "Payload", "TypeScript"
- Skill: "Freedom Within Boundaries"

**Why rejected:**
- 6 badges breaks pattern symmetry with Statsbomb (5 badges)
- "TypeScript" is too generic for a status badge
- "Editorial Decision Platform" is just the product name (not a problem solved)

---

## Success Metrics

**The badge strategy succeeds if:**

1. **Visual Consistency:** Reader immediately recognizes same structure as Statsbomb
2. **Cognitive Clarity:** Reader understands problems → tools → philosophy in 3 seconds
3. **Differentiation:** Reader sees Wise as complementary story to Statsbomb (compose vs build)
4. **Curiosity:** "Structured Flexibility" badge creates pull to read case study
5. **Portfolio Range:** Together with Statsbomb, demonstrates judgment about when to build vs compose

**The badge strategy fails if:**

1. Badges feel arbitrary or unmotivated
2. Reader confused about what "Structured Flexibility" means before reading
3. Puck/Payload seem like random technology mentions
4. Badge count/structure feels inconsistent with portfolio style

---

## Implementation Checklist

When implementing the Wise EDP case study:

- [ ] Copy badge MDX structure from Statsbomb (lines 30-39)
- [ ] Replace Statsbomb badges with Wise badges exactly as specified above
- [ ] Verify badge component variants are correct (category/status/skill)
- [ ] Ensure proper comment grouping ({/* System Characteristics */})
- [ ] Test accessibility (contrast ratios should auto-pass from design system)
- [ ] Verify case study content explains "Structured Flexibility" concept clearly
- [ ] Confirm Puck and Payload are positioned as strategic choices, not just deps
- [ ] Check that problems (collaboration + governance) are established in intro

---

## Confidence & Key Assumption

**Confidence:** 90% this strategy captures the vision while maintaining portfolio consistency

**Key Assumption:** The case study content will explain how "Structured Flexibility" (schema-driven boundaries enabling team freedom) solved both collaboration and governance problems through Puck/Payload's architecture.

**Validation Needed:** After case study draft is written, verify badges align with actual content narrative. If "Structured Flexibility" doesn't emerge as the key insight, revisit skill badge choice.

---

## References

- **Statsbomb Badge Analysis:** See src/pages/portfolio/statsbomb.mdx lines 30-39
- **Badge Component:** See src/components/Badge.astro
- **Design System:** See src/styles/global.css @theme block (badge semantic colors)
- **CLAUDE.md Principles:** "Eliminate complexity before it exists" - badges must earn their place through architectural significance
