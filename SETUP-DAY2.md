# Day 2 — Setup notes

> Append this content to `SETUP.md` after merging Day 2 work.

## Files-to-rename

The Day 2 ui barrel and package.json were written with `.day2` suffixes because the writer could not overwrite existing files. Before installing, swap them in:

```bash
cd ~/Downloads/Desktop/CareerOps-India

# Swap UI package manifest (adds Radix primitives + vaul + sonner + cmdk + @careerops/icons)
mv packages/ui/package.json.day2 packages/ui/package.json

# Swap UI barrel (re-exports all Day 1 + Day 2 primitives + JobCard)
mv packages/ui/src/index.day2.ts packages/ui/src/index.ts

# Re-install with new deps + new workspace package
pnpm install

# Build tokens (Day 1 step, still needed)
pnpm tokens:build

# Run app
pnpm dev   # apps/web :3000
```

Visit `http://localhost:3000/showcase` — proves JobCard + primitives are wired.

## Day 2 deliverables

### New workspace package
- **`@careerops/icons`** — Lucide barrel + 15 custom India icons
  - `LpaPill`, `BondLink`, `BenchClock`, `GhostListing`, `ReferralPath`,
    `EvidenceLeaf`, `StealthMask`, `OfferTrophy`, `ATSGate`,
    `CityT1` / `CityT2` / `CityT3` / `CityTier`, `WhatsAppRing`,
    `IndicScript`, `DPDPShield`
  - All 24×24 viewBox, 1.75 stroke, `currentColor`, `[data-accent]` slot for two-tone

### Primitives wave 2
- **`Dialog`** (Radix) — sm/md/lg, scrim w/ backdrop-blur, focus trap
- **`RightDrawer`** (Radix) + **`BottomSheet`** (vaul) — sm/md/lg, snap points
- **`Popover`** (Radix) — click-triggered, max-w 360
- **`Toast`** + **`toast()`** — Sonner themed to palette (no rogue red)
- **`Combobox` / `Command*`** — cmdk-based; used downstream as global ⌘K + city/company pickers

### Primitives wave 3
- **`Switch`** (Radix) — 32×20 spring-flip
- **`Checkbox`** (Radix) — path-draw check, indeterminate state
- **`Radio`** / **`RadioGroup`** / **`RadioGroupItem`** (Radix)
- **`Slider`** (Radix) — single + dual-thumb (LPA range)
- **`Avatar`** + **`AvatarStack`** (Radix) — sizes xs–xl, status dot, ring slot
- **`Badge`** + **`Chip`** — palette-strict variants (no red/green); chip removable + selectable
- **`LinearProgress`** + **`CountdownRing`** — 5-sec undo timer, gold-when-urgent
- **`Skeleton`** — shimmer paused on reduced-motion
- **`Divider`** (with optional inline label like "OR")
- **`Kbd`** — keyboard shortcut display
- **`LoadingSpinner`** — inline / block / page sizes
- **`EmptyState`** — illustration + headline + description + actions
- **`ErrorBoundary`** — class component w/ default dignified fallback
- **`OfflineBanner`** — top-of-screen, navigator.onLine

### Composite — JobCard
- **`JobCard`** — three densities (compact / default / expanded), container-query driven
- **9 sub-components** in `JobCard/parts/`:
  - `CompanyLogo`, `LocationBadge` (T1/T2/T3 icons), `MoneyRange` (LPA + confidence dot),
  - `GhostScoreMeter` (pill + dial), `BondBadge`, `BenchBadge`,
  - `MatchScoreMeter` (radial gauge), `ChipRow` (perks), `ReferrerPreview` (avatar stack)
- Tests cover: render, ghost-pill threshold, bond badge, save-toggle stops propagation, referrer count

### Showcase route
- `/showcase` — visible proof page with 2 JobCards + every Day-2 primitive

## Verifying Day 2 done

```bash
pnpm install                 # picks up new Radix + vaul + sonner + cmdk + @careerops/icons
pnpm tokens:build
pnpm --filter @careerops/ui test   # runs JobCard + Button + MoneyInput tests
pnpm --filter @careerops/ui typecheck
pnpm dev
```

- [ ] `/showcase` route renders without errors in light + dark
- [ ] Bookmark-toggle on JobCard does NOT also fire onSelect
- [ ] LPA slider value updates live below the slider
- [ ] CountdownRing animates 5 → 0 then completes
- [ ] BottomSheet opens on mobile breakpoint, drag-to-dismiss works
- [ ] Toast (`toast.success('saved')`) appears in top-right with success border
- [ ] All icons render with consistent 1.75 stroke at 16px
- [ ] `pnpm test` all green (Button, IconButton, MoneyInput, JobCard)
- [ ] `pnpm typecheck` zero errors

## Hand-off to Day 3

`docs/frontend/build-plan/day-3.md` — app shell (TopBar, SideNav, MobileTabBar, layout shells A/B/C/D), ⌘K command palette using today's `Combobox`, MSW mock backend, full 6-step onboarding flow.

The `/showcase` route should be removed during Day 3 once the real Discovery surface goes in.
