# 90 — Component Build Order (2-Week Frontend Scaffold with Claude)

> Practical week-by-week sequence for *implementing* the frontend after these docs are signed off. Optimized for parallelizable Claude-assisted development.

---

## Assumptions

- 2 weeks of focused work with Claude as pair-programmer
- One human reviewer (you)
- All foundation docs (00–14) approved
- Module docs (20–36) reviewed and ranked by priority
- Stack picks from `91-stack-recommendation.md` accepted
- Backend stub APIs available (mocked or real)

---

## Day 0 — Setup (Sunday before Week 1)

- Initialize Next.js 14 monorepo with Turborepo (web + extension + shared packages)
- Configure TypeScript strict, ESLint, Prettier
- Add Tailwind + custom theme tokens from `02-color-system.md`
- Set up `next/font` for Geist + Fraunces + JetBrains Mono + Noto Sans Devanagari/Tamil/Telugu
- Storybook with a11y addon
- Playwright + Vitest config
- CI: GitHub Actions for lint, typecheck, test, build, lighthouse, axe
- Sentry init (errors)
- PostHog init (analytics, opt-in)

**Deliverable**: green CI pipeline, blank app shell renders, dark mode working.

---

## Week 1 — Foundations + Primitives

### Day 1 — Design tokens + Tailwind config
- All color tokens (`02-color-system.md`)
- Spacing tokens (`04-spacing-grid-layout.md`)
- Type scale tokens (`03-typography.md`)
- Motion tokens (easings, durations, springs from `06-motion-system.md`)
- Container query helpers
- Dark mode + light mode CSS-variable setup

**Verify**: Storybook shows token swatches, theme toggle works.

### Day 2 — Primitives part 1: Button, Input, Select, Tooltip, Tabs
- All variants × sizes × states
- Radix wrappers
- Storybook stories with all states + dark mode + reduced-motion
- Visual regression baseline

### Day 3 — Primitives part 2: Dialog, Drawer, Popover, Toast, Combobox
- Dialog + Drawer (Radix)
- Toast via Sonner, themed
- Combobox via cmdk
- Popover with footnote pattern (CitationFootnote)

### Day 4 — Primitives part 3: Switch, Checkbox, Radio, Slider, Avatar, Badge, Chip, Progress, Skeleton
- All forms primitives
- AvatarStack
- Skeleton with shimmer
- Linear + circular progress

### Day 5 — Composites: JobCard, GhostScoreMeter, BondBadge, MoneyRange
- The high-value JobCard (per `11-components-composite.md`)
- All sub-components used inside JobCard
- Container-query-based density
- Storybook with all states + density modes

### Weekend — Catch-up + polish
- Visual regression sweep
- Dark mode parity audit
- Reduced-motion verification
- Mobile breakpoint check (Chrome DevTools + 1 real Android)
- Lint/type/test all clean

---

## Week 2 — Module shells + happy paths

### Day 6 — App shell + nav + ⌘K palette
- TopBar
- Side nav (with collapse)
- Mobile bottom tab bar
- Command palette via cmdk (with default actions)
- View Transitions API setup
- Layout shells A/B/C/D (per `04-spacing-grid-layout.md`)

### Day 7 — Onboarding flow (`20-onboarding-flow.md`)
- 6-step wizard
- Resume parser (client-side rough + server enrichment stub)
- Filter setup with sliders
- LinkedIn / GitHub OAuth stub buttons
- Stealth toggle + preferences

### Day 8 — Discovery (`22-job-discovery.md`)
- Filter rail with all controls
- TanStack Virtual list of JobCards
- Preview pane (desktop) + route push (mobile)
- Active-filter chip row
- Mock API returning JobCard data

### Day 9 — Dashboard (`21-dashboard.md`)
- Bento layout
- Greeting band with aurora gradient
- Stat tiles with sparklines + delta chips
- Surgical picks rotating tile (3D tilt + auto-rotate)
- Referrer paths waiting tile
- DNA insight tile

### Day 10 — Referral hijack (`23-referral-hijack.md`) + DM composer
- ReactFlow graph with palette + physics tuning
- Side rail with top referrers
- Scorecard drawer
- DMComposer (with AI typing effect — stub LLM)
- Send queue + scheduled-send
- Mobile fallback list view

