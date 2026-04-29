# 03 — Architecture

High-level module map, data flow, and stack picks. No code. No premature detail.

---

## System diagram

```
                ┌────────────────────────────────────────────────────┐
                │                  USER PROFILE LAYER                │
                │   resume(s) · skills · constraints · projects ·    │
                │   target salary · cities · WFH · notice period     │
                └────────────────────┬───────────────────────────────┘
                                     │
   ┌─────────────────────────────────┼─────────────────────────────────┐
   ▼                                 ▼                                 ▼
┌──────────────┐              ┌──────────────┐                ┌──────────────────┐
│  DISCOVERY   │              │   SCORING    │                │   TAILORING      │
│              │              │              │                │                  │
│ Naukri,      │              │ JD vs CV     │                │ Resume rewrite   │
│ LinkedIn,    │   listings   │ semantic +   │   shortlist    │ per ATS (Workday │
│ Indeed,      │ ───────────► │ India        │ ─────────────► │ vs Lever vs etc) │
│ Foundit,     │              │ adjusters    │                │ + cover letter   │
│ Instahyre,   │              │ (LPA, city,  │                │ + ATS-clean PDF  │
│ Cutshort,    │              │ WFH, notice) │                │                  │
│ Wellfound,   │              └──────┬───────┘                └────────┬─────────┘
│ ATS sites    │                     │                                 │
└──────────────┘                     ▼                                 ▼
                              ┌──────────────┐                ┌──────────────────┐
                              │  REFERRAL    │                │   SUBMISSION     │
                              │  ENGINE      │                │                  │
                              │              │                │ Tier 1: API      │
                              │ Find 1st/2nd │                │ Tier 2: assisted │
                              │ degree at    │                │ Tier 3: manual   │
                              │ target co.   │                │   w/ clipboard   │
                              │ Draft DM     │                │                  │
                              │ Track reply  │                │ Logs every step  │
                              └──────┬───────┘                └────────┬─────────┘
                                     │                                 │
                                     └────────────┬────────────────────┘
                                                  ▼
                                       ┌────────────────────┐
                                       │  TRACKER + COACH   │
                                       │ Pipeline · follow- │
                                       │ ups · interview    │
                                       │ prep · offer       │
                                       │ negotiation        │
                                       └────────────────────┘
```

---

## Module breakdown

### 1. Profile Layer

- Parses uploaded resume(s) → structured `CandidateProfile`
- Imports GitHub, LeetCode, Kaggle, GeeksforGeeks profiles
- Builds a **claim-evidence graph**: every skill claim points to ≥1 verifiable artifact
- Stores constraints: target LPA, target cities, WFH preference, notice period, current employer (for stealth filter), languages, citizenship, visa needs

### 2. Discovery

Per-portal *adapter* contract:
```
search(filters) → listings[]
fetch(listing_id) → JobDescription
```

