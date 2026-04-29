# 07 — Trending Frontend Design Tactics

> Catalog of currently-trending visual & interaction techniques, evaluated against this product. Each is tagged: ✅ adopt, 🟡 partial / where-it-fits, ❌ skip and why.

This is the curation that came out of researching Awwwards SOTM 2024–2026, Godly, SiteInspire, Refactoring UI, Mobbin patterns, and the design systems of Linear, Vercel, Stripe, Arc, Raycast, Cron, Pitch, and Things 3.

The catalog is ordered roughly from "structural / foundational" to "decorative / delight."

---

## ✅ Bento grid layouts
Modern dashboard pattern — irregularly-sized tiles in a CSS grid lunchbox. **Used heavily** in this product on the dashboard, application-DNA analytics, and offer-summary screens. See `21-dashboard.md`, `30-application-dna.md`, `04-spacing-grid-layout.md`. Implementation: pure CSS Grid template areas. Refs: Apple Vision Pro keynote, Vercel dashboard, Cron calendar widgets.

---

## ✅ Glassmorphism v2 (subtle frosted overlays)
Original glassmorphism (2020) was overdone — every panel was frosted. v2 uses it surgically: **command palette overlay, modal scrims, drawer headers**. Backdrop-filter blur(20px) + `bg-[--bg-overlay]` (teal-950/80). Performance OK on modern devices; degrades to solid bg on Safari < 16 and on devices with `prefers-reduced-transparency`.

Where: ⌘K palette, drawer headers when content scrolls underneath, mobile bottom sheet headers.

---

## ✅ Aurora gradients (radial soft-light)
Multi-stop radial gradients in soft tones, layered on the app background to add ambient depth without hard shapes. **Used on**: dashboard hero band, onboarding marketing surface, offer-arrived screen.

Recipe: see `02-color-system.md` "Aurora teal." Animated drift via CSS `@property` + `transform: translate3d` over 60s loop.

---

## 🟡 Claymorphism accents
3D-soft blob shapes with inner+outer shadows. Looks good on hero illustrations but feels childlike in dense product UIs. **Use only on**: empty states (illustrated mascots), 404 / error surfaces, marketing pages.

Skip in product chrome.

---

## ✅ Kinetic type
Type that animates on entry (weight morph, mask-reveal, stagger). **Use on**: onboarding hero, marketing pages, offer-arrived headline. **Skip in**: nav, body copy, anywhere the user reads a list. See `03-typography.md` "kinetic type."

Refs: Apple WWDC keynote slides, Stripe Sessions hero, Linear changelog headers.

---

## ✅ Scroll-driven animations (CSS `animation-timeline`)
Native CSS-driven scroll animations. **Use on**: marketing/onboarding hero, long-form negotiation co-pilot flow (progress visualization). Polyfill for Safari/Firefox via `scroll-timeline-polyfill`. See `06-motion-system.md`.

**Skip in**: dense data screens. Scroll-anims belong in narrative pages.

---

## ✅ Magnetic buttons / cursor-following spotlights
Buttons that pull toward the cursor within 80px; a soft radial gradient that follows the cursor on hero surfaces. **Use on**: primary CTA on marketing/onboarding only. Disable on touch.

Refs: Apple homepage (cursor spotlight on cards), Vercel marketing.

Implementation: see `06-motion-system.md` magnetic button pattern.

---

## ✅ Hover 3D tilt (gyro on mobile)
Cards tilt 3–6° on hover based on cursor position, return on mouseleave. **Use on**: dashboard primary tile, offer-arrived card, marketing feature cards. Subtle (max 6° tilt, max 8px translateZ). Mobile equivalent: tilt with device gyroscope (DeviceMotionEvent) — opt-in.

