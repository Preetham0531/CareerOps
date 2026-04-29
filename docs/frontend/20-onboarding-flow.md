# 20 — Onboarding Flow

## Purpose
Get a new user from "I just landed on the site" to "I have a usable workspace" in **under 7 minutes** without scaring them off. Onboarding is also where we establish trust (DPDP consent, stealth posture, expectations setting).

## Personas served
All four — but the flow branches based on persona signal collected in Step 2.

## Entry points
- Marketing site CTA → `/start`
- Direct `/start` link
- Browser extension first-install → `/start?source=ext`
- Cohort invite link → `/start?cohort=<id>` (skips Step 5)
- Returning incomplete user → resume at last step

## Key screens

### Step 0 — Marketing hero (pre-onboarding)

```
┌────────────────────────────────────────────────────────┐
│ [Aurora gradient hero with shader mesh background]      │
│                                                          │
│   The job search agent built for India.                 │
│   Find roles, prove your skills, engineer referrals,    │
│   and land offers — surgically, not by spamming.        │
│                                                          │
│           [Start your search ›]    [Watch 90s demo]     │
│                                                          │
│   ⌘ Free to start. No credit card. DPDP-compliant.      │
└────────────────────────────────────────────────────────┘

[Marquee strip of company logos: "Where our users land"]

[Bento grid: 4 feature spotlights — Referral, Skill Prover, 
 Salary Leak, Ghost Radar]

[Testimonial section - to be designed]

[Footer]
```

Tactics deployed: aurora gradient, kinetic-type hero (Fraunces wght 400→700 morph on mount), scroll-driven feature reveal, magnetic primary CTA, marquee logos, bento grid.

### Step 1 — Sign-in / sign-up

Unified screen, mode toggled by detected email (existing → sign in, new → sign up).

```
┌────────────────────────────────────────────┐
│ Continue your search                        │
│ (or, for new users:) Start your search      │
│                                              │
│ ┌────────────────────────────────────────┐ │
│ │ Email or phone                          │ │
│ │ [_______________________________]       │ │
│ └────────────────────────────────────────┘ │
│                                              │
│           [Continue ›]                       │
│                                              │
│ ──────── or continue with ────────           │
│                                              │
│ [LinkedIn]  [Google]  [GitHub]               │
│                                              │
│ By continuing you agree to our DPDP-aligned  │
│ privacy notice. [Read it]                    │
└────────────────────────────────────────────┘
```

- **Phone OTP** primary, email OTP secondary, OAuth tertiary
- Why: Indian users prefer phone-OTP (low email penetration in tier-2/3)
- LinkedIn OAuth strongly encouraged but not required (some users want stealth-from-day-one)
- Privacy notice link opens drawer — see `36-settings-billing.md` DPDP center

### Step 2 — Persona discovery

Light-touch, 3-question screen. We don't call it "tell us about yourself" — we frame it as helping us help them.

```
┌────────────────────────────────────────────┐
│ Step 2 of 6 ━━━━━○────────────  [Skip ›]  │
│                                              │
│ Where are you in your search?               │
│                                              │
│ ○ Currently employed, looking quietly        │
│ ○ Actively searching, not yet placed         │
│ ○ Fresher / recent graduate                  │
│ ○ Returning to work after a break           │
│ ○ Just exploring                             │
│                                              │
│ How urgent is this?                          │
│                                              │
│ ○ Today / this week                          │
│ ○ Within a month                             │
│ ○ 1–3 months                                 │
│ ○ No specific timeline                       │
│                                              │
│ What's your top priority?                    │
│                                              │
│ ○ Better compensation                        │
│ ○ Better company / role                      │
│ ○ Remote / hybrid flexibility                │
│ ○ Career change                              │
│ ○ First job                                  │
│                                              │
│                                  [Continue ›]│
└────────────────────────────────────────────┘
```

