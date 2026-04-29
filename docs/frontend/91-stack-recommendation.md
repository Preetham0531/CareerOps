# 91 — Stack Recommendation

> Concrete tech picks for the frontend build. Each pick justified.

---

## Top-line stack

- **Next.js 14 (App Router)** — React framework, SSR/streaming, Server Components, Edge runtime
- **TypeScript (strict)** — no any allowed; runtime validation via Zod
- **Turborepo monorepo** — web + extension + shared packages
- **Tailwind CSS** — design tokens via CSS variables + Tailwind config
- **Radix UI** primitives — unstyled, accessible base
- **shadcn/ui** patterns — copy-paste components on top of Radix, fully customizable
- **Framer Motion** — animations
- **GSAP + ScrollTrigger** — scroll-driven (marketing only)
- **TanStack Query** — server state
- **Zustand** (with `persist`) — client state
- **TanStack Virtual** — list virtualization
- **react-flow** — referral / evidence graphs
- **@nivo/sankey, @nivo/treemap** — specific viz
- **recharts** — line / bar charts
- **cmdk** — command palette + combobox
- **vaul** — bottom sheet (mobile)
- **Sonner** — toasts
- **react-hook-form + Zod** — forms + validation
- **next-intl** — i18n
- **next/font** — self-hosted Google fonts at build time
- **Sentry** — error monitoring
- **PostHog** — product analytics (self-hostable, DPDP-friendlier)

---

## Monorepo layout

