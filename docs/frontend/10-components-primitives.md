# 10 — Component Library: Primitives

> Atomic components. Used everywhere; if any of these are wrong, every screen looks wrong.

We build on top of [Radix UI](https://www.radix-ui.com) primitives (unstyled, accessible) and style them in our system. We do **not** use Material UI, Chakra, or Ant Design — they impose visual identity that fights ours.

Component file location: `/components/ui/<name>.tsx`. Tests: `/components/ui/<name>.test.tsx`. Stories: `/components/ui/<name>.stories.tsx`.

---

## Button

The most important component. Get this right.

### Variants
| Variant | Use | Look |
|---|---|---|
| `primary` | Main page action | Filled `--brand`, white text |
| `secondary` | Secondary action | Subtle bg `--bg-raised`, `--text-primary` |
| `ghost` | Tertiary, low-stakes | Transparent, `--text-primary`, hover bg |
| `accent` | Earned/⭐ moments only | Filled `--accent` (gold), `--text-inverse` (teal-950 — never white on gold) |
| `danger` | Destructive | Outline `gold-700` (light) / `gold-400` (dark), text matches |
| `link` | Inline anchor | No bg, `--brand` text, underlined on hover |

### Sizes
| Size | Height | Padding | Type |
|---|---|---|---|
| `xs` | 24px | 0 8 | text-body-s 500 |
| `sm` | 32px | 0 12 | text-body-s 500 |
| `md` | 40px | 0 16 | text-body-m 500 (default) |
| `lg` | 48px | 0 20 | text-body-m 600 |
| `xl` | 56px | 0 24 | text-body-l 600 (rare; CTAs only) |

### States

```
default → hover → press → focus → loading → disabled
```

- **hover**: bg shifts one step in ramp (e.g., teal-500 → teal-400); transform: translateY(-1px); shadow appears
- **press**: scale 0.97; bg shifts to pressed token
- **focus**: 2px gold outline at 3px offset (always visible on keyboard, hidden on mouse via `:focus-visible`)
- **loading**: inline spinner replaces leading icon; label stays; pointer-events disabled; aria-busy
- **disabled**: opacity 0.5; cursor not-allowed; no hover

### Magnetic primary button (marketing/onboarding only)
Cursor within 80px → button translates toward cursor (max ±12px), spring `gentle`. On touch: disabled. See `06-motion-system.md` magnetic pattern.

### Icon support
- `leadingIcon` and `trailingIcon` props
- Icon size scales with button size: xs/sm → 14px, md → 16px, lg → 18px, xl → 20px
- Icon-only buttons use the `IconButton` component (square, with required `aria-label`)

### API
```tsx
<Button
  variant="primary"
  size="md"
  leadingIcon={<Send size={16} />}
  loading={false}
  disabled={false}
  fullWidth={false}
  onClick={...}
>
  Send referral DM
</Button>
```

### Anti-patterns
- ❌ More than one `primary` button per screen
- ❌ `accent` (gold) used for non-earned moments — it loses meaning
- ❌ Custom one-off button styles. Add a variant if needed; never inline.
- ❌ Buttons with > 4 words of text (use a tooltip or rephrase)

---

## Input

### Variants
- `text`, `email`, `password`, `tel`, `search`, `number`
- All share the same shell

### Anatomy
```
┌────────────────────────────────────────────┐
│ Label (Geist 500 / 13px)                   │
│ ┌────────────────────────────────────────┐ │
│ │ [icon]  Placeholder text               │ │
│ └────────────────────────────────────────┘ │
│ Helper text / error                        │
└────────────────────────────────────────────┘
```

### States
- default: border `--border-default`
- focus: border `--border-strong`, outline 2px `--focus-ring` at 2px offset
- error: border `--danger`, helper text in `--danger`
- disabled: opacity 0.5, bg `--bg-raised`
- success (rare; used after async validation): border `--success`, leading checkmark icon in `--success`

### Specials
- **Trailing chip** for unit indicators (LPA, %, years): `<input /> <Chip>LPA</Chip>` inside the same shell
- **Clear button** appears when value present
- **Show/hide password** toggle for password type
- **Currency input** (`<MoneyInput>` wrapper): formats Indian comma grouping on blur, parses LPA shorthand on input ("18L" → 1800000)

### Sizes
Match Button sizes (sm/md/lg).

### Validation
- Validation runs on blur, not on every keystroke (less noisy)
- Server-side errors render below the input + animate in 200ms
- Success states are silent — no green checkmark on every valid field; only after a meaningful async validation (email verification, OTP)

---

## Select / Combobox

We use **Radix Select** for static lists, **`cmdk`** for searchable comboboxes (city picker, company picker, role picker).

### Combobox features
- Fuzzy search
- Keyboard nav (↑↓ Enter Esc)
- Recent selections shown first
- "No results" empty state with "Add custom" affordance for free-text-allowed pickers

### Multi-select chip pattern
For role tags, skill tags, locations:
- Selected items render as `Chip`s inside the input shell
- Backspace removes last chip
- Max items prop (e.g., `maxItems={5}`) — enforces limit, shows toast on overflow

---

## Tabs

Radix Tabs wrapped. Two visual styles:

### Underline tabs (default)
```
Discover | Saved | Applied | Offers
─────────  
```
- Active: text `--text-primary` 600 weight, 2px `--brand` underline
- Inactive: text `--text-secondary` 500
- Hover: text `--text-primary`

### Pill tabs (in dense rails, sidebars)
```
[ Discover ]  Saved   Applied
```
- Active: filled bg `--bg-raised`, text `--text-primary`
- Inactive: text `--text-secondary`

Tab indicator slides between active states (Framer Motion `layoutId`).

---

## Dialog

Radix Dialog wrapped.

### Anatomy
```
┌───────────────────────────────────────┐
│ Title           ┃              [✕]    │
│ ─────────────────────────────────────  │
│                                        │
│  Content                               │
│                                        │
│ ─────────────────────────────────────  │
│                       [Cancel] [OK]    │
└───────────────────────────────────────┘
```

- Max-width 480px (sm), 640px (md), 800px (lg)
- Scrim: `--bg-overlay` (teal-950 at 80% opacity) + backdrop-blur 8px
- Animates in: `enter` 320ms; out: `exit` 200ms
- Focus trapped on open; restored on close
- Esc closes; click-outside closes (unless `dismissible={false}`)

### Confirmation dialog (specialized)
Shorter; one sentence + 2 buttons. Used only when undo is impossible (delete account). Most "confirmations" should be **act-then-undo toasts** instead (see `01-design-principles.md` reversibility).

---

## Drawer

Right-edge or bottom (mobile) sliding panel.

- Right drawer: `400px` (sm) / `560px` (md) / `720px` (lg) wide
- Bottom drawer (mobile): uses [`vaul`](https://vaul.emilkowal.ski) with snap points `[0.4, 0.8, 1.0]`
- Same scrim treatment as Dialog
- Sticky header with title + close X
- Sticky footer with primary action (when applicable)
- Body scrolls internally

---

## Toast

[Sonner](https://sonner.emilkowal.ski/) — best React toast lib. Custom-themed.

### Variants
- `info` — neutral
- `success` — leading teal check icon
- `warning` — leading gold warning icon
- `danger` — leading gold-700 outlined icon (no red)
- `loading` — leading spinner
- `action` — has an action button (Undo, Retry, View)

### Positioning
- Desktop: top-right, stacks down
- Mobile: bottom-center, stacks up (above bottom tab bar)

### Duration
- `info`/`success`: 4s
- `warning`/`danger`: 6s
- `action`: 8s (more time to undo)
- `loading`: indefinite until promise resolves
- All: pause on hover, dismiss on swipe

### Undo pattern
```tsx
toast.action({
  message: "Job application sent.",
  actionLabel: "Undo",
  onAction: () => recallApplication(id),
  duration: 8000,
});
```

5-second undo budget per `01-design-principles.md` reversibility — `action` toast extends to 8s to cover slow readers.

---

## Tooltip

Radix Tooltip. Delay 500ms in, 0ms out. Positioning auto with collision avoidance.

- Background: `--bg-surface` with 1px `--border-subtle`
- Text: `--text-primary`, body-s
- Arrow: 8px, matched to background
- Max width 240px
- Animates in: scale 0.96 → 1, opacity 0 → 1, 120ms

For **non-trivial explanations** (algorithm reasoning, salary triangulation), use Popover instead — tooltips are for short labels only.

---

## Popover

Radix Popover. Click-triggered (not hover). Used for:
- "Why this score?" affordances on ghost score, referrer match, etc.
- Filter dropdowns
- User menu

### Anatomy
```
┌────────────────────────────────┐
│ Optional title                 │
│                                │
│ Content (scrollable if needed) │
│                                │
│ Footer button (optional)       │
└────────────────────────────────┘
```

Max-width 360px. Click-outside closes. Esc closes. Animates same as Tooltip but at 200ms.

---

## Badge / Chip

Two related but distinct components.

### Badge
Read-only label. No interactivity.
- Sizes: sm (16px tall), md (20px), lg (24px)
- Variants:
  - `neutral` — `--bg-raised` bg, `--text-secondary` text
  - `brand` — `--brand` text on `teal-50` bg (light) / `teal-800/40` bg (dark)
  - `accent` — `--accent` text on `gold-50` bg (light) / `gold-800/40` bg (dark)
  - `warning` — gold-text-on-gold-tint
  - `danger` — gold-700 text on gold-100 bg (light)
  - `outline` — transparent bg, 1px border in current color

### Chip
Interactive. Removable (× button) or selectable.
- Same sizes as Badge
- Removable: small × on the right; click → remove + animate out (scale 0 + fade, 120ms)
- Selectable: toggles fill on click

Used for: filter values, tag inputs, selected items in multi-select, skill tags.

---

## Avatar

Circular user image with fallback to initials.

- Sizes: xs (20), sm (24), md (32), lg (48), xl (64)
- Initials fallback: 2 chars max, on `--bg-raised` with `--text-primary`
- Status indicator (online dot) optional, bottom-right, `--brand` for online, neutral for offline
- Clickable variant has a 1px ring on hover (`--brand` for own avatar, `--accent` for "match" avatars in referral/cohort)

### AvatarStack
Overlapping avatars (used in cohort views, referral path previews).
- Max visible: 5; rest collapsed into `+N` chip
- Stagger overlap: -8px per avatar
- z-index increases left-to-right (or right-to-left in RTL)

---

## Progress

Two flavors:

### Linear progress bar
- Height: 4px (slim) or 8px (default)
- Track: `--bg-raised`
- Fill: `--brand` (or `--accent` for earned-progress, e.g., interview prep completion)
- Animated fill: width transition 480ms `emphasized`

### Circular / radial gauge
See `12-data-viz.md` for the gauge component used in ATS compatibility ring, ghost score, referrer match.

---

## Switch / Toggle

Radix Switch wrapped.

- 32×20 thumb on track
- Off: track `--bg-raised`, thumb `--bg-surface`
- On: track `--brand`, thumb white
- Spring `crisp` on flip
- Label always present (left of switch); description below in `--text-secondary`

---

## Checkbox / Radio

Radix Checkbox / Radio.

- 16×16 box, 2px border `--border-default`
- Checked: bg `--brand`, white check icon (path-draws over 200ms)
- Indeterminate (checkbox only): horizontal bar
- Radio: same dimensions, circular, dot fill on selected

---

## Slider

Radix Slider.

- 4px track
- Track filled (between 0 and value): `--brand`
- Track empty: `--bg-raised`
- Thumb: 16px circle, `--bg-surface` with 2px `--brand` border
- Drag: thumb scales to 20px with `--brand` ring shadow
- For salary range slider: dual-thumb variant

---

## Loader / Spinner

Single source of truth: Lucide `Loader2` rotating.

- Inline: 16px, `currentColor`
- Block (centered in container): 32px, `--brand`
- Page-level: 48px with optional descriptive text below

For longer waits (>2s), use a skeleton instead of a spinner. Spinners are for sub-1s actions; skeletons communicate the shape of what's coming.

---

## Skeleton

Pulsing placeholder for loading content.

- Background: `--bg-raised`
- Shimmer: diagonal gradient sweep, 1.4s linear infinite
- Match the height/width of the real content as closely as possible
- Pause under prefers-reduced-motion

```tsx
<Skeleton className="h-4 w-32" />
<Skeleton className="h-24 w-full" />
```

---

## Divider

Just a 1px line in `--border-subtle`. Sometimes labeled (e.g., "OR" between auth options).

---

## Code block

For settings/API key views and the (rare) developer surfaces.
- Mono font (JetBrains Mono)
- Bg `teal-900` (always dark even in light mode for readability)
- Syntax highlighting via [Shiki](https://shiki.style) with custom teal/gold theme
- Copy button top-right

---

## Keyboard shortcut display

Inline `<kbd>` styled component.

```
⌘K   Esc   ↵
```

- Inline within text: 14×14, mono, 1px border, 4px radius, 0 6px padding
- In tooltips: same but smaller (12×12)
- Multi-key separator: `+` or none (visual gap)

---

## Component contract checklist

Every primitive ships with:
- ✅ Forward ref support
- ✅ `className` prop merged via `clsx`/`cn`
- ✅ `aria-*` attributes complete
- ✅ Keyboard parity (no mouse-only interactions)
- ✅ `disabled` state
- ✅ Storybook story covering all variants × states
- ✅ Visual regression test (Chromatic / Playwright screenshot)
- ✅ Unit test for behavior (Testing Library)
- ✅ Reduced-motion variant
- ✅ Light + dark mode parity
- ✅ Tested on mobile Safari + Android Chrome

A primitive doesn't merge until all 10 are green.
