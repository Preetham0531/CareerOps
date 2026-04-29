# 13 — Empty, Error, Loading States

> A product feels finished when its non-happy paths feel as designed as its happy paths. Empty/error/loading states are first-class.

---

## Loading

Three loading modes, picked by context:

### 1. Skeleton (preferred for content)
For known content shape — lists, cards, tables, charts.

```
┌─────────────────────────────────────┐
│ ████████████████████░░░░  ░░░░░     │
│ ████████░░░░░  ░░░░░░░░  ░░░░░░░    │
│ ████████████████████████████████░░░  │
└─────────────────────────────────────┘
```

- Boxes sized to match real content (do not collapse)
- Diagonal shimmer 1.4s linear infinite (paused under `prefers-reduced-motion`)
- Light: `--bg-raised` block + `teal-100` shimmer; dark: `teal-800` block + `teal-700` shimmer
- Skeleton stays visible until content fully replaces it; no flash-of-empty

### 2. Spinner (for unknown / quick operations)
For sub-1s actions, small inline loaders, or shape-unknown loads.

- Inline: 16px Loader2 in `currentColor`
- Block-centered: 32px in `--brand`
- Shown only after 200ms delay (most ops finish faster — no spinner flash)

### 3. Streaming reveal (AI-generated content)
For LLM responses, cover letters, DM drafts.

- Tokens stream in via SSE
- Cursor block in `--accent` blinks at 1Hz
- Prefers-reduced-motion: render full text on completion, no streaming
- Stop button always visible while streaming

---

## Loading patterns by surface

| Surface | Pattern |
|---|---|
| Job list (initial) | Skeleton: 8 card placeholders matching JobCard shape |
| Job list (paginated) | Skeleton: 4 cards at bottom, infinite scroll trigger |
| Referral graph | Loading: animated dot with "Building your network graph..." text |
| Salary triangulation | Skeleton: ghost outline of bubble chart with axis only |
| Cover letter generator | Streaming reveal |
| Profile load | Skeleton matching profile shape |
| Dashboard | Skeleton bento grid (preserves layout) |
| Search results | Skeleton 3-card placeholder until first results land |
| Modal content | Spinner (block-centered, 32px) — modals are bounded |
| Auth flows | Disabled inputs + spinner in submit button |

---

## Empty states

A core principle: **the empty state explains why and what next.** It's not "no data here." It's:

```
┌───────────────────────────────────────────┐
│            [illustration ~120px]           │
│                                            │
│      No referrers found yet                │
│                                            │
│   We'll keep watching your network and     │
│   notify you the moment a path opens.      │
│                                            │
│        [Connect LinkedIn] [Learn more]     │
└───────────────────────────────────────────┘
```

### Anatomy
1. **Illustration** (optional but encouraged) — claymorphic mascot in palette, ~120px tall
2. **Headline** — Fraunces 600 / 18–20px
3. **Description** — Geist 400 / 14px / max 2 lines
4. **Primary action** — single button, the most useful next step
5. **Secondary affordance** — link to docs / explainer (optional)

### Empty-state copy patterns

| Surface | Headline | Description | Primary action |
|---|---|---|---|
| Discovery (no filters set) | "Tell us what you're looking for" | "Set role + location + LPA range and we'll surface matches." | Set filters |
| Discovery (filters set, 0 results) | "No matches in your filter" | "Try widening the LPA range, or open it to remote. We'll keep watching." | Edit filters |
| Saved jobs | "No saved jobs yet" | "Bookmark interesting roles to compare side-by-side." | Browse jobs |
| Applied | "No applications yet" | "Once you apply, we'll track replies, interviews, and offers here." | Find jobs |
| Referrers (network not connected) | "Connect your network" | "We need LinkedIn access to find paths into target companies." | Connect LinkedIn |
| Referrers (connected, no paths) | "No referrers found yet" | "We'll keep watching your network and notify you the moment a path opens." | Browse jobs |
| Cohort (none joined) | "Job-hunting alone is brutal" | "Cohort mode lets 4–6 friends share filters, peer-review CVs, and stay accountable together." | Create a cohort |
| Interview prep | "No upcoming interviews" | "Once you book one, we'll generate prep questions and an interviewer one-pager." | — (link to discovery) |
| Notifications | "All caught up" | "We'll ping you when something needs your attention." | — |
| Search (no query) | — | "Search jobs, companies, settings, or actions. Try ⌘K from anywhere." | — |
| Search (no results) | "Nothing found for '<query>'" | "Try a different keyword or browse by category." | Browse |
| Stealth mode (just enabled) | "Stealth mode on" | "Your current employer can't see your activity. Job alerts arrive at off-hours only." | Set off-hours window |

---

## Error states

Errors come in tiers; treat each correctly.

### Tier 1: inline field error
- Input border `--danger`
- Helper text below input in `--danger` ("Email format invalid", "Required")
- No animation beyond color shift

