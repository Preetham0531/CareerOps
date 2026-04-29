# 23 — Referral Hijack Engine

## Purpose
The single most valuable feature in this product (per `docs/04-features.md`). Given a target job/company, find 2nd-degree paths into the company through the user's network, score each potential referrer, draft a personalized DM, and queue/send/track replies.

In India, 70%+ of hires happen through referrals — a warm intro is worth 100 cold applies. This module is the lead, not a support feature.

## Personas served
All four. Most heavily used by Priya (surgical), Anjali (women's networks), Karan (executive whisper-network).

## Entry points
- JobCard → preview pane → "Referral paths" section → "View referrers"
- Side nav → "Referrers"
- ⌘K → "Find referrers at <company>"
- Dashboard "Referrer paths waiting" tile → click row

## Layout

Shell B (Focused canvas) per `04-spacing-grid-layout.md` — full-bleed, side nav collapsed/hidden.

```
┌─────────────────────────────────────────────────────────────────┐
│ TOPBAR (minimal): [✕ close]        Razorpay · Senior BE         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                                                                  │
│              [REFERRAL GRAPH CANVAS]                             │
│                                                                  │
│                Force-directed graph                              │
│                You ─┬─ mutual contacts ─┬─ target employees      │
│                     │                    │                        │
│                     │                    │                        │
│                                                                  │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│ ACTIONS RAIL                                                     │
│ [Sort: Match score ▾]  [Filter: Active recently ▾]  [Refresh]   │
└─────────────────────────────────────────────────────────────────┘
```

Side rail (toggleable, default open on desktop):

```
┌─────────────────────────────┐
│ TOP REFERRERS                │
│                              │
│ 1. [👤] Priya Krishnan       │
│    EM · Razorpay · Match 0.87│
│    Active · IIT batchmate    │
│    [Compose DM]              │
│                              │
│ 2. [👤] Aman Bhargav         │
│    SDE · Razorpay · 0.62     │
│    Inactive 3w · prev co.    │
│    [Compose DM]              │
│                              │
│ 3. [👤] Sara Singh           │
│    PM · Razorpay · 0.58      │
│    Active · mutual: 4 friends│
│    [Compose DM]              │
│                              │
│ 4. [👤] ...                  │
│                              │
│ Show: [10 of 32]             │
└─────────────────────────────┘
```

## Key screens

### Screen 1 — Graph canvas (default view)

Force-directed graph (see `12-data-viz.md`):
- **You** node: center, gold ring
- **1st-degree** ring: your direct connections at the target company OR mutual to target employees
- **2nd-degree** ring: target company employees you can reach through mutuals
- **Target employees with no path**: outer dim ring, dashed edges

Color encoding (per `02-color-system.md`):
- You: filled `--brand`
- 1st-degree connection: neutral
- 2nd-degree at target with reachable path: `--accent` (gold)
- Target employee with no path: `--text-muted`

Edge encoding:
- Solid: confirmed connection (LinkedIn 1st-degree)
- Dashed: inferred (mutual friend)
- Edge thickness 1–4px: strength of connection (worked together > school overlap > general mutual)

Hover edge → tooltip: "Worked together at PhonePe 2018–2020"

### Screen 2 — Referrer scorecard (drawer)

Click a 2nd-degree node → side drawer:

```
┌──────────────────────────────────────────────────┐
│ [✕]                                                │
│                                                    │
│ [Avatar 64px]                                      │
│ Priya Krishnan                                     │
│ Engineering Manager · Razorpay                     │
│ [LinkedIn] [Open profile]                          │
│                                                    │
│ ─────────────────────────────────────────────── │
│ REFERRER SCORE: 0.87  ⓘ                           │
│ [radial gauge 80px]                                │
│ ─────────────────────────────────────────────── │
│                                                    │
│ Reachability breakdown:                            │
│   School / batch overlap   ████████ 0.8           │
│   Prior co. overlap         ██░░░░░ 0.2           │
│   Mutual friend strength    ██████░░ 0.6          │
│   LinkedIn activity         ██████████ 1.0        │
│   Tenure at company         ████████ 0.8          │
│   Seniority weight          ██████░░ 0.6          │
│                                                    │
│ Path:                                              │
│ You ─ Aman B (IIT) ─ Priya K                       │
│                                                    │
│ Recent activity:                                   │
│ • Posted about scaling auth services (3d ago)     │
│ • Spoke at PyConf India 2025                       │
│ • Hiring post on Twitter (2w ago)                  │
│                                                    │
│ Mutual friends (4):                                │
│ [Aman B] [Sara S] [Vikram K] [+1]                  │
│                                                    │
│ ─────────────────────────────────────────────── │
│ [Compose DM ›]                                    │
└──────────────────────────────────────────────────┘
```

Score breakdown bars use teal-500 fill on `--bg-raised` track. Each metric tap → popover with calculation method (trust transparency).

### Screen 3 — DM composer (drawer or modal, contextual)

```
┌──────────────────────────────────────────────────────┐
│ [✕]    Compose DM to Priya Krishnan                   │
│                                                        │
│ ─────────────────────────────────────────────────── │
│ TONE        [Warm] [Direct] [Executive]               │
│ ─────────────────────────────────────────────────── │
│                                                        │
│ Subject: Re: Razorpay Senior Backend role              │
│                                                        │
│ Hi Priya,                                              │
│                                                        │
│ I really enjoyed your post last week about scaling    │
│ Razorpay's auth services — particularly the bit on    │
│ JWT rotation under load. We hit a similar wall at     │
│ PhonePe and ended up with a sliding-window approach.  │
│                                                        │
│ I'm exploring senior backend roles and saw the open   │
│ position on your team. I'd love to hear if you'd be   │
│ open to a quick referral chat.                        │
│                                                        │
│ My GitHub: github.com/aman-b                          │
│ My CV: [tailored variant attached]                     │
│                                                        │
│ Thanks,                                                │
│ Aman                                                   │
│                                                        │
│ [AI typing effect cursor when generating]             │
│                                                        │
│ ─────────────────────────────────────────────────── │
│ Personalization quality: ●●●●○  Strong                │
│ Used signals: recent post + technical specifics       │
│ ─────────────────────────────────────────────────── │
│ Schedule: [Send now ▾] [Tomorrow 10am IST]            │
│                                                        │
│              [Cancel]    [Save draft]    [Send ›]     │
└──────────────────────────────────────────────────────┘
```

- AI generates draft on entry; user can edit inline (changes shown as gold-100 highlights via inline-diff library)
- Tone tabs swap the tone; regenerates body, preserves user edits where possible
- Personalization quality: 0–5 dots based on whether the message references something specific to the recipient (not generic). Hidden if user opts out.
- Schedule send: defaults to "next weekday 10:00 AM IST" — best response window per `30-application-dna.md`
- Send button: 5-second undo toast on click
- Save draft: persists to drafts list; reopen via ⌘K → "Drafts"

### Screen 4 — Send queue / tracking

```
┌──────────────────────────────────────────────────┐
│ Sent referrers                                    │
│                                                    │
│ ┌────────────────────────────────────────────┐  │
│ │ [👤] Priya Krishnan · Razorpay              │  │
│ │ Sent 2026-04-26  ·  Replied 2d  ·  ●●●○○    │  │
│ │ Reply: "Sure, when can you chat?"            │  │
│ │ [View thread]   [Schedule call]              │  │
│ └────────────────────────────────────────────┘  │
│                                                    │
│ ┌────────────────────────────────────────────┐  │
│ │ [👤] Aman Bhargav · Razorpay                │  │
│ │ Sent 2026-04-24  ·  No reply (4d)  ·  ●●●●○ │  │
│ │ [Auto-escalate to next: Sara S]             │  │
│ │ [Send follow-up]                             │  │
│ └────────────────────────────────────────────┘  │
│                                                    │
│ ┌────────────────────────────────────────────┐  │
│ │ [👤] Vikram Khanna · Razorpay               │  │
│ │ Scheduled to send  Tomorrow 10:00 AM IST     │  │
│ │ [Edit] [Cancel]                              │  │
│ └────────────────────────────────────────────┘  │
│                                                    │
└──────────────────────────────────────────────────┘
```

- Active dots indicate engagement signals (read receipts where available, profile views, replies)
- Auto-escalation: when no reply for 4 days, prompt to send to next-best referrer (no auto-spam — always user-confirmed)
- Per `01-design-principles.md` reversibility: scheduled sends cancellable up to T-30s

## State diagram

```
[graph loading: searching network]
  → [graph rendered]
     ↓ click 2nd-degree node
     [scorecard drawer]
       ↓ click Compose DM
       [DM composer drawer]
         ↓ Send (or Schedule)
         [confirmation toast w/ undo]
         ↓ undo period elapses
         [DM sent / queued]
           ↓ async
           [reply received | timeout]
           [auto-escalation prompt | followup prompt]
```

## Data model (frontend slice)

```ts
interface ReferralState {
  target: { jobId: string; company: string; role: string };
  graph: { nodes: GraphNode[]; edges: GraphEdge[] };
  topReferrers: ReferrerProfile[];
  selected: ReferrerProfile | null;
  composer: { open: boolean; referrerId: string | null; draft: string; tone: 'warm' | 'direct' | 'executive' };
  sentQueue: SentDM[];
  scheduledQueue: ScheduledDM[];
}
```

Backed by:
- LinkedIn API + scraping (per `05-legal-compliance.md` posture)
- GitHub for evidence cross-references
- Email/LinkedIn DM API where available; assist mode where not

## Interactions & micro-animations

- **Graph mount**: physics simulation runs, nodes spring into position over 1.2s
- **Hover node**: node scales 1.1×, edges to it brighten to `--brand`, others dim to 30%
- **Click node**: drawer slides in from right (`gentle` spring), node centers in viewport, others fade
- **Score bar fill**: animates from 0 to value over 480ms `emphasized`
- **DM compose typing**: AI types at ~30 chars/sec with gold cursor block
- **Send confirmation**: paper-plane icon lifts off the send button and fades over 600ms
- **Reply received**: notification toast with gold accent + small particle burst on the referrer's row in queue
- **Auto-escalation prompt**: gentle bottom-sheet on dashboard — "No reply from Priya in 4 days. Try Sara next?"

## Empty / loading / error states

- **Network not connected**: empty state — "Connect LinkedIn to find referrers" with onboarding-style hero
- **Network connected, 0 paths**: "No paths into Razorpay yet. We'll keep watching as your network grows." Suggestions: connect more accounts, expand mutual-friend coverage
- **Graph load failure**: ErrorBoundary with retry; falls back to list-only view (top referrers without graph)
- **DM send failure (rate-limited)**: toast "LinkedIn rate-limited. Will retry in 4h. Or send manually." with copy-to-clipboard option
- **LinkedIn auth expired**: prompt to reconnect at top

## Edge cases & India-specific gotchas

- **Same-school graduates** weighted heavily (Indian alumni networks are strong — IIT, NIT, BITS, IIIT, VIT, etc.)
- **Service-company alumni**: someone from the same TCS / Infosys / Wipro batch is a strong tie even years later
- **Conference / hackathon co-attendees**: surfaced as ties when discoverable
- **Recruiters as separate node category**: clearly labeled "Recruiter at Razorpay" — different DM template
- **Stealth mode active**: warns user before sending DM that the recipient may share with hiring team; offer pseudonym DM mode
- **WhatsApp DM as alternative** (per #6 in `04-features.md`) — when LinkedIn rate-limits, surface "DM on WhatsApp" if mutual contact is willing to bridge
- **Don't-DM list**: users from current employer auto-excluded; user can manually exclude others (caste/community/political reasons — silent, no UI shaming)

## Personalization signals (DM generator)

The AI draft references one or more of:
- Recent LinkedIn post by recipient (last 30d)
- Talk / conf appearance
- GitHub project starred / contributed by recipient
- Shared school / batch / company
- Mutual friend's recent interaction with recipient
- Hiring post (if recipient explicitly said "hiring")

Without ≥ 1 personalization signal, the AI refuses to draft and surfaces a "We need more signal — try LinkedIn full-profile access" prompt.

## Cross-doc links

- Graph component: `11-components-composite.md` ReferralPathGraph
- Color/scoring viz: `12-data-viz.md`
- DM composer: `11-components-composite.md` DMComposer
- Citation footnotes (sources): `11-components-composite.md` CitationFootnote
- Scheduled-send timing logic: `30-application-dna.md` (best-response-windows learning)
- DPDP consent for using network data: `36-settings-billing.md`

## Open questions

1. **DM sent through LinkedIn API vs. assist mode?** API is cleaner but rate-limited and ToS-sensitive. Default to assist mode (open LinkedIn, prefill draft, user clicks send) for v0.1 — full automation behind a per-user opt-in.
2. **Auto-escalation cadence**: 4 days is the default. User-tunable? — yes, in settings; 4d is a research-backed default for India (most replies come within 3 days of read).
3. **What happens if recipient blocks user?** — Mark referrer as inactive, do not auto-escalate to others connected through them, preserve graph integrity.
4. **Cross-platform DMs (LinkedIn → WhatsApp → Email)?** — Detect best-channel based on activity; ranked: LinkedIn > Email > WhatsApp > Twitter. User can override.
