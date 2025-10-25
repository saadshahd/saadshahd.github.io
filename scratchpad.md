# Portfolio Build Plan

## Stack ✅
- Astro v5.15 + Bun + Tailwind v4 + View Transitions
- GitHub Pages via Actions
- Markdown for case studies

## Phase 1: Foundation ✅ COMPLETED

### Completed
✅ Astro project initialized with Bun
✅ Tailwind v4 configured with Vite plugin (not v3 - demonstrates expertise)
✅ Homepage hero with name, title, CTA
✅ 6 pages created: Home, Portfolio, About, Resume, Blog, Contact
✅ View Transitions working across all pages
✅ Navigation component with responsive design
✅ GitHub Actions workflow configured
✅ Pushed to GitHub: saadshahd/site
✅ Deployment triggered

### Site URL
- Local: http://localhost:4321/site
- Production: https://saadshahd.github.io/site (deploying now)

## Phase 1: Foundation (Week 1)

### Setup
```bash
bun create astro@latest saad-shahd-portfolio
# Select: Empty, TypeScript strict, Tailwind
bun install
bun dev
```

### Build
- Homepage hero (name, title, one-liner)
- 6 pages: Home, Portfolio, About, Resume, Blog, Contact
- Navigation with View Transitions
- Responsive layout
- Placeholder content

### Deploy
- GitHub Actions with `oven-sh/setup-bun@v1`
- Configure astro.config for GitHub Pages
- Push to trigger deploy

### Success
- Live at username.github.io
- View Transitions smooth
- Lighthouse Perf > 90
- Load time < 3s

## Phase 2: Content (Week 2)
- Bio + headshot on About
- Resume HTML + PDF download
- Contact: Email, LinkedIn, GitHub
- Typography + color palette
- Portfolio page structure

## Phase 3: Case Study (Week 3)
- StatsBomb case study (2000-3000 words)
- Structure: Problem → Architecture → Impact → Lessons
- Markdown template with frontmatter
- Code syntax highlighting
- Portfolio card with hover
- Blog landing page
- RSS feed

## Phase 4: Launch (Week 4)
- Meta tags (OG, Twitter)
- Favicon + icons
- Accessibility: WCAG AA
- Lighthouse: 95+/100/95+/100
- Analytics (Plausible/Vercel)
- Sitemap + robots.txt
- 404 page
- LinkedIn announcement

## Risk Mitigation

### 24-Hour Spike
- Hour 0-2: Homepage in Astro
- Hour 2-4: View Transitions
- Hour 4-6: GitHub Actions deploy

### Pivot Triggers
- Astro confusing after 4h → Vite + vanilla
- View Transitions janky → CSS only
- Markdown limiting → Add MDX

## Commands

```bash
# Dev
bun dev
bun run build
bun run preview

# Deploy
git push origin main

# Add integrations
bunx astro add mdx
```

## Reference Style
- 60% Cassidy (clean, content-first)
- 30% Jeremy (typography, minimal)
- 10% Patrick (brutalist touches)

## Success Metrics
- Week 1: 6 pages live, Perf > 90
- Week 2: Real content, no placeholders
- Week 3: Case study published
- Week 4: Lighthouse scores, public launch

## Story Points: 13
- Phase 1: 3
- Phase 2: 2
- Phase 3: 5
- Phase 4: 3

## Next Actions
1. Run `bun create astro@latest`
2. Build homepage hero
3. Add View Transitions
4. Setup GitHub Actions
5. Deploy to GitHub Pages