### Day 11 — Skill claim canvas (`24-skill-claim-prover.md`) + salary leak (`25-salary-leak.md`)
- Evidence force-graph
- Claim drawer with strength bars
- Triangulation chart (bubble) + range bar
- Components breakdown bar
- Source weights toggleable

### Day 12 — Bond detector (`26-bond-bench-detector.md`) + Stealth panel (`27-stealth-mode.md`)
- Red-flag chips on JobCard
- Drawer with sources
- Stealth panel with rules + visibility preview
- Quick-hide hotkey (⌘Shift+H)
- Audit log table

### Day 13 — Interview prep (`28-interview-time-machine.md`) + negotiation (`29-negotiation-copilot.md`) shells
- Question Kanban
- Interviewer one-pager
- Voice mock stub (placeholder waveform)
- Negotiation 5-step wizard
- Counter-offer composer (reuses DMComposer)

### Day 14 — App DNA (`30-application-dna.md`) + Cohort (`31-cohort-mode.md`) + Settings (`36-settings-billing.md`)
- Bento analytics
- Heatmap calendar
- Funnel viz
- Cohort sidebar + tabs
- Settings full structure with DPDP center

### Weekend — Hardening
- Mobile end-to-end pass
- Performance budget verification (Lighthouse)
- A11y axe sweep
- Sentry hooks tested
- Real device QA (one Android, one iPhone)
- Screen reader sweep (NVDA + VoiceOver)
- Reduced-motion sweep

---

## Beyond Week 2 (if extending)

- Browser extension (`32-browser-extension.md`) — separate sub-week
- Fresher mode (`33-fresher-mode.md`) — separate sub-week
- Voice interface (`35-voice-interface.md`) — separate sub-week (audio engine integration heavy)
- Marketing surface — separate sprint
- Real backend integration (replacing mocks)

---

## Per-day rhythm

For each day:

**Morning (3h)**:
- Review Claude's previous-day work
- Pair-program key components
- Storybook stories + tests as we go

**Afternoon (3h)**:
- Claude implements remaining components per spec
- Solo review of generated code
- Manual QA on Storybook

**End of day (1h)**:
- Visual regression diff review
- CI status check
- Plan next day

---

## Definition-of-done per day

Each day's components ship with:
- ✅ All variants × states in Storybook
- ✅ Unit tests covering core behavior
- ✅ Reduced-motion variant tested
- ✅ Dark mode + light mode parity verified
- ✅ Mobile breakpoint render verified
- ✅ Axe a11y check passing
- ✅ Code reviewed by human
- ✅ Merged to `main` via PR
- ✅ Storybook deployed (Chromatic / Vercel)

Skipping any of these blocks the next day.

---

## Risk register

| Risk | Mitigation |
|---|---|
| Spec ambiguity slowing impl | Spec docs reviewed pre-Week 1; ambiguities resolved before code |
| Claude over-generates | Strict per-component scope; each session has 1–3 file scope |
| Visual regression noise | Snapshot only after design + a11y signoff |
| Animation perf on floor device | Real-device testing nightly, not just emulated |
| OAuth flows blocking | Stubbed in Week 1; replaced when backend ready |
| Component sprawl | Composites limited to documented set in `11-components-composite.md`; new ones require doc update |

---

## Daily standup format

End-of-day notes per repo, in `.notes/YYYY-MM-DD.md`:
- What shipped
- What's blocked
- Tomorrow's first task
- Any spec changes needed

---

## Tooling per day

- **Storybook**: every component, every state
- **Chromatic**: visual regression
- **Playwright**: e2e on key flows (onboarding, discovery, apply)
- **Vitest**: unit tests
- **Lighthouse CI**: perf budgets
- **axe-core**: a11y
- **Bundle Analyzer**: weekly bundle size review
- **Sentry**: errors from local dev shipped

---

## What this plan does NOT cover

- Marketing pages (separate sprint after MVP)
- Real backend wiring (depends on backend readiness)
- Mobile native apps (PWA only in MVP)
- Voice production (audio engine separate sub-sprint)
- Browser extension production (separate sub-sprint)
- Localization beyond English + Hindi shell strings

---

## Cross-doc links

- Foundation docs: `00-overview.md` through `07-trending-design-tactics.md`
- Component library: `10-components-primitives.md`, `11-components-composite.md`
- Stack & tooling: `91-stack-recommendation.md`
- Research sources: `92-research-sources.md`
