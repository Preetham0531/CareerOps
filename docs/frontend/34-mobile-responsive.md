# 34 — Mobile & Responsive

## Purpose
India is a mobile-first market: most users will hit the product on a phone before they ever touch a desktop. The product must feel as polished — and as fast — on a sub-₹15k Android as on a 16" laptop.

This doc consolidates mobile-specific patterns, breakpoint behaviors, PWA setup, and the floor-device performance contract.

## Floor device

**Target hardware**: ~₹12–15k Android phone (e.g., Redmi A4, Samsung Galaxy M-series).
- 4 GB RAM
- Snapdragon 4xx or MediaTek Helio mid-range
- 720p / 6.5" screen, sometimes lower
- Throttled 4G (250 KB/s realistic urban, 80 KB/s edge)
- Chrome / Samsung Internet browser

**Every screen must run at 60fps on this device.** Tested on real hardware, not just emulated.

## Breakpoints

Per `04-spacing-grid-layout.md`:
- `< 640` mobile
- `640–1024` tablet
- `1024–1440` laptop
- `1440–1920` desktop
- `≥ 1920` large

Mobile-first authoring: write small first; layer up.

## Layout transformations

| Module | Desktop | Mobile |
|---|---|---|
| Dashboard | 12-col bento | Single-column stack, primary tile first |
| Discovery | 3-col (filter / list / preview) | Single-column list; filter bottom sheet; preview is a route push |
| Referral graph | Force-directed canvas | Force-directed canvas (pinch zoom), or list fallback |
| Skill canvas | Canvas | List view with claim → drawer for evidence |
| Salary leak | Multi-tile bento | Stacked tiles |
| Bond drawer | Side drawer | Bottom sheet (vaul) with snap points |
| Stealth panel | Settings sub-route | Same, mobile-stack |
| Interview prep | Split board + side rail | Tab interface (rounds / interviewer / mock / notes) |
| Negotiation | Wizard with right rail hints | Wizard, hints inline expandable |
| Application DNA | Bento | Stacked |
| Cohort | Sidebar + main | Tabs |
| Browser extension | n/a | n/a (extension is desktop-only) |
| Fresher hub | Bento | Stacked |
| Settings | Side menu + content | Drawer menu + content stack |

## Mobile navigation

**Bottom tab bar** (5 tabs max, per Apple/Google guidance):

```
┌──────────────────────────────────┐
│                                    │
│       [content area]               │
│                                    │
│                                    │
├──────────────────────────────────┤
│ 🏠      🔍      ⭐      ✉️      👤 │
│ Home  Discover Refer  Inbox  You   │
└──────────────────────────────────┘
```

- Active tab: filled icon, label `--brand`
- Inactive: outline icon, label `--text-secondary`
- Safe-area-inset-bottom respected
- Hides on scroll-down, reappears on scroll-up
- Long-press tab → secondary actions menu

## Patterns

### Bottom sheet (vaul)
For: filters, job detail, action menus.
- Snap points: `[0.4, 0.8, 1.0]` (peek / half / full)
- Drag handle visible at top
- Backdrop dim 60% on scrim
- Esc / drag-down-past-threshold closes

### Pull-to-refresh
- Available on lists (discovery, applied, cohort feed, dashboard)
- Custom indicator: gold-400 spinning ring with teal trail
- Threshold: 80px drag, then commit

### Stack-of-cards swipe
- Discovery (mobile-only opt-in): tinder-style
- Swipe right → save
- Swipe left → hide
- Swipe up → apply
- Swipe down → "remind me later"
- Animation: Framer Motion `drag` with `dragSnapToOrigin`
- Haptic on commit

### Long-press context
- 500ms long-press on JobCard → contextual menu (save, hide, share with cohort, add note)
- Haptic feedback on entry

### Floating action button (mobile only)
- Single FAB bottom-right above tab bar
- Context-dependent: on Discovery → "Filter"; on Inbox → "Compose"; on Dashboard → "Quick search"
- Disappears under bottom sheets

### Swipe-back gesture
- iOS-style edge-swipe to go back; Android natively supports
- Implemented at route boundaries

## PWA configuration

The product is a Progressive Web App.

### Manifest
- Name: "CareerOps India"
- Short name: "CareerOps"
- Display: `standalone`
- Theme color: `--bg-app` per current theme
- Icons: 48, 72, 96, 144, 192, 256, 384, 512 (standard + maskable variants)
- Categories: `business, productivity`
- Lang: `en-IN` default

### Service worker
- App shell precached
- Static assets versioned + cached
- Job list last-loaded cached
- Offline page for unreachable routes
- Background sync for queued actions (apply, DM send) — replays when online

### Install prompt
- Surface "Install app" CTA only after 3 sessions of engaged use (not on first visit)
- Subtle, dismissible

### Offline behavior
Per `13-empty-error-loading.md`:
- Banner: "You're offline. Changes will sync when you reconnect."
- Cached data still readable
- New actions queued

