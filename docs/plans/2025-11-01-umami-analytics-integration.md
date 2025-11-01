# Umami Analytics Integration - Design Document

**Date:** 2025-11-01
**Status:** Design Approved
**Confidence:** 85% (proven solution, straightforward integration)

---

## Problem

After launching the portfolio and sharing on LinkedIn, we have zero visibility into:

- **Visitor behavior** - Are people reading the case study? Where do they drop off?
- **Traffic sources** - Is LinkedIn driving traffic? Which posts work?
- **Engagement patterns** - Do CTAs work? Which sections engage?
- **Drop-off points** - Where do visitors leave?

**Current state:** Flying blind, can't optimize content or validate LinkedIn strategy

---

## Decision: Umami Cloud (Hobby Tier)

**Chosen solution:** Umami Cloud analytics with custom event tracking

**Why Umami:**

- ✅ **Free tier sufficient** (100K events/month, 3 websites, 6-month retention)
- ✅ **Privacy-first** (cookie-free, GDPR compliant, no consent banner)
- ✅ **Custom events** (scroll depth, CTA clicks, section engagement)
- ✅ **UTM support** (LinkedIn attribution tracking)
- ✅ **Open source** (can self-host later if needed)
- ✅ **Lightweight** (~3KB script, async load, no performance impact)

**Alternative considered (70% confident):** Cloudflare Web Analytics

