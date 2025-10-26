# Portfolio Site - Project Instructions

## Design Philosophy

**Persona:** Technical authority with taste
**Approach:** Content-first, animations enhance UX (never distract)

### Egyptian Heritage Brand

**Identity**: Egyptian engineer inspired by Nile, pyramids, Red Sea, High Dam, 1973 water engineering (Bar Lev Line breakthrough)
**Aesthetic**: Heritage as backdrop - present but not overwhelming technical content
**Visual Metaphor**: Creative problem-solving through abstract geometric patterns

**Color Palette** (src/styles/global.css @theme):

- Primary: `#F4C430` (bright Egyptian gold) - magical, luminous
- Secondary: `#0EA5E9` (Red Sea blue) - clear water, NOT greenish
- Accent: `#06B6D4` (vibrant cyan-blue)
- Background: `#F5F1E8` (limestone cream)

**Pattern Components** (src/components/patterns/):

- `PyramidGrid`: Large-scale pyramids (800x800px), golden ratio, 3 elements max, opacity 0.08-0.12
- `WaterFlow`: Flowing Nile lines, breakthrough elements (water engineering metaphor)

**Pattern Rules**:

- Desktop-optimized, bold animations (scale, flow, reveal)
- Mobile: static or minimal CSS-only
- `prefers-reduced-motion` respected
- Full-screen `fixed inset-0` behind content (z-index: 0)
- Elegant minimalism: fewer elements, larger scale, breathing room
- NO visual noise - 2-3 clean elements per pattern max

### Animation Strategy

**Hero**: Geometric reveal (1.5s patterns → content fades)
**Principles**: Bold storytelling, never distract from content, respect motion preferences
**Inspiration**: Josh Comeau, Cassie Evans, Dan Abramov + Egyptian geometric art

---

## Content Style & Voice

**Voice**: Minimalist clarity - every word earns its place
**Tone**: Respectful depth - never condescend, never showboat
**Philosophy**: Production wisdom > trends, first principles > hype

### Writing Rules

**Sentence Rhythm** (Gary Provost): Vary length for musicality

- Short: punch and emphasis
- Medium: natural flow and connection
- Long: build energy toward architectural insights that matter

**Typography Breaks**: Use `<wbr>` for long technical terms (e.g., `StatsBomb<wbr>DataCollection<wbr>Pipeline`) and `text-wrap: balance` for headlines

**Every Sentence Must**: Teach principle, reveal decision, or show impact

**Forbidden**: Hype trends, performative jargon, tutorial-only content, condescension

**Clarity**: Write for "intelligent curious person" - explain complexity simply, consistent depth for all

### Reader Goals (Priority Order)

1. Trust (battle-tested experience)
2. Learning (deeper systems thinking)
3. Practical (applicable patterns)
4. Respect (principal-level thought)

### Case Study: Problem → Architecture → Impact → Lessons

- Problem (300-500w): Context, challenge, why it mattered
- Architecture (1000-1500w): Decisions, tradeoffs, diagrams, insights
- Impact (300-500w): Results, effects, what shipped
- Lessons (200-400w): What worked/didn't, principles, when to use

### Blog: Hook → Context → Deep Dive → Principle → Application

### Pre-Publish Checklist

- [ ] Sentence lengths vary (short/medium/long)
- [ ] No hype words (revolutionary, game-changing)
- [ ] No unnecessary jargon
- [ ] Every paragraph teaches
- [ ] Production wisdom evident
- [ ] First principles explained

---

## Content Structure

**Homepage**: Intro (Principal Engineer, realtime systems & functional thinking), 2-3 case studies, blog preview, CTA
**Portfolio**: 3-5 case studies (Problem→Architecture→Impact→Lessons), 2000-3000w + diagrams
**Blog**: Monthly technical articles, start with "Real-Time Data Collection System"
**About**: Bio 200-300w, expertise, highlights, headshot
**Resume**: PDF + HTML version
**Contact**: Email, LinkedIn, GitHub, optional form

---

## Success Criteria

**Week 1-2**: Live, one animation, responsive, placeholder content, <3s load
**Week 3-4**: First case study (StatsBomb), bio, resume, contact
**Month 2+**: Blog posts, more case studies, SEO

---

## Tech Stack

**Core:** Astro v5, Bun, Tailwind v4, Motion One (motion.dev), GitHub Pages/Actions
**Current:** View Transitions API built into Astro
**Optional:** Markdown for blog/case studies
**Forbidden:** Complex build systems, heavy frameworks, over-engineering

### Animation Library

**✅ Motion One** (`motion` package): Framework-agnostic, 5KB, Web Animations API - https://motion.dev
**❌ Framer Motion**: React-only (we don't use React)
**❌ anime.js**: Export issues, removed
**Rule**: Motion One or native CSS only. No React libs without React integration.

### Code Highlighting

**✅ Shiki** (https://shiki.style): Built into Astro

---

## Done = Week 2: Shareable + animation + responsive | Month 1: Case study + bio/resume
