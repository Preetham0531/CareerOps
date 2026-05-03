# 37 — Resume Tailor & Enhancer

## Purpose
Per JD, rewrite the user's resume so it ranks highly against the ATS parser AND visually catches the recruiter's eye in a stack of 200 — **without faking experience or stretching claims**. The tailor surfaces three artifacts:

1. A **rewritten resume** with strict truthfulness guardrails (only re-orders, re-words, and emphasizes existing facts; never invents)
2. An **enhanced visual layout** designed to be visually distinct yet still ATS-parseable
3. A **delta view** showing exactly what changed and why, so the user trusts the output before sending

This sits between Skill-Claim Prover (`24-skill-claim-prover.md`) and the Apply flow (`22-job-discovery.md` Tier 1/2/3). It is the most user-facing manifestation of "evidence over inflation."

## Personas served
All four. Heaviest use:
- **Priya** (mid-career SDE) — needs surgical re-emphasis per role
- **Ravi** (fresher, tier-2/3) — needs help making thin experience read better truthfully
- **Anjali** (returner) — needs the gap addressed honestly + accomplishments re-surfaced

## The truthfulness contract

This is the doc's spine. **The tailor does not lie.** It cannot:

- Add roles, projects, certifications, or dates the user didn't write
- Inflate metrics ("led team of 8" when user wrote "worked with 8 people")
- Round years up ("3y" → "5y") even slightly
- Invent technologies the user has zero evidence for
- Claim outcomes ("reduced latency by 40%") when user only wrote "worked on latency"
- Promote a junior title to a senior one
- Hide gaps by overlapping dates

It **can**:

