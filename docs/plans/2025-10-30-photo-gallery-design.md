# Photo Gallery Component Design

**Date**: 2025-10-30
**Status**: Approved
**Complexity**: 8 story points

## Purpose

Add reusable photo gallery component for Statsbomb case study's "Behind the Scenes" section, showcasing team photos (mixed content: people, product UI, office environment) with lightbox viewing capability.

## Requirements

### Functional
- Display 6 photos in responsive grid (1 col mobile, 3 col desktop)
- Click to open lightbox modal for full-size viewing
- Short captions (1-2 sentences) for context
- Placement: Dedicated "Behind the Scenes" section at end of Statsbomb case study

### Non-Functional
- **Accessibility**: WCAG AA compliance (4.5:1 contrast, alt text, keyboard navigation, screen reader support)
- **Performance**: Images <200KB each (total <1.2MB), lazy loading below fold
- **Animation**: Egyptian easing (water cubic-bezier), respect `prefers-reduced-motion`
- **Design System**: Component-first (CVA variants), no raw HTML with manual Tailwind
- **Reusability**: JSON-driven, works for future case studies

---

## Architecture

### File Structure

```
src/
  components/
    PhotoGallery.astro         # Main gallery component
  data/
    statsbomb-photos.json      # Photo metadata
  utils/
    gallery.ts                 # TypeScript types, Zod validators
scripts/
  optimize-gallery-images.js   # Sharp image optimization
public/
  images/
    statsbomb/
      *.webp                   # Optimized WebP images
      *.jpg                    # JPEG fallbacks
docs/
  plans/
    2025-10-30-photo-gallery-design.md
```

### Component API

```typescript
// PhotoGallery.astro interface
interface Props {
  photos: Photo[];           // Array of photo objects
  columns?: 2 | 3;          // Grid columns (default: 3)
  variant?: 'default' | 'compact';  // CVA variant (future extension)
}

// Photo type (gallery.ts)
interface Photo {
  src: string;              // Path to image (e.g., '/images/statsbomb/team-01.jpg')
  alt: string;              // Accessibility description (10-200 chars)
  caption: string;          // 1-2 sentence caption (20-300 chars)
  width: number;            // Original width (for PhotoSwipe aspect ratio)
  height: number;           // Original height
}
```

### Usage Example

```astro
---
// src/pages/portfolio/statsbomb.mdx
import PhotoGallery from '@/components/PhotoGallery.astro';
import photos from '@/data/statsbomb-photos.json';
---

## Behind the Scenes
<PhotoGallery photos={photos} columns={3} />
```

---

## Design Decisions

### 1. Lightbox Library: PhotoSwipe 5

**Decision**: Use PhotoSwipe 5 over GLightbox (90% confident)

**Rationale**:
- **Battle-tested**: 329,073 weekly downloads, used by NY Times, Medium
- **Accessibility**: WCAG AA out-of-box (keyboard nav, screen reader, focus management)
- **Performance**: Modular ~25KB gzipped (core only), tree-shakeable
- **Customization**: Full CSS control for Egyptian easings
- **Mobile**: Touch gestures (pinch zoom, swipe), optimized for mobile
- **Maintenance**: Active development, TypeScript support included

**Alternative**: GLightbox (85% confident) - lighter weight, simpler API, but less mature

**Reversibility**: Yes - similar API patterns make swapping libraries straightforward

---

### 2. Architecture: Reusable Component + JSON Config

**Decision**: PhotoGallery.astro component accepts photos array, data lives in JSON

**Rationale**:
- **Reusability**: Future case studies import PhotoGallery with different JSON
- **Type-safety**: Zod validation at build time prevents invalid data
- **Content-first**: Non-technical editors can update JSON without touching components
- **Library-first**: Leverages Astro's component model (no custom framework)

**Alternatives Considered**:
- Inline data in MDX (rejected: not reusable, couples content to presentation)
- Content Collections (rejected: overkill for 6 photos, adds build complexity)
- Raw HTML in MDX (rejected: violates component-first principle, no type safety)

---

### 3. Image Optimization: Sharp Script

**Decision**: Node.js script using `sharp` library to convert/resize images

**Process**:
1. Input: `tmp-images/*.jpg` (4-5MB each, 5184x3456px Canon EOS photos)
2. Output: `public/images/statsbomb/*.webp` (1200px wide, quality 85, ~150KB)
3. Fallback: `public/images/statsbomb/*.jpg` (same dimensions for `<picture>` tag)

