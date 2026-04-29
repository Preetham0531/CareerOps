# 22 — Job Discovery

## Purpose
The primary search & filter surface. Users browse aggregated listings from Naukri, LinkedIn, Indeed, Foundit, Instahyre, Cutshort, Wellfound, Hirect, Apna, Internshala + direct ATS portals — with ghost-job, bond, and salary-leak signals layered on every card. The screen must feel **dense but quiet** — earned density, calm precision (`01-design-principles.md`).

## Personas served
All four — adapts via filter defaults set in onboarding.

## Entry points
- Side nav → "Discover"
- ⌘K → "Discover"
- Dashboard "Surgical pick" → click "Browse all"
- URL: `/discover?role=...&loc=...&lpa=...`

## Layout

### Desktop (≥1024px)

Three-column shell:

```
┌─────────────────────────────────────────────────────────────────┐
│ TOPBAR                                                            │
├──────┬───────────┬──────────────────────────────┬───────────────┤
│      │           │                                │                │
│ NAV  │  FILTER   │       JOB LIST (scrollable)    │   PREVIEW     │
│      │  RAIL     │                                │   PANE        │
│      │  (240px)  │  [JobCard]                     │  (380px)      │
│      │           │  [JobCard]                     │                │
│      │  Roles    │  [JobCard]                     │  (selected    │
│      │  Cities   │  [JobCard]                     │   job's       │
│      │  LPA      │  ...                           │   detail)     │
│      │  Source   │                                │                │
│      │  ...      │                                │                │
│      │           │                                │                │
└──────┴───────────┴──────────────────────────────┴───────────────┘
```

Preview pane: shows the currently focused/clicked JobCard's detail without leaving the list. Closing it (Esc or ✕) collapses it; list expands.

### Mobile (<768px)
Single column. Filter rail becomes a bottom sheet (vaul, see `07-trending-design-tactics.md`). Preview pane becomes a full-screen route (with back chevron).

```
┌──────────────────────┐
│ Topbar (search + 🎚️)  │
├──────────────────────┤
│ [Active filter chips] │
├──────────────────────┤
│ [JobCard]             │
│ [JobCard]             │
│ ...                   │
│ (pull-to-refresh)    │
│ (infinite scroll)    │
└──────────────────────┘
```

Tap card → full-screen detail. Tap filter icon → bottom sheet with snap points.

