# 29 — Negotiation Co-Pilot

## Purpose
After offer arrives, walk the user through negotiation with a market-anchored counter-offer drafter, role-play voice mode, and India-specific clause coaching. Most candidates leave money on the table because negotiation is uncomfortable; this module makes it mechanical.

## Personas served
Heaviest use: Priya (mid-career, knows market, just needs the talking points), Karan (executive, multi-component package). Some Anjali (less negotiation experience, needs more coaching). Lower priority for Ravi (fresher, often weaker negotiation leverage but still useful).

## Entry points
- "Offer received" event in application timeline → "Negotiate this" button
- ⌘K → "Negotiate offer at <company>"
- Side nav → "Negotiations" (active + history)
- Browser extension when on offer-letter page

## Layout

Shell C (wizard split) — 60% content, 40% preview/hints rail:

```
┌─────────────────────────────────────────────────────────────────┐
│ STEP 2 of 5: Counter-offer ━━━●━━━━━━━━━━━━━                    │
├──────────────────────────────────────┬──────────────────────────┤
│                                       │                          │
│  YOUR OFFER                           │  MARKET ANCHOR           │
│  Razorpay · Senior Backend            │  ─────────────────────  │
│  Base       ₹28L                      │  Levels.fyi · n=18       │
│  Variable   ₹4L                       │  P50: ₹32L · P90: ₹38L  │
│  Joining    ₹2L                       │                          │
│  ESOP       0.05% (1y cliff, 4y vest) │  YOU ARE BELOW MEDIAN    │
│  Total CTC  ₹34L                      │  by ₹4L (~12%)           │
│                                       │                          │
│  ─────────────────────────────────── │                          │
│  YOUR TARGET                          │  CONFIDENCE              │
│  Base    ●━━━━━━━━━━━━━━━━━━●         │  ●●●●○ High             │
│  ₹32L  ───────────────  ₹38L          │                          │
│                                       │  ─────────────────────  │
│  Variable comfort                     │  PEER COMPS              │
│  ●━━━━━━━━━━●                         │                          │
│  ₹4L  ────  ₹8L                       │  Cred: P50 ₹34L          │
│                                       │  PhonePe: P50 ₹32L       │
│  ESOP                                 │  Zerodha: P50 ₹38L       │
│  ☐ Negotiate higher %                 │                          │
│  ☐ Push for accelerated vesting       │                          │
│  ☑ Standard cliff fine                │                          │
│                                       │                          │
│  Joining bonus                        │                          │
│  Push to: [₹6L  ▾]                    │                          │
│                                       │                          │
│  WFH days                             │                          │
│  ☑ Lock 3 days/week WFH in writing    │                          │
│                                       │                          │
│  Notice-period buyout                 │                          │
│  ☑ Ask employer to cover 60-day notice│                          │
│                                       │                          │
│  Re-evaluation in 6 months            │                          │
│  ☐ Optional clause                     │                          │
│                                       │                          │
│  [< Back]                  [Continue >]│                          │
└──────────────────────────────────────┴──────────────────────────┘
```

## Five-step wizard

### Step 1 — Capture the offer
User pastes offer-letter text or fills form. AI extracts structured fields. Confirm-and-edit pattern.

### Step 2 — Set targets
As shown above. Sliders for base/variable; checkboxes for ESOP / WFH / joining / notice-buyout.

### Step 3 — Choose tone
Three drafts generated. User picks one and edits.

```
┌──────────────────────────────────────────────────┐
│ TONE                                              │
│ [Collaborative] [Firm] [Aggressive]              │
│                                                    │
│ Subject: Excited to join — quick question on     │
│          comp                                     │
│                                                    │
│ Hi Priya,                                          │
│                                                    │
│ Thanks for the offer. I'm genuinely excited to   │
│ join Razorpay's payments reliability team.       │
│                                                    │
│ Before signing, I wanted to discuss the comp.    │
│ Based on Levels.fyi data for L4–L5 SDE at        │
│ Razorpay (and peer companies), the median total  │
│ comp sits around ₹38L. The current offer of      │
│ ₹34L is ~12% below that median.                   │
│                                                    │
│ I'd like to propose: base of ₹34L (current ₹28L  │
│ + ₹6L), keeping variable at ₹4L, joining bonus   │
│ adjusted to ₹6L (current ₹2L) to cover my notice │
│ buyout. Total target: ₹44L (~12% above current   │
│ offer).                                            │
│                                                    │
│ Happy to discuss on a call if easier.            │
│                                                    │
│ Thanks,                                            │
│ Aman                                               │
│                                                    │
│ ─────────────────────────────────────────────── │
│ [Save draft]    [Send when ready ›]               │
└──────────────────────────────────────────────────┘
```

### Step 4 — Role-play voice mode
Optional. AI plays the recruiter; user practices phrasing. 5–10 min session, transcript saved, feedback after.

