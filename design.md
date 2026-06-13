# Design System — "Warm Editorial" (LOCKED)

Genre: **editorial, reading-first**. A reading system before it is a portfolio. Long-form prose is the
product; chrome serves the reading, never competes with it.

**Token source of truth:** the `@theme` block in `src/styles/global.css`. There is no separate
`tokens.css` and there must never be one. All colors are HEX (no OKLCH). Edit tokens there; everything
else consumes them via `var(--…)`.

---

## Thesis (the spine)

The site's copy spine is **resilience, not prevention**:

> Systems will always fail — the work is making failure recoverable.

(Previous spine — "systems couldn't break by design" — is retired.) Voice is unchanged per
`CLAUDE.md` Content Style: question-led, humble, collaborative, evidence-based.

---

## Macrostructure families

| Surface                              | Family            | Why                                                            |
| ------------------------------------ | ----------------- | ------------------------------------------------------------- |
| Blog posts, case study (`/portfolio/statsbomb`) | **Long Document** | Sustained reading; serif body, generous measure, hairline rules. |
| Home, About                          | **Letter**        | Personal, addressed-to-reader voice; display headline + lede.  |

Real content only — no invented metrics, no fake testimonials or logos:

- Case study: **Statsbomb Real Time Data Collection** — `/portfolio/statsbomb`
- Blog: **One Flew Over the Context Window** (2026-02-16) — `/blog/one-flew-over-the-context-window`
- Blog: **The Engineer's Anxiety at the Penalty Kick** (2026-06-12) — `/blog/the-engineers-anxiety-at-the-penalty-kick`

---

## Type roles

| Role                | Face            | CSS var (theme)                       | Notes                                              |
| ------------------- | --------------- | ------------------------------------- | -------------------------------------------------- |
| Display / headings  | **Fraunces**    | `--font-display` / `--font-family-display` | High-contrast serif, **ROMAN only — italic headers banned**. |
| Reading / body prose| **Newsreader**  | `--font-serif` / `--font-family-serif`     | Optical reading serif. Drives blog + case-study + long-form Body. Italic permitted for in-prose emphasis only. |
| UI / nav / labels / buttons / badges | **IBM Plex Sans** | `--font-sans` / `--font-family-sans`  | Chrome stays sans. Kept.                           |
| Code / mono         | **IBM Plex Mono** | `--font-family-mono`                | Kept.                                              |

Prose (`section p`, `.blog-prose p`, and related rules) renders in Newsreader; UI chrome stays in
Plex Sans. The distinction is load-bearing: serif = read, sans = operate.

Fonts are loaded via Astro experimental fonts (`fontProviders.google()`) in `astro.config.mjs`.

---

## Color — single-accent rule

- **Paper** `#F5F1E8` (limestone, kept) · **Surface** `#FEFDFB` · **Ink** `#0F172A`.
- **ONE accent: Egyptian gold `#F4C430`** (`--color-primary` / `--color-accent`). Used for CTAs and
  emphasis at **≤5% of any viewport**. Gold is the only decorative accent.
- **Links use deepened blue `#0369A1`** (`--color-secondary-dark`), chosen for WCAG-AA contrast.
  Blue is for **links only** — it is no longer a co-equal decorative accent. The `--color-secondary`
  family is retained (other code references it) but not used as a second accent.
- **Callouts:** one restrained, hairline-ruled note style. All `--color-callout-*-bg` tokens resolve
  to the paper surface; a variant differentiates only by its left-border accent color, never by a
  competing tint fill. The `Callout` component variant API is unchanged.

---

## Nav stance

Quiet, sans-serif chrome that recedes. Auto-hide on scroll (Headroom), `prefers-reduced-motion`
respected. Navigation never carries the gold accent as decoration; it is plumbing for reading.

---

## Global rules

- Component-first: use existing `Button` / `Badge` / `Card` / `Callout` / `Heading` / `Body` / `Link`.
  No raw `<button>` / `<a>` for UI.
- WCAG AA: ≥4.5:1 for text.
- Italic headers banned (Fraunces roman only).
- All tokens live in the `@theme` block of `src/styles/global.css`. HEX, never OKLCH. DRY: one source.
