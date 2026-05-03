# Day 1 — Setup, Tokens, Foundations, Half the Primitives

> **Goal**: a green-CI Next.js 14 monorepo with all design tokens wired, dark/light theme working, and the first wave of primitives (Button, Input, Tooltip, Tabs, Select) shipping with full Storybook coverage.
>
> **Why this day matters most**: every later day depends on tokens + Button being correct. Get this right, the rest cascades. Get this wrong, every later day spends time fighting the foundation.

---

## Prerequisites

- Repo: `https://github.com/Preetham0531/CareerOps` cloned locally
- Node 20+ + pnpm 9+ installed
- Vercel account ready (deploy preview)
- Chromatic account ready (visual regression)
- All foundation docs (`00-overview.md` through `14-accessibility.md`) read

---

## Hour-by-hour

### Block 1 (1.5h) — Monorepo + Next.js

1. `pnpm init -w` at repo root → `pnpm-workspace.yaml`
2. Install Turborepo: `pnpm add -Dw turbo`
3. Create `apps/web/` with Next.js 14 App Router:
   ```
   pnpm create next-app@latest apps/web --ts --app --tailwind --eslint --src-dir=false --import-alias="@/*"
   ```
4. Create `apps/docs/` for Storybook (Next.js root identical setup, separate Storybook later)
5. Create `packages/`: `tokens/`, `ui/`, `icons/`, `config/`, `i18n/`, `api-client/` — each with `package.json`
6. Wire `turbo.json` with `build`, `dev`, `lint`, `test`, `typecheck` pipelines
7. Add root `.nvmrc` pinning Node 20

**Verify**: `pnpm install` clean, `pnpm dev` runs `apps/web` on `:3000`.

### Block 2 (2h) — Design tokens (`packages/tokens/`)

Create `packages/tokens/src/`:

- `colors.ts` — full teal + gold ramps from `02-color-system.md` plus neutral derived
- `semantic.ts` — semantic tokens (light + dark variants) per spec
- `spacing.ts` — `space-0` through `space-24` per `04-spacing-grid-layout.md`
- `typography.ts` — fluid clamp scale per `03-typography.md`
- `motion.ts` — easings, durations, springs per `06-motion-system.md`
- `radii.ts` — 0, 4, 6, 8, 12, 16, 999 (pill)
- `shadows.ts` — sm / md / lg / xl in dark + light variants
- `z-index.ts` — z-scale per `04-spacing-grid-layout.md`
- `breakpoints.ts` — 5 named breakpoints
- `index.ts` — re-exports

Generate three artifacts via build script:
- `dist/tokens.css` — CSS variables for `:root` + `[data-theme="dark"]`
- `dist/tokens.json` — JSON for design tools / third-party
- `dist/tokens.d.ts` + `dist/tokens.js` — TS exports

### Block 3 (1h) — Tailwind + global CSS

In `apps/web/`:
- `tailwind.config.ts` consumes `packages/tokens` via CSS variable references:
  ```ts
  colors: { brand: 'var(--brand)', accent: 'var(--accent)', /* ... */ }
  ```
- `app/globals.css` imports `@careerops/tokens/dist/tokens.css`
- Theme switching: `data-theme="dark"` on `<html>`, with cookie-persisted server-default + Zustand store on client
- Add `app/layout.tsx` with theme detection + `<html lang="en-IN">`

**Verify**: light / dark mode toggle works, every color in Storybook renders correctly.

### Block 4 (1h) — Fonts via `next/font`

`apps/web/app/fonts.ts`:
```ts
import { Geist, Fraunces, JetBrains_Mono } from 'next/font/google';
import { Noto_Sans_Devanagari, Noto_Sans_Tamil, Noto_Sans_Telugu } from 'next/font/google';
```

- Subset Latin for body/mono
- Subset to script's Unicode range for Indic
- `display: swap` for body/mono, `display: optional` for Fraunces
- Self-hosted via `next/font` (no runtime Google Fonts call — DPDP, perf)
- Wire CSS variables: `--font-display`, `--font-body`, `--font-mono`, `--font-hi`, `--font-ta`, `--font-te`

### Block 5 (1.5h) — CI + tooling

- `.github/workflows/ci.yml` running: lint, typecheck, build, vitest, playwright (smoke), lighthouse
- `eslint.config.mjs` with `eslint-plugin-jsx-a11y`
- `prettier.config.mjs` + `.prettierignore`
- Husky + lint-staged for pre-commit
- Vitest config (workspace-level)
- Storybook init in `apps/docs/`:
  ```
  cd apps/docs && pnpm dlx storybook@latest init
  ```
- Add `@storybook/addon-a11y`, `@storybook/addon-themes`, `@chromatic-com/storybook`
- Sentry init in `apps/web/sentry.{client,server,edge}.config.ts`

**Verify**: `pnpm lint && pnpm typecheck && pnpm build && pnpm test` all green.

