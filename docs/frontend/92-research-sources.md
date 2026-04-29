# 92 — Research Sources & Design Inspirations

> Where we look for inspiration, what we steal, and what we explicitly avoid.

---

## Tier 1 — Primary references (steal liberally with credit)

### Linear (linear.app)
**What we take**: density-with-hierarchy, hover lift micro-interactions, ⌘K palette UX, sidebar nav, inline typography weight as load-bearing, "act-then-undo" toast patterns, kbd keyboard shortcut display, dark theme tokenization.
**What we don't take**: their pure-grayscale-and-purple aesthetic — we have palette. Their "issue" object model — we have jobs.

### Vercel dashboard
**What we take**: dashboard bento layout, hero gradient mesh, marketing site shader gradients, type scale, project-card hover patterns, edge-runtime mindset.
**What we don't take**: "everything is a deployment" framing.

### Stripe (stripe.com + dashboard)
**What we take**: Fraunces-quality serif typography for editorial weight, kinetic type on session pages, gradient mesh on hero, marketing bento, data-rich tables, transparent algorithmic claims (their fraud scoring UX is a model).
**What we don't take**: their chrome-heaviness in dashboards (too many borders).

### Arc Browser (arc.net)
**What we take**: muted dark mode palette as inspiration for our teal-950 dark, command palette as primary nav, card hover-lift defaults, magnetic button feel.
**What we don't take**: their "everything is a workspace" model.

### Raycast (raycast.com)
**What we take**: keyboard-first interaction patterns, command palette as universal, kbd display patterns, "light app, big keyboard surface" feel.
**What we don't take**: their menu-bar app metaphor.

### Cron Calendar (cron.com — pre-Notion-acquisition design)
**What we take**: bento dashboard layouts, calendar UX, gentle animations on event drag, dense type-as-data layout.

### Pitch (pitch.com)
**What we take**: editorial bento layouts on marketing, kinetic type on hero, generous spacing on calmer pages.
**What we don't take**: their decks-specific UX.

### Things 3 (culturedcode.com/things)
**What we take**: micro-interactions on checkboxes, gentle haptic-feel buttons, keyboard parity on every action, restrained color use.
**What we don't take**: their iOS-only constraints.

---

## Tier 2 — Sites worth studying (specific patterns)

### Awwwards Site of the Day archive (2024–2026)
**Why**: Curated list of design trends; we filter aggressively for what fits "calm precision." Many SOTM picks are noise — we steal the typographic restraint.
**Patterns we picked up**: shader gradients (sparingly), kinetic type, scroll-driven animations.

### Godly (godly.website)
**Why**: Curated design references. Excellent for finding interaction patterns.
**Patterns**: bento grid variations, marquee strips for social proof, magnetic buttons, hero-3D-tilt.

### SiteInspire (siteinspire.com)
**Why**: Editorial / agency-quality pages. Less product-app, more aesthetic.
**Use**: marketing surface inspiration, NOT product chrome.

### Mobbin (mobbin.com)
**Why**: Mobile UX patterns, screenshot-by-screenshot from real apps.
**Use**: bottom-sheet patterns, navigation, onboarding sequences.

### Refactoring UI (refactoringui.com)
**Why**: Design heuristics from Tailwind's creators. We refer to their hierarchy + spacing principles constantly.
**Use**: reference for type weight as load-bearing, color usage, spacing rhythm.

### Dribbble (with heavy filter)
**Why**: Visual direction inspiration. 90% noise, 10% gold.
**Use**: filter to "dashboard" / "data-viz" / "mobile" with explicit search for our color family. Avoid the maximalist work.

### Mary Anne Berdsen + other personal portfolios
**Why**: Editorial-rich personal sites; many use Fraunces-style serifs we're aiming for.

### Ueno + Active Theory archives
**Why**: Agency-quality interactions; cursor-following spotlights, magnetic buttons, scroll-driven storytelling.

---

## Tier 3 — India-specific UX reference

We design India-native, so we study Indian product design intentionally.

