# 11 — Component Library: Composites

> Components built from primitives, specific to CareerOps domain. These appear across multiple module specs and need a single canonical definition.

---

## JobCard

The most-rendered component in the product. Lists, dashboards, search results, recommendations — every surface eventually shows a JobCard.

### Anatomy (default / `md` density)
```
┌──────────────────────────────────────────────────────────────┐
│ [Logo] Senior Backend Engineer                  [Bookmark]   │
│        Razorpay  ·  Bangalore · T1  ·  Posted 3d ago         │
│                                                               │
│ ₹32–42L    Full-time  ·  4–7y  ·  Hybrid (3d/wk)            │
│                                                               │
│ [Ghost 12%] [Bond ✓] [Match 87%]   [WFH] [Stock] [Joining]  │
│                                                               │
│ "Looking for a senior backend engineer to lead our payments  │
│  reliability team..."                                         │
│                                                               │
│ ─────────────────────────────────────────────────────────────  │
│  3 mutual contacts · referral path available                  │
│  [View referrers]  [Tailor CV]  [Apply ›]                    │
└──────────────────────────────────────────────────────────────┘
```

### Density modes
- **Compact** (1-line meta + title only) — used in dense rails, sidebar lists
- **Default** — shown above
- **Expanded** (with full JD excerpt + match breakdown) — used in dashboard primary tile

Container queries (see `04-spacing-grid-layout.md`) auto-collapse based on width.

### Interactive states
- Hover: lift 2px + soft shadow + outline `--border-strong`
- Click anywhere except actions → opens detail drawer
- Right-click (or long-press on mobile): context menu (Save, Hide, Share internally with cohort, Add to "later")

### Content slots
| Slot | Required | Type |
|---|---|---|
| `logo` | yes | URL or initials fallback |
| `title` | yes | string |
| `company` | yes | string |
| `location` | yes | object `{ city, tier }` |
| `postedAt` | yes | ISO date |
| `salary` | maybe (often hidden) | object `{ min, max, currency, confidence }` |
| `employment` | yes | enum |
| `experience` | yes | object `{ min, max }` |
| `wfh` | maybe | enum (`remote` / `hybrid` / `onsite`) |
| `ghostScore` | yes | 0–1 (hidden if < 0.1) |
| `matchScore` | yes | 0–1 |
| `bondFlag` | maybe | object with reason |
| `benchFlag` | maybe | object with reason |
| `referralPath` | maybe | summary `{ count, top: avatar[] }` |
| `excerpt` | maybe | string (~140 chars) |

### Sub-components used inside
- `CompanyLogo`
- `LocationBadge` (renders city + tier)
- `MoneyRange` (LPA-aware)
- `GhostScoreMeter` (mini pill variant)
- `BondBadge`
- `MatchScoreMeter`
- `ChipRow` (for the WFH/Stock/Joining tags)
- `AvatarStack` (referrers preview)
- `ButtonGroup` (action buttons)

### Anti-patterns
- ❌ Truncating the title with ellipsis at `md` size (always 2 lines max, with `text-overflow: -webkit-line-clamp`)
- ❌ Showing salary range without confidence indicator
- ❌ Burying referral path below the fold
- ❌ Mixing branded portal logos with our generic chrome (use generic dot + label)

---

## ReferralPathGraph

