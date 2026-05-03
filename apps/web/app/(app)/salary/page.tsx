'use client';

import { useState } from 'react';
import { LoadingSpinner } from '@careerops/ui';
import { useSalaryIntel } from '@careerops/api-client';

import { RangeBar } from '@/features/salary/components/RangeBar';
import { TriangulationBubble } from '@/features/salary/components/TriangulationBubble';
import { ComponentsStack } from '@/features/salary/components/ComponentsStack';
import { PeerComparison } from '@/features/salary/components/PeerComparison';

const SOURCE_LABEL: Record<string, string> = {
  'levels.fyi': 'Levels.fyi',
  ambitionbox: 'AmbitionBox',
  glassdoor: 'Glassdoor',
  reddit: 'Reddit r/developersIndia',
  'recruiter-other': "Recruiter's other postings",
  'past-employee': 'Past-employee triangulation',
};

export default function SalaryIntelPage() {
  const [company] = useState('Razorpay');
  const [role] = useState('Senior Backend');
  const { data, isLoading } = useSalaryIntel(company, role);

  return (
    <div className="container py-10">
      <header className="mb-6">
        <h1 className="font-display text-display-l font-bold text-fg-primary">
          Salary intel: {role} at {company}
        </h1>
        <p className="mt-2 text-body-m text-fg-secondary">
          Triangulated from {data?.observations.length ?? '…'} observations across{' '}
          {data?.sources.length ?? '…'} sources. Confidence shown below.
        </p>
      </header>

      {isLoading || !data ? (
        <LoadingSpinner size="block" label="Aggregating sources…" />
      ) : (
        <div className="grid gap-6">
          <section
            aria-label="Triangulated range"
            className="rounded-md border border-border-subtle bg-bg-surface p-6"
          >
            <RangeBar range={data.range} postedBand={data.postedBand} />
            <p className="mt-4 text-caption text-fg-muted">
              Confidence{' '}
              <span className="font-semibold text-fg-secondary">
                {Math.round(data.range.confidence * 100)}%
              </span>{' '}
              · n = {data.observations.length}
              {data.postedBand && (
                <>
                  {' · '}
                  Posted band{' '}
                  <span className="tabular">
                    ₹{(data.postedBand[0] / 100_000).toFixed(0)}–
                    {(data.postedBand[1] / 100_000).toFixed(0)}L
                  </span>
                </>
              )}
            </p>
          </section>

          <section
            aria-label="Triangulation bubble chart"
            className="rounded-md border border-border-subtle bg-bg-surface p-6"
          >
            <h3 className="mb-3 text-caption font-semibold uppercase tracking-wide text-fg-muted">
              Triangulation
            </h3>
            <TriangulationBubble observations={data.observations} />
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            <ComponentsStack components={data.components} />
            <PeerComparison peers={data.peers} />
          </div>

          <section
            aria-label="Source transparency"
            className="rounded-md border border-border-subtle bg-bg-surface p-6"
          >
            <h3 className="mb-3 text-caption font-semibold uppercase tracking-wide text-fg-muted">
              Source transparency
            </h3>
            <ul className="divide-y divide-border-subtle">
              {data.sources.map((s) => (
                <li
                  key={s.source}
                  className="flex items-center justify-between py-2 first:pt-0 last:pb-0 text-body-s"
                >
                  <span className="text-fg-primary">
                    {SOURCE_LABEL[s.source] ?? s.source}
                  </span>
                  <span className="text-fg-muted tabular">
                    {s.observations} obs · weight {(s.weight * 100).toFixed(0)}% · updated{' '}
                    {s.lastUpdated}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
