# 06 — Motion System

> Motion is functional. Every animation must answer one of: *Where did this come from? Where did it go? What just changed? What's loading?* If it answers none of those, cut it.

This doc defines the easings, durations, springs, and patterns. The trending-tactics catalog lives in `07-trending-design-tactics.md` — that doc names *which* effects we use; this doc tells you *how* to make them feel right.

---

## Libraries

- **Framer Motion** — primary. Component animations, layout animations, gestures, drag, AnimatePresence.
- **GSAP (with ScrollTrigger)** — scroll-driven animations on marketing/onboarding hero only. Not used in product surface (Framer Motion handles those).
- **CSS animations** — for pure decorative loops (gradient mesh drift, grain noise) where we don't need JS state.
- **Native View Transitions API** — for cross-route animations once Safari ships full support; behind a feature flag in v0.1.
- **Lottie** — only for complex, hand-crafted moments (offer trophy celebration). Each Lottie under 30 KB.

---

## Easings

Define once, reuse everywhere. **No bespoke cubic-beziers per component.**

```ts
export const easings = {
  // standard - most UI motion
  standard: [0.4, 0, 0.2, 1],          // Material's "ease-in-out"
  // entry - things appearing
  enter: [0.0, 0, 0.2, 1],              // decelerate
  // exit - things disappearing
  exit: [0.4, 0, 1, 1],                 // accelerate
  // emphasized - hero/marketing moments
  emphasized: [0.2, 0, 0, 1],           // long pause then snap
  // expressive - delight moments only
  expressive: [0.34, 1.56, 0.64, 1],    // overshoot
};
```

Map to Tailwind:
```ts
transitionTimingFunction: {
  standard: "cubic-bezier(0.4, 0, 0.2, 1)",
  enter: "cubic-bezier(0, 0, 0.2, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
  emphasized: "cubic-bezier(0.2, 0, 0, 1)",
  expressive: "cubic-bezier(0.34, 1.56, 0.64, 1)",
}
```

---

## Durations

```ts
export const durations = {
  instant: 50,
  fast: 120,
  base: 200,
  medium: 320,
  slow: 480,
  xslow: 720,
  hero: 1200,
};
```

| Context | Duration | Easing |
|---|---|---|
| Hover state change | `fast` | `standard` |
| Button press | `instant` | `standard` |
| Toggle (switch, checkbox) | `base` | `standard` |
| Modal/drawer open | `medium` | `enter` |
| Modal/drawer close | `base` | `exit` |
| Page transition | `medium` | `emphasized` |
| Skeleton → content fade | `base` | `standard` |
| Toast in | `base` | `enter` |
| Toast out | `fast` | `exit` |
| Ripple on tap | `fast` | `exit` |
| Card hover lift | `base` | `standard` |
| Hero reveal | `hero` | `emphasized` |
| Earned moment (offer arrived) | `xslow` | `expressive` |

Anything under `instant` (50ms) feels broken. Anything over `hero` (1200ms) feels slow. Stay in this band.

---

## Springs (Framer Motion)

For interactions where physical feel matters — drag, dismiss, magnetic buttons, layout swaps:

```ts
export const springs = {
  // gentle - default for layout
  gentle: { type: "spring", stiffness: 200, damping: 26, mass: 1 },
  // crisp - for taps and snaps
  crisp: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 },
  // bouncy - earned/delight moments
  bouncy: { type: "spring", stiffness: 320, damping: 18, mass: 1 },
  // floppy - drag dismiss
  floppy: { type: "spring", stiffness: 120, damping: 22, mass: 1.4 },
};
```

---

## Stagger

Lists and grids fade-in with stagger. **30ms per item, 100ms total cap** (so a 20-item list still finishes in 100ms, not 600ms).

```tsx
<motion.ul variants={{ visible: { transition: { staggerChildren: 0.03 } } }}>
  {items.map(...)}
</motion.ul>
```

For very large lists, virtualize first (TanStack Virtual) and stagger only what's visible.

---

## Reduced motion

`@media (prefers-reduced-motion: reduce)` — honored everywhere. No exceptions.

```ts
const prefersReducedMotion = useReducedMotion();
const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: easings.enter };
```

When motion is reduced:
- Fades remain (opacity is fine), at `instant` duration
- Translates, scales, rotates are dropped — element appears in final position
- Stagger collapses to simultaneous
- Gradient mesh / grain animations pause on a static frame
- Lottie files render their final frame instantly

We test this mode in CI via Playwright with `forcedColors: 'reduce-motion'`.

---

## Motion patterns by context

### Hover lift (cards)
```ts
whileHover={{ y: -2, boxShadow: "0 8px 24px hsl(178 70% 11% / 0.16)" }}
transition={{ duration: 0.2, ease: easings.standard }}
```

