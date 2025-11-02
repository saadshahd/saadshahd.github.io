# Hassan Feedback - 2025-11-02

**Context:** Senior engineer who worked briefly at StatsBomb reviewing the case study

## Key Points

### 1. Name Attribution vs. Job Titles
- **Problem:** Case study mentions specific names throughout (Ali, Adham, Waheed, Hadeel, Abdallah, etc.)
- **Feedback:** Use job titles instead of names
- **Impact:** May feel too personal or create privacy concerns
- **Tension:** Conflicts with narrative style of crediting individuals for their contributions
- **Current Approach:** "Ali and I sat with VSCode open", "Waheed built claims-based metadata", "Adham advocated for Kafka"

### 2. "Saying Thank You" Feels Performative
- **Problem (line 76):** "That feeling—collector gratitude—became the foundation for everything we built over four years. Not from management validation or product roadmaps, but from the people doing the actual work saying 'thank you.'"
- **Feedback:** "Very cringe when you say 'saying thank you'"
- **Alternative Suggestions:**
  - "Seeing actual impact"
  - "Constructive feedback"
  - "They trusted that the feedback will make a change"
- **Why:** Focus on tangible outcomes and trust rather than emotional validation
- **Core Issue:** Gratitude sounds self-congratulatory vs. showing actual collector impact

### 3. Two-Merge Bottleneck Unclear
- **Problem:** Section at lines 140-149 and diagram at lines 173-210
- **Feedback:** "The two-merge bottleneck is not clear to me"
- **Current Explanation:**
  - First merge: Align on what events happened during collection
  - Second merge: Reconcile how events were validated, positioned, and tagged
- **Impact:** If a former team member finds it unclear, external readers definitely will
- **Missing:** Step-by-step walkthrough of why two merges were necessary

## Action Items

- [ ] **Decision needed:** Keep names for narrative credit vs. anonymize to job titles
- [ ] Rewrite line 76 to focus on impact/trust instead of "saying thank you"
- [ ] Replace gratitude framing with concrete feedback loops (e.g., "9 minutes saved per frame" → iteration)
- [ ] Clarify two-merge bottleneck with explicit workflow steps
- [ ] Add concrete example: "Collector A marks event as recovery, Collector B marks as interception → First merge resolves what happened → Both add positioning data differently → Second merge resolves how it was tagged"
- [ ] Consider adding visual walkthrough or numbered steps for merge workflow

## Proposed Rewrites

### Before (line 76):
> "That feeling—collector gratitude—became the foundation for everything we built over four years. Not from management validation or product roadmaps, but from the people doing the actual work saying 'thank you.' When you ship for people who thank you, architecture stops being abstract."

### After (Option 1 - Impact Focus):
> "That feedback loop—seeing collectors save 9 minutes per frame, watching hands stop cramping—became the foundation for everything we built over four years. Not from management validation or product roadmaps, but from the people doing the actual work telling us what mattered. When you ship for people who trust their feedback will shape the tool, architecture stops being abstract."

### After (Option 2 - Trust Focus):
> "That trust—collectors believing their feedback would directly change the tool—became the foundation for everything we built over four years. Not from management validation or product roadmaps, but from the people doing the actual work showing us what slowed them down. When you ship for people who see their input reflected in the next build, architecture stops being abstract."

## Two-Merge Bottleneck Clarification

**Add Concrete Example (after line 149):**

> **Why Two Merges?**
>
> **First Merge (Event Agreement):**
> - Collector A: "That's a recovery at 23:45"
> - Collector B: "That's an interception at 23:45"
> - Merge question: What actually happened?
>
> **Post-Processing (4 hours each):**
> - Both collectors add positioning data, freeze frames, validation tags
> - Different interpretations lead to different enrichments
>
> **Second Merge (Enrichment Agreement):**
> - Same event, now with conflicting metadata
> - Merge question: How should this event be tagged/positioned?
>
> The tool allowed ambiguous interpretations during collection. Collectors paid the cost afterward in two separate reconciliation phases.

## Writing Philosophy Considerations

**Name Attribution Trade-off:**
- **Pro (keeping names):** Credits individuals for their work, humanizes the story, follows "team attribution" pattern from CLAUDE.md
- **Con (removing names):** More professional, privacy-conscious, focuses on roles over individuals
- **Decision needed:** This is a philosophical choice about narrative style

**Gratitude vs. Impact:**
- **Problem:** "Thank you" feels self-serving
- **Solution:** Reframe around trust, feedback loops, and measurable impact
- **Pattern:** Show → don't tell (9 minutes saved > "they thanked me")

**Technical Clarity:**
- **Lesson:** If someone who worked on the project finds it unclear, external readers definitely will
- **Fix:** Add concrete examples with specific dialogue/scenarios
- **Principle:** Abstract concepts need concrete instantiation
