# Day 4 — Dashboard, Discovery, Apply Flow

> **Goal**: the two daily-driver surfaces — Dashboard (bento grid with all tiles populated from MSW) and Discovery (filter rail + virtualized list + preview pane). Plus the apply flow with Tier 1/2/3 affordances.
>
> **Why this day matters**: this is where users spend 80% of their time. If these don't sing, nothing else matters.

---

## Prerequisites

- Day 3 complete: shell + onboarding + ⌘K functional
- `JobCard` rock solid (Day 2)
- MSW returning realistic data
- TanStack Query hooks in `packages/api-client` ready

---

## Hour-by-hour

### Block 1 (3h) — Dashboard (`/dashboard`)

Per `21-dashboard.md`. Route `apps/web/app/(app)/dashboard/page.tsx`.

#### Bento layout
CSS Grid with named template areas; collapses to single column < 1024px.

```css
.dashboard-bento {
  display: grid;
  grid-template-areas:
    "greeting greeting greeting greeting"
    "primary primary stat1 stat1"
    "primary primary stat2 stat2"
    "primary primary stat3 stat3"
    "referrers referrers referrers referrers"
    "timeline timeline health health"
    "dna dna dna dna";
  gap: var(--space-6);
}
```

#### Tiles
Each tile is its own component in `apps/web/features/dashboard/components/`:

1. **`GreetingBand`** — time-aware greeting + summary line + aurora gradient bg
2. **`SurgicalPicks`** — carousel of 3 expanded JobCards with hero 3D tilt; auto-rotate every 6s, pause on hover
3. **`StatTile` × 3** — Callback rate, applies this week, upcoming interviews; sparkline + delta chip
4. **`ReferrerPathsWaiting`** — list of referrer rows (avatar + name + score + Compose DM button)
5. **`ApplicationTimeline`** — 14-day bar chart, stages colored
6. **`CompanyHealthShifts`** — list of saved companies + sentiment indicator
7. **`DNAInsight`** — Fraunces 500 / 20px pull-quote + "See full analysis ›"

