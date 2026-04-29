# 01 — Market Research

Deep dive on the Indian job-search landscape: where the jobs are, who runs the pipes on the recruiter side, where salary truth lives, and why referrals dominate.

---

## A. Job portals, ranked by India coverage

| Tier | Portal | Why it matters | Automation difficulty |
|------|--------|----------------|------------------------|
| **S** | **Naukri.com** | ~78M resumes, ~80% of India postings, 500k+ active recruiters. The default. | High — no public API, aggressive anti-bot, ToS forbids automation. Third-party scrapers (Apify, ScrapingBee, Bright Data) exist but carry account-ban risk. |
| **S** | **LinkedIn** | All MNCs, recruiter DMs land here, "Easy Apply" is the cleanest official flow. Also where referral magic happens. | Medium — official Easy Apply API path is clean; profile scraping is heavily rate-limited and risky. |
| **A** | **Indeed India** | Aggregator with broad SMB coverage. Has an official **Indeed Apply API** for partners. | **Low** — the only major Indian portal with a sane developer story. |
| **A** | **Foundit** (ex-Monster) | Skill-based matching engine. | Medium. |
| **A** | **Instahyre** | AI-curated tech roles, often <48h recruiter response. | Medium — login-gated, JS-heavy. |
| **A** | **Cutshort** | Startups + verified skill assessments (Python/SQL/JS shown on profile). | Medium. |
| **B** | **Wellfound** (ex-AngelList India) | Early-stage startups, equity-heavy roles. Single Apply button, easy to integrate. | Low. |
| **B** | **Hirect** | Chat-first, mobile-first, fast recruiter access. | High — mobile-only flows, OTP-gated. |
| **B** | **Apna** | 50M+ users, dominant in Tier-2/3 cities, blue-collar + early career. | High — mobile-only, OTP. |
| **B** | **Internshala** | Internships + freshers. Huge for college grads. | Medium. |
| **C** | **JobsForHer / HerKey** | Women returners niche. | Medium. |
| **C** | **Hirist / IIMJobs** | Hirist = pure tech, IIMJobs = mgmt premium. | Medium. |
| **C** | **Unstop** (ex-Dare2Compete) | Off-campus drives, hackathons, fresher pipelines. | Medium. |

**Coverage strategy:** S-tier are non-negotiable. A-tier in MVP+1. B-tier for niche personas (Tier-2 fresher, women returners). C-tier opportunistic.

---

## B. ATS landscape — what's on the *other* side of "Apply"

When a job links out to an external "Apply" page, it's almost always one of these. They behave **differently** — a CV that scores well on Lever can fail on Workday.

| ATS | Used by | Parser quirks |
|-----|---------|---------------|
| **Workday** | Most large MNCs in India, banks, conglomerates | Strictest. Hates two-column layouts, icons, headers/footers, tables. Forces re-entry of resume data. |
| **SuccessFactors** | SAP customers, Indian conglomerates (Mahindra, Adani-tier) | Strict. Long forms, locale-sensitive date parsing. |
| **Taleo** | Older Fortune 500s | Literal keyword matching — keyword stuffing genuinely works. |
| **Greenhouse** | Most US tech companies hiring in India | No auto-score — recruiters read everything. Forgiving parser. |
| **Lever** | Mid-stage startups | ML-ish semantic matching, formatting-tolerant. |
| **Ashby** | Newer YC startups | Modern, clean, parses well. |
| **iCIMS** | Enterprise | ML-based semantic matching. |
| **SmartRecruiters** | Mixed enterprise | Decent. |
| **Keka** | Indian SMEs (huge install base) | India-native, decent parsing. |
| **Darwinbox** | Indian large enterprises | India-native, mobile-heavy. |
| **Zoho Recruit** | Indian SMBs on Zoho stack | Light, simple. |
| **greytHR** | 27,000+ Indian companies, 2.5M+ users | India-native, payroll-first stack. |

**Implication:** one resume can't be optimal everywhere. We need a **multi-variant CV generator** that detects target ATS and adapts:
- One-column, no icons, plain headings → Workday/SuccessFactors
- Keyword-dense → Taleo
- Modern design OK → Greenhouse, Lever, Ashby
- India-aware date/phone formatting → Keka, Darwinbox

---

## C. Salary intelligence sources

To score "is this offer worth it?" and detect lowball/hidden bands:

