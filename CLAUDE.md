# Portfolio Site - Project Instructions

## Design Philosophy

**Persona:** Technical authority with taste
**Approach:** Content-first, animations enhance UX (never distract)

### Animation Rules

- Subtle and purposeful only
- Page transitions, scroll reveals, hover states
- No looping animations, particle effects, or performance blockers
- 1-2 animations maximum for initial ship

### Visual Direction

- Clean, professional typography
- Clear, readable layouts
- Confident but accessible tone
- Inspiration: Josh Comeau, Cassie Evans, Dan Abramov

---

## Content Structure

### Homepage

- Intro: "Principal Engineer specializing in real-time systems and functional architecture"
- Featured work: 2-3 case study cards with hover animations
- Latest blog post preview
- CTA: "View portfolio" or "Get in touch"

### Portfolio

- 3-5 case studies
- Format: Problem → Architecture → Impact → Lessons
- 2000-3000 words + diagrams each

### Blog

- Technical articles
- Monthly frequency (after site is live)
- Start with: "How I Designed a Real-Time Data Collection System"

### About

- Professional bio: 200-300 words
- Technical expertise areas
- Career highlights
- Professional headshot

### Resume

- Downloadable PDF
- HTML web version

### Contact

- Email, LinkedIn, GitHub
- Optional: Simple contact form

---

## Success Criteria

### Must Have (Week 1-2)

- [x] Live on GitHub Pages
- [x] At least one Motion One animation working
- [x] Basic navigation structure
- [x] Responsive layout (mobile + desktop)
- [x] Placeholder content in all sections
- [x] Load time < 3 seconds

### Should Have (Week 3-4)

- [ ] First case study published (StatsBomb)
- [ ] Professional bio written
- [ ] Updated resume/CV
- [ ] Contact information

### Could Have (Month 2+)

- [ ] Blog posts published
- [ ] Advanced animations
- [ ] Additional case studies
- [ ] SEO optimization

---

## Tech Stack

**Core:** Astro v5, Bun, Tailwind v4, Motion One (motion.dev), GitHub Pages/Actions
**Current:** View Transitions API built into Astro
**Optional:** Markdown for blog/case studies
**Forbidden:** Complex build systems, heavy frameworks, over-engineering

### Animation Library Decision (IMPORTANT)

**✅ CORRECT: Motion One** (`motion` package)
- Framework-agnostic, works with Astro/vanilla JS
- Lightweight (~5KB), built on Web Animations API
- Simple API: `animate(selector, props, options)`
- Site: https://motion.dev

**❌ WRONG: Framer Motion** (`framer-motion` package)
- React-specific, won't work in Astro components
- Only use if we add React islands (we haven't)

**❌ WRONG: anime.js**
- Export issues in v4, non-standard API
- Larger bundle size than Motion One
- Already removed from project

**Rule:** For ANY animation in this Astro project, use Motion One or native CSS. Never add React-specific libraries unless we explicitly add React integration first.

---

## Definition of Done

**Week 2:** Shareable URL, one animation, responsive, placeholder content, navigation
**Month 1:** First case study, bio/resume live, actively shared
