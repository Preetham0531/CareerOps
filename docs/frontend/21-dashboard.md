# 21 — Dashboard

## Purpose
The home screen. Aggregates everything the user needs to know *today* into a single bento grid. The product's calm-precision voice is most visible here — most products' dashboards are noisy; ours whispers.

## Personas served
All four. The bento layout adapts based on persona:
- **Employed-quiet (Priya, Karan)** → emphasizes Stealth state, surgical picks, referral paths waiting
- **Active (Ravi mid-career)** → emphasizes new matches, application timeline, follow-ups due
- **Fresher (Ravi grad)** → emphasizes campus drives, prep progress, peer cohort activity
- **Returner (Anjali)** → emphasizes women's networks, returnship roles, skill-bridge suggestions

## Entry points
- Default landing after auth/onboarding
- Logo click from anywhere
- ⌘K → "Home"

## Key screens

### Default desktop layout (≥1024px)

```
┌─────────────────────────────────────────────────────────────────────┐
│ TOPBAR: [Logo]  [⌘K search]                    [👤 Aman]  [🔔 3]   │
├──────┬──────────────────────────────────────────────────────────────┤
│      │ Good evening, Aman.                                          │
│ NAV  │ 5 strong matches today, 2 referrers waiting on you.          │
│      │                                                              │
│ 🏠   │ ┌──────────────────────────────┬──────────────────────────┐ │
│ 🔍   │ │                              │ STAT: callback rate       │ │
│ ⭐   │ │  TODAY'S SURGICAL PICKS     │ 18% ▁▃▅▇   +4pp          │ │
│ 📋   │ │  (3 cards rotating in)      ├──────────────────────────┤ │
│ ✉️   │ │                              │ STAT: applications        │ │
│ 📅   │ │  [Job 1: Razorpay BE]       │ 12 this week              │ │
│ 💼   │ │  ★ 87% match · referral     ├──────────────────────────┤ │
│      │ │                              │ STAT: interviews          │ │
│ ⚙️   │ │  [Job 2: Cred] [Job 3: Pho] │ 2 booked · next Tue        │ │
│      │ ├──────────────────────────────┴──────────────────────────┤ │
│ 🛡️   │ │                                                          │ │
│      │ │  REFERRER PATHS WAITING (3)                              │ │
│      │ │  Each: avatar + company + score + [Message]              │ │
│      │ │                                                          │ │
│      │ ├─────────────────────────────┬───────────────────────────┤ │
│      │ │ APPLICATION TIMELINE        │ COMPANY HEALTH SHIFTS     │ │
│      │ │ (last 14 days, sparkline)   │ (companies you saved)     │ │
│      │ │                              │ Razorpay: ✓ stable         │ │
│      │ │                              │ Cred: ▲ improving           │ │
│      │ ├─────────────────────────────┴───────────────────────────┤ │
│      │ │                                                          │ │
│      │ │  APPLICATION DNA INSIGHT                                 │ │
│      │ │  "Your Tuesday morning applies get 2× the response."     │ │
│      │ │  [See full analysis ›]                                  │ │
│      │ │                                                          │ │
│      │ └──────────────────────────────────────────────────────────┘ │
└──────┴──────────────────────────────────────────────────────────────┘
```

### Tile breakdown

#### 1. Greeting band (full-width, top)
```
┌────────────────────────────────────────────────────────────┐
│ Good evening, Aman.                                         │
│ 5 strong matches today, 2 referrers waiting on you.         │
└────────────────────────────────────────────────────────────┘
```

- Aurora gradient as background (subtle, see `02-color-system.md`)
- Time-aware greeting: morning / afternoon / evening / late
- Body copy summarizes today's most important pieces of info, derived from current state
- No cute illustrations — just type

#### 2. Today's Surgical Picks (primary tile, 2:1 aspect)
- Rotating carousel of 3 best matches today
- Each is a JobCard in `expanded` density
- Hero 3D tilt on hover (only on this tile)
- Auto-rotates every 6s; pauses on hover; respects reduced-motion
- Manual nav: dots below + arrow keys when focused

#### 3. Stat tiles (3 stacked, right column)
- Callback rate (last 30d) with sparkline + delta chip
- Applications this week (Geist 700 32px)
- Upcoming interviews count + soonest

Each tile:
- Click → drills into App DNA (`30-application-dna.md`) with that metric pre-selected
- Sparkline on the callback rate uses teal-500 stroke
- Delta chip: gold for positive, gold-700 for negative

#### 4. Referrer paths waiting (composite tile, mid)
For each waiting path:
```
┌─────────────────────────────────────────────────┐
│ [👤] Priya Krishnan                              │
│      Engineering Manager · Razorpay              │
│      Mutual: Aman (IIT batchmate)                │
│      Match score: 0.87  · Active on LinkedIn 2d  │
│      [Compose DM ›]                              │
└─────────────────────────────────────────────────┘
```

#### 5. Application timeline (sparkline-bar tile)
- Horizontal bar chart, last 14 days
- Bars colored by stage: applied (teal-300), interviewed (teal-500), offered (gold-400)
- Hover bar → tooltip with details