- Naukri, Foundit, Instahyre, Cutshort, Wellfound, Hirect → Playwright with persistent **user-owned session cookies** (user logs in once in agent's browser; agent reuses session). User's own session = much weaker ToS argument than service-side scraping.
- LinkedIn → official Easy Apply path where possible; cautious profile reads only.
- Indeed → official **Indeed Apply API** partnership.
- ATS sites (Greenhouse, Lever, Ashby, Workday) → known URL patterns, mostly stable HTML.

### 3. Scoring (the brain)

A–F rubric (lifted from Career-Ops, adapted for India):

| Dimension | Weight | India-specific notes |
|-----------|--------|----------------------|
| Skill match (semantic, evidence-backed) | 25% | Use claim-evidence graph, not just keywords |
| Salary fit (LPA band) | 20% | Triangulate from Levels.fyi + AmbitionBox + Glassdoor |
| Location (incl. COL adjustment) | 12% | Bangalore ₹25L ≠ Coimbatore ₹25L |
| WFH/hybrid/onsite vs preference | 8% | |
| Company quality (Glassdoor + Blind sentiment) | 10% | + Bond/bench/bait-and-switch detection |
| Stage / size match | 5% | Some users want startup chaos, some want MNC stability |
| Notice-period feasibility | 5% | India default is 60–90 days; very different from US |
| Tech-stack alignment | 8% | |
| Growth signal (recent funding, news, hiring velocity) | 5% | |
| Ghost-job probability (inverse) | 2% | See Features doc §2 |

Output: A/B/C/D/F + reasoning trace.

### 4. Tailoring

- **CV variants** per ATS family. We maintain a small library of LaTeX/Typst templates:
  - `workday-strict` — single column, no icons, plain text
  - `lever-modern` — slightly designed
  - `greenhouse-default` — recruiter-friendly
  - `taleo-keyword-dense` — literally keyword-stuffed but truthful
  - `naukri-default` — for portal-internal apply
- Per-job rewrite: re-orders bullets, swaps nouns/verbs, surfaces matching projects.
- **Cover letter generator** — short (3 paragraphs), references something specific from the company's last 6 months (funding, blog, product launch).
- "Why this company" paragraph — separate, reusable in referral DMs and interview answers.

### 5. Referral Engine (killer module)

Detailed in [04-features.md §1](04-features.md). Briefly:
- Find 1st/2nd degree LinkedIn connections at the target company
- Score them by reachability (mutual connection? shared school? shared past company?)
- Draft a DM that references something specific about *them*
- Queue for user approval before send
- Track replies, escalate on no-reply at day 4

### 6. Submission (three tiers, in order of safety)

| Tier | Mechanism | ToS posture | UX |
|------|-----------|-------------|-----|
| **1** | Official APIs (Indeed Apply, Greenhouse public form posts, LinkedIn Easy Apply via partner) | Clean | Fully automated |
| **2** | Playwright in user's own browser, user reviews each submit | Grey but defensible (user's own session, user's own intent) | User clicks "send" |
| **3** | Generate ready-to-paste packet, open the page, user fills | Clean | Slow but zero risk |

Default = Tier 2 with auto-confirm off. User can opt into auto-confirm per portal.

### 7. Tracker + Coach

- Kanban: `Discovered → Shortlisted → Tailored → Submitted → Replied → Interviewing → Offer / Rejected`
- Auto-follow-ups at day 3 and day 7 (template DM/email, user approves)
- Interview prep generator: pulls JD + Glassdoor interview reports + interviewer's LinkedIn → 50-question prep set
- Offer negotiation co-pilot: pulls salary triangulation, drafts counter, role-plays the recruiter call

---

## Stack recommendation

| Layer | Pick | Why |
|-------|------|-----|
| Backend | **Python 3.13 + FastAPI** | ML/scraping ecosystem, matches your MAPrompt convention |
| Browser automation | **Playwright (Python)** + stealth plugins, persistent contexts | Gold standard, beats Puppeteer for stealth |
| LLM orchestration | **Multi-provider** — Claude (best structured rewrite), GPT (cheap bulk), Gemini (long context). User brings keys. | Matches MAPrompt, avoids vendor lock-in, controls cost |
| Vector store | **SQLite + sqlite-vec** local; Postgres + pgvector when SaaS | Local-first ethos, dead simple |
| PDF generation | **Typst** primary, LaTeX fallback | Typst is faster, modern, ATS-clean |
| Job queue | **Celery + Redis** | Mature, fits Python |
| Frontend | **Next.js 14 + TypeScript**, dark theme | Matches your stated preference |
| Desktop wrapper (MVP) | **Tauri** (lighter than Electron) | Local-first means most users run it on their own machine, keeps cookies private |
| Cloud later | Fly.io or Railway for relay services | Cheap, India POPs okay-ish; Mumbai region available on AWS/GCP if needed |
| Payments (when SaaS) | **Razorpay + Stripe** | Razorpay for India UPI; Stripe for international |

---

## Data model (sketch)

```
CandidateProfile
  ├─ Resume[] (variants)
  ├─ Skills[] (each with EvidenceRef[])
  ├─ Projects[]
  ├─ Constraints (LPA, cities, WFH, notice, stealth)
  └─ ExternalProfiles (GitHub, LeetCode, LinkedIn URL, ...)

JobListing
  ├─ source (portal name)
  ├─ raw HTML / JD text
  ├─ parsed (title, company, location, comp band, must-haves, nice-to-haves)
  ├─ ats (workday | lever | greenhouse | ...)
  ├─ score (A–F + breakdown)
  └─ ghost_score (0–1)

Application
  ├─ listing_id
  ├─ cv_variant_used
  ├─ cover_letter_used
  ├─ submission_tier (1|2|3)
  ├─ submitted_at
  ├─ status (sent | replied | interview | rejected | ghosted | offer)
  └─ events[] (email opens, follow-ups sent, etc.)

ReferralAttempt
  ├─ listing_id
  ├─ target_person (LinkedIn URL, name)
  ├─ relationship (1st | 2nd via X | shared_school | shared_past_company)
  ├─ dm_drafted, dm_sent_at
  ├─ replied_at, reply_sentiment
  └─ outcome (referred | declined | ghosted)
```

---

## Local-first vs SaaS

**MVP: local-first desktop app (Tauri).** Reasons:
1. User's portal cookies stay on user's machine — much stronger ToS / privacy posture
2. No server cost during validation
3. DPDP-Act compliance is easier (no third-party data processor)
4. Matches your "single-user MVP" preference

**Phase 3+: optional cloud sync.** Reasons:
1. Multi-device access
2. Recruiter-side reverse marketplace
3. Cohort/team features
4. Required for monetization beyond one-time payment

Keep both possible by designing the data model and APIs server-shaped from day one, even if running locally.
