# Day 3 — Setup notes

> Append this content to `SETUP.md` after merging Day 3 work.
> Continues the pattern from Day 2 (`.day3` suffix files swap into place).

## Files to swap

```bash
cd ~/Downloads/Desktop/CareerOps-India

# Root package.json — adds Playwright, e2e + msw:init scripts
mv package.json.day3 package.json

# apps/web package.json — adds @careerops/api-client (workspace),
# @tanstack/react-query, msw, @faker-js/faker
mv apps/web/package.json.day3 apps/web/package.json

# Re-install
pnpm install

# Generate the MSW service worker stub into apps/web/public/
pnpm msw:init

# Build tokens (still needed)
pnpm tokens:build
```

## Run

```bash
# Dev (mocks active because NEXT_PUBLIC_MOCKS=true is the default)
pnpm dev
# Visit http://localhost:3000
```

Walk: hero → "Start your search" → `/start/auth` → "Continue with LinkedIn" (OAuth stub) → persona → resume (try Skip) → filters → network → preferences → "Take me in" → `/dashboard`.

## What ships in Day 3

### New workspace package
- **`@careerops/api-client`** — typed TanStack Query hooks
  - `useDashboard()`, `useSendOtp()`, `useVerifyOtp()`, `useParseResume()`, `useSaveOnboardingStep()`
  - Zod schemas for request/response shapes
  - `apiFetch()` thin wrapper + `ApiError` class

### Mock backend
- **`apps/web/mocks/handlers.ts`** — MSW handlers for `/api/auth/otp/{send,verify}`,
  `/api/onboarding/parse-resume`, `/api/onboarding/step/:n`, `/api/dashboard`,
  `/api/discover` + a catch-all stub.
- **`apps/web/mocks/factories.ts`** — faker-seeded factories: `makeJob`, `makeJobs`,
  `makeDashboard`, `makeParsedResume`. Same Indian metro / company / bond /
  bench distribution we'll see in production data.
- **`apps/web/mocks/init.ts`** — registers the worker behind `NEXT_PUBLIC_MOCKS=true`.

### State stores
- **`apps/web/lib/auth.ts`** — `useAuth` Zustand store with `persist` (localStorage).
- **`apps/web/features/onboarding/{store.ts,types.ts}`** — `useOnboarding` with persona,
  urgency, priority, resume, filters, connections, preferences slices and a `reset()`.
  Tests cover step transitions, completion tracking, connection toggles, and
  `deriveFilterDefaults()` smart-default seeding.

### Providers + auth gate
- **`apps/web/components/Providers.tsx`** — wraps QueryClientProvider + TooltipProvider + Toaster
  and waits for MSW to register before rendering. Mounted inside `(app)` and `/start` layouts.
- **`apps/web/components/RequireAuth.tsx`** — client-side redirect to `/start/auth` for
  unauth users.

### App shell
- **TopBar** (sticky 56px) — brand, ⌘K trigger w/ `Kbd` indicator, stealth chip,
  notifications bell, UserMenu (avatar popover with sign-out).
- **SideNav** (240/64 collapsible, persisted via Zustand) — 10 nav items.
- **MobileTabBar** — 5 tabs, hides-on-scroll-down, safe-area-inset aware.
- **UserMenu** — Popover with name/phone/email + Settings + Sign-out.
- **Layout shells** A / B / C / D in `components/shells/`.

### Command palette
- **`CommandPalette.tsx`** — global ⌘K (Mac) / Ctrl+K (Win/Linux). Uses Day-2 `Combobox`
  primitives. Sections: Pages + Actions. Default actions: theme toggle, stealth, settings,
  sign-out.

### Onboarding
6 step routes under `/start/*`, each with `RequireAuth` gate (except `/start/auth` itself):

| Step | Route | What |
|---|---|---|
| 1 | `/start/auth` | Phone OTP (in dev, code is `123456`) + LinkedIn/Google/GitHub stubs |
| 2 | `/start/persona` | 3-question form (persona / urgency / priority) |
| 3 | `/start/resume` | Drop-zone → MSW parse-resume → editable parsed preview |
| 4 | `/start/filters` | Roles chips + cities multi-checkbox + LPA dual-thumb slider + work-mode chips |
| 5 | `/start/network` | LinkedIn (required) + Naukri/GitHub/LeetCode/Kaggle (optional) |
| 6 | `/start/preferences` | Stealth + email digest + WhatsApp + push + voice toggles |

Step state persists to localStorage so refresh resumes mid-flow.

### Dashboard placeholder
- **`(app)/dashboard/page.tsx`** — aurora-gradient hero with greeting + DNA insight quote,
  proves auth + Providers + TanStack Query + MSW are talking. Day 4 wires the bento.

### Stub routes
- `/discover`, `/inbox`, `/settings` — placeholders so SideNav links don't 404.

### Tests
- **Vitest**: store reducers + smart-default helper.
- **Playwright e2e**: `playwright/e2e/onboarding.spec.ts` runs the full happy path
  (step 0 → step 6 → dashboard) plus a ⌘K palette open check.
- **`playwright.config.ts`** at repo root configures auto-start of `pnpm dev` w/
  `NEXT_PUBLIC_MOCKS=true`.

## Verifying Day 3 done

```bash
pnpm install                                      # picks up @tanstack/react-query, msw, faker, playwright
pnpm msw:init                                     # writes apps/web/public/mockServiceWorker.js
pnpm tokens:build
pnpm --filter @careerops/web test                 # store + hook tests
pnpm --filter @careerops/web typecheck
pnpm dev                                           # walk the flow manually
pnpm e2e                                           # automated walk
```

- [ ] Land on `/` (Day-1 hero) → click CTA → `/start/auth`
- [ ] OTP flow works with `123456` in dev
- [ ] OAuth-stub buttons sign in instantly and route to `/start/persona`
- [ ] Skip a step → next step renders without error; refresh resumes at last visited step
- [ ] Final "Take me in" → `/dashboard` renders greeting + DNA quote (data from MSW)
- [ ] ⌘K palette opens, search finds "Toggle theme", action runs, palette closes
- [ ] SideNav collapse persists across reload
- [ ] Mobile bottom-tab-bar hides on scroll-down, returns on scroll-up
- [ ] Sign-out from UserMenu returns to `/`
- [ ] `pnpm e2e` passes
- [ ] `pnpm test` all green

## Hand-off to Day 4

`docs/frontend/build-plan/day-4.md` — the real Dashboard bento (surgical picks rotating tile,
3 stat tiles with sparklines, referrer paths waiting, application timeline, company-health
shifts, DNA insight) + Discovery (filter rail, virtualized JobCard list, preview pane,
URL filter state) + Apply tier-1/2/3 flow with optimistic update + 8s undo toast.

The Day-2 `/showcase` route can be removed during Day 4 once Discovery goes in.