```
careerops-frontend/
├── apps/
│   ├── web/              Next.js 14 app
│   ├── extension/        Browser extension (Chrome MV3 + Firefox MV2)
│   └── docs/             Storybook + design system playground
├── packages/
│   ├── ui/               primitives + composites (cross-app reuse)
│   ├── tokens/           design tokens (TS exports, JSON, CSS vars)
│   ├── icons/            Lucide re-exports + custom India icons
│   ├── api-client/       typed API client (TanStack Query hooks)
│   ├── i18n/             translation strings
│   └── config/           shared eslint, tsconfig, tailwind base
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

Package manager: **pnpm** (faster than npm/yarn, monorepo-native).

---

## Why these picks

### Next.js 14 (App Router)
- Server Components reduce JS shipped to client (key for floor-device perf)
- Streaming SSR gives fast TTFB even on slow servers
- Edge runtime for low-latency to India users
- Mature ecosystem, easy hiring later
- View Transitions API support in experimental flag

Alternative considered: **Remix** — also great, but App Router's adoption + streaming maturity nudged us here.

### TypeScript strict
- Non-negotiable. Every prop, hook, store typed.
- Zod for runtime validation at API boundaries.
- `noUncheckedIndexedAccess: true` to catch array-access bugs.

### Turborepo + pnpm
- Monorepo necessary because we have web + extension + shared packages
- pnpm: 3× faster install than npm, better disk usage on shared packages
- Turbo: incremental builds, remote cache, parallelization

### Tailwind + tokens
- Tokens live in `packages/tokens/` and emit:
  - TypeScript constants (for JS access, e.g., Framer Motion easing values)
  - JSON (for design tools, third-party imports)
  - CSS variables (for runtime theme switching)
- Tailwind config consumes the CSS variable layer
- Example:

```ts
// packages/tokens/src/colors.ts
export const colors = {
  teal: { 50: '#EAFBFA', /* ... */ 950: '#07201F' },
  gold: { 50: '#FFF8E8', /* ... */ 950: '#261C04' },
  // ...
};
```

### Radix UI + shadcn-style copy-paste
- Radix gives a11y + behavior; we own styling
- shadcn approach (copy components into your repo) avoids version-lock and lets us customize aggressively
- Stored in `packages/ui/` as the source of truth

### Framer Motion (not React Spring)
- Better integration with Next.js + Server Components
- AnimatePresence for exit animations
- Layout animations
- React Spring is also good but Motion's API matches our spec patterns more naturally

### GSAP only for scroll-driven on marketing
- Imported lazily in `/marketing/*` routes
- Adds ~30 KB but only on those routes
- Product chrome stays Framer Motion only

### TanStack Query (not SWR)
- Better mutation handling
- Optimistic updates
- Infinite query for discovery feed
- Offline support via `persistQueryClient`

### Zustand (not Redux, not Jotai, not Recoil)
- Simplest API
- Perfect for client-only state (filters, drafts, stealth toggle, theme)
- `persist` middleware for cross-session state
- Server state stays in TanStack Query, not duplicated

### react-flow for graphs
- Best React-native graph library
- Customizable nodes / edges (we'll subclass for palette compliance)
- Built-in zoom, pan, accessibility
- Used in `23-referral-hijack.md` and `24-skill-claim-prover.md`

### Recharts + nivo split
- Recharts: bar, line, area — composable JSX, light
- @nivo: Sankey, treemap — better for those specific viz

### cmdk
- Best command palette / combobox library for React
- Used in `10-components-primitives.md` Combobox + global ⌘K
- Themed to teal/gold

### vaul for bottom sheet
- Best React bottom sheet (mobile)
- Snap points + drag gestures correct
- Used in `34-mobile-responsive.md`

### Sonner for toasts
- Best toast library
- Themed to our palette
- Action toasts (with undo button) work as designed

### next-intl over react-intl
- Native App Router integration
- Server Components compatible
- Smaller bundle

### next/font (self-hosted Google fonts)
- Build-time font fingerprinting
- No runtime Google Fonts calls (DPDP, perf)
- Auto-subset Latin; manual subset Indic

### Sentry for errors
- Standard
- Source maps via Sentry CLI
- Frontend + extension + service worker covered

### PostHog for analytics
- Self-hostable (DPDP comfort)
- Feature flags + experiments built in
- Session replay (with sensitive-field masking)
- Per-event consent — surfaces granular toggle in DPDP center

---

## Folder conventions inside `apps/web/`

```
apps/web/
├── app/                    Next.js App Router
│   ├── (marketing)/        marketing routes (separate layout)
│   ├── (app)/              product routes (Shell A/B/C/D)
│   │   ├── dashboard/
│   │   ├── discover/
│   │   ├── referrers/
│   │   ├── evidence/
│   │   ├── salary/
│   │   ├── interviews/
│   │   ├── negotiations/
│   │   ├── dna/
│   │   ├── cohorts/
│   │   ├── settings/
│   │   └── layout.tsx
│   ├── api/                route handlers (proxy to backend)
│   ├── layout.tsx
│   └── globals.css
├── components/             page-specific components (not reusable enough for /packages/ui)
├── features/               domain-grouped logic (referral, salary, etc.)
│   └── referral/
│       ├── hooks/
│       ├── store.ts
│       ├── api.ts
│       └── components/
├── lib/                    utilities
├── public/
└── styles/
```

`features/<domain>/` is the canonical place for domain logic — keeps related pieces co-located.

---

## State management map

| State | Tool |
|---|---|
| Server data (jobs, network, salary) | TanStack Query |
| Filter values, drafts, theme | Zustand (persisted) |
| Form state | react-hook-form |
| URL state (filters, modals) | nuqs (typed search params) |
| Animation state | Framer Motion (component-local) |
| Realtime (referrer reply, offer received) | TanStack Query + WebSocket subscription bridge |

---

## Performance targets enforced in CI

- Lighthouse: 90+ on Performance, 100 on a11y, 95+ on best-practices
- Bundle size: dashboard route < 180 KB initial JS
- Real-device tests: Redmi A4 mocked profile, 60fps on key flows

---

## Testing

- **Unit**: Vitest for logic
- **Component**: Vitest + React Testing Library
- **Visual regression**: Storybook + Chromatic
- **e2e**: Playwright (key flows: onboarding, discovery, referral DM, apply)
- **a11y**: axe-core via Playwright + Storybook addon
- **Performance**: Lighthouse CI

---

## Deployment

- **Frontend**: Vercel (Next.js native; edge optimal in Mumbai/Bangalore regions)
- **Storybook**: Chromatic
- **Extension**: GitHub Releases + Chrome Web Store / Edge Add-ons / Firefox AMO
- **Status page**: Statuspage.io or self-hosted

---

## Environment variables

- `NEXT_PUBLIC_API_URL` — backend
- `NEXT_PUBLIC_SENTRY_DSN`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_RAZORPAY_KEY` — checkout
- `LINKEDIN_CLIENT_ID/SECRET` — OAuth (server-side)
- `GITHUB_CLIENT_ID/SECRET` — OAuth
- `OPENAI_API_KEY` — LLM (server-side; never client)
- `ELEVENLABS_API_KEY` — TTS (server-side)
- `WHATSAPP_BUSINESS_TOKEN` — recruiter mode (when ready)

`.env.example` checked in; secrets via Vercel env / GitHub Actions secrets.

---

## What we're NOT using

- Material UI / Chakra / Ant Design — visual identity wrong
- Bootstrap — too dated
- Emotion / Styled Components — Tailwind handles 95%; CSS modules for the rest
- Redux Toolkit — overkill for our scope
- date-fns — `Intl.DateTimeFormat` + `Temporal` (when ready)
- moment.js — never
- jQuery — obviously
- create-react-app — deprecated
- Webpack config — Next.js handles
- styled-jsx — use Tailwind
- Pure D3 (where react-flow / nivo cover us) — keeps bundle small

---

## Future considerations (v0.2+)

- **Server Actions** for mutations (already used moderately)
- **PPR (Partial Prerendering)** when stable
- **React Compiler** when stable
- **Remix-style nested routing** if Next.js supports natively
- **WebGPU shaders** for marketing — only if perf wins
- **Native mobile apps** (Expo + React Native) once PWA usage validated
- **WebRTC** for cohort live mock GD

---

## Cross-doc links

- Build sequence: `90-component-build-order.md`
- Research / inspiration: `92-research-sources.md`
- All design constraints: `00-overview.md` through `14-accessibility.md`