#### 6. Company health shifts
- List of companies user has saved/applied to
- Each row: name + sentiment indicator (▲ improving / ✓ stable / ▽ declining)
- Click → `26-bond-bench-detector.md` company drawer

#### 7. Application DNA insight (bottom, full-width)
- One key insight surfaced as a pull quote
- Fraunces 500 / 20–24px
- Subtle gold underline
- Click → opens App DNA module

### Mobile layout (<768px)

Bento collapses to single-column stack, primary tile first:

```
┌──────────────────────┐
│ Good evening, Aman.  │
│ 5 strong matches.    │
├──────────────────────┤
│ [Surgical pick #1]   │
│   swipe for more →   │
├──────────────────────┤
│ Stat: callback 18%   │
│ Stat: applies 12     │
│ Stat: interviews 2   │
├──────────────────────┤
│ Referrers waiting (3)│
├──────────────────────┤
│ Timeline             │
├──────────────────────┤
│ Health shifts        │
├──────────────────────┤
│ DNA insight          │
└──────────────────────┘

[Bottom tab bar: Home / Search / ⭐ / Inbox / Profile]
```

Cards swipe horizontally for the surgical picks; everything else stacks vertically.

## State diagram

```
[loading: skeleton bento]
  ↓ data resolves
[default state]
  ↓ user interacts
[card hover/click → drawer or navigate]
  ↓
[empty path: no data] → onboarding nudge
[error] → ErrorBoundary card per tile, others remain functional
```

## Data model (frontend slice)

```ts
interface DashboardState {
  greeting: { user: string; timeOfDay: 'morning' | 'afternoon' | 'evening' | 'late'; summary: string };
  surgicalPicks: Job[];
  stats: {
    callbackRate: { value: number; delta: number; sparkline: number[] };
    appsThisWeek: { count: number; trend: 'up' | 'down' | 'flat' };
    upcomingInterviews: { count: number; nextAt: Date | null };
  };
  referrerPaths: ReferrerSummary[];
  timeline: { date: Date; stage: ApplicationStage; jobId: string }[];
  companyHealth: { company: string; trend: HealthTrend; saved: boolean; applied: boolean }[];
  dnaInsight: { quote: string; explainerLink: string };
}
```

Fetched via TanStack Query, single endpoint `GET /api/dashboard` returns all sections. Each section can be revalidated independently via TanStack's invalidation.

## Interactions & micro-animations

- **Mount**: aurora gradient drift starts (60s loop), greeting fade-in 200ms, tiles stagger in (30ms each, max 100ms total)
- **Surgical pick rotation**: View Transitions API on swap; gentle slide + crossfade
- **Stat tile hover**: subtle 1px lift + sparkline endpoint dot pulses
- **Referrer path hover**: row bg shifts to `--bg-raised`, "Compose DM" button gains gold glow
- **DNA insight**: appears with kinetic type — Fraunces axis morph from 400 to 500 over 600ms on first paint
- **Refresh**: pull-to-refresh on mobile, ⌘R or "Refresh" in ⌘K on desktop

## Empty / loading / error states

- **Loading**: full bento skeleton (preserves layout). Each tile renders its own skeleton.
- **Brand-new user (no data yet)**: replaces bento with welcome card + "We're searching your network now" + spinner.
- **Per-tile error**: ErrorBoundary card with retry. Other tiles unaffected.
- **No matches today**: "No strong matches today. We're widening the net." — link to filters.
- **No referrers yet**: "No referrer paths yet. Connect more accounts or wait — paths appear as your network grows."

## Edge cases & India-specific gotchas

- **Festival / holiday awareness** — banner: "Diwali week — Indian hiring slow. We'll surface remote/global roles meanwhile." Auto-detects from holiday calendar.
- **Salary-data confidentiality** — stats never show absolute LPA in greeting line ("you've earned ₹32L this year") — only counts.
- **Stealth mode active** — greeting band adds small `🛡️ Stealth on` badge; mute notifications visually.
- **Slow connection** — server-rendered shell loads immediately; data hydrates progressively.

## Density mode

Compact mode (per `04-spacing-grid-layout.md`):
- Bento gaps reduced from 24 → 16
- Stat tiles' value font 32 → 28
- Surgical pick auto-rotation pauses (user is power-using)

## Cross-doc links

- Tile components: `11-components-composite.md`
- Aurora gradient: `02-color-system.md`, `07-trending-design-tactics.md`
- Application DNA insights: `30-application-dna.md`
- Surgical pick → discovery: `22-job-discovery.md`
- Referrer composer: `23-referral-hijack.md`
- Company health detail: `26-bond-bench-detector.md`

## Open questions

1. Bento layout order — should referrer paths sit above or below stat column? Hypothesis: referrers are higher-leverage, surface above. A/B test post-launch.
2. Auto-rotate carousels: anti-pattern in some heuristics. Keep at 6s with hover pause; remove if data shows users miss content.
3. DNA insight tile only appears after 30+ applications. What does the dashboard show before that? — Surface a "App DNA learning... 12/30 applications" progress chip instead, with a teaser of what's coming.
