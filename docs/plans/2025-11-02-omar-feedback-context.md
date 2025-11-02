# Omar Feedback: Adding Context for External Readers

**Date:** 2025-11-02
**Status:** Approved
**Confidence:** 90% (minimal changes, story arc preserved)

## Problem

Omar Negm (backend engineer from StatsBomb) reviewed the case study and identified 4 missing definitions that block external reader comprehension:

1. **"Collector"** - Used 47 times but never defined. External readers don't know if collectors are automated systems, software agents, or human analysts.
2. **Sport** - Soccer only implied through photo captions, never explicitly stated.
3. **Dartfish** - Mentioned as comparison but never defined as the incumbent video analysis tool.
4. **TLDR assumes domain expertise** - References StatsBomb, Hudl, collectors, broadcaster scale without establishing foundation.

**Core Issue:** Case study written for domain experts, not external readers.

## Decision: Define Once, Use Consistently

**Approach:** Keep "collectors" as authentic domain terminology (all 47 mentions stay). Add minimal context at strategic points:

1. **Subtitle (Line 40):** KEEP "collectors" - creates intrigue, definition follows shortly
2. **Origins opening (Lines 68-70):** ADD 2 sentences defining collectors + StatsBomb (Arqam)
3. **Dartfish mention (Line 375):** ADD "video analysis tool" phrase

**Why This Works:**
- Preserves authentic terminology (collectors = what StatsBomb actually calls them)
- Front-loads context in Origins section (readers learn foundation early)
- Minimal word count (~40 words added)
- Zero disruption to existing story arc (Hassan's changes remain intact)
- Progressive disclosure (subtitle → Origins definition → natural usage)

## Implementation

### Change 1: Origins Section Opening (Lines 68-70)

**Before:**
```
Origins: Week One Partnership

We shipped twice daily. Every morning, I'd push a new build of the FreezeFrame tool—replacing Dartfish's 12-minute manual clicking with computer vision-assisted positioning. By afternoon, collectors would test it during matches.
```

**After:**
```
Origins: Week One Partnership

StatsBomb (Arqam) employed hundreds of soccer analysts—called collectors—who manually tracked every pass, shot, tackle, and positioning during live matches. Video analysis, frame by frame, translated into structured data for professional teams.

Early days, we shipped twice daily. Every morning, I'd push a new build of the FreezeFrame tool—replacing Dartfish's 12-minute manual clicking with computer vision-assisted positioning. By afternoon, collectors would test it during matches.
```

**Impact:**
- Defines "collectors" as human soccer analysts
- Establishes sport (soccer) and entity (StatsBomb/Arqam)
- Explains core work (manual video → structured data)
- "Early days," provides temporal grounding (week one iteration rhythm)
- Flows naturally into personal narrative with smooth transition

### Change 2: Dartfish Context (Line 375)

**Before:**
```
The industry standard (Dartfish) forced button-heavy mouse clicks...
```

**After:**
```
The industry-standard video analysis tool (Dartfish) forced button-heavy mouse clicks...
```

**Impact:**
- 5 words added: "video analysis tool"
- External readers understand Dartfish = competing software
- Natural flow maintained

### Change 3: Subtitle (Line 40)

**Decision:** KEEP AS IS
```
2018-2022: What if 1000 collectors could work concurrently without choosing between speed and correctness?
```

**Rationale:**
- Creates intrigue
- Definition comes 28 lines later in Origins
- Changing to "soccer analysts" would require replacing all 47 "collector" mentions
- Authentic terminology > external clarity in subtitle

## Alternatives Considered

### Alternative 1: Replace "collector" everywhere with "soccer analysts"
- **Rejected:** 47 instance changes, loses authentic terminology, feels unnatural
- **Trade-off:** External clarity vs. domain authenticity (chose authenticity)

### Alternative 2: Inline parentheticals at first use
- **Rejected:** "collectors (human analysts tracking passes, shots, tackles)" feels clunky
- **Trade-off:** Brevity vs. natural flow (chose natural flow)

### Alternative 3: Rewrite TLDR with full context
- **Rejected:** Scope creep, breaks minimalism constraint
- **Trade-off:** Complete context layer vs. surgical fixes (chose surgical)

## Reversibility

**Type:** 2A (< 1 minute rollback)
- 2 text additions, easily reverted
- No architectural changes
- Git revert straightforward

## Success Criteria

- [ ] External readers (non-sports-tech background) understand "collector" role by end of Origins section
- [ ] Story arc remains intact (Origins → Problem → Witnessing → Architecture → Epilogue)
- [ ] Word count increase < 50 words
- [ ] No changes to existing 47 "collector" mentions

## Key Assumptions

1. Origins section (line 68) is early enough to define collectors before confusion sets in
2. Readers tolerate 28 lines of "collector" usage before explicit definition
3. "StatsBomb (Arqam)" format communicates Egyptian entity without disruption

## Applied Patterns

- **Progressive Disclosure:** Subtitle (intrigue) → Origins (foundation) → Usage (natural)
- **Minimal Viable Context:** Define once, use consistently
- **YAGNI:** Rejected TLDR rewrite and full context layer (unnecessary scope)
- **Domain Authenticity:** Kept "collectors" over "soccer analysts" (respect actual terminology)

## Related Documents

- `docs/feedback/omar-negm.md` - Original feedback from Omar
- `docs/feedback/hassan.md` - Hassan's feedback (already implemented, story arc intact)
