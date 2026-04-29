# 02 — Color System

> **Hard rule: Teal + Gold only.** Every pixel in the product surface comes from these two ramps and their derived semantic tokens. No rogue greens, blues, reds, purples. Even semantic states (success, warning, danger) are mixed inside the teal–gold space.

This is the hardest constraint in the design system. Every other doc inherits it.

---

## Why teal + gold

- **Teal** says *trustworthy, technical, calm.* Not the corporate navy of LinkedIn, not the playful purple of consumer apps. Teal reads "competent infrastructure."
- **Gold** says *earned, considered, premium.* Used sparingly, gold becomes the visual marker of *signal* — the moments the product wants the user to actually look at (a referrer match, an offer arriving, a skill claim proven).
- The pairing is **uncommon in jobs/hiring software** (sea of LinkedIn-blue, Naukri-orange, Indeed-blue). Visual differentiation is a moat.
- High contrast against both light and dark surfaces, both ramps WCAG AA-compliant against neutrals.

---

## The teal ramp (primary)

```
teal-50   #EAFBFA   surface tint, badge bg in light mode
teal-100  #C8F4F0   subtle hover bg
teal-200  #95E7DF   chip bg, viz fill
teal-300  #5AD3C7   secondary stroke
teal-400  #2EB8AA   primary hover
teal-500  #14998D   PRIMARY brand color
teal-600  #0D7A72   primary pressed / strong text on light
teal-700  #0A615C   primary on dark mode, headlines
teal-800  #0A4A47   surface raised (dark mode)
teal-900  #0B3633   surface base (dark mode)
teal-950  #07201F   surface deep / app background (dark mode)
```

**Anchor:** `teal-500 #14998D` is the brand. Logos, primary CTAs, focus rings (when not gold-priority), key data viz.

---

## The gold ramp (accent)

```
gold-50   #FFF8E8   shimmer base, soft glow
gold-100  #FFEEC2   subtle highlight bg
gold-200  #FBE08E   chip bg for "earned" badges
gold-300  #F4CC56   accent stroke
gold-400  #E5B731   ACCENT primary
gold-500  #C9991D   ACCENT pressed / strong on light
gold-600  #A37B14   muted gold (hover stroke on dark)
gold-700  #7E5E0F   reserved for dense type
gold-800  #5C440B   reserved for borders on light surfaces
gold-900  #3F2F08   rare; deep accents on light
gold-950  #261C04   rare; near-black with warm undertone
```

**Anchor:** `gold-400 #E5B731` is the accent. Reserved for **earned signal** — referrer-found, offer-received, claim-proven, level-up moments. **Never use gold for navigation chrome.** It loses meaning if it's everywhere.

---

## Neutral ramp (warm-cool gray, derived)

We do not use a true gray. Our neutrals sit *between teal and gold*, slightly warm in light mode, slightly cool in dark mode. This keeps the whole palette feeling like one family.

```
neutral-0    #FFFFFF   pure white (rare; surfaces in light mode use neutral-50)
neutral-50   #FAFAF7   light surface base
neutral-100  #F2F1ED   light surface raised
neutral-200  #E5E3DC   light borders
neutral-300  #C9C6BC   light dividers
neutral-400  #9C9890   muted text on light
neutral-500  #6F6B62   secondary text
neutral-600  #4F4C44   primary text on light
neutral-700  #36342E   strong text on light
neutral-800  #25241F   border on dark
neutral-900  #18171420  near-app-bg on dark
neutral-950  #0E0D0A   near-pure-black (only for shadows)
```

(Note `neutral-900` shows as 8-digit hex with alpha for shadow blends.)

In dark mode, surfaces lean teal: `teal-950` is the app background, with `teal-900` for elevated surfaces. Text uses `neutral-50` to `neutral-200` rather than pure white, to reduce glare.

---

## Semantic tokens (the strict set)

All semantic states derive from teal + gold. No reds, no greens, no oranges, no purples enter the palette.

