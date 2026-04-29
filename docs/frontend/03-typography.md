# 03 — Typography

> Type does the load-bearing work in this product. Cards rarely have heavy chrome (per `01-design-principles.md` — earned density). What carries hierarchy is the **size, weight, and family contrast** between display and body.

---

## Type families

We ship three families. Each has a clear job.

### Display — `Fraunces` (variable)
Editorial serif with optical-size axis. Used for:
- Page titles
- Marketing surfaces (onboarding hero, offer-arrived screen)
- "Money moments" — salary range visualizations, offer numbers, the LPA on a job card

Why Fraunces over Playfair: variable axis (`opsz`, `wght`, `SOFT`) gives us controllable weight transitions and an optional soft mode for the gold "earned" treatment. Open-source via Google Fonts.

Fallback chain: `Fraunces, "Iowan Old Style", Georgia, serif`

### Body — `Geist` (Vercel) primary, `Inter` fallback
Geometric sans, optimized for UI. Used for:
- All UI chrome, body copy, table cells, form labels
- Navigation, buttons, microcopy

Why Geist: tighter spacing than Inter at small sizes, designed alongside dark UIs. Open-source.

Fallback chain: `Geist, Inter, "SF Pro Text", system-ui, sans-serif`

### Mono — `JetBrains Mono` (variable)
Used for:
- Code blocks (rare — settings, API keys)
- Tabular numerics where alignment matters more than reading speed (salary leak triangulation table, application DNA stats)
- Keyboard shortcuts in tooltips

Fallback chain: `"JetBrains Mono", "SF Mono", Menlo, monospace`

### Indic scripts — `Noto Sans` family
- `Noto Sans Devanagari` (Hindi, Marathi)
- `Noto Sans Tamil`
- `Noto Sans Telugu`
- `Noto Sans Bengali` (v0.2)
- `Noto Sans Kannada` (v0.2)

Loaded conditionally via `font-display: swap` and `unicode-range` per script — pages with no Indic content do not download these.

Pairing rule: when an Indic word/phrase appears inline with English, render with **the Indic font for that script + Geist for English**. Never force Geist to fall back to Devanagari — it does not have the glyphs.

---

## Font loading strategy

```html
<!-- in <head> of layout -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- self-hosted via @next/font in production for performance -->
```

- All four primary fonts are **self-hosted via `next/font/google`** — this generates fingerprinted woff2 files at build time, eliminates render-blocking, and removes Google Fonts as a runtime dependency (DPDP-friendly: no third-party data leak).
- Variable axis variants used wherever possible to ship one file per family.
- `font-display: swap` for body & mono. `font-display: optional` for display (it's editorial; if it doesn't load fast, fall back gracefully to Iowan Old Style — still serif, similar texture).
- Subset Latin for body/mono. Indic fonts subset to the script's core Unicode block + Latin punctuation.

Performance budget: total font payload for a route < **80 KB** gzip.

---

## Type scale (fluid)

We use a fluid clamp scale that adapts between mobile (375px) and desktop (1440px). Values are in `rem` for accessibility (user can override base font size).

| Token | Mobile | Desktop | Usage |
|---|---|---|---|
| `text-display-2xl` | 48px | 88px | Marketing hero only |
| `text-display-xl` | 40px | 64px | Page hero (dashboard greeting) |
| `text-display-l` | 32px | 48px | Section title |
| `text-display-m` | 24px | 36px | Card "earned" moment headline |
| `text-display-s` | 20px | 28px | Modal title |
| `text-h1` | 24px | 32px | Module page title |
| `text-h2` | 20px | 24px | Section header |
| `text-h3` | 18px | 20px | Card title |
| `text-h4` | 16px | 18px | Subsection / card subtitle |
| `text-body-l` | 16px | 18px | Lead paragraph |
| `text-body-m` | 14px | 16px | Default body |
| `text-body-s` | 13px | 14px | Secondary body, table cells |
| `text-caption` | 12px | 12px | Captions, meta, timestamps |
| `text-micro` | 11px | 11px | Pills, tag labels |

CSS:
```css
--text-body-m: clamp(0.875rem, 0.81rem + 0.27vw, 1rem);
```

