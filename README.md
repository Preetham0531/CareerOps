# CareerOps India

An AI agent that finds, filters, tailors, and applies to jobs across **India's** job ecosystem — Naukri, LinkedIn, Indeed, Foundit, Instahyre, Cutshort, Wellfound, Hirect, Apna, Internshala, plus direct ATS portals (Greenhouse, Lever, Ashby, Workday, SuccessFactors, Keka, Darwinbox).

Inspired by Santiago Fernández's open-source [Career-Ops](https://github.com/santifer/career-ops) (37k+ stars), reimagined for the Indian market — different portals, different ATSs, different referral culture (70%+ of Indian hires come through referrals), different salary bands (LPA, not USD), and different legal regime (DPDP Act 2023).

> **Status: Planning phase. Zero code yet.** Every file in this repo is documentation.

---

## TL;DR

1. **Don't be a scraper-first product. Be a decision engine first** — score, tailor, prep — then add submission as the last layer.
2. **Referrals beat applications in India** (70%+ of hires). The killer feature is *engineering a referral*, not mass-applying.
3. **Three submission tiers** — Tier 1 official APIs (Indeed Apply, LinkedIn Easy Apply); Tier 2 portal automation under user's own session; Tier 3 manual-with-prefilled-clipboard. Never blind mass-spam.
4. **India-native scoring**: LPA bands, tier-1/2/3 city COL, WFH preference, notice period, joining bonus, ESOP, bond/bench detection.
5. **Multi-resume generator** that adapts to ATS quirks (Workday strict, Lever lenient, Naukri's own parser, Taleo literal-keyword).
6. **DPDP-Act-aware** from day one — consent, lawful basis, deletion rights.

---

## Documents

| # | Doc | What's in it |
|---|---|---|
| 01 | [Market Research](docs/01-market-research.md) | Portals ranked by India coverage, ATS landscape, salary sources, referral economy |
| 02 | [Product Vision & Personas](docs/02-product-vision.md) | Who we serve, the job-to-be-done, the four personas |
| 03 | [Architecture](docs/03-architecture.md) | Modules, data flow, stack picks |
| 04 | [Crazy Features](docs/04-features.md) | The 17 wild features, fully spec'd |
| 05 | [Legal & Compliance](docs/05-legal-compliance.md) | DPDP Act 2023, per-portal ToS posture, ethical guardrails |
| 06 | [Roadmap](docs/06-roadmap.md) | Phases 0 → 4, what ships first |
| 07 | [Monetization](docs/07-monetization.md) | Indian-market pricing in ₹, freemium tiers |
| 08 | [Risks & Open Questions](docs/08-risks.md) | What kills this and what we don't yet know |

---

## Pitch in one paragraph

In India, recruiters get thousands of applications per role and most go unread. Mass-apply bots make this worse for everyone. **CareerOps India** flips it: the agent does *less volume, more precision* — it filters out ghost jobs and bond traps, scores fit using India-specific signals (LPA, city, WFH, notice period), generates an ATS-tuned CV per listing, and — the killer move — finds a 2nd-degree connection at the target company and drafts a referral DM. Because in India, **a warm intro is worth 100 cold applies.**
