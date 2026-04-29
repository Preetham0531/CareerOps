# 27 — Stealth Mode

## Purpose
Many users (Priya, Karan personas) are job-hunting while currently employed. Their employer must NEVER find out. Stealth Mode is a posture that makes this safe by default.

## Personas served
Priya (mid-career SDE, currently at fintech), Karan (senior PM, executive whisper-network). Some Anjali (re-entering after maternity, employer might be sensitive). Less for Ravi (fresher, no current employer to hide from).

## Entry points
- Onboarding Step 6 → toggled by Step 2 persona answer
- Side nav → 🛡️ icon
- ⌘K → "Toggle stealth mode"
- Settings → Stealth tab

## Layout

### Stealth control panel (settings sub-route)

```
┌─────────────────────────────────────────────────┐
│ STEALTH MODE                                     │
│                                                   │
│ State: [● ON]    Last enabled 2026-04-01         │
│                                                   │
│ ─────────────────────────────────────────────── │
│ WHAT YOUR CURRENT EMPLOYER SEES                 │
│                                                   │
│ [Live preview of public LinkedIn / Naukri view  │
│  filtered to "current-employer-domain users"]    │
│                                                   │
│ Profile photo:    [your photo, unchanged]        │
│ Headline:         "Software Engineer"            │
│                   (hidden: "Open to work")       │
│ Activity:         (hidden: 3 recent likes,       │
│                   2 saved jobs, 1 application)   │
│ Saved jobs:       (hidden: 12 saves)             │
│ "Open to work":   (hidden)                       │
│                                                   │
│ Verdict: ✓ Invisible to your current employer    │
│                                                   │
│ ─────────────────────────────────────────────── │
│ STEALTH RULES (current)                          │
│                                                   │
│ ☑ Hide profile from <current-employer-domain>    │
│ ☑ Block company recruiters from seeing your view │
│ ☑ Use pseudonym variant of CV                    │
│ ☑ Send applies in off-hours window only          │
│   (window: [22:00 ▾] – [07:00 ▾] IST)            │
│ ☑ Disable "share profile updates" on LinkedIn    │
│ ☑ Strip current employer name from CV variant    │
│   (replaced with: "Series-B fintech ~200 emp")   │
│ ☑ Hide current-employer-domain emails in OAuth   │
│ ☐ Mute notifications during work hours (9–18 IST)│
│ ☐ Pause auto-apply during 9–18 IST              │
│                                                   │
│ ─────────────────────────────────────────────── │
│ CURRENT EMPLOYER                                 │
│ [Razorpay  (razorpay.com)] [Edit]                │
│                                                   │
│ Also block recruiters from these companies:      │
│ [+] Add company                                  │
│                                                   │
│ ─────────────────────────────────────────────── │
│ STEALTH ACTIVITY LOG (last 30d)                  │
│                                                   │
│ • 12 jobs viewed — all in off-hours window ✓    │
│ • 4 applies sent — all from pseudonym CV ✓     │
│ • 0 visible LinkedIn updates ✓                  │
│ • 1 referrer DM sent — at 22:14 IST ✓           │
│                                                   │
│ Anomaly check: ✓ no leaks detected               │
│                                                   │
└─────────────────────────────────────────────────┘
```

### Stealth indicator (always visible when active)

In top bar when stealth mode is ON: small `🛡️ Stealth` chip, gold-400 outline, neutral text. Click → opens stealth panel.

### Stealth-mode visual differences across the product

When stealth mode is on:
- Top bar pseudo-banner is invisible to anyone screen-sharing accidentally (no big banner)
- All "share" / "make public" / "broadcast" actions across the app gain a `🛡️` warning icon
- Browser extension shows a subtle gold border on its sidebar
- "Notifications" digest is sent at 6:00 AM IST default (off-work hours)

## Off-hours window

Default: 22:00 – 07:00 IST.

The window is enforced for:
- Applications (queued, sent in window)
- Referrer DMs (queued, sent in window)
- Profile updates / CV uploads to portals
- Public-facing actions (Naukri last-active timestamp updates)

User can set window per-day if desired (advanced).

## Pseudonym CV variant

Auto-generated when stealth toggled on:
- Current employer name replaced with sector-and-size descriptor
- Specific recent metrics either redacted or generalized ("led team of N" instead of "led the auth team of 8")
- Photo stripped from CV by default
- Email replaced with anonymized forwarder address (`xyz@careerops-mail.in` → forwards to user)

User can edit the auto-pseudonymization if it's too aggressive.

## "What your current employer sees" preview

Polls a public LinkedIn search using a controlled persona to verify what someone at the user's current employer would see. Refreshes daily, on demand, and after every settings change.

