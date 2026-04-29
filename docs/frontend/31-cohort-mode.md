# 31 — Cohort Mode

## Purpose
Job-hunting alone is brutal — especially for fresher cohorts in tier-2/3 colleges where seniors with industry experience are scarce. Cohort Mode is a private group of 4–6 people (college batchmates, friends, ex-colleagues) who share filtered listings, peer-review CVs, split research load, and stay accountable.

## Personas served
Heaviest use: Ravi (fresher, tier-2/3 college). Some Anjali (women's networks — re-entering moms supporting each other). Less for Priya/Karan (their networks are looser; one-on-one referrer paths matter more than cohort).

## Entry points
- Side nav → "Cohorts"
- ⌘K → "Open cohort"
- Invite link from a friend → joins automatically
- Onboarding Step 5 → option to create or join

## Layout

Shell A. Two-pane: cohort sidebar + main pane.

```
┌─────────────────────────────────────────────────────────────────┐
│ TOPBAR                                                           │
├──────┬──────┬───────────────────────────────────────────────────┤
│      │      │                                                    │
│ NAV  │ CO-  │  IIT-VIT 2022 BATCH · 5 members                    │
│      │ HORTS│  ──────────────────────────────                    │
│      │      │                                                    │
│      │ [VIT │  ┌────────────────────────────────────────────┐  │
│      │  '22]│  │ ACTIVITY (last 7d)                            │  │
│      │      │  │                                                │  │
│      │ [Co- │  │ • Aman shared 3 jobs ("relevant for backend") │  │
│      │ ders]│  │ • Sara reviewed Aman's CV (3 suggestions)     │  │
│      │      │  │ • Ravi sent 5 quality applies                │  │
│      │ [+ N │  │ • Priya scheduled mock GD for tomorrow       │  │
│      │ ew ] │  └────────────────────────────────────────────┘  │
│      │      │                                                    │
│      │      │  ┌──────────────────┬─────────────────────────┐  │
│      │      │  │ MEMBERS           │ ACCOUNTABILITY (this    │  │
│      │      │  │                    │ week)                   │  │
│      │      │  │ [👤] Aman B       │                          │  │
│      │      │  │ [👤] Sara S       │ Aman   ███████░░░ 7/10  │  │
│      │      │  │ [👤] Ravi K       │ Sara   █████░░░░░ 5/10  │  │
│      │      │  │ [👤] Priya N      │ Ravi   █████████░ 9/10  │  │
│      │      │  │ [👤] Vikram G     │ Priya  ████░░░░░░ 4/10  │  │
│      │      │  │                    │ Vikram █████████░ 9/10  │  │
│      │      │  │ + Invite          │                          │  │
│      │      │  └──────────────────┴─────────────────────────┘  │
│      │      │                                                    │
│      │      │  TABS: [Shared jobs] [Peer review] [Research]    │
│      │      │  ───────────────────────────────────────────────  │
│      │      │                                                    │
│      │      │  SHARED JOBS (12)                                 │
│      │      │                                                    │
│      │      │  ┌──────────────────────────────────────────────┐ │
│      │      │  │ Razorpay · Backend                            │ │
│      │      │  │ Shared by Aman · 3 of you can apply          │ │
│      │      │  │ "This fits Sara and Ravi best — your skills" │ │
│      │      │  │ Tagged for: Sara, Ravi                        │ │
│      │      │  │ [View] [Save to mine]                         │ │
│      │      │  └──────────────────────────────────────────────┘ │
│      │      │                                                    │
└──────┴──────┴───────────────────────────────────────────────────┘
```

## Tabs

### Shared jobs
A feed of jobs cohort members have shared with notes. Each entry shows who shared, who it's relevant for (tagged), and any cohort comments.

### Peer review
Cohort members upload CV variants for review. Each gets:
- Inline-diff comments (gold-100 highlight per `07-trending-design-tactics.md`)
- 1–5 star quality rating per section (Education, Experience, Projects, Skills)
- Specific suggestions list

```
┌──────────────────────────────────────────────────┐
│ AMAN'S CV — projects-first variant                │
│ Submitted 2d ago · 3 reviews                      │
│                                                    │
│ ─────────────────────────────────────────────── │
│ Sara's review:                                     │
│ "Bullet 3 in your async-django repo is weak.      │
│ Consider rephrasing as <suggestion>. Quantify     │
│ the throughput improvement."                       │
│ ──── ★★★★☆                                        │
│                                                    │
│ Priya's review:                                    │
│ "Education section should drop 'CBSE Board' —     │
│ irrelevant. Add LeetCode rating."                  │
│ ──── ★★★☆☆                                        │
│                                                    │
│ Ravi's review:                                     │
│ "Strong overall. Your headline can pull more."   │
│ ──── ★★★★★                                        │
│                                                    │
│ ─────────────────────────────────────────────── │
│ [Address feedback]    [New variant]                │
└──────────────────────────────────────────────────┘
```

### Research split
Cohort members claim research tasks: "I'll dig into Razorpay's interview style", "I'll analyze AmCAT past papers." Notes shared. Avoids 5 people doing the same Glassdoor read.

```
┌──────────────────────────────────────────────────┐
│ RESEARCH BOARD                                    │
│                                                    │
│ ┌──────────────────────────────────────────────┐ │
│ │ Razorpay interview style                      │ │
│ │ Owner: Aman · Updated 1d ago                  │ │
│ │ Notes: "Heavy on system design rounds, payments│ │
│ │ orchestration, idempotency. 3 rounds typical." │ │
│ │ [Read full notes]                              │ │
│ └──────────────────────────────────────────────┘ │
│                                                    │
│ ┌──────────────────────────────────────────────┐ │
│ │ TCS NQT 2026 patterns                         │ │
│ │ Owner: Priya · Updated 3d ago                 │ │
│ │ [Read full notes]                              │ │
│ └──────────────────────────────────────────────┘ │
│                                                    │
│ + Claim a research topic                          │
└──────────────────────────────────────────────────┘
```

## Accountability

Each member has a weekly "quality applies" target (default 5). Tracker visible to cohort. **No shaming** — just visibility. Members can encourage each other.

The default target is 5 *quality* applies (filtered for ghost > 0.6 etc.) per week, not 50 cold applies. The product enforces precision.

Bottom of accountability panel:
> "This week's MVP: Vikram (9/10 quality applies, 2 callbacks). 🎉"

(Restrained celebration — `01-design-principles.md` whispers — but cohorts are an exception where light celebration creates the social glue.)

## Privacy and consent

- Cohort joining is invite-only
- Each member controls **what they share** with cohort:
  - Shared filters? opt-in
  - CV variants? opt-in per variant
  - Application history? opt-in
  - Salary numbers? almost-never default off, explicit opt-in per share
- Stealth Mode interaction: stealth users can still be in cohort, but cohort members see anonymized signals only
- Cohort-shared content cannot be exported by other members (no copy-paste of someone else's CV beyond reading)

## State diagram

```
[no cohort] → [create | join via invite] → [single cohort]
[single] → [join more] → [multi-cohort with sidebar switcher]
[member action] → [activity feed update]
[member leaves] → [cohort continues with N-1]
[creator deletes] → [members notified, kicked into "cohort archive" read-only]
```

## Data model

```ts
interface CohortState {
  cohorts: Cohort[];
  activeCohortId: string | null;
}

interface Cohort {
  id: string;
  name: string;
  members: Member[];
  sharedJobs: SharedJob[];
  cvReviews: CVReview[];
  researchTopics: ResearchTopic[];
  accountability: { period: 'week' | 'fortnight'; target: number; entries: AccountabilityEntry[] };
  activityFeed: Activity[];
  permissions: { whoCanInvite: 'creator' | 'all'; whoCanRemove: 'creator' };
}
```

## Interactions & micro-animations

- New activity → fades in at top of feed
- Accountability bars animate fill weekly
- Reviewer feedback → streams in like AI typing for first paint
- Member join → small toast "Sara joined the cohort"
- New shared job → cohort sidebar gets a small dot indicator

## Empty / loading / error states

- **No cohorts**: hero illustration + "Job-hunting alone is brutal. Cohort Mode lets 4–6 friends share filters, peer-review CVs, and stay accountable." + Create / Join buttons
- **In cohort but no activity**: "No activity yet. Be the first to share a job or post a CV review."
- **Member left / cohort archived**: read-only banner "This cohort is archived. View only."

## Edge cases & India-specific gotchas

- **WhatsApp groups are the de facto college job-share medium** — make it easy to import a CSV/screenshot of jobs from WA groups; treat cohort as the upgrade
- **Caste / community separation** — never expose member's last name as community signal; first names + initial only by default
- **Tier-2/3 college specific patterns** — research topics auto-suggest TCS NQT, Wipro Elite NTH, Infosys InfyTQ, AmCAT, eLitmus
- **Senior/junior dynamics** — older batchmates often drop in to mentor; we surface a "mentor" role distinct from "peer"
- **Group accountability shaming risk** — explicit policy: no public "Vikram only did 3 applies" callouts; surface only positive callouts. Negatives are private nudges.
- **Privacy regression** — when one member becomes paranoid, give them one-click "freeze sharing" without leaving the cohort

## Cross-doc links

- AvatarStack: `11-components-composite.md`
- CV inline-diff: `07-trending-design-tactics.md`
- Privacy / DPDP: `36-settings-billing.md`
- Mock GD multi-speaker (linked from cohort): `35-voice-interface.md`
- Stealth interaction: `27-stealth-mode.md`

## Open questions

1. **Cohort sizing** — 4–6 default. What's the upper bound? — Hard cap at 8 to prevent dilution.
2. **Cross-cohort visibility** — should one cohort's members see overlap with another? — No, strict segmentation.
3. **Mentor role** — separate from "member"? — Yes, mentors can comment but don't have weekly accountability targets.
4. **Group-level external sharing** — can a cohort share their pooled research publicly (e.g., "VIT 2022 — Razorpay interview notes" as a pseudonymous gist)? — v0.2 feature; needs DPDP design and explicit cohort consent.
