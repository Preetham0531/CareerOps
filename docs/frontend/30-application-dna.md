# 30 — Application DNA

## Purpose
Every submitted application gets a fingerprint: which CV variant, which cover-letter angle, which tailoring strategy, when it was sent, through which channel. After 30+ applications and 5+ interview outcomes, the agent learns what works for THIS user — and shifts strategy. Personal optimization loop.

This is the analytics surface that turns the product from a tool into a coach.

## Personas served
Heaviest use: Priya (data-driven, surgical). Karan (executive, A/B tests her own outreach). Some Anjali (calibration after a break). Lower priority for Ravi (fresher, doesn't yet have enough volume).

## Entry points
- Side nav → "DNA"
- Dashboard insight tile → "See full analysis ›"
- ⌘K → "Application DNA"
- Per-application detail view → "DNA for this app"

## Layout

Bento grid of analytics tiles. Shell A.

```
┌─────────────────────────────────────────────────────────────────┐
│ TOPBAR                                                           │
├──────┬──────────────────────────────────────────────────────────┤
│      │                                                           │
│ NAV  │ Application DNA                                           │
│      │ Last 90 days · 47 applications · 12 interviews · 2 offers │
│      │                                                           │
│      │ ┌──────────────────────────────────────────────────────┐ │
│      │ │ KEY INSIGHT                                            │ │
│      │ │                                                       │ │
│      │ │ Your "projects-first" CV gets 3× more callbacks       │ │
│      │ │ than "experience-first" for product roles.            │ │
│      │ │                                                       │ │
│      │ │ Confidence: ●●●●○ · Sample: 23 applies                │ │
│      │ │                                                       │ │
│      │ │ [Use projects-first by default for product roles]    │ │
│      │ └──────────────────────────────────────────────────────┘ │
│      │                                                           │
│      │ ┌──────────────────┬──────────────────┬─────────────────┐│
│      │ │ STAT             │ STAT             │ STAT             ││
│      │ │ Callback rate    │ Interview rate   │ Offer rate       ││
│      │ │ 18%   ▁▂▃▅▇      │ 26%  ▁▃▃▅▇▅▃   │ 4%  ▂▁▁▂▃       ││
│      │ │ +4pp vs 30d      │ +6pp vs 30d      │ stable           ││
│      │ └──────────────────┴──────────────────┴─────────────────┘│
│      │                                                           │
│      │ ┌──────────────────────────────────────────────────────┐ │
│      │ │ TIME-OF-DAY HEATMAP                                    │ │
│      │ │ [GitHub-style cell grid — applications by hour × day]  │ │
│      │ │                                                       │ │
│      │ │ "Tuesday 9–11 AM IST has your highest response rate"   │ │
│      │ └──────────────────────────────────────────────────────┘ │
│      │                                                           │
│      │ ┌────────────────────────┬─────────────────────────────┐ │
│      │ │ CV VARIANT PERFORMANCE │ COVER-LETTER ANGLE           │ │
│      │ │                         │ PERFORMANCE                  │ │
│      │ │ Projects-first  18%     │ Funding-mention   24% cb    │ │
│      │ │ Experience-first 6%     │ Tech-stack-fit   18% cb    │ │
│      │ │ Hybrid          12%     │ Generic          7% cb     │ │
│      │ └────────────────────────┴─────────────────────────────┘ │
│      │                                                           │
│      │ ┌──────────────────────────────────────────────────────┐ │
│      │ │ FUNNEL                                                 │ │
│      │ │ Applies  47 ────► Callbacks 8 ────► Interviews 3 ──► │ │
│      │ │                                       └─► Offers 2    │ │
│      │ └──────────────────────────────────────────────────────┘ │
│      │                                                           │
│      │ ┌──────────────────────────────────────────────────────┐ │
│      │ │ COMPANY SECTOR PERFORMANCE                             │ │
│      │ │                                                       │ │
│      │ │ Fintech     ████████ 22% callback                     │ │
│      │ │ E-commerce  ████░░░░ 8%                                │ │
│      │ │ Edtech      ██░░░░░░ 4%                                │ │
│      │ │ Services    █░░░░░░░ 2% (skip these)                  │ │
│      │ └──────────────────────────────────────────────────────┘ │
│      │                                                           │
└──────┴──────────────────────────────────────────────────────────┘
```

## Tiles

### KeyInsight
The single most actionable insight, surfaced as a quote (Fraunces 500 / 20px). Click "Use as default" applies the learning immediately.

The product surfaces at most one KeyInsight at a time — to avoid choice paralysis.

### StatTrio
Callback / Interview / Offer rates with sparklines and deltas (vs. previous 30 days).

### TimeOfDayHeatmap
GitHub-contribution-style grid, days × hours, cells colored by callback rate (sequential teal scale). Hover: "Tue 10am: 4 applies, 2 callbacks (50% rate)."

### CVVariantPerformance
Bar chart by variant, callback rate per variant. Click variant → drilldown to which jobs used it.

### CoverLetterAngle
Same shape — by angle (funding mention, tech-stack fit, generic, project-specific, etc.).

### Funnel
Sankey-like flow: applies → callbacks → interviews → offers. Each stage clickable to drill into.

### CompanySectorPerformance
Horizontal bars by sector, with sample size badge. "Skip these" recommendation when sector is < 5% callback.

### Other tiles (bento grid extends as data grows)
- Source-portal performance (Naukri vs LinkedIn vs Foundit etc.)
- Tier of company (T1 vs T2 vs T3 city, or startup vs MNC)
- Day-of-week heatmap (separate from time-of-day)
- Notice-period claim performance (claiming 30d vs 60d vs negotiable)
- Salary-claim performance (asking 1.3× current vs 1.5× vs 1.7×)
- Referral vs cold-apply (very high signal once paths exist)

## Key insight surfacing

Insights ranked by:
1. **Effect size** (3× difference > 1.5× difference)
2. **Confidence** (n=23 > n=8)
3. **Actionability** (specific action available > vague)
4. **Recency** (recent data > old)

Top-ranked → KeyInsight tile. Others → small "More insights" link below.

Insights are **rotated weekly** if data changes; user sees a notification when a new insight surfaces.

## Funnel detail view

Click "Callbacks" stage → modal:

```
┌──────────────────────────────────────────────────┐
│ Callbacks (8 in 90 days)                          │
│                                                    │
│ By company:                                        │
│ • Razorpay (callback in 3d)                       │
│ • Cred (callback in 5d)                           │
│ • PhonePe (callback in 7d)                        │
│ • ...                                              │
│                                                    │
│ Avg time-to-callback: 4.2d                         │
│ Median: 4d                                         │
│ Slowest: 14d (Foundit listing)                    │
│                                                    │
│ [Open application timeline]                        │
└──────────────────────────────────────────────────┘
```

## State diagram

```
[< 30 applies] → DNA tile shows "learning... 12/30" instead of insights
[30+ applies] → insights compute, key insight surfaces
[user accepts insight as default] → applied to subsequent flows
[new data arrives] → insights refreshed weekly
```

## Data model

```ts
interface DNAState {
  insights: Insight[];
  primaryInsight: Insight | null;
  stats: { callback: StatSeries; interview: StatSeries; offer: StatSeries };
  timeOfDayHeatmap: { day: number; hour: number; applies: number; callbacks: number }[];
  cvVariants: { variant: string; applies: number; callbackRate: number }[];
  letterAngles: { angle: string; applies: number; callbackRate: number }[];
  funnel: { stage: 'applied' | 'callback' | 'interview' | 'offer'; count: number; nextStageRate: number }[];
  sectors: { sector: string; applies: number; callbackRate: number }[];
  windowDays: 30 | 90 | 180 | 'all';
}

interface Insight {
  id: string;
  text: string;
  effectSize: number;
  confidence: 0 | 1 | 2 | 3 | 4 | 5;
  sampleSize: number;
  action: { label: string; effect: () => void };
  category: 'cv' | 'tone' | 'time' | 'sector' | 'channel' | 'salary-ask';
}
```

## Interactions & micro-animations

- Stats tiles: number tick-up (`useSpring`) on first paint
- Heatmap: cells fade in stagger (180 cells, capped at 100ms total)
- Funnel: bars draw left-to-right
- Insight surfacing: gold-bordered card materializes with kinetic-type weight morph

## Empty / loading / error states

- **<30 applies**: "DNA is learning. We'll surface your first insight at 30 applies (12/30 so far)." with progress bar
- **30+ applies but no significant patterns**: "Not enough variation yet — try a tone or CV variant we haven't seen to give us signal." with one-click variant suggestions
- **Insufficient data per tile**: tiles auto-hide; rest of dashboard works
- **All-zeros (no responses)**: surface honest "0% callback so far. Likely cause: ghost listings or comp mismatch — review filters."

## Edge cases & India-specific gotchas

- **Festival weeks** (Diwali, EOFY March) — heatmap auto-flags so user doesn't draw wrong inferences from low activity weeks
- **Time zones** — applies sent from VPN abroad still recorded as IST; we track both apply-time-IST and apply-time-local for diaspora users
- **Pre-product applications** (user applied before signing up) — opt-in to import via CSV; clearly tagged as "before-product" data
- **Survivorship bias warning** — when user has 0 offers, don't make insights about offer-conversion until 3+ offers
- **Privacy: no granular sharing** — DNA is private; sharing requires explicit per-insight opt-in (see Reverse Job Board #11)

## Honesty rules

- Effect sizes always shown with confidence
- Sample sizes labeled prominently
- Insights presented as "this *correlates*", not "this *causes*"
- "Try X" suggestions never claim guaranteed results
- User can always "ignore this insight" — never persistently surfaced

## Cross-doc links

- Heatmap viz: `12-data-viz.md`
- Stat tile: `12-data-viz.md`
- Funnel viz: `12-data-viz.md` (Sankey)
- Insight surfacing in dashboard: `21-dashboard.md`
- DPDP for data analytics: `36-settings-billing.md`
- Best-time-of-day → feeds `23-referral-hijack.md` schedule send default

## Open questions

1. **Causation vs. correlation messaging** — how aggressive to caveat? — Surface as "your data suggests X" not "doing X causes Y."
2. **Cohort comparison** — anonymized comparison to similar users ("you're in top 20% callback rate for fintech BLR")? — high value, needs privacy design
3. **Insight push notifications** — when a strong new insight surfaces, push notify? — opt-in only; daily digest by default
4. **What counts as a "callback"** — recruiter reply vs. interview offer? Both are different funnel stages; clarify in copy
