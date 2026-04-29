# 04 — Spacing, Grid, Layout

> Spatial system is the silent backbone. When it's right, no one notices. When it's wrong, the whole product feels amateur.

---

## Base unit: 4px

Every spatial measurement is a multiple of 4px. No exceptions.

| Token | px | rem | Usage |
|---|---|---|---|
| `space-0` | 0 | 0 | reset |
| `space-1` | 4 | 0.25 | hairline; icon-to-text in compact rows |
| `space-2` | 8 | 0.5 | tight stack (label-to-input) |
| `space-3` | 12 | 0.75 | default inline gap |
| `space-4` | 16 | 1 | default block gap |
| `space-5` | 20 | 1.25 | card internal padding |
| `space-6` | 24 | 1.5 | section gap (intra-card) |
| `space-8` | 32 | 2 | section gap (inter-card) |
| `space-10` | 40 | 2.5 | major section gap |
| `space-12` | 48 | 3 | page section padding |
| `space-16` | 64 | 4 | hero block padding |
| `space-20` | 80 | 5 | hero spacing |
| `space-24` | 96 | 6 | rare; mega heroes |

**Rule:** if you reach for a non-token value (`13px`, `padding: 18px`), stop. Either the token list is incomplete (extend it deliberately, with a PR + reason) or your component is misaligned with the system.

---

## Density modes

Two density modes shipped, user-toggleable in settings:

- **Comfortable (default)** — uses the table above
- **Compact** — multiplies padding tokens by 0.75 (rounded to nearest 4)

Compact mode is for power users (Priya — surgical, comparing 50 listings at once). Compact mode never reduces *typography* — only spatial padding.

---

## The 12-column grid

Standard 12-column grid with bento-style child layouts inside.

| Breakpoint | Gutter | Margin | Column # | Use |
|---|---|---|---|---|
| `< 640` (mobile) | 16 | 16 | 4 | mobile |
| `640–1024` (tablet) | 20 | 24 | 8 | tablet |
| `1024–1440` (laptop) | 24 | 32 | 12 | laptop |
| `1440–1920` (desktop) | 24 | auto (max-w 1320px) | 12 | desktop |
| `≥ 1920` (large) | 24 | auto (max-w 1480px) | 12 | rare; large displays |

Container max-width caps at **1320px** — beyond that, content centers and the gutters expand. We do not stretch dense data tables to 2000px wide; they get internal scroll instead.

---

## Bento grid

The dashboard, the application-DNA analytics page, and the offer-summary page use bento layouts. Bento = irregularly-sized tiles fitting a CSS grid like a Japanese lunch box.

```
┌──────────────────┬──────────┐
│                  │          │
│   PRIMARY        │  STAT 1  │
│                  │          │
│                  ├──────────┤
│                  │          │
│                  │  STAT 2  │
├────────┬─────────┴──────────┤
│        │                    │
│ STAT 3 │   SECONDARY        │
│        │                    │
└────────┴────────────────────┘
```

Implementation: CSS Grid with named template areas. No JS layout libraries. See `21-dashboard.md` for full bento patterns.

Rules:
1. **Aspect ratios stay rational** — 1:1, 2:1, 3:2, 4:3 only
2. **Primary tile is always anchor-top-left** (reading order)
3. **Stat tiles never wider than 2 columns** (information atomic)
4. **At < 1024px, bento collapses to single-column stack** with primary first

---

## Container queries

We use `@container` queries, not just media queries. A card placed in a wide container expands to 3-column inner layout; the same card in a narrow rail collapses to 1-column. This frees us to drop a JobCard into the dashboard, the discovery list, or a sidebar without re-coding.

```css
.job-card { container-type: inline-size; }
@container (min-width: 480px) { .job-card-inner { grid-template-columns: 1fr 200px; } }
@container (min-width: 720px) { .job-card-inner { grid-template-columns: 1fr 200px 280px; } }
```

Browser support: Chrome 105+, Safari 16+, Firefox 110+ — covers our market.

---

## Page layout shells

### Shell A — Dense workspace (default for most modules)

```
┌─────────────────────────────────────────────────┐
│ TOP BAR (56px)                                   │
├─────┬───────────────────────────────────────────┤
│     │                                            │
│ N   │              MAIN CONTENT                 │
│ A   │                                            │
│ V   │                                            │
│     │                                            │
│ 240 │                                            │
└─────┴───────────────────────────────────────────┘
```

- Top bar: 56px tall. Brand mark (left), search (center), user (right). Sticky.
- Side nav: 240px expanded, 64px collapsed. Sticky. Drawer on mobile.
- Main: scrollable area; respects safe-area insets on mobile.

### Shell B — Focused canvas (referral graph, evidence canvas)

```
┌─────────────────────────────────────────────────┐
│ TOP BAR (56px) — minimal: only brand + close X  │
├─────────────────────────────────────────────────┤
│                                                  │
│              CANVAS (full bleed)                │
│                                                  │
├─────────────────────────────────────────────────┤
│  STICKY ACTIONS RAIL (when relevant)             │
└─────────────────────────────────────────────────┘
```

Used for the referral graph (#23), skill evidence canvas (#24), interview prep board (#28). Side nav is collapsed/hidden by default — these are immersive views.

### Shell C — Wizard / split (onboarding, negotiation)

```
┌─────────────────────────────────────────────────┐
│ STEP HEADER (40px, with progress)                │
├──────────────────────────┬──────────────────────┤
│                           │                      │
│  STEP CONTENT             │   PREVIEW / HINTS   │
│  (60% width)              │   (40% width)       │
│                           │                      │
└──────────────────────────┴──────────────────────┘
```

Right rail collapses below 1024px to a peeking drawer at the bottom.

### Shell D — Mobile-first stacked (WhatsApp surface, voice)

Single column, no nav rail. Bottom tab bar (5 tabs max) for primary navigation. Used for the WhatsApp recruiter mode (#35) and voice interface (#35).

---

## Z-index scale

```
0     base content
10    sticky elements (top bar, side nav)
20    floating buttons (FAB, magnetic dock)
30    dropdowns, popovers
40    drawers, sheets
50    modals
60    toasts (top-right corner)
70    command palette (⌘K)
80    debug overlay (dev only)
90    DnD drag preview
100   tooltips (highest visible)
```

No `z-index: 9999`. Ever. If you're tempted, you have a stacking context bug.

---

## Safe areas (mobile)

```css
padding-top: max(env(safe-area-inset-top), 16px);
padding-bottom: max(env(safe-area-inset-bottom), 16px);
```

Bottom tab bar takes safe-area-inset-bottom into account so it doesn't overlap iPhone home indicator.

---

## Responsive type & spacing

Both fluid: `clamp(min, ideal, max)` derived from utopia.fyi.

Mobile-first authoring: write the small-screen layout first, layer larger breakpoints additively.

---

## Layout debug overlay

Dev-only key combo: `Ctrl + Shift + L` toggles a layout debug overlay with:
- 4px grid visible
- Container query boundaries highlighted
- Current breakpoint badge top-right
- Hover any element to see computed padding/margin/gap

Implementation: simple React component injecting CSS via `[data-debug-layout]` attribute. Not part of prod bundle (tree-shaken by `process.env.NODE_ENV !== 'development'`).
