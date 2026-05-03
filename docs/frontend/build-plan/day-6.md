# Day 6 — Stealth, Interview Prep, Negotiation, Application DNA, Cohort

> **Goal**: ship the workflow modules that wrap around discovery + apply — Stealth posture, Interview Time Machine, Negotiation Co-Pilot, Application DNA analytics, and Cohort Mode.
>
> **Why this day matters**: these turn the product from "find jobs" into "land jobs." Each is a meaningful surface; together they're the differentiation moat.

---

## Prerequisites

- Days 1–5 complete
- DMComposer (Day 5) reusable
- Charts library (`packages/ui/src/charts`) populated
- Drawer + Dialog patterns stable

---

## Hour-by-hour

### Block 1 (1.5h) — Stealth Mode (`/settings/stealth` + global chip)

Per `27-stealth-mode.md`.

#### `StealthPanel`
- Big toggle at top with state badge
- "What your current employer sees" preview pane (mocked image of LinkedIn search result)
- Stealth rules checklist (8 toggles)
- Off-hours window time picker (start/end)
- Current employer + blocked-companies list
- Stealth activity log (last 30d events)
- "Anomaly check" verdict line

#### Global integration
- `StealthChip` in TopBar visible when enabled (Day 3 stub → real wiring today)
- Quick-hide hotkey ⌘Shift+H — `apps/web/lib/stealth-hotkey.ts`
- "Boss screen" overlay component (full-screen blur with benign cover)
- Pseudonym CV variant generation — UI only today (dropdown shows "Pseudonym variant" alongside named variants)

#### Cross-feature behavior
- Stealth on → Discovery hides current-employer listings (filter applied automatically)
- Stealth on → Send queue scheduled for off-hours window only
- Stealth on → Notifications muted during work hours

### Block 2 (2h) — Interview Time Machine (`/interviews`)

Per `28-interview-time-machine.md`. Shell B with side rail.

#### `InterviewsList` (`/interviews`)
- List of upcoming + past interviews
- Each row: company, role, date, status
- Click → opens prep view

#### `PrepView` (`/interviews/[interviewId]`)
- Top tabs: Questions / Interviewer / Mock / Notes
- Side rail: rounds checklist (DSA / Sys Design / Behavioral / Domain) with progress

#### `QuestionsBoard` (Kanban)
- Columns: Not started / Practiced / Mastered
- Cards with: question text, likelihood dots, source tag, difficulty
- Drag between columns (Framer Motion drag + drop zones)
- Filter by likelihood + difficulty + round

#### `InterviewerOnePager`
- Avatar 96px, name, role
- Tenure, tech focus, inferred style
- Recent content list
- Topics they care about (chips)
- Mutual ties
- Free-text prep notes editor

#### `MockSession` (stub for voice)
- Audio waveform (placeholder animation; real audio Day 7)
- Transcript area
- Stop / submit / feedback flow
- Code editor inline (Monaco) for DSA mock

