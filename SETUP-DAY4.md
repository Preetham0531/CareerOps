# Day 4 — Setup notes

> Append to `SETUP.md` after merging Day 4. Continues the `.day4` swap pattern.

## Files to swap

```bash
cd ~/Downloads/Desktop/CareerOps-India

# Replace existing files with Day 4 versions
mv apps/web/package.json.day4                       apps/web/package.json
mv packages/api-client/src/schema.day4.ts           packages/api-client/src/schema.ts
mv packages/api-client/src/hooks.day4.ts            packages/api-client/src/hooks.ts
mv apps/web/mocks/factories.day4.ts                 apps/web/mocks/factories.ts
mv apps/web/mocks/handlers.day4.ts                  apps/web/mocks/handlers.ts
mv "apps/web/app/(app)/dashboard/page.tsx.day4"     "apps/web/app/(app)/dashboard/page.tsx"
mv "apps/web/app/(app)/discover/page.tsx.day4"      "apps/web/app/(app)/discover/page.tsx"

pnpm install                                # picks up @tanstack/react-virtual + nuqs
pnpm tokens:build
pnpm dev                                    # http://localhost:3000
```

Walk: sign in → `/dashboard` (full bento) → `/discover` (filter rail + virtualized list + preview pane) → click Apply → 8s undo toast.

## What ships in Day 4

### `@careerops/api-client` extensions
- Full `Job` Zod schema (palette-strict)
- `DashboardResponse` schema with surgical picks, full stats, referrer paths, timeline, company health, DNA insight
- `DiscoverFilters` + `DiscoverResponse` (cursor pagination, hidden-counts breakdown)
- `useDiscover()` — TanStack `useInfiniteQuery` for list pagination
- `useApply()` + `useUndoApply()` — invalidate `applications` + `dashboard` query keys

### MSW expansion
- **`makeJob`** — 0–0.45 ghost score for product cos, 0.4–0.85 for service cos (TCS/Infosys), bond + bench flags applied accordingly
- **`makeDashboard`** — 3 surgical picks, 14-day timeline, 4 company-health rows, referrer paths
- **`discover()`** — in-memory query engine: search, role/city/work-mode/source/exp/lpa filters, ghost/bond/referral quality filters, all 4 sort orders, cursor pagination
- New handlers: real `/api/discover`, `/api/apply`, `/api/apply/:id/undo`

### Dashboard tiles (`features/dashboard/components/`)
- `Sparkline` — hand-rolled SVG sparkline, < 50 lines, palette-strict
- `GreetingBand` — aurora-bg hero with skeleton fallback
- `StatTile` + `StatTileSkeleton` — sparkline + delta chip (gold-up / danger-down)
- `SurgicalPicks` — auto-rotating 3-card carousel (6s, paused on hover) with 3D tilt via Framer Motion `useMotionValue` + `useSpring`
- `ReferrerPathsWaiting` — avatar + score + Compose-DM CTA
- `ApplicationTimeline` — 14-day stacked bar chart (applied / callbacks / interviews / offers — gold for offers)
- `CompanyHealthShifts` — sentiment trend chips (improving / stable / declining)
- `DNAInsightTile` — Fraunces pull-quote with link

### Dashboard page
- Bento grid: 12-col on lg, single-column on mobile
- Surgical picks span 8×2; stat trio stacks in remaining 4 cols
- Referrer paths + timeline + health + DNA stack below
- All tiles fed by single `useDashboard()` query
- ErrorBoundary-friendly: per-tile data drives independent skeletons

### Discovery surface (`features/discover/`)
- **`url-state.ts`** — nuqs-bound filter state. Filters serialize to URL (shareable / bookmarkable):
  `/discover?roles=Backend,Senior+SDE&cities=Bangalore&lpaMin=18&lpaMax=40&hideBondBench=true&sort=match`
- **`FilterRail`** — search, role chips, city checkboxes, LPA + experience dual-thumb sliders, work-mode chips, source checkboxes, quality toggles (gold-tagged when active)
- **`ActiveFilterChips`** — chip row above list with × per filter
- **`JobList`** — TanStack Virtual with auto-load-next-page on near-bottom; renders `JobCard` rows; quality-hidden count surfaced
- **`PreviewPane`** — sticky-header drawer-like surface with Apply / Tailor CV / View referrers actions
- **`SortDropdown`** — 4 sort options
- **Discovery page** — three-column shell desktop / single-column + bottom-sheet filters mobile

### Apply flow
- **`ApplyDialog`** — Tier 1 confirmation with bond/bench warning if applicable
- 8-second undo Sonner toast via `toast.action`
- Mutation invalidates `dashboard` + `applications` query keys

### Stub routes
- `/saved`, `/applied` placeholders (Day 5 wires them)

### E2E
- `playwright/e2e/discovery.spec.ts`: sign-in → list renders → preview → apply → undo toast; filter checkbox + chip removal

## Verifying Day 4 done

- [ ] `/dashboard` renders all 7 tiles with realistic mock data
- [ ] Surgical picks auto-rotate every 6s; pause on hover
- [ ] 3D tilt on primary tile (subtle 4° max — feels right, not gaudy)
- [ ] Stat tiles show sparklines + delta chips (gold-up / danger-down)
- [ ] Application timeline shows 14-day stacked bars; gold offers
- [ ] `/discover` renders filter rail + virtualized list + preview pane on desktop
- [ ] Mobile: filter rail becomes vaul bottom sheet; preview becomes route push
- [ ] Filter changes update URL; refreshing keeps state
- [ ] Active filter chips toggle off on × click
- [ ] Apply Tier-1 happy path → undo toast within 8s reverts via `useUndoApply`
- [ ] Bond/bench warning surfaces in ApplyDialog when flagged
- [ ] No layout shift when virtualized list re-measures
- [ ] `pnpm e2e` discovery + onboarding both green
- [ ] `pnpm test` all green

## Hand-off to Day 5

`docs/frontend/build-plan/day-5.md` — the headline feature day. Referral hijack with the
force-directed graph (`react-flow`) + DM composer (AI typing effect) + send queue;
Skill claim canvas; Salary leak triangulation chart; Bond/bench detector drawer with
sources; Inbox / message threads.

The Day-2 `/showcase` route can come down during Day 5 once the referral surface is up.
