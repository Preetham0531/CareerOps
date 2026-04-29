# 36 — Settings, Privacy (DPDP), Billing

## Purpose
Settings is where the product earns trust. The DPDP Act 2023 makes consent and deletion first-class citizens — this module makes them visible UX, not buried legal pages. Billing handles ₹ pricing tiers per `docs/07-monetization.md`.

## Personas served
All four. DPDP transparency matters most to Priya/Karan (most data-aware) and Anjali (cautious returner). Ravi often skips settings; smart defaults handle them.

## Layout

Shell A. Side menu of categories + main content.

```
┌─────────────────────────────────────────────────────────────────┐
│ TOPBAR                                                           │
├──────┬──────┬──────────────────────────────────────────────────┤
│      │      │                                                    │
│ NAV  │ Set  │  PROFILE                                            │
│      │ tings│  ─────────────────                                 │
│      │      │  [Edit profile content]                            │
│      │ Pro  │                                                    │
│      │ file │                                                    │
│      │      │                                                    │
│      │ Acc  │                                                    │
│      │ ount │                                                    │
│      │      │                                                    │
│      │ Pri  │                                                    │
│      │ vacy │                                                    │
│      │      │                                                    │
│      │ Step │                                                    │
│      │ alth │                                                    │
│      │      │                                                    │
│      │ Notif│                                                    │
│      │      │                                                    │
│      │ Inte │                                                    │
│      │ grat.│                                                    │
│      │      │                                                    │
│      │ Bill │                                                    │
│      │ ing  │                                                    │
│      │      │                                                    │
│      │ Help │                                                    │
│      │      │                                                    │
└──────┴──────┴──────────────────────────────────────────────────┘
```

## Categories

