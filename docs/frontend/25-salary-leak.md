# 25 — Salary Leak Detector

## Purpose
Triangulate the actual salary band for a role at a target company from public sources — Levels.fyi, AmbitionBox, Glassdoor, Reddit r/developersIndia, Blind India, the recruiter's other postings, ex-employee profiles cross-referenced to AmbitionBox. Output a confidence-scored range so the user knows whether the listing is worth their time *before* applying.

## Personas served
Heaviest use: Priya (mid-career, surgical), Karan (executive, knows market well, validates). Also Anjali (returner, calibrating reasonable ask). Less for Ravi (fresher, less variance).

## Entry points
- JobCard preview pane → "₹32–42L ⓘ" → expand
- Side nav → "Salary intel"
- ⌘K → "What's the real salary at <company> for <role>?"
- Settings → "Salary intel" (history, saved companies)

## Layout

Two contexts:
- **Inline (in JobCard preview)**: compact viz + sources chip
- **Standalone (side-nav route)**: full investigation view with bubble chart, source breakdown, comparison cohorts

### Standalone screen

Shell A (default workspace):

```
┌─────────────────────────────────────────────────────────────────┐
│ TOPBAR                                                           │
├──────┬──────────────────────────────────────────────────────────┤
│      │                                                           │
│ NAV  │ Salary intel: Senior Backend at Razorpay                 │
│      │                                                           │
│      │ ┌──────────────────────────────────────────────────────┐ │
│      │ │ TRIANGULATED RANGE                                   │ │
│      │ │                                                       │ │
│      │ │ ₹18L  ────────━━━━━━━━━━━━━━━━━━━━━━────────  ₹40L  │ │
│      │ │                  ▲                                    │ │
│      │ │            ₹28L (10th)                                │ │
│      │ │                       ╾━━━━━━━━━╼                    │ │
│      │ │                       ₹32L (50th: median)             │ │
│      │ │                                ●                      │ │
│      │ │                              ₹38L (90th)              │ │
│      │ │                                                       │ │
│      │ │ Confidence: ●●●●○  (n=18 observations, 4 sources)    │ │
│      │ │                                                       │ │
│      │ │ Vs. JD posted band ₹32–42L:                           │ │
│      │ │ Posted band SLIGHTLY ABOVE market median (+6L)        │ │
│      │ │                                                       │ │
│      │ └──────────────────────────────────────────────────────┘ │
│      │                                                           │
│      │ ┌──────────────────────────────────────────────────────┐ │
│      │ │ TRIANGULATION                                          │ │
│      │ │ [bubble chart by source × time]                       │ │
│      │ │                                                       │ │
│      │ │ ● Levels.fyi (3 obs, weight 0.4)                      │ │
│      │ │ ● AmbitionBox (12 obs, weight 0.3)                    │ │
│      │ │ ● Reddit r/developersIndia (2 obs, weight 0.15)        │ │
│      │ │ ● Recruiter's other postings (1 obs, weight 0.15)     │ │
│      │ │                                                       │ │
│      │ └──────────────────────────────────────────────────────┘ │
│      │                                                           │
│      │ ┌─────────────────────┬────────────────────────────────┐ │
│      │ │ COMPONENTS BREAKDOWN│ COMP STRUCTURE EXPECTATION     │ │
│      │ │                      │                                │ │
│      │ │ Base    ₹24–32L      │ Joining bonus likely           │ │
│      │ │ Var     ₹4–6L (15%)  │ ESOP grant: 0.05–0.1%         │ │
│      │ │ ESOP    1y cliff,    │ Notice buyout sometimes        │ │
│      │ │         4y vest      │ negotiable                     │ │
│      │ │                      │                                │ │
│      │ └─────────────────────┴────────────────────────────────┘ │
│      │                                                           │
│      │ ┌──────────────────────────────────────────────────────┐ │
│      │ │ PEER COMPANIES (similar level, similar role)          │ │
│      │ │                                                       │ │
│      │ │ Cred           ₹30–40L                                │ │
│      │ │ PhonePe        ₹28–38L                                │ │
│      │ │ Zerodha        ₹35–45L                                │ │
│      │ │ Razorpay  ←    ₹28–38L (you're investigating)        │ │
│      │ │                                                       │ │
│      │ └──────────────────────────────────────────────────────┘ │
│      │                                                           │
│      │ ┌──────────────────────────────────────────────────────┐ │
│      │ │ SOURCE TRANSPARENCY                                   │ │
│      │ │                                                       │ │
│      │ │ Levels.fyi: 3 data points 2025–2026                   │ │
│      │ │ • L4 SDE @ Razorpay, ₹31L base, joined Mar 2025      │ │
│      │ │ • L5 SDE @ Razorpay, ₹38L base, joined Sep 2025      │ │
│      │ │ • L4 SDE @ Razorpay, ₹29L base, joined Jan 2026      │ │
│      │ │                                                       │ │
│      │ │ AmbitionBox: 12 self-reported, range ₹26–42L          │ │
│      │ │ ...                                                   │ │
│      │ │                                                       │ │
│      │ └──────────────────────────────────────────────────────┘ │
└──────┴──────────────────────────────────────────────────────────┘
```

### Inline (compact, in JobCard preview pane)

```
₹32–42L  ⓘ  ─ confidence: high
[salary range bar viz, ~120px wide]
sources: levels · ambitionbox · reddit · recruiter
```

Click `ⓘ` → opens standalone view in drawer (or new route on mobile).

## Key components

### TriangulationBar (inline)
A horizontal bar showing 10th–90th percentile range with median marker, and JD-posted band overlay. ~120–280px wide.

