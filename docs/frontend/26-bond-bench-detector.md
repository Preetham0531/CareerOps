# 26 — Bond / Bench / Bait Detector

## Purpose
Surface India-specific traps before the user wastes an apply on them. Service bonds (TCS 2-yr, Wipro WILP, Capgemini), bench risk (Infosys/CTS/Mphasis), bait-and-switch (SDE → Production Support), pyramid consultancies (staff-aug at 3× markup), night-shift-only support roles disguised as "engineer" titles.

The detector renders findings as **red-flag badges** on JobCards (with palette-compliant gold-700 styling — no actual red) and a deeper drawer for evidence.

## Personas served
Heaviest use: Ravi (fresher) — most vulnerable to bond/bench traps. Also Anjali (returner — service co's often offer "easy entry" but with bond/bench). Less for Priya/Karan (experienced enough to spot these themselves, but still surface).

## Entry points
- JobCard → bond/bench chip (auto-rendered on detection)
- JobCard preview → "Red flags (3)" section
- Standalone: side nav → "Red flags hub" — bulk view across saved jobs
- ⌘K → "Red flags for <company>"

## Layout

### Inline (in JobCard chip row)

```
[Bond 2y]  [Bench risk]  [Pyramid]   ←  rendered as gold-700 outlined chips
```

Tap chip → popover with the specific signal that fired.

### Drawer (in JobCard preview pane)

```
┌──────────────────────────────────────────────────┐
│ RED FLAGS — TCS Senior Software Engineer          │
│                                                    │
│ ┌────────────────────────────────────────────┐  │
│ │ ⚠ SERVICE BOND DETECTED                     │  │
│ │ Severity: HIGH                                │  │
│ │                                                │  │
│ │ Source 1: JD line 12                          │  │
│ │ "Selected candidates will sign a 2-year      │  │
│ │ service bond with ₹2 lakh penalty."           │  │
│ │                                                │  │
│ │ Source 2: Glassdoor reviews (3 mentions)      │  │
│ │ "Bond is enforced; HR holds original certs."  │  │
│ │ "Bond exit fee was ₹1.8L when I left in 2024."│  │
│ │ "Don't sign if you're unsure — they hold..."  │  │
│ │                                                │  │
│ │ Source 3: r/developersIndia thread            │  │
│ │ link to discussion                            │  │
│ │                                                │  │
│ │ [Hide all jobs with bond ≥ 1y]                │  │
│ └────────────────────────────────────────────┘  │
│                                                    │
│ ┌────────────────────────────────────────────┐  │
│ │ ⚠ BENCH RISK                                 │  │
│ │ Severity: MEDIUM                              │  │
│ │                                                │  │
│ │ Company hires above project demand. 2024      │  │
│ │ employees report 3–6 month bench periods      │  │
│ │ before allocation.                            │  │
│ │                                                │  │
│ │ Sources: 4 Glassdoor reviews, 2 Quora threads │  │
│ │                                                │  │
│ │ [Hide bench-risk companies]                  │  │
│ └────────────────────────────────────────────┘  │
│                                                    │
│ ┌────────────────────────────────────────────┐  │
│ │ ⚠ BAIT-AND-SWITCH POSSIBLE                   │  │
│ │ Severity: LOW                                 │  │
│ │                                                │  │
│ │ Title says "Senior Software Engineer" but JD  │  │
│ │ line 18 mentions "L1/L2 production support."  │  │
│ │ Pattern: 70% of TCS "SSE" hires placed in    │  │
│ │ production support per public LinkedIn data.  │  │
│ │                                                │  │
│ │ [Hide bait-pattern listings]                  │  │
│ └────────────────────────────────────────────┘  │
│                                                    │
│ ─────────────────────────────────────────────── │
│ [Apply anyway]  [Hide this job]  [Save with notes]│
└──────────────────────────────────────────────────┘
```

### Standalone — "Red flags hub"

A list of all flagged listings the user has interacted with (saved, viewed, applied to). Filterable by flag type + severity. Bulk action: hide all / batch-flag-companies.

## Detected categories

| Flag | Detection signals | Severity range |
|---|---|---|
| **Service bond** | JD keywords ("bond", "service agreement", "₹X lakh penalty"), Glassdoor mentions, employee Quora threads | low / medium / high |
| **Bench risk** | Company hire-rate vs. project pipeline, Glassdoor sentiment ("benched 4 months"), services-company classification | low / medium / high |
| **Bait-and-switch** | Title/JD mismatch (e.g., "engineer" but JD lists "production support" tasks), historical placement patterns of past hires | low / medium |
| **Pyramid consultancy** | Staff-aug shop classification, billing rate triangulation, payroll markup ≥ 2× | medium / high |
| **Night-shift only** | JD keywords, role classification (support/ops); confirmed by review mentions | low / medium |
| **Excessive bench-warming** | Hire-then-no-allocation pattern from LinkedIn employment-duration data | medium |
| **Layoff risk** | Recent rolling layoffs, hiring freeze followed by surge, leadership churn | medium / high |

## Severity styling

| Severity | Visual |
|---|---|
| Low | gold-200 chip, gold-700 text, no exclamation |
| Medium | gold-400 chip outline, gold-700 text, ⚠ icon |
| High | gold-700 chip with gold-100 fill, ⚠ icon, slight pulse on first paint |

No red. All within palette per `02-color-system.md`.

## State diagram

```
[JobCard rendered]
  → [bond/bench detector queries cache]
     ↓ flags found
     [chips rendered on card]
     ↓ user clicks chip
     [popover with specific signal]
        ↓ user opens drawer
        [full red-flag panel with sources]
           ↓ user "Hide all"
           [filter applied; cards animate out]
```

## Data model

```ts
interface RedFlag {
  type: 'bond' | 'bench' | 'bait' | 'pyramid' | 'night-shift' | 'layoff-risk';
  severity: 'low' | 'medium' | 'high';
  jobId: string;
  evidence: Evidence[];
  detectedAt: Date;
}

interface Evidence {
  source: 'jd-keyword' | 'glassdoor-review' | 'reddit-thread' | 'quora-thread' | 'linkedin-pattern' | 'company-classification';
  excerpt: string;
  url?: string;
  weight: number;
}

interface BondBenchState {
  flagsByJob: Record<string, RedFlag[]>;
  hiddenFlagTypes: Set<RedFlag['type']>;
  hiddenCompanies: Set<string>;
}
```

API: `GET /api/red-flags?jobIds=...&companies=...` — batch endpoint to avoid per-card calls.

## Interactions & micro-animations

- Chip hover → soft gold glow
- Chip click → popover slides up 8px (`enter` 200ms)
- Drawer open → standard drawer animation (`gentle` spring)
- "Hide all jobs with bond ≥ 1y" → filtered cards animate out (slide + fade), 80ms stagger, with toast "12 jobs hidden — undo?"

## Empty / loading / error states

- **No flags on this job**: chip area renders nothing — no positive signal, just silence. (Don't add a "✓ All clear" chip; it would teach users to trust silence.)
- **Detection still running**: subtle "Scanning..." chip with mini-spinner, replaces with real flags when ready
- **No source data available** (very obscure company): "No public signals available — apply with caution." (Don't claim "no flags" if we just don't have data.)
- **Detection error**: silent fail; flags simply don't appear; logged to Sentry

## Edge cases & India-specific gotchas

- **Bond enforcement varies** — some companies write bond in offer letter but never enforce; surface user-reported enforcement signals where available
- **"Hidden" bonds via certificate retention** — some companies hold original education certs as bond enforcement; specific signal worth surfacing
- **WILP (Wipro) / TCS Ignite / similar programs** — formally not "bonds" but structured similarly; classified as `bond` with explanation
- **Service-company "rebranded" subsidiaries** — Capgemini's Sogeti, TCS Digital, Infosys Finacle — we map them to parent classification
- **MNC subsidiaries doing pyramid consultancy** — Accenture, Cognizant, Capgemini have both legitimate eng roles AND pyramid consultancies; don't blanket-flag all roles, only flag based on per-listing signals
- **GCC (Global Capability Center) classification** — Walmart Labs, Target, MS India, Google — these are NOT services; never bench-flag them
- **Startup roles with ESOP cliff and stay-period** — sometimes structured as quasi-bonds; surface with low severity + explanation

## Override controls

User can:
- Hide flag type globally (e.g., "I'm fine with 1-yr bonds")
- Whitelist specific company (e.g., "TCS Digital is fine, just hide TCS BFSI")
- Adjust severity thresholds (e.g., "Only flag bonds ≥ 2 years")
- Submit feedback ("This flag was wrong — explain why") → improves detector

## Trust & accuracy

- **False-positive rate target**: < 5%. Better to miss a flag than annoy users with wrong ones.
- **Source citation always shown** — user can verify themselves
- **Detection method explained** — popover reveals which signals fired and their weights
- **User feedback loop** — "wrong flag" feedback weighted into model retraining

## Cross-doc links

- BondBadge / BenchBadge components: `11-components-composite.md`
- Color palette for severity: `02-color-system.md`
- Drawer pattern: `10-components-primitives.md`
- Data-viz for source weights: `12-data-viz.md`
- Settings to override: `36-settings-billing.md`
- "Bad Vibes" detector (#13 — sister flag for company sentiment): mentioned in `21-dashboard.md` Company Health Shifts tile

## Open questions

1. **Crowdsourced flag confirmation** — should users be able to vote "this is real" / "this is wrong" on flags? — Yes (v0.2); needs anti-abuse design.
2. **Anonymous user-reported bonds** — if users submit bond clauses, do we publish? — Aggregate-only, never per-user; needs DPDP scrutiny.
3. **Should we show "Apply anyway" prominently?** — Yes; we're informing, not gatekeeping. User decides.
4. **Severity-based action**: high-severity flags auto-hide by default? — No; defaults to "show with badge"; user opts in to auto-hide.