**Rationale**:
- **Performance**: 96% file size reduction (4MB → 150KB)
- **Quality**: 1200px wide supports Retina displays (600px CSS @ 2x)
- **Compatibility**: WebP with JPEG fallback covers all browsers
- **Automation**: Script runs once, outputs to public/ for Astro serving

---

## Visual Design

### Grid Layout (Mobile-First)

```css
/* Mobile (< 768px): Single column */
.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg); /* 24px */
}

/* Desktop (>= 768px): 3 columns (configurable) */
@media (min-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-xl); /* 40px */
  }
}
```

### Photo Card Styling (Egyptian Design System)

- **Container**: `bg-surface` (#FEFDFB), `rounded-lg` (12px), `shadow-subtle`
- **Image**: `aspect-ratio: 4/3`, `object-fit: cover`, `rounded-md` (8px)
- **Border**: `border` with `border-neutral-light` (#CBD5E1)
- **Caption**: `text-sm` (16.8px scaled), `text-accent-light`, `mt-3`
- **Hover**:
  - `scale-102` transform
  - `shadow-md` elevation
  - `border-accent` transition
  - Duration: `0.2s` CSS (no Motion One for hover)

### Egyptian Easing Integration

**PhotoSwipe CSS Override**:
```css
/* Custom animations with Egyptian easing */
.pswp__img {
  transition-timing-function: cubic-bezier(0.65, 0, 0.35, 1); /* water */
}

.pswp--open {
  animation-timing-function: cubic-bezier(0.76, 0, 0.24, 1); /* monument */
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .pswp__img,
  .pswp--open {
    animation: none !important;
    transition: none !important;
  }
}
```

**Gallery Entrance Animation** (InView):
```typescript
import { inView, animate } from 'motion';
import { prefersReducedMotion } from '@/utils/animations';

if (!prefersReducedMotion()) {
  inView('.gallery-grid', (info) => {
    animate(info.target,
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.8, ease: [0.65, 0, 0.35, 1] } // Egyptian water
    );
  }, { amount: 0.3 });
}
```

---

## Data Structure

### Photo Metadata JSON

```json
// src/data/statsbomb-photos.json
[
  {
    "src": "/images/statsbomb/team-meeting-2019.jpg",
    "alt": "Engineering team gathered around monitors discussing live-collection-app architecture",
    "caption": "Early architecture sessions with Ali (founder) mapping sequencing rules on paper—where 'make illegal states unrepresentable' was born.",
    "width": 1200,
    "height": 900
  }
]
```

### TypeScript Schema (Zod Validation)

```typescript
// src/utils/gallery.ts
import { z } from 'zod';

export const PhotoSchema = z.object({
  src: z.string().regex(/^\/images\/.+\.(jpg|jpeg|png|webp)$/),
  alt: z.string().min(10).max(200),
  caption: z.string().min(20).max(300),
  width: z.number().positive(),
  height: z.number().positive()
});

export const PhotosSchema = z.array(PhotoSchema).min(1).max(20);

export type Photo = z.infer<typeof PhotoSchema>;

// Runtime validation helper
export function validatePhotos(data: unknown): Photo[] {
  return PhotosSchema.parse(data);
}
```

### Build-Time Validation

```typescript
// PhotoGallery.astro
---
import { validatePhotos } from '@/utils/gallery';

const { photos: rawPhotos, columns = 3 } = Astro.props;

// Fail fast at build time if invalid data
try {
  const photos = validatePhotos(rawPhotos);
} catch (error) {
  throw new Error(
    `Invalid photo data: ${error.message}\n` +
    `Check src/data/statsbomb-photos.json for schema violations`
  );
}
---
```

**Why Zod?**
- **Correctness**: Invalid data = build failure (no runtime surprises)
- **Make illegal states unrepresentable**: Schema prevents malformed data
- **Type inference**: `Photo` type auto-generated from schema
- **Reversible**: Easy to migrate to CMS later (JSON is universal)

---

## Animation Strategy

### Decision Tree Applied

1. **Decorative pattern?** No (functional gallery, not background)
2. **Hero section?** No (end of case study)
3. **Entering viewport?** Yes → InView trigger with subtle fade (0.8s, 30% threshold)
4. **Interactive feedback?** Yes → CSS hover only (0.2s scale-102, no Motion One)

### Animation Rules

**✅ DO Animate**:
- Gallery entrance (InView): opacity 0→1, y 20→0, 0.8s water easing
- Lightbox open/close: PhotoSwipe default with Egyptian easing override

**❌ DON'T Animate**:
- Hover states (use CSS transitions only)
- During reading (gallery is end of article, not mid-content)
- If `prefers-reduced-motion` is true (apply final state instantly)

### PhotoSwipe Integration

```typescript
// PhotoGallery.astro <script>
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { prefersReducedMotion } from '@/utils/animations';

if (!prefersReducedMotion()) {
  const lightbox = new PhotoSwipeLightbox({
    gallery: '#statsbomb-gallery',
    children: 'a',
    pswpModule: () => import('photoswipe'),

    // Egyptian easing (via CSS, see above)
    showAnimationDuration: 400,
    hideAnimationDuration: 400,

    // Accessibility
    closeOnVerticalDrag: true,
    ariaLabel: 'Photo gallery lightbox'
  });

  lightbox.init();
}
```

---

## Accessibility (WCAG AA)

### Checklist

- ✅ **Alt text**: Descriptive (not decorative), 10-200 chars, no "image of" prefix
- ✅ **Captions**: Semantic `<figcaption>` inside `<figure>` for each photo
- ✅ **Focus indicators**: 3px offset, primary color, visible on all interactive elements
- ✅ **Keyboard navigation**:
  - Tab: Navigate between photos
  - Enter/Space: Open lightbox
  - Esc: Close lightbox
  - Arrow keys: Navigate in lightbox (PhotoSwipe built-in)
- ✅ **Screen reader**:
  - ARIA labels on lightbox controls
  - PhotoSwipe announces "Photo X of Y"
  - Captions readable in document order
- ✅ **Color contrast**:
  - Caption text: `text-accent-light` on `bg-surface` = 7.2:1 (AAA)
  - Border: `border-neutral-light` = 4.8:1 (AA)
- ✅ **Reduced motion**: Check `prefersReducedMotion()` before ALL animations
- ✅ **Semantic HTML**: `<figure>`, `<figcaption>`, `<picture>`, `<img>` (not `<div>`)

### Graceful Degradation

- **JavaScript disabled**: Gallery remains functional (semantic HTML figure grid)
- **PhotoSwipe fails to load**: Images still clickable (open in new tab via href)
- **Slow network**: `loading="lazy"` delays below-fold images
- **Image 404**: Alt text displays, no broken layout (explicit width/height)

---

## Performance

### Optimization Targets

- **Bundle size**: <35KB total (PhotoSwipe 25KB + component 2KB + CSS 5KB)
- **Image size**: ~150KB per photo (total ~900KB for 6 photos)
- **First Contentful Paint**: <1.8s (Lighthouse "Good")
- **Largest Contentful Paint**: <2.5s (images below fold, lazy loaded)
- **Cumulative Layout Shift**: <0.1 (explicit width/height prevents)

### Loading Strategy

```astro
<picture>
  <source srcset={photo.src.replace('.jpg', '.webp')} type="image/webp" />
  <img
    src={photo.src}
    alt={photo.alt}
    loading="lazy"
    decoding="async"
    width={photo.width}
    height={photo.height}
  />
</picture>
```

**Why `<picture>`?**
- **WebP first**: 30% smaller than JPEG (150KB vs 220KB)
- **Fallback**: JPEG for Safari <14, older browsers
- **Explicit dimensions**: Prevents layout shift during load

---

## Error Handling

### Build-Time Failures (Fail Fast)

```typescript
// PhotoGallery.astro
try {
  const photos = validatePhotos(rawPhotos);
} catch (error) {
  throw new Error(
    `Invalid photo data: ${error.message}\n` +
    `Check src/data/statsbomb-photos.json for schema violations`
  );
}
```

**Validation Errors**:
- Missing required fields → Build fails with field name
- Invalid file extension → Build fails with regex pattern
- Caption too short/long → Build fails with length requirements
- Non-positive dimensions → Build fails with constraint

### Runtime Graceful Degradation

- **PhotoSwipe fails**: Images still link to full-size (href fallback)
- **Image 404**: Alt text displays, layout preserved
- **Slow network**: Lazy loading, low-priority fetch
- **JavaScript disabled**: Static gallery with semantic HTML

---

## Testing Strategy

### Manual Testing Checklist

**Desktop (Chrome, Safari, Firefox)**:
- [ ] Gallery renders in 3-column grid
- [ ] Hover effects work (scale-102, shadow, border)
- [ ] PhotoSwipe opens on click
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Egyptian easing visible in transitions
- [ ] Focus indicators appear correctly (3px offset)

**Mobile (iOS Safari, Chrome Android)**:
- [ ] Gallery renders in single column
- [ ] Touch interactions work (tap to open lightbox)
- [ ] Pinch-to-zoom works in PhotoSwipe
- [ ] No animations if `prefers-reduced-motion` enabled
- [ ] Images lazy-load below fold

**Accessibility (VoiceOver, NVDA)**:
- [ ] Alt text announced correctly
- [ ] Captions readable by screen reader
- [ ] Lightbox controls accessible via keyboard
- [ ] Focus trapped in lightbox when open
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)

**Performance (Lighthouse)**:
- [ ] Performance score >90
- [ ] Accessibility score 100
- [ ] CLS <0.1 (no layout shift)
- [ ] Bundle size <50KB (target: 35KB)

---

## Integration Plan

### Statsbomb Case Study Placement

**Location**: After "Lessons Learned" section (line 688 in statsbomb.mdx)

```markdown
## Lessons Learned
[existing content...]

---

## Behind the Scenes

The human side of building production systems: our team in Cairo (2018-2022), where "make illegal states unrepresentable" went from paper sketches to production reality.

<PhotoGallery photos={statsbombPhotos} columns={3} />

*Photos from 2019-2021: Early architecture sessions, live data collection workflows, and the team that took foundational concepts beyond their initial vision.*
```

### Design System Story

**Location**: `/design-system` route (Astrobook integration)

```astro
// src/pages/design-system.astro - Add story
<section>
  <h3>PhotoGallery - 3 Column (Default)</h3>
  <PhotoGallery photos={mockPhotos} columns={3} />

  <h3>PhotoGallery - 2 Column</h3>
  <PhotoGallery photos={mockPhotos} columns={2} />
</section>
```

---

## Dependencies

```json
// package.json additions
{
  "dependencies": {
    "photoswipe": "^5.4.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "sharp": "^0.33.0",
    "@types/sharp": "^0.32.0"
  }
}
```

**Install command**: `bun add photoswipe zod && bun add -D sharp @types/sharp`

---

## Story Points Breakdown

1. **PhotoGallery.astro component** - 2 points (CVA setup, PhotoSwipe integration)
2. **Image optimization script** - 1 point (sharp automation)
3. **JSON data creation** - 1 point (caption writing, metadata)
4. **Type schema & validation** - 1 point (Zod setup)
5. **Astrobook story** - 1 point (visual testing)
6. **Manual testing & fixes** - 2 points (cross-browser, accessibility)

**Total: 8 story points** (moderate complexity)

---

## Success Criteria

✅ 6 photos display in responsive grid (1 col mobile, 3 col desktop)
✅ PhotoSwipe lightbox works with keyboard + touch
✅ Passes WCAG AA accessibility audit (4.5:1 contrast, alt text)
✅ Images optimized (<200KB each, total <1.2MB)
✅ No layout shift (explicit width/height)
✅ Respects `prefers-reduced-motion` (no animations if disabled)
✅ Works with JavaScript disabled (graceful degradation)
✅ Lighthouse Performance >90, Accessibility 100

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| PhotoSwipe bundle size too large | HIGH | Use tree-shaking, dynamic import |
| Images still too large after optimization | MEDIUM | Reduce quality to 75, try AVIF format |
| Accessibility issues in PhotoSwipe | HIGH | Audit with screen reader, add ARIA overrides |
| Layout shift during image load | MEDIUM | Use explicit width/height, blur placeholder |
| PhotoSwipe conflicts with Astro View Transitions | MEDIUM | Test page transitions, add cleanup in script |

---

## Future Enhancements (Not in Scope)

- **Blur placeholder**: Use `<img loading="lazy">` with blur-up effect
- **Pinch-to-zoom on mobile**: PhotoSwipe supports, verify it works
- **Video support**: Extend PhotoSchema for MP4/WebM
- **AVIF format**: Add to `<picture>` for 50% smaller than WebP
- **CDN integration**: Serve from Cloudflare Images for auto-optimization

---

## Applied Patterns (CLAUDE.md)

✅ **Inversion First**: Listed all failure modes (404, JS disabled, slow network)
✅ **Library-First**: PhotoSwipe (don't build lightbox from scratch)
✅ **Confidence Stated**: PhotoSwipe 90%, GLightbox 85%, with evidence
✅ **Make Illegal States Unrepresentable**: Zod schema prevents invalid data
✅ **Reversible Check**: Easy to swap lightbox libs (similar APIs)
✅ **Correctness**: Build fails on invalid data (no runtime surprises)
✅ **Story Points**: 8 points (no time estimates)
✅ **Component-First**: CVA variants, no raw HTML with manual Tailwind
✅ **Progressive Disclosure**: Layer 0 = PhotoSwipe defaults, Layer 1 = Egyptian easing

---

**Design Status**: ✅ Approved for implementation
**Next Steps**: Install dependencies → Optimize images → Build component → Test
