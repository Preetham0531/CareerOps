# Day 7 — Setup notes (final day)

> Append to `SETUP.md`. Final `.day7` swap.

## Files to swap

```bash
cd ~/Downloads/Desktop/CareerOps-India

# API client + MSW (supersets)
mv packages/api-client/src/schema.day7.ts        packages/api-client/src/schema.ts
mv packages/api-client/src/hooks.day7.ts         packages/api-client/src/hooks.ts
mv apps/web/mocks/factories.day7.ts              apps/web/mocks/factories.ts
mv apps/web/mocks/handlers.day7.ts               apps/web/mocks/handlers.ts

# package.json (no new deps over Day 5; this just keeps consistency)
mv apps/web/package.json.day7                    apps/web/package.json

# Settings root redirect
mv "apps/web/app/(app)/settings/page.tsx.day7"   "apps/web/app/(app)/settings/page.tsx"

pnpm install
pnpm tokens:build
pnpm dev                               # http://localhost:3000
```

Walk: `/settings/profile` → `/settings/privacy` (DPDP center) → toggle a consent → request data export → switch billing plan → `/fresher` → `/fresher/drives` → `/voice` → tap mic to see waveform + stub conversation.

## What ships in Day 7

### Settings + DPDP Center (the trust hero)
- **`settings/layout.tsx`** — side menu: Profile / Account / Privacy (DPDP) / Stealth / Notifications / Integrations / Billing / Help
- **`settings/profile`** — name, pronouns, language (en/hi/ta/te), density toggle, public-profile opt-in
- **`settings/account`** — email/phone verification, 2FA, active sessions list with sign-out, sign-out-everywhere, danger-zone account deletion (multi-step "type DELETE" confirmation)
- **`settings/privacy`** — the DPDP hero:
  - DataSummary: identity / CV / network / activity / voice / location / storage MB
  - Consents: 9 granular toggles per data use (process CV, read LinkedIn, voice STT, share-anon-salary, share-anon-DNA, voice training, email digests, WhatsApp)
  - DataRights × 4 cards (download, delete-by-category, pause processing, contact DPO)
  - AccessLog: who accessed what, when, on which device
  - DPO email surfaced + 30-day SLA
- **`settings/notifications`** — channels (email/push/whatsapp/in-app) + 7 categories + quiet hours + digest delivery time
- **`settings/integrations`** — 9 providers (LinkedIn, Naukri, GitHub, LeetCode, Kaggle, Calendar, Email, WhatsApp Business, Slack) with status badges + scopes + connect/disconnect
- **`settings/billing`** — Free / Pro (₹599 mo) / Campus (₹199 mo) plan cards, invoices, Indian payment methods, GST included, GSTIN for B2B
- **`settings/help`** — 4 entry points

### Fresher Hub (tier-2/3 differentiator)
- **`fresher/page.tsx`** — bento with Milestones countdown (urgent rows in danger styling) + Drives summary + Aptitude prep mastery bars + Auto-fill vault status + HR fluency level + Mock GD + Cohort link
- **`fresher/drives/page.tsx`** — TCS NQT 2026, Wipro Elite NTH, Infosys InfyTQ, AmCAT, Capgemini Elite — with deadline chips, eligibility (CGPA + branches), rounds, package band

### Voice Command Center
- **`voice/page.tsx`** — large mic button → wave-form animation (canvas-based), stub streaming transcript, conversation history bubbles, language + persona selectors, sample-prompt chips
- Sprint-2 wires real Whisper STT + ElevenLabs TTS + intent recognition

