# 24 — Skill-Claim Prover

## Purpose
The "5 yrs Python required, you have 3" problem. The agent parses GitHub, Kaggle, LeetCode, GeeksforGeeks, college projects, hackathons, blog posts, talks, and builds a **claim-evidence graph**. When a JD asks for X, we surface evidence of X — letting the user apply with proof, not just résumé claims.

This module renders that evidence graph and gives users tools to add, validate, and present claims.

## Personas served
Heaviest use: Ravi (fresher) — has projects but no years, wins by surfacing them. Also Priya (lateral move, claims new domain expertise). Anjali (returner, evidence after a break). Karan (executive, evidence of leadership).

## Entry points
- Side nav → "My evidence"
- JobCard preview → "Why this is a fit" → "See full evidence"
- ⌘K → "Evidence graph"
- After connecting GitHub / LeetCode in onboarding → first-run prompt

## Layout

Shell B — full-bleed canvas:

```
┌─────────────────────────────────────────────────────────────────┐
│ TOPBAR: [✕]   My Evidence Graph        [Add evidence] [Export]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│         CLAIM ─────── evidence node                              │
│           ╲                                                      │
│            ╲          evidence node                              │
│             ╲────────                                            │
│              CLAIM                                               │
│                ╲                                                 │
│                 evidence node                                    │
│                                                                  │
│         (force-directed; claims left, evidence right)            │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│ FILTERS: [All claims] [Unverified] [Strong] [Weak]              │
└─────────────────────────────────────────────────────────────────┘
```

Side rail (toggleable):

```
┌─────────────────────────────┐
│ CLAIMS LIST                  │
│                              │
│ ▣ Python · 5y                │
│   evidence: ●●●●●  Strong   │
│                              │
│ ▣ Django · 3y                │
│   evidence: ●●●●○  Strong   │
│                              │
│ ▣ Distributed systems · 2y   │
│   evidence: ●●●○○  Medium   │
│                              │
│ ▣ ML · 1y                    │
│   evidence: ●●○○○  Weak     │
│                              │
│ ▣ Leadership                 │
│   evidence: ●○○○○  Weak     │
│   [Add evidence ›]          │
│                              │
│ + Add a claim                │
└─────────────────────────────┘
```

## Key screens

### Screen 1 — Evidence canvas

Force-directed graph (similar viz patterns to `23-referral-hijack.md`):

- **Claim nodes** (left): hexagonal, `--brand` filled, label = claim text
- **Evidence nodes** (right): circular, color by source type:
  - GitHub: dark teal-700
  - LeetCode: gold-400
  - Kaggle: gold-300
  - Blog/Medium: teal-300
  - Talks/conf: teal-500
  - Hackathon: gold-200
  - College project: neutral
  - Open-source contributions: gold-500
- **Edges** thickness encodes evidence weight (1px low → 4px high)
- **Edge color** matches the evidence node category for visual grouping

### Screen 2 — Claim detail drawer

Click a claim node → drawer:

```
┌──────────────────────────────────────────────────┐
│ [✕]                                                │
│                                                    │
│ CLAIM                                              │
│ Python · 5 years                                   │
│ [Edit]  [Delete]                                   │
│                                                    │
│ ─────────────────────────────────────────────── │
│ STRENGTH:  ●●●●●  Strong                           │
│                                                    │
│ Calculation:                                       │
│ • Total LOC: 47,200 (above senior threshold)       │
│ • Frameworks: Django, FastAPI, asyncio, NumPy     │
│ • GitHub stars: 142 + 89 + 63 = 294 cumulative    │
│ • LeetCode rating: 1840 (top 10%)                 │
│ • Real shipped projects: 3                        │
│ ─────────────────────────────────────────────── │
│                                                    │
│ EVIDENCE (8)                                      │
│                                                    │
│ ┌──────────────────────────────────────────────┐ │
│ │ [GitHub icon] async-django-toolkit            │ │
│ │ ★ 142  ·  Python 87%  ·  active 2025         │ │
│ │ Supports: Python, Django, asyncio             │ │
│ │ [Open repo ›]                                 │ │
│ └──────────────────────────────────────────────┘ │
│                                                    │
│ ┌──────────────────────────────────────────────┐ │
│ │ [LeetCode icon] LeetCode profile              │ │
│ │ Rating 1840 · 412 problems · Python primary   │ │
│ │ Supports: Python                              │ │
│ │ [Open profile ›]                              │ │
│ └──────────────────────────────────────────────┘ │
│                                                    │
│ ┌──────────────────────────────────────────────┐ │
│ │ [Talk icon] PyConf India 2024                 │ │
│ │ "Async at scale: Django gotchas" (32min)     │ │
│ │ Supports: Python, Django                      │ │
│ │ [Watch ›]                                     │ │
│ └──────────────────────────────────────────────┘ │
│                                                    │
│ + Add manual evidence                             │
└──────────────────────────────────────────────────┘
```