Tinder-style stack-of-cards mode (#33 fresher mode entry) is opt-in via toggle.

## Filter rail anatomy

```
┌──────────────────────────────┐
│ FILTERS                       │
│ ─────────────────────────────  │
│ Search [____________]         │
│                                │
│ Roles                          │
│ ☑ Backend Engineer  (84)      │
│ ☑ Senior SDE        (56)      │
│ ☐ Tech Lead         (12)      │
│ + Add custom                   │
│                                │
│ Location                       │
│ ☑ Bangalore · T1     (145)    │
│ ☑ Remote (India)     (33)     │
│ ☐ Mumbai · T1        (61)     │
│ + Add city                     │
│                                │
│ LPA range                      │
│ ●━━━━━━━━━━━━━━━━●            │
│ ₹18L  ────────  ₹40L           │
│                                │
│ Experience                     │
│ ●━━━━━━━━━━━━━━●━━━            │
│ 4y  ────────────  10y          │
│                                │
│ Work mode                      │
│ ☑ Remote  ☑ Hybrid  ☐ Onsite │
│                                │
│ Source                         │
│ ☑ Naukri    ☑ LinkedIn        │
│ ☑ Indeed    ☑ Foundit          │
│ ☑ Instahyre ☑ Cutshort         │
│ ☑ Wellfound ☑ Apna             │
│ ☐ Hirect    ☐ Internshala      │
│                                │
│ Notice period                  │
│ Within: [60 days ▾]            │
│                                │
│ Quality filters                │
│ ☑ Hide ghost > 0.6             │
│ ☑ Hide bond / bench            │
│ ☑ Hide companies on red list   │
│ ☐ Show only with referral path │
│                                │
│ ────────────────────────────   │
│ [Save as preset]    [Reset]    │
└──────────────────────────────┘
```

- **Counts in parentheses** update live as filters change (debounced 250ms)
- **Quality filters** are gold-tagged when active (subtle gold dot to indicate "you're hiding low-quality listings")
- **Saved presets** appear as chips at top (e.g., "BLR Backend ₹30L+", "Remote-only ₹40L+") — click to apply, ⌘ click to edit

## Job list

Each row is a JobCard (see `11-components-composite.md`). Default density: `default`. Compact mode shrinks to `compact` density.

### List behaviors
- Infinite scroll with TanStack Virtual (handles 10,000+ rows)
- Pull-to-refresh on mobile
- ⌘R or "Refresh" in ⌘K on desktop
- Sort dropdown: Best match (default) / Newest / Highest LPA / Most likely to respond
- "Showing 47 of 312 — 265 hidden by quality filters" link (dismisses individual exclusion if clicked)

### Per-card overlays (subtle, always visible)
- Ghost score pill (top-right corner, hidden if < 0.1)
- Match score (right side, before bookmark)
- Source-portal label (bottom-left meta line)

### Empty state
"No matches in your filter. Try widening LPA range, or open it to remote." + button to edit filters.

### Loading
8 skeleton cards, then infinite-scroll skeletons of 4 at a time.

## Preview pane (desktop)

When a JobCard is clicked or arrow-key-navigated:

```
┌────────────────────────────────────────┐
│ [✕]  Senior Backend Engineer            │
│      Razorpay · Bangalore · T1          │
│      Posted 3d ago via Naukri           │
│                                          │
│ ₹32–42L  ⓘ  ─ confidence: high          │
│ [salary range bar viz]                   │
│                                          │
│ MATCH 87%  ATS-ready 92%   GHOST 12%   │
│                                          │
│ ─────────────────────────────────────  │
│ Description                              │
│ Looking for a senior engineer to lead   │
│ our payments reliability team...         │
│ [expand full JD ›]                      │
│                                          │
│ ─────────────────────────────────────  │
│ Why this is a fit                        │
│ • You have 5y in distributed systems     │
│ • Your async-django repo (★142) maps to  │
│   their stack                            │
│ • Notice period match                    │
│                                          │
│ ─────────────────────────────────────  │
│ Referral paths (3)                       │
│ [Avatar] Priya K — score 0.87 [DM ›]    │
│ [Avatar] Aman B — score 0.62 [DM ›]    │
│ [Avatar] Sara S — score 0.58 [DM ›]    │
│                                          │
│ ─────────────────────────────────────  │
│ Application DNA hint                     │
│ Tuesday morning applies to fintech get  │
│ your best response rate.                │
│                                          │
│ ─────────────────────────────────────  │
│ [Save] [Tailor CV] [Apply ›]            │
└────────────────────────────────────────┘
```

- Apply button shows submission tier (Tier 1 / 2 / 3) as a small label: "Apply via LinkedIn Easy Apply (Tier 1)"
- Tailor CV → opens cover-letter + tailored CV modal flow

## Filter URL state

All filters serialize to URL query params, sharable / bookmarkable:
```
/discover?role=backend%20engineer,senior%20sde&city=blr,remote&lpa=18-40&exp=4-10&mode=remote,hybrid&source=naukri,linkedin&hideGhost=0.6&hideBond=true
```

Saved presets are server-stored with same shape.

## Active-filter chip row

Above the job list, current active filters render as chips with × to remove:

```
[Backend ×] [Senior SDE ×] [Bangalore ×] [Remote ×] [₹18-40L ×] [Reset all]
```

## Ghost score visualization

Pill on JobCard. Hover (or tap on mobile) → popover shows breakdown (see `11-components-composite.md` GhostScoreMeter). Severity color shifts:
- 0–0.3: subtle, neutral
- 0.3–0.6: gold-200 bg
- 0.6–1.0: gold-700 text on gold-100 bg

## Apply submission tiers

Per `04-features.md` — three tiers:

- **Tier 1** (Indeed Apply, LinkedIn Easy Apply, ATS direct API): single-click apply. Confirmation dialog with tailored CV preview, then submit.
- **Tier 2** (portal automation under user's session): browser extension or in-product browser pop-over walks the form filling, user confirms before submit.
- **Tier 3** (manual with prefilled clipboard): copies the exact text/answers to clipboard, opens portal in new tab, user pastes.

Tier indicator on Apply button:
- Tier 1: `[Apply ›]` (default styling)
- Tier 2: `[Apply (assist) ›]` with small magnifying glass icon
- Tier 3: `[Open portal ›]` with external-link icon

## State diagram

```
[loading filters + initial query]
  → [results: list rendered]
     ↓ user toggles filter
     [debounced refetch]
     ↓
     [results updated]
     ↓ user clicks card
     [preview pane opens] (desktop) | [route to /jobs/:id] (mobile)
     ↓ user taps Apply
     [tier selection / confirmation dialog]
     ↓
     [optimistic update: card moves to "Applied" state]
     ↓
     [success toast with undo, or failure with retry]
```

## Data model (frontend slice)

```ts
interface DiscoveryState {
  filters: FilterState;
  sort: 'match' | 'newest' | 'lpa-desc' | 'response-rate';
  results: { items: Job[]; total: number; cursor: string | null };
  selected: Job | null;
  presets: Preset[];
  loading: boolean;
  error: Error | null;
}
```

Server API: `POST /api/discover` (POST because filter object can be large) returns paginated results + per-source counts. Cached aggressively in TanStack Query (60s SWR).

## Interactions & micro-animations

- Filter checkbox toggle → debounced refetch (250ms) → list cards stagger in (30ms each, capped 100ms)
- Card click → preview pane slide-in from right (`gentle` spring) on desktop; route push on mobile
- Apply success → card animates out of list (slide-up + fade), reappears in "Applied" tab
- "Hide ghost" filter toggled on → cards being hidden fade-out + slide-up
- Preview pane open → list shrinks slightly with smooth grid-template-columns transition
- Pull-to-refresh: Lucide RefreshCw icon spins; gold accent on threshold met

## Empty / loading / error states

- **No filters yet (first visit)**: empty state with "Set what you're looking for" + button to filter setup
- **Zero results**: "No matches in your filter. Try widening LPA range or opening to remote." + edit-filters action
- **Source down (e.g., Naukri unreachable)**: small banner above list "Naukri results unavailable right now. Showing other sources." with retry icon
- **All sources down**: full-page error with retry
- **Single result hidden by ghost filter**: count badge "265 hidden by ghost filter — review hidden ›"

## Edge cases & India-specific gotchas

- **Duplicate listings across portals** — same role posted on Naukri + LinkedIn + company site is collapsed into one JobCard with "5 sources" chip
- **JD in regional language** (rare; some govt-related roles) — banner offers translation
- **Stale listings** — JobCard shows "Posted 65 days ago — likely stale" warning if > 60 days, ghost score boosted automatically
- **Recruiter-mill listings** — ghost score >0.7 auto-collapses behind a click ("47 likely-stale listings hidden — show ›")
- **Listings without salary** — "Salary undisclosed — estimated ₹X–Y from triangulation" (see Salary Leak `25-salary-leak.md`)
- **NRI / global remote** — toggle in filters surfaces only roles paying USD/EUR equivalent ≥ ₹50L
- **Stealth mode active** — listings from current employer hidden automatically, with banner "3 listings from your current employer hidden"

## Density mode (compact)

- JobCard switches to `compact` density
- Filter rail collapses to icon strip; click expands as drawer
- Preview pane narrows to 320px

## Performance

- Virtualized list (TanStack Virtual)
- Debounced filter changes
- Server-side pagination (cursor-based)
- Each JobCard memoized; only re-renders when its props change
- Image lazy-loading for company logos with `<img loading="lazy" decoding="async">`
- Skeleton placeholders match JobCard exact dimensions to prevent layout shift

## Cross-doc links

- JobCard, GhostScoreMeter, BondBadge: `11-components-composite.md`
- Apply tiers backend: TBD
- CV tailoring flow: `24-skill-claim-prover.md` (component reuse)
- Referrer DM composer: `23-referral-hijack.md`
- Salary triangulation: `25-salary-leak.md`
- Bond detection drawer: `26-bond-bench-detector.md`

## Open questions

1. Default sort: "Best match" or "Newest"? — Best match by default; many users default-prefer newest; A/B post-launch.
2. Should we surface ghost-job counts pre-filter ("47 listings hidden") prominently to demonstrate value, or keep subtle to avoid alarming users? — Lean subtle; surface in App DNA as a metric instead.
3. Tier 3 apply (manual with prefilled clipboard) — measure usage; if high, invest in extension to push it to Tier 2.
