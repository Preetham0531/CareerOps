# Day 2 — Remaining Primitives + JobCard Composite + Icon Set

> **Goal**: ship every primitive component the product needs, plus the highest-leverage composite (`JobCard` and its 8 sub-components). At end of day, you can render a list of realistic JobCards in Storybook and they look ready for production.
>
> **Why this day matters**: `JobCard` is the most-rendered component in the app. Every Day 3+ surface depends on it being right.

---

## Prerequisites

- Day 1 complete + green CI
- `Button`, `Input`, `Tooltip`, `Tabs`, `Select` reviewed and approved
- `packages/tokens` stable
- `packages/icons` placeholder exists

---

## Hour-by-hour

### Block 1 (2h) — Primitives wave 2: `Dialog`, `Drawer`, `Popover`, `Toast`, `Combobox`

In `packages/ui/src/`:

#### `Dialog` (Radix wrapped)
- Sizes sm/md/lg per `10-components-primitives.md`
- Scrim with `backdrop-filter: blur(8px)` + `--bg-overlay`
- Focus trap, restored on close
- Esc + click-outside (toggleable)
- Specialized `ConfirmDialog` for destructive actions
- Animations: enter 320ms, exit 200ms

#### `Drawer`
- Right-edge variant (sm 400 / md 560 / lg 720 px)
- Bottom-sheet variant via [`vaul`](https://vaul.emilkowal.ski) for mobile
- Snap points `[0.4, 0.8, 1.0]`
- Sticky header + footer slots

#### `Popover` (Radix)
- Click-triggered (not hover)
- Max-width 360px
- 200ms scale-in animation
- Used downstream for "why this score?" affordances

#### `Toast` (via [Sonner](https://sonner.emilkowal.ski))
- Theme to palette (no rogue red — danger is gold-700)
- 6 variants: info, success, warning, danger, loading, action
- Position: desktop top-right, mobile bottom-center (above tab bar)
- `action` toast with Undo button + countdown ring

#### `Combobox` (via [`cmdk`](https://cmdk.paco.me))
- Fuzzy search
- Keyboard nav (↑↓ Enter Esc)
- Recent selections shown first
- Multi-select chip pattern
- Used downstream for city, company, role pickers

### Block 2 (1.5h) — Primitives wave 3: form + display

- `Switch` — Radix Switch, 32×20, spring-flip
- `Checkbox` — Radix Checkbox + path-draw check animation
- `Radio` — Radix Radio Group
- `Slider` — Radix Slider (single + dual-thumb for salary range)
- `Avatar` + `AvatarStack` — circular with initials fallback, status dot
- `Badge` — read-only label, 6 variants, 3 sizes
- `Chip` — interactive, removable + selectable
- `Progress` — linear (4px / 8px), `CountdownRing` (24px circular SVG)
- `Skeleton` — diagonal-shimmer 1.4s infinite, paused on reduced-motion
- `Divider` — 1px line; with optional inline label slot
- `Kbd` — keyboard shortcut display

### Block 3 (1h) — Icon set (`packages/icons`)

1. Re-export Lucide as flat barrel: `import { Briefcase } from '@careerops/icons'`
2. Wrap with `<LucideProvider strokeWidth={1.75}>` factory in `packages/icons/src/provider.tsx`
3. Implement custom India icons listed in `05-iconography.md`:
   - `LpaPill`, `BondLink`, `BenchClock`, `GhostListing`, `ReferralPath`
   - `EvidenceLeaf`, `StealthMask`, `OfferTrophy`, `ATSGate`
   - `CityT1`, `CityT2`, `CityT3`, `WhatsAppRing`, `IndicScript`, `DPDPShield`
4. Each icon: 24×24 viewBox, 2px safe padding, `currentColor` strokes/fills, `[data-accent]` slot for two-tone

Storybook story `Icons.stories.tsx` rendering all icons in a grid with size variants.

### Block 4 (3h) — `JobCard` composite + sub-components

Create `packages/ui/src/JobCard/`:

#### Sub-components (all in `JobCard/parts/`)
1. **`CompanyLogo`** — img with initials fallback
2. **`LocationBadge`** — city + tier (uses `CityT1/T2/T3`)
3. **`MoneyRange`** — LPA-aware, optional confidence dot
4. **`GhostScoreMeter`** — pill variant (default) + dial variant (80px gauge)
5. **`BondBadge`** + **`BenchBadge`** — gold-700 styled
6. **`MatchScoreMeter`** — radial gauge 0–100%
7. **`ChipRow`** — horizontal scroll-capable row of `Chip`s (WFH/Stock/Joining tags)
8. **`ReferrerPreview`** — small `AvatarStack` + count + "View referrers"

#### `JobCard` (composition)
- Three density modes: `compact`, `default`, `expanded`
- Uses `container-type: inline-size` per `04-spacing-grid-layout.md`
- Auto-collapses based on width
- Hover lift 2px + shadow per `06-motion-system.md`
- Click anywhere except actions opens detail drawer (callback prop)
- Right-click / long-press: context menu (placeholder for Day 3 — Save, Hide, Share)
- Bookmark icon top-right with fill animation on save

#### Storybook
- Each density × multiple data states (with referral, without; with bond, without; ghost > 0.6 etc.)
- Mobile breakpoint stories
- Dark mode stories
- Loading skeleton story
- 100+ data-permutation stories generated programmatically

### Block 5 (1h) — Loader, Error, Empty primitives

Per `13-empty-error-loading.md`:
- `LoadingSpinner` (Lucide Loader2, sizes inline/block/page)
- `EmptyState` (illustration slot, headline, description, primary action)
- `ErrorBoundary` card component
- `OfflineBanner` (top-of-screen)

Reusable empty/error illustrations: 3 starter SVG mascots in claymorphic style, palette-strict.

### Block 6 (0.5h) — Test + visual sweep

- All new components: tests + Storybook stories
- Axe a11y on Storybook — zero serious/critical
- Chromatic baseline updated
- Manual mobile breakpoint sweep at 375px in Storybook viewport addon

---

## Files created today

```
packages/ui/src/
  ├── Dialog/{index.tsx,*.stories.tsx,*.test.tsx}
  ├── Drawer/
  │   ├── RightDrawer/
  │   ├── BottomSheet/         (vaul-based)
  │   └── index.tsx
  ├── Popover/
  ├── Toast/                   (Sonner re-export + theme)
  ├── Combobox/                (cmdk-based)
  ├── Switch/
  ├── Checkbox/
  ├── Radio/
  ├── Slider/
  │   ├── Single.tsx
  │   └── Dual.tsx
  ├── Avatar/{Avatar,AvatarStack}.tsx
  ├── Badge/
  ├── Chip/
  ├── Progress/
  │   ├── Linear.tsx
  │   └── CountdownRing.tsx
  ├── Skeleton/
  ├── Divider/
  ├── Kbd/
  ├── LoadingSpinner/
  ├── EmptyState/
  ├── ErrorBoundary/
  ├── OfflineBanner/
  └── JobCard/
      ├── parts/
      │   ├── CompanyLogo.tsx
      │   ├── LocationBadge.tsx
      │   ├── MoneyRange.tsx
      │   ├── GhostScoreMeter.tsx
      │   ├── BondBadge.tsx
      │   ├── BenchBadge.tsx
      │   ├── MatchScoreMeter.tsx
      │   ├── ChipRow.tsx
      │   └── ReferrerPreview.tsx
      ├── JobCard.tsx
      ├── JobCard.stories.tsx
      └── JobCard.test.tsx

packages/icons/src/
  ├── provider.tsx
  ├── lucide.ts                (barrel)
  ├── custom/
  │   ├── LpaPill.tsx
  │   ├── BondLink.tsx
  │   ├── BenchClock.tsx
  │   ├── GhostListing.tsx
  │   ├── ReferralPath.tsx
  │   ├── EvidenceLeaf.tsx
  │   ├── StealthMask.tsx
  │   ├── OfferTrophy.tsx
  │   ├── ATSGate.tsx
  │   ├── CityT1.tsx,CityT2.tsx,CityT3.tsx
  │   ├── WhatsAppRing.tsx
  │   ├── IndicScript.tsx
  │   └── DPDPShield.tsx
  └── index.ts
```

---

## Definition of done

- [ ] All primitives from `10-components-primitives.md` shipped (Button → Skeleton, plus IconButton, ConfirmDialog, MoneyInput)
- [ ] All custom icons from `05-iconography.md` rendering correctly at 16/20/24/32/48
- [ ] `JobCard` rendering in Storybook with 100+ data permutations
- [ ] `JobCard` density modes auto-switch via container queries
- [ ] All Storybook stories include: dark mode, light mode, reduced motion
- [ ] Chromatic baseline updated
- [ ] Axe zero serious/critical
- [ ] Bundle size of `@careerops/ui` < 80 KB gzip (tree-shake aggressively)
- [ ] Lint, typecheck, test, build all green on CI

---

## Common pitfalls

- **Sonner theming**: it ships its own CSS — wrap and override via CSS variables, not selector specificity wars
- **vaul drag-down**: scroll inside the bottom sheet conflicts with drag-to-dismiss; use vaul's `setActiveSnapPoint` correctly
- **JobCard container queries on Safari < 16**: graceful fallback to media-query density
- **AvatarStack overlap z-index**: increases left-to-right; flip in RTL (we don't ship RTL but stay safe)
- **Dual-thumb Slider**: Radix `Slider.Range` between two thumbs; don't roll your own
- **Custom icons rendering at small sizes**: ensure 1.75 stroke is pixel-aligned at 16px
- **Lucide tree-shaking**: import named exports only (`import { Briefcase }`); never `import * as icons`

---

## Hand-off to Day 3

Tomorrow: app shell (top bar, side nav, mobile bottom tabs, ⌘K palette) + onboarding flow (6-step wizard) + auth stubs. Day 3 starts using primitives + `JobCard`, so they must be rock solid by end of today.