## Push notifications

Web Push API (Chrome/Edge/Firefox; iOS Safari from 16.4).

Categories (opt-in granular):
- Referrer reply
- Interview reminder (24h before)
- Offer received
- New strong match (off by default)
- Cohort activity (off by default)

User can mute "during work hours" — respects stealth window.

## Performance budgets (mobile)

| Metric | Floor target | Stretch |
|---|---|---|
| First Contentful Paint | < 1.8s | < 1.2s |
| Largest Contentful Paint | < 2.5s | < 1.8s |
| First Input Delay | < 100ms | < 50ms |
| Cumulative Layout Shift | < 0.05 | < 0.02 |
| Total JS bundle (initial) | < 180 KB gzip | < 130 KB |
| Total CSS (initial) | < 30 KB | < 20 KB |
| Image size per route | < 200 KB total | < 100 KB |

CI enforced via Lighthouse + bundle-size action; PR fails if budgets break.

## Mobile-specific constraints

### Animations
- Skip 3D tilt and magnetic buttons on touch
- Reduce stagger delays (already capped 100ms)
- Pause aurora gradient when battery saver is on
- `prefers-reduced-motion` honored as on desktop

### Image handling
- `next/image` with mobile-sized responsive variants
- WebP / AVIF served by default
- Lazy-load below-the-fold
- LQIP (low-quality image placeholder) blur-up

### Touch targets
- Minimum 44×44 px (per `14-accessibility.md`)
- 8px gap between targets
- Buttons in lists are full-width tappable, with visible affordance

### Typography
- Base 16px (iOS won't zoom-on-focus < 16); body inputs use 16px min
- Line-height 1.55 default for body
- Single-column reading width (avoid > 60ch)

### Forms
- Native input types (`type=tel`, `type=email`) for keyboard hints
- `inputmode` attribute for numeric (LPA, etc.) and decimal
- `autocomplete` attributes filled (one-time-code, email, name, given-name, etc.)
- Sticky submit button at bottom (above keyboard if open)
- `onfocus`-pad bottom of form so submit is reachable above iOS keyboard

### Scrolling
- `-webkit-overflow-scrolling: touch` on scrollable areas
- Avoid nested scroll containers (jank)
- Pull-to-refresh on top-level scroll only

## Network resilience

- Stale-while-revalidate (TanStack Query default)
- Retry with exponential backoff (3 retries, capped 30s)
- Optimistic updates for save/follow actions
- Queue mutations offline, replay online (background-sync)
- Network indicator: small chip top-right when online but slow (>2s pending)

## Indic / language

- Devanagari, Tamil, Telugu fonts conditionally loaded (`unicode-range`)
- 18% extra padding when Indic text rendered (taller glyphs)
- Voice keyboards work on touch input (no overrides)

## Accessibility on mobile

- Same WCAG 2.2 AA rules
- Touch targets ≥ 44×44
- Focus visible (yes, even on mobile — keyboards exist on Android tablets)
- Screen reader testing: TalkBack on Android, VoiceOver on iOS
- Don't disable zoom (`maximum-scale=1` is banned)

## Anti-patterns

- ❌ Hiding desktop functionality entirely on mobile (the user is the same person; "limited mobile" is patronizing)
- ❌ Modals that don't fit on screen (use full-screen routes instead on mobile)
- ❌ Carousels for primary content (replace with vertical stack)
- ❌ Hover-only states (touch has no hover)
- ❌ Tooltips without tap-to-show alternative
- ❌ "Switch to desktop for this feature" warnings — instead, ship mobile-friendly fallback
- ❌ Bottom-sheet drawers that don't drag (use vaul, get gestures right)
- ❌ Auto-playing videos
- ❌ Heavy animations on app launch

## Testing matrix

- Real devices: Redmi A4, Samsung Galaxy M14, Realme C-series, iPhone SE
- Browsers: Chrome Android, Samsung Internet, Mobile Safari
- Network: 3G fast / 3G slow / 4G throttled (Chrome devtools profiles)
- Battery saver mode tested (iOS / Android)
- Dark mode + reduced motion + Indic locale + larger system font (200%)

## Cross-doc links

- Bottom sheet: `07-trending-design-tactics.md` (vaul)
- Stack-of-cards swipe: `07-trending-design-tactics.md`
- PWA app shell: `91-stack-recommendation.md`
- Fonts conditionally loaded: `03-typography.md`
- Performance: `01-design-principles.md` principle #7
- Voice mobile interface: `35-voice-interface.md`

## Open questions

1. **iOS Safari quirks** — pull-to-refresh + bottom-sheet conflicts on iOS; v0.2 may need custom gesture handling
2. **PWA install rate in India** — unclear if users will install vs. visit web; track + iterate
3. **Background sync reliability** — Service Worker termination on Android; fallback to retry on next visit
4. **Voice push-to-talk on web** — mobile microphone permission UX is often friction; consider warm-up screen
