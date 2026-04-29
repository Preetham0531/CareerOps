# 05 — Iconography

> Icons are silent text. They must read instantly, scale legibly, and stay in palette.

---

## Base library: Lucide

We use [Lucide](https://lucide.dev) as the foundation — open-source, ~1400 icons, MIT license, tree-shakable per-import, consistent 24×24 outline style with 1.5px stroke.

```tsx
import { Briefcase, IndianRupee, Bookmark, ShieldCheck } from "lucide-react";
```

**Default size:** 16×16 (`size={16}`) for inline UI, 20×20 in card chrome, 24×24 in nav rails, 32×32 for empty-state illustrations.

**Stroke width:** 1.75 (slightly heavier than Lucide default 2 → too heavy at our sizes; 1.5 too thin on dark mode). Set globally via `<LucideProvider strokeWidth={1.75}>`.

---

## Custom India-specific iconset

Lucide doesn't carry the India-specific concepts we need. We ship a custom set in `/components/icons/`:

| Icon | Glyph concept | Use |
|---|---|---|
| `LpaPill` | "₹L" stylized in a pill | Salary pills on job cards |
| `BondLink` | broken chain icon, gold-weighted | Bond/bench warning |
| `BenchClock` | clock-with-stop sign hybrid | Bench-risk badge |
| `GhostListing` | abstract ghost outline | Ghost-job radar score |
| `ReferralPath` | two-node connection with mutual link | Referral hijack screens |
| `EvidenceLeaf` | leaf-as-proof iconography | Skill-claim evidence chips |
| `StealthMask` | half-mask | Stealth Mode toggle |
| `OfferTrophy` | minimal trophy with gold fill state | Offer arrived |
| `ATSGate` | gate-with-checkmark | ATS-compatibility ring |
| `CityT1`, `CityT2`, `CityT3` | concentric rings (3, 2, 1) | City tier badge |
| `WhatsAppRing` | abstract phone-with-ring (avoid official WA logo for ToS reasons) | WhatsApp recruiter |
| `IndicScript` | "अ" + "த" + "త" stylized | Indic language toggle |
| `DPDPShield` | shield with "D" cutout | DPDP compliance/consent screens |

Each custom icon ships as an SVG component with `currentColor` strokes/fills, allowing palette compliance at zero runtime cost.

```tsx
// /components/icons/LpaPill.tsx
export function LpaPill({ size = 16, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}
         fill="none" stroke="currentColor" strokeWidth={1.75}>
      …
    </svg>
  );
}
```

---

## Construction rules (custom icons)

- **24×24 viewBox.** Always.
- **2px safe padding** inside the box (icon glyph occupies 20×20).
- **1.75 stroke** to match Lucide.
- **Square caps + rounded joins** (`stroke-linecap="square" stroke-linejoin="round"`) — slight industrial feel, matches the brand voice.
- **Pixel-aligned** at 24px and 16px.
- **`currentColor` only.** No hardcoded fills/strokes — colors come from CSS context.
- **Two-tone via `<g class="icon-accent">`** — when a custom icon needs gold-on-teal, use a CSS class and let parent context colorize.

---

## Sizes & contexts

| Context | Size | Stroke shows as |
|---|---|---|
| Inline-with-text body | 14px or 16px | 1.5px effective |
| Button leading icon | 16px | 1.5px |
| Nav rail | 20px | 1.75px |
| Card header | 20px | 1.75px |
| Empty state hero | 48–64px | 1.75–2px |
| Marketing surface | 96–128px | 2px |

---

## Color application

Icons inherit `currentColor`. Do not pass `color` props directly to icons — color the parent.

```tsx
// good
<button className="text-brand hover:text-brand-hover">
  <Bookmark size={16} />
</button>

// bad
<Bookmark size={16} color="#14998D" />
```

Two-tone icons (gold accent on teal base) use a `[data-accent]` slot:

```tsx
<OfferTrophy className="text-brand [&_[data-accent]]:text-accent" />
```

---

## Icon-only buttons

Always paired with `aria-label` and a tooltip.

```tsx
<IconButton aria-label="Save job" tooltip="Save (S)">
  <Bookmark size={16} />
</IconButton>
```

Tooltip shows after 500ms hover (see `06-motion-system.md`).

---

## Animated icons

Reserved for moments where icon motion conveys meaning:

- **Save** — bookmark fills with gold-400 over 200ms `easeOut`
- **Send referral DM** — paper-plane lifts and fades over 600ms
- **Apply** — checkmark draws (path animation) over 400ms
- **Loading inline** — Lucide `Loader2` rotates linearly at 1s/turn (keep simple)
- **Voice listening** — custom waveform icon morphs amplitude with mic input

Implementation: Framer Motion variants on SVG paths, or [`@lottiefiles/lottie-player`](https://lottiefiles.com) for the more complex ones (offer trophy celebration). Lottie files never exceed 30 KB; pre-render to teal/gold palette before shipping.

---

## Avoiding logo lookalikes

We deliberately do not use:
- The actual LinkedIn `in` glyph — instead a generic "professional network" icon
- The actual WhatsApp speech-bubble — instead `WhatsAppRing` abstract
- The actual Naukri/Indeed/Foundit logos — instead text labels with brand-color dots

Reason: trademark + each portal's brand guideline restricts third-party use. Our generic glyphs sidestep this.

When showing portal logos in a *recognizable* context (e.g., "Continue with LinkedIn" auth button), we use the official mark only because that's the auth UX standard and falls under nominative fair use. Everywhere else, generic.

---

## Icon search & discoverability for designers/engineers

- All icons (Lucide + custom) browseable via Storybook addon `addon-icon-search`
- Hover an icon name → see size variants, the import statement, and accessibility notes
- "Find a similar icon" search powered by tags (e.g., search "money" → shows IndianRupee, LpaPill, OfferTrophy, Coins, Wallet)

---

## Anti-patterns

- ❌ Mixing Lucide with another icon set (Heroicons, Phosphor) — visual rhythm breaks
- ❌ Filled vs. outline mixed inconsistently (we are outline-default; filled states reserved for "active/saved" toggles)
- ❌ Skeuomorphic glyphs (3D briefcases, photorealistic rupee notes)
- ❌ Emoji in production UI (✅, 🚀, 🎉) — different rendering per OS, breaks brand voice. Exception: user-authored content (cohort comments)
- ❌ Hard-coded colors on icons
- ❌ Icons smaller than 14px (illegible)
- ❌ Icons larger than 24px without padding/scale rationale
