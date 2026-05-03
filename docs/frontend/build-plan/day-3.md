# Day 3 — App Shell, Navigation, Command Palette, Onboarding

> **Goal**: a real, navigable app. Top bar, side nav, mobile bottom tabs, ⌘K command palette, all four layout shells (A/B/C/D), and a complete 6-step onboarding flow that lands the user on a placeholder dashboard.
>
> **Why this day matters**: this is the first day a non-developer can actually walk through the product. Every later day's work plugs into this shell.

---

## Prerequisites

- Days 1–2 complete
- `JobCard`, all primitives, all icons green in Storybook
- Mock backend stubs ready (or Mock Service Worker — MSW — set up to fake them)
- Auth provider chosen (we'll stub OAuth on Day 3, real on Day 6+)

---

## Hour-by-hour

### Block 1 (1.5h) — Mock backend infra

Set up [MSW](https://mswjs.io) (Mock Service Worker) so every API call has a deterministic stub:

- `apps/web/mocks/handlers.ts` — REST + WS handler list
- Handlers per route: `/api/auth/otp/{send,verify}`, `/api/onboarding`, `/api/dashboard`, `/api/discover`, `/api/referrers`, `/api/evidence`, `/api/salary-intel`, etc.
- Realistic data factories using [`@faker-js/faker`](https://fakerjs.dev) seeded for stable shots
- Toggle env: `NEXT_PUBLIC_MOCKS=true` flips MSW on (dev), off (prod)

Create `packages/api-client/`:
- Typed client per endpoint with Zod validation
- TanStack Query hooks (`useDashboard()`, `useDiscover()`, `useReferrers()`, etc.)
- Query keys conventions

### Block 2 (2h) — App shell + layout shells (A/B/C/D)

In `apps/web/app/(app)/layout.tsx`:

#### `TopBar` (56px sticky)
- Brand mark left
- ⌘K search trigger center
- User avatar + notification bell right
- Stealth chip when `stealth.enabled`
- Mobile: condensed to brand + menu hamburger + bell

#### `SideNav` (240px expanded / 64px collapsed)
- Items: Home, Discover, Referrers, Evidence, Salary intel, Interviews, Negotiations, DNA, Cohorts, Settings
- Collapse toggle persists in Zustand
- Active route highlighting (subtle teal-50 bg in light, teal-800 in dark)
- Mobile: slides in from left as drawer

#### `MobileTabBar` (bottom)
- 5 tabs max: Home, Discover, Referrers, Inbox, You
- Hides on scroll-down, reappears on scroll-up
- Safe-area-inset-bottom respected

#### Layout shells
Implement as React components in `apps/web/components/shells/`:
- `ShellA` — TopBar + SideNav + main (default)
- `ShellB` — TopBar minimal + full-bleed canvas (for graphs)
- `ShellC` — Step header + 60/40 wizard split
- `ShellD` — Mobile-stacked + bottom tab bar

Each route picks its shell via Next.js segment config or composition.

### Block 3 (1h) — Command palette (⌘K)

Reusing Day 2's `Combobox` patterns, build the global palette:

- `apps/web/components/CommandPalette.tsx` mounted at root layout
- ⌘K (Mac) / Ctrl+K (Win/Linux) toggles
- Sections: Recent, Jobs, Companies, Actions, Settings, Pages
- Fuzzy match across sections via Fuse.js
- Default actions:
  - "New job filter"
  - "Toggle stealth mode"
  - "Toggle theme"
  - "Open settings"
  - "Sign out"
  - "Submit feedback"
- Glassmorphism panel (backdrop-blur 20px + `--bg-overlay`)
- Close on Esc / route change

### Block 4 (3h) — Onboarding (6-step wizard)

Per `20-onboarding-flow.md`. Route: `/start` outside the `(app)` group with its own layout (no nav distractions).

#### Step 0 — Marketing hero (`/`)
- Aurora gradient hero per `02-color-system.md`
- Kinetic-type heading (Fraunces wght 400 → 700 morph on mount)
- Magnetic primary CTA "Start your search ›"
- Secondary "Watch 90s demo" link
- Bento feature spotlights below the fold (4 tiles)
- Marquee logo strip (placeholder for now)

#### Step 1 — Auth (`/start/auth`)
- Phone OTP primary, email OTP secondary, OAuth tertiary
- Phone input → 60s OTP screen
- LinkedIn / Google / GitHub buttons (stubbed; click logs auth-success after 800ms)
- DPDP-aligned consent line + "Read it" → opens Day 7's settings drawer (placeholder OK now)

#### Step 2 — Persona (`/start/persona`)
- 3-question card: "Where are you in your search?", "Urgency?", "Top priority?"
- Radio groups with descriptive options per spec
- Skip link visible

#### Step 3 — Resume (`/start/resume`)
- Drag-drop zone
- States: idle / drag-over / uploading / parsing / parsed / error
- Client-side parse stub (returns deterministic mock CV after 2s) — real parser Day 6+
- Parsed-preview screen with editable fields
- "Hide from your CV?" stealth toggle for current employer

#### Step 4 — Filters (`/start/filters`)
- Roles multi-chip combobox
- LPA dual-thumb slider
- Cities multi-checkbox with tier badges
- Work mode toggle group
- Notice period selectors
- Smart defaults from parsed CV

#### Step 5 — Network (`/start/network`)
- LinkedIn primary OAuth button
- Optional: Naukri, GitHub, LeetCode, Kaggle
- Each shows `EvidenceLeaf` icon spawn animation on connect (stub — 1s timer)
- DPDP details link

#### Step 6 — Preferences (`/start/preferences`)
- Stealth toggle (on by default if persona = "currently employed")
- Notification channel + timing
- Voice opt-in
- "Take me in ›" → routes to `/dashboard` (placeholder)

#### Wizard infra
- `OnboardingProvider` (Zustand store with `persist` middleware)
- Progress bar component (6 dots + connectors, current dot pulses gold)
- Page transitions: View Transitions API + Framer Motion fallback
- Back / forward keyboard navigation respected

### Block 5 (1h) — Theme persistence + auth state

- `useTheme()` hook reading cookie + system preference
- Inline `<script>` in `<head>` to apply theme before hydration (no FOUC)
- Auth Zustand store (stubbed): `useAuth()`
- Protected-route HOC / middleware: redirect to `/start/auth` if not authed
- Sign-out clears Zustand + cookie + redirects to `/`

### Block 6 (1h) — Placeholder dashboard route

- `apps/web/app/(app)/dashboard/page.tsx` rendering ShellA
- Placeholder: "Welcome, <name>" + "Day 4 will populate this"
- Verify all routing works end-to-end: `/` → auth → onboarding → dashboard

### Block 7 (0.5h) — Tests + screenshots

- Playwright e2e: `onboarding.spec.ts` runs the full 6-step happy path
- Storybook stories for `TopBar`, `SideNav`, `MobileTabBar`, `CommandPalette`, each onboarding step
- Lighthouse run on `/` (marketing) — must score 90+ perf

---

## Files created today

```
apps/web/
  ├── mocks/
  │   ├── handlers.ts
  │   ├── factories.ts
  │   └── browser.ts
  ├── app/
  │   ├── (app)/
  │   │   ├── layout.tsx                  (ShellA)
  │   │   └── dashboard/page.tsx          (placeholder)
  │   ├── (focus)/
  │   │   └── layout.tsx                  (ShellB)
  │   ├── (wizard)/
  │   │   └── layout.tsx                  (ShellC)
  │   ├── start/
  │   │   ├── page.tsx                    (Step 0 hero)
  │   │   ├── auth/page.tsx
  │   │   ├── persona/page.tsx
  │   │   ├── resume/page.tsx
  │   │   ├── filters/page.tsx
  │   │   ├── network/page.tsx
  │   │   └── preferences/page.tsx
  │   └── (marketing)/
  │       └── layout.tsx
  ├── components/
  │   ├── shells/{ShellA,ShellB,ShellC,ShellD}.tsx
  │   ├── nav/{TopBar,SideNav,MobileTabBar,UserMenu,NotificationBell,StealthChip}.tsx
  │   ├── CommandPalette.tsx
  │   └── onboarding/{OnboardingProvider,StepProgress,ResumeDropzone}.tsx
  ├── features/
  │   └── onboarding/{store.ts,api.ts,types.ts}
  └── lib/{theme.ts,auth.ts,routing.ts}

packages/api-client/src/
  ├── client.ts
  ├── hooks/{useDashboard,useDiscover,useReferrers,...}.ts
  └── schema/{*.ts}                        (Zod)

playwright/
  └── e2e/onboarding.spec.ts
```

---

## Definition of done

- [ ] Land on `/` → progress through all 6 onboarding steps → arrive at `/dashboard`
- [ ] Theme toggle works on every screen, persists across reload
- [ ] ⌘K opens palette from any route
- [ ] Side nav collapses + remembers state
- [ ] Mobile bottom-tab-bar swaps in below 768px
- [ ] All onboarding state persists (refresh mid-flow → resume at last step)
- [ ] Skip-step works on every step
- [ ] Resume parser stub returns valid CV in < 2.5s
- [ ] Playwright e2e onboarding flow passes headless
- [ ] Lighthouse `/` scores ≥ 90 perf, 100 a11y
- [ ] Mobile responsive verified at 375 / 414 / 768 / 1024 / 1440
- [ ] Reduced-motion: all View Transitions degrade to crossfades

---

## Common pitfalls

- **MSW + TanStack Query cache collision**: ensure mocks are deterministic per query key
- **View Transitions on Safari**: feature-detect, fall back to AnimatePresence
- **Zustand persist hydration**: SSR mismatch — gate the store hydration in a `useEffect`
- **Command palette stale state**: wrap fuzzy matcher in `useMemo`
- **OAuth stub**: don't accidentally redirect to a real LinkedIn OAuth URL — env-flag check
- **Step skips marked completed**: ensure `completed[step]: false` on skip, true only on full submission
- **Aurora gradient on hero performance**: reduce stops; pre-compute as a single radial-gradient + drift the angle, not the stops

---

## Hand-off to Day 4

Tomorrow: real Dashboard (bento grid with surgical picks tile, stat tiles, referrer paths waiting, DNA insight) + Discovery list with full filter rail. Both surfaces consume `JobCard` heavily — make sure today's MSW factories are producing realistic JobCard data.
