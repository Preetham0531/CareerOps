# Setup — Day 1 build

This is the developer-onboarding companion to the spec docs in `docs/frontend/`. Day-by-day plan lives in `docs/frontend/build-plan/day-{1..7}.md`.

## Prerequisites

- Node 20 (`.nvmrc` pinned)
- pnpm 9 (`corepack enable && corepack prepare pnpm@9 --activate`)

## Install + run

```bash
# from repo root
pnpm install
pnpm tokens:build      # generates packages/tokens/dist/{tokens.css, tokens.json}
pnpm dev               # runs apps/web on :3000
```

You should see the Day-1 placeholder hero with:
- Aurora gradient background
- Theme toggle (top-right) — light / dark instant swap, no FOUC
- A swatch strip showing the brand, accent, success/warning/danger backgrounds wired

## Repo layout

```
careerops/
├── apps/
│   └── web/                    Next.js 14 App Router (port 3000)
├── packages/
│   ├── tokens/                 design tokens (TS + CSS variables + JSON)
│   └── ui/                     primitives (Button, Input, Tooltip, Tabs, Select, MoneyInput…)
├── docs/                       product + frontend specs
│   └── frontend/
│       ├── 00-overview.md … 37-resume-tailor.md
│       └── build-plan/day-{1..7}.md
├── turbo.json
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

## Common commands

```bash
pnpm dev                       # all dev servers
pnpm build                     # all builds
pnpm lint                      # all lint
pnpm typecheck                 # all typecheck
pnpm test                      # all tests
pnpm tokens:build              # rebuild design tokens
pnpm --filter @careerops/web dev   # only the Next.js app
pnpm --filter @careerops/ui test   # only UI primitives' tests
```

## Verifying Day 1 done

- [ ] `pnpm install` succeeds
- [ ] `pnpm tokens:build` writes `packages/tokens/dist/{tokens.css, tokens.json}`
- [ ] `pnpm dev` opens `apps/web` at `http://localhost:3000` showing the hero
- [ ] Theme toggle flips light/dark with no flash
- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm build` all green
- [ ] CI passes on PR

## What's done in Day 1

- Monorepo (Turborepo + pnpm workspaces)
- Next.js 14 App Router app with self-hosted Fraunces / Geist / JetBrains Mono / Noto Sans Devanagari/Tamil/Telugu
- Design tokens package emitting CSS variables, JSON, and TypeScript exports
- Tailwind config consuming tokens (build-time scales + runtime CSS variables for theming)
- Light/dark theme with no-FOUC inline bootstrap script
- Reduced-motion CSS guard
- Indic-aware line-height
- Skeleton shimmer + aurora-bg + dot-grid utilities
- UI primitives wave 1: Button (6 variants × 5 sizes), IconButton, Input, MoneyInput (Indian comma + LPA shorthand), Tooltip (Radix), Tabs (Radix, underline + pill), Select (Radix)
- ESLint with `jsx-a11y/recommended`
- Vitest + Testing Library wired
- GitHub Actions CI (lint, typecheck, test, build)

## What's next (Day 2)

See `docs/frontend/build-plan/day-2.md`. Adds remaining primitives (Dialog, Drawer, Popover, Toast, Combobox, Switch, Checkbox, Radio, Slider, Avatar, Badge, Chip, Progress, Skeleton) plus the high-leverage `JobCard` composite + custom India icons.
