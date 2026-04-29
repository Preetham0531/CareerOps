# 06 — Roadmap

Sequenced by maximum learning, minimum scope, real users early. Five phases.

---

## Phase 0 — Validate the wedge (2 weeks, no code)

**Goal:** prove the referral-first thesis is right *before* writing a line of code.

**Activities:**
- Talk to 20 Indian job seekers across the 4 personas
- Show them the planning docs in this repo
- Ask: "If this existed, what would you actually use? What's the *one* feature you'd pay for?"
- Hypothesis: ≥60% will pick "Referral Hijack" or "Skill-Claim Prover" as the #1 wanted feature.
- If hypothesis fails: revisit thesis.

**Deliverable:** validated v0.1 feature priority + 5 design partners (people who'll use the alpha).

---

## Phase 1 — MVP (4–6 weeks)

**Goal:** end-to-end happy path for **one** persona (Priya — the surgical 4-yr SDE), **one** portal (LinkedIn), **one** ATS family (Greenhouse + Lever + Ashby).

**Scope:**
- ✅ Profile import (paste resume + LinkedIn URL)
- ✅ Discovery: LinkedIn search via authenticated session, capped at 100 listings/run
- ✅ Scoring: A–F rubric (no India-specific adjusters yet beyond LPA + city)
- ✅ Tailoring: one CV variant (`lever-modern`), one cover letter generator
- ✅ Submission Tier 3 only (manual with prefilled clipboard) — zero ToS risk
- ✅ Tracker: simple Kanban
- ✅ **Referral Hijack v0** — find 1st-degree connections, draft DM, user approves and sends

**Out of scope:** ghost radar, salary leak, stealth mode, voice, WhatsApp.

**Deliverable:** working desktop app (Tauri), shipped to 5 design partners. Goal: ≥1 of them gets a real interview attributable to the agent.

---

## Phase 2 — Coverage + decisioning (6–8 weeks)

**Goal:** become genuinely useful across portals; sharpen the brain.

**Add:**
- Naukri adapter (Tier 2 — user session)
- Indeed Apply API integration (Tier 1)
- Wellfound, Cutshort, Instahyre adapters (Tier 2)
- Greenhouse / Lever / Ashby direct submit (Tier 1)
- ATS-aware CV variants (Workday-strict, Taleo-keyword, etc.)
- Ghost-Job Radar
- Salary Leak Detector
- Bond/Bench/Bait detector
- 2nd-degree referral discovery via mutual connections
- Tracker auto-follow-ups

**Deliverable:** real beta with 50–100 users. Public landing page. Naukri + LinkedIn + Indeed coverage.

**Goal metric:** average user gets ≥3 interviews from ≤30 applications in 30 days.

---

## Phase 3 — Defensible moat (8–12 weeks)

**Goal:** features competitors can't quickly copy.

**Add:**
- Skill-Claim Prover with full GitHub/Kaggle/LeetCode evidence graph
- Interview Time Machine
- Stealth Mode (hardened)
- Application DNA learning loop
- Cohort Mode (for Tier-2/3 freshers)
- Browser Co-Pilot extension (massive distribution play)
- Voice interface (Hindi + English, Tamil/Telugu best-effort)
- Multi-resume bench (Workday / Lever / Greenhouse / Naukri / Taleo variants)

**Deliverable:** product that has *no comparable competitor* in India. Move from beta to public.

---

## Phase 4 — Adjacent products (open-ended)

**Possibilities (not commitments):**
- **Recruiter side** — verified-candidate marketplace; companies pay to reach the top decile of users
- **Cold outreach for sales / freelance** — same agent retargeted at sales pipelines
- **Career mentor mode** — long-term career planning, not just current job
- **B2B campus product** — sell to Tier-2/3 colleges as a placement-cell upgrade
- **WhatsApp Business API for paying users** — full automation of recruiter chats

---

## Sequencing principles

1. **Always have a working end-to-end path**, even if narrow. Never spend more than 2 weeks without a usable demo.
2. **Manual-first, automate later.** Tier 3 submission before Tier 2 before Tier 1. Build the brain first; the hands are easy.
3. **One persona at a time** until each is loved. Priya → Karan → Anjali → Ravi.
4. **Naukri + LinkedIn or nothing.** Don't bother with portals 3–10 until 1–2 are great.
5. **Open-source the core**, monetize the layer above. Same play as the original Career-Ops, but tuned for India + DPDP.

---

## Anti-roadmap (things we will NOT build)

- ❌ A "click apply to 500 jobs" button.
- ❌ Auto-DMing referrers without user approval.
- ❌ A public job board (we ride existing ones).
- ❌ Resume builder UI (we generate to user's existing resume; we don't compete with Zety).
- ❌ Mobile app before desktop is great. (Maybe ever.)
- ❌ Coaching/mentoring services (we are an agent, not a person).