| Source | Strength |
|--------|----------|
| **Levels.fyi** | Best for tech MNCs. Google L3 ≈ ₹39L → L7 ≈ ₹3.18Cr. Microsoft, Amazon, Meta covered. |
| **AmbitionBox** | Broadest India coverage, including non-tech. Crowdsourced. |
| **Glassdoor India** | Salary + interview reports + sentiment. |
| **6figr.com** | Newer, India-focused, anonymous offer crowdsourcing. |
| **Naukri Salary Insights** | First-party portal data. |
| **Reddit r/developersIndia, r/indianstartups** | Leaked offer screenshots, real ranges. |
| **Blind India** | Anonymized, especially MNCs. |

**Triangulation rule:** at least 2 sources before trusting a band. Output a confidence interval, not a point estimate.

### Reference bands (FY 2026, software engineering, India)

| Years | Median band | Top-quartile (FAANG/strong startup) |
|-------|-------------|--------------------------------------|
| 0 (fresher) | ₹6–8 LPA | ₹15–25 LPA (top campus) |
| 2–4 | ₹12–18 LPA | ₹30–50 LPA |
| 4–7 | ₹18–30 LPA | ₹50–90 LPA |
| 7–10 | ₹30–50 LPA | ₹90L–1.5Cr |
| 10+ | ₹50L–1Cr | ₹1.5–3Cr+ |

Cost-of-living adjuster: Bangalore ₹25L ≈ Coimbatore ₹15L in real purchasing power.

---

## D. The referral economy

This is the single most important fact about Indian hiring:

- **70%+ of Indian job seekers find jobs through referrals.**
- **45%** of Indian employees have referred someone into their current employer.
- Infosys, Deloitte: **~40% of hires** are referrals.
- Referred candidates are **7× more likely** to be hired than portal applicants.
- Naukri, Indeed, LinkedIn portal applies have ~1–3% callback rates. Referrals push that to **30–50%**.

### Existing referral platforms

- **Refer.me** — global, 5000+ companies
- **GetMeReferred** — India-focused, verified employee insiders
- **Topmate** — booking 1:1 calls with employees, often used to ask for referrals
- **RippleHire, Intrro, ERIN** — employer-side referral SaaS

**Strategic implication:** competing as "yet another apply bot" is fighting upstream in India. Competing as "the agent that engineers warm referrals at scale" rides the current. **This is the core thesis.**

---

## E. Competitive landscape

| Player | What they do | Gap we fill |
|--------|--------------|-------------|
| **Career-Ops (santifer)** | Open-source, Claude-Code-based, US/EU portals (Greenhouse/Ashby/Lever, Anthropic/OpenAI/Stripe career pages) | India coverage is zero — wrong portals, wrong ATS, no INR/LPA logic, no referral engine |
| **LazyApply, Sonara, Jobscan, Simplify** | US-market apply bots / resume scanners | India portals not first-class; pricing in USD; no DPDP awareness |
| **Naukri's own AI features** | Naukri 2.0 has resume suggestions | Locked to Naukri only, no cross-portal, no referral, no agentic |
| **Refer.me / GetMeReferred** | Find a referrer | Just the referral step, doesn't tailor CV, doesn't apply, doesn't score, doesn't learn |
| **Topmate** | Book a call with insider | Manual, paid per call |

**Our wedge:** end-to-end agent + referral-first + India-native scoring + DPDP compliant. No one is doing all four.

---

## F. Sources

- [Career-Ops on GitHub](https://github.com/santifer/career-ops)
- [Top Job Portals in India 2026 — Kraftshala](https://www.kraftshala.com/blog/best-job-search-sites-in-india/)
- [Naukri scraping options — ScrapingBee](https://www.scrapingbee.com/scrapers/naukri-api/)
- [How resume parsers actually work — Resume Optimizer Pro](https://resumeoptimizerpro.com/blog/how-resume-parsers-actually-work)
- [Levels.fyi — India software engineer](https://www.levels.fyi/t/software-engineer/locations/india)
- [Top HR/ATS Software in India — Wisemonk](https://www.wisemonk.io/blogs/top-hr-software-in-india)
- [DPDP Act 2023 + Rules 2025 — EY India](https://www.ey.com/en_in/insights/cybersecurity/decoding-the-digital-personal-data-protection-act-2023)
- [Refer.me](https://www.refer.me/), [GetMeReferred](https://getmereferred.com/), [Topmate referral guide](https://blog.topmate.io/blog/how-to-ask-for-a-job-referral-in-3-steps)