Library: [`@react-spring/parallax`](https://github.com/pmndrs/react-spring) or hand-rolled with Framer Motion `useMotionValue`.

---

## ✅ Variable font morphing
Variable axes (`wght`, `opsz`, `SOFT`) animated on interaction. **Use on**: onboarding hero (Fraunces weight 400 → 700), offer headline (Fraunces SOFT axis 0 → 100 on arrival), kinetic loader text. Prefers-reduced-motion settles to final axis values immediately.

---

## ✅ Shader / WebGL gradients (sparingly)
GLSL fragment shader producing animated gradient mesh — Mr.doob/three.js style. **Use on**: marketing hero only. Pre-rendered to canvas at low FPS (24fps cap); mobile devices fall back to a static PNG screenshot. Bundle cost: ~50 KB gzip + GLSL strings. Worth it for marketing; off the table for product chrome.

Tool: [Shader Park](https://shaderpark.com), [GLSL Sandbox](http://glslsandbox.com), or hand-rolled with regl. Limit to teal/gold palette.

---

## ✅ Marquee strips (decorative, not navigational)
Horizontally scrolling strips of logos / company names. **Use on**: marketing surface ("Companies our users got referrals at"), homepage social-proof. **Always pause on hover and respect prefers-reduced-motion.**

Skip in product chrome. Marquees in workflow are noise.

---

## ✅ Parallax layers (multi-depth)
Background, mid-ground, foreground move at different speeds on scroll. **Use on**: marketing hero only. Three layers max — beyond that, it's a Canva-tier disaster. Implementation: CSS `transform: translate3d` per layer driven by scroll position via Intersection Observer.

---

## ✅ View Transitions API (cross-route)
Native browser API for animated page transitions. Chrome 111+, behind flag in Safari/Firefox. **Use** on every route change (Next.js 14 supports via experimental flag). Fallback to Framer Motion AnimatePresence when API isn't available. See `06-motion-system.md`.

---

## ✅ Skeleton shimmer
Diagonal gradient sweep across grayed-out content boxes during load. Standard pattern. **Use everywhere** content loads asynchronously. Pause under reduced motion.

---

## ✅ Micro-interactions
Tiny, reactive feedback for every meaningful action: button ripple, checkbox draw, save bookmark fill, toggle thumb spring. **Use everywhere.** This is table stakes, not trend.

Refs: Things 3, Cron, Linear, Notion's checkbox.

---

## ✅ Haptic-feel buttons
On supported devices, fire `navigator.vibrate(10)` on primary action confirmation (apply submitted, DM sent). 10ms taps; never longer. iOS Safari ignores; Android Chrome supports. Visual press feedback always present too — haptic is additive.

---

## ✅ Dot/grid backgrounds
Subtle 24×24 dot pattern at 4% opacity on light surfaces, 6% on dark. **Use on**: empty workspace areas, the canvas behind the referral graph, the onboarding background. Not on every screen — would become wallpaper noise.

CSS:
```css
background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
background-size: 24px 24px;
opacity: 0.04;
```

---

## ✅ Noise / film grain overlays
SVG `<feTurbulence>` filter at 6% opacity over dark surfaces. Adds tactility, hides banding. Static (no animation). **Use on**: dark mode app background, offer-arrived hero. Not on light mode (washes out).

---

## ✅ Gradient mesh
Slow-drifting multi-stop radial gradient mesh in palette colors. **Use on**: dashboard hero band, marketing hero. CSS-only (no canvas) for performance. Animation timeline ~ 60–120s. Pauses on reduced motion.

---

## ✅ Radial reveal
Click reveals a radial wipe of color from the click point — used for theme toggle (light/dark) transition. Pure CSS via `clip-path: circle()` animated.

```ts
// theme toggle: click point becomes reveal origin
clipPath: `circle(0px at ${x}px ${y}px)` → `circle(2000px at ${x}px ${y}px)`
duration: 480ms, ease: easings.emphasized
```

Beautiful. Worth the 30 lines of code.

---

## ✅ Command palette (⌘K)
Universal search + action launcher. **Used on**: every screen. Cmd+K (Ctrl+K on Win/Linux) toggles. Searches: jobs, candidates, settings, go-to-page, run-action.

Library: [`cmdk`](https://cmdk.paco.me) or [`kbar`](https://kbar.vercel.app). Custom-styled to teal/gold palette.

---

## ✅ AI typing effect
Streaming text reveal at ~30 chars/sec with a soft cursor block. **Use on**: cover-letter generator, referral DM composer, negotiation counter-offer drafts. Not for static copy (would feel fake).

Implementation: server streams tokens via SSE; client appends with `requestAnimationFrame` throttle. Cursor blinks at 1Hz, gold accent.

---

## ✅ Confetti (constrained)
Only the offer-arrived moment, only 12 gold particles, only one trigger. See `06-motion-system.md` earned moment.

---

## ✅ Spotlight cursor (cards)
Soft radial gradient that follows the cursor on top of a card, revealing a subtle highlight. **Use on**: marketing feature cards, dashboard primary tile. Not in lists (50 cards × spotlight = perf disaster).

```css
background: radial-gradient(circle 200px at var(--mx) var(--my),
  hsl(45 75% 55% / 0.15), transparent);
```

CSS variables `--mx` / `--my` updated via JS pointer move handler.

---

## ✅ Inline diff visualization
Used in: cohort peer-review (CV diff), referral DM editor (between AI draft and user edit). Green-on-teal-add, gold-on-teal-remove. Library: [`react-diff-viewer`](https://github.com/praneshr/react-diff-viewer-continued) restyled.

---

## ✅ Force-directed graphs (referral hijack #23, evidence #24)
Interactive node graph with physics simulation. Library: [`react-flow`](https://reactflow.dev) or [`@nivo/network`](https://nivo.rocks). Customize edge styles + node tokens to teal/gold. Performance: cap visible nodes at 100; cluster beyond.

---

## ✅ Heatmap calendar (App DNA #30)
GitHub-style contribution grid, but scaled and palette-mapped to teal. Sequential teal-50 → teal-700 ramp. Hover cell → tooltip with count.

---

## ✅ Sankey / chord diagrams (referral paths)
Show flow from "your network" → "intermediate connections" → "target company employees." Library: `@nivo/sankey` or D3 directly. Strict palette.

---

## ✅ Sparklines
Small inline trend lines (last-30-day callback rate, hiring velocity at a company). Library: `react-sparklines` or hand-rolled SVG. Single color (teal-500), 1px stroke, no axes/labels — sparklines are vibes-charts.

---

## ✅ Radial gauges (ATS compatibility ring, ghost score, referrer match)
Circular progress 0–100%. Stroke ring with teal-500 fill, `stroke-dasharray` animated. Center value as Geist 700, 24–32px.

---

## ✅ Stack-of-cards drag (tinder-style for jobs)
Mobile-only. User swipes job card left (skip), right (save), up (apply). **Use on**: mobile discovery surface, fresher mode (#33). Implementation: Framer Motion `drag` with `dragSnapToOrigin`.

Skip on desktop — it's slower than buttons there.

---

## ✅ Long-press context menu (mobile)
500ms long-press on a job card → contextual menu (save, hide, share-internally). Standard mobile gesture, low discovery cost (most users discover via accident, then keep using).

---

## ✅ Pull-to-refresh
Standard mobile pattern, expected on the discovery feed. Custom indicator: gold-400 spinning ring with teal-500 trail.

---

## ✅ Bottom sheet (mobile drawer)
Slide-up from bottom with grab handle, snap points (peek / half / full). **Use on**: mobile filters, mobile job card details, voice interface. Library: [`vaul`](https://vaul.emilkowal.ski) — best React bottom sheet, gesture-correct.

---

## 🟡 Cursor swap / custom cursor
A custom-styled cursor on hero only (small gold circle). Cursor: none on rest of product (default arrow). Trendy on portfolios — distracting on workflow apps. Marketing surface only.

---

## 🟡 Cursor "follower" elements (chasing dot)
Dot/arrow that follows cursor to indicate hover state. Pretty, but performance cost on large screens. **Use on**: marketing hero only.

---

## 🟡 Tilt-on-scroll cards
Cards that tilt as they enter viewport. Cute on marketing, distracting in product. **Marketing only.**

---

## 🟡 Auto-play hero video
Banned in product. **Marketing only**, with autoplay+muted+loop, captions on, controls minimized. Cap at 8 seconds. Always offers "skip animation" button.

---

## 🟡 Liquid / fluid SVG morph
Blob shapes morphing. Cute. **Use on**: 404 page mascot, empty-state illustrations. Skip elsewhere.

---

## 🟡 Stop-motion-feel transitions
"Sketchy" frame-by-frame motion (Linear changelog). Memorable on landing pages. **Use on**: about/changelog page only.

---

## ❌ Neumorphism / soft inset shadows
2020 trend. Looks dated, fails contrast AA. Don't.

---

## ❌ Brutalist heavy borders / clashing colors
Doesn't match "calm precision" voice. Skip.

---

## ❌ Auto-rotating hero phrases ("Find / Apply / Negotiate")
Cliché. Skip. Static hero with one decisive statement instead.

---

## ❌ Excessive gradients on every surface
Gradient EVERY card → bad. Reserved for hero/dashboard band/earned moments only.

---

## ❌ Splash/loading screens with animations longer than 1s
Users hate them. Skip. Content-first; skeleton placeholders if needed.

---

## ❌ Sticky cookie / DPDP banner that blocks the entire UI
DPDP requires consent, but consent ≠ blocking. Use a non-blocking bottom sheet with clear options. See `36-settings-billing.md`.

---

## ❌ Carousel-only feature lists
Bento grids over carousels. Carousels hide content; bento shows everything.

---

## ❌ Animated emojis / animated avatars
Distracting, fail brand voice. Static avatars only.

---

## ❌ Floating action buttons (FAB) on desktop
FABs are mobile-paradigm. Desktop has plenty of toolbar room. Skip on desktop.

---

## ❌ Particle background animations everywhere
Skip. The grain overlay is enough texture.

---

## ❌ Auto-playing 3D scenes (three.js everywhere)
Mobile devices melt. Marketing hero only, with mobile fallback to static PNG.

---

## Summary: where each tactic lives in the product

| Surface | Tactics deployed |
|---|---|
| **Marketing / onboarding** | Aurora gradient, kinetic type, scroll-driven anims, magnetic buttons, parallax, shader gradients, hero 3D tilt, marquee logos, custom cursor (hero only), variable font morph |
| **Dashboard** | Bento grid, aurora gradient band, gradient mesh, hover lift, command palette, sparklines, radial gauges, dot background, hero 3D tilt (primary tile only) |
| **Discovery / lists** | Bento grid (filter rail), skeleton shimmer, stagger fade-in (capped), micro-interactions, command palette, sparklines per row |
| **Referral graph / Skill canvas** | Force-directed graph, Sankey/chord, hover micro-interactions, dot background, command palette |
| **Composers (DM, cover letter)** | AI typing effect, inline diff, micro-interactions, command palette |
| **Earned moments (offer)** | Confetti (constrained), gold border glow, number counter, scale spring, kinetic type, Lottie celebration |
| **Settings / DPDP** | No decoration. Calm and clear. |
| **Mobile** | Stack-of-cards swipe, pull-to-refresh, bottom sheet (vaul), long-press menu, haptics |

If a tactic isn't named here, do not introduce it without updating this doc.