#### Data flow
- Single `useDashboard()` query → returns all tile data
- Each tile reads from same query (slices)
- ErrorBoundary per tile (one failed tile doesn't break others)

#### Animations
- Aurora gradient drifts 60s loop (CSS @property)
- Greeting fades in 200ms
- Tiles stagger in (30ms each, capped 100ms)
- DNA insight: kinetic-type Fraunces axis morph from 400 → 500 over 600ms

### Block 2 (3h) — Discovery (`/discover`)

Per `22-job-discovery.md`. Route `apps/web/app/(app)/discover/page.tsx`.

#### Three-column shell (desktop)
- Filter rail 240px (left)
- Virtualized job list (center)
- Preview pane 380px (right, conditional)

#### Filter rail (`features/discover/components/FilterRail.tsx`)
- Search input (debounced 250ms)
- Roles multi-chip combobox with live counts
- Cities multi-checkbox with tier badges
- LPA dual-thumb slider
- Experience dual-thumb slider
- Work mode toggle group
- Source multi-checkbox (Naukri, LinkedIn, Indeed, Foundit, Instahyre, Cutshort, Wellfound, Apna, Hirect, Internshala)
- Notice period select
- Quality filters (gold-tagged when active):
  - Hide ghost > 0.6
  - Hide bond / bench
  - Hide red-list companies
  - Show only with referral path
- Saved presets row at top
- "Save as preset" + "Reset all"

#### Job list
- TanStack Virtual (handles 10k+ rows)
- Each row a `JobCard` (default density)
- Sort dropdown (best match / newest / highest LPA / most likely to respond)
- "Showing 47 of 312 — 265 hidden by quality filters" link
- Active-filter chips above list (× to remove)
- Pull-to-refresh on mobile
- Infinite scroll cursor pagination

#### Preview pane
- Slides in from right when JobCard clicked (`gentle` spring)
- Mobile: route push to `/discover/[jobId]` with back chevron
- Sections: header, salary range viz, scores, JD excerpt, why-fit bullets, referral paths, DNA hint, action buttons

#### URL state
All filters serialize to URL via `nuqs`:
```
/discover?role=backend,sse&city=blr,remote&lpa=18-40&exp=4-10&mode=remote,hybrid&source=naukri,linkedin&hideGhost=0.6&hideBond=true&sort=match
```

### Block 3 (1.5h) — Apply flow

Per `22-job-discovery.md` Apply submission tiers.

- **Tier 1** (Indeed Apply / LinkedIn Easy Apply / ATS direct): `[Apply ›]` button. Click → confirmation dialog with tailored CV preview → submit.
- **Tier 2** (portal automation): `[Apply (assist) ›]` with magnifying glass icon. Click → opens an in-product browser pop-over (placeholder for Day 6+; today: opens portal in new tab with copy-to-clipboard ready).
- **Tier 3** (manual prefill): `[Open portal ›]` with external-link icon. Click → copies tailored answers + opens portal.

Apply success flow:
- Optimistic update — JobCard moves to "Applied" state
- 8s undo toast (extended)
- On undo: revert
- Failure: error toast with retry

`features/apply/` houses the apply state machine + the modal flow.

### Block 4 (0.5h) — Saved / Applied / Inbox stub routes

Quick stub routes for the side nav items not built yet:
- `/saved` — list of bookmarked JobCards
- `/applied` — list of submitted applications + status chips
- `/inbox` — placeholder; Day 5 builds the referral message threads

These pages reuse `JobCard` and existing patterns; minimal new code.

### Block 5 (1h) — Mobile responsiveness pass

For Dashboard + Discovery + Apply:
- Bento collapses to single column on Dashboard
- Filter rail becomes bottom sheet (vaul) on Discovery mobile
- Preview pane becomes route push on mobile
- Stack-of-cards swipe mode (tinder-style) opt-in toggle on Discovery
- Pull-to-refresh wired

Test on real Android Chrome + iOS Safari.

### Block 6 (1h) — Tests + visual sweep

- Playwright e2e: `discovery.spec.ts` — set filters, see results, click card, see preview, save, undo
- Playwright e2e: `dashboard.spec.ts` — load, verify all tiles, click DNA insight, verify nav
- Storybook stories for each Dashboard tile (loading + populated + error states)
- Storybook stories for FilterRail with various filter states
- Axe sweep on both routes
- Lighthouse on both — perf ≥ 85 (mobile), 90 (desktop)

---

## Files created today

```
apps/web/
  ├── app/(app)/
  │   ├── dashboard/
  │   │   ├── page.tsx
  │   │   └── error.tsx
  │   ├── discover/
  │   │   ├── page.tsx
  │   │   ├── [jobId]/page.tsx          (mobile preview route)
  │   │   ├── loading.tsx
  │   │   └── error.tsx
  │   ├── saved/page.tsx                (stub)
  │   ├── applied/page.tsx              (stub)
  │   └── inbox/page.tsx                (stub)
  ├── features/
  │   ├── dashboard/
  │   │   ├── components/
  │   │   │   ├── GreetingBand.tsx
  │   │   │   ├── SurgicalPicks.tsx
  │   │   │   ├── StatTile.tsx
  │   │   │   ├── ReferrerPathsWaiting.tsx
  │   │   │   ├── ApplicationTimeline.tsx
  │   │   │   ├── CompanyHealthShifts.tsx
  │   │   │   └── DNAInsight.tsx
  │   │   └── store.ts
  │   ├── discover/
  │   │   ├── components/
  │   │   │   ├── FilterRail.tsx
  │   │   │   ├── ActiveFilterChips.tsx
  │   │   │   ├── JobList.tsx           (virtualized)
  │   │   │   ├── PreviewPane.tsx
  │   │   │   ├── SortDropdown.tsx
  │   │   │   ├── SwipeStack.tsx        (mobile opt-in)
  │   │   │   └── PresetChips.tsx
  │   │   ├── store.ts
  │   │   └── url-state.ts              (nuqs)
  │   └── apply/
  │       ├── components/{ApplyDialog,TierBadge,Tier2Walker,Tier3CopyHelper}.tsx
  │       └── machine.ts                (xstate or zustand state machine)
  └── components/charts/                 (sparkline, mini bar chart for tiles)

playwright/e2e/
  ├── dashboard.spec.ts
  └── discovery.spec.ts
```

---

## Definition of done

- [ ] `/dashboard` renders all 7 tiles with realistic data; aurora gradient drifts; sparkline/charts smooth
- [ ] `/discover` renders 50+ JobCards from filter; filters work; preview pane opens
- [ ] URL filters bookmarkable / shareable
- [ ] Apply Tier 1 happy path → optimistic update → 8s undo → revert tested
- [ ] Mobile responsiveness: dashboard stacks, filter rail becomes bottom sheet
- [ ] Stack-of-cards swipe works on mobile (opt-in)
- [ ] Pull-to-refresh works on Discovery and Dashboard
- [ ] Playwright e2e for both routes passing
- [ ] Lighthouse ≥ 90 desktop, ≥ 85 mobile on both
- [ ] Axe zero serious/critical
- [ ] Bundle size for `/discover` route < 200 KB initial JS

---

## Common pitfalls

- **TanStack Virtual + container queries**: virtualization measures DOM; if container query changes density mid-scroll, recalc; use `measureElement` correctly
- **Aurora gradient repaint cost**: animate via CSS `@property` not via JS state; profile on floor device
- **Filter state in URL + Zustand**: pick one source of truth (URL primary); Zustand subscribes
- **JobCard memoization**: ensure each card only re-renders when its props change; use `React.memo` + stable callbacks
- **Image lazy-load CLS**: company logos must reserve dimensions; pass `width`/`height` explicitly
- **Apply optimistic update + undo**: server reconciliation timing — TanStack Query `onMutate` / `onError` rollback pattern
- **Stack-of-cards swipe gesture conflicts** with PWA pull-to-refresh: scope swipe handlers to card region, not the whole viewport

---

## Hand-off to Day 5

Tomorrow: the headline feature day — Referral Hijack with the force-directed graph + DM composer + send queue, plus Skill Claim canvas, plus Salary Leak full-view, plus Bond/Bench detector drawer. Heavy day. Today's apply flow + JobCard preview pane patterns will be reused.