Generated programmatically via [utopia.fyi](https://utopia.fyi) calculator. Full token table lives in `tailwind.config.ts`.

---

## Weight scale

Fraunces (display) — variable axis 100–900:
- **400 Regular** — body of a display blockquote
- **500 Medium** — default display weight
- **600 Semibold** — emphasis within display
- **700 Bold** — page hero
- **900 Black** — reserved for "earned" gold moments only (offer arrived, ⭐ referral matched)

Geist (body) — variable axis 100–900:
- **400 Regular** — body
- **500 Medium** — labels, tab triggers
- **600 Semibold** — UI buttons, h3
- **700 Bold** — h1, h2

JetBrains Mono — non-variable static set:
- **400, 500, 700** only

Avoid Light (300) and below — fails contrast AA at body sizes against our backgrounds.

---

## Line-height & tracking

| Use | Line-height | Tracking |
|---|---|---|
| Display 2xl–m | 1.05 | -0.02em (tighter) |
| Display s, h1 | 1.15 | -0.015em |
| h2, h3, h4 | 1.25 | -0.01em |
| Body l, m | 1.55 | 0 |
| Body s, caption | 1.45 | 0 |
| Micro, tag | 1.0 | +0.04em (looser) |
| Mono | 1.5 | 0 |

Display gets negative tracking; body stays neutral; tags/caps get positive tracking. Standard editorial rules; don't over-engineer.

---

## Numerics

Money is everywhere in this product. Numbers must be:
- **Tabular** wherever they're being compared in lists (salary triangulation, application DNA stats). Use `font-feature-settings: "tnum"`.
- **Lining figures** by default (Geist defaults to lining; Fraunces has both — use `font-feature-settings: "lnum"` for display numerics over salary).
- **Old-style figures permitted in editorial body copy** for marketing surfaces only.

Currency formatting:
- ₹ + space + number with Indian comma grouping: `₹18,50,000` (lakh-crore system, not US thousands)
- LPA shorthand: `₹18L`, `₹2.4Cr`. Auto-render LPA when ≥ 100,000.
- Decimal LPA: `₹18.5L`, never `₹18,50,000` and `₹18.5L` in the same view.
- Show absolute number in tooltip when LPA shorthand is used.

```tsx
// component: <Money value={1850000} /> renders "₹18.5L"
// component: <Money value={1850000} format="absolute" /> renders "₹18,50,000"
```

---

## Indic script considerations

When a screen contains mixed scripts (e.g., a recruiter message in Hindi within an English UI):

1. **Wrap Indic text in `<span lang="hi">`** so screen readers switch voice.
2. **Use `unicode-bidi: plaintext`** on mixed-direction containers (rare but safe).
3. **Allow 1.5× the line-height of Latin** for Devanagari at the same size — its glyphs sit taller. Set via `:lang(hi) { line-height: calc(var(--lh) * 1.5); }`.
4. **Tamil and Telugu** glyphs are wider than Devanagari; allow + 8% extra horizontal space in fixed-width contexts (table cells, tags).
5. **Sentence case in Hindi/Tamil/Telugu** rather than Title Case (which is unidiomatic in Indic scripts).
6. **Test with a real corpus**, not Google Translate — pull strings from actual recruiter messages and JD samples.

---

## Kinetic type (used sparingly)

Animated typography on:

- **Onboarding hero** — Fraunces title morphs weight 400 → 700 over 1.2s on mount
- **"Searching for referrers..." loader** — letters cycle through weight + slight color shift (teal-500 → teal-300) like a heartbeat. See `06-motion-system.md`.
- **Offer arrived** — number ticks up from 0 to the offer LPA over 800ms with `easeOut`.
- **AI typing effect** — the `Cover Letter` and `DM` composers reveal text token-by-token at ~30 chars/sec with a soft cursor.

That's the entire kinetic type budget. **No marquee tickers**, no auto-scroll text, no rotating hero phrases ("Find jobs / Get hired / Negotiate offers" — banned).

---

## Type as data viz

Two patterns where type itself is the chart:

### Salary range bar
A horizontal type-rendered bar — `₹14L ─── ₹18L ╱╱╱ ₹24L` — where the user's target sits and where the market sits, drawn as styled text + CSS bars (not SVG). Renders fast, stays accessible.

### Skill claim weights
"Python · 5y" sized by evidence weight — the more evidence, the larger the text. Min 14px, max 28px. Visualizes the strongest claims naturally.

Both use `tnum` + `lnum` and respect prefers-reduced-motion (animation in only).

---

## Anti-patterns

- ❌ All-caps headlines longer than 3 words
- ❌ Italic body copy (Geist has no true italic; faux-italic looks bad)
- ❌ Light weights (300 or under) at any body size
- ❌ Justified body text (creates rivers; loose-set ragged-right always)
- ❌ Display fonts at body sizes (Fraunces under 18px is unreadable)
- ❌ More than two type families on a single screen (display + body + mono = 2.5; ok. Plus Indic = inherited per content)
- ❌ Letter-spacing on body copy
- ❌ Underlined text that isn't a link
- ❌ Centered body paragraphs longer than 2 lines

---

## Examples — pattern library

Each module doc includes its own type specimen for that screen. Reference these standard pairings:

**Card title + meta**
```
[Fraunces 600 / 18px / -0.01em]   Senior Backend Engineer
[Geist 500 / 13px / 0]            Razorpay  ·  Bangalore · T1  ·  ₹32–42L
```

**Money moment (offer)**
```
[Geist 500 / 14px / 0]            Total CTC
[Fraunces 700 / 64px / -0.02em]   ₹38L
[Geist 400 / 14px / 0]            Base ₹28L  +  Var ₹6L  +  Joining ₹4L
```

**Stat card (App DNA)**
```
[Geist 600 / 12px / +0.04em / uppercase]   CALLBACK RATE
[Geist 700 / 32px / -0.01em / tnum]        18%
[Geist 400 / 12px / 0]                     +4 pp vs last week
```
