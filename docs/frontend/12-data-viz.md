# 12 — Data Visualization

> Charts in this product carry weight: salary triangulation, referrer scoring, application DNA, hiring velocity, evidence graphs. They must be *honest*, *legible at small sizes*, and stay strictly inside the teal+gold palette.

---

## Library choices

| Use | Library | Why |
|---|---|---|
| Force-directed graphs | [`react-flow`](https://reactflow.dev) | Best React-native graph lib, customizable, accessible |
| Sankey / chord | [`@nivo/sankey`](https://nivo.rocks) or D3 | Sankey for referral path flow |
| Heatmaps | hand-rolled SVG (D3 scale) | Calendar grid, simple |
| Radial gauges | hand-rolled SVG | Tighter palette control than libs |
| Sparklines | [`react-sparklines`](https://github.com/borisyankov/react-sparklines) or hand-rolled | Tiny, < 5 KB |
| Line / bar charts | [`recharts`](https://recharts.org) | Composable, themed easily |
| Treemap | `@nivo/treemap` | Skill weighting in evidence graph |
| Scatter / bubble | recharts | Salary leak triangulation cluster |

We avoid `chart.js` (canvas-only, harder to theme) and `apexcharts` (CSS-fight to theme).

---

## Categorical color scale (6 stops)

Per `02-color-system.md`:
```
viz-1   teal-500    primary series
viz-2   gold-400    secondary series
viz-3   teal-300    tertiary
viz-4   gold-200    quaternary
viz-5   teal-700    quinary
viz-6   gold-600    senary
```

Never more than 6 categorical series in one chart. If the data needs more, group.

---

## Sequential scale (heatmaps, density)

Single hue: `teal-50 → teal-100 → teal-200 → teal-300 → teal-500 → teal-700 → teal-900`.

Use perceptual interpolation (Lab / OKLab via `culori`) to get even visual steps:
```ts
const scale = scaleSequential(interpolateOklab("#EAFBFA", "#0B3633"));
```

---

## Diverging scale (rare)

Reserved for *delta-against-market* visualizations: salary above/below market, callback rate vs. peer cohort.

`gold-500 ← neutral-100 → teal-500`

The gold side reads "below" / "negative against market"; teal side reads "above" / "positive." We never use red/green diverging — both for palette compliance and because color-blind safety is better in our scheme.

---

## Chart anatomy (universal)

Every chart follows this skeleton:

```
┌─────────────────────────────────────────────┐
│ Title           ┃          [legend]  [ⓘ]   │
│ Subtitle/help                                │
│ ──────────────────────────────────────────── │
│                                              │
│           CHART AREA                         │
│                                              │
│ ──────────────────────────────────────────── │
│ Footnote / source citation                  │
└─────────────────────────────────────────────┘
```

- **Title**: Geist 600 / 16px / `--text-primary`
- **Subtitle**: Geist 400 / 13px / `--text-secondary`
- **(ⓘ) info**: opens popover with method + sources (trust-through-transparency)
- **Legend**: top-right, inline pills, clickable to toggle series
- **Axes**: 1px `--border-subtle` lines, tick labels Geist 400 / 12px / `--text-secondary`
- **Gridlines**: only horizontal, only when needed for value comparison; `--border-subtle` at 60% opacity
- **Footnote**: Geist 400 / 12px / `--text-muted`

---

## Specific chart specs

### Salary Range Bar (composite, used in `25-salary-leak.md`)

Horizontal bar with three layers:

```
[Your target ─────────────────]
            ●  ↑ here

[Market median ──────────────]
                       ┃ ₹38L

[JD posted ────╾━━━━━━━━╼─────]
```

- Each track 8px tall, separated by 12px
- Your target: draggable thumb, label above
- Market median: vertical tick + value label
- JD posted: range fill, range label inside
- Confidence shown via opacity of JD posted track (0.4 if low, 1.0 if high)
- Sources triangulated as chips below

### Triangulation Bubble Chart (salary leak)

X axis: data point date. Y axis: LPA value. Each dot = one observation, color-coded by source (chip in legend).

- Axis labels: dates Mar–Apr ’26
- Bubble size: source weight (Levels.fyi 3pt = bigger bubble)
- Hover: tooltip with "L4 SDE @ Razorpay, ₹22L, posted Apr 8 by ex-employee on AmbitionBox"
- Confidence ellipse: shaded region encompassing 70% of weighted observations (`teal-200` at 30% opacity)

### Force-Directed Referral Graph (#23)

Already specified in `11-components-composite.md` ReferralPathGraph. Reproduced rules:
- Max 100 visible nodes; cluster beyond
- Node sizes: 24 (you) / 32 (1st-degree) / 28 (2nd-degree)
- Edge width: 1–4px on connection strength
- Physics: D3-force with `forceManyBody(-300)`, `forceLink(distance: 80)`, `forceCenter`
- Stop simulation after 3s; restart on drag
- Pan/zoom via wheel + pinch

### Sankey: Referral Path Flow

Used in dashboard insight: "Where your applications come from."

```
You ───────┐
           ├─→ LinkedIn 1st degree ───┐
Your IIT ─┘                            ├─→ Razorpay
                                       │
Your prev co. ─→ Mutual ────────────────┘
```

- Bands colored by depth (teal-500 → teal-300 → teal-100)
- Hover band → highlight, others fade to 30%
- Click target node → drill into that company

### Heatmap calendar (Application DNA #30)

GitHub-contribution-style.

```
M  ▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢
T  ▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢
W  ...
```

- Cells: 12×12px, 2px gap
- Sequential teal scale based on count
- Day labels: M T W T F S S left of grid
- Month labels: above grid
- Hover cell → tooltip: "Apr 14: 3 applications sent"

### Radial Gauges (ATS compatibility, ghost score, referrer match)

```
       ╭─────╮
      ╱  92%  ╲
     │  ATS   │
     │  ready │
      ╲       ╱
       ╰─────╯
```

- 80px (compact) / 160px (hero)
- SVG circle with `stroke-dasharray`
- Track stroke: `--bg-raised` 4px
- Fill stroke: `--brand` (or palette-mapped to value, see below) 4px
- Center text: percentage Geist 700 24/32px

Color mapping for severity:
- 80–100%: `--brand` (teal-500)
- 50–80%: `gold-400`
- 0–50%: `gold-700`

Animated fill: `stroke-dashoffset` transition 480ms `emphasized`.

### Sparklines

Used in JobCard (recent hiring velocity), App DNA stats (last-30d trend).

- 80px wide × 24px tall
- 1px stroke `--brand`
- No axes, no labels
- End point dot: 3px filled, hover shows last value

### Treemap (skill claim weights)

Each rectangle is a skill, sized by evidence weight, colored by category (frontend / backend / data / ml / infra).

- 5 categories → 5 colors from viz-1 through viz-5
- Min cell size: 80×60 (any smaller → grouped into "Other")
- Click cell → opens evidence drawer for that skill

### Stat tile

Single number in big type with sparkline + delta.

```
┌─────────────────────────────┐
│ CALLBACK RATE               │
│ 18%   ▁▂▃▅▇▂▅▆     +4 pp    │
│ vs last 30 days              │
└─────────────────────────────┘
```

- Number: Geist 700 32px
- Label: Geist 600 12px uppercase tracking +0.04em
- Delta: small chip, gold for positive, gold-700 for negative (palette compliance), with arrow icon

---

## Accessibility

- Every chart has `<title>` and `<desc>` SVG children
- Every visual encoding has a textual fallback (data table view, toggleable)
- Color is never the sole encoder of meaning — pair with shape, texture, or label
- Keyboard nav through data points (arrow keys); current point announced via `aria-live="polite"`
- Pattern fills available via toggle in user prefs (for color-blind safety beyond what palette already covers)

---

## Empty / loading states

- Loading: skeleton placeholder matching the chart's eventual shape
- Empty: small illustration + copy, e.g., "No salary signals yet for this role. We'll surface them as data arrives."

---

## Performance

- SVG charts up to ~500 elements; beyond → switch to canvas (visx, hand-rolled)
- Memoize chart data; don't re-compute on every render
- Animate axes on first mount only, not on data updates (set `isAnimationActive={false}` after mount)
- For high-frequency updates (live data), throttle to 250ms

---

## Honesty rules

The product makes opinionated claims. Charts must not lie.

- **Y-axes start at 0 by default** for bar charts. Truncated y-axes only when justified (e.g., showing tiny percentage variations) — and labeled clearly.
- **Confidence intervals shown** wherever a value is estimated (salary, ghost score, referrer match)
- **Sample size labeled** on triangulation charts ("n=12 observations across 4 sources")
- **Date of data** shown on every external-data viz ("Levels.fyi data as of 2026-04-12")
- **No 3D charts. Ever.**
- **No pie chart with > 5 slices** — use horizontal bar chart instead

---

## Anti-patterns

- ❌ Rainbow categorical scales
- ❌ Red/green diverging
- ❌ Tooltips on every data point with the same value (use a single annotation)
- ❌ Charts smaller than 240×160 (illegible)
- ❌ Animated chart elements that distract from the data
- ❌ Logos / brand marks inside chart marks
- ❌ Auto-rotating chart series carousels
- ❌ Word-cloud "visualizations"
