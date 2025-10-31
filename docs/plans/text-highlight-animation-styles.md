# Text Highlight Animation Styles

**Purpose**: Comprehensive catalog of scroll-triggered text animation patterns for attention management in long-form case studies

**Reading Context**: 240 WPM average, 250ms per word baseline for stagger timing

---

## Current Implementation

### ✅ Implemented Variants

1. **fade-in** (DEFAULT - Most Subtle)
   - Properties: `opacity: 0→1`, `scale: 0.95→1`
   - No color change - inherits text color
   - Best for: Body paragraphs, frequent use
   - Cognitive load: MINIMAL

2. **subtle-gold** (Egyptian Heritage)
   - Properties: `opacity: 0→1`, `color: #475569→#F4C430`
   - Egyptian gold accent
   - Best for: Key architectural terms, technologies
   - Cognitive load: LOW

3. **subtle-blue** (Red Sea)
   - Properties: `opacity: 0→1`, `color: #475569→#0EA5E9`
   - Best for: Links to other work, secondary emphasis
   - Cognitive load: LOW

4. **emphasis** (Bold + Gold)
   - Properties: `opacity: 0→1`, `color: #475569→#F4C430`, `font-weight: 600`
   - Best for: Breakthrough insights, section conclusions
   - Cognitive load: MEDIUM

---

## Possible Additions (From Codrops OnScrollTextHighlight)

### Character-Level Effects (NOT recommended for our use case)

**Why we skip these**: Character-by-character is too fast/overwhelming for technical content. We chose word-level for natural reading rhythm.

### Alternative Motion Patterns

5. **slide-up** (Subtle Vertical)
   - Properties: `opacity: 0→1`, `y: 10→0`
   - Gentle upward reveal
   - Best for: Pull quotes, section intros
   - Cognitive load: MEDIUM
   - Implementation:
   ```typescript
   animate(words, {
     opacity: [0, 1],
     y: [10, 0]
   }, {
     duration: 0.4,
     ease: egyptianEasing.water,
     delay: stagger(0.25)
   });
   ```

6. **blur-in** (Focus Effect)
   - Properties: `opacity: 0→1`, `filter: blur(4px)→blur(0px)`
   - Simulates focus/clarity
   - Best for: "Aha moment" insights, lessons learned
   - Cognitive load: HIGH (use sparingly)
   - Implementation:
   ```typescript
   animate(words, {
     opacity: [0, 1],
     filter: ['blur(4px)', 'blur(0px)']
   }, {
     duration: 0.6,
     ease: egyptianEasing.monument,
     delay: stagger(0.25)
   });
   ```

7. **rotate-in** (Playful)
   - Properties: `opacity: 0→1`, `rotate: -5→0`
   - Slight rotation reveal
   - Best for: NOT suitable for technical portfolio (too playful)
   - Cognitive load: HIGH

8. **letter-spacing-in** (Typographic)
   - Properties: `opacity: 0→1`, `letter-spacing: 0.2em→0em`
   - Compresses from spread letters
   - Best for: Technical terms (DSL, API, XState)
   - Cognitive load: MEDIUM
   - Implementation:
   ```typescript
   animate(words, {
     opacity: [0, 1],
     letterSpacing: ['0.2em', '0em']
   }, {
     duration: 0.5,
     ease: egyptianEasing.water,
     delay: stagger(0.25)
   });
   ```

---

## Cognitive Load-Based Stagger (Question 3)

### Current: Fixed 250ms per word
```typescript
const readingDelay = 250; // All words same timing
delay: stagger(readingDelay / 1000)
```

### Proposed: Adaptive stagger based on:

#### A. Word Length (longer words = more reading time)
```typescript
function calculateWordDelay(word: string): number {
  const baseDelay = 250; // 240 WPM baseline
  const charLength = word.length;

  if (charLength <= 3) return baseDelay * 0.8;  // 200ms - "the", "and"
  if (charLength <= 6) return baseDelay;        // 250ms - normal
  if (charLength <= 10) return baseDelay * 1.2; // 300ms - "architectural"
  return baseDelay * 1.5;                       // 375ms - "IntersectionObserver"
}
```

