# Umami Analytics Setup Guide

## ✅ Completed (Automated)

The following has been implemented and deployed:

1. **Base Tracking** - Automatic pageviews, visitors, referrers, countries, devices
2. **Type-Safe Utilities** - `src/utils/analytics.ts` with helper functions
3. **CTA Click Tracking** - Button and Link components track user interactions
4. **Scroll Depth Tracking** - Statsbomb case study tracks 25%, 50%, 75%, 100% milestones

---

## 📋 Manual Configuration Steps

### Phase 5: Configure Umami Dashboard

Visit your Umami dashboard at https://cloud.umami.is and set up custom views:

#### 1. LinkedIn Traffic Report

**Path:** Dashboard → Reports → Create Custom Report

**Configuration:**
- **Name:** "LinkedIn Traffic"
- **Filter:** `utm_source = linkedin` OR `referrer contains linkedin.com`
- **Metrics:** Visitors, pageviews, bounce rate, avg time on page
- **Time range:** Last 7 days (or custom)

**What this shows:** All traffic from LinkedIn, including organic shares and UTM-tagged posts

---

#### 2. Case Study Engagement Report

**Path:** Dashboard → Events → Filter

**Configuration:**
- **Event name:** `scroll-depth`
- **Filter:** `page = statsbomb-case-study`
- **Group by:** `depth` field
- **Visualization:** Bar chart or table

**What this shows:**
- How many readers reach 25% (Origins section)
- How many reach 50% (Architecture section)
- How many reach 75% (Lessons section)
- How many reach 100% (End of page)

**Example insight:** "500 visitors, 400 reached 25%, 300 reached 50%, 150 reached 75%, 80 reached 100%"
→ *50% drop-off between Architecture and Lessons sections*

---

#### 3. CTA Performance Report

**Path:** Dashboard → Events → Filter

**Configuration:**
- **Event name:** `cta-click`
- **Group by:** `location` field (shows hero, case-study-end, etc.)
- **Secondary group:** `text` field (shows button text)

**What this shows:**
- Which CTAs get clicked most ("Explore My Work" vs "Start a Conversation")
- Click-through rates by location (hero vs case study end)
- Which button copy resonates

**Example insight:** "Hero CTAs: 50 clicks (15% CTR), Case study end: 12 clicks (3% CTR)"
→ *Most conversions happen on homepage hero*

---

#### 4. Outbound Link Tracking

**Path:** Dashboard → Events → Filter

**Configuration:**
- **Event name:** `outbound-link`
- **Group by:** `destination` field
- **Sort by:** Count (descending)

**What this shows:**
- Which external links get clicked (LinkedIn profile, GitHub, resume PDF)
- Where users navigate after reading content

**Example insight:** "LinkedIn profile: 80 clicks, GitHub: 45 clicks, Resume PDF: 30 clicks"

---

#### 5. Drop-Off Analysis

**Custom calculation (manual):**

1. Go to Events → `scroll-depth` → Filter `page = statsbomb-case-study`
2. Note counts for each depth:
   - 25%: X visitors
   - 50%: Y visitors
   - 75%: Z visitors
   - 100%: W visitors

3. Calculate drop-off rates:
   - **25% → 50% retention:** (Y / X) × 100%
   - **50% → 75% retention:** (Z / Y) × 100%
   - **75% → 100% retention:** (W / Z) × 100%

**Example:**
- 500 → 400 (80% retention, 20% drop-off after Origins)
- 400 → 300 (75% retention, 25% drop-off after Architecture)
- 300 → 80 (27% retention, 73% drop-off after Lessons!)

→ *Need to improve Lessons section or move key insights earlier*

---

### Phase 6: LinkedIn Sharing (No UTM Parameters)

**Decision:** Use clean URLs without UTM parameters for better UX.

#### How to Share on LinkedIn

Simply post clean URLs:
- Homepage: `https://saad-shahd.dev`
- Case study: `https://saad-shahd.dev/portfolio/statsbomb`
- About: `https://saad-shahd.dev/about`

#### What You'll Track

Umami automatically captures LinkedIn traffic via **referrer headers**:
- **Referrer:** `linkedin.com` (or `lnkd.in` for shortened links)
- **Total visitors:** Count of all LinkedIn-referred traffic
- **Landing pages:** Which pages LinkedIn users visit first
- **Engagement:** Do they click CTAs? How deep do they scroll?

#### Viewing LinkedIn Traffic in Umami

**Path:** Dashboard → Referrers → Look for `linkedin.com`

You'll see:
- **Total visitors** from LinkedIn
- **Bounce rate** (do they stay or leave immediately?)
- **Top landing pages** (homepage vs. case study direct links)
- **Average time on site**

#### What You Give Up (and why it's okay)