#### `Notes` tab
- Markdown editor (use [@uiw/react-md-editor](https://uiwjs.github.io/react-md-editor/))
- Auto-save to Zustand persisted

### Block 3 (1.5h) — Negotiation Co-Pilot (`/negotiations`)

Per `29-negotiation-copilot.md`. Shell C (wizard).

#### Wizard structure
5 steps:
1. **Capture** — paste offer letter, AI parses, user confirms
2. **Targets** — sliders for base/variable, ESOP/joining/clauses checkboxes
3. **Draft** — 3 tone tabs, AI body via DMComposer (reused from Day 5)
4. **Role-play** — voice/text mock with "recruiter" AI
5. **Send** — channel picker, schedule, send

#### Shared rail (right side, 40%)
- `MarketAnchorRail` — viz of user's offer vs P10/P50/P90
- `ConfidenceIndicator`
- `PeerComps` short list

#### `ClauseChecklist` (in Step 2)
- Indian-specific levers (joining bonus, ESOP cliff, notice buyout, WFH days, re-eval, sign-on stock refresh, dependents)
- Each clause has tooltip with explanation + typical value range

#### `CounterOfferComposer` (Step 3)
- Reuses DMComposer
- Pre-filled body referencing market anchors
- Tone variants

#### `RolePlayVoice` (Step 4) — stub today, real Day 7
- Transcript + waveform placeholder
- Triggers UI flow but uses MSW for STT/TTS responses

### Block 4 (1.5h) — Application DNA (`/dna`)

Per `30-application-dna.md`. Shell A with bento layout.

#### Bento tiles
1. **`KeyInsight`** — Fraunces 500 / 20px pull-quote, gold-bordered card, "Use as default" CTA
2. **`StatTrio`** — Callback / Interview / Offer rates with sparklines (reuses Day 4 components)
3. **`TimeOfDayHeatmap`** — GitHub-contribution-style grid, hover → tooltip
4. **`CVVariantPerformance`** — horizontal bars
5. **`CoverLetterAngle`** — horizontal bars
6. **`Funnel`** — Sankey-like 4-stage flow
7. **`CompanySectorPerformance`** — horizontal bars with sample size

#### Data
Single `useDNA(window)` query — `window` toggleable (30/90/180/all days).

#### Empty state
- < 30 applies → "DNA is learning. We'll surface your first insight at 30 applies (12/30 so far)"
- 30+ but no significant patterns → "Try a tone or CV variant we haven't seen"

#### Insight surfacing logic
- Insights ranked by effect size × confidence × actionability × recency
- Top → KeyInsight tile
- Others → "More insights" link → modal list

### Block 5 (1.5h) — Cohort Mode (`/cohorts`)

Per `31-cohort-mode.md`. Shell A with cohort sidebar.

#### Sidebar
- List of cohorts
- "+ New" button at bottom

#### Cohort detail (`/cohorts/[cohortId]`)
Tabs: Activity / Shared jobs / Peer review / Research

#### `ActivityFeed`
- Time-ordered event list (member shared a job, member reviewed CV, member sent applies)
- Updates via subscription (MSW stubbed; real WS Day 7+)

#### `MembersPanel`
- AvatarStack + member list
- Each member: name, role, accountability score (X / weekly target)
- "Invite" button

#### `SharedJobs`
- Feed of jobs shared by members
- Each card: who shared, "relevant for: [members]" chips, comments
- "Save to mine" + "Open" actions

#### `PeerReview`
- List of CV variants submitted for review
- Each: submitter, variant name, # reviews, avg star rating
- Click → review screen with inline-diff (gold-100 highlights)
- Star rating per section

#### `ResearchBoard`
- Cards per topic: owner, last updated, notes preview
- "+ Claim a research topic"

#### Privacy / consent flows
- Per-cohort sharing toggles (filters? CV? application history? salary numbers?)
- "Freeze sharing" one-click for paranoid moments

### Block 6 (1h) — Notifications + Real-time

Per `21-dashboard.md` + `36-settings-billing.md` (notifications section).

#### `NotificationCenter` (drawer from TopBar bell)
- Notifications grouped by date
- Per type: referral_reply / interview_scheduled / offer_received / match_found / digest_summary / system
- Each: avatar/icon, message, timestamp, action
- "Mark all read"

#### Real-time subscription
- WebSocket bridge to TanStack Query (MSW stubs the WS)
- Auto-invalidate relevant queries on incoming event

#### Earned moment animations
- Offer received → `OfferTrophy` Lottie + 12 gold confetti particles + scale-up card per `06-motion-system.md` earned-moment pattern
- Once. Never repeats unless re-triggered.

### Block 7 (0.5h) — Tests + visual sweep

- Playwright: `stealth.spec.ts` — toggle on, verify chip + filter behavior
- Playwright: `interview.spec.ts` — open prep, drag a question, save notes
- Playwright: `negotiation.spec.ts` — full 5-step wizard
- Playwright: `dna.spec.ts` — load with mock data, verify all tiles
- Playwright: `cohort.spec.ts` — open cohort, share a job, write a peer review
- Lighthouse on each route ≥ 85 mobile / ≥ 90 desktop
- Axe zero serious/critical

---

## Files created today

```
apps/web/
  ├── app/(app)/
  │   ├── settings/stealth/page.tsx
  │   ├── interviews/
  │   │   ├── page.tsx
  │   │   └── [interviewId]/page.tsx
  │   ├── negotiations/
  │   │   ├── page.tsx
  │   │   └── [negotiationId]/page.tsx
  │   ├── dna/page.tsx
  │   └── cohorts/
  │       ├── page.tsx
  │       └── [cohortId]/page.tsx
  ├── features/
  │   ├── stealth/
  │   │   ├── components/{Panel,EmployerPreview,RulesList,ActivityLog,BossScreen}.tsx
  │   │   ├── store.ts
  │   │   └── hotkey.ts
  │   ├── interview/
  │   │   ├── components/{InterviewsList,PrepView,QuestionsBoard,InterviewerOnePager,MockSession,NotesTab}.tsx
  │   │   ├── store.ts
  │   │   └── kanban-dnd.ts
  │   ├── negotiation/
  │   │   ├── components/{Wizard,CaptureStep,TargetsStep,DraftStep,RoleplayStep,SendStep,MarketAnchorRail,ClauseChecklist}.tsx
  │   │   └── store.ts
  │   ├── dna/
  │   │   ├── components/{KeyInsight,StatTrio,TimeOfDayHeatmap,CVVariantPerformance,CoverLetterAngle,Funnel,SectorPerformance}.tsx
  │   │   └── store.ts
  │   ├── cohort/
  │   │   ├── components/{Sidebar,ActivityFeed,MembersPanel,SharedJobs,PeerReview,ResearchBoard,InviteFlow}.tsx
  │   │   └── store.ts
  │   └── notifications/
  │       ├── components/{NotificationCenter,EarnedMoment,OfferTrophyLottie}.tsx
  │       └── store.ts
  └── packages/ui/src/charts/{Heatmap,SankeyFunnel}.tsx

playwright/e2e/
  ├── stealth.spec.ts
  ├── interview.spec.ts
  ├── negotiation.spec.ts
  ├── dna.spec.ts
  └── cohort.spec.ts
```

---

## Definition of done

- [ ] Stealth toggle on → TopBar chip appears, current-employer listings hide on Discovery, send queue defers to off-hours
- [ ] ⌘Shift+H toggles boss screen instantly
- [ ] Interview prep Kanban drag-drop works; questions board persists
- [ ] Interviewer one-pager renders with stub LinkedIn data
- [ ] Negotiation 5-step wizard end-to-end → final send queues counter-offer email
- [ ] Market anchor rail updates live as user adjusts targets
- [ ] DNA bento renders all tiles with realistic mock data
- [ ] Heatmap hover tooltips show per-cell stats
- [ ] Funnel viz shows 4-stage flow
- [ ] Cohort mode: sidebar lists cohorts; activity feed renders; peer review with inline-diff works
- [ ] Notification center opens from TopBar bell; new events animate in
- [ ] Earned-moment animation fires once on offer-received event
- [ ] All 5 Playwright e2e specs passing
- [ ] Lighthouse perf ≥ 85 mobile, ≥ 90 desktop on all new routes
- [ ] Axe zero serious/critical

---

## Common pitfalls

- **Stealth filter cascade**: ensure all queries observe stealth state — discovery, dashboard surgical picks, search results
- **Wizard state across navigation**: persist Negotiation wizard state; resuming mid-flow should not re-trigger AI draft
- **Heatmap cell calculation**: 7×24 = 168 cells; render via SVG, not 168 div nodes
- **Sankey funnel data shape**: pre-compute server-side; recharts/nivo will choke on dynamic recompute
- **Cohort real-time vs polling**: WS preferable but add fallback to polling every 30s
- **Notification animation conflicts**: when multiple notifications arrive in burst, debounce earned-moment animation to fire once per session
- **Boss screen visibility**: ensure it covers everything, including command palette + drawers
- **Markdown editor + sandboxing**: don't let user paste raw HTML; sanitize with DOMPurify

---

## Hand-off to Day 7

Tomorrow: Fresher Hub (campus drives + autofill vault + aptitude prep + mock GD), Voice interface (real audio engine), Settings + DPDP center, Browser extension scaffold, full mobile QA pass, and final ship-ready polish.
