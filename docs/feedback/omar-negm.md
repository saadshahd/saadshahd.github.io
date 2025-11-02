# Omar Negm Feedback - 2025-11-02

**Context:** Backend engineer from StatsBomb (built initial sync endpoint) reviewing the case study for clarity

## Key Points

### 1. What is a Collector?
- **Problem:** Term "collector" used 47 times but never explicitly defined
- **Missing Context:** Readers don't know if collectors are:
  - Automated systems/sensors?
  - Software agents?
  - Human analysts?
- **Reality:** Human analysts who manually track every pass, shot, tackle during matches
- **Impact:** External readers can't understand the problem without this foundation

### 2. What Sport Are You Collecting Data On?
- **Problem:** Soccer/football only implied through photo captions (line 114: "Soccer field geometry")
- **Missing:** TLDR jumps to "5000+ collectors across multiple sports" without stating the starting sport
- **Impact:** Readers lack context for understanding scale and complexity
- **Note:** Multiple sports came later (American football in 2020), but soccer was the foundation

### 3. What is Dartfish?
- **Problem:** Mentioned as "Dartfish's 12-minute manual clicking" without definition
- **Missing Context:** Never explicitly stated that Dartfish is:
  - A competing video analysis software
  - The incumbent industry standard tool
  - A button-heavy, mouse-driven interface (vs. keyboard-first workflows)
- **Current Mentions:** Lines 70, 375 - assumes reader knows what Dartfish is
- **Impact:** Readers unfamiliar with sports tech won't understand the competitive context

### 4. TLDR Assumes Too Much Domain Knowledge
- **Current (line 59):** "Built real-time sports data collection with Ali from week one sketches to 5000+ collectors across multiple sports. When Hudl acquired Statsbomb in 2024, they bought the collection infrastructure..."
- **What Non-Expert Readers Don't Know:**
  - What collectors do (watch matches? annotate video? click buttons?)
  - What sport(s) we're talking about
  - What StatsBomb is (sports analytics company)
  - What Hudl is (video analysis platform)
  - Why hands cramp (manual mouse clicking for hours)
  - What "concurrent data capture at broadcaster scale" means
- **Result:** TLDR is written for someone already familiar with sports analytics industry

## Action Items

- [ ] Rewrite TLDR for zero-context readers (define collectors as human analysts, specify soccer, explain hand cramping)
- [ ] Define "Dartfish" at first mention (line 70): "Dartfish (the industry-standard video analysis software)"
- [ ] Add context to subtitle (line 40): Change "collectors" to "soccer analysts"
- [ ] Strengthen Origins opening (line 70): Add one sentence explaining what collectors do
- [ ] Define StatsBomb and Hudl in TLDR for external readers
- [ ] Add "what is a collector" explanation before first usage

## Proposed TLDR Rewrite

**Before:**
> "Built real-time sports data collection with Ali from week one sketches to 5000+ collectors across multiple sports. When Hudl acquired Statsbomb in 2024, they bought the collection infrastructure—the system that made concurrent data capture possible at broadcaster scale."

**After:**
> "Built real-time sports analytics tools for human analysts who manually track every pass, shot, and tackle during live soccer matches. Started with one frustrated analyst whose hand cramped from 12 minutes of mouse-clicking per event. Four years later, 5000+ collectors worked concurrently across multiple sports—and when Hudl (the industry's leading video platform) acquired StatsBomb in 2024, they bought the collection infrastructure that made broadcaster-scale analytics possible."

**Why This Works:**
- ✅ Defines "collectors" as human analysts
- ✅ Specifies soccer as the starting sport
- ✅ Explains why hands cramp (mouse-clicking)
- ✅ Contextualizes StatsBomb (sports analytics) and Hudl (video platform)
- ✅ Shows problem → solution arc

## Writing Philosophy Update

**Core Issue:** Case study written for domain experts, not external readers

**Assumption Check:**
- ❌ Assumes readers know sports analytics companies collect data manually
- ❌ Assumes readers know collectors are human analysts (not automated systems)
- ❌ Assumes readers know Dartfish is the incumbent video analysis tool
- ❌ Assumes readers know soccer was the initial sport

**Fix Strategy:**
- **Add Context Early:** One sentence of explanation at critical junctures (TLDR, first mentions)
- **Don't Disrupt Flow:** Brief definitions that ground external readers without patronizing domain experts
- **Front-Load Context:** TLDR should define all key terms for zero-knowledge readers

**External Reader Test:**
- Would someone from a different industry (finance, healthcare, e-commerce) understand this without Googling?
- If no → add context at first mention
