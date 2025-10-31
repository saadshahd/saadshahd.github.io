# Statsbomb Photo Captions - Context Needed

**Status**: Captions enabled in PhotoSwipe lightbox ✅
**Task**: Replace 13 TODO placeholders with 1-2 sentence descriptions from your personal context

---

## Instructions

Each photo in the gallery needs a caption that provides human context:
- **Who**: Who are the people in the photo?
- **When**: What time period or specific event?
- **What**: What were you working on or discussing?
- **Why it matters**: How does this connect to the story?

**Length**: 1-2 sentences maximum (keep it concise for mobile)
**Tone**: Match the case study voice (collaborative, humble, specific)

---

## Photo 1: collection-leadership-night.jpg ⭐ NEW

**Current Caption**:
> TODO: Add caption with your context - Who were these collection leaders? What were they discussing during this night shift? (1-2 sentences)

**Context Needed**:
- Who are these 4 people? (Names if you remember)
- What were they discussing about their ambitions/dreams?
- What time period? (2018, 2019, 2020?)

**Suggested Format**:
> "[Names], collection leads (2019): Late-night shift discussing career ambitions after finishing Champions League matches. They wanted to understand systems thinking, not just click buttons."

---

## Photo 2: IMG_20180326_132547.jpg

**Current Caption**:
> TODO: Add caption describing this photo - team meeting, workspace, or technical discussion context (1-2 sentences).

**Context Needed**:
- Who is in this photo?
- What were you working on? (Week One? Live-collection-app?)
- Cairo office context?

---

## Photo 3: IMG_20180410_163253.jpg

**Current Caption**:
> TODO: Add caption - April 2018 context, Electron app development, XState implementation.

**Context Needed**:
- Is this the freezeframe tool development?
- Who are the people visible?
- What milestone does April 2018 represent?

---

## Photo 4: IMG_20180813_133937.jpg

**Current Caption**:
> TODO: Add caption describing this photo - architectural sessions, code reviews, or team collaboration moments.

**Context Needed**:
- August 2018 - what were you building at this point?
- Was this the DSL work starting?
- Team context?

---

## Photo 5: IMG_20180814_180157.jpg

**Current Caption**:
> TODO: Add caption - DSL, ANTLR, Kafka integration context from August 2018.

**Context Needed**:
- Is this when you started the backend DSL work?
- Who is in the photo?
- What specific problem were you solving?

---

## Photo 6: IMG_20190625_113053.jpg

**Current Caption**:
> TODO: Add caption - XState state machines, real-time collection, Electron app evolution (June 2019).

**Context Needed**:
- June 2019 - what milestone?
- Was real-time collection working at this point?
- Who are the team members?

---

## Photo 7: IMG_20190815_190736.jpg

**Current Caption**:
> TODO: Add caption - Team growth, Cairo engineering expansion, second year context (August 2019).

**Context Needed**:
- How many people on the team at this point?
- What were you celebrating or working on?
- Any specific context from August 2019?

---

## Photo 8: _MG_0011.jpg

**Current Caption**:
> TODO: Add caption - Technical architecture discussion, whiteboard sessions, or pairing context.

**Context Needed**:
- What are you discussing in this photo?
- Who is this with? (Ali? Adham?)
- What problem were you solving?

---

## Photo 9: _MG_0017.jpg

**Current Caption**:
> TODO: Add caption - Engineering workspace, code review, or debugging session context.

**Context Needed**:
- What were you working on?
- What time period?
- Any specific bug or feature context?

---

## Photo 10: IMG_0570.jpg

**Current Caption**:
> TODO: Add caption - Team planning, sprint retrospective, or feature discussion context.

**Context Needed**:
- What meeting or planning session is this?
- What were you planning?
- Time period context?

---

## Photo 11: IMG_5279.jpg

**Current Caption**:
> TODO: Add caption - Sports data collection, match analysis, or collector training context.

**Context Needed**:
- Is this a collector training session?
- What sport? (Soccer, NFL expansion?)
- What were you demonstrating or discussing?

---

## Photo 12: df52f41a-686e-4989-8f34-08b1487920b6.jpg

**Current Caption**:
> TODO: Add caption - Team milestone, celebration, or gathering outside typical work context.

**This is the night debugging photo with Adham and Waheed** - already captioned inline in the case study.

**Suggested Caption for Gallery**:
> "Late night debugging with Adham and Waheed (2019): Real-time collection stress testing during live matches. Ali stayed for company, not supervision."

---

## Photo 13: IMG_5078.jpg

**Current Caption**:
> TODO: Add caption - Engineering workspace perspective, team environment, or office culture context.

**Context Needed**:
- What does this photo show?
- What time period?
- Why did you take this photo?

---

## Next Steps

1. **Review each photo** in the gallery at http://localhost:4321/portfolio/statsbomb
2. **Click each photo** to open PhotoSwipe lightbox and see the TODO caption
3. **Update `src/data/statsbomb-photos.json`** with real captions (replace "TODO: ..." strings)
4. **Test mobile rendering** - Ensure captions read well on small screens

---

## Caption Writing Tips

**Good Example**:
> "Ali and Adham pairing on ANTLR grammar (August 2018): Defining sequencing rules for possession chains. This VSCode session led to the 'start → [middle*] → break' mental model."

**Why it works**:
- Names specific people and time
- Explains what they're working on
- Connects to narrative (VSCode moment from case study)
- Concise (under 2 sentences)

**Bad Example**:
> "Team working together on the data collection system in Cairo office"

**Why it fails**:
- Generic (could describe any photo)
- No specific context or connection to story
- No names, no time period, no insight

---

## File to Edit

**Location**: `src/data/statsbomb-photos.json`
**Lines**: 1-99 (all 13 photos)
**Search for**: `"caption": "TODO:`
**Replace with**: Your 1-2 sentence context

**After editing**, refresh the page and click photos to verify captions display correctly in the lightbox.