Each evidence card:
- Source icon (GitHub, LeetCode, Kaggle, etc.)
- Title + key stats
- Which claims this evidence supports
- Link to open source

### Screen 3 — Add evidence

Manual addition flow (for evidence the auto-parser can't access — internal projects, talks, certifications):

```
┌──────────────────────────────────────────────────┐
│ Add evidence                                      │
│                                                    │
│ TYPE                                               │
│ [GitHub] [LeetCode] [Talk] [Project] [Cert] [...]  │
│                                                    │
│ ─────────────────────────────────────────────── │
│                                                    │
│ Title                                              │
│ [_____________________________________________]    │
│                                                    │
│ Description (optional)                             │
│ [_____________________________________________]    │
│ [_____________________________________________]    │
│                                                    │
│ URL (optional)                                     │
│ [_____________________________________________]    │
│                                                    │
│ Date                                               │
│ [____ ▾]                                            │
│                                                    │
│ Supports which claims?                             │
│ [Python] [Django] [Async] [+ Add new]              │
│                                                    │
│ Verifiable by recruiter?                           │
│ ○ Yes (URL or attached doc)                       │
│ ○ Confidential (NDA / internal)                   │
│                                                    │
│                                  [Save evidence ›] │
└──────────────────────────────────────────────────┘
```

### Screen 4 — Claim-vs-JD comparison

When user is viewing a JobCard, a "How I match" view opens:

```
┌──────────────────────────────────────────────────────┐
│ Razorpay Senior Backend — How I match                 │
│                                                        │
│ JD asks                  | Your evidence                │
│ ────────────────────────|─────────────────────────── │
│ Python · 5y              | ●●●●● (47k LOC, 294 stars) │
│ Django · 3y              | ●●●●○ (3 prod projects)    │
│ Postgres                 | ●●●○○ (1 deep project)     │
│ Distributed systems · 4y | ●●●○○ (1 paper)            │
│ Microservices            | ●●●○○ (1 talk)             │
│ Kafka                    | ●●○○○ (PR contributions)   │
│ AWS                      | ●●●●○ (cert + projects)    │
│ Leadership               | ●●○○○ (open-source maint.) │
│                                                        │
│ Cover-letter angle suggestion:                         │
│ "JD asks 5y Python; I have 3y but my async-django-    │
│ toolkit (★142) and PyConf 2024 talk demonstrate       │
│ senior-level proficiency."                            │
│                                                        │
│                          [Use this angle in CL]        │
└──────────────────────────────────────────────────────┘
```

This screen feeds the cover-letter generator (which lives in `22-job-discovery.md` "Tailor CV" flow).

## State diagram

```
[loading: connecting GitHub/LeetCode/Kaggle]
  → [evidence harvested]
     → [graph rendered]
        ↓ click claim
        [claim drawer]
          ↓ edit claim or add evidence
          [graph updates: re-layout animation]
        ↓ click evidence node
        [evidence detail popover]
        ↓ context: viewing JobCard
        [JD-matching view]
```

## Data model (frontend slice)

```ts
interface EvidenceState {
  claims: Claim[];
  evidence: Evidence[];
  links: { claimId: string; evidenceId: string; weight: number }[];
  filters: { strength: 'all' | 'strong' | 'medium' | 'weak'; sourceTypes: SourceType[] };
  selectedClaim: Claim | null;
  selectedEvidence: Evidence | null;
}

interface Claim {
  id: string;
  text: string;          // "Python · 5y"
  category: 'lang' | 'framework' | 'domain' | 'tool' | 'soft';
  strength: 0 | 1 | 2 | 3 | 4 | 5;
  derived: boolean;       // auto-extracted from CV?
  custom: boolean;        // user-added?
}

interface Evidence {
  id: string;
  type: 'github' | 'leetcode' | 'kaggle' | 'blog' | 'talk' | 'hackathon' | 'cert' | 'project' | 'manual';
  title: string;
  description?: string;
  url?: string;
  date: Date;
  metrics: Record<string, unknown>;  // stars, LOC, rating, etc.
  verifiable: 'public' | 'private';
  source: 'auto' | 'manual';
}
```

## Interactions & micro-animations

- **Mount**: graph springs into position; claims animate in left-to-right, evidence right-to-left, edges draw last
- **Hover claim node**: node ring pulses; connected evidence highlights, others fade to 30%
- **Click claim**: focuses the node + drawer slides in
- **Add evidence**: graph re-layouts smoothly (Framer Motion `layout` prop on react-flow nodes)
- **Strength bar fill**: dots animate fill 1 → N over 480ms
- **Empty claim** (no evidence): node renders with dashed border + small "+" icon — click to add evidence

## Empty / loading / error states

- **No connections, no manual evidence**: hero illustration + "Connect GitHub / LeetCode to start building your evidence graph." + connect buttons
- **Some sources connected, slow harvest**: "Reading your GitHub..." progress bar; partial graph renders as data arrives
- **Source rate-limited**: "GitHub rate-limited; will refresh in 1h" chip on graph; existing evidence still shown
- **Manual-only mode**: works with zero connections — user adds evidence manually

## Edge cases & India-specific gotchas

- **Indian college projects** are often in offline portfolios (PDF, paper, Drive links) — manual entry must be friction-free
- **Hindi/Tamil/Telugu blog posts** counted; language detection via metadata; supports same claims as English equivalents
- **Hackathons** common in India (HackerEarth, Devfolio, MLH) — first-class source type with scraper integration where possible
- **Internshala internships** are evidence — separate from full-time experience
- **NPTEL / Coursera certificates** — common in India; auto-detected if user grants email read access for completion emails (DPDP-aware)
- **Confidential corporate work** ("I built X at TCS but it's NDA'd") — labeled non-verifiable, surface when JD comes from same company industry
- **Unstop / TCS NQT scores** — counted as evidence for fresher persona

## Strength algorithm (transparent)

Score per claim is the weighted sum of evidence weights, normalized to 0–5 dots.

| Source type | Default weight |
|---|---|
| GitHub repo with > 50 stars | 1.0 |
| GitHub repo with > 10 stars | 0.7 |
| Personal GitHub repo (no stars but 1k+ LOC) | 0.5 |
| LeetCode rating > 1800 | 0.8 |
| LeetCode rating 1500–1800 | 0.5 |
| Kaggle bronze/silver/gold | 0.6 / 0.8 / 1.0 |
| Blog post (Medium / Hashnode) | 0.3 |
| Conference talk | 1.0 |
| Local meetup talk | 0.6 |
| Hackathon win (top 3) | 0.7 |
| Hackathon participation | 0.3 |
| Cert (industry-recognized) | 0.5 |
| Cert (course completion) | 0.2 |
| College capstone project | 0.4 |
| Manual + verifiable | 0.6 |
| Manual + confidential | 0.4 |

User can override weights in settings (advanced).

## Cross-doc links

- Force-directed canvas: `11-components-composite.md` (component patterns reused)
- Evidence node UI: `11-components-composite.md` EvidenceGraphNode
- Strength bars: `12-data-viz.md` Stat tile pattern
- Cover-letter generator (uses claim-vs-JD output): `22-job-discovery.md`
- DPDP consent for harvesting public data: `36-settings-billing.md`

## Open questions

1. **Skill-graph public-share**: should users be able to share a public read-only evidence graph (`careerops.in/u/aman-b/evidence`)? — Yes, opt-in (Reverse Job Board #11). Default off.
2. **AI-suggested claims** ("Based on your repos, you can claim 'event-driven systems' — add it?") — Yes, surface as suggestions in side rail.
3. **JD parsing precision** (does "5+ yrs" really mean 5? sometimes "3+" implied) — fuzz the matching: ≥80% of claim threshold is a match; show graceful messaging.
4. **Cover-letter angle automation**: do we auto-write the "JD asks X; I have Y" line, or surface it as a suggestion? — Auto-draft, user edits. Edit treated like DM editor (gold-100 highlight on diff).