### Tier 2: section-level error
- Replaces the broken section with an ErrorBoundary card (see `11-components-composite.md`)
- Lets the rest of the page work

### Tier 3: full-page error
- Used for 401, 403, 404, 5xx routes
- Layout: hero illustration + headline + description + CTAs

```
┌───────────────────────────────────────────┐
│                                            │
│           [404 illustration]               │
│                                            │
│      We can't find that page               │
│                                            │
│   It may have been moved or never existed. │
│                                            │
│      [Back home]  [Search]  [Help]         │
│                                            │
└───────────────────────────────────────────┘
```

### Tier 4: app-level fatal
- Sentry-captured, user shown a dignified screen with reload + report
- Full screen replaces the whole app

### Error-state copy patterns

| Code / situation | Headline | Description |
|---|---|---|
| 401 (signed out) | "You've been signed out" | "Sign in again to continue." |
| 403 (no access) | "You don't have access" | "Ask the cohort owner to invite you, or switch accounts." |
| 404 | "We can't find that page" | "It may have been moved or never existed." |
| 5xx | "Something went wrong on our end" | "We've been notified and are looking into it. Try again in a minute." |
| Network offline | "You're offline" | "We'll retry automatically when you're back online." |
| Rate limited | "Slow down" | "Too many requests. Try again in <N> seconds." |
| LinkedIn auth expired | "LinkedIn session expired" | "Reconnect to keep your referrer paths fresh." |
| Portal blocked | "Naukri blocked our session" | "We'll switch to assist mode for this listing — open it in your browser, we'll prefill the form." |

### Tone rules
- Never blame the user for our errors
- Never blame the user for their network ("Your internet is bad")
- Always explain what happens next
- Never show raw error codes / stack traces (those go to Sentry)
- "Try again" buttons retry the *exact* failed operation, not just refresh the page

---

## Offline support

PWA service worker caches:
- App shell (HTML + JS + CSS)
- Last-loaded job list (read-only)
- User profile data
- Queued actions (save, apply) — replayed when online

Offline banner: top of screen, `gold-200` bg, "You're offline. Changes will sync when you reconnect."

---

## Stale-while-revalidate

For background data refreshes (TanStack Query default):
- Render cached data immediately
- Re-fetch in background
- If new data differs, smoothly fade-swap (no jarring re-render)

Show a small `Refreshing...` chip top-right when revalidating > 1s.

---

## Optimistic updates

For actions where success is overwhelmingly likely (save, follow company, mark "not interested"):
- Update UI immediately
- Submit in background
- On failure, revert + toast with "Try again"
- Use `useOptimistic` (React 19) where available

---

## Long-running tasks

Some actions take 5–60s (referrer search, ATS-tailored CV generation, evidence graph build).

Pattern:
1. Trigger button shows loading + immediately disables
2. Toast appears: "Searching your network..." with a determinate progress bar if known, indeterminate otherwise
3. User can dismiss the toast and navigate away — task continues
4. On completion: success toast + link to result
5. On failure: error toast + retry button

Backed by a server-side job queue; client polls or subscribes via WebSocket.

---

## Combined-state matrix

Some surfaces juggle loading + empty + error simultaneously (e.g., dashboard with multiple widgets).

Rule: **each widget owns its own state.** A failed sparkline doesn't break the rest of the dashboard. ErrorBoundary scopes per widget.

Order of precedence within a widget:
1. **Error** > **Loading** > **Empty** > **Content**

That is: if a refetch fails, show error (don't blink back to skeleton).

---

## Visual specimens

(Sketch placeholders — Figma to follow.)

```
LOADING (skeleton card):
┌─────────────────────────────────────┐
│ ████████████████░░░░  ░░░░          │
│ ████░░░░░░░░  ░░░░░░░░  ░░░░░░░░░    │
│ ░░░░░  ░░░░░░░░░░░░░░░░░░░░░░░░░░    │
│ [        ] [           ] [    ›]    │
└─────────────────────────────────────┘

EMPTY:
┌─────────────────────────────────────┐
│              [☁ illustration]        │
│         No referrers yet             │
│  We'll notify you when one opens.   │
│         [Connect LinkedIn]           │
└─────────────────────────────────────┘

ERROR (inline):
┌─────────────────────────────────────┐
│ Couldn't load referrers              │
│ Network error. [Retry]               │
└─────────────────────────────────────┘
```

---

## QA checklist

For every component:
- [ ] Skeleton state implemented and matches content shape
- [ ] Empty state with illustration, headline, description, action
- [ ] Inline error (where applicable)
- [ ] Tier-2 error boundary wraps the component
- [ ] Reduced-motion compliance
- [ ] Offline behavior verified
- [ ] Optimistic update + revert tested
- [ ] Long-task pattern wired up where relevant

Storybook story: every state in its own story.
