# 35 — Voice Interface (Hindi · English · Tamil · Telugu)

## Purpose
Many users — especially Tier-2/3 — consume content via voice and prefer voice for outbound (job summaries, interview prep). Voice also unlocks accessibility and the WhatsApp recruiter mode (#6). Multilingual from day one (Hindi, English, Tamil, Telugu in v0.1; Bengali, Marathi, Kannada in v0.2).

## Personas served
Heaviest use: Ravi (fresher, English-secondary), Priya/Karan (busy professionals — voice is faster than reading), Anjali (multitasking returner).

## Entry points
- ⌘K → "Voice mode"
- Side nav → 🎙️ icon (when enabled in settings)
- Mock interview / mock GD (`28-interview-time-machine.md`, `33-fresher-mode.md`)
- Negotiation role-play (`29-negotiation-copilot.md`)
- WhatsApp recruiter auto-reply (linked from `04-features.md` #6)

## Key surfaces

### Voice command center

```
┌─────────────────────────────────────────────────┐
│ VOICE                       [✕ close]            │
│                                                   │
│       [Animated waveform — large]                 │
│                                                   │
│   "Bhai, aaj kya jobs apply kiye?"                │
│                                                   │
│   ─────────────                                  │
│   "Aaj 3 quality applies bheje:                   │
│    Razorpay Senior Backend, Cred SDE-3,           │
│    PhonePe Sr Engineer."                          │
│   ─────────────                                  │
│                                                   │
│ [🎙️ Tap to speak]                                  │
│                                                   │
│ Language: [Hindi ▾]   Voice: [Aanya (default) ▾] │
│                                                   │
│ ─────────────────────────────────────────────── │
│ RECENT CONVERSATIONS                             │
│ • "Show me referrals at Razorpay"                │
│ • "What's the salary for L5 SDE at Cred?"        │
│ • "Practice me for tomorrow's interview"          │
│                                                   │
└─────────────────────────────────────────────────┘
```

### Voice in mock contexts

Linked from `28-interview-time-machine.md` mock and `29-negotiation-copilot.md` role-play. Same audio engine, different conversation flows.

## Capabilities (intents)

Voice handles these intents in v0.1:

| Intent | Example utterance | Action |
|---|---|---|
| Daily summary | "Today summary" / "Aaj ka summary" | Reads dashboard greeting + key insight |
| Job search | "Find me Senior Backend jobs in Bangalore" | Sets filters, reads top 3 |
| Open referrals | "Show me referrals at Razorpay" | Opens referral graph for that company |
| Salary check | "Real salary for L5 SDE at Cred" | Reads salary triangulation |
| Mock interview | "Practice me for Razorpay" | Starts mock interview prep |
| Mock GD | "GD practice" | Starts multi-speaker GD |
| HR drill | "Tell me about yourself drill" | Starts HR mock |
| Read-aloud insights | "Read App DNA" | Reads top 3 insights |
| Compose DM (assist) | "Draft DM to Priya at Razorpay" | Opens DM composer with prefilled draft |
| Negotiation rehearsal | "Negotiate Razorpay offer" | Starts negotiation role-play |
| Stealth toggle | "Stealth on" / "Stealth band karo" | Toggles stealth |
| Settings | "Mute notifications" / "Switch to dark mode" | Settings |
| Help | "What can you do?" | Lists capabilities |

## Languages and voices

### v0.1
- **English (Indian)** — native + Indian accent variants
- **Hindi** — pure Hindi + Hinglish (code-mix natural)
- **Tamil** — pure + Tanglish
- **Telugu** — pure + Tenglish

### v0.2
- Bengali, Marathi, Kannada, Punjabi, Gujarati

### Voice engines

- **STT**: OpenAI Whisper (multilingual, robust to noise) for primary; on-device Whisper-tiny (faster, privacy) for fallback
- **TTS**: ElevenLabs (best Indic voices) primary; OpenAI TTS as fallback; native Web Speech API as last-resort offline
- **Code-mix detection**: handled by Whisper; we don't force language switching mid-utterance

### Voice personas

- "Aanya" — neutral female, default
- "Vikram" — neutral male
- "Riya" — younger / casual female (used in cohort-style mock GD)
- "Rohit" — neutral younger male

User picks voice; voice adapts to selected language.

## Audio UX

### Wake / activate
- Tap 🎙️ to speak (push-to-talk)
- Long-tap to start hands-free conversation mode (continuous)
- No "always-listening" wake word in v0.1 (privacy + DPDP concern)

### Visual feedback
- Animated waveform (custom SVG/Canvas) reflects mic input amplitude
- AI speaking: waveform on right side animates (audio-reactive)
- Listening: gold pulse around mic icon
- Processing: small dots cycling (1.4s)

### Mute / interrupt
- User can interrupt AI mid-speech by tapping mic
- AI stops mid-sentence, listens to new utterance
- "Sorry, didn't catch — could you repeat?" if confidence low

### Transcript
- Always shown alongside audio (accessibility + caching)
- User can scroll back, copy, share

## Privacy / DPDP

- **Mic permission requested** on first use, not auto-prompted
- **Audio recorded only during active session**; never background
- **STT processed on-device when possible** (Whisper-tiny ~75 MB model); cloud STT only when on-device unavailable
- **Audio recordings deleted after transcription**; transcripts retained per user preference
- **Voice data never used for training** without explicit opt-in

## Edge cases & India-specific gotchas

- **Code-switching mid-utterance** — Whisper handles "Bhai, today ka jobs apply kiya?" naturally
- **Dialect variation** — North Indian Hindi vs. Bombaiya vs. UP Hindi; voice models trained on broad spectrum
- **Background noise** (auto rickshaws, fans, family) — Whisper robust; we add adaptive gain
- **Slow / fast speakers** — TTS rate adjustable
- **Dialect TTS** — ElevenLabs decent for Hindi/Tamil; less good for niche dialects; fallback to default
- **WhatsApp voice notes** — common medium; we accept voice-note input from WhatsApp linked accounts (recruiter responses) and transcribe
- **Privacy in shared spaces** — voice mode auto-mutes if device detects in-pocket; "show transcript only" option

## State diagram

```
[idle]
  → [tap mic]
     [listening] → user speaks → [STT processing]
                                  ↓
                                  [intent detected]
                                  [action executed]
                                  [TTS response]
                                  [speaking]
                                  ↓ user interrupts or finishes
                                  [idle | continuous: back to listening]
```

## Data model

```ts
interface VoiceState {
  enabled: boolean;
  permissionGranted: boolean;
  language: 'en-IN' | 'hi-IN' | 'ta-IN' | 'te-IN' | ...;
  voicePersona: 'aanya' | 'vikram' | 'riya' | 'rohit';
  mode: 'push-to-talk' | 'continuous';
  conversationHistory: VoiceTurn[];
  currentSession: { listening: boolean; speaking: boolean; transcript: string };
}

interface VoiceTurn {
  speaker: 'user' | 'agent';
  audioUrl?: string;  // ephemeral
  transcript: string;
  language: string;
  intent?: string;
  action?: string;
  at: Date;
}
```

## Multi-speaker mock GD (cross-link)

For Mock GD (`33-fresher-mode.md`), multiple AI voices simulate group discussion:
- Each "participant" gets a distinct voice persona
- Realistic interruption / overlap modeling
- Turn-taking detection from user's audio

## Accessibility

- Voice IS accessibility — but voice has its own a11y considerations:
  - Always offer text-only alternative
  - Captions / transcript visible during AI speech
  - Adjustable TTS rate
  - High-contrast mode for waveform viz
  - Cognitive: simple intent recognition; clear error messages when intent unclear

## Performance

- STT latency: < 800ms typical (cloud Whisper); < 2s on-device Whisper-tiny
- TTS latency: < 1.5s typical (ElevenLabs); < 2.5s for native fallback
- Streaming TTS where possible (start playback before generation complete)
- Conversation history capped at 20 turns per session (memory)

## Cross-doc links

- Mock interview voice: `28-interview-time-machine.md`
- Negotiation role-play: `29-negotiation-copilot.md`
- Mock GD multi-speaker: `33-fresher-mode.md`
- WhatsApp recruiter mode: `04-features.md` #6
- Indic typography: `03-typography.md`
- Mobile mic UX: `34-mobile-responsive.md`
- DPDP for voice data: `36-settings-billing.md`

## Open questions

1. **Always-listening wake word** ("Hey CareerOps") — ship in v0.2 with explicit opt-in and on-device VAD; default off
2. **Multi-language switching mid-conversation** — should the agent auto-switch? — yes if Whisper detects, but confirm once: "Switching to Tamil. OK?"
3. **Voice billing** — TTS / STT calls cost money. Free-tier limits? — 30 min/day free; paid tier unlimited. Offline Whisper-tiny always free.
4. **Voice in noisy public spaces** — push-to-talk default mitigates; continuous mode requires headphones for usability
