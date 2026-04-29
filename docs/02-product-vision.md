# 02 — Product Vision & Personas

## The job-to-be-done

> "Get me from job-seeker → interviewing → offer in the **shortest credible path**, given my actual skill, location, and constraints — without making me look spammy or burning my reputation."

**Three things this implies:**

1. **"Credible"** — quality over volume. Spamming 500 applies/day burns your name with recruiters and gets your account flagged.
2. **"Given my actual skill"** — the agent must reason about evidence (GitHub, projects, leetcode rating), not just keyword-match the JD.
3. **"Without burning reputation"** — stealth for currently-employed users; never DM strangers something that could embarrass them; never lie on the CV.

---

## Personas

### 1. Ravi — the Tier-2 fresher

- B.Tech CSE, 4th year, Vellore Institute of Technology
- 0 years experience, decent CGPA, 2 college projects, GitHub with 8 repos
- Has applied to 200+ jobs/week on Naukri, Internshala, Unstop. Hears nothing.
- **Pains:** drowning in volume, JD jargon, doesn't know where to apply, no network at MNCs.
- **Wants:** signal — "where do I actually have a shot?" + auto-fill the 30-field TCS NQT and Wipro Elite forms.
- **Mode in product:** *Fresher Mode* + cohort feature with 4 friends.

### 2. Priya — the 4-year SDE in Bangalore

- 4 years at a Series-B fintech, ₹22 LPA, wants ₹40+ LPA jump
- Wants strong startups + MNCs only. Will not move below ₹40 LPA.
- Has 80 LinkedIn connections at FAANG/strong startups (most are 2nd degree)
- **Pains:** doesn't want to apply broadly, only wants 10-15 surgical applications, has zero time during workday.
- **Wants:** referral-first pipeline, stealth (current employer must not know), strong negotiation help at offer stage.
- **Mode:** *Surgical Mode + Stealth Mode + Referral Engine*.

### 3. Anjali — returning after maternity

- 6 years pre-break experience, 18 months break
- Wants flexible/WFH role, worried about "career gap" question
- **Pains:** systemic bias around break, JobsForHer is helpful but limited, needs real referrals not just job listings
- **Wants:** filter for women-friendly employers (verified ratings), CV that frames the break confidently, referral engine prioritizing women's networks (LeanIn India, Sheroes communities)
- **Mode:** *Returner Mode*.

### 4. Karan — the laid-off senior PM

- 11 years exp, recently laid off from late-stage startup
- Targeting Director-of-PM roles, ₹80L–1.5Cr range
- Reputation conscious — doesn't want to look "desperate"
- **Pains:** few openings at his level, leadership pipeline is referral-only, doesn't want LinkedIn green banner
- **Wants:** quiet outreach, exec recruiter mapping, custom narrative per company, top-quality interview prep
- **Mode:** *Executive Mode*.

---

## What we are NOT

- Not a mass-apply bot. Volume is the problem, not the solution.
- Not a resume builder UI (Zety, Resume.com). We generate, but the user owns the artifact.
- Not a job board. We meta-layer over existing boards.
- Not a careers coaching service. The agent does the mechanical work; humans still own decisions.

---

## North-star metrics

- **Interview-rate per 100 applications** (target: ≥15%, vs ~1–3% baseline on portal cold-apply)
- **Days-to-first-interview** (target: ≤7)
- **Referral-conversion rate** (DMs sent → DMs replied → referrals secured)
- **Offer-to-target-band ratio** (final offer / user's stated target)

We do **not** optimize for "applications submitted." That's a vanity metric and structurally misaligned with user good.

---

## Brand & feel

- **Name (working):** CareerOps India. Alternatives: ApplyAgent, Kaam (हिंदी, "work"), JobJedi, Saral Career.
- **Voice:** competent, calm, blunt. No hype. No emojis. The product talks to you the way a senior engineer reviewing your CV would.
- **Visual:** dark theme default, monospace accents, terminal-inspired but not cosplay. (Matches your stated preferences.)
- **Trust signals:** open-source core (like the original Career-Ops), public changelog, transparent about what it does and doesn't do, DPDP-Act badge.
