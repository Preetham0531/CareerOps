# Day 7 — Fresher Hub, Voice, Settings/DPDP, Extension Scaffold, Final Polish

> **Goal**: ship the remaining surfaces (Fresher Hub, Voice, full Settings with DPDP center, Browser extension), do a hardening pass on every previous day's work, and have a deploy-ready build by end of day.
>
> **Why this day matters**: this is the day the product crosses from "modules built" to "product shipped." Polish is the work.

---

## Prerequisites

- Days 1–6 complete
- All e2e specs passing
- Lighthouse + axe baselines green
- Real device testing kit (one Android, one iPhone) ready

---

## Hour-by-hour

### Block 1 (1.5h) — Fresher Hub (`/fresher`)

Per `33-fresher-mode.md`. Shell A.

#### `FresherHub` page
Bento layout customized for fresher needs:

1. **`MilestonesTile`** — upcoming drive deadlines with countdown chips
2. **`CampusDrives`** — count of active / for-your-branch / filtered + "See all"
3. **`AptitudePrep`** — % mastery per topic, quick-practice CTA
4. **`AutofillVault`** — count of fields parsed, ready-for portals
5. **`MockGDTile`** — last session timestamp, "Start GD" CTA
6. **`HRCoachingTile`** — fluency level, common slips, today's drill
7. **`CohortTile`** — link to user's college cohort (if exists)

#### `CampusDrivesList` (`/fresher/drives`)
- Filterable list of TCS NQT, Wipro Elite NTH, Infosys InfyTQ, AmCAT, eLitmus, Naukri Campus, Internshala, Unstop, Capgemini Elite, Mahindra MILE, Cognizant GenC, Accenture FHTA
- Each: deadline, eligibility (CGPA cutoff, branch), location, rounds, salary band

#### `AutofillVaultPanel` (`/fresher/vault`)
- Personal / education / skills / projects / achievements / internships sections
- Each field editable; "Test against new portal" → form-fill simulation

#### `AptitudePractice` (`/fresher/aptitude/[topic]`)
- Question card: prompt + multiple-choice
- Timer
- Skip / submit / explanation flow
- Adaptive difficulty (server-side; today: stub)

#### `MockGD` (`/fresher/mock-gd`)
- Multi-speaker UI (5 speakers including user)
- Topic + roles assigned
- Per-speaker waveform animation
- Press space-to-speak (or tap on mobile)
- Post-GD feedback: speaking stats, contributions, interruptions

#### `HRMock` (`/fresher/hr-mock`)
- Single-AI-recruiter conversation
- Common questions queue (Tell me about yourself, Why this company, etc.)
- Recording + feedback

### Block 2 (2h) — Voice interface (real audio engine)

Per `35-voice-interface.md`. Real audio integration.

#### `VoiceCommandCenter` (`/voice`)
- Animated waveform (Canvas-based, audio-reactive via Web Audio API)
- Tap-to-speak (push-to-talk) primary
- Long-tap for hands-free conversation mode
- Language selector (en-IN / hi-IN / ta-IN / te-IN)
- Voice persona selector (Aanya / Vikram / Riya / Rohit)
- Recent conversations list

#### Engine wiring (`apps/web/lib/voice/`)
- `stt.ts` — server-side Whisper (cloud) or on-device Whisper-tiny (WASM); MSW stubs the upload + response
- `tts.ts` — server-side ElevenLabs (cloud) with native Web Speech API fallback; stubs OK for today
- `intent.ts` — intent recognition (server-side LLM call); MSW stubs
- `audio-context.ts` — singleton AudioContext + analyser node for waveform

#### Integration into existing modules
- Mock interview voice (Day 6 placeholder) → real audio
- Negotiation role-play (Day 6 placeholder) → real audio
- Mock GD multi-speaker → routed through TTS with distinct voice personas

#### Permissions UX
- First-time mic permission request screen with clear explanation
- Mic muted indicator visible always
- "Hold to talk" haptic feedback on supported devices

### Block 3 (1.5h) — Settings + DPDP Center (`/settings`)

Per `36-settings-billing.md`. Shell A with side menu.

#### Categories (left menu)
- Profile
- Account
- Privacy (DPDP) ← starred
- Stealth (cross-link to Day 6 panel)
- Notifications
- Integrations
- Billing
- Help