Branching logic from this:
- "Currently employed" → enables Stealth Mode by default at end
- "Fresher / recent graduate" → routes to Fresher Mode (#33) flow on dashboard
- "Returning to work after a break" → surfaces resume gap helper, women's-network features
- Other choices set default filter values

### Step 3 — Resume upload + parsing

```
┌────────────────────────────────────────────┐
│ Step 3 of 6 ━━━━━━━○────────  [Skip ›]    │
│                                              │
│ Upload your CV                               │
│                                              │
│ We'll parse it once and reuse it across     │
│ portals. Your data stays yours — DPDP        │
│ Act-aligned, deletable any time.             │
│                                              │
│ ┌────────────────────────────────────────┐ │
│ │                                          │ │
│ │       [📄 Drop your CV here]             │ │
│ │       or click to browse                 │ │
│ │                                          │ │
│ │       PDF · DOCX · 10MB max              │ │
│ │                                          │ │
│ └────────────────────────────────────────┘ │
│                                              │
│ Or paste your LinkedIn URL                   │
│ [_____________________________________]      │
│                                              │
│   ☐ Don't have a CV? Build one now ›        │
└────────────────────────────────────────────┘
```

States:
- **Idle** — drop zone with dashed border
- **Drag-over** — border becomes solid `--brand`, bg `teal-50/30`
- **Uploading** — progress ring + filename
- **Parsing** — animated dots: "Reading your CV..." (~2–4s)
- **Parsed (success)** — preview of extracted fields with edit affordances
- **Parse error** — fallback to manual form

Parsed preview screen:

```
┌────────────────────────────────────────────┐
│ We found this.  Edit anything that's wrong. │
│                                              │
│ Name                                         │
│ [Aman Sharma                              ]  │
│                                              │
│ Email                Phone                   │
│ [aman@gmail.com  ]   [+91 98765 43210]      │
│                                              │
│ Current role                                 │
│ [Senior Software Engineer at Razorpay     ]  │
│ (Hide from your CV?  ☐ Yes, in stealth)     │
│                                              │
│ Skills (12 found)                            │
│ [Python] [Django] [PostgreSQL] [+9 more]    │
│                                              │
│ Education                                    │
│ [VIT, B.Tech CSE, 2018–2022]                │
│                                              │
│                            [Confirm ›]       │
└────────────────────────────────────────────┘
```

### Step 4 — Filter setup (target preferences)

```
┌────────────────────────────────────────────┐
│ Step 4 of 6 ━━━━━━━━━━○────  [Skip ›]    │
│                                              │
│ What are you looking for?                    │
│                                              │
│ Roles                                        │
│ [ Backend Engineer × ] [ Software Engineer × ]│
│ [+ Add another role]                         │
│                                              │
│ Salary range (LPA)                           │
│ ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●            │
│ ₹18L  ───────────────────  ₹35L              │
│                                              │
│ Location                                     │
│ ☑ Bangalore · T1                             │
│ ☑ Remote (India-anywhere)                    │
│ ☐ Mumbai · T1                                │
│ ☐ Hyderabad · T1                             │
│ [+ Add city]                                 │
│                                              │
│ Work mode                                    │
│ ☑ Remote   ☑ Hybrid   ☐ Onsite             │
│                                              │
│ Notice period                                │
│ Currently serving: [60 days ▾]               │
│ Negotiable to:    [30 days ▾]                │
│                                              │
│                            [Continue ›]      │
└────────────────────────────────────────────┘
```

Smart defaults:
- LPA range pre-filled from CV parsing (current CTC + 30% upward target)
- Cities pre-filled from current job location + tier-1 metros
- Roles pre-filled from CV "current title" with smart variations

### Step 5 — Network connect (referral graph seed)

```
┌────────────────────────────────────────────┐
│ Step 5 of 6 ━━━━━━━━━━━━○──  [Skip ›]    │
│                                              │
│ Connect your network                         │
│                                              │
│ Most Indian hires happen through referrals.  │
│ We'll find paths into companies you target — │
│ but we need access to your network first.    │
│                                              │
│ [Connect LinkedIn]                           │
│                                              │
│ ☐ Also connect:                              │
│   ☐ Naukri profile                           │
│   ☐ GitHub (for skill-claim evidence)        │
│   ☐ LeetCode                                 │
│   ☐ Kaggle                                   │
│                                              │
│ DPDP-aligned: we store only what's needed,   │
│ deletable any time. [Read details]           │
└────────────────────────────────────────────┘
```

OAuth flows open in a new window per provider. After return, "Connecting..." spinner → confirmation.

Connections form the seed for the referral graph (#23) and skill claim prover (#24).

### Step 6 — Stealth + delivery preferences

Defaults set by Step 2 persona answer.

```
┌────────────────────────────────────────────┐
│ Step 6 of 6 ━━━━━━━━━━━━━━━○  [Finish ›] │
│                                              │
│ Stealth mode   [● ON]                        │
│                                              │
│ ✓ Hide profile from current employer         │
│ ✓ Use pseudonym variant of your CV           │
│ ✓ Send applies after-hours only              │
│                                              │
│ Notifications                                │
│ Email digest   ● Daily 6:00 AM IST           │
│ WhatsApp       ○ When match score > 90%      │
│ Push           ○ Off                          │
│                                              │
│ Voice                                        │
│ ☐ Enable voice interface (Hindi, English,    │
│   Tamil, Telugu)                             │
│                                              │
│                       [Take me in ›]         │
└────────────────────────────────────────────┘
```

Tap "Take me in" → confetti-free fade transition into the dashboard with a one-line gold-accented welcome banner: "Welcome, Aman. We're searching your network now."

## State diagram

```
[unauth]
  → /start (marketing)
    → click CTA → [step1: auth]
                  → OTP success or OAuth → [step2: persona]
                                            → [step3: resume]
                                              ↓ skip
                                              [step3-skipped]
                                                ↓
                                            → [step4: filters]
                                              ↓ skip
                                              [step4-defaults]
                                                ↓
                                            → [step5: network]
                                              ↓ skip
                                              [step5-skipped]
                                                ↓
                                            → [step6: prefs]
                                              ↓
                                            → [dashboard]
```

User can navigate back anytime; data persists. Skipping a step marks it in `onboarding.completed[step]: false` and surfaces a gentle nudge on the dashboard ("complete your network connection — referrers waiting").

## Data model (frontend slice)

```ts
interface OnboardingState {
  step: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  completed: Record<string, boolean>;
  persona: 'employed-quiet' | 'active' | 'fresher' | 'returner' | 'exploring';
  urgency: 'this-week' | 'this-month' | '1-3m' | 'open';
  priority: 'comp' | 'company' | 'flex' | 'change' | 'first-job';
  resume: ResumeData | null;
  filters: FiltersData;
  connections: { linkedin: boolean; naukri: boolean; github: boolean; ... };
  preferences: PreferencesData;
}
```

State persisted in:
- Server: `users.onboarding` JSONB column (resume across devices)
- Local: Zustand with `persist` middleware (resume after refresh)

## Interactions & micro-animations

- Progress bar at top: 6 dots with connector lines, current dot pulses gold-400
- Step transitions: View Transitions API, slide + crossfade 320ms `emphasized`
- Resume parsing: dot sequence loader; on success, parsed-fields card flip-in
- Network connect: each connected provider shows a small `EvidenceLeaf` icon spawn animation
- Final "Take me in" button: magnetic effect; on click, gold particle ring expands radially

## Empty / loading / error states

- Resume parse fails: error banner + manual form fallback (prefilled with whatever was extracted)
- LinkedIn OAuth declined: skip with note "We can do this later — many features still work without it."
- All steps optional except Step 1 (auth) — user can skip directly to dashboard. Skipped steps show as TODO chips on dashboard.

## Edge cases & India-specific gotchas

- **Multi-part names** — single "Full name" field, no "First / Last" split
- **No PAN/Aadhaar requested** — we don't need it, and sensitivity is real
- **Phone OTP fallback to email** — OTP SMS unreliable on some carriers; offer email after 60s
- **LinkedIn data sometimes truncated** for India users (rate-limit) — partial connection still useful, marked with chip
- **CV in regional language** (Hindi/Tamil/Telugu) — parser handles via Tesseract + Indic OCR; if fails, user is offered "build CV from scratch" flow
- **No social-stigma fields**: no caste, no religion, no marital status, no photo required

## Cross-doc links

- Tone & copy: `01-design-principles.md`
- Color: `02-color-system.md`
- Aurora gradient + kinetic type: `07-trending-design-tactics.md`
- Phone OTP / OAuth: backend doc TBD
- Privacy notice + DPDP: `36-settings-billing.md`
- After completion → routes to: `21-dashboard.md`

## Open questions

1. Should we A/B test "Step 2 persona" placement (before vs. after auth)? — initially lean on after-auth so we have a user record to update; revisit on metrics.
2. Should resume parse run on-device (privacy) or server (better LLM access)? — current plan: client-side rough parse (PDF.js + regex), server-side enrichment after consent.
3. How aggressive should the "complete your network" nudge be on dashboard if Step 5 was skipped? — one-time soft banner, dismissible. Re-surface only if a high-value referral is detected on a job they bookmark.
