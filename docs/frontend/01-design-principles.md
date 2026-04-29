# 01 — Design Principles

> **One-line stance: Calm precision over hype.**
>
> The product's value is *less volume, more precision*. The interface must visually argue this every second the user is looking at it. If a screen feels noisy, gamified, or busy, it is selling the wrong product.

These principles are the tie-breaker when two design choices conflict.

---

## The seven principles

### 1. Earned density
Information density is a feature. The user is comparing 40 listings, scoring referrers across 6 axes, evaluating salary triangulation from 5 sources. Pretending they want "minimalist" white space wastes their attention.

But density must be **earned** — every visible pixel must carry signal. The opposite of minimalism is not clutter; it's density-with-hierarchy. We use:

- Tight 4px-base spacing (see `04-spacing-grid-layout.md`)
- Typographic hierarchy doing the load-bearing, not boxes
- Hover-to-expand for tertiary detail
- Progressive disclosure (peek → drawer → full screen)

**Anti-pattern:** Material Design "card-in-card-in-card" hierarchies. We render flat with type weight, not nested chrome.

---

### 2. The product whispers
Many users (Priya, Karan personas) are searching while currently employed. A loud product is a leak.

- **No celebration confetti** when an application sends. A subtle gold tick + soft toast.
- **No dopamine streaks**, no "5 days in a row!" badges. We're not Duolingo.
- **No bright red error states.** Errors render in a muted teal-with-warning treatment (see color system).
- **Notifications respect "Do Not Disturb."** PWA push opts in only after explicit consent.
- **Tab favicon does not flash** even on background completion.

The exception: ⭐ moments that the *user* explicitly asked for — a referral reply lands, an offer arrives — get a small gold pulse animation. Earned, not awarded.

---

### 3. India-native, not localized
"Localized" means an English-first product translated. "India-native" means the defaults are correct from the start.

- ₹ symbol everywhere, never $ as the default
- Salary in **LPA** (₹18L), not annual figure (₹1,800,000) — but offer comparisons show absolute numbers
- City badges show **tier** (T1/T2/T3) alongside name — `Bangalore · T1`
- Notice period is a first-class field everywhere a job is shown
- Indic script fallbacks render at parity, not as second-class
- Festival/regional calendar awareness for "best time to apply" hints (Diwali freeze, March-end FY hiring spike)

---

### 4. Stealth as a posture
Stealth Mode is a feature (#7), but stealth is also a **default disposition**:

- "Public profile" pages are off by default
- LinkedIn share buttons are explicitly opt-in per action
- The default resume variant strips current employer name
- Email digests are sent at 6:00 AM IST (before the workday) by default
- Any feature that produces public artifacts (Reverse Job Board #11) is gated behind a clear consent screen

---

### 5. Trust through transparency
The product makes opinionated, sometimes scary claims: "this is a ghost job," "this company is on fire," "real salary band is ₹18–24L." Users only act on these if they can audit the reasoning.

Every algorithmic claim shows its sources:

- **Ghost score 0.78** → tap → see 5 signals contributing
- **Salary range ₹18–24L** → tap → see Levels.fyi, AmbitionBox, Reddit, recruiter-other-postings, with weights
- **Referrer score 0.62** → tap → recency, mutual, tenure, seniority breakdown
- **Bond detected** → tap → exact JD line + 3 Glassdoor review excerpts

Black-box AI loses the user's trust the first time it's wrong. White-box AI keeps the user even when it's wrong, because they can see *why* it was wrong and override.

---

### 6. Reversibility everywhere
Users panic-click. They click "send referral DM" and immediately regret. They mass-select 30 jobs and apply, then realize one was a competitor.

- **5-second undo** on every irreversible action (DM send, application submit, profile change). Toast with "Undo" button + countdown ring.
- **Soft-delete** for everything; 30-day recovery via Trash
- **Drafts persist** automatically every 2s; survive tab crash
- **Confirmation dialogs only when undo is impossible** (deleting account, deleting paid plan). Otherwise: act first, allow undo.

---

### 7. Performance as design
A 100ms slower interaction is a worse interaction, regardless of how it looks. On the target device (sub-₹15k Android, throttled 4G):

- **Initial route render < 1.5s** on 4G
- **Interactive < 2.5s**
- **No CLS** above 0.05
- **Animations targeting 60fps** on the floor device, or auto-disabled
- **Skeleton states never block real content** — render what we have, hydrate what we don't

When a beautiful animation can't run smoothly, it's cut. Calm precision means it works.

---

## Tone-of-voice principles (microcopy)

These bind copywriting across all modules.

| Principle | Do | Don't |
|---|---|---|
| **Direct** | "23 jobs match your filter." | "We found you some great opportunities!" |
| **Honest about probability** | "Salary likely ₹18–24L, 70% confidence." | "Estimated salary: ₹20L." |
| **No hustle culture** | "5 strong matches today." | "🚀 You crushed it! 12 applies sent!" |
| **India-aware** | "30-day notice period." | "Two-week notice." |
| **Plain about failure** | "DM not sent — LinkedIn rate-limit. Retry in 4h." | "Oops! Something went wrong." |
| **Respect the user's time** | "Skip onboarding ›" always reachable. | Forced 7-step welcome tours. |

Microcopy specifics live inside each module doc. Tone is universal.

---

## Inspirational tightropes

We are calibrating between extremes. Use these reference points to triangulate.

| Axis | Too much | We aim here | Too little |
|---|---|---|---|
| Density | Bloomberg Terminal | **Linear / Vercel dashboard** | Stripe marketing site |
| Motion | Apple Vision Pro promo | **Linear hover-states + Framer Motion springs** | Static SSR site |
| Color saturation | Robinhood (greens screaming) | **Arc Browser, muted Notion dark mode** | Pure grayscale |
| Personality | Duolingo gamified | **Raycast — competent, dry, slightly clever** | Banking dashboard |
| Editorial weight | Apparel.so / Sentry redesign | **Stripe docs — quietly handsome serifs** | Bootstrap default |

If you're ever unsure: **What would Linear do?** is a defensible default. Then add 10% more editorial weight (Fraunces display) and 5% more gold to differentiate.

---

## When principles conflict

Earned density vs. the product whispers — sometimes a dense screen feels loud. Resolve by **moving signal into type hierarchy** (size + weight) rather than into color or chrome. The result is dense but quiet.

Trust through transparency vs. earned density — surfacing every AI claim's sources can balloon a card. Resolve by **collapsing sources behind a "why?" affordance**, never hiding them entirely.

Stealth as a posture vs. distribution (browser extension #17) — public artifacts conflict with stealth. Resolve by **per-feature consent**, never global "make everything public" toggles.
