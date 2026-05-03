# Day 5 — Setup notes

> Append to `SETUP.md` after merging Day 5. Continues the `.day5` swap pattern.

## Files to swap

```bash
cd ~/Downloads/Desktop/CareerOps-India

# API client (superset of Day 4)
mv packages/api-client/src/schema.day5.ts          packages/api-client/src/schema.ts
mv packages/api-client/src/hooks.day5.ts           packages/api-client/src/hooks.ts

# MSW (superset)
mv apps/web/mocks/factories.day5.ts                apps/web/mocks/factories.ts
mv apps/web/mocks/handlers.day5.ts                 apps/web/mocks/handlers.ts

# App routes / package.json
mv apps/web/package.json.day5                                       apps/web/package.json
mv "apps/web/app/(app)/referrers/page.tsx.day5"                     "apps/web/app/(app)/referrers/page.tsx"
mv "apps/web/app/(app)/evidence/page.tsx.day5"                      "apps/web/app/(app)/evidence/page.tsx"
mv "apps/web/app/(app)/inbox/page.tsx.day5"                         "apps/web/app/(app)/inbox/page.tsx"

pnpm install                                  # picks up @xyflow/react
pnpm tokens:build
pnpm dev                                      # http://localhost:3000
```

Walk: dashboard → click any "Compose DM" on a referrer path → opens `/referrers/r1` → graph + rail load → pick a target → scorecard drawer → Compose → AI typing reveals → switch tone → schedule send → toast confirms. Visit `/evidence`, `/salary`, `/red-flags`, `/inbox`, `/inbox/th-1`.

## What ships in Day 5

### `@careerops/api-client` extensions
- Full `ReferrersResponse` (graph nodes + edges + topReferrers)
- `ReferrerScorecard` (avatars + breakdown bars + path label + recent activity + mutuals)
- `DraftDmRequest/Response` + `SendDmRequest/Response` + `SendQueueItem[]`
- `EvidenceResponse` (claims + evidence)
- `SalaryIntelResponse` (range, postedBand, observations, components, peers, sources)
- `RedFlagsForJobResponse` (per-job red-flag list with multi-source evidence)
- `Thread`, `Message`, `ThreadDetail`
- Hooks: `useReferrers`, `useReferrer`, `useDraftDm`, `useSendDm`, `useSendQueue`, `useEvidence`, `useSalaryIntel`, `useRedFlagsForJob`, `useThreads`, `useThread`

### MSW expansion
- `makeReferrersGraph` — 1 you + 5 mutuals + 12 reachable + 6 unreachable, with edges
- `makeReferrerScorecard`, `makeDmDraft` (3 tones), `makeSendQueue` (replied / no-reply / scheduled)
- `makeEvidenceData`, `makeSalaryIntel`, `makeRedFlagsForJob`, `makeThreads`, `makeThreadDetail`
- 11 new handlers: `/api/referrers/:jobId`, `/api/referrer/:id`, `/api/dm/{draft,send,queue}`, `/api/evidence`, `/api/salary`, `/api/red-flags/:jobId`, `/api/inbox/threads(/:id)`

### Referral Hijack (the headline feature)
- **`ReferralGraph`** — `@xyflow/react` with custom palette-strict nodes:
  - YouNode (brand fill + gold ring)
  - MutualNode (neutral)
  - TargetReachableNode (gold fill + brand ring + score below)
  - TargetUnreachableNode (dashed border + muted fill)
  - Edges: thickness ∝ strength, dashed for inferred ties
- **`TopReferrersRail`** — sortable list, ranked by score
- **`ReferrerScorecard`** — drawer with radial score gauge + 6 strength bars + path + recent activity + mutuals
- **`DMComposer`** — tone tabs (Warm / Direct / Executive), AI-typing reveal at ~30 chars/sec, edit inline, personalization-quality dots, schedule-tomorrow-10am button, send-now with 5s undo
- **`SendQueueDrawer`** — list of sent / scheduled / no-reply DMs with engagement dots, follow-up + auto-escalation actions

Routes:
- `/referrers` — list of opportunities with paths
- `/referrers/[jobId]` — Shell B (focused canvas) graph view

### Skill Claim Canvas
- **`ClaimRow`** — strength dots + category + evidence count
- **`ClaimDrawer`** — strength label + linked evidence cards
- **`EvidenceCard`** — type icon + title + metrics + external link
- Filters: All / Strong / Medium / Weak

Route: `/evidence`

### Salary Leak
- **`RangeBar`** — P10/P50/P90 + JD posted band overlay, palette-strict
- **`TriangulationBubble`** — hand-rolled SVG bubble chart (date × LPA, weighted), source-coloured per palette
- **`ComponentsStack`** — base / variable / joining stacked horizontal bar + ESOP cliff/vest details
- **`PeerComparison`** — peer-company range bars with focal highlight
- Source transparency table at bottom

Route: `/salary`

### Bond / Bench Detector
- **`RedFlagDrawer`** — severity-coloured per palette (gold scale, no red), per-flag evidence list with source + weight + URL
- **`/red-flags` hub** — list of flagged jobs in user's history

### Inbox
- **`/inbox`** — thread list with unread dots
- **`/inbox/[threadId]`** — chat-style message view with reply composer

### Tests
- `playwright/e2e/referral.spec.ts` — graph loads, compose DM opens, AI body populates, tone switch works; inbox list + thread detail.

### What was deferred to Day 5b
- ClaimVsJD comparison view (the cover-letter-angle picker fed from JD parse)
- AddEvidenceForm modal (manual evidence entry)
- Mobile graph→list fallback (graph is usable on tablet; mobile users land on TopReferrersRail directly)

## Verifying Day 5 done

- [ ] `/referrers/r1` renders the graph with you / mutuals / target-reachable / target-unreachable nodes
- [ ] Edges render with thickness encoding strength; dashed edges for inferred ties
- [ ] Top referrers rail lists 8 referrers ranked by score
- [ ] Click a target node → scorecard drawer with score gauge + 6 breakdown bars
- [ ] "Compose DM" opens the composer with tone tabs
- [ ] AI typing effect reveals the body at readable pace (~30 chars/sec)
- [ ] Tone switch regenerates the body
- [ ] Send queue drawer lists replied + no-reply + scheduled DMs with engagement dots
- [ ] `/evidence` lists claims with strength dots; click opens drawer with linked evidence cards
- [ ] `/salary` shows range bar + bubble chart + components stack + peer comparison + source table
- [ ] `/red-flags` lists flagged jobs; drawer shows per-flag evidence with sources
- [ ] `/inbox` lists threads; `/inbox/th-1` shows message bubbles + reply composer
- [ ] `pnpm e2e` referral spec passes
- [ ] `pnpm typecheck` clean

## Hand-off to Day 6

`docs/frontend/build-plan/day-6.md` — Stealth panel + employer visibility check, Interview Time Machine (Kanban + interviewer one-pager + voice mock stub), Negotiation co-pilot wizard (reuses DMComposer), Application DNA analytics, Cohort mode.

The Day-2 `/showcase` route can come down during Day 6.
