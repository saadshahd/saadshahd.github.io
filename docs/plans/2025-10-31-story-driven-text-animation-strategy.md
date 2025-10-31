# Story-Driven Progressive Text Animation Strategy

**Date**: 2025-10-31
**Status**: In Progress (Week 1: Animation Foundation)
**Complexity**: 75 story points (~5-6 focused sessions)

---

## 🎯 Vision & Problem Statement

### The Density Challenge

**Current State**:
- Main case study: 4,304 words (25-minute read)
- Technical appendix: 4,836 words
- **Total**: 9,140 words with 6 major sections, 14+ subsections
- Rich with visual aids (DefinitionLists, MetricCards, Mermaid diagrams)

**The Core Tension**:
> Cannot remove content (technical depth = credibility), but risk losing casual readers before they see best work.

**The Question**:
> How do animations create a "Level 0" scannable experience WITHIN the same document as "Level 1" deep dive?

---

## 🧠 Research & Inspiration

### Codrops Demos Analyzed

**1. OnScrollTextHighlight** (https://github.com/codrops/OnScrollTextHighlight/)
- GSAP + ScrollTrigger + Splitting.js
- 13 different highlight effects
- Character-level animations triggered on scroll
- **Key Learning**: Character-by-character too fast for technical content

**2. OnScrollTypographyAnimations** (https://github.com/codrops/OnScrollTypographyAnimations/)
- JavaScript (47.9%), HTML (39.5%), CSS (12.6%)
- Scroll-triggered state changes
- Layered information revelation through animation timing
- **Key Learning**: Animation creates temporal layers in same document

**3. ScrollBlurTypography** (https://tympanus.net/Development/ScrollBlurTypography/)
- "Blurry Text Reveal on Scroll"
- Inspired by Rauno's blur reveal pattern
- Background text blurred → sharp as you scroll
- **Key Learning**: Blur/focus pattern = "spotlight effect" for attention

### Conceptual Patterns Extracted

1. **Blur/Focus**: Background blurred → sharp on scroll (attention spotlight)
2. **Sequential Reveal**: Not everything visible at once → reading rhythm controlled by scroll
3. **Attention Hierarchy Through Motion**: Animated = important, static = context
4. **Temporal Layers**: Animation creates engagement depth over time
   - 0-30s: Highlights reveal (scannable)
   - 30s-2min: Context fades in (engaged readers)
   - 2min+: Technical details expand (deep dive)

---

## 🗳️ User Choices & Decisions

### Round 1: Storytelling Mechanics

**Q1: Should highlighted words appear instantly or animate in?**
✅ **Selected**: Word-by-word (250ms stagger) - reading pace
**Rationale**: Maintains natural reading rhythm (240 WPM = 250ms per word)

**Q2: How should surrounding context text fade in after highlights?**
✅ **Selected**: Sentence-by-sentence - natural rhythm
**Rationale**: Each sentence fades sequentially, creating reading flow from highlights outward

**Q3: What happens when a paragraph has multiple highlights?**
✅ **Selected**: Each highlight + local context
**Rationale**: First highlight → nearby sentence → second highlight → its sentence (progressive disclosure)

**Q4: Should engagement layers stack across entire page or per-section?**
✅ **Selected**: Per-section (viewport-based)
**Rationale**: Each section triggers independently as you scroll - highlights → context → next section

### Round 2: Story Beat Selection (9 Total)

**Problem Section** (Beats 1-3):
- ✅ **Beat 1**: "Week one. Ali and I sat down with paper" (humble beginning)
- ✅ **Beat 2**: "Cognitive overload" (user pain point)
- ✅ **Beat 3**: "The dataspec itself needed to be data, not code" (core insight)

**Architecture Section** (Beats 4-5):
- ✅ **Beat 4**: "We separated three concerns: entry validation (dataspec), sequencing logic (DSL), and aggregation rules (grouping DSL)" (KEY architectural decision)
- ✅ **Beat 5**: "Five major state machines orchestrated the app" (scale signal)

**Impact Section** (Beats 6-7):
- ✅ **Beat 6**: "NFL dataspecs shipped in 3 weeks" (velocity win)
- ✅ **Beat 7**: "Design for the 80% common case" (pragmatic principle)

**Team Building Section** (Beat 8):
- ✅ **Beat 8**: "Adham pushed me to chase ideas I wasn't confident enough to pursue" (partnership depth)

**Lessons Section** (Beat 9):
- ✅ **Beat 9**: "Architecture shapes what's possible. But people make it real." (final wisdom)

**Variant Assignments**:
- **emphasis** (4 beats): Week one, dataspec insight, separation, architecture/people — Bold + bronze gold
- **fade-in** (5 beats): Cognitive overload, state machines, NFL, 80%, Adham — Opacity/scale only

---

## 🎬 Animation Behavior Specification

### Phase 1: Story Arc Reveal (0-3 seconds per section)

**Trigger**: IntersectionObserver at 30% viewport visibility

**Animation**:
- Highlight words animate FIRST
- Word-by-word stagger at 250ms (reading pace)
- Bronze gold color `#856B00` (WCAG AA compliant: 4.54:1 contrast)
- Emphasis variant = bold + color
- Fade-in variant = opacity/scale only

**Timing Example** (3-word highlight):
```
0ms     → "systems" (opacity 0→1, scale 0.95→1)
250ms   → "that" (opacity 0→1, scale 0.95→1)
500ms   → "scale" (opacity 0→1, scale 0.95→1)
750ms   → Animation complete, trigger Phase 2
```

### Phase 2: Context Reveal (3-8 seconds per section)

**Trigger**: After highlights finish animating

**Animation**:
- Surrounding sentences fade in sequentially
- Each sentence = 0.5s fade-in duration
- Slightly muted opacity (0.85 instead of 1.0) to keep highlights prominent
- Natural reading rhythm (sentences appear as fast as you can read them)

**Timing Example** (2-sentence paragraph):
```
0-750ms     → Highlights animate (Phase 1)
750-1250ms  → First sentence fades in (context)
1250-1750ms → Second sentence fades in (context)
Total: 1.75 seconds per paragraph
```

### UX for Paragraphs WITHOUT Highlights

**Critical Requirement**: "even if paragraph has no highlights it should fit well"

**Solution**: Apply sentence-by-sentence reveal to ALL paragraphs in sections with highlights

**Why**: Creates consistent reading rhythm across entire case study. Fast scrollers see highlights, slow readers get natural sentence flow everywhere.

---

## 🏗️ Technical Architecture

### Current Implementation (Before Changes)

**File**: `src/utils/textHighlighting.ts`

**Behavior**:
```typescript
// Only splits <TextHighlight> elements
Splitting({ target: ".text-highlight", by: "words" });

// Animates highlight words with 250ms stagger
animate(words, { opacity: [0, 1], color: [...] }, { delay: stagger(0.25) });
```

**Limitation**: Surrounding text never reveals - stays hidden

### New Implementation (After Refactor)

**File**: `src/utils/textHighlighting.ts` (21 story points)

**Major Changes**:

#### 1. Split ENTIRE paragraphs (not just highlights)
```typescript
// Find sections with ANY highlights
const sections = document.querySelectorAll<HTMLElement>("section");

sections.forEach(section => {
  const hasHighlights = section.querySelector(".text-highlight");
  if (!hasHighlights) return; // Skip sections without story beats

  // Split ALL paragraphs in this section
  const paragraphs = section.querySelectorAll<HTMLElement>("p, li");
  paragraphs.forEach(p => {
    Splitting({ target: p, by: "words" });

    // Mark which words are inside <TextHighlight> vs context
    p.querySelectorAll(".word").forEach(word => {
      const isHighlight = word.closest(".text-highlight");
      if (isHighlight) {
        word.classList.add("highlight-word");
        word.dataset.variant = isHighlight.className.match(/text-highlight--(\S+)/)?.[1] || "fade-in";
      } else {
        word.classList.add("context-word");
      }
    });
  });
});
```

#### 2. Sentence Detection Algorithm
```typescript
function groupWordsBySentence(words: HTMLElement[]): HTMLElement[][] {
  const sentences: HTMLElement[][] = [];
  let currentSentence: HTMLElement[] = [];

  words.forEach(word => {
    currentSentence.push(word);

    // Check if word ends with sentence-ending punctuation
    const text = word.textContent || "";
    if (/[.!?]$/.test(text.trim())) {
      sentences.push([...currentSentence]);
      currentSentence = [];
    }
  });

  // Add remaining words as final sentence
  if (currentSentence.length > 0) {
    sentences.push(currentSentence);
  }

  return sentences;
}
```

#### 3. Two-Phase Animation Sequence
```typescript
const stop = inView(
  paragraph,
  async (element, enterInfo) => {
    const highlightWords = Array.from(element.querySelectorAll<HTMLElement>(".highlight-word"));
    const contextWords = Array.from(element.querySelectorAll<HTMLElement>(".context-word"));

    // Phase 1: Animate highlights (word-by-word, 250ms stagger)
    if (highlightWords.length > 0) {
      const highlightAnimation = animate(
        highlightWords,
        {
          opacity: [0, 1],
          scale: [0.95, 1],
          color: (_, el) => {
            const variant = (el as HTMLElement).dataset.variant;
            if (variant === "emphasis") {
              return ["var(--color-highlight-start)", "var(--color-highlight-gold)"];
            }
            return "inherit"; // fade-in keeps text color
          }
        },
        {
          duration: 0.4,
          ease: egyptianEasing.water,
          delay: stagger(0.25), // 250ms reading pace
        }
      );

      await highlightAnimation.finished;
    }

    // Phase 2: Animate context (sentence-by-sentence)
    if (contextWords.length > 0) {
      const sentences = groupWordsBySentence(contextWords);

      for (const sentence of sentences) {
        await animate(
          sentence,
          {
            opacity: [0, 0.85], // Slightly muted
            scale: [0.98, 1],
          },
          {
            duration: 0.5,
            ease: egyptianEasing.water,
          }
        ).finished;
      }
    }
  },
  { amount: 0.3 }
);
```

### CSS Updates (2 story points)

**File**: `src/styles/global.css`

```css
/* Story beat highlights */
.highlight-word {
  opacity: 0; /* Start hidden */
}

/* Context words */
.context-word {
  opacity: 0; /* Start hidden */
}

/* Accessibility: Show all words immediately */
@media (prefers-reduced-motion: reduce) {
  .highlight-word,
  .context-word {
    opacity: 1 !important;
    color: inherit !important;
  }
}
```

---

## 📚 Blog Series Strategy

### Technical Appendix Problem

**Current**: 4,836-word appendix is PDF-style dump
- Dilutes main case study
- Doesn't help SEO (single page)
- Intimidating length

**Solution**: Convert to 4-part blog series

### Blog Post Breakdown

#### Post 1: XState State Machines in Production (8 story points)
**File**: `src/content/blog/xstate-production-sports-data.mdx`
**Word Count**: ~1,200 words
**Content**: Extract from technical appendix
- Five state machine architectures
- Impossible states pattern
- Transition guards and context
- TypeScript integration

**Cross-Links**:
- Main case study (System 2: Live-Collection-App)
- Blog post 2 (DSL integration)

**SEO Keywords**: XState, state machines, TypeScript, finite state machine

#### Post 2: Building DSLs with ANTLR (8 story points)
**File**: `src/content/blog/antlr-dsl-sports-rules.mdx`
**Word Count**: ~1,200 words
**Content**: Extract from technical appendix
- ANTLR grammar design
- Dataspec DSL syntax
- Rule engine compilation
- Product manager workflows

**Cross-Links**:
- Main case study (System 1: Domain Configuration)
- Blog post 3 (event graphs)

**SEO Keywords**: ANTLR, DSL, domain-specific language, parser generator

#### Post 3: Event Graphs + Claims Architecture (10 story points)
**File**: `src/content/blog/event-sourcing-claims-metadata.mdx`
**Word Count**: ~1,500 words
**Content**: Extract from technical appendix
- Kafka event streams
- Temporal vs logical dependencies
- Claims-based metadata resolution
- Provenance tracking

**Cross-Links**:
- Main case study (System 3: Backend Evolution)

**SEO Keywords**: Kafka, event sourcing, claims-based architecture

#### Post 4: UX for Power Users (8 story points)
**File**: `src/content/blog/contextual-keyboard-shortcuts-ux.mdx`
**Word Count**: ~1,000 words
**Content**: Extract from technical appendix
- Context-aware key mappings
- Electron integration
- Cognitive load reduction
- Vim-inspired workflows

**Cross-Links**:
- Main case study (System 2: UX Patterns)

**SEO Keywords**: keyboard shortcuts, Electron, UX design, productivity

### Blog Infrastructure Requirements (8 story points)

**Files to Create**:
- `src/layouts/BlogPostLayout.astro` - Template with reading time, code highlighting
- `src/pages/blog/index.astro` - Blog listing page
- `src/content/config.ts` - Content collections for blog posts

**Features**:
- Shiki code highlighting (already in Astro)
- Reading metadata component (already exists)
- Cross-link components to case study
- SEO meta tags (title, description, OG image)

### Technical Appendix Redirect (2 story points)

**File**: `src/pages/portfolio/statsbomb-technical-appendix.mdx`

**Action**: Replace with redirect message linking to blog series

```mdx
<Callout variant="primary" icon="info" title="Technical Content Moved to Blog Series">
  <p>The technical appendix has been expanded into a 4-part blog series:</p>

  <ul>
    <li><a href="/blog/xstate-production-sports-data">Part 1: XState State Machines</a></li>
    <li><a href="/blog/antlr-dsl-sports-rules">Part 2: Building DSLs with ANTLR</a></li>
    <li><a href="/blog/event-sourcing-claims-metadata">Part 3: Event Graphs + Claims</a></li>
    <li><a href="/blog/contextual-keyboard-shortcuts-ux">Part 4: UX for Power Users</a></li>
  </ul>

  <Button variant="primary" href="/blog">View All Blog Posts →</Button>
</Callout>
```

---

## 🎨 Alternative Ideas Explored (Not Implemented)

### 1. Blur the Background Alternative

**Concept**: Don't remove technical appendix, blur it instead
- Main case study text is SHARP
- Technical details (ANTLR grammar, XState config) BLURRED underneath
- Hover or click "Expand" to sharpen specific sections

**Pro**: Single document, no navigation
**Con**: Still 9,140 words to scroll (intimidating)
**Verdict**: ❌ Blog series better for SEO + digestibility

### 2. Reading Speed Adaptation

**Concept**: Detect scroll velocity to adjust reveal speed
```typescript
// Fast scrolling = instant reveals (scannable)
if (scrollVelocity > 1000px/s) {
  sentenceRevealDelay = 0; // Show all immediately
}
// Slow scrolling = sentence-by-sentence (reading)
else {
  sentenceRevealDelay = 500ms; // Natural reading pace
}
```

**Pro**: Adapts to user behavior
**Con**: Complex to implement reliably, may feel unpredictable
**Verdict**: ⏸️ Defer to future iteration (after core animations proven)

### 3. Story Beat Color Coding

**Concept**: Different highlight colors for story arc phases
- Phase 1 (Paper): Muted gray → bronze gold (humble beginnings)
- Phase 2 (Team): Bronze gold → bright gold (growth)
- Phase 3 (Scale): Bright gold → blue (maturity/impact)

**Pro**: Visual cue for "where you are" in story
**Con**: Too clever? Might distract from content
**Verdict**: ❌ Keep simple - 2 variants (emphasis + fade-in) sufficient

### 4. Skeleton Screen Pattern

**Concept**: Show paragraph OUTLINES first, fill in content as you scroll
```
████████████ █████ ████████  (paragraph skeleton)
         ↓ scroll ↓
"Week one. Ali and I sat..." (actual text fades in)
```

**Pro**: Reduces perceived content density
**Con**: Gimmicky for long-form technical content
**Verdict**: ❌ Focus on sentence reveals, not skeletons

---

## 📊 Complexity Breakdown

| Task | Story Points | Status | Notes |
|------|-------------|--------|-------|
| Add TextHighlight tags to story beats | 8 | ✅ Complete | 9 beats tagged, page loads successfully |
| Sentence-by-sentence reveal refactor | 21 | ⏳ Next | Complex DOM surgery, async sequencing |
| CSS updates | 2 | ⏳ Pending | Straightforward styling |
| Blog post 1 (XState) | 8 | ⏳ Week 2 | Content extraction + editing |
| Blog post 2 (ANTLR) | 8 | ⏳ Week 3 | Content extraction + editing |
| Blog post 3 (Event graphs) | 10 | ⏳ Week 4 | Longer post, complex diagrams |
| Blog post 4 (UX) | 8 | ⏳ Week 5 | Content extraction + editing |
| Blog infrastructure | 8 | ⏳ Week 2 | Layout, listing, content collections |
| Technical appendix redirect | 2 | ⏳ Week 6 | Simple replacement |

**Total**: 75 story points (~5-6 focused work sessions)

---

## 🚀 Publishing Timeline

### Week 1: Animation Foundation ⏳ IN PROGRESS
- ✅ Implement story beat highlighting (9 beats tagged)
- ⏳ Add sentence-by-sentence reveal
- ⏳ Test on demo page first, then case study

### Week 2: Blog Infrastructure
- Create blog layout + listing page
- Extract and edit blog post 1 (XState)
- **Publish blog post 1**

### Week 3: Blog Post 2
- Extract/edit/publish post 2 (ANTLR)

### Week 4: Blog Post 3
- Extract/edit/publish post 3 (Event graphs)

### Week 5: Blog Post 4
- Extract/edit/publish post 4 (UX)

### Week 6: Cleanup
- Redirect technical appendix to blog index
- Update case study cross-links
- SEO optimization (meta descriptions, OG images)

---

## ✅ Success Criteria

### Level 0 (30 seconds - Fast Scrollers)
- ✅ See 9 story beats tracing humble beginnings → scale → team → wisdom
- ✅ Recognize journey without reading full paragraphs
- ✅ Scannable at-a-glance narrative

### Level 1 (5-10 minutes - Engaged Readers)
- ⏳ Get full narrative through sentence-by-sentence reveal
- ⏳ Natural reading rhythm (not overwhelming wall of text)
- ⏳ Context appears as fast as they can read

### Level 2 (25+ minutes - Deep Dive)
- ✅ Existing progressive disclosure preserved (Accordions, TL;DR)
- ⏳ Technical depth available through blog series cross-links
- ⏳ No content removed - repackaged for digestibility

### SEO Impact
- ⏳ 4 blog posts ranking for: XState, ANTLR, event sourcing, UX keywords
- ⏳ Each post links back to main case study (internal linking SEO)
- ⏳ Monthly publishing cadence (one post per week = 4 weeks of fresh content)

---

## 🧪 Testing Strategy

### Story Beat Animation Tests
- [ ] Load `/portfolio/statsbomb` and scroll slowly
- [ ] Verify 9 highlights animate BEFORE context
- [ ] Check 250ms stagger feels natural (reading pace)
- [ ] Verify bronze gold color meets WCAG AA contrast
- [ ] Test `prefers-reduced-motion` (instant final state)

### Sentence Reveal Tests
- [ ] Paragraphs WITHOUT highlights still reveal sentence-by-sentence
- [ ] Sentences don't overlap (await each before next)
- [ ] Context opacity at 0.85 (muted but readable)
- [ ] No animation jank on fast scrolling

### Blog Series Tests
- [ ] All 4 blog posts render correctly
- [ ] Cross-links navigate to correct sections
- [ ] Code syntax highlighting works (Shiki)
- [ ] Technical appendix redirects to blog index

### Accessibility Tests
- [ ] Screen reader (VoiceOver) reads in order
- [ ] Keyboard navigation not interrupted by animations
- [ ] `prefers-reduced-motion` shows all instantly
- [ ] No focus traps during animation sequences

---

## 🎯 Design Principles Applied

### 1. Content-First Always
**Never sacrifice content for animation**
- Animations enhance reading, don't replace it
- All text eventually visible (no hidden content)
- Fast scrollers still get complete story through highlights

### 2. Respect User Preferences
**Accessibility is non-negotiable**
- `prefers-reduced-motion` = instant final state
- Semantic HTML (`<mark>` for highlights)
- No keyboard navigation interference

### 3. Progressive Disclosure
**Information layers match engagement depth**
- Layer 0: Story beats (30 seconds)
- Layer 1: Full narrative (5-10 minutes)
- Layer 2: Technical deep dives (blog series)

### 4. Cognitive Load Management
**Reading rhythm over visual spectacle**
- Word-by-word at natural reading speed (240 WPM)
- Sentence-by-sentence for context (not overwhelming)
- Muted context opacity keeps highlights prominent

### 5. SEO Without Compromise
**Technical depth + discoverability**
- Blog series = multiple ranking opportunities
- Cross-links strengthen internal SEO
- Fresh content cadence (one post per week)

---

## 📝 Open Questions & Future Iterations

### Open Questions
- ❓ Should demo page show all variants side-by-side?
- ❓ Blog post OG images: custom per post or template?
- ❓ RSS feed for blog series?

### Future Enhancements (Post-Launch)
- 🔮 Reading speed adaptation (scroll velocity detection)
- 🔮 "Reading progress" indicator for long sections
- 🔮 Blur-to-focus reveal for pull quotes
- 🔮 Cognitive load-based stagger (sentence boundaries, word length)

---

## 🔗 References

**Codrops Demos**:
- OnScrollTextHighlight: https://github.com/codrops/OnScrollTextHighlight/
- OnScrollTypographyAnimations: https://github.com/codrops/OnScrollTypographyAnimations/
- ScrollBlurTypography: https://tympanus.net/Development/ScrollBlurTypography/

**Technical Documentation**:
- Motion One: https://motion.dev
- Splitting.js: https://splitting.js.org/
- WCAG AA Contrast: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

**Related Project Docs**:
- Text Highlight Animation Styles: `docs/plans/text-highlight-animation-styles.md`
- Diagram Design System: `docs/plans/2025-10-30-diagram-design-system.md`
- Design System: `src/styles/global.css` (@theme block)

---

**Last Updated**: 2025-10-31
**Next Review**: After Week 1 completion (sentence reveal implementation)
