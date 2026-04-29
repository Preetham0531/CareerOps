# 28 — Interview Time Machine

## Purpose
Once an interview is booked, prepare the user end-to-end: scrape Glassdoor / Reddit / LeetCode tags for company-specific questions, build interviewer one-pagers from LinkedIn, generate a 50-question prep set ranked by likelihood, and provide a mock-interview voice mode.

## Personas served
All four — but pressure varies. Priya/Karan know how to prep; the product saves them research time. Ravi (fresher) needs more structured help; mock interview is critical here.

## Entry points
- Calendar event for interview created in product → auto-link
- Side nav → "Interviews"
- ⌘K → "Prep for <company>"
- Email integration: detected interview-confirmation email → prompt to enable prep
- Application timeline → "Interview booked" event → click to expand into prep

## Layout

Shell B (focused canvas) with optional split-view for the prep board.

```
┌─────────────────────────────────────────────────────────────────┐
│ TOPBAR: [✕]   Razorpay Interview Prep · Apr 22, 4:00 PM IST     │
├─────────────┬───────────────────────────────────────────────────┤
│             │                                                    │
│ ROUNDS      │  CURRENT ROUND: System Design                      │
│             │  ──────────────────────────────                   │
│ ☑ DSA       │                                                    │
│ ▣ Sys Design│  Question 12 / 18                                  │
│ ○ Behavioral│  ────────────────────                             │
│ ○ Domain    │                                                    │
│             │  "Design a real-time payments orchestrator that   │
│             │  handles 10k req/sec with 99.99% uptime."         │
│             │                                                    │
│             │  Likelihood at Razorpay: ●●●●● (5/5)              │
│             │  Why: Razorpay is payments; this is core domain.  │
│             │                                                    │
│             │  ──────────────────────────────                   │
│             │  YOUR ANGLE                                        │
│             │  • Mention your async-django-toolkit (handles      │
│             │    similar load patterns)                          │
│             │  • Reference Razorpay's known infra: Kafka +      │
│             │    Postgres + Redis stack                          │
│             │                                                    │
│             │  Click to see model answer + interviewer notes ›  │
│             │                                                    │
│             │  [Mark as practiced]  [Skip]                       │
│             │                                                    │
└─────────────┴───────────────────────────────────────────────────┘
```

Top tab in this view: **Questions | Interviewer | Mock | Notes**

## Key views

### View 1 — Questions board (Kanban)

50 questions organized by round (DSA, System Design, Behavioral, Domain), each with:
- Question text
- Likelihood (1–5) at this company
- Source tag (Glassdoor / Reddit / LeetCode tag / inferred)
- Difficulty (easy / medium / hard)
- Status: not-started / practiced / mastered

Kanban columns by round; cards drag between status columns. Filtering by likelihood, difficulty.

### View 2 — Interviewer one-pager

Once interviewer is known (from calendar invite or user input):

```
┌─────────────────────────────────────────────────┐
│ [Avatar 96px]                                    │
│                                                   │
│ Priya Krishnan                                    │
│ Engineering Manager · Razorpay                    │
│ [Open LinkedIn ›]                                 │
│                                                   │
│ ─────────────────────────────────────────────── │
│ TENURE                                            │
│ • Razorpay: 4y (2022–present)                    │
│ • Cred: 2y (2020–2022)                           │
│ • Flipkart: 3y (2017–2020)                       │
│                                                   │
│ TECH FOCUS                                        │
│ Payments · Fraud · ML · Distributed systems      │
│                                                   │
│ INTERVIEW STYLE (inferred)                        │
│ Depth-first; system design heavy; behavioral last│
│ Likes specific examples; dislikes hand-waving.   │
│                                                   │
│ RECENT CONTENT (3)                                │
│ • Blog: "What I look for in senior eng" (Mar)    │
│ • Talk: PyConf India "Auth at scale" (Feb)       │
│ • Post: "Hiring philosophy" (Jan)                 │
│                                                   │
│ TOPICS THEY CARE ABOUT                            │
│ #payments #fraud #async #observability           │
│                                                   │
│ MUTUAL TIES                                       │
│ Aman Bhargav (you both went to IIT)              │
│ Sara Singh (Razorpay)                            │
│                                                   │
│ ─────────────────────────────────────────────── │
│ PREP NOTES                                        │
│ [Free text editor]                                │
│                                                   │
└─────────────────────────────────────────────────┘
```

### View 3 — Mock interview

Voice or text mode. Voice uses Whisper (STT) + ElevenLabs/native TTS (Hindi/English/Tamil/Telugu).

```
┌─────────────────────────────────────────────────┐
│ MOCK · System Design Round                       │
│                                                   │
│ [Audio waveform animation]                        │
│                                                   │
│ Interviewer (AI):                                 │
│ "Walk me through how you'd design a payment     │
│ orchestrator handling 10k req/sec."              │
│                                                   │
│ ─────────────────────────────────────────────── │
│ You:                                              │
│ [tap to speak / type response]                    │
│                                                   │
│ ─────────────────────────────────────────────── │
│ TRANSCRIPT                                        │
│ Interviewer: Walk me through...                   │
│ You: Sure, I'd start with...                     │
│                                                   │
│ ─────────────────────────────────────────────── │
│ FEEDBACK (after submission)                       │
│ Strengths: clear high-level architecture          │
│ Gaps: didn't mention idempotency, retries         │
│ Suggested follow-up: dive into transaction       │
│ consistency model                                 │
│                                                   │
└─────────────────────────────────────────────────┘
```

