# 14 — Accessibility

> WCAG 2.2 AA is the floor, not the ceiling. Many users are job-hunting from public phones, slow networks, with assistive tech. Accessibility is product correctness.

---

## Compliance targets

- **WCAG 2.2 AA** for all production surfaces
- **WCAG 2.2 AAA** for content readability (body copy contrast ≥ 7:1)
- **EN 301 549** (EU) compliance (we may serve users in EU diaspora)
- **DPDP Act 2023** (India) — accessibility is implicit in "fair processing" and explicit in some sectoral guidelines
- **Mobile a11y standards** (Android TalkBack, iOS VoiceOver) parity with desktop

---

## The seven categories we audit

Borrowed from W3C-WAI organization; these are the headings every PR must consider:

1. Perceivable
2. Operable
3. Understandable
4. Robust
5. Cognitive
6. Linguistic
7. Cultural

---

## 1. Perceivable

### Color & contrast
- Body text ≥ 7:1 (AAA)
- UI text ≥ 4.5:1 (AA)
- Large text (≥18px or 14px bold) ≥ 3:1
- Graphic objects (icons, charts) ≥ 3:1 against bg
- Color is **never the sole encoder** of meaning. Pair with text, icon, shape, or position.
  - Examples: ghost-job pill has icon + label, not just gold tint
  - Salary delta has arrow icon + sign, not just color
  - Error state has icon + text, not just border color

### Text alternatives
- Every meaningful image has `alt`
- Decorative images: `alt=""` + `aria-hidden="true"`
- Charts: `<title>` + `<desc>` + textual data table fallback
- Icons that convey meaning: `aria-label`
- Icon-only buttons: required `aria-label`

### Adaptable
- Semantic HTML — never use `<div>` for a button
- Document outline: `<h1>` per page, `<h2>` per section, etc.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
- Form labels: programmatic association via `<label htmlFor>` or `aria-labelledby`
- Tables: `<th>` with `scope`, `<caption>`

### Distinguishable
- Audio-only / video-only have transcripts
- Auto-playing video disabled in product chrome (only manually-triggered in onboarding)
- Text resize to 200% must not break layouts (use rem, not px, for type)
- Line-height ≥ 1.5× for body
- Paragraph spacing ≥ 2× font size (margin-bottom ≥ 32px on body p)
- Letter-spacing ≥ 0.12× font size (we use 0 — ok per spec, but content authors must not override)
- Word-spacing ≥ 0.16× font size

---

## 2. Operable

### Keyboard
- **Every interaction reachable by keyboard.** No mouse-only.
- Tab order matches visual order
- Focus indicators always visible — gold 2px outline at 2–3px offset
- Focus is **never invisible** even on dark surfaces (focus-ring is gold, contrasts with both)
- Skip-to-content link first focusable element
- Trap focus inside modals; restore on close
- Esc closes modals/popovers/menus
- Arrow keys navigate within composite widgets (tabs, menus, listboxes)

### Common shortcuts
| Action | Keys |
|---|---|
| Command palette | ⌘K (Mac) / Ctrl+K (Win/Linux) |
| Close modal | Esc |
| Submit form | ⌘↵ / Ctrl+↵ |
| Save (bookmark job) | S (when JobCard focused) |
| Apply | A (when JobCard focused) |
| Hide | H (when JobCard focused) |
| Toggle theme | ⌘Shift+T |
| Toggle stealth mode | ⌘Shift+S |
| Toggle voice | ⌘Shift+V |
| Search | / (universal) |
| Help | ? |

Shortcut docs accessible at any time via `?` key → modal.

### Timing
- No time limits on user actions, except auth OTP (necessary for security; clearly displayed)
- Auto-logout warning at T-2min with extension button
- Session timeout: 7 days default (DPDP-aware), extendable

### Seizures
- No flashing > 3Hz
- Confetti is one-shot, gold particles, not strobing
- Loading spinner is monochrome teal, not multicolor

### Navigable
- Page titles describe content (`<title>` per route)
- Link purpose clear from text alone (or `aria-label`); never "click here"
- Multiple ways to find content: nav, search, ⌘K palette, breadcrumb
- Skip links to main / nav / search / footer

### Input modalities
- Touch targets ≥ 44×44px
- Pointer gestures all have alternatives (drag → buttons)
- Motion-actuated controls (gyro tilt) optional + alternatives
- Concurrent input methods supported (mouse + keyboard simultaneously)

---

## 3. Understandable

### Readable
- `<html lang>` set per page (`en` default, `hi` etc. per content)
- Indic content wrapped in `<span lang="hi">` etc.
- Idiomatic plain English; no jargon without definition (glossary in `00-overview.md`)
- Acronyms expanded on first use: "ATS (Applicant Tracking System)"
- Reading level: aim for grade 8–10 in product copy

