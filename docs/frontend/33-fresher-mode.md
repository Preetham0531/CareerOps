# 33 — Fresher Mode (Tier-2/3 College)

## Purpose
Most existing job tools assume IIT/NIT pedigree and English fluency. CareerOps Fresher Mode targets the other 95%: tier-2/3 college freshers navigating Internshala, Unstop, AmCAT, eLitmus, Naukri Campus, TCS NQT, Wipro Elite NTH, Infosys InfyTQ, Capgemini Elite — with prep, autofill, mock GD, and English coaching.

## Personas served
Primary: Ravi (fresher, tier-2/3 college). Some Anjali (returning to entry-level after a long break).

## Entry points
- Onboarding Step 2 → "Fresher / recent graduate" persona → routes Fresher Mode as primary surface
- Side nav (when in Fresher Mode) → "Fresher hub"
- Toggle in settings → enable Fresher Mode

## Layout

Bento grid customized for fresher needs.

```
┌─────────────────────────────────────────────────────────────────┐
│ TOPBAR                                                           │
├──────┬──────────────────────────────────────────────────────────┤
│      │                                                           │
│ NAV  │ Fresher Hub                                                │
│      │ Welcome, Ravi · 3rd-year B.Tech CSE · VIT Vellore           │
│      │                                                           │
│      │ ┌──────────────────────────────────────────────────────┐ │
│      │ │ NEXT MILESTONES                                        │ │
│      │ │                                                       │ │
│      │ │ ⏰ TCS NQT — registration closes Apr 30 (1 day)       │ │
│      │ │ ⏰ Wipro Elite NTH — May 12                           │ │
│      │ │ 📅 AmCAT next slot — Apr 28 (Bangalore)               │ │
│      │ │                                                       │ │
│      │ │ [Set reminders]                                       │ │
│      │ └──────────────────────────────────────────────────────┘ │
│      │                                                           │
│      │ ┌──────────────────────┬──────────────────────────────┐ │
│      │ │ CAMPUS DRIVES         │ APTITUDE PREP                 │ │
│      │ │                        │                                │ │
│      │ │ Active: 23             │ Quantitative: 67% / 100        │ │
│      │ │ For your branch: 14    │ Logical: 78% / 100             │ │
│      │ │ Filtered: 8            │ Verbal: 54% / 100              │ │
│      │ │                        │ Coding: 71% / 100              │ │
│      │ │ [See all]              │                                │ │
│      │ │                        │ [Practice today]              │ │
│      │ └──────────────────────┴──────────────────────────────┘ │
│      │                                                           │
│      │ ┌──────────────────────────────────────────────────────┐ │
│      │ │ AUTO-FILL VAULT                                        │ │
│      │ │                                                       │ │
│      │ │ Ready for: TCS NQT, Wipro NTH, AmCAT, Naukri Campus  │ │
│      │ │ All 47 fields parsed once. Reused everywhere.         │ │
│      │ │                                                       │ │
│      │ │ [Manage] [Test against new portal]                    │ │
│      │ └──────────────────────────────────────────────────────┘ │
│      │                                                           │
│      │ ┌──────────────────────┬──────────────────────────────┐ │
│      │ │ MOCK GD               │ HR / English coaching         │ │
│      │ │                        │                                │ │
│      │ │ Last session: 2d ago   │ Overall fluency: B2            │ │
│      │ │ Multi-speaker GD AI    │ Common slips: tense agreement, │ │
│      │ │                        │ articles                       │ │
│      │ │ [Start GD]             │ [Today's drill]               │ │
│      │ └──────────────────────┴──────────────────────────────┘ │
│      │                                                           │
│      │ ┌──────────────────────────────────────────────────────┐ │
│      │ │ COHORT (your VIT 2026 batch)                          │ │
│      │ │ 5 active members, 2 with offers                        │ │
│      │ │ [Open cohort →]                                       │ │
│      │ └──────────────────────────────────────────────────────┘ │
│      │                                                           │
└──────┴──────────────────────────────────────────────────────────┘
```

## Key sub-modules

### Campus drive aggregator

Aggregates from:
- **Internshala** — internships + entry-level FT
- **Unstop** (formerly Dare2Compete) — competitions + drives
- **AmCAT** — assessment + drives platform
- **eLitmus** — pH test + drives
- **TCS NQT** — National Qualifier Test
- **Wipro Elite NTH** — National Talent Hunt
- **Infosys InfyTQ** — Tech Quotient
- **Capgemini Elite** — entry program
- **Naukri Campus** — campus recruitment portal
- **Mahindra MILE** — Mahindra entry program
- **Cognizant GenC** — entry stream
- **Accenture First Hour Tech Apprentice**

Each drive shows: deadline, eligibility (CGPA cutoff, branch), location, rounds, salary band.

### Auto-fill vault

Indian campus forms are absurd: 30–60 fields each, redundant, repetitive. Auto-fill stores once and reuses:

- Personal: name, DOB, gender, parents' names, phone, address (current + permanent), aadhaar (optional, for govt drives only), PAN (optional)
- Education: school 10th + 12th + college, with grade % / CGPA, board, year, school/college name, city
- Skills: free-text + structured tags
- Projects: title, description, tech stack, GitHub URL, role, duration
- Achievements: hackathons, papers, certifications
- Internships: company, role, duration, stipend, supervisor
- Family income (some govt drives ask)
- Caste category (legally required for some govt drives — labeled as "optional, only fill if drive requires")
- Disability (legally required for some, opt-in)

The vault is local-encrypted by default. Synced encrypted to user's account if user opts in.

### Aptitude / coding prep