### Razorpay dashboard
- Indian-payments-aware UX
- ₹ formatting patterns
- GST handling
- We borrow their checkout patterns directly (we'll integrate Razorpay anyway)

### Zerodha Kite
- Dense financial UI done well in India
- Tabular numerics
- Keyboard-first power user UX
- Conservative, calm color use

### Cred (login + rewards)
- Premium feel with restrained color
- Micro-interactions
- Mobile-first polish
- Their "earned" moments give us a reference point for our gold-accent moments

### Slice card app
- Mobile-first
- Bottom-sheet UX done well
- Indian-Gen-Z target

### PhonePe + GPay India
- Vernacular language switching done well
- Voice-input integration
- Mass-market scaling of payment flows

### Inshorts
- Card-stack UX
- Tier-2/3 reach
- Hindi/English code-switching

### Bharat OTT apps (JioCinema, Hotstar)
- Multi-language UX scaling
- Indic typography at scale
- Network-resilience patterns

---

## Tier 4 — Specific component pattern references

### Linear's command palette → ⌘K
### Vercel's bento → dashboard
### Stripe's salary bar / fee triangulation → our salary leak
### Cron's calendar bento → dashboard tile sizing
### Things 3's checkbox draw animation → checkbox primitive
### Notion's `/` slash command → composer affordances
### Apple Vision Pro keynote bento → bento ratio choices
### GitHub contribution heatmap → DNA time-of-day heatmap
### Twitter/X's reply composer typing → AI typing effect
### Discord's drawer + tab patterns → cohort layout
### Apple Music's bottom-sheet → mobile filters
### Figma's color picker → token swatches in Storybook

---

## Tier 5 — Books / treatises / talks

- **Refactoring UI** (Adam Wathan + Steve Schoger) — color, spacing, hierarchy
- **Designing Interfaces** (Jenifer Tidwell) — interaction patterns
- **Don't Make Me Think** (Steve Krug) — usability
- **A Practical Guide to Designing for the Web** (Mark Boulton) — typography, grids
- **The Vignelli Canon** (Massimo Vignelli) — restraint
- **Inclusive Design Patterns** (Heydon Pickering) — a11y
- **Atomic Design** (Brad Frost) — component hierarchy

Talks worth re-watching:
- Linear — Karri Saarinen, "Designing for productivity"
- Vercel + Rauch, "The future of web frameworks"
- Frank Chimero, "What Screens Want"
- Robin Rendle, design newsletter (cssfor.us)

---

## What we explicitly avoid

### Material Design 3
**Why not**: Card-in-card-in-card hierarchy, shadow-as-elevation overdose, aggressive teal-on-purple defaults conflict with palette, FAB everywhere on desktop.

### Ant Design
**Why not**: Dated visual language, China-market default UX patterns don't fit India.

### Bootstrap default
**Why not**: 2010-era; nothing to learn here.

### Most agency landing-page-of-the-day on Awwwards
**Why not**: Optimized for "wow on first visit," not "still pleasant on visit 100." Our product is daily-driver software.

### Robinhood / aggressive consumer fintech
**Why not**: Color screams (green/red flashing), gamification dopamine loops violate `01-design-principles.md` "the product whispers."

### Most "AI" SaaS dashboards (2024–2026)
**Why not**: Generic "purple gradient + sparkle icon" aesthetic. Visually homogenous. We deliberately differentiate.

### LinkedIn itself
**Why not**: Visual identity poor; we want to be the *anti-LinkedIn* — the place you go because LinkedIn isn't enough.

### Naukri / Indeed / Foundit
**Why not**: All three look like 2008. Our market expects more in 2026.

---

## How we use this list

- **Each module spec** (20–36) referenced its primary inspirations.
- **Component library** (`10–14`) referenced primitives' library origins.
- **Design system** (`02–07`) cites pattern sources where applicable.
- **Marketing surface** will lean heavily on Tier 1 + Tier 2 (motion, scroll-driven storytelling).
- **Product chrome** leans on Linear / Cron / Things 3 calm patterns.
- **India-aware UX** consults Tier 3 references.

---

## Living list

This file is meant to grow. As we discover new references, add them here with:
- Source link
- What we want to take
- What we won't take
- Where in the product it would land

Rejected references (after evaluation) also stay here, with reason — saves future revisitation.

---

## Cross-doc links

- All design specs reference these sources
- Trending tactics catalog: `07-trending-design-tactics.md`
- Stack picks: `91-stack-recommendation.md`
- Build order: `90-component-build-order.md`