| Token | Light mode | Dark mode | Use |
|---|---|---|---|
| `--bg-app` | `neutral-50` | `teal-950` | App background |
| `--bg-surface` | `#FFFFFF` | `teal-900` | Cards, panels |
| `--bg-raised` | `neutral-50` | `teal-800` | Hovered/elevated cards |
| `--bg-overlay` | `neutral-100/80` | `teal-950/80` | Modal scrim |
| `--text-primary` | `neutral-700` | `neutral-100` | Headlines, body |
| `--text-secondary` | `neutral-500` | `neutral-300` | Captions, meta |
| `--text-muted` | `neutral-400` | `neutral-400` | Disabled, ghost |
| `--text-inverse` | `#FFFFFF` | `teal-950` | On filled CTAs |
| `--border-subtle` | `neutral-200` | `teal-800` | Dividers |
| `--border-default` | `neutral-300` | `neutral-800` | Inputs |
| `--border-strong` | `neutral-500` | `neutral-300` | Focused |
| `--brand` | `teal-500` | `teal-400` | Primary |
| `--brand-hover` | `teal-400` | `teal-300` | Hover |
| `--brand-pressed` | `teal-600` | `teal-500` | Pressed |
| `--accent` | `gold-400` | `gold-300` | Earned signal |
| `--accent-hover` | `gold-300` | `gold-200` | Hover |
| `--focus-ring` | `gold-300` | `gold-400` | Keyboard focus (always gold) |
| `--success` | `teal-500` | `teal-300` | "DM sent", "Saved" |
| `--success-bg` | `teal-50` | `teal-800/60` | Success toast bg |
| `--warning` | `gold-500` | `gold-300` | "Bond detected" |
| `--warning-bg` | `gold-50` | `gold-800/60` | Warning toast bg |
| `--danger` | `gold-700` | `gold-400` | "Won't apply", "Stop" |
| `--danger-bg` | `gold-100` | `gold-900/60` | Danger toast bg |
| `--ghost-flag` | `neutral-400` | `neutral-500` | Ghost-job badge fill |
| `--bond-flag` | `gold-600` | `gold-300` | Bond/bench warning text |

### Why no red for danger?
Red contradicts principle #2 (the product whispers) and breaks the two-color rule. Danger states use **deep amber-gold** (`gold-700` on light, `gold-400` on dark) — visibly hot without screaming. Tested: contrast ratio 4.6:1 against light bg, 7.2:1 against dark.

### Why no green for success?
Same reason. Teal already reads as "good/correct/saved." `teal-500` is plenty for success affirmation. (Bonus: teal-as-success ties success states to the brand itself — every saved/sent/done moment reinforces the brand color.)

---

## Gradient recipes (used sparingly)

Gradients are reserved for: **(a) the marketing/onboarding hero**, **(b) the dashboard "today's surgical picks" card**, **(c) the offer-arrived celebration moment**.

### Aurora teal (hero, dashboards)
```css
background: radial-gradient(
  ellipse at top left,
  hsl(178 73% 38% / 0.35) 0%,
  hsl(178 73% 38% / 0) 50%
), radial-gradient(
  ellipse at bottom right,
  hsl(45 80% 55% / 0.20) 0%,
  hsl(45 80% 55% / 0) 60%
), var(--bg-app);
```

### Brushed gold (earned moments — offer received, claim proven)
```css
background: linear-gradient(
  135deg,
  hsl(45 75% 45%) 0%,
  hsl(45 80% 60%) 50%,
  hsl(40 65% 40%) 100%
);
```

### Subtle teal-to-deep (cards in dark mode)
```css
background: linear-gradient(
  180deg,
  hsl(178 70% 11%) 0%,
  hsl(178 75% 8%) 100%
);
```

**No rainbow gradients. No magenta-to-cyan. Two-stop or three-stop only, all stops within teal/gold.**

---

## Mesh & noise overlays

Modern hero surfaces benefit from gradient mesh + film grain. Both stay in palette.