If anything visible to current employer changes, an alert fires immediately:
> "Your LinkedIn profile shows up to <current-employer-domain> recruiters. Open Stealth panel to fix."

## State diagram

```
[stealth: off]
  → user toggles on
     [running stealth checks...]
     → [pseudonym CV generated]
     → [LinkedIn rules updated via API]
     → [Naukri profile visibility updated]
     → [activity log starts]
  [stealth: on]
     ↓ user toggles off
     [confirmation dialog]
     [reverting...]
     [stealth: off]
```

## Data model

```ts
interface StealthState {
  enabled: boolean;
  enabledAt: Date | null;
  rules: {
    hideFromCurrentEmployer: boolean;
    blockRecruiters: boolean;
    pseudonymCV: boolean;
    offHoursOnly: boolean;
    offHoursWindow: { start: string; end: string };
    disableLinkedInUpdates: boolean;
    stripEmployerFromCV: boolean;
    pseudonymDescriptor: string;
    blockOAuthEmails: boolean;
    muteWorkHours: boolean;
    pauseDuringWorkHours: boolean;
  };
  currentEmployer: { name: string; domain: string };
  blockedCompanies: { name: string; domain: string }[];
  activityLog: StealthActivity[];
  lastEmployerVisibilityCheck: { at: Date; verdict: 'invisible' | 'leaks-detected'; details: string };
}
```

## Interactions & micro-animations

- Toggle on: shield icon scales up + gold pulse; stealth chip materializes in top bar
- Toggle off: confirmation dialog (this one IS gated; reverting takes ~10s); shield fades on success
- Anomaly alert: gold-bordered toast, persistent until dismissed or fixed
- Settings change: "Verifying with LinkedIn..." spinner inline, then confirmation tick

## Empty / loading / error states

- **First-time toggle**: walks user through what stealth does (4-step coachmark sequence); takes < 60s
- **LinkedIn API rate-limited**: stealth still works locally; visibility check delayed; shown as "Re-checking visibility in 4h"
- **OAuth disconnected**: full stealth requires connected accounts; partial stealth (CV pseudonym, off-hours queue) works without
- **Verification failed**: alert with what's visible + how to fix

## Edge cases & India-specific gotchas

- **Family / spouse access** — many Indian users share laptops; no auto-login; PIN/biometric for stealth panel access optional
- **Office Wi-Fi detection** — when on a known office Wi-Fi, app blurs sensitive surfaces by default; quick-hide hotkey (⌘Shift+H)
- **WhatsApp recruiter contact** — current employer's HR sometimes connects via WhatsApp; warn before responding
- **Glassdoor reviews** — if user has written a review, surface "delete or anonymize" reminder when stealth-on
- **LinkedIn "open to work" green ring** — detected and disabled
- **Naukri "actively looking"** flag — detected and disabled
- **AmbitionBox / Glassdoor profile photos** — recommended to scrub
- **Email signatures** that leak intent ("currently exploring opportunities") — scanner suggests fixes
- **Calendar invitations** for interviews — auto-create with neutral subject ("External meeting") if user opts in (Google/Outlook integration)
- **Reference check leak risk** — when an interview reaches reference stage, warn user to brief references on confidentiality

## Quick-hide hotkey

⌘Shift+H — toggles a "boss screen" overlay instantly:
- Replaces UI with a benign-looking page (calendar, docs, blank)
- Pauses any active operations (do not send DMs, do not refresh data)
- Configurable cover page in settings (default: blank teal-950 with "CareerOps" small logo, hard to identify)
- Tap any key → returns to product

## Audit log

Every stealth-related action logged:
- Toggle changes (on/off, by whom, when)
- Rule changes
- Pseudonym CV generations
- Visibility check results
- Quick-hide activations

Log is local-only by default (DPDP-aware); user can opt-in to encrypted cloud sync.

## Cross-doc links

- Onboarding stealth toggle: `20-onboarding-flow.md` Step 6
- Stealth chip in top bar: `04-spacing-grid-layout.md`
- Notification digest timing: `36-settings-billing.md`
- DPDP implications: `36-settings-billing.md`
- CV variants and tailoring: `24-skill-claim-prover.md` (skill graph) → cover letter and CV are derived from this canonical store

## Open questions

1. **Should stealth automatically enable on detected office Wi-Fi?** — Default off; opt-in. Auto-enable could mis-trigger on coffee-shop wifi sharing same SSID.
2. **Cross-device stealth state** — sync stealth toggle to mobile? Yes, encrypted sync.
3. **Stealth violation alerts** — how loud? Toast vs. modal vs. push? — Persistent toast on next visit; push only if user explicitly opted into push for stealth alerts.
4. **Anonymized email forwarder** — DPDP requires controllership; we'd hold metadata. Build vs. partner with existing service?
