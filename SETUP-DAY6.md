# Day 6 — Setup notes

> Append to `SETUP.md`. Continues the `.day6` swap pattern.

## Files to swap

```bash
cd ~/Downloads/Desktop/CareerOps-India

# API client (superset)
mv packages/api-client/src/schema.day6.ts        packages/api-client/src/schema.ts
mv packages/api-client/src/hooks.day6.ts         packages/api-client/src/hooks.ts

# MSW (superset)
mv apps/web/mocks/factories.day6.ts              apps/web/mocks/factories.ts
mv apps/web/mocks/handlers.day6.ts               apps/web/mocks/handlers.ts

# TopBar (wires real stealth chip + notification center)
mv apps/web/components/nav/TopBar.tsx.day6       apps/web/components/nav/TopBar.tsx

# (app) layout (mounts StealthHotkeyProvider)
mv "apps/web/app/(app)/layout.tsx.day6"          "apps/web/app/(app)/layout.tsx"

pnpm install
pnpm tokens:build
pnpm dev
```

No new external deps in Day 6 — every component uses the existing primitives.

## What ships in Day 6

### API + MSW
- **Stealth**: `useStealth` / `useUpdateStealth`, mock endpoint patches in-memory rules
- **Interview**: `useInterviews`, `useInterview(id)`, `useUpdateQuestionStatus`
- **Negotiation**: `useNegotiations`, `useNegotiation(id)`
- **DNA**: `useDNA(window)` returns insights + heatmap + funnel + sector/CV/letter performance
- **Cohort**: `useCohorts`, `useCohort(id)`
- **Notifications**: `useNotifications` (60s poll), `useMarkNotificationsRead`

### Stealth Mode (cross-cutting)
- `features/stealth/store.ts` — Zustand presence (mirrored from server) + boss-screen state
- `features/stealth/StealthHotkeyProvider.tsx` — global ⌘Shift+H listener + Esc-to-close
- `features/stealth/BossScreen.tsx` — full-screen neutral overlay
- Components: `RulesList`, `EmployerPreview` (verdict + visible vs hidden signals), `ActivityLog`
- **Page**: `/settings/stealth` — toggle, rules, employer preview, off-hours window, log

**TopBar.day6** wires the real stealth chip (clicks through to `/settings/stealth`) and the notification bell unread badge.

### Interview Time Machine
- **`QuestionsBoard`** — drag-and-drop Kanban (Not started / Practiced / Mastered) with HTML5 drag + tap-to-move buttons; difficulty + likelihood chips
- **`InterviewerOnePager`** — avatar, tenure, past, tech focus, inferred style, recent content, mutual ties
- **Mock tab** — surface only (Day 7 wires real audio)
- **Notes tab** — textarea (Day 7 swap to rich markdown)
- **Pages**: `/interviews` index + `/interviews/[id]` prep view with tabs

### Negotiation Co-Pilot
- **`MarketAnchorRail`** — P10/P50/P90 + current + target overlay, "above/below median" verdict
- **`ClauseChecklist`** — 9 India-specific levers (joining, ESOP cliff, notice buyout, variable→fixed, WFH, re-eval, stock refresh, dependents, relocation)
- **5-step wizard** at `/negotiations/[id]`: Capture → Targets (slider + clauses) → Draft (3 tones generate body) → Role-play (stub) → Send (8s undo on schedule)

### Application DNA
- **`KeyInsight`** — gold-bordered Fraunces pull-quote with confidence dots + effect size + sample n
- **`StatTile` × 3** (callback / interview / offer) — reuses Day 4 component
- **`Heatmap`** — 7×24 cells, single-hue teal sequential ramp
- **`Funnel`** — 4-stage stacked bars with next-stage rate labels
- **`RateBars`** — used 3× for CV variants / cover-letter angles / sector performance
- **Page**: `/dna` with 30/90/180-day window toggle

### Cohort Mode
- **Page**: `/cohorts` (index) + `/cohorts/[id]` (detail with 4 tabs)
- Tabs: Activity feed, Shared jobs, Peer review (CV variants with star ratings), Research board
- Members panel with weekly accountability bars + mentor badge

### Notifications + earned moment
- **`NotificationCenter`** — drawer from TopBar bell, kind-tinted icons, mark-all-read
- **`EarnedMoment`** — Framer Motion confetti + trophy scale-up (no Lottie this sprint)

### Cuts (deferred to Day 7 / sprint-2)
- Real-time WebSocket bridge — TanStack 60s polling stays
- Lottie offer celebrations — replaced with CSS confetti
- Rich markdown editor for interview notes — textarea
- Inline-diff peer review — basic side-by-side textareas

## Verifying Day 6 done

- [ ] TopBar shows stealth chip when enabled; click routes to `/settings/stealth`
- [ ] ⌘Shift+H toggles boss-screen overlay; Esc closes
- [ ] Stealth toggle off → preview verdict shifts to "leaks-detected"
- [ ] `/interviews` lists upcoming + past; `/interviews/iv-1` opens 4-tab prep
- [ ] Drag a question between Kanban columns — status persists via PATCH
- [ ] Negotiation `/negotiations/neg-1` runs 5-step wizard; tone changes regenerate the draft
- [ ] Market anchor rail updates when target slider moves
- [ ] Schedule send fires 8-second undo toast
- [ ] `/dna` heatmap shows 7×24 grid with sequential teal ramp; window toggle switches data
- [ ] Funnel + rate-bar tiles render correctly
- [ ] `/cohorts/coh-1` 4 tabs work; member accountability bars render; star ratings on reviews
- [ ] Notification bell shows unread dot when notifications list has unread items
- [ ] "Mark all read" clears unread state
- [ ] `pnpm typecheck` clean

## Hand-off to Day 7

`docs/frontend/build-plan/day-7.md` — Fresher hub (campus drives + autofill vault + mock GD + HR coaching), real voice engine (Whisper STT + ElevenLabs TTS), full Settings + DPDP center, browser extension scaffold, mobile QA pass, deploy.