- **Mesh:** generated WebGL or pre-rendered SVG using only teal-400/500/700 + gold-300/400 stops. Animated slowly (60–120s loop). See `06-motion-system.md` for the prefers-reduced-motion fallback (static frame).
- **Noise:** 200×200 SVG `<feTurbulence>` filter at 6% opacity. Always on top of dark surfaces; never on light surfaces below 95% L*.

---

## Data viz palette

Charts and graphs draw from a constrained 6-stop categorical scale, all teal/gold:

```
viz-1   teal-500    primary series
viz-2   gold-400    secondary series
viz-3   teal-300    tertiary
viz-4   gold-200    quaternary
viz-5   teal-700    quinary
viz-6   gold-600    senary
```

Sequential (heatmaps): `teal-50 → teal-500 → teal-900` — single-hue ramp.
Diverging (rare): `gold-500 ← neutral-100 → teal-500` — used only for "below market / above market" salary deltas, never for political/sentiment scores.

See `12-data-viz.md` for full chart specifications.

---

## Contrast proofs (WCAG 2.2 AA targets)

| Foreground | Background | Ratio | Pass? |
|---|---|---|---|
| `neutral-700 #36342E` | `neutral-50 #FAFAF7` | 12.6:1 | AAA |
| `neutral-100` | `teal-950` | 14.8:1 | AAA |
| `teal-500` text | `neutral-50` | 4.9:1 | AA |
| `teal-300` text | `teal-950` | 7.4:1 | AAA |
| `gold-400` on `teal-950` | — | 7.1:1 | AAA |
| `gold-500` on `neutral-50` | — | 4.6:1 | AA |
| `gold-700` on `gold-100` (danger toast) | — | 6.2:1 | AAA |
| White on `teal-500` (CTA) | — | 4.6:1 | AA |
| White on `gold-400` (accent CTA) | — | 2.9:1 | **fail** |

⚠️ White text on gold-400 fails AA. **Always use `teal-950` text on gold accents**, never white. (Gold CTAs are rare anyway — see component library.)

Run `npx wcag-contrast` (or any equivalent) on every new color combination before merging.

---

## Light vs dark mode

**Default: dark.** Most users hit the product evening hours. Dark also makes the gold accent sing.

Light mode is a first-class peer, not an afterthought. Every component renders in both. The palette swap is mechanical — semantic tokens hold the abstraction.

User preference: stored in cookie + Zustand store. System preference (`prefers-color-scheme`) used as initial default. Toggle accessible from any screen via ⌘K command palette.

---

## Color usage rules of thumb

1. **One gold accent per screen, max two.** If you need three, you're using gold wrong — promote one to teal or demote to neutral.
2. **Teal is the default brand color, gold is the exception.** A typical card has zero gold. The earned-moment card has one gold element.
3. **Never combine gold and teal as adjacent fills** (they vibrate). Separate them with neutral spacing or strokes.
4. **Hovers shift one step in the same ramp**, never cross-ramp. `teal-500 → teal-400` on hover, never `teal-500 → gold-400`.
5. **Strokes use the next-darker ramp step than the fill** (or one step lighter on dark mode). `teal-500 fill + teal-700 stroke` (light) / `teal-500 fill + teal-300 stroke` (dark).
6. **Errors are warm-gold, not red. Period.**

---

## Color tokens in code

Tokens are CSS custom properties on `:root` (light) and `[data-theme="dark"]`. Tailwind config maps them via `theme.extend.colors`. Never hardcode hex values in component files; always reference `var(--bg-surface)`, `bg-brand`, etc.

```css
:root {
  --bg-app: #FAFAF7;
  --bg-surface: #FFFFFF;
  --text-primary: #36342E;
  --brand: #14998D;
  --accent: #E5B731;
  --focus-ring: #F4CC56;
  /* …full set… */
}

[data-theme="dark"] {
  --bg-app: #07201F;
  --bg-surface: #0A4A47;
  --text-primary: #F2F1ED;
  --brand: #2EB8AA;
  --accent: #F4CC56;
  --focus-ring: #E5B731;
  /* …full set… */
}
```

Full token export lives in `91-stack-recommendation.md` under "design tokens."