### Profile
- Name, photo (optional), pronouns (optional), public profile toggle
- Display preferences (theme, density, language)
- CV variants (manage list)
- Public profile URL (if Reverse Job Board #11 enabled)

### Account
- Email, phone (with verification)
- Password / 2FA
- Active sessions / devices
- Sign-out all
- Delete account (DPDP right of erasure — visible, one-click reachable)

### Privacy (DPDP center) — first-class

The most important section. Built per DPDP Act 2023.

```
┌─────────────────────────────────────────────────┐
│ PRIVACY (DPDP)                                   │
│                                                   │
│ ┌────────────────────────────────────────────┐  │
│ │ DATA SUMMARY                                │  │
│ │                                              │  │
│ │ We hold:                                     │  │
│ │ • Identity: name, phone, email               │  │
│ │ • CV data: 1 file + 2 variants               │  │
│ │ • Network: 247 LinkedIn connections (read)  │  │
│ │ • Activity: 47 applications, 12 saved jobs  │  │
│ │ • Voice: 0 audio (transcripts only)         │  │
│ │ • Location: never collected                 │  │
│ │                                              │  │
│ │ Total storage: ~12 MB                        │  │
│ │ Last accessed: 2026-04-29 14:23 IST          │  │
│ └────────────────────────────────────────────┘  │
│                                                   │
│ ┌────────────────────────────────────────────┐  │
│ │ CONSENTS                                    │  │
│ │                                              │  │
│ │ ☑ Process CV for tailoring                  │  │
│ │ ☑ Read LinkedIn network                      │  │
│ │ ☑ Cross-reference public salary data        │  │
│ │ ☑ Process voice for STT                     │  │
│ │ ☐ Share anonymized salary data with pool    │  │
│ │ ☐ Share anonymized application DNA          │  │
│ │ ☐ Use voice data for model training         │  │
│ │ ☐ Personalized email digests                 │  │
│ │ ☐ WhatsApp Business messages                 │  │
│ │                                              │  │
│ │ Each consent shows when granted + scope.    │  │
│ │ Withdrawing is one click. Some features may │  │
│ │ stop working — we'll explain which.         │  │
│ └────────────────────────────────────────────┘  │
│                                                   │
│ ┌────────────────────────────────────────────┐  │
│ │ DATA RIGHTS (DPDP Sec 11–14)                │  │
│ │                                              │  │
│ │ [📥 Download all my data]                    │  │
│ │ [🗑️ Delete specific data]                    │  │
│ │ [🛑 Pause processing]                        │  │
│ │ [✉️ Contact our DPO (Data Protection Officer)│  │
│ │                                              │  │
│ │ DPO: dpo@careerops.in                        │  │
│ │ Grievance officer: grievance@careerops.in    │  │
│ │ Response SLA: 30 days (DPDP requirement)     │  │
│ └────────────────────────────────────────────┘  │
│                                                   │
│ ┌────────────────────────────────────────────┐  │
│ │ ACCESS LOG                                   │  │
│ │                                              │  │
│ │ Showing: who/what accessed your data         │  │
│ │ • You — 2026-04-29 14:23 (web)              │  │
│ │ • Razorpay (referral DM sent) — Apr 28 22:14│  │
│ │ • LinkedIn API (network read) — Apr 28 06:00│  │
│ │ • System (DNA insight calc) — Apr 27 03:00  │  │
│ │ ...                                          │  │
│ └────────────────────────────────────────────┘  │
│                                                   │
└─────────────────────────────────────────────────┘
```

### Stealth (cross-link)
Routes to `27-stealth-mode.md` panel.

### Notifications
- Channels: email, push (web/iOS/Android), WhatsApp (Business API opt-in), in-app
- Granular per category (referrer reply, new match, interview reminder, offer received, cohort activity, weekly digest, monthly DNA review)
- Quiet hours (default: 22:00 – 07:00 IST)
- During work hours mute (auto-on with stealth)
- Digest delivery time (default: 6:00 AM IST)

### Integrations
- LinkedIn (connect / disconnect / scope)
- Naukri
- GitHub
- LeetCode
- Kaggle
- Calendar (Google, Outlook, Apple)
- Email (for interview-confirmation auto-detect)
- WhatsApp Business (for recruiter auto-reply)
- Slack (cohort notifications, optional)
- Zapier / webhook (premium)

Each integration shows:
- Status (connected / expired / error)
- Last sync
- Permissions granted
- Disconnect button

### Billing

```
┌─────────────────────────────────────────────────┐
│ BILLING                                          │
│                                                   │
│ Current plan: Free                                │
│                                                   │
│ ┌──────────────────────────────────────────┐   │
│ │ FREE                                       │   │
│ │ ₹0/month                                   │   │
│ │                                            │   │
│ │ ✓ Job discovery + filters                  │   │
│ │ ✓ Ghost-job radar                          │   │
│ │ ✓ Basic salary intel                       │   │
│ │ ✓ 5 referrer searches/mo                  │   │
│ │ ✓ 3 mock interviews/mo                    │   │
│ │ ✓ Voice (30 min/day)                       │   │
│ │ ✓ Browser extension                        │   │
│ │                                            │   │
│ │ [Current plan]                             │   │
│ └──────────────────────────────────────────┘   │
│                                                   │
│ ┌──────────────────────────────────────────┐   │
│ │ PRO                                        │   │
│ │ ₹599/month or ₹4,999/year (save ₹2,200)   │   │
│ │                                            │   │
│ │ Everything in Free, plus:                  │   │
│ │ ✓ Unlimited referrer searches             │   │
│ │ ✓ Unlimited mock interviews               │   │
│ │ ✓ Negotiation co-pilot                    │   │
│ │ ✓ Application DNA insights                │   │
│ │ ✓ Stealth mode                            │   │
│ │ ✓ Voice unlimited                          │   │
│ │ ✓ Cohort mode                             │   │
│ │ ✓ Priority support                        │   │
│ │                                            │   │
│ │ [Upgrade to Pro]                           │   │
│ └──────────────────────────────────────────┘   │
│                                                   │
│ ┌──────────────────────────────────────────┐   │
│ │ CAMPUS  (for tier-2/3 freshers)           │   │
│ │ ₹199/month or ₹1,499/year (save ₹889)     │   │
│ │                                            │   │
│ │ Everything in Free, plus:                  │   │
│ │ ✓ Fresher hub                             │   │
│ │ ✓ Mock GD (multi-speaker)                  │   │
│ │ ✓ HR English coaching                     │   │
│ │ ✓ Aptitude prep unlimited                 │   │
│ │ ✓ Cohort mode                             │   │
│ │                                            │   │
│ │ Verified college email gets 25% off.       │   │
│ │                                            │   │
│ │ [Upgrade to Campus]                        │   │
│ └──────────────────────────────────────────┘   │
│                                                   │
│ Payment: UPI, Cards, Net Banking, Wallets        │
│                                                   │
│ ─────────────────────────────────────────────── │
│ INVOICES                                         │
│ • Apr 2026 — Pro yearly — ₹4,999 — paid         │
│ • Mar 2026 — Pro monthly — ₹599 — paid           │
│                                                   │
└─────────────────────────────────────────────────┘
```

Pricing tiers are illustrative — real numbers in `docs/07-monetization.md`.

Indian payment methods first-class:
- UPI (PhonePe, GPay, Paytm)
- Cards (Razorpay rails)
- Net banking
- Wallets (Paytm, Mobikwik)
- EMI for annual plans (via Razorpay)

GST included in displayed price (not added at checkout — Indian users hate that pattern).

### Help
- Help articles (lightweight, indexed in ⌘K)
- Video tutorials
- Submit feedback
- Status page link
- Contact support

## DPDP Act 2023 specifics

This is the heart of the privacy section. Bind by these requirements:

1. **Consent must be explicit, informed, specific, free, and revocable** — granular toggles, not bundled
2. **Notice at point of collection** — every form that asks for new data shows what + why before submit
3. **Purpose limitation** — data used only for stated purpose; new uses require fresh consent
4. **Data minimization** — collect only what's needed; auto-delete after purpose complete
5. **Right of access** — Download all data button (JSON + CSV bundle)
6. **Right of correction** — every field editable
7. **Right of erasure** — Delete data button (per category + total account delete)
8. **Right of nomination** — assign data fiduciary in case of death/incapacity
9. **Grievance redressal** — DPO contact + 30-day response SLA
10. **Data Breach notification** — UI for users to see notifications post-breach (rare event but designed)

### Data fiduciary / data principal terminology

Surfaced at appropriate moments:
- Onboarding: "We are the data fiduciary; you are the data principal."
- Consent screens: "Your consent is freely given and may be withdrawn."
- Plain English first; legalese in dropdown.

### Significant Data Fiduciary obligations

If we cross thresholds (large user count + sensitive data — likely once we scale), we're a SDF. Settings panel reflects this:
- DPIA (Data Protection Impact Assessment) docs link
- DPO appointment public
- Algorithmic transparency disclosures

## Key components reused

- Toggle (settings) — `10-components-primitives.md` Switch
- Granular consent group — list of toggles with descriptions, group enable/disable
- Access log table — sortable, paginated
- Data export — async job with email-when-ready (file ~12 MB typical)
- Delete account — multi-step confirmation; cooldown 7 days where data soft-deleted; permanent delete after

## Interactions & micro-animations

- Consent toggle: switch animates; if a downstream feature is affected, inline alert appears explaining
- "Download all data" → spinner → email-when-ready
- "Delete data": multi-step — choose what, confirm, wait period, final confirm
- Plan upgrade: Razorpay Checkout SDK opens; loading state; success → instant feature unlock

## Empty / loading / error states

- **No integrations connected**: encourage connecting key ones (LinkedIn, GitHub)
- **Billing data loading**: skeleton invoice list
- **Payment failed**: clear error + retry; redirected to billing with toast
- **Plan downgrade**: confirmation dialog with what features will lock

## Edge cases & India-specific gotchas

- **Multiple phones / SIMs** common; allow multiple verified phones
- **Family-shared device** — extra-strict session timeout option
- **GST invoicing for businesses** — option to add GSTIN in billing for B2B receipts
- **PAN card for premium plans** — never required (DPDP — minimization)
- **Refund policy** — clear, India-compliant; refund available within 7 days of first paid bill
- **Free plan abuse prevention** — phone-OTP unique check; no aggressive limits visible
- **DPDP grievance escalation** — Data Protection Board of India contact surfaced in legal page

## Cross-doc links

- Profile / CV variants: `24-skill-claim-prover.md`
- Stealth integration: `27-stealth-mode.md`
- Voice settings: `35-voice-interface.md`
- Notifications digest timing: `21-dashboard.md`, `27-stealth-mode.md`
- Billing copy / tiers: `docs/07-monetization.md`
- Legal compliance source: `docs/05-legal-compliance.md`

## Open questions

1. **Anonymized data sharing for the pool** — we want crowdsourced salary/intel, but DPDP requires explicit consent + clear value. UX: "Help others — share anonymized salary data?"
2. **Pricing display localization** — show ₹ to Indian users; multi-currency for diaspora?
3. **DPO appointment** — required for SDF status; we'll need a real human DPO once scaled
4. **Subscription pause** vs cancel — Indians often want to pause (e.g., during a placement gap); offer "pause for 1/3/6 months" — preserves billing relationship