### Browser extension scaffold (`apps/extension/`)
- **MV3 manifest** — host permissions for naukri/linkedin/indeed/foundit/instahyre, content_scripts on /jobs/* paths, options_ui as separate page, background service_worker
- **Vite multi-entry build** producing popup.html, options.html, content.js, background.js
- **Popup** (320×480) — today's matches summary + on-this-page status + 3 quick actions
- **Options** — sidebar behavior, position, theme, stealth integration toggle, whitelisted domains
- **Content script** — Shadow DOM root + floating CO logo button, detection heuristics for Naukri / LinkedIn / Indeed (sprint-2 expands sidebar in shadow root)
- **Background service worker** — message handler for `co:job-detected`, install-time onboarding redirect

### API + MSW expansion
- 13 new schemas (UserProfile, AccountInfo, ConsentEntry, AccessLogEntry, DPDPSnapshot, NotificationSettings, Integration, BillingPlan, Invoice, BillingSnapshot, FresherDrive, AutofillSection, FresherHub, VoiceLanguage/Persona/Turn)
- 13 new hooks (useProfile/useAccount/useDPDP/useUpdateConsent/useRequestDataExport/useDeleteAccount/useNotificationSettings/useIntegrations/useToggleIntegration/useBilling/useChangePlan/useFresherHub/useFresherDrives)
- 16 new MSW handlers across `/api/settings/*` + `/api/fresher/*`

### What was deferred to sprint-2 (explicitly)

| Area | Day 7 ships | Sprint-2 wires |
|---|---|---|
| Voice STT | UI + waveform + stub stream | Real Whisper (cloud + on-device tiny WASM) |
| Voice TTS | UI + persona selector | Real ElevenLabs with Indic voices |
| Billing | Full UI + plan switching mock | Razorpay Checkout SDK + GST invoicing |
| 2FA | Toggle UI | TOTP setup + recovery codes |
| Browser extension sidebar | Detection + launcher | Full sidebar in Shadow DOM with referral path + salary intel |
| Real-time | TanStack 60s polling | WebSocket bridge |
| Lottie | CSS confetti from Day 6 | Lottie offer-trophy animation |
| Mobile QA | Responsive verified in dev | Real-device matrix (Redmi A4, iPhone SE, Galaxy M14) + perf profiling |
| Inline-diff peer review | Star ratings + side-by-side | react-diff-viewer styled to palette |
| LinkedIn / Naukri OAuth | Stub buttons | Real OAuth handshake |

## Verifying Day 7 done

- [ ] `/settings` redirects to `/settings/profile`; side menu navigation works
- [ ] Profile language switch toggles between en/hi/ta/te
- [ ] Privacy page DataSummary shows storage + last-accessed
- [ ] Toggle a non-required consent → snapshot updates
- [ ] "Request export" returns a job id + ETA toast
- [ ] Account deletion multi-step modal requires "DELETE" string match
- [ ] Notifications page toggles fire PATCH calls
- [ ] Integrations page shows 9 providers with connect/disconnect actions
- [ ] Billing page shows 3 plan cards; switching to Pro fires plan change toast
- [ ] `/fresher` bento renders all 6 sub-tiles + milestone urgency styling on TCS NQT (1d left)
- [ ] `/fresher/drives` lists 5 drives with eligibility + rounds + package bands
- [ ] `/voice` mic button → waveform animates + stub transcript reveals + conversation lands in history
- [ ] `apps/extension/` typechecks (`pnpm --filter @careerops/extension typecheck`)
- [ ] `pnpm --filter @careerops/web typecheck` clean

## Final commit + ship

```bash
git add .
git commit -m "feat(day-7): settings + DPDP center + fresher hub + voice + extension scaffold

Settings (with side menu):
- /settings/{profile,account,privacy,notifications,integrations,billing,help}
- DPDP center is the hero: DataSummary, 9 consent toggles, 4 data-rights
  cards, AccessLog, DPO contact + 30-day SLA
- Account: 2FA placeholder + active sessions + multi-step deletion
- Billing: Free/Pro(₹599)/Campus(₹199) plan cards, invoices, Indian payment
  methods, GST inclusive, GSTIN for B2B
- Notifications: channel + category granular toggles, quiet hours
- Integrations: 9 providers with scopes + status badges
- Help: 4 entry points

Fresher Hub:
- /fresher bento (milestones + drives + aptitude + vault + HR + GD + cohort)
- /fresher/drives lists TCS NQT, Wipro Elite NTH, Infosys InfyTQ, AmCAT,
  Capgemini Elite with deadlines + eligibility + rounds + bands
- Urgency styling on <24h deadlines

Voice Command Center:
- /voice with mic button + canvas waveform + stub stream + conversation
  history + language/persona selectors
- Languages: en-IN / hi-IN / ta-IN / te-IN

Browser extension scaffold (apps/extension/):
- MV3 manifest with host permissions for major Indian portals
- Vite multi-entry build: popup, options, content, background
- Popup: today's matches + on-page status + quick actions
- Options: sidebar/position/theme/stealth/whitelist
- Content script: Shadow DOM root + floating CO launcher + JD detection
- Background SW: job-detected handler + install onboarding redirect

API + MSW:
- 13 new schemas (Settings, Fresher, Voice)
- 13 new hooks
- 16 new handlers across /api/settings/* and /api/fresher/*

Sprint-2 backlog clearly tagged in SETUP-DAY7.md:
real Whisper/ElevenLabs, Razorpay Checkout, real OAuth, real-device QA,
Lottie celebrations, full extension sidebar in Shadow DOM.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"

git push
```

🎉 **Frontend product surface complete.** Backend is MSW-mocked end-to-end. Next sprint wires real APIs.
