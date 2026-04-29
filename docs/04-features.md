# 04 — Crazy-Ass Features

The wild stuff. Each feature is ranked **Impact (1–5) × Feasibility (1–5)** and tagged with the persona it serves most.

---

## 1. ⭐ Referral Hijack Engine — Impact 5 × Feasibility 4

**The single most valuable feature in this product.**

For every shortlisted job, the agent:
1. Pulls the user's LinkedIn 1st-degree connections
2. Identifies who currently works at the target company (from their public LinkedIn)
3. Pulls **2nd-degree** connections at the target company via mutual friends
4. Scores each candidate-referrer by reachability:
   - Same college / same prior company / mutual friend strength
   - Recent activity (active LinkedIn user, or dormant?)
   - Tenure at company (>1 year = can refer; <3 months = probably can't)
   - Seniority (manager-level referrals carry more weight)
5. Drafts a DM that references something **specific** about that person — a recent post they made, a project on their GitHub, a talk they gave, the school you both went to
6. Queues for user approval before send. Tracks replies. Auto-escalates if no reply in 4 days (next-best referrer).

**Why it works in India:** referrals are 7× more likely to convert than portal cold-applies, and 70%+ of jobs go via referral. This is the highest-leverage move available.

**Personas:** all four. Especially Priya (surgical), Anjali (women's networks), Karan (executive whisper-network).

---

## 2. Ghost-Job Radar — Impact 4 × Feasibility 5

Many "open" Naukri/LinkedIn postings are 6+ months stale, fake (lead-gen, talent-pool fishing), or have an internal candidate already chosen. Detect:

- Posting age (>60 days = suspicious)
- Re-posts of identical JD by same recruiter
- Recruiters who post 100+ jobs/week (recruitment-mill red flag)
- "Urgent" + no salary + agency name → recruiter farm
- Cross-check: company's actual hiring velocity (LinkedIn Insights, news)
- Fake-company filter (no real LinkedIn, no domain, sketchy "consultancy")

Output a **ghost score (0–1)** on every listing. Filter aggressively. Don't waste applies.

---

## 3. Skill-Claim Prover — Impact 5 × Feasibility 4

**The "5 yrs Python required, you have 3" problem.**

The agent parses GitHub, Kaggle, LeetCode, GeeksforGeeks, college projects, hackathon results, blog posts, and builds a **claim-evidence graph**.

When the JD says "5+ yrs Python," the agent checks:
- Total Python LOC across your public repos
- Complexity (frameworks used: Django, FastAPI, async, ML libs)
- Github stars / contributions
- LeetCode rating
- Did you ship something real?

If your **artifacts** demonstrate senior-level proficiency despite junior years → the agent applies anyway, with a tailored cover letter that says: "JD asks 5y; I have 3y but [specific project] does X which is non-trivial, here's the repo."

Recruiter clicks → sees proof. Time-to-trust collapses.

---

## 4. Salary Leak Detector — Impact 4 × Feasibility 4

JD says "competitive" or hides band? Triangulate from:
- Levels.fyi for that company + role + level
- AmbitionBox crowdsourced ranges
- Glassdoor
- Recent Reddit r/developersIndia / Blind India offer leaks
- The recruiter's *other* postings on LinkedIn (sometimes one of them lists a number)
- Levels of past employees (LinkedIn profile → AmbitionBox of same company)

Output: **"Real range likely ₹18–24L, 70% confidence. Median offer for L4 SDE at this company in last 12 months: ₹21L."**

User decides whether the band is worth their time *before* applying. Saves hours.

---

## 5. Bond / Bench / Bait Detector — Impact 4 × Feasibility 4

India-specific traps the agent flags loudly:

- **Service bond** — "TCS 2-yr bond", "Wipro WILP", "Capgemini bond" — extracts from JD, Glassdoor reviews, employee Quora threads
- **Bench risk** — services companies (Infosys, Wipro, Capgemini, CTS, TCS, Mphasis) that hire then bench you for 3–6 months
- **Bait-and-switch** — "Software Engineer" actually means "Tech Support" or "Production Support" (parse JD carefully)
- **Pyramid consultancy** — staff-aug shops that bill you to a real client at 3× markup, you get the 1×
- **Night shift only** — common for support roles, often hidden until late in the process

Renders as a `red-flag` badge on the listing.

---

## 6. WhatsApp Recruiter Auto-Reply — Impact 5 × Feasibility 2

Half of Indian recruiting happens on WhatsApp ("Hi, are you interested in a role at..."). The agent:

1. Reads incoming WhatsApp via the **WhatsApp Business API** (cleanest path) or — for personal — Android Accessibility Service (heavier, but works)
2. Matches the message against your filters (LPA range, location, role)
3. Auto-replies politely:
   - **Decline:** "Thanks, currently not exploring sub-₹X roles, please keep me in mind for senior."
   - **Engage:** "Interested — could you share the JD and salary band?"
   - **Escalate to user** with a one-tap "Yes, send my CV"

**Feasibility caveat:** WhatsApp Business API requires Meta approval and a business number. Personal WhatsApp automation walks a very fine line on Meta ToS. Ship as **assist mode** (drafts the reply, user sends) before full auto.

---

## 7. Stealth Mode for Currently-Employed — Impact 5 × Feasibility 5

For Priya and Karan: their current employer must NEVER find out.

- Hide profile from current employer's domain on LinkedIn / Naukri (set "Confidential" + block company)
- Never apply with personal email if the email pattern matches employer
- Schedule applies for **after-hours / weekends only**
- Block visibility from current-company recruiters (LinkedIn "I don't want to see jobs from X")
- Use a **stealth resume variant** that omits current employer's name → replaces with `"Series-B fintech, ~200 emp, Bangalore"` (verifiable by recruiter on a confidential call)
- No public LinkedIn green "Open to Work" banner
- Disable "share profile updates" on LinkedIn before any resume tweaks

---

## 8. The Interview Time Machine — Impact 5 × Feasibility 5

Once an interview is booked:

- Scrape Glassdoor + Reddit + LeetCode tag for `[company] interview questions`
- Pull interviewer's LinkedIn (their tech stack, papers, conference talks, their team's blog posts)
- Generate:
  - **50-question prep set**, ranked by likelihood, organized by round (DSA / system design / behavioral / domain)
  - **Mock interview script** (text mode, or voice via ElevenLabs/native TTS)
  - **One-pager on the interviewer** — where they worked, what they care about (from posts), known interviewing style
  - **Predicted system-design question** based on company's known infra (Swiggy → real-time delivery; Razorpay → payments scale; Zerodha → low-latency trading)

---

## 9. Negotiation Co-Pilot — Impact 5 × Feasibility 4

After offer arrives:

- Triangulate market band (see Feature 4) for *this exact role + level*
- Compare to user's target
- Draft the counter-offer email (3 variants: collaborative / firm / aggressive)
- Role-play the recruiter call (voice mode)
- India-specific clauses to negotiate:
  - **Joining bonus** (often ₹2–10L, easier to push than base)
  - **ESOP vesting cliff** (1y standard, push for accelerated on layoff)
  - **Notice-period buyout** (employer covers your current notice)
  - **Variable %** (push for higher fixed)
  - **WFH days** (locked in writing, not "manager's discretion")
  - **Re-evaluation in 6 months** (for borderline offers)

---

## 10. Fresher Mode (Tier-2/3 college) — Impact 4 × Feasibility 4

Most existing tools assume IIT/NIT. We also do:

- Off-campus drive aggregator: Internshala, Unstop, AmCAT, eLitmus, Naukri Campus, TCS NQT, Wipro Elite NTH
- **Auto-fill** the absurd 30–60 field forms (parse once, reuse forever)
- Aptitude/coding-round prep auto-generated from past papers (IndiaBix, GeeksforGeeks)
- **Mock GD partner** (LLM voice, multi-speaker simulation)
- Soft-skill coach for HR rounds in English (huge unlock for Tier-2/3)

---

## 11. Reverse Job Board: "Companies, Apply to Me" — Impact 3 × Feasibility 4

Generate a public profile page from the user's CV + project-evidence graph, optimized for the keywords Naukri/LinkedIn recruiters cold-search for. Like SEO for one human.

- Naukri profile keyword optimizer (you'd be amazed how few people do this)
- LinkedIn headline + about generator targeted at recruiter searches
- Personal landing page (auto-deployed on Vercel) — `careerops.in/u/yourname`

---

## 12. Cohort Mode — Impact 4 × Feasibility 4

A friend group of 4–6 college seniors:
- Share filtered listings ("I found 3 roles you'd be a fit for")
- Peer-review each other's tailored CVs ("your bullet 3 is weak")
- Split research load (one person digs into Razorpay's interview style, shares notes)
- Group accountability ("Ravi sent 5 quality applies this week")

Especially powerful for Tier-2/3 college fresher cohorts where solo navigation is brutal.

---

## 13. The "Bad Vibes" Detector — Impact 4 × Feasibility 4

Don't apply to dumpster fires:
- Glassdoor sentiment trend (improving / declining)
- Blind India sentiment
- r/developersIndia threads about that company
- LinkedIn turnover signal — are 30% of employees leaving in 6 months?
- Recent layoff news
- Founder departures
- Public salary delays (rare but real, esp. early-stage)

Output: **"Don't apply, this place is on fire."** with reasons.

---

## 14. Application DNA — Impact 4 × Feasibility 5

Every submitted application gets a fingerprint: which CV variant, which cover letter angle, which tailoring strategy.

After 30 applies + 5 interview-results, the agent **learns what works for THIS user** and shifts strategy:
- "Your 'projects-first' CV gets 3× more callbacks than 'experience-first' for product roles."
- "Your applies on Tuesday morning get 2× the response of Friday afternoon."
- "Cover letters mentioning the company's recent funding outperform generic ones by 40%."

Personal optimization loop. Compounds over time.

---

## 15. Global Remote Filter — Impact 3 × Feasibility 5

Sub-mode: only show roles that **explicitly hire from India remote** + pay in USD/EUR.

- Cross-check via Pangian, RemoteOK, Wellfound's "anywhere" filter, Himalayas, We Work Remotely
- Filter out "must be in EU/US/Canada timezone-required" politely
- Surface roles paying ₹50L+ equivalent to Indian-market jobs at half the experience level

---

## 16. Voice Interface (Hindi/English/Tamil/Telugu) — Impact 3 × Feasibility 4

"Bhai, aaj kya jobs apply kiye?" → spoken summary.

- Whisper for STT, multilingual
- Native TTS or ElevenLabs
- Big for Tier-2/3 users who consume content via voice
- Especially useful for the WhatsApp recruiter mode + interview practice

---

## 17. Browser Co-Pilot Extension — Impact 5 × Feasibility 4

When user manually opens **any** job page on **any** site, a Chrome/Edge extension shows a sidebar:
- Ghost-score
- Salary leak triangulation
- Referral path ("You have 3 paths to this company")
- Tailored bullets to copy-paste
- One-click "Send to CareerOps for full process"

Lets the user keep their existing habits while the agent rides shotgun. **Massive distribution play** — extension stores have organic discovery.

---

## Priority order for v0.1

If we ship only 5 features in MVP, these:

1. ⭐ Referral Hijack Engine (1)
2. Skill-Claim Prover (3)
3. Tailoring + ATS-aware CV variants (architecture, not feature 4)
4. Ghost-Job Radar (2)
5. Stealth Mode (7)

Everything else is v0.2+.