- **Pros:** 100% free forever, even simpler setup
- **Cons:** No custom event tracking (can't measure scroll depth, CTA clicks)
- **Why rejected:** User wants "nice to have" event tracking for engagement insights

---

## Architecture

### Core Components

```
┌─────────────────────────────────────────────────────────────┐
│                    Portfolio Site (Astro)                    │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Layout.astro (All Pages)                              │ │
│  │  ├─ Umami script tag in <head>                         │ │
│  │  │  └─ Automatic: pageviews, visitors, referrers      │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Case Study Page (statsbomb.astro)                     │ │
│  │  ├─ Intersection Observer for scroll depth            │ │
│  │  │  └─ Events: 25%, 50%, 75%, 100% depth              │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  CTA Components (Button.astro)                         │ │
│  │  ├─ onClick handlers track events                     │ │
│  │  │  └─ Events: cta-click with location + text         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Analytics Utility (utils/analytics.ts)                │ │
│  │  ├─ trackEvent() wrapper                              │ │
│  │  ├─ trackScroll() helper                              │ │
│  │  └─ prefersReducedMotion() check                      │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTPS (async, non-blocking)
                           ▼
                  ┌─────────────────┐
                  │  Umami Cloud    │
                  │  - Events       │
                  │  - Dashboard    │
                  │  - Reports      │
                  └─────────────────┘
```

### Tracking Strategy

**Automatic tracking (no code needed):**

- Pageviews, unique visitors
- Referrer sources (linkedin.com visible)
- Country, device, browser, OS
- Page paths and durations

**Custom event tracking:**

| Event Type      | Trigger                                 | Data Captured               | Why                                        |
| --------------- | --------------------------------------- | --------------------------- | ------------------------------------------ |
| `scroll-depth`  | Intersection Observer at 25/50/75/100%  | page, depth, section        | Shows where readers drop off in case study |
| `cta-click`     | Button/Link click                       | location, text, destination | Measures CTA effectiveness                 |
| `section-view`  | Intersection Observer on major sections | page, section-name          | Identifies engaging vs skipped sections    |
| `outbound-link` | External link click                     | destination, source-page    | Tracks LinkedIn/GitHub profile clicks      |

**UTM parameters for LinkedIn:**

```
https://saadshahd.github.io/?utm_source=linkedin&utm_medium=social&utm_campaign=launch-2025-01
https://saadshahd.github.io/portfolio/statsbomb/?utm_source=linkedin&utm_medium=social&utm_campaign=case-study-statsbomb
```

---

## Implementation Plan

### Phase 1: Base Integration (5 minutes, 1 story point)

**Files modified:**

1. `src/layouts/Layout.astro` - Add Umami script tag
2. `.env` - Add `PUBLIC_UMAMI_WEBSITE_ID` (from Umami dashboard)
3. `.env.example` - Document environment variable

**Changes:**

- Add conditional script tag in `<head>` (only loads if env var set)
- Async/defer loading (no performance impact)
- TypeScript globals for `window.umami`

**Verification:**

- Load site, check Network tab for `script.js` from `cloud.umami.is`
- Visit Umami dashboard, confirm pageview recorded
- Test on multiple pages, verify paths tracked correctly

---

### Phase 2: Analytics Utility (10 minutes, 1 story point)

**Files created:**

1. `src/utils/analytics.ts` - Event tracking helpers
2. `src/types/umami.d.ts` - TypeScript definitions for Umami API

**API design:**

```typescript
// Core tracking function
export function trackEvent(name: string, data?: Record<string, any>): void;

// Convenience helpers
export function trackCTAClick(location: string, text: string): void;
export function trackScrollDepth(page: string, depth: number): void;
export function trackSectionView(page: string, section: string): void;
export function trackOutboundLink(destination: string, source: string): void;
```

**Type safety:**

```typescript
// src/types/umami.d.ts
interface Window {
  umami?: {
    track: (eventName: string, eventData?: Record<string, any>) => void;
  };
}
```

**Error handling:**

- Check `typeof window !== 'undefined'` (SSR safety)
- Check `'umami' in window` (script loaded)
- Silent failure if Umami unavailable (graceful degradation)

---

### Phase 3: CTA Tracking (10 minutes, 1 story point)

**Files modified:**

1. `src/components/Button.astro` - Add click tracking
2. `src/components/Link.astro` - Add outbound link tracking
3. `src/components/CalloutCTA.astro` - Track CTA interactions

**Implementation pattern:**

```astro
---
// Button.astro
import { trackCTAClick } from '@/utils/analytics';

interface Props {
  href: string;
  variant?: 'primary' | 'secondary';
  trackingLabel?: string; // Optional: defaults to button text
}

const { href, variant = 'primary', trackingLabel } = Astro.props;
const isExternal = href.startsWith('http');
---

<a
  href={href}
  class={`button button--${variant}`}
  onclick={trackingLabel ? `umami.track('cta-click', { location: '${Astro.url.pathname}', text: '${trackingLabel}', destination: '${href}' })` : undefined}
  target={isExternal ? '_blank' : undefined}
  rel={isExternal ? 'noopener noreferrer' : undefined}
>
  <slot />
</a>
```

**Tracked CTAs:**

- Homepage: "Explore My Work", "Start a Conversation"
- Case study: "Read Full Case Study" cards
- About page: "Download Resume"
- Contact: Email/LinkedIn/GitHub links

---

### Phase 4: Scroll Depth Tracking (15 minutes, 2 story points)

**Files modified:**

1. `src/pages/portfolio/statsbomb.astro` - Add scroll observer

**Implementation approach:**

```typescript
// Intersection Observer watching key sections
const observeScrollDepth = () => {
  const sections = [
    { element: document.querySelector("#tldr"), depth: 25 },
    { element: document.querySelector("#architecture"), depth: 50 },
    { element: document.querySelector("#impact"), depth: 75 },
    { element: document.querySelector("footer"), depth: 100 },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = sections.find((s) => s.element === entry.target);
          if (section) {
            umami.track("scroll-depth", {
              page: "statsbomb-case-study",
              depth: `${section.depth}%`,
              section: entry.target.id,
            });
            observer.unobserve(entry.target); // Fire once per section
          }
        }
      });
    },
    { threshold: 0.5 }
  ); // Fire when 50% of section visible

  sections.forEach((s) => s.element && observer.observe(s.element));
};

// Run after page load
if (document.readyState === "complete") {
  observeScrollDepth();
} else {
  window.addEventListener("load", observeScrollDepth);
}
```

**Why Intersection Observer:**

- More accurate than scroll listeners
- Better performance (browser-optimized)
- Fires once per section (no duplicate events)
- Respects `prefers-reduced-motion` (standard behavior)

**Sections tracked:**

1. **25% (TL;DR)** - User started reading
2. **50% (Architecture)** - User engaged with technical content
3. **75% (Impact)** - User reading outcomes
4. **100% (Footer)** - Full read-through

---

### Phase 5: Dashboard Configuration (5 minutes, 0.5 story points)

**Umami dashboard setup:**

1. **Custom reports:**

   - "LinkedIn Traffic" - Filter by `utm_source=linkedin`
   - "Case Study Engagement" - Filter `scroll-depth` events on statsbomb page
   - "CTA Performance" - Filter `cta-click` events, group by text
   - "Drop-off Analysis" - Compare scroll depths (100% - 75% - 50% - 25%)

2. **Goals (if available on free tier):**

   - Goal: "Contact CTA Click"
   - Goal: "Full Case Study Read" (100% scroll depth)

3. **Shared dashboard:**
   - Enable public link (optional, for sharing insights)

---

## Technical Decisions

### Why Not Google Analytics?

**Rejected (40% confident GA would work):**

- ❌ Cookie-based (requires consent banner)
- ❌ Privacy concerns (tracks users across sites)
- ❌ Overkill for portfolio (enterprise features unused)
- ❌ Slower script load (~45KB vs 3KB)
- ❌ More complex event tracking API

### Why Not Plausible? ($9/month)

**Deferred (90% confident Plausible would be better, but cost matters):**

- ❌ $9/month exceeds "free only" budget
- ✅ Automatic scroll depth tracking (would save implementation time)
- ✅ Better UX, Google Search Console integration
- **Future consideration:** Upgrade if traffic grows or budget allows

### Environment Variable Strategy

**Decision:** Use `PUBLIC_UMAMI_WEBSITE_ID` (public prefix)

- ✅ Astro convention for client-side env vars
- ✅ Safe to expose (website ID is public in script tag anyway)
- ✅ Easy to set in GitHub Pages environment (if needed)

---

## Privacy & Compliance

**GDPR/CCPA compliance:**

- ✅ No cookies (no consent banner required)
- ✅ No personal data collected (anonymous counts)
- ✅ No cross-site tracking
- ✅ Visitor IP addresses anonymized

**Performance impact:**

- Umami script: ~3KB gzipped
- Loads async (doesn't block render)
- Custom events: negligible (<1KB per page)
- **Expected load time:** 2.1s → 2.1s (no change)

**Accessibility:**

- ✅ Tracking doesn't affect screen readers
- ✅ No visual changes to UI
- ✅ Works with JavaScript disabled (graceful degradation)

---

## Success Metrics

**After 1 week, we should know:**

- ✅ Total visitors from LinkedIn post
- ✅ Bounce rate (% who leave immediately)
- ✅ Case study engagement (% reaching 50%, 75%, 100% depth)
- ✅ CTA click-through rate
- ✅ Top referrer sources

**After 1 month, we can optimize:**

- If 50% drop at 50% scroll → Middle sections need work
- If LinkedIn bounce rate >70% → Landing page needs improvement
- If CTA clicks <5% → CTA copy/placement needs adjustment
- If contact page visits low → Add more CTAs

---

## Reversibility

**High reversibility (90% confident):**

- Remove script tag from Layout.astro → Back to no tracking (5 minutes)
- Keep event tracking code → Works with other analytics (Plausible, Fathom)
- Export data from Umami → CSV download anytime
- Migrate to self-hosted Umami → Same tracking code, different endpoint

**Migration path to paid solution:**

1. Keep Umami script tag
2. Add Plausible script tag (runs in parallel)
3. Compare data for 1-2 weeks
4. Remove Umami, keep Plausible
5. Total migration time: 10 minutes

---

## Implementation Checklist

```
Phase 1: Base Integration (1 story point)
- [ ] Add Umami website in dashboard, get Website ID
- [ ] Add PUBLIC_UMAMI_WEBSITE_ID to .env
- [ ] Update .env.example with documentation
- [ ] Add Umami script tag to Layout.astro
- [ ] Test: Load site, verify script loads in Network tab
- [ ] Test: Check Umami dashboard shows pageview

Phase 2: Analytics Utility (1 story point)
- [ ] Create src/utils/analytics.ts with trackEvent()
- [ ] Create src/types/umami.d.ts with TypeScript definitions
- [ ] Add convenience helpers (trackCTAClick, trackScrollDepth, etc.)
- [ ] Test: Call trackEvent() from browser console

Phase 3: CTA Tracking (1 story point)
- [ ] Update Button.astro with onclick tracking
- [ ] Update Link.astro for outbound links
- [ ] Update CalloutCTA.astro with tracking
- [ ] Test: Click each CTA, verify events in Umami Real-time view

Phase 4: Scroll Depth Tracking (2 story points)
- [ ] Add Intersection Observer to statsbomb.astro
- [ ] Configure thresholds for 25/50/75/100% sections
- [ ] Test: Scroll case study, verify events fire once per section
- [ ] Test: Check events don't fire multiple times

Phase 5: Dashboard Configuration (0.5 story points)
- [ ] Create custom report for LinkedIn traffic
- [ ] Create custom report for scroll depth analysis
- [ ] Set up goals for contact CTA + full reads
- [ ] Document dashboard views in this file

Phase 6: Documentation & Launch (0.5 story points)
- [ ] Update CLAUDE.md with analytics tracking conventions
- [ ] Add comment to Layout.astro explaining Umami setup
- [ ] Commit with message: "feat(analytics): integrate Umami tracking"
- [ ] Deploy to GitHub Pages
- [ ] Share new LinkedIn post with UTM parameters
```

**Total effort:** 6 story points (~2-3 hours)

---

## Future Enhancements (Not Now)

**Consider later if traffic grows:**

1. **Heatmaps** (requires paid service like Hotjar)
2. **Session replay** (Umami Pro tier $20/month or LogRocket)
3. **A/B testing** (requires custom implementation or tool)
4. **Self-hosted Umami** (free but requires maintenance)
5. **Conversion funnels** (Umami Pro tier or Plausible)

**Don't build these now:** YAGNI until traffic validates need

---

## Questions Resolved

**Q: Why not track every section with Intersection Observer?**
**A (80% confident):** 4 depth markers (25/50/75/100%) give sufficient granularity for 6000-word case study. More events = noise. Start simple.

**Q: Should we track time-on-page?**
**A (90% confident):** Umami tracks this automatically. No custom code needed.

**Q: Do we need event tracking on all pages?**
**A (85% confident):** Start with case study (longest content, highest drop-off risk). Add to other pages if data shows need.

**Q: Should we self-host Umami now?**
**A (95% confident):** No. Cloud is faster to set up, free tier sufficient, can migrate later without code changes.

---

## Confidence Assessment

**Overall confidence:** 85%

**Based on:**

- Umami is proven solution (31K GitHub stars, used by thousands)
- Free tier covers expected traffic (100K events >> portfolio needs)
- Implementation is straightforward (well-documented API)
- Reversibility is high (remove script tag = done)

**Key assumption that could invalidate this:**

- If traffic exceeds 100K events/month → Upgrade to Pro ($20/month) or self-host

**Alternative confidence:** Self-hosted Umami (75% confident) - More setup complexity but free forever

---

**Applied patterns:**

- Library-First (using Umami vs building custom analytics)
- Progressive Disclosure (start with base tracking, add events incrementally)
- Make Illegal States Unrepresentable (TypeScript types prevent invalid event data)
- Reversible Decisions (easy to swap analytics providers)
