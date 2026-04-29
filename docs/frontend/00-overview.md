# 00 — Frontend Documentation Overview

> **Status: Documentation phase.** No code in this directory yet. These docs are the contract between product intent and the eventual implementation.

This index explains how the frontend documentation set fits together, the order to read it in, and how each doc maps back to a CareerOps India feature.

---

## Reading order

1. **Foundations** (00–07) — read top-to-bottom. Every later doc assumes you've internalized these.
2. **Component library** (10–14) — reference material. Skim, then return when implementing a screen.
3. **Module specs** (20–36) — one per major user-facing flow. Pick the module you're building, read it cover-to-cover.
4. **Build plan** (90–92) — week-by-week scaffold order, stack recommendation, design research sources.

---

## Doc-to-feature traceability matrix

| Frontend doc | Backs which CareerOps feature(s) | Primary persona served |
|---|---|---|
| 20-onboarding-flow | All — entry point | All four |
| 21-dashboard | Aggregator surface for #14 (Application DNA), #2 (Ghost), #1 (Referral) | Priya, Karan |
| 22-job-discovery | #2 Ghost-Job Radar, #5 Bond/Bench, #15 Global Remote | All |
| 23-referral-hijack | ⭐ #1 Referral Hijack Engine | All — especially Anjali, Karan |
| 24-skill-claim-prover | #3 Skill-Claim Prover | Ravi (fresher), Priya |
| 25-salary-leak | #4 Salary Leak Detector | Priya, Karan |
| 26-bond-bench-detector | #5 Bond/Bench/Bait | Ravi (fresher) |
| 27-stealth-mode | #7 Stealth Mode | Priya, Karan |
| 28-interview-time-machine | #8 Interview Time Machine | All |
| 29-negotiation-copilot | #9 Negotiation Co-Pilot | Priya, Karan |
| 30-application-dna | #14 Application DNA | Priya |
| 31-cohort-mode | #12 Cohort Mode | Ravi (fresher) |
| 32-browser-extension | #17 Browser Co-Pilot Extension | All — distribution play |
| 33-fresher-mode | #10 Fresher Mode, #16 Voice (Indic) | Ravi |
| 34-mobile-responsive | Cross-cutting; PWA shell | All |
| 35-voice-interface | #6 WhatsApp, #16 Voice | Tier-2/3 users |
| 36-settings-billing | #5 Legal/DPDP, monetization | All |

Cross-cutting features (#11 Reverse Job Board, #13 Bad Vibes, #14 App DNA) appear inside multiple module docs rather than as standalone screens.

---

## Hard constraints

These bind every doc in this set. If a design proposal violates one, it's wrong, regardless of how pretty it is.

1. **Color: teal + gold only.** No rogue greens, blues, reds, purples. Semantic states (success/warn/danger) are derived inside the teal–gold space (see `02-color-system.md`).
2. **India-first defaults.** ₹ and LPA, not $ and "salary." City tier badges (T1/T2/T3) on every job card. Devanagari/Tamil/Telugu fallbacks shipped by default, not as opt-in.
3. **Density over bloat.** A recruiter posts 200 jobs; the user can't waste a click. Information density is a feature, not a sin. Whitespace serves hierarchy, not "minimalism for its own sake."
4. **Low-end Android is the floor.** ~₹15k phones with 4GB RAM, throttled networks. Every animation must run at 60fps there or be opt-out.
5. **Stealth-by-default.** Many users are job-hunting while employed. No splashy notification banners, no "you applied at Google!" celebrations. The product whispers, it does not shout.
6. **Accessible non-negotiable.** WCAG 2.2 AA. Keyboard parity. Real focus rings (gold). Screen-reader landmarks.
7. **DPDP Act 2023 compliance is visible UX.** Consent prompts, deletion controls, data-source transparency are first-class screens, not buried in settings (see `36-settings-billing.md`).

---

## What this doc set is *not*

- Not a style guide for marketing pages. The product surface is the focus.
- Not pixel-perfect Figma — it's the *intent* layer. Figma comes later, informed by these specs.
- Not implementation code. Stack picks live in `91-stack-recommendation.md`; the build itself comes after docs are signed off.

---

## Conventions used in module docs

Every module spec (20–36) follows this skeleton, so contributors can navigate consistently:

```
# <number> — <Module Name>

## Purpose
## Personas served
## Entry points
## Key screens (with ASCII wireframes)
## State diagram
## Data model (frontend slice)
## Interactions & micro-animations
## Empty / loading / error states
## Edge cases & India-specific gotchas
## Cross-doc links
## Open questions
```

If you're writing a new module doc, copy this skeleton verbatim.

---

## Glossary (used throughout)

- **LPA** — Lakhs Per Annum (₹ salary unit; 1 LPA = ₹100,000/year)
- **CTC** — Cost To Company; total compensation including variable, ESOP, joining bonus
- **JD** — Job Description
- **ATS** — Applicant Tracking System (Greenhouse, Lever, Workday, Naukri, Keka, Darwinbox, etc.)
- **T1/T2/T3 city** — India's metro tier classification (T1 = Bangalore, Mumbai, Delhi, Hyderabad, Chennai, Kolkata, Pune; T2 = Jaipur, Lucknow, Ahmedabad, Coimbatore…; T3 = everything else)
- **Notice period** — Days an employee must serve before leaving (30/60/90 days standard in India)
- **Bond** — Service contract penalty if employee leaves early (TCS/Wipro WILP/Capgemini)
- **Bench** — Services-company practice of hiring then assigning no project for 3–6 months
- **DPDP Act** — Digital Personal Data Protection Act, 2023 (India)
- **Referral** — A current employee submitting your application internally. ~70% of Indian hires.
- **Surgical apply** — small-volume, high-precision targeted applications. Opposite of mass-spam.

---

## Open meta-questions (answer before locking docs)

1. Mobile-first or desktop-first authoring? — *Recommendation: desktop-first for the dense flows (referral graph, evidence canvas), mobile-first for discovery + WhatsApp surfaces.*
2. Single SPA or multi-app split (web + extension + mobile PWA)? — *See 91-stack-recommendation.md for the proposed monorepo split.*
3. Which Indic languages ship in v0.1? — *Hindi + English by default. Tamil + Telugu when audience is validated. Bengali, Marathi, Kannada in v0.2.*