Subtle. 2px is enough; 4px feels soft, 6px feels Bootstrap.

### Press
```ts
whileTap={{ scale: 0.97 }}
transition={{ duration: 0.1, ease: easings.standard }}
```

### Magnetic button
The button "pulls" toward the cursor when within 80px:

```tsx
<motion.button
  ref={ref}
  onMouseMove={(e) => { /* compute offset clamped to ±12px */ }}
  animate={{ x: offset.x, y: offset.y }}
  transition={springs.gentle}
>
```

Used for primary CTAs only. Disabled on touch devices.

### Modal entry
```ts
initial={{ opacity: 0, scale: 0.96, y: 8 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.98, y: 4 }}
transition={{ duration: 0.32, ease: easings.enter }}
```

### Drawer (right-edge)
```ts
initial={{ x: "100%" }}
animate={{ x: 0 }}
exit={{ x: "100%" }}
transition={springs.gentle}
```

### Toast
```ts
initial={{ opacity: 0, y: -16, scale: 0.96 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: -16, scale: 0.98 }}
transition={{ duration: 0.2 }}
```

### Skeleton shimmer
CSS-only. A diagonal teal-300/40 → transparent gradient sweeps across the skeleton at 1.4s linear infinite. Pauses under reduced motion.

### Earned moment (offer arrived, ⭐ referral matched)
1. Card scales up 1 → 1.02 over 200ms (`expressive`)
2. Gold border glows from 0 → 1 opacity over 320ms
3. Number/text inside ticks up via `useMotionValue` over 800ms (`easeOut`)
4. Settles back to scale 1 over 400ms (`bouncy` spring)
5. Soft confetti — *only* in this moment — 12 small gold particles, fade in 200ms, drift down 1500ms, fade out

Total ~2.4s. Once. Never repeats unless user re-triggers.

### Number counters (LPA, percentages)
```tsx
const motionValue = useSpring(0, { stiffness: 80, damping: 20 });
useEffect(() => motionValue.set(targetValue), [targetValue]);
```

For salary numbers, the motion value snaps to the rounded LPA every 50ms, not continuously. Looks more confident than a continuous interpolation.

---

## Scroll-driven animations

CSS `animation-timeline: scroll(...)` — supported in Chrome 115+, polyfill via [`scroll-timeline-polyfill`](https://github.com/flackr/scroll-timeline) for Safari/Firefox.

Use cases:
- **Hero parallax** on onboarding (`07-trending-design-tactics.md` — used sparingly)
- **Sticky reveal** of feature explainer cards on marketing
- **Section-based progress bar** in long flows (negotiation co-pilot)

NOT used in product chrome. Scroll-driven anims are for marketing/onboarding only — too distracting in workflow surfaces.

---

## Page transitions

Cross-route transitions use the **Native View Transitions API** when available, with a Framer Motion fallback.

```ts
// next.config.js (app router pattern when stable)
experimental: { viewTransition: true }
```

Default transitions:
- **Forward navigation** (deeper into hierarchy) — content slides in from right + fades, 320ms emphasized
- **Backward** — slides out to right
- **Lateral** (tab change within a module) — crossfade, 200ms standard

When prefers-reduced-motion is set, all page transitions become a 100ms opacity crossfade only.

---

## Performance budget for motion

- **No animation drops below 60fps** on the floor device (sub-₹15k Android, throttled 4G)
- **Use only `transform` and `opacity`** for properties that animate. Anything else (top, width, height, color) needs justification.
- **`will-change` on currently-animating elements only** — never blanket. Remove after animation.
- **Avoid `box-shadow` animation on more than 3 elements simultaneously** — use `filter: drop-shadow` on a parent or pre-compute multiple shadow states.
- **GPU layer count cap: 5 simultaneous** in any view. More than that on low-end Android causes jank.
- **Profile every screen** with the React DevTools profiler + Chrome perf panel. PR doesn't merge if a screen shows >5ms of layout/paint per frame on the floor device.

---

## Anti-patterns

- ❌ Animating on `top`, `left`, `width`, `height`, `padding`, `margin`. Use `transform` and `opacity`.
- ❌ Per-component bespoke easings. Use the 5 we have.
- ❌ Animations longer than 1.2s in product chrome (only hero/marketing/earned moments)
- ❌ Spinning loaders that aren't `Loader2` from Lucide
- ❌ Blinking, flashing, or pulsing red elements (also banned by color rules)
- ❌ Auto-playing video on any product surface
- ❌ Parallax in dense data screens
- ❌ Marquee/auto-scrolling text
- ❌ Animations that block user input (e.g., a modal that takes 800ms to open and ignores clicks meanwhile)
- ❌ Animations triggered by `IntersectionObserver` for things above the fold (run on mount instead — viewport check at mount)
