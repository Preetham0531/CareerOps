# 32 — Browser Co-Pilot Extension

## Purpose
Per `04-features.md` #17. When the user manually opens any job page on any site, a Chrome/Edge/Firefox extension shows a sidebar with: ghost score, salary leak triangulation, referral path, tailored bullets to copy-paste, and a one-click "Send to CareerOps for full process."

This is the **massive distribution play** — extension stores have organic discovery.

## Personas served
All four. Particularly powerful for power users (Priya, Karan) who keep their existing browse-and-decide habits while the agent rides shotgun.

## Surfaces

The extension has three UI surfaces:

1. **Sidebar** (injected on detected job pages)
2. **Popup** (clicked from extension icon)
3. **Options page** (full settings, opens in new tab)

## Sidebar

Slides in from right edge when a recognized job page (Naukri, LinkedIn, Indeed, Foundit, Instahyre, ATS-direct, generic JD detected) is opened.

```
┌──────────────────────────────────────┐
│ [✕]              CareerOps Co-Pilot   │
│                                        │
│ ┌────────────────────────────────────┐│
│ │ THIS LISTING                        ││
│ │                                      ││
│ │ Razorpay · Senior Backend            ││
│ │ Bangalore · T1 · ₹32–42L (high cf.)  ││
│ │                                      ││
│ │ Ghost: 12% · Match: 87% · Bond: ✓    ││
│ │                                      ││
│ │ [View detail →]                      ││
│ └────────────────────────────────────┘│
│                                        │
│ ┌────────────────────────────────────┐│
│ │ SALARY INTEL                         ││
│ │                                      ││
│ │ Triangulated: ₹28–38L (n=18)         ││
│ │ JD posted band ABOVE market median   ││
│ │                                      ││
│ │ [Sources ▾]                          ││
│ └────────────────────────────────────┘│
│                                        │
│ ┌────────────────────────────────────┐│
│ │ REFERRAL PATHS                       ││
│ │                                      ││
│ │ 3 mutuals at this company:           ││
│ │ [👤] Priya K — score 0.87           ││
│ │ [👤] Aman B — score 0.62            ││
│ │ [👤] Sara S — score 0.58            ││
│ │                                      ││
│ │ [Compose DM in CareerOps →]          ││
│ └────────────────────────────────────┘│
│                                        │
│ ┌────────────────────────────────────┐│
│ │ TAILORED BULLETS                     ││
│ │                                      ││
│ │ Click to copy:                        ││
│ │ • Built async-django-toolkit (★142),  ││
│ │   tested at 8k req/sec.              ││
│ │ • Spoke at PyConf 2024 on async at   ││
│ │   scale.                              ││
│ │                                      ││
│ │ [Copy CV variant for this listing]   ││
│ └────────────────────────────────────┘│
│                                        │
│ ┌────────────────────────────────────┐│
│ │ APPLY                                ││
│ │ Tier 2 · assist mode                 ││
│ │                                      ││
│ │ [Walk me through filling this form]  ││
│ └────────────────────────────────────┘│
│                                        │
└──────────────────────────────────────┘

[Floating CO logo button — collapse/expand sidebar]
```

### Sidebar UX rules

- **Width**: 360px desktop, slides over the job page (does not push content)
- **Collapsed**: 48×48 floating button bottom-right; click to expand
- **Auto-collapses** if user clicks outside
- **Stealth mode**: subtle gold border around sidebar to remind user
- **Cookies / DOM access**: only on whitelisted job-portal domains; never on banking, healthcare, or other-sensitive sites
- **Performance**: initial render < 200ms after page load detection

### Job page detection

- Heuristics + manifest rules to detect known portals
- Generic JD detection via heuristics (presence of role title + JD body + apply button) for unknown portals
- User can manually enable via extension popup if not auto-detected
- User can disable on specific domains via right-click → "Hide on this site"

## Popup

Clicked from the toolbar icon. Compact, 320×500.

```
┌──────────────────────────────────────┐
│ CareerOps                  [Sign in] │
│                                        │
│ Today: 5 strong matches · 2 referrers │
│                                        │
│ [Open dashboard]                       │
│                                        │
│ ─────────────────────────────────── │
│ ON THIS PAGE                           │
│ Razorpay · Senior Backend              │
│ Match: 87% · Ghost: 12%                │
│ [Open sidebar →]                       │
│                                        │
│ ─────────────────────────────────── │
│ QUICK ACTIONS                          │
│ • Save this listing                    │
│ • Find referrers                        │
│ • Tailor CV for this                   │
│                                        │
│ ─────────────────────────────────── │
│ [Settings]              [Sign out]    │
└──────────────────────────────────────┘
```

## Options page

Full settings for the extension. Opens as a new tab.