Mock can:
- Run a single question (5–10 min)
- Run a full round (30–45 min)
- Run a behavioral session
- Code in a built-in editor (split view) for DSA/coding rounds

### View 4 — Notes

User's own scratch space tied to this interview. Markdown editor. Auto-saved.

## Predicted system-design patterns

The system design question generator uses company knowledge:
- Swiggy → real-time delivery, restaurant matching, geospatial, surge pricing
- Razorpay → payment orchestration, fraud detection, idempotency, settlements
- Zerodha → low-latency trading, order matching, market data feeds
- PhonePe → payments + UPI specifics, KYC, anti-fraud
- Flipkart → product search, recommendations, inventory
- Cred → credit scoring, points engine, rewards
- Ola → ride matching, ETA prediction, surge
- Any GCC (Walmart Labs, Target, MS India) → US tech stack expectations

This is a curated list, expandable. Each company's "design questions you should expect" is a known JSON file.

## State diagram

```
[no interview booked]
  → [user adds calendar event or imports email]
     → [interview detected, prep mode unlocks]
        → [questions generated based on company + role]
           → [user practices: mark answered]
              → [mock interview run]
                 → [feedback delivered]
                    → [pre-interview reminder 1 day before]
                       → [interview happens]
                          → [post-interview retro: how did it go?]
```

## Data model

```ts
interface InterviewPrepState {
  interviewId: string;
  company: string;
  role: string;
  level?: string;
  scheduledAt: Date;
  rounds: Round[];
  interviewer?: InterviewerProfile;
  questions: Question[];
  mockSessions: MockSession[];
  notes: string;
  reminders: { sent: Date[]; nextAt: Date };
}

interface Question {
  id: string;
  text: string;
  round: 'dsa' | 'sys-design' | 'behavioral' | 'domain';
  likelihood: 1 | 2 | 3 | 4 | 5;
  difficulty: 'easy' | 'medium' | 'hard';
  source: 'glassdoor' | 'leetcode-tag' | 'reddit' | 'inferred';
  status: 'not-started' | 'practiced' | 'mastered';
  modelAnswer?: string;
  yourAngle?: string;
}
```

## Interactions & micro-animations

- Question card status change: drag from "not started" to "practiced" → card slides smoothly
- Interviewer one-pager: Fraunces title morphs in on first paint
- Mock voice waveform: animated amplitude visualization driven by mic input
- Pre-interview reminder: 24h before — gentle bottom-sheet with checklist (notes? mock done? sleep?)

## Empty / loading / error states

- **No interview booked**: empty state with calendar import CTA + "Add manually" affordance
- **Interview added, prep generating**: progress chip "Building your prep set..." (~10s for 50-question gen)
- **No interviewer info**: prep works without; one-pager shows "Add interviewer name" affordance
- **Mock voice unavailable**: fall back to text-only mock; explain why (mic permission denied, etc.)

## Edge cases & India-specific gotchas

- **Multiple rounds same day** — interviews often scheduled back-to-back; show cumulative prep across rounds
- **Aptitude rounds** (TCS NQT, Wipro, Infosys) — separate question category; questions from IndiaBix / past papers
- **HR round in English fluency** — for Tier-2/3 users, mock in English with feedback on grammar/fluency
- **Round in Hindi/regional language** — mock supports Indic; less common but real
- **Group discussion (GD)** — separate mock mode with multi-speaker simulation (multiple AI voices)
- **Take-home assignment** — separate workflow; not interview prep but adjacent
- **Interview rescheduled** — easy reschedule; prep persists
- **Behavioral STAR framework** — Indian users sometimes haven't been coached on STAR; prep includes a coaching layer

## Cross-doc links

- Mock voice: `35-voice-interface.md`
- Interviewer LinkedIn data: `23-referral-hijack.md` (network module reused)
- Skill claims for "your angle": `24-skill-claim-prover.md`
- Calendar integration: `36-settings-billing.md` (integrations)
- Application timeline: `21-dashboard.md`

## Open questions

1. **Mock voice in Hindi/Tamil/Telugu** — how good is ElevenLabs for Indic? Need user testing. Fallback to OpenAI native TTS.
2. **Code editor for DSA mock** — Monaco editor inline? Or link to LeetCode? — Inline Monaco; it's lighter than expected and lets us instrument.
3. **Pre-interview ritual checklist** — 24h before reminder content. What's the ideal default? — checklist: review notes, 1 mock, sleep, route, dress code, any docs needed.
4. **Post-interview debrief** — capture user's notes and feed back into App DNA. Yes; debrief modal pops 30 min after scheduled end.
