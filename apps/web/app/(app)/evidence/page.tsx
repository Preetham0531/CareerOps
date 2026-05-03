'use client';

/**
 * Day 5 Evidence canvas. List-first view (force-graph deferred to Day 5b).
 *
 * To swap into place:
 *   mv "apps/web/app/(app)/evidence/page.tsx.day5" "apps/web/app/(app)/evidence/page.tsx"
 */

import { useMemo, useState } from 'react';
import { Button, LoadingSpinner } from '@careerops/ui';
import { useEvidence } from '@careerops/api-client';

import { ClaimRow } from '@/features/evidence/components/ClaimRow';
import { ClaimDrawer } from '@/features/evidence/components/ClaimDrawer';
import { EvidenceCard } from '@/features/evidence/components/EvidenceCard';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'strong', label: 'Strong' },
  { value: 'medium', label: 'Medium' },
  { value: 'weak', label: 'Weak' },
] as const;
type Filter = (typeof FILTERS)[number]['value'];

export default function EvidencePage() {
  const { data, isLoading } = useEvidence();
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const evidenceById = useMemo(() => {
    const m: Record<string, NonNullable<typeof data>['evidence'][number]> = {};
    data?.evidence.forEach((e) => {
      m[e.id] = e;
    });
    return m;
  }, [data]);

  const claims = data?.claims ?? [];
  const filtered = claims.filter((c) => {
    if (filter === 'all') return true;
    if (filter === 'strong') return c.strength >= 4;
    if (filter === 'medium') return c.strength === 3;
    return c.strength <= 2;
  });

  const selected = claims.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="container py-10">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-display-l font-bold text-fg-primary">My evidence</h1>
          <p className="mt-2 text-body-m text-fg-secondary">
            Every claim links to artifacts that prove it. Recruiters see the receipts, not the
            résumé.
          </p>
        </div>
        <Button variant="secondary">Add evidence</Button>
      </header>

      <div className="mb-4 flex items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={
              filter === f.value
                ? 'rounded-pill bg-brand px-3 py-1 text-caption font-medium text-fg-inverse'
                : 'rounded-pill px-3 py-1 text-caption text-fg-secondary hover:text-fg-primary'
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="py-12 text-center">
          <LoadingSpinner size="block" label="Loading evidence graph…" />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section aria-label="Claims">
            <h2 className="mb-3 text-caption font-semibold uppercase tracking-wide text-fg-muted">
              Claims ({filtered.length})
            </h2>
            <ul className="flex flex-col gap-2">
              {filtered.map((c) => (
                <li key={c.id}>
                  <ClaimRow
                    claim={c}
                    selected={selectedId === c.id}
                    onSelect={() => setSelectedId(c.id)}
                  />
                </li>
              ))}
            </ul>
          </section>

          <aside aria-label="Recent evidence">
            <h2 className="mb-3 text-caption font-semibold uppercase tracking-wide text-fg-muted">
              Recent evidence
            </h2>
            <ul className="flex flex-col gap-2">
              {data?.evidence.slice(0, 5).map((ev) => (
                <li key={ev.id}>
                  <EvidenceCard ev={ev} />
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}

      <ClaimDrawer claim={selected} evidenceById={evidenceById} onClose={() => setSelectedId(null)} />
    </div>
  );
}