- Whitelist / blacklist domains
- Auto-show sidebar (always / on hover / off)
- Position (right / left edge)
- Theme (system / light / dark)
- Stealth integration toggle
- Privacy: data-collection settings
- Sign-out / disconnect from main app
- Permissions explainer
- Open changelog

## Layout (compact responsive)

The sidebar adapts to narrow content:
- Below 320px width (rare on screen, but tablets) → stacked single column with collapsible sections
- Section headers always tappable to expand/collapse

## State diagram

```
[browser tab loaded]
  → [is recognized job page?]
     ↓ yes
     [auto-detect JD content from DOM]
     [send to background worker for analysis]
     [render sidebar with progressive enhancement]
     ↓ user interacts
     [click "Compose DM"] → [open new tab to CareerOps web app, deep-linked]
```

## Data flow

- Background worker handles auth, API calls
- Content script (sidebar) communicates via `chrome.runtime.sendMessage`
- All data ephemeral on the page; no persistent storage of JD content
- User-authored data (notes, bookmarks) syncs to web app immediately

## Permissions (manifest v3)

Minimal:
- `activeTab` — current tab content (only when sidebar invoked or active)
- `storage` — extension settings
- `scripting` — inject sidebar
- `host_permissions` — explicit per-portal list, plus user-added domains

NOT requested:
- `tabs` (full tab access — overreach)
- `cookies` (cross-site auth not needed; we use OAuth)
- `bookmarks`, `history` — never

## Cross-browser support

- Chrome (primary, manifest v3)
- Edge (chromium, same manifest)
- Firefox (separate build, manifest v2 polyfill)
- Safari (separate, via Safari Web Extensions converter — v0.2)

## Empty / loading / error states

- **Auth not signed in**: "Sign in to CareerOps to see referrer paths and intel" → opens sign-in tab
- **Page recognized but no data yet**: spinner + "Analyzing this listing..."
- **Page not a job page**: sidebar doesn't auto-render; popup says "No job detected here. Visit a job listing."
- **API rate-limited**: "Sources busy — basic analysis only. Full intel in a moment."
- **Stealth alert**: when current employer's domain is detected, sidebar warns "Stealth: this is your current employer's site. Some features hidden."

## Edge cases & India-specific gotchas

- **Naukri's heavy DOM-mangling** — DOM structure changes often; selectors brittle. Use semantic heuristics + fallback to text extraction
- **LinkedIn's anti-bot detection** — never auto-click, never inject tracked events; sidebar is read-only and user-driven
- **Foundit's slow load** — page-load detection waits for content; longer initial spinner
- **Apna / Hirect mobile-only flows** — sidebar gracefully fails on mobile-Chrome (extensions limited); falls back to popup
- **Internshala fresher listings** — separate intel: campus drives + autofill vault (`33-fresher-mode.md`)
- **Direct ATS portals** (Greenhouse, Lever, Workday, Ashby, Keka, Darwinbox) — high-value detection; tailored CV variants per ATS quirk

## Performance

- Initial sidebar render < 200ms (skeleton)
- Real data populates < 1.5s typically
- Extension bundle < 200 KB compressed
- Background worker idle when no job page detected

## Privacy / DPDP

- Page content NEVER sent to server unless user explicitly clicks "Save to CareerOps"
- Match-on-page analysis runs locally where possible (TLDR: regex / heuristics on JD text); LLM enrichment only for explicit user actions
- Per-domain consent required before sidebar activates on a new portal
- Settings → "Forget this site" purges any cached metadata

## Distribution strategy (UX-relevant)

- Extension store listings need clear screenshots — designed for store at 1280×800 + 440×280
- "First-run experience": after install, opens onboarding sub-flow if user not signed in to web; else syncs immediately
- Update prompts: in-extension toast for major version updates; minor versions silent

## Cross-doc links

- Sidebar visual style mirrors web app primitives: `10-components-primitives.md`, `11-components-composite.md`
- Match score, ghost score, salary intel: `22-job-discovery.md`, `25-salary-leak.md`, `26-bond-bench-detector.md`
- Referral paths: `23-referral-hijack.md`
- Apply tier flow: `22-job-discovery.md`
- DPDP / data collection settings: `36-settings-billing.md`

## Open questions

1. **Manifest v3 background worker lifecycle** — service workers terminate; need to handle re-init gracefully
2. **Auth token sync between web app and extension** — single-sign-on via OAuth and shared cookie? — yes, with strict same-origin policy
3. **Auto-fill safety** — should extension prefill form fields directly, or always copy-to-clipboard? — clipboard by default (Tier 3); prefill only after explicit per-portal consent (Tier 2)
4. **Mobile equivalents** — extensions limited on mobile; do we ship a PWA share-target instead? — yes, see `34-mobile-responsive.md`