The headline visualization for the ⭐ Referral Hijack Engine (#23).

### Visual
Force-directed node graph showing **You → mutual contacts → target company employees**. Nodes are circular avatars; edges are styled lines.

```
   You ●
    │\
    │ \
    ●  ● mutual A,B (1st degree)
    │  │\
    │  │ \
    ●  ●  ● target employees (2nd degree)
```

### Node styles
| Node | Color | Stroke |
|---|---|---|
| You | `--brand` | 2px gold ring |
| 1st-degree (your contact) | neutral | 1px `--border-default` |
| 2nd-degree at target | `--accent` (gold) | 2px `--brand` |
| Target company employees (no path) | `--text-muted` greyscale | dashed |

### Edges
- Solid `--border-default` for confirmed connections
- Dashed for inferred/weak ties
- Edge thickness encodes connection strength (1px → 4px)
- Hover edge → tooltip showing connection type ("worked together at X, 2018–2020")

### Interactions
- Drag node → re-position; physics simulation re-stabilizes
- Click 2nd-degree node → side panel with referrer score breakdown + DM composer
- Pinch / scroll-wheel → zoom (range 0.5×–3×)
- Double-click target node → focus mode (other nodes fade to 30%)
- Reset button (top-right): re-centers + restores layout

### Library
[`react-flow`](https://reactflow.dev) customized — handles physics + zoom + pan + accessibility. Strict palette.

### Performance
- Cap visible: 100 nodes max. Beyond → cluster ("12 more at Razorpay")
- Use `nodeOrigin={[0.5, 0.5]}` and `proOptions={{ hideAttribution: true }}`
- Stop physics simulation after 3s; restart on drag

### Accessibility
- Tab through nodes in score order (highest first)
- Each node has aria-label with name, company, score
- "Skip graph, show as list" affordance for screen readers

---

## GhostScoreMeter

Visualizes ghost-job probability 0–1.

### Variants
- **Pill** (in JobCard) — 12px tall, `Ghost 12%` with a tiny ghost icon, color shifts:
  - 0–0.3: neutral text on `--bg-raised`
  - 0.3–0.6: gold-200 on `gold-50`
  - 0.6–1.0: gold-700 on `gold-100`
- **Dial** (in detail drawer) — 80px circular gauge, gold-tone fill, center value as Geist 700 24px

### Interaction
Tap pill → popover with the 5 contributing signals:
- Posting age
- Recruiter posting velocity
- "Urgent" + no salary patterns
- Company hiring velocity cross-check
- Re-post detection

Each signal has a weight bar.

---

## SalaryRangeViz

Used in JobCard (compact), detail drawer (expanded), salary leak page (full).

### Compact (in JobCard)
Just text: `₹32–42L` with confidence dot (filled = high, hollow = low).

### Expanded
A horizontal range bar with market overlay:

```
Your target ─────╾━━━━━━━━╼─────
                ▼
Market median: ₹38L  ─────────━━━━━━━━━━━─────
                              ▲
JD posted band: ₹32–42L
```

- User's target shown as draggable thumb
- Market median: gold tick on the same axis
- JD band: teal range fill
- Confidence: bar opacity (low confidence = lighter)
- Sources triangulated: small chips below ("Levels.fyi · AmbitionBox · Reddit · Recruiter posts")

---

## BondBadge / BenchBadge

When detected, renders inline within JobCard's chip row.

### Visual
- `Bond 2y` — gold-700 outline, gold-warning leading icon (BondLink custom icon)
- `Bench risk` — same treatment with BenchClock icon

### Interaction
Tap → popover with:
- Exact JD line that triggered (highlighted)
- 2–3 Glassdoor review excerpts
- Severity tier (low / medium / high)
- "Hide jobs with this flag" toggle

---

## ATSCompatibilityRing

Circular gauge showing how well the user's CV matches the target ATS.

### Visual
- 80px circular ring, stroke `teal-500` filled clockwise
- Center: percentage `92%` Geist 700 28px
- Below: ATS name (`Greenhouse`, `Workday`, `Naukri parser`, etc.)

### Interaction
Tap ring → drawer with:
- Section-by-section breakdown (Experience: 95%, Skills: 88%, Education: 100%, Format: 80%)
- Specific issues ("Unicode bullet • not parsed correctly", "Date format inconsistent")
- "Auto-fix" button regenerates a tailored variant

---

## EvidenceGraphNode

Used in Skill-Claim Prover (#24).

### Visual
A compact card representing one piece of evidence:
```
┌─────────────────────────┐
│ [icon] GitHub repo      │
│ async-django-toolkit    │
│ ★ 142  ·  Python 87%    │
│ ─────────────────────────  │
│ supports: "Django 4y"   │
└─────────────────────────┘
```

- Icon represents source type (GitHub, LeetCode, Kaggle, blog, talk, hackathon)
- "supports" line shows which claims this evidence backs
- Click → opens source in new tab (or modal preview for embedded)

In the canvas view, edges connect EvidenceGraphNode → ClaimNode.

---

## TimelineCard

Used for application history, interview events, negotiation timeline.

### Visual
Vertical stem with dots at events:
```
●─ 2026-04-12  Applied to Razorpay Senior Backend
│  via Naukri Easy Apply
│
●─ 2026-04-15  Auto-reply received
│
●─ 2026-04-18  Recruiter call scheduled
│  Apr 22, 4:00 PM IST
│
○─ Interview pending
│
○─ Offer pending
```

- Filled dot: event happened
- Hollow dot: future / pending
- Color: filled events use `--brand`; pending use `--text-muted`
- Hover row: shows event details popover

---

## CompanyHealthCard

Used in "Bad Vibes" detector context (#13 in `04-features.md`, surfaced inside `22-job-discovery.md`).

```
┌─────────────────────────────────────┐
│ Razorpay                            │
│ ─────────────────────────────────── │
│ Glassdoor sentiment   ▲ improving   │
│ Employee turnover     ▽ low         │
│ Recent layoffs        none          │
│ Founder activity      stable        │
│                                     │
│ Verdict: ✓ green                    │
└─────────────────────────────────────┘
```

Verdict: `green` / `yellow` / `red` (rendered in palette: teal-500 / gold-400 / gold-700).

---

## InterviewerOnePager

Used in Interview Time Machine (#28).

```
┌─────────────────────────────────────────┐
│ [avatar]  Priya Krishnan                │
│           Engineering Manager · Razorpay │
│ ─────────────────────────────────────── │
│ Tenure: 4y at Razorpay                  │
│ Past: Cred (2y), Flipkart (3y)          │
│ Tech focus: payments, fraud, ML         │
│                                         │
│ Recent posts (3)                        │
│ • "What I look for in senior eng..."    │
│ • Conf talk: scaling auth services      │
│ • Tweet about hiring philosophy         │
│                                         │
│ Predicted style: depth-first, sys-design│
│                                         │
│ [Open LinkedIn]  [Add prep notes]       │
└─────────────────────────────────────────┘
```

---

## DMComposer

The referral DM editor — a textarea + AI-assist + send queue.

### Anatomy
```
┌──────────────────────────────────────────┐
│ To: Priya Krishnan (mutual: Aman, IIT)   │
│ Subject: Re: Razorpay senior backend     │
│ ─────────────────────────────────────── │
│ Hi Priya,                                │
│                                          │
│ I noticed you wrote about scaling Razorp │
│ ay's auth services last month — really   │
│ enjoyed [...]                            │
│                                          │
│ [AI typing effect, gold cursor]          │
│ ─────────────────────────────────────── │
│ [Variants: Warm | Direct | Executive]    │
│ [Schedule send] [Send now ›]             │
└──────────────────────────────────────────┘
```

- AI-generated draft with editable inline diff (highlighted edits in gold-100 bg)
- Variant tabs to swap tone — re-generates body
- "Schedule send" → date/time picker (default: next weekday 10:00 AM IST recipient timezone)
- 5-second undo toast on send

### Validation
- Personalization-quality score (0–1) shown subtly above send button — encourages user to mention something specific. Hidden if user explicitly opts out.

---

## CountdownRing

Reused for: 5-second undo toasts, send-scheduled timers, OTP expiry.

- 24px circular SVG with `stroke-dasharray` animated linearly
- Center text: numeric countdown
- Stroke: `--brand` for ongoing, `--accent` when ≤ 3 seconds remain

---

## CitationFootnote

For trust-through-transparency: every algorithmic claim has a footnote.

```
₹18–24L (high confidence ⓘ)
```

Hover/tap (ⓘ) → popover lists sources with weights:
- Levels.fyi: 3 data points, weight 0.4
- AmbitionBox: 12 data points, weight 0.3
- Reddit r/developersIndia: 2 mentions, weight 0.15
- Recruiter's other postings: 1 instance, weight 0.15

---

## EmptyState (composite)

Used when a list/canvas/graph has no content.

### Anatomy
```
┌─────────────────────────────────────────┐
│                                          │
│           [illustration ~120px]          │
│                                          │
│           No referrers found yet         │
│                                          │
│   We'll keep watching your network and   │
│   notify you the moment a path opens.    │
│                                          │
│            [Add LinkedIn auth ›]         │
│                                          │
└─────────────────────────────────────────┘
```

- Illustration uses claymorphism mascot (small budget; see `07-trending-design-tactics.md`)
- Headline: 18px Fraunces 600
- Description: 14px Geist 400, max 2 lines
- One primary action (max)

---

## ErrorBoundary card

For component-level error capture.

```
┌─────────────────────────────────────────┐
│ Something went wrong rendering this.    │
│                                          │
│ This is on us. The team has been notified│
│                                          │
│ [Reload component]  [Report]             │
└─────────────────────────────────────────┘
```

Sentry captures the stack; user gets dignified copy. No raw error strings.

---

## NotificationCenter

Top-bar bell → drawer with notifications grouped by date.

### Notification types
- `referral_reply` — gold accent
- `interview_scheduled` — teal accent
- `offer_received` — gold accent (with expressive scale-in)
- `match_found` — teal accent
- `digest_summary` — neutral
- `system` — neutral

Each notification: avatar (or icon), message, timestamp, action.

---

## CommandPalette

Built on [`cmdk`](https://cmdk.paco.me).

- ⌘K toggles
- Sections: Recent, Jobs, Companies, Actions, Settings, Pages
- Each item: leading icon, label, optional trailing keybind
- Fuzzy match across all sections
- Keyboard nav, Enter to select
- Glassmorphism panel (see `07-trending-design-tactics.md`)

### Default actions surfaced
- "New job filter"
- "Toggle stealth mode"
- "Toggle theme"
- "Open settings"
- "Sign out"
- "Submit feedback"

---

## ConsentChip

For DPDP transparency. Inline indicator that data was used.

```
This score uses your LinkedIn data ⓘ  [Manage]
```

- 13px text on subtle bg
- "Manage" links to consent center

Used: anywhere user data is processed visibly (referrer match, evidence graph, recommendations).

---

## Composition rules

- Composites import only primitives + other composites
- Composites are presentation-only — they receive data, render, emit events. State lives in feature stores (Zustand) or server-state (TanStack Query).
- Storybook stories cover: empty, loading, default, full, error, mobile, dark mode, reduced-motion