- **Re-order** sections and bullets so JD-relevant items sit first
- **Re-word** existing bullets in stronger voice (active, quantified where the data exists)
- **Emphasize** specific projects already on the resume that match the JD
- **De-emphasize** unrelated experience by collapsing or trimming
- **Rephrase** for ATS-keyword alignment (using user's actual experience)
- **Surface** evidence the user has elsewhere (GitHub repos, talks, blog posts) per `24-skill-claim-prover.md`
- **Convert** weak phrasing to strong while preserving meaning ("worked on X" → "owned X" only if user owned it)

Every change is shown in the delta view. Every change is **opt-in or opt-out** by the user before the tailored resume is exported.

## The eye-catch contract

The visual layout has a separate goal: **stand out in a stack of 200 résumés** without breaking ATS parsing.

This means walking a fine line:

- **ATS-parseable**: single column, machine-readable, no images for text, standard sections, accessible PDF
- **Visually distinct**: typographic restraint that reads "considered" rather than "Bootstrap default Word doc"
- **Recruiter-readable in 6 seconds**: the recruiter scans a résumé in ~6s; visual hierarchy must surface the strongest 3 facts in that window

The layout we ship by default is a **modern editorial single-column** with a sidebar callout band — palette-strict, Fraunces display + Geist body, generous spacing.

## Entry points

- JobCard preview pane → "Tailor CV" button → opens this flow
- `/evidence` → "Use this angle in CL" → opens with that angle pre-applied
- `/discover` → multi-select JobCards → "Tailor for selected" → batch mode
- `/profile/resume` → manage saved variants
- ⌘K → "Tailor my resume for <company>"

## Layout

Shell C (wizard split). 60% left — tailored output preview. 40% right — controls + delta view.

```
┌─────────────────────────────────────────────────────────────────┐
│ TOPBAR: [✕]   Tailor for Razorpay · Senior Backend               │
├──────────────────────────────────┬──────────────────────────────┤
│                                   │                              │
│   PREVIEW                         │   CONTROLS                   │
│                                   │                              │
│   ┌────────────────────────────┐ │   Variant base               │
│   │ [Editorial layout render   │ │   [Projects-first ▾]         │
│   │  of the tailored resume,   │ │                              │
│   │  approximate WYSIWYG]      │ │   ──────────────────────────  │
│   │                             │ │   JD MATCH                   │
│   │  Aman Bhargav               │ │   ATS keyword fit  ●●●●○ 87% │
│   │  Senior Backend Engineer   │ │   Claim coverage   ●●●●○ 84% │
│   │  ──────────────────────    │ │   Recruiter scan   ●●●●● 92% │
│   │  bangalore · ✉ ·  github   │ │                              │
│   │                             │ │   ──────────────────────────  │
│   │  ━━━━━━━━━━━━━━━━━━        │ │   CHANGES (12 proposed)      │
│   │  Profile                    │ │                              │
│   │  Backend engineer with 5y   │ │   ☑ Reorder: Projects up    │
│   │  building payments + auth   │ │     before Experience       │
│   │  systems at PhonePe and...  │ │     Why: JD weights projects│
│   │                             │ │     at 0.7                  │
│   │  ━━━━━━━━━━━━━━━━━━        │ │                              │
│   │  Highlighted Projects       │ │   ☑ Reword bullet 2         │
│   │  • async-django-toolkit (★) │ │     Was: "worked on auth"   │
│   │    Built JWT rotation under │ │     Now: "owned JWT rotation│
│   │    load — 8k req/sec, 99.9% │ │     under 8k req/sec load"  │
│   │    described at PyConf 2024 │ │     Evidence: GitHub commit │
│   │                             │ │     and PyConf talk         │
│   │  ━━━━━━━━━━━━━━━━━━        │ │                              │
│   │  Experience                 │ │   ☑ Surface PyConf talk     │
│   │  PhonePe · 2022–present    │ │     in Highlights (was       │
│   │  • Owned auth + session...  │ │     buried in Speaking)     │
│   │                             │ │                              │
│   │  ━━━━━━━━━━━━━━━━━━        │ │   ☐ Drop "tech support       │
│   │  Education                  │ │     intern" line entirely   │
│   │  IIT Madras · CSE · 2017–21 │ │     (3 years ago, off-topic)│
│   │                             │ │                              │
│   │  ━━━━━━━━━━━━━━━━━━        │ │   …8 more changes…           │
│   │  Talks & Writing            │ │                              │
│   │  • PyConf India 2024        │ │   [Apply selected ›]         │
│   └────────────────────────────┘ │                              │
│                                   │   ──────────────────────────  │
│   [Single-page] [Two-page]       │   GUARDRAILS (always on)     │
│   [Editorial] [Compact] [Classic]│   ✓ No invented facts        │
│                                   │   ✓ No metric inflation      │
│                                   │   ✓ No date adjustment       │
│                                   │   ✓ No title promotion       │
│                                   │   ✓ Honesty audit at export  │
│                                   │                              │
│   [Export PDF] [Export DOCX]     │                              │
│   [Save as variant]               │                              │
└──────────────────────────────────┴──────────────────────────────┘
```

## Three layout templates

All ATS-safe (single-column with optional sidebar callout); all palette-compliant; all use Fraunces + Geist.

### 1. Editorial (default)
- Fraunces display headings (Profile, Highlighted Projects, Experience…)
- Geist body
- Generous line-height, 1.55 body
- Subtle teal-500 horizontal rule between sections (1px, full-width)
- Single column, full-bleed
- Page count: 1 (default) or 2 (long careers)
- Designed to read as **considered**, like Stripe's annual letter

### 2. Compact
- Same families but 0.9× spacing scale
- Two columns *only* in Education/Skills sidebar (right rail, ~30% width)
- Main content stays single-column for ATS
- Better for senior candidates with dense histories

### 3. Classic
- Closer to standard "professional" layout
- Geist throughout, no Fraunces
- For risk-averse industries (banking ATS, govt, MNCs with legacy parsers)

The user picks per export. Default is Editorial; tailor recommends per-company based on industry signals (e.g., Razorpay → Editorial; TCS → Classic).

## ATS safety rules (built-in, non-negotiable)

- **Plain UTF-8 bullets** (`•` or `-`), no fancy glyphs
- **No icons in text** (header icons are fine if also in alt text/role attribute or simply absent)
- **No multi-column body** for the main flow (sidebars only for non-critical chrome)
- **No images of text**
- **Standard section names** ("Experience", "Education", "Skills", "Projects" — not "Where I've Slung Code")
- **Date formats consistent**: `Jan 2022 – Present` (not `01/22-Now` mixed with `Mar 2020-Apr 2021`)
- **Tables avoided**; if used, marked `role="presentation"`
- **Hyperlinks present** with full URL (not just clickable text — some parsers strip URLs)
- **PDF export uses tagged PDF** (accessible structure, ATS reads it)
- **DOCX export structurally clean** — no nested text boxes, no SmartArt
- **Font embedding** in PDF (so it renders consistently if recruiter prints)
- **No headers/footers** with critical info (some parsers skip them)

A pre-export "Honesty + ATS audit" runs and refuses to export if any rule fails.

## The change pipeline

When user clicks "Tailor for <job>":

```
[1] Load: source resume + JD + claim-evidence graph
       ↓
[2] Parse JD: extract required skills, years, keywords, role weight (projects vs experience vs cert)
       ↓
[3] Score: compute current resume's keyword match + claim coverage + scan-readability
       ↓
[4] Generate change proposals (ranked):
    • REORDER: section ordering by JD weight
    • REPHRASE: weak verbs → strong verbs (only when supported)
    • SURFACE: evidence already in graph but buried in resume
    • COLLAPSE: irrelevant items shrink / merge
    • DROP: clearly off-topic items (with explicit user opt-in)
       ↓
[5] Truthfulness gate: every proposed change passes guardrails
       ↓
[6] Render preview with proposed changes overlaid
       ↓
[7] User toggles each change, edits inline
       ↓
[8] Export: PDF + DOCX with audit trail
```

Each proposed change carries:
- **Type** (reorder / rephrase / surface / collapse / drop)
- **Why** (specific JD signal that triggered it)
- **Evidence** (which artifact in claim-evidence graph supports the rewording)
- **Truth-check** (verbatim original alongside proposed; user verifies)

## Truthfulness audit (pre-export)

Before any export, the tool runs:

| Check | Action if fails |
|---|---|
| Every claim has source in original resume OR claim-evidence graph | Block export |
| No metric inserted that wasn't in source | Block |
| No new technology added | Block |
| Date strings unchanged | Block |
| Title strings unchanged (or marked promotion-aware) | Warn + confirm |
| Total years not increased | Block |
| Project ownership not promoted ("worked on" → "owned") unless evidence supports | Warn + confirm |

Audit results displayed as a transparent panel before "Export." If any blocking check fails, the export button is disabled and the offending change is highlighted in the preview.

## Eye-catch heuristics (for the visual)

What we lean into to be visually distinct without breaking ATS:

- **Editorial type pairing** — Fraunces display + Geist body is uncommon on résumés (most use Calibri / Arial / Times). Already differentiating.
- **Tighter, more confident hierarchy** — Title → Headline → Profile in 3 weights, not 1
- **Generous whitespace** — most résumés cram; ours breathes (more white space = "this person knows design")
- **One restrained accent line** in teal-500 between sections (subtle, palette-strict — no rainbow rules)
- **Font sizing rhythm** — clear scale (32 → 18 → 14 → 12), not 5 random sizes
- **Tabular numbers** for dates (`tnum` feature) so columns align
- **Quantified bullets prioritized** at the top of each role
- **Highlighted Projects** as a first-class section (not buried inside Experience) — this is the recruiter eye-catch
- **Talks/Writing** as a section if user has any (signals seniority + thought leadership cheaply)

What we **don't do** because it kills ATS or feels gimmicky:

- ❌ Charts / graphs of skills (parsers can't read them; recruiters skim them and don't trust)
- ❌ Icons next to job titles (parser noise)
- ❌ Photo of candidate (illegal-bias-adjacent in some markets, never recommended for India tech roles)
- ❌ Color blocks or filled backgrounds behind text (printer-unfriendly)
- ❌ QR codes (parsers ignore; some ATS strip)
- ❌ Two-column main body
- ❌ Funky fonts ("Comic Sans," script fonts)
- ❌ "Hobbies" section unless directly relevant
- ❌ Ratings/dots for skills ("Python ●●●●○") — scaling is fake without context

## Components

In `packages/ui/src/ResumeTailor/` (or `apps/web/features/tailor/`):

- `TailorWizard` — top-level (Shell C wizard)
- `LayoutPicker` — Editorial / Compact / Classic
- `PreviewCanvas` — WYSIWYG render of the resume (HTML preview matched to PDF output)
- `ChangesPanel` — list of proposed changes, each toggleable
- `ChangeCard` — individual change (type / why / evidence / before-after diff)
- `JDMatchScores` — keyword fit / claim coverage / scan-readability dials
- `GuardrailsPanel` — always-visible truthfulness banner
- `HonestyAudit` — pre-export panel with audit checks
- `ExportControls` — PDF / DOCX / save-as-variant
- `BatchTailorMode` — for multi-job batch (e.g., "tailor 5 résumés for these 5 listings")

## Data model

```ts
interface ResumeTailorState {
  sourceResume: Resume;            // canonical user resume from CV-parser
  jobs: TailorTarget[];            // 1 (default) or N (batch)
  claimEvidence: EvidenceGraph;    // from skill-claim prover
  variants: ResumeVariant[];
  selectedVariantId: string;
  proposedChanges: ProposedChange[];
  acceptedChanges: Set<string>;
  audit: HonestyAuditResult | null;
  layout: 'editorial' | 'compact' | 'classic';
  pageMode: 'single' | 'two';
}

interface ProposedChange {
  id: string;
  type: 'reorder' | 'rephrase' | 'surface' | 'collapse' | 'drop';
  target: { section: string; bulletId?: string };
  before: string;
  after: string;
  reason: string;                  // JD signal that triggered it
  evidence?: { source: 'resume' | 'graph'; ref: string };
  truthScore: 0 | 1;               // 1 = passes all guardrails
  warnings?: string[];
}

interface HonestyAuditResult {
  passed: boolean;
  blockingFailures: AuditFailure[];
  warnings: AuditWarning[];
  signature: string;                // hash of (resume + accepted changes), embedded in exported PDF metadata
}
```

The `signature` lets us prove later, if a recruiter doubts the tailored claims, that nothing was invented post-export.

## Interactions & micro-animations

- **Mount**: preview canvas fades in (300ms). Skeleton outline of resume appears, content streams in section-by-section.
- **Toggle a change**: preview canvas updates with smooth transition — the affected paragraph cross-fades 200ms with the gold-100 highlight rule (per inline-diff convention)
- **Reorder change toggled**: section animates to new position via Framer Motion `layout` prop
- **JD match scores**: dials animate fill on first paint and on every accepted change
- **Audit verdict**: green check appears with subtle scale-up if all clear; gold-outlined warning materializes if not
- **Export**: button shows progress ring; "Generated" toast on success with two action buttons (Open / Download)
- **Earned moment**: when ALL three JD match scores cross 90%, gold border momentarily glows around the preview (1 cycle, ~600ms — see `06-motion-system.md` earned moments). Once per session per job.

## Empty / loading / error states

- **No source resume**: prompts onboarding Step 3 resume upload (link to `20-onboarding-flow.md`)
- **No claim graph yet**: tailor still works on resume-only signals, but warns "Claim graph not built — surface-evidence changes unavailable. Connect GitHub to enable."
- **JD parse fails**: tailor degrades to keyword-bag matching; warning banner explains
- **Audit blocking**: export button disabled with a clear "Fix these N issues" CTA → highlights items in preview

## Edge cases & India-specific gotchas

- **Multiple résumé variants per user** (already supported in `24-skill-claim-prover.md`) — tailor picks the best base variant per JD
- **Stealth Mode active**: tailored resume defaults to **pseudonym variant** (current employer name replaced with sector descriptor)
- **Indic resume content** (rare for tech, more common for non-tech) — tailor preserves Indic strings; Noto fonts embed in PDF
- **Service-company joining bond context** — tailor flags JD red-flags via `26-bond-bench-detector.md` and links them in the preview header
- **Fresher mode mismatch** — tailor for a senior role from a fresher resume produces a stern warning, not a fake-up: "Your evidence supports a fresher/junior position. Apply anyway, or browse fresher-fit listings."
- **Career gaps**: tailor never hides gaps (per truthfulness contract). It can soften by surfacing volunteer / freelance / personal-project work the user did *during* the gap if that exists in the evidence graph.
- **Internships counted explicitly** — Indian fresher résumés often muddle internship vs. full-time; tailor labels them clearly per ATS expectations
- **CGPA vs. percentage**: vault-stored both forms; tailor picks per company convention (T1 cos take CGPA; some take percentage)
- **Phone format**: Indian recruiters expect `+91 98XXX XXXXX`; tailor normalizes
- **Photo on resume**: defaults OFF (Indian convention is mixed; for tech we recommend off; tailor explains)
- **Languages section** for multi-lingual roles — auto-suggested when JD references "Hindi/Tamil/etc. preferred"

## Honesty rules (UX)

Per `01-design-principles.md` "trust through transparency":

- Every proposed change has a **Why** line tied to a specific JD signal
- Every reword shows **before/after** with the diff highlighted
- Audit panel always visible (collapsed but reachable)
- "Reject all changes" button always present (single click, returns to original)
- Exported PDF metadata embeds signature + audit pass timestamp + tool version (so the artifact carries its provenance)

## Cross-doc links

- Resume + claim graph data: `24-skill-claim-prover.md`
- Apply flow consumes tailored variants: `22-job-discovery.md`
- Cover letter generation reuses tailor outputs: `23-referral-hijack.md` DM composer + apply Tier 1
- Stealth pseudonym variant: `27-stealth-mode.md`
- ATS compatibility ring (sister concept): `11-components-composite.md` ATSCompatibilityRing
- Color/type used in layout templates: `02-color-system.md`, `03-typography.md`
- Earned-moment animation: `06-motion-system.md`
- Honesty + DPDP framing: `01-design-principles.md`, `36-settings-billing.md`

## Open questions

1. **Where does this module live in the build plan?** — Insert as part of Day 5 (alongside Skill Claim canvas) for v0.1 minimal version; full version including layout templates ships as a follow-up sprint after Day 7.
2. **PDF rendering engine** — Puppeteer/Playwright server-side print, or a JS-based engine like `react-pdf`? — recommend `react-pdf` for layout fidelity; fallback to Playwright print-to-PDF for the Editorial layout's typographic finesse.
3. **DOCX generation** — `docx` npm library is the standard; layouts simpler than PDF (DOCX has weaker typographic control by design)
4. **Recruiter A/B**: should we instrument "did the recruiter open this PDF" via tracked URLs in the PDF? — privacy-fragile and DPDP-questionable; default off, opt-in.
5. **Auto-tailor on Apply**: when user clicks Apply, should the tailored variant auto-attach? — yes, with an optional pre-send review.