### TriangulationBubble (full view)
Bubble chart, X = date observed, Y = LPA value, bubble size = weight. Hover bubble → tooltip with details (role level, role, source). Confidence ellipse drawn at 70% weight coverage.

### SourceWeights pie / horizontal bars
Shows how each source contributes to the range. User can deselect a source to see "What if I distrust X?" — range recalculates.

### ComponentsBreakdown
Stacked horizontal bar showing Base + Variable + ESOP shares, with hover tooltips for each.

### PeerComparison
Sortable list of similar-level roles at peer companies, with the focal company highlighted. Click peer → switch focus.

## State diagram

```
[loading: aggregating sources]
  → [partial data: render with what we have, mark "Refining..."]
  → [full data: confidence-scored final view]
     ↓ user toggles a source
     [recalculate locally with that source weighted 0]
```

## Data model (frontend slice)

```ts
interface SalaryIntelState {
  target: { company: string; role: string; level?: string; location?: string };
  range: { p10: number; p50: number; p90: number; confidence: number };
  observations: Observation[];
  components: { base: [number, number]; variable: [number, number]; esop?: { equity: number; vest: string }; joiningBonus?: [number, number] };
  peers: { company: string; range: [number, number] }[];
  postedBand: [number, number] | null;  // from JD
  sources: { source: SourceType; weight: number; observations: number; lastUpdated: Date }[];
  loading: boolean;
}

type Observation = {
  source: SourceType;
  date: Date;
  level?: string;
  role: string;
  base: number;
  totalCTC?: number;
  weight: number;
  notes?: string;
};
```

API: `GET /api/salary-intel?company=X&role=Y&level=Z` — returns aggregated + per-source data.

## Interactions & micro-animations

- **Loading**: bar viz renders ghost outline + axis only, then bubbles pop in (stagger 30ms)
- **Confidence dots fill**: 0–5 dots animate fill on first paint
- **Hover bubble**: bubble scales 1.2× + tooltip
- **Toggle source off**: bubbles from that source fade out + range bar smoothly re-shapes (Framer Motion `layout` on the bar)
- **Peer comparison hover**: row highlights, peer's range overlaid as ghost on the main range bar

## Empty / loading / error states

- **Insufficient data (< 3 observations)**: "Not enough public data on this role yet. We need more time + signals to give you a confident range." + suggestions to widen role/level
- **All sources rate-limited**: "Sources unavailable. Last cached range: ₹28–38L (24h old)."
- **Single very-recent observation**: shown as point with disclaimer "Single data point; refresh in a week for better triangulation"
- **JD has no posted band**: range shown without overlay, with note "JD didn't post a band — this is our triangulated estimate"

## Edge cases & India-specific gotchas

- **Total CTC vs. base** — Indian listings often quote "₹40L CTC" lumping base + variable + ESOP — we always disaggregate where data permits
- **ESOP vs. equity** — Indian terminology fuzzy; we always show vesting + cliff explicitly
- **Joining bonus** — common in India (₹2–10L), often negotiable; always surface separately
- **Notice-period buyout** — sometimes part of comp; mentioned in comp structure section
- **Bond clawback** — for service-co roles, bond pay subtracted from effective comp shown — see `26-bond-bench-detector.md` for cross-flag
- **WFH stipend / one-time** — common post-2023; mentioned where data shows it
- **Fresher Glassdoor data is sparser** — for fresher roles, range relies more on peer-company averages + campus-package data
- **Tier-1 vs. tier-2 city** premium — separate range when data permits ("Same role pays ₹4L less in Pune T2")
- **WhatsApp-leaked offer screenshots** circulate in dev WhatsApp groups — we link r/developersIndia threads where users have shared

## Source-specific quirks

| Source | Reliability | Update frequency | Caveat |
|---|---|---|---|
| Levels.fyi | High (verified) | Continuous | Limited India data outside top T1 startups |
| AmbitionBox | Medium (self-reported) | Continuous | Indian-focused; can be stale |
| Glassdoor | Medium | Slow | Often US-skewed for global cos |
| Reddit r/developersIndia | High (recent) but anecdotal | Continuous | Low n; community filters trust |
| Blind India | Medium-high | Continuous | Behind paywall in places |
| Recruiter postings on LinkedIn | Variable (sometimes specific, often vague) | Daily | Anchors on the specific recruiter |
| Past employee profiles → AmbitionBox triangulation | Indirect | Slow | Manual cross-reference |

Each source's weight is set by an internal heuristic but is **user-overridable** in settings (advanced).

## Honesty rules

Per `12-data-viz.md` honesty principles:
- Always show n (number of observations)
- Always show data freshness (most-recent observation date)
- Never collapse to a single point estimate without showing range
- Never show a range with confidence < `low` without warning the user
- Sources clickable to original (where legal/ToS permits)

## Cross-doc links

- Triangulation chart: `12-data-viz.md`
- Range bar: `12-data-viz.md` Salary Range Bar
- Cited sources: `11-components-composite.md` CitationFootnote
- Negotiation feed-in: `29-negotiation-copilot.md` (uses this range to draft counter-offer)
- DPDP for source aggregation: `36-settings-billing.md`

## Open questions

1. **Tier-2/3 city salary premium signals** are scarce — is the data thin enough that we should refuse to estimate, or estimate with explicit low-confidence? — Estimate with low-confidence + explicit note.
2. **Crowdsourcing**: should our own users contribute observations (anonymized) back to the pool? — High-leverage v0.2 feature; needs DPDP design + explicit per-submission consent.
3. **Real-time peer Reddit thread monitoring** — we surface a "Discussion: 8 mentions in last 30 days" chip, but should we summarize sentiment? — v0.2 feature; risk of misrepresentation.