### Predictable
- Consistent navigation across pages
- Components behave consistently (a JobCard always behaves like a JobCard)
- No automatic context changes on focus (focusing a tab doesn't switch tabs; you must press Enter/Space)
- Form submission is explicit — no auto-submit on field change

### Input assistance
- Labels + helper text + error messages
- Error messages are specific and actionable ("Phone must be 10 digits, not 9")
- Suggestions on errors when possible
- Critical actions (delete, send DM) require explicit confirmation OR have undo
- Reversible actions are preferred over confirmations (see `01-design-principles.md`)

---

## 4. Robust

### Compatible
- Valid HTML
- ARIA used correctly: only when native HTML can't express the role
- Semantic roles (`role="navigation"`, `role="button"` etc.) only when needed
- No conflicting ARIA + native semantics
- All custom widgets follow ARIA Authoring Practices Guide (APG) patterns

### Tested with
- NVDA + Firefox (Windows)
- JAWS + Chrome (Windows)
- VoiceOver + Safari (Mac, iOS)
- TalkBack + Chrome (Android)
- Keyboard-only across all browsers

---

## 5. Cognitive accessibility

Less strictly defined in WCAG but critical for our user base (multi-language, varying digital literacy).

- **Plain language** — see `01-design-principles.md` tone-of-voice
- **One primary action per screen** — never make the user choose between 5 buttons
- **Progress indicators** in multi-step flows (onboarding, negotiation)
- **Confirmation copy** repeats what was done ("Application sent to Razorpay" not "Done")
- **Avoid sarcasm, idioms, regional metaphors** in error messages
- **Consistent terminology** — never call the same thing "applies" / "applications" / "submissions"

Glossary terms always linked from first appearance in flows where they're unfamiliar (e.g., "ATS-friendly" → tooltip explainer).

---

## 6. Linguistic accessibility

The product ships in English first; v0.1 adds Hindi; v0.2 adds Tamil, Telugu, Bengali, Marathi, Kannada.

- Right-to-left not currently supported (no RTL Indian languages); design tested LTR only
- Indic fonts shipped per language (Noto Sans family) — see `03-typography.md`
- Localization keys in JSON; no hardcoded strings
- Pluralization handled via ICU MessageFormat (`{count, plural, one {1 application} other {# applications}}`)
- Date/time formatted per locale (DD-MM-YYYY for India default)
- Currency in ₹ + Indian comma grouping

Localized content uses `<span lang="<code>">` so screen readers switch voice.

---

## 7. Cultural accessibility

Subtle, often missed:
- **Names** can have varying conventions — first, last, single name, multi-part. Form: single "Full name" field, not "First / Last."
- **Caste / religion** never asked or surfaced (legally and ethically inappropriate; some Indian forms still do this — we never)
- **Photos** in profile are optional (cultural pressure to look "professional" varies)
- **English-fluency** not required for the product to work — voice mode in Hindi/Tamil/Telugu, plain-language copy
- **Salary expectations** not mandatory in profile (sensitive in India)

---

## ARIA patterns we use

Following [W3C ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/):

| Component | Pattern |
|---|---|
| Tabs | `role="tablist"`, `role="tab"`, `role="tabpanel"` |
| Combobox | `role="combobox"` with `aria-expanded`, `aria-controls`, `aria-activedescendant` |
| Listbox | `role="listbox"`, `role="option"` |
| Menu | `role="menu"`, `role="menuitem"`, arrow nav |
| Dialog | `role="dialog"`, `aria-modal="true"`, focus trap |
| Toast | `role="status"` (info/success) or `role="alert"` (warn/danger) with `aria-live` |
| Progress | `role="progressbar"` with `aria-valuemin/max/now` |
| Disclosure | native `<details>`/`<summary>` where possible |

Radix UI handles most of these correctly out of the box; we verify with axe.

---

## Tooling

- **eslint-plugin-jsx-a11y** — lint rules in CI
- **axe-core** via `@axe-core/playwright` — automated a11y tests run on every PR
- **Pa11y** for full-page audits in nightly CI
- **Storybook a11y addon** (`@storybook/addon-a11y`) — every story checked
- **Manual screen reader audit** before each major release

CI gate: zero axe violations of severity `serious` or `critical`.

---

## Testing checklist (per PR)

- [ ] All interactive elements reachable by Tab
- [ ] All interactive elements have visible focus
- [ ] All form inputs have labels
- [ ] All images have alt text (or alt="" if decorative)
- [ ] All buttons / icon-only have accessible names
- [ ] Color contrast verified for new UI
- [ ] Tested with reduced-motion
- [ ] Tested with screen reader (NVDA on Win, VoiceOver on Mac)
- [ ] Heading hierarchy correct
- [ ] No keyboard traps (other than intentional modal traps)
- [ ] Error messages programmatically associated with fields
- [ ] Live regions used appropriately for dynamic content

---

## Anti-patterns

- ❌ `<div onClick>` instead of `<button>`
- ❌ Removing focus outlines without replacing them
- ❌ `tabIndex` other than 0 or -1
- ❌ ARIA roles that fight native semantics (`<a role="button">`)
- ❌ `aria-label` that disagrees with visible text
- ❌ Toggle buttons without `aria-pressed`
- ❌ Animated content without pause control
- ❌ "Click here" link text
- ❌ Color-only indicators (red border but no error text)
- ❌ Auto-play audio anywhere
- ❌ Text-as-image where possible (decorative only, with alt)
- ❌ Captchas without alternatives
- ❌ Touch targets < 44×44

---

## When trade-offs surface

A common "the design is prettier without focus rings" debate. **Resolution: always keep keyboard focus visible.** If the design feels worse, the design is wrong. Adjust the focus ring style (offset, color tone) — never remove it.

A common "skip the alt text on decorative illustration" laziness. **Resolution: `alt=""` is the correct answer**, not omitting the attribute.

A common "the modal is so quick, who needs focus trap" thought. **Resolution: focus trap costs 4 lines of code with Radix; just do it.**