#### `ProfileSettings`
- Name, photo (optional), pronouns, public profile toggle
- Theme + density + language preferences
- CV variants list (manage)
- Public profile URL toggle (Reverse Job Board #11)

#### `AccountSettings`
- Email + phone (verified status)
- Password + 2FA setup
- Active sessions list with sign-out-each
- "Sign out all"
- "Delete account" (DPDP right of erasure)

#### `PrivacyCenter` (DPDP)
The hero of settings. Per spec:

- **`DataSummary`** — what we hold + storage size + last-accessed timestamp
- **`Consents`** — granular toggles per data use
- **`DataRights`** — Download all / Delete specific / Pause processing / Contact DPO
- **`AccessLog`** — table of who/what accessed your data
- **`DPOContact`** — dpo@careerops.in surfaced

Download flow: async job + email-when-ready (today: stub returns mock JSON in 5s).

#### `NotificationsSettings`
- Channels: email / push / WhatsApp / in-app
- Granular per category
- Quiet hours
- Digest delivery time

#### `IntegrationsSettings`
- LinkedIn / Naukri / GitHub / LeetCode / Kaggle / Calendar / Email / WhatsApp Business / Slack / webhooks
- Each: status, last sync, scopes, [Connect] / [Disconnect]

#### `BillingSettings`
Three pricing cards: Free / Pro / Campus per spec.
- Razorpay Checkout integration (stubbed)
- Invoices list
- Payment method management
- GST input for B2B
- Pause subscription option (1/3/6 months)

#### `Help`
- Article search (indexed in ⌘K)
- Submit feedback
- Status page link
- Contact support

### Block 4 (1.5h) — Browser extension scaffold (`apps/extension`)

Per `32-browser-extension.md`. Manifest v3 (Chromium) + v2 (Firefox).

#### Structure
```
apps/extension/
├── manifest.json (mv3)
├── manifest-v2.json (firefox)
├── src/
│   ├── content/                  injected into job pages
│   │   ├── sidebar.tsx
│   │   └── detector.ts
│   ├── popup/
│   │   └── Popup.tsx
│   ├── options/
│   │   └── Options.tsx
│   ├── background/
│   │   └── service-worker.ts
│   └── shared/                   re-uses packages/ui
├── public/
│   └── icons/{16,32,48,128}.png
└── package.json
```

#### Content sidebar
- Slide-in from right edge (360px) on detected job pages
- Floating CO logo button when collapsed
- Sections: This listing / Salary intel / Referral paths / Tailored bullets / Apply
- Reuses `JobCard` patterns + composites from `packages/ui`

#### Popup
- 320×500
- Today's matches summary
- "On this page" status
- Quick actions (Save / Find referrers / Tailor CV)
- Settings link

#### Options page
- Whitelist / blacklist domains
- Auto-show sidebar mode
- Position (right/left)
- Theme
- Stealth integration toggle
- Permissions explainer

#### Background service worker
- Auth token sync with web app (shared cookie via OAuth)
- API calls (proxy to backend)
- Detection heuristics

#### Build
- Vite-based extension build (works for Chrome + Firefox)
- Hot-reload during dev
- Loads as unpacked extension for testing

### Block 5 (1h) — Final mobile QA pass

Real device testing on:
- Android Chrome (Redmi A4 or equivalent)
- Android Samsung Internet
- iPhone Safari (iOS 17+)
- iPad Safari
- iPhone SE (smaller screen)

Test paths:
1. Marketing → onboarding → dashboard
2. Discovery → filter → swipe stack → save → apply
3. Referrer graph (mobile fallback to list)
4. Voice mode (mic permission + speak)
5. Stealth toggle + boss screen hotkey (touch alternative)
6. PWA install prompt
7. Offline mode banner + queued actions

Fixes:
- Touch target ≥ 44×44 anywhere they fail
- Safe-area-inset on notched devices
- Bottom-tab-bar visibility above iOS home indicator
- Pull-to-refresh + bottom-sheet gesture conflicts

### Block 6 (1h) — Performance + a11y final sweep

#### Performance
- Lighthouse run on every route — must score ≥ 85 mobile / ≥ 90 desktop
- Bundle analyzer — flag any route > 250 KB initial
- Real-device profiling on graph routes (referral, evidence) — must hit 60fps
- Image optimization sweep (WebP/AVIF served, lazy-load below fold)
- Font preload tags verified
- Service worker caching strategies verified

#### Accessibility
- Axe sweep on every route
- Manual screen reader pass (NVDA + VoiceOver) on key flows
- Keyboard-only walkthrough of every primary action
- Reduced motion verified site-wide
- Indic content `lang` attributes verified

#### Polish
- Empty states reviewed
- Error states reviewed
- Loading skeletons verified
- All copy reviewed for tone (per `01-design-principles.md`)
- Microcopy spell-check

### Block 7 (1h) — Deploy + handoff

#### Deploy
- Production build green
- Vercel deploy (with env vars)
- Storybook deploy (Chromatic)
- Extension build artifacts uploaded as GitHub Release (chrome.zip, firefox.zip)
- Sentry sourcemaps uploaded
- PostHog tracking verified

#### Handoff docs
- Update root `README.md` with run instructions
- Add `docs/CONTRIBUTING.md` (PR rules, lint/test/typecheck commands)
- Note known stubbed features (real backend, real LinkedIn API, real WhatsApp Business — these need backend work)

#### Final checks
- All Playwright specs passing on production build
- All Lighthouse scores ≥ targets
- All axe checks clean
- Bundle budgets met
- CI green on `main`

---

## Files created today

```
apps/web/
  ├── app/(app)/
  │   ├── fresher/
  │   │   ├── page.tsx
  │   │   ├── drives/page.tsx
  │   │   ├── vault/page.tsx
  │   │   ├── aptitude/[topic]/page.tsx
  │   │   ├── mock-gd/page.tsx
  │   │   └── hr-mock/page.tsx
  │   ├── voice/page.tsx
  │   └── settings/
  │       ├── layout.tsx                      (side menu)
  │       ├── profile/page.tsx
  │       ├── account/page.tsx
  │       ├── privacy/page.tsx                (DPDP center)
  │       ├── notifications/page.tsx
  │       ├── integrations/page.tsx
  │       ├── billing/page.tsx
  │       └── help/page.tsx
  ├── features/
  │   ├── fresher/
  │   │   ├── components/{Hub,DrivesList,VaultPanel,AptitudePractice,MockGD,HRMock,Milestones}.tsx
  │   │   └── store.ts
  │   ├── voice/
  │   │   ├── components/{CommandCenter,Waveform,LanguageSelector,VoicePersonaSelector}.tsx
  │   │   └── store.ts
  │   └── settings/
  │       ├── components/{ProfileSettings,AccountSettings,PrivacyCenter,DataSummary,ConsentList,DataRights,AccessLog,NotificationsSettings,IntegrationsSettings,BillingCards,InvoicesList,Help}.tsx
  │       └── store.ts
  └── lib/voice/{stt,tts,intent,audio-context}.ts

apps/extension/
  ├── manifest.json
  ├── manifest-v2.json
  ├── vite.config.ts
  ├── src/
  │   ├── content/{sidebar,detector}.{tsx,ts}
  │   ├── popup/Popup.tsx
  │   ├── options/Options.tsx
  │   ├── background/service-worker.ts
  │   └── shared/{api-client.ts,storage.ts}
  └── package.json

playwright/e2e/
  ├── fresher.spec.ts
  ├── voice.spec.ts
  ├── settings.spec.ts
  └── extension.spec.ts                      (puppeteer-based for extension)

docs/CONTRIBUTING.md
README.md (updated)
```

---

## Definition of done — End of Week

- [ ] Every module from `00-overview.md` traceability matrix has a working route
- [ ] Onboarding → dashboard → discovery → apply → referral → interview → negotiation flow walkable end-to-end
- [ ] Stealth posture functional across the product
- [ ] Voice mode functional in en-IN and hi-IN (ta-IN / te-IN: TTS works, STT may need real keys)
- [ ] DPDP center with download / delete / consent toggles fully wired
- [ ] Browser extension installable, sidebar renders on a Naukri job page
- [ ] PWA installable on Android Chrome + iOS Safari
- [ ] All 16+ Playwright e2e specs passing
- [ ] Lighthouse scores on all routes ≥ 85 mobile / ≥ 90 desktop
- [ ] Axe zero serious/critical site-wide
- [ ] Bundle budgets met
- [ ] Production deploy live on Vercel
- [ ] Storybook deployed on Chromatic
- [ ] Extension uploaded as GitHub Release
- [ ] CI green on `main`

---

## Common pitfalls

- **Voice MediaRecorder permission**: must be in user-gesture handler; show clear error if denied
- **AudioContext suspended state**: needs user-gesture to resume; handle the suspended → running transition
- **Whisper-tiny WASM size**: ~75 MB; gate behind feature flag; only download on first voice use
- **DPDP "delete data" UX**: multi-step with clear consequences; soft-delete with cooldown to prevent regret
- **Razorpay Checkout in iframe**: PWA detection sometimes confuses payment flow; test thoroughly
- **Extension content script + page React**: don't pollute global; use Shadow DOM for sidebar to isolate styles
- **Extension manifest v3 service worker**: terminates aggressively; persist state in `chrome.storage.local`
- **PWA install prompt timing**: don't show on first visit (annoying); wait for engaged use
- **Final Lighthouse runs on slow CI**: use throttled mobile profile; run twice and median
- **Sentry release versioning**: tag releases properly so source maps resolve

---

## What's NOT done at end of Week 1 (deferred to follow-up sprints)

- Real backend integration (today: MSW everywhere)
- Real LinkedIn / Naukri / GitHub OAuth (today: stubs)
- Real LLM calls for AI typing / DM generation (today: MSW canned responses)
- Real ElevenLabs TTS / Whisper STT keys (today: stubs work, real production key wiring is sprint-2)
- Real Razorpay payment integration (today: UI complete, real keys = sprint-2)
- WhatsApp Business API auto-reply (today: UI placeholder)
- v0.2 features explicitly tagged in spec docs (cohort live mock GD via WebRTC, v0.2 languages, etc.)
- Dedicated marketing pages beyond `/` hero (today: minimal hero only)

These are all backend/integration plumbing — the **frontend product surface is shipped end of Day 7.**

---

## Cross-doc links

- All previous days: `day-1.md` through `day-6.md`
- Spec source-of-truth: `docs/frontend/00-overview.md` through `docs/frontend/92-research-sources.md`
- Stack: `91-stack-recommendation.md`
- Build sequence (longer-form 14-day version): `90-component-build-order.md`