### Block 6 (2h) — Primitives wave 1: `Button`, `Input`, `Tooltip`, `Tabs`, `Select`

In `packages/ui/src/`:

#### `Button`
- All 6 variants (primary, secondary, ghost, accent, danger, link) per `10-components-primitives.md`
- All 5 sizes (xs/sm/md/lg/xl)
- States: default, hover, press, focus-visible (gold ring), loading, disabled
- `leadingIcon`/`trailingIcon` slots
- `IconButton` variant (square, required `aria-label`)
- Props typed; forwardRef; `cn` utility merge

#### `Input`
- Variants (text, email, password, tel, search, number)
- Anatomy: label + input shell + helper/error
- States (default, focus, error, disabled, success)
- Trailing chip slot (for "LPA", "%")
- Clear button when value present
- Show/hide password toggle for `type="password"`
- `<MoneyInput>` wrapper with Indian-comma formatting + LPA shorthand parser

#### `Tooltip`
- Radix Tooltip wrapped
- 500ms delay, 0ms close
- Auto-collision-avoidance positioning
- Animations from `06-motion-system.md` Tooltip pattern

#### `Tabs`
- Two visual styles: underline (default), pill (dense)
- Active indicator slides via Framer Motion `layoutId`
- Radix Tabs primitives
- Keyboard nav

#### `Select`
- Radix Select wrapped
- Sizes match Button
- Custom-styled to palette

### Block 7 (1h) — Storybook + tests for wave 1

For each primitive:
- `<Component>.stories.tsx` covering: each variant, each size, each state, dark mode (via `addon-themes`), reduced-motion (via `forcedColors`)
- `<Component>.test.tsx` covering: rendering, interaction (Testing Library), keyboard, a11y (axe)
- Visual regression baseline pushed to Chromatic

---

## Files created today

```
.github/workflows/ci.yml
.nvmrc
turbo.json
pnpm-workspace.yaml
package.json (root)
apps/web/                                 (Next.js 14)
  ├── app/layout.tsx
  ├── app/page.tsx (placeholder hero)
  ├── app/fonts.ts
  ├── app/globals.css
  ├── tailwind.config.ts
  ├── postcss.config.mjs
  └── tsconfig.json
apps/docs/                                (Storybook)
  ├── .storybook/main.ts
  ├── .storybook/preview.tsx
  └── package.json
packages/tokens/
  ├── src/{colors,semantic,spacing,typography,motion,radii,shadows,z-index,breakpoints,index}.ts
  ├── build.ts                            (generates dist/*)
  └── package.json
packages/ui/
  ├── src/{Button,Input,Tooltip,Tabs,Select}/{index.tsx,*.stories.tsx,*.test.tsx}
  ├── src/utils/cn.ts
  └── package.json
packages/config/
  ├── eslint.base.cjs
  ├── tailwind.base.ts
  └── tsconfig.base.json
packages/icons/                           (placeholder; populated Day 2)
packages/api-client/                      (placeholder; populated Day 3)
packages/i18n/                            (placeholder; populated Day 3)
sentry.{client,server,edge}.config.ts
```

---

## Definition of done

- [ ] `pnpm install` clean from a fresh clone
- [ ] `pnpm dev` (web) shows a teal-on-near-black placeholder hero
- [ ] `pnpm dev` (docs) opens Storybook with the 5 primitives' stories
- [ ] `pnpm lint && pnpm typecheck && pnpm build && pnpm test` all green
- [ ] CI pipeline passes on PR
- [ ] Theme toggle (light/dark) works on `apps/web/page`
- [ ] All 5 primitives render in 6 variants × 5 sizes × all states without visual bugs
- [ ] Axe a11y check zero serious/critical violations on Storybook
- [ ] Reduced-motion verified (chromatic mode)
- [ ] Dark + light parity verified
- [ ] Chromatic baseline pushed
- [ ] Vercel preview deploy of `apps/web` URL shared

---

## Common pitfalls

- **Tailwind not picking up tokens**: ensure `content` glob covers all `packages/ui/src/**/*.tsx`
- **Fraunces optional vs swap flash**: confirm `display: optional` setting; on slow networks the editorial title falls back gracefully
- **Hydration mismatch on theme**: cookie-driven server default must match the `<html data-theme>` rendered server-side; use a small inline script before React hydration to apply user choice
- **Indic font over-download**: ensure each Indic font's import only fires when locale demands it
- **Storybook + Tailwind**: `@import "@careerops/tokens/dist/tokens.css"` must be in `preview.tsx` global CSS for proper rendering

---

## Hand-off to Day 2

Tomorrow: remaining primitives (Dialog, Drawer, Popover, Toast, Combobox, Switch, Checkbox, Radio, Slider, Avatar, Badge, Chip, Progress, Skeleton) + the high-leverage composites (JobCard + its sub-components). Day 2 is dense — Day 1's tokens + Button must be solid first.