**Can't differentiate between posts:**
- ❌ "Was it the launch post or the case study highlight that drove traffic?"
- ✅ **But you can infer:** Post on Monday → check traffic Tuesday → see spike

**Can't track campaigns:**
- ❌ "Which post format works best?"
- ✅ **But you'll know:** Total LinkedIn impact, engagement quality, conversion rates

**When to reconsider:**
- If LinkedIn becomes your #1 traffic source (>40% of visitors)
- If you're A/B testing different post formats and need per-post data
- If you start running LinkedIn ads (then use UTM for paid vs organic)

**Upgrade path:** Use Bitly shorteners for key posts only (launch announcements, major case studies)

---

## 🧪 Testing Your Analytics

### 1. Test CTA Tracking (Local)

1. Visit http://localhost:4322/
2. Open browser DevTools → Console
3. Click "Explore My Work" or "Start a Conversation"
4. Look for console output: `[Analytics] Tracking: cta-click { location: 'hero', text: 'Explore My Work', destination: '/portfolio' }`
5. Check Umami Dashboard → Real-time → Should see `cta-click` event

### 2. Test Scroll Depth (Local)

1. Visit http://localhost:4322/portfolio/statsbomb
2. Open DevTools → Console
3. Scroll slowly through the case study
4. Watch for console logs when passing Origins (25%), Architecture (50%), Lessons (75%), footer (100%)
5. Check Umami Dashboard → Events → `scroll-depth` events with page/depth/section metadata

### 3. Test Outbound Links (Local)

1. Visit any page with external links (e.g., Contact page with LinkedIn/GitHub)
2. Click an external link
3. Console should show: `[Analytics] Tracking: outbound-link { destination: 'https://linkedin.com/...', source: '/contact', text: 'LinkedIn' }`

### 4. Test on Production

1. Visit https://saad-shahd.dev
2. Perform same tests above
3. Open Umami dashboard → Real-time view
4. You should see your events appear within 1-2 seconds

---

## 📊 What You Can Learn

### Week 1: Traffic Validation

**Questions:**
- Is LinkedIn driving visitors? (Check Referrers → linkedin.com)
- Are people clicking CTAs? (Check Events → cta-click)
- Do visitors read the full case study? (Check Events → scroll-depth)

**Actions based on data:**
- **Low LinkedIn traffic?** → Share more on LinkedIn, try different post formats
- **Low CTA clicks?** → Test different button copy or placement
- **High drop-off at 50%?** → Architecture section too dense, needs simplification

### Week 2-4: Optimization

**Questions:**
- Which LinkedIn posts drive the most traffic? (UTM campaigns)
- Where do visitors drop off in the case study? (Scroll depth funnel)
- Do visitors who read 100% convert more? (Cross-reference scroll-depth + cta-click)

**Actions:**
- Double down on high-performing LinkedIn content types
- Refactor sections with high drop-off rates
- Add more CTAs near high-engagement sections

### Month 1+: Pattern Recognition

**Questions:**
- What's the visitor-to-contact conversion rate?
- Which pages drive the most conversions?
- Are recruiters reading case studies or just browsing?

---

## 🔧 Troubleshooting

### Events Not Showing in Dashboard

**Check:**
1. Is Umami script loading? (DevTools → Network → `script.js` from `cloud.umami.is`)
2. Are console warnings showing? (Look for `[Analytics] Umami not loaded`)
3. Is `window.umami` defined? (DevTools → Console → type `window.umami`)

**Fix:**
- If script not loading → Check Layout.astro has correct website ID
- If console warnings → Script blocked by ad blocker, disable for your domain
- If window.umami undefined → Script failed to load, check network logs

### Duplicate Events Firing

**Symptom:** Same scroll-depth event fires multiple times

**Cause:** Intersection Observer not unobserving after firing

**Fix:** Check `firedDepths` Set and `observer.unobserve()` calls in statsbomb.mdx

### Events Not Tracked Locally

**This is normal!** Umami tracks production events by default. To test locally:

1. Add `data-host-url="http://localhost:4322"` to Umami script tag (temporarily)
2. Or just test on production (events are anonymous anyway)

---

## 📚 Resources

- **Umami Docs:** https://umami.is/docs
- **Event Tracking API:** https://umami.is/docs/track-events
- **UTM Parameters Guide:** https://umami.is/docs/reports/utm-parameters
- **Dashboard Guide:** https://umami.is/docs/features

---

## 🎯 Next Steps

1. ✅ **Visit Umami Dashboard:** https://cloud.umami.is
2. ✅ **Create custom reports** (LinkedIn traffic, scroll depth, CTA performance)
3. ✅ **Share on LinkedIn with UTM parameters**
4. ✅ **Check Real-time view** to see events flowing in
5. ✅ **Review data after 7 days** and optimize content based on insights

**You now have full visibility into portfolio performance!** 🎉
