# Day 5 — Referral Hijack, Skill Canvas, Salary Leak, Bond Detector

> **Goal**: ship the four signal-and-decision modules. Referral Hijack is the headline (#1 in features). Skill Canvas (#3), Salary Leak (#4), and Bond/Bench Detector (#5) round out the discovery-side intelligence.
>
> **Why this day matters**: this is where the product goes from "another job board" to "decision engine." The graph + DM composer must feel inevitable.

---

## Prerequisites

- Days 1–4 complete
- `JobCard`, preview pane, Apply flow stable
- MSW returning realistic graph + evidence + salary data
- `react-flow` installed (`packages/ui` or `apps/web` direct)

---

## Hour-by-hour

### Block 1 (3.5h) — Referral Hijack (`/referrers/[jobId]`)

Per `23-referral-hijack.md`. Shell B (focused canvas).

#### `ReferralPathGraph` (`features/referral/components/Graph.tsx`)
- `react-flow` based; custom nodes per palette
- Node types:
  - `YouNode` — gold ring, brand fill
  - `MutualNode` — neutral
  - `TargetNode` — accent (gold) when reachable
  - `UnreachableTargetNode` — muted dashed
- Edge styles: solid (1st-degree), dashed (inferred), thickness encodes strength
- Physics: `forceManyBody(-300)`, `forceLink(distance: 80)`, `forceCenter`; stop after 3s
- Pan/zoom via wheel + pinch
- Hover edge → tooltip with connection type
- Click 2nd-degree node → drawer
- Cap visible at 100 nodes; cluster overflow ("12 more at Razorpay")
- Accessibility: tab order = score order; aria-labels per node; "Skip graph, show as list" affordance

#### `ReferrerScorecard` (`features/referral/components/Scorecard.tsx`)
- Drawer (RightDrawer from Day 2)
- Avatar 64px, name, role, [LinkedIn] link
- 80px radial gauge for overall score
- 6 strength bars (school, prior co, mutual, activity, tenure, seniority) — each tappable for popover with calc method
- Path visualization (You → Aman → Priya)
- Recent activity list
- Mutual friends `AvatarStack`
- "Compose DM ›" CTA

#### `DMComposer` (`features/referral/components/DMComposer.tsx`)
Reusable component (will be reused in Day 6 Negotiation):
- Tone tabs: Warm / Direct / Executive
- Subject + body textarea
- AI typing effect on initial draft (stream tokens via SSE — MSW stubs the stream)
- Inline-diff highlights when user edits AI text (gold-100 bg)
- Personalization quality indicator (5 dots)
- Schedule: "Send now" / "Tomorrow 10am IST" / custom
- 5-second undo on send
- Save draft persists to Zustand

#### `SendQueue` (`features/referral/components/SendQueue.tsx`)
- List of sent + scheduled DMs
- Each: avatar, name, sent timestamp, reply status, engagement dots
- Auto-escalation prompt when no reply for 4d
- "Schedule cancel" up to T-30s

#### `TopReferrersRail` (right side rail in graph view)
- Scrollable list of top 10 referrers
- Each row: avatar, name, role, score, [Compose DM]
- Click row = same as click node

#### Mobile fallback
- Below 768px: graph hidden, list-only view of top referrers

### Block 2 (1.5h) — Skill Claim Canvas (`/evidence`)

Per `24-skill-claim-prover.md`. Shell B.

#### `EvidenceCanvas`
- `react-flow` again (similar setup to referral graph)
- Claim nodes (left, hexagonal, brand fill)
- Evidence nodes (right, circular, color by source type)
- Edges thickness = weight
- Force-directed layout

#### `ClaimsList` (right side rail)
- Each claim: text, strength dots
- Click claim → drawer

#### `ClaimDrawer`
- Strength dots + calculation breakdown
- Evidence list (cards per piece)
- "Add manual evidence" CTA

#### `AddEvidenceForm`
- Type selector (GitHub, LeetCode, Talk, Project, Cert)
- Title, description, URL, date
- "Supports which claims?" multi-chip
- "Verifiable by recruiter?" toggle

#### `ClaimVsJD` view
- Reusable component invoked from JobCard preview pane
- Side-by-side table: JD asks vs your evidence (strength dots)
- Cover-letter angle suggestion at bottom
- "Use this angle in CL" button feeds into apply flow

### Block 3 (1.5h) — Salary Leak (`/salary`)

Per `25-salary-leak.md`. Shell A.

#### `SalaryLeakPage`
Bento-ish layout:
- `TriangulationBubble` chart (top, full-width)
- `RangeBar` viz (showing P10/P50/P90 vs JD posted band)
- `ConfidenceIndicator`
- `ComponentsBreakdown` (base + variable + ESOP + joining bonus stacked bar)
- `PeerCompanies` list
- `SourceTransparency` accordion (per-source observations)

#### Charts (in `packages/ui/src/charts/`)
- `BubbleChart` (recharts ScatterChart customized)
- `RangeBar` (hand-rolled SVG, very simple)
- `ComponentsStack` (recharts stacked horizontal bar)
- All palette-strict (teal/gold)

#### Inline use
The compact range bar already lives in `JobCard`'s preview pane — verify it deep-links to `/salary?company=...&role=...`.

### Block 4 (1.5h) — Bond / Bench Detector

Per `26-bond-bench-detector.md`.

#### Already-deployed: `BondBadge` and `BenchBadge` chips on JobCard (Day 2)
Today: the drawer + the standalone hub.

#### `RedFlagDrawer` (`features/red-flags/components/Drawer.tsx`)
- Opens from JobCard preview pane "Red flags (N)" link
- Per flag:
  - Type icon (BondLink, BenchClock, etc.)
  - Severity chip (low/medium/high — gold ramp)
  - Sources list with excerpts + URLs
  - "Hide all jobs with <flag>" toggle

#### `RedFlagsHub` (`/red-flags`)
- Standalone route: list of all flagged listings user interacted with
- Filterable by flag type + severity
- Bulk actions: hide all, batch-flag-companies

#### Override controls (in Settings — placeholder, real on Day 7)
- Hide flag type globally
- Whitelist companies
- Adjust severity thresholds

### Block 5 (1h) — Inbox / Threads

Now that DMs exist, build a real `/inbox`:
- List of message threads (referrer DMs sent + replies)
- Click thread → opens conversation view
- Reply pattern reuses DMComposer
- Notification badge on top-bar bell when unread

### Block 6 (1h) — Tests + visual sweep

- Playwright e2e: `referral.spec.ts` — open job, view referrers, compose DM, schedule send
- Playwright e2e: `evidence.spec.ts` — view canvas, click claim, add manual evidence
- Playwright e2e: `salary.spec.ts` — view triangulation, toggle source weights
- Storybook stories for graphs in various data-density states
- Performance profiling: graphs must render at 60fps with 100 nodes on the floor device — if not, drop physics simulation iterations
- Axe sweep — graph accessibility is tricky; verify "Skip graph" affordance works

---

## Files created today

```
apps/web/
  ├── app/(app)/
  │   ├── referrers/
  │   │   ├── page.tsx                (list of opportunities with paths)
  │   │   └── [jobId]/page.tsx        (Shell B graph view)
  │   ├── evidence/page.tsx           (Shell B canvas)
  │   ├── salary/
  │   │   ├── page.tsx
  │   │   └── [company]/[role]/page.tsx
  │   ├── red-flags/page.tsx
  │   └── inbox/
  │       ├── page.tsx
  │       └── [threadId]/page.tsx
  ├── features/
  │   ├── referral/
  │   │   ├── components/{Graph,Scorecard,DMComposer,SendQueue,TopReferrersRail,MobileList}.tsx
  │   │   ├── nodes/{YouNode,MutualNode,TargetNode,UnreachableNode}.tsx
  │   │   ├── store.ts
  │   │   └── ai.ts                   (DM draft via /api/llm — MSW stub)
  │   ├── evidence/
  │   │   ├── components/{Canvas,ClaimsList,ClaimDrawer,AddEvidenceForm,ClaimVsJD}.tsx
  │   │   ├── nodes/{ClaimNode,EvidenceNode}.tsx
  │   │   └── store.ts
  │   ├── salary/
  │   │   ├── components/{TriangulationBubble,RangeBar,ComponentsStack,PeerCompanies,SourceTransparency}.tsx
  │   │   └── store.ts
  │   ├── red-flags/
  │   │   ├── components/{Drawer,Hub}.tsx
  │   │   └── store.ts
  │   └── inbox/
  │       ├── components/{ThreadList,ThreadView,ReplyComposer}.tsx
  │       └── store.ts
  └── packages/ui/src/charts/{BubbleChart,RangeBar,ComponentsStack,RadialGauge}.tsx

playwright/e2e/
  ├── referral.spec.ts
  ├── evidence.spec.ts
  └── salary.spec.ts
```

---

## Definition of done

- [ ] Click JobCard "View referrers" → graph renders with realistic 30-node mock data
- [ ] Click 2nd-degree node → scorecard drawer shows breakdown
- [ ] Click "Compose DM" → AI draft streams in with typing effect
- [ ] Tone tab swap regenerates body, preserves user edits
- [ ] Schedule send queues DM; confirmation toast with 5s undo
- [ ] Send queue shows status (sent/replied/scheduled)
- [ ] Evidence canvas renders with claims + evidence + edges
- [ ] Add manual evidence flow works end-to-end
- [ ] Salary leak shows triangulation chart, range bar, source list
- [ ] Toggle source weight off → range recalculates locally
- [ ] Bond/bench drawer opens from JobCard preview, shows sources
- [ ] Inbox lists DM threads, opens conversation view
- [ ] Mobile fallbacks (graph → list) verified
- [ ] All 3 e2e specs passing
- [ ] Graph 60fps with 100 nodes on Redmi A4 (or equivalent throttled profile)
- [ ] Axe zero serious/critical
- [ ] Bundle size: graph routes < 250 KB initial (react-flow is heavy; lazy-load it)

---

## Common pitfalls

- **react-flow performance**: bundle is ~80 KB; lazy-load via dynamic import; render skeleton while loading
- **Force simulation jank on first paint**: stabilize before render — pre-calculate layout once, then attach to react-flow
- **Custom node forwardRef**: react-flow's node renderer requires forwardRef pattern; don't break memo
- **AI typing effect with React 18 Suspense**: streams must update via `useTransition` to avoid blocking the main thread
- **Inline-diff library noise**: react-diff-viewer needs careful styling; consider hand-rolling a simple word-diff for our needs
- **Bubble chart at low data density**: confidence ellipse fails when n=1; show a different empty state
- **Drawer + graph z-index**: drawer must layer above react-flow's controls
- **Stale "schedule send" timer**: ensure the cancellation window respects server time, not client clock

---

## Hand-off to Day 6

Tomorrow: stealth posture (panel + employer-visibility check), interview prep (Kanban + interviewer one-pager + voice mock stub), negotiation co-pilot (5-step wizard reusing DMComposer), Application DNA (insights + heatmap + funnel), and Cohort mode. DMComposer from today gets reused heavily in Negotiation.