#### B. Sentence Boundaries (pause at punctuation)
```typescript
function calculateSentenceDelay(word: string): number {
  const baseDelay = 250;

  if (word.endsWith('.')) return baseDelay * 2;   // 500ms - full stop pause
  if (word.endsWith(',')) return baseDelay * 1.3; // 325ms - comma pause
  if (word.endsWith(':')) return baseDelay * 1.5; // 375ms - colon pause
  return baseDelay;
}
```

#### C. Technical Complexity (slower for domain terms)
```typescript
const technicalTerms = new Set([
  'XState', 'ANTLR', 'Kafka', 'PostgreSQL', 'TypeScript',
  'IntersectionObserver', 'GraphQL', 'microservices'
]);

function calculateComplexityDelay(word: string): number {
  const baseDelay = 250;
  const cleanWord = word.replace(/[.,!?;:]/, '');

  if (technicalTerms.has(cleanWord)) {
    return baseDelay * 1.4; // 350ms - pause on technical terms
  }
  return baseDelay;
}
```

#### D. Combined Cognitive Load Model
```typescript
function calculateAdaptiveDelay(word: string, index: number, words: string[]): number {
  const baseDelay = 250; // 240 WPM

  let multiplier = 1.0;

  // Factor 1: Word length
  if (word.length > 10) multiplier *= 1.3;

  // Factor 2: Sentence boundaries
  if (word.endsWith('.') || word.endsWith('?')) multiplier *= 2;
  else if (word.endsWith(',')) multiplier *= 1.3;

  // Factor 3: Technical complexity
  const cleanWord = word.replace(/[.,!?;:]/, '');
  if (technicalTerms.has(cleanWord)) multiplier *= 1.2;

  // Factor 4: Paragraph start (first 3 words slower)
  if (index < 3) multiplier *= 1.2;

  return baseDelay * multiplier;
}

// Usage with Motion One
const words = element.querySelectorAll<HTMLElement>('.word');
const delays = Array.from(words).map((word, i, arr) =>
  calculateAdaptiveDelay(word.textContent || '', i, arr.map(w => w.textContent || ''))
);

animate(words,
  { opacity: [0, 1], scale: [0.95, 1] },
  {
    duration: 0.4,
    ease: egyptianEasing.water,
    delay: delays.map(d => d / 1000) // Convert to seconds
  }
);
```

---

## Usage Recommendations

### Frequency Guidelines
- **fade-in**: Use freely (default variant, minimal disruption)
- **subtle-gold/blue**: 2-3 per section maximum
- **emphasis**: 1-2 per section (major insights only)
- **slide-up**: 1 per page (pull quotes)
- **blur-in**: 1 per case study (climactic moment)

### When NOT to Animate
- Body paragraphs with NO highlights (let reader flow naturally)
- Areas with diagrams/images (visual competition)
- Lists with badges/icons (already visually busy)
- Navigation/UI elements (functional, not content)

### Accessibility
- ALL variants respect `prefers-reduced-motion` (instant final state)
- ALL variants use semantic `<mark>` elements
- NO animation on user interaction (scroll-only, passive)

---

## Implementation Priority

### Phase 1 (Current) ✅
- [x] fade-in (default)
- [x] subtle-gold
- [x] subtle-blue
- [x] emphasis

### Phase 2 (If user feedback requests)
- [ ] slide-up (pull quotes)
- [ ] letter-spacing-in (technical terms)
- [ ] Adaptive cognitive load stagger

### Phase 3 (Advanced)
- [ ] blur-in (climactic moments)
- [ ] Custom stagger per section context

---

## Performance Notes

**Current bundle impact**:
- Motion One: 5KB (already imported)
- Splitting.js: 4KB (already imported)
- textHighlighting.ts: ~2KB
- **Total added**: ~11KB (acceptable for portfolio site)

**Runtime performance**:
- IntersectionObserver: Native, no overhead
- CSS transforms/opacity: GPU-accelerated
- Memory: Cleanup on View Transitions prevents leaks