### Step 5 — Send & track
Pick channel (email, LinkedIn, or copy-to-clipboard). Track recruiter reply. Handle counter-counter.

## State diagram

```
[offer received event]
  → [step 1: capture]
     → [step 2: target]
        → [step 3: draft + tone]
           ↓ optional
           → [step 4: role-play]
        → [step 5: send]
           ↓ recruiter replies
           [counter received: handle next round]
              ↓
              [accept | counter-back | walk away]
```

## Key components

### CounterOfferComposer
Reuses DMComposer pattern (`11-components-composite.md`) — 3 tone tabs, AI typing effect, inline diff for edits, schedule-send.

### MarketAnchorRail
Compact viz showing user's offer vs. market percentiles, auto-updates as user adjusts targets.

### ClauseChecklist
List of India-specific negotiation levers:
- Joining bonus (often easier to push than base)
- ESOP vesting cliff acceleration on layoff
- Notice-period buyout
- Variable %  → push for higher fixed
- WFH days (in writing, not "manager's discretion")
- Re-evaluation in 6 months
- Sign-on stock refresh
- Relocation allowance
- Health insurance coverage upgrade (significant in India)
- Dependents covered (parents, important in India)

Each clause has tooltip with explanation + typical value range.

### RolePlayVoice
Same engine as `28-interview-time-machine.md` mock; trained on recruiter-side phrasing. Records, transcribes, gives feedback.

## Data model

```ts
interface NegotiationState {
  offerId: string;
  offer: { base: number; variable: number; joining: number; esop: ESOPDetails; totalCTC: number; perks: string[] };
  market: { p10: number; p50: number; p90: number; n: number; sources: SourceType[] };
  target: { base: [number, number]; variable: [number, number]; joining: number; esopAsks: ESOPAsk[]; clauses: ClauseAsk[] };
  draft: { tone: 'collaborative' | 'firm' | 'aggressive'; subject: string; body: string; channel: 'email' | 'linkedin' | 'copy' };
  rolePlaySessions: RolePlaySession[];
  history: NegotiationRound[];  // multiple counter-counters
  status: 'drafting' | 'sent' | 'replied' | 'accepted' | 'walked-away';
}
```

## Interactions & micro-animations

- Slider value change → market anchor rail updates (smooth interpolation)
- Tone tab swap → body re-generates with AI typing effect
- ClauseChecklist toggle → counter-draft updates inline (gold-100 highlight on changed lines)
- Send: 8-second undo toast (extended from default; this is high-stakes)
- Recruiter reply received → notification with celebrate-bouncey animation if positive

## Empty / loading / error states

- **First negotiation** — coaching banner: "First time? Here's the 1-min explainer ›"
- **Market data thin (obscure company)** — surface broader-pool comps, mark confidence low
- **Offer not yet received** — wizard locked, "We'll unlock when offer detected" banner
- **Walk-away path** — separate flow with retros and learnings

## Edge cases & India-specific gotchas

- **CTC vs base confusion** — Indian offers often quote CTC heavily; we always disaggregate and negotiate against base + variable + ESOP separately
- **Bond clauses in offer** — flagged loudly as red-flag (cross-doc to `26-bond-bench-detector.md`)
- **Notice period buyout** — common ask in India; explain clearly
- **Original certificates demanded** — major red flag; ask user to negotiate against
- **Family-pressure negotiation** — sometimes spouse / parents review offers; product offers a "share read-only" link with sensitive numbers redacted
- **Joining-bonus clawback** — common (return joining if you leave within Xy); negotiate clawback period
- **Variable component "discretionary"** — push for written clarity on payout criteria
- **WFH "subject to manager's discretion"** — push for explicit written days
- **Health insurance dependents** — covering parents is a meaningful Indian-specific ask
- **Bench risk in service co. counters** — counter not just on comp but on project allocation guarantee
- **Multi-offer leverage** — separate flow for "I have a competing offer" handling

## Honesty about market data

Per `12-data-viz.md` honesty rules:
- Always show n
- Always cite sources
- Never claim "you're underpaid" without showing the math
- Confidence dots scale with sample size

## Cross-doc links

- DMComposer / inline-diff: `11-components-composite.md`
- Salary anchor data: `25-salary-leak.md`
- Bond clause flag: `26-bond-bench-detector.md`
- Voice mock: `35-voice-interface.md`
- Email/LinkedIn channels: `36-settings-billing.md` integrations

## Open questions

1. **AI tone "aggressive" might cross lines** — guardrail prompts to avoid; testing required.
2. **Multi-offer flow** — how to surface competing-offer leverage without breaching confidentiality? — Numbers anonymized in shared previews.
3. **Recruiter behavior modeling** — varies widely by company size/culture; v0.2 build per-recruiter playbook based on past negotiations.
4. **Walk-away coaching** — when to recommend walking? — only suggest if offer is below P10 with strong confidence; never automated.