- **Quant**: % topic-by-topic mastery, IndiaBix + GeeksforGeeks past papers
- **Logical reasoning**: same
- **Verbal English**: grammar, RC, sentence correction
- **Coding** (for tech drives): LeetCode-style problems, with test cases
- **Domain** (for specific drives): e.g., TCS Digital coding pattern

Each topic: practice mode (untimed) and test mode (timed simulating real test). Adaptive difficulty.

```
┌──────────────────────────────────────────────────┐
│ QUANT — TIME, SPEED, DISTANCE                     │
│ Question 7 / 15                                   │
│                                                    │
│ A train travels at 60 km/h for 3 hours, then     │
│ slows to 40 km/h for 2 hours. Average speed?      │
│                                                    │
│ A) 50 km/h    B) 52 km/h                          │
│ C) 48 km/h    D) 54 km/h                          │
│                                                    │
│ ⏱ 0:42 / 1:30 left                                │
│                                                    │
│ [Skip] [Submit]                                    │
└──────────────────────────────────────────────────┘
```

After each question: explanation, time-taken, similar problems.

### Mock GD (group discussion)

Multi-speaker AI-driven group discussion. Topic + roles assigned.

```
┌──────────────────────────────────────────────────┐
│ MOCK GD                                           │
│ Topic: "Should AI replace human teachers?"        │
│                                                    │
│ Speakers (5):                                     │
│ [👤 You]                                           │
│ [🤖 Ananya] — supports AI                          │
│ [🤖 Vikram] — opposes                              │
│ [🤖 Priya] — neutral                               │
│ [🤖 Rohit] — practical lens                       │
│                                                    │
│ [Currently speaking: Ananya] (waveform)           │
│ Transcript:                                        │
│ Ananya: "AI personalizes learning at scale..."    │
│                                                    │
│ [Press space to speak]                             │
│                                                    │
└──────────────────────────────────────────────────┘
```

Post-GD feedback:
- How often you spoke (vs. group avg)
- How many points you contributed
- Whether you interrupted (penalty)
- Whether you brought others in (bonus)
- Body of your contributions (relevance, depth)
- Speaking clarity score

### HR English coaching

Common HR question drills with AI feedback on fluency.

- "Tell me about yourself" — recorded, transcribed, scored
- "Why this company?" — feedback on specificity
- "Strengths / weaknesses" — feedback on framing
- Common grammatical slips highlighted

Feedback is gentle: "You said 'I have did' — should be 'I have done'. Common pattern; here's a 30-sec drill."

Languages: English primary. Hindi/Tamil/Telugu fallback for non-English-confident users (some drives still in Hindi).

## State diagram

```
[onboarding selects fresher persona]
  → [fresher hub renders as primary]
  → [user picks: drive / prep / mock / cohort]
  ↓
  drive flow → autofill assists → submit
  prep flow → topic chosen → adaptive practice
  mock flow → GD or HR mock → feedback
  cohort → see cohort feed
```

## Data model

```ts
interface FresherState {
  profile: { college: string; branch: string; year: number; cgpa: number; ... };
  drives: { active: Drive[]; filteredOut: Drive[] };
  vault: AutofillVault;
  aptitudeProgress: TopicProgress[];
  mockGDSessions: MockGDSession[];
  hrSessions: HRMockSession[];
  reminders: Reminder[];
}
```

## Interactions & micro-animations

- Drive deadline countdown: ticking-clock icon, gold-700 when < 24h
- Autofill test: form fields populate one-by-one (stagger 100ms) for visual feedback
- Aptitude correct answer: subtle teal pulse on the chosen option
- Mock GD: live waveform per speaker

## Empty / loading / error states

- **No drives matching profile**: "No active drives match your branch + CGPA. Add an experience or revise filters."
- **First-time autofill setup**: walks user through form-by-form with hints
- **Aptitude no progress yet**: starts with diagnostic test → unlocks personalized plan
- **Mock GD no participants**: AI fills slots; user can also invite cohort members for real GD

## Edge cases & India-specific gotchas

- **CGPA cutoffs vary** — some drives require 7.0, some 6.5, some 6.0; vault stores both X-out-of-10 and percentage forms
- **English fluency is gated** — not everyone is comfortable; voice mode in Hindi/Tamil/Telugu (`35-voice-interface.md`)
- **Family pressure on TCS / Wipro** — even when user wants startup; product respects user's choice without judgment
- **Caste category fields** — some govt + reservation-aware drives require; never auto-shown unless drive demands it
- **Gap year / arrear semester** — common in tier-2/3; vault accommodates without shaming
- **Backlog disclosures** — many drives ask; vault stores honestly, helps with explainer when asked
- **Photo formats** — some portals require <50KB JPG, specific dimensions; vault auto-converts
- **Signature scan** — some portals require uploaded signature; vault stores once
- **10th/12th board variations** — CBSE / ICSE / state boards; standardized in vault for cross-portal use

## Cross-doc links

- Cohort integration: `31-cohort-mode.md`
- Voice (Indic) for mock: `35-voice-interface.md`
- Auto-fill engine reused: `22-job-discovery.md` Tier 2/3 apply
- Onboarding routing: `20-onboarding-flow.md`

## Open questions

1. **Should fresher mode be a toggle or a separate "shell"** — currently leaning toggle (simpler), but persona-routing in onboarding effectively gives it its own home
2. **Mock GD multi-voice models** — quality of multi-speaker AI in 2026 is good; cost considerations for free tier
3. **Coaching paywall** — fresher mode is a primary monetization vector? — partial: vault free, mock GD limited free, English coaching premium
