# 08 — Risks & Open Questions

The honest list of what could kill this and what we still don't know.

---

## Existential risks (could end the company)

### R1 — Naukri / LinkedIn ban our user accounts at scale

**Scenario:** Naukri detects automation patterns even via user-session Tier 2, mass-suspends our users. Reputation crater overnight.

**Mitigations:**
- Conservative rate limits (≤10 actions/hour on any portal)
- Run only when user has the agent in foreground
- User-confirmed submission (Tier 3 default)
- Public partnership with Indeed (legitimate API path) as proof of "we're not the bad guys"
- Fast-shut-off kill switch per portal if we detect bans correlating with our usage

### R2 — DPDP Rules become hostile by May 2027

**Scenario:** Final DPDP rules forbid scraping public LinkedIn data even with user consent.

**Mitigations:**
- Local-first architecture means user is the legal actor, not us
- Privacy-by-design from day one (we'd be cleaner than 99% of HRTech SaaS)
- Watch the regulator carefully, pivot toward Indeed-API-only model if forced

### R3 — Naukri / LinkedIn / Indeed launch their own AI features that are good enough

**Scenario:** Naukri 3.0 ships agentic apply for everyone. Cross-portal advantage evaporates for 80% of users.

**Mitigations:**
- Cross-portal is our moat — even if Naukri is great, users still want LinkedIn + Indeed + Wellfound combined
- Referral-engine moat is independent of any one portal
- Open-source community moat
- ATS-side polish (Workday/Lever/Greenhouse) is moat — incumbents won't optimize against ATSs they don't own

### R4 — Reputation damage from one viral bad outcome

**Scenario:** A user's auto-DM goes to a recruiter who screenshots it and tweets "look at this AI spam, this is what's wrong with hiring." Hits 100K likes.

**Mitigations:**
- Every DM user-approved, never auto-sent
- Watermarked PDFs, transparent disclosure
- Public ethics doc + abuse channel
- Quality > quantity in product DNA, marketing emphasizes signal-not-noise

### R5 — LLM cost spirals make unit economics fail

**Scenario:** Heavy users burn $50/mo of Claude API while paying ₹499.

**Mitigations:**
- BYO-API-keys is the default model — user pays the LLM directly
- Cost-aware orchestration: Haiku/cheap for bulk, Opus for tailoring/referral DMs
- Aggressive caching of JD analysis (one company, multiple roles → reuse company context)

---

## Operational risks (could slow us down)

### R6 — ATS automation is brittle

Workday updates form structure → all our adapters break.

**Mitigation:** strong test suite, weekly synthetic runs, fallback to Tier 3 (manual paste) when adapter breaks.

### R7 — Indian payments friction

Razorpay UPI works but recurring auto-debit is messy under RBI rules; users may need to re-authorize monthly.

**Mitigation:** annual plans + one-time "Hire Bonus" reduce dependence on recurring debit.

### R8 — Acquisition channels are unclear

Indian consumer SaaS has notoriously hard distribution. CAC could outrun LTV.

**Mitigations:**
- Browser extension = organic distribution via Chrome Web Store
- Open-source = GitHub + HackerNews + r/developersIndia organic
- Cohort feature = built-in viral loop (one user invites 3 friends)
- College placement-cell partnerships (B2B2C, the cells distribute for us)

---

## Product risks (could make it not work)

### R9 — Referral DM reply rates are low

We assume 10–15% reply rate on warm 2nd-degree DMs. If real-world is 2%, the killer feature is dead.

**Mitigation:** validate in Phase 0 with 5 design partners. Run 100 manual DMs, measure reply rate, only build the engine if signal is strong.

### R10 — Skill-Claim Prover is over-promising

"Your projects prove 5y of Python" is a strong claim. If recruiters see through it, we erode trust.

**Mitigation:** be conservative — only claim parity if evidence is genuinely strong (multiple production-grade repos, decent stars, complex frameworks). Tune toward false-negatives over false-positives.

### R11 — ATS variants don't actually differ enough to matter

We assume Workday-strict CV scores meaningfully better at Workday than Lever-modern does. If the difference is ≤5%, the multi-variant complexity isn't worth it.

**Mitigation:** A/B test in Phase 2 with real applications. Kill variant complexity if no signal.

---

## Open questions (need research, conversation, or tests)

1. **What % of Indian recruiters actually read cover letters?** (Affects how much we invest in cover letter generation.) Need to ask 30+ recruiters.
2. **WhatsApp Business API approval** — how hard is it for a small startup to get? What's the lead time?
3. **Indeed API partnership** — is this still open to small applicants in 2026, or has it been deprecated?
4. **Naukri's anti-bot maturity** — what does ban-on-detection actually look like in 2026? (Versus 2020 reports.)
5. **Pricing willingness** — will Indian users pay ₹499/mo for a job-search tool, or is this only a one-time-payment market?
6. **Tier-2/3 college distribution** — placement cells: warm to AI tools, or threatened by them?
7. **Stealth Mode reliability** — can we actually keep someone hidden from their employer's recruiters reliably, or is it security theater?
8. **GitHub/LeetCode parsing accuracy** — does the claim-evidence graph generalize across non-tech roles (PM, design, sales)?
9. **DPO threshold** — at what user count do we cross "Significant Data Fiduciary"?
10. **Open-source license** — MIT (max adoption) or AGPL (force forks to share)? Career-Ops is MIT. We probably follow.

---

## What would make us shut this down

If after Phase 1 (4–6 weeks of MVP):
- Fewer than 3/5 design partners actively use the product weekly
- Zero of them gets a real interview attributable to the agent
- Referral DM reply rate <3% across 100 sends

→ pivot or shut down. Don't sink Phase 2 budget into a thesis the data killed.
