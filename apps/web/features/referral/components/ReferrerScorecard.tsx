'use client';

import { Avatar, Button, LoadingSpinner, RightDrawer } from '@careerops/ui';
import { useReferrer } from '@careerops/api-client';
import { ExternalLink } from 'lucide-react';

import { cn } from '@/lib/cn';

interface ReferrerScorecardProps {
  referrerId: string | null;
  onClose: () => void;
  onCompose: (referrerId: string) => void;
}

export function ReferrerScorecard({ referrerId, onClose, onCompose }: ReferrerScorecardProps) {
  const { data, isLoading } = useReferrer(referrerId);

  return (
    <RightDrawer open={!!referrerId} onOpenChange={(open) => !open && onClose()}>
      <RightDrawer.Content size="sm">
        <RightDrawer.Header>
          <RightDrawer.Title>Referrer scorecard</RightDrawer.Title>
        </RightDrawer.Header>
        <RightDrawer.Body>
          {isLoading || !data ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="block" label="Loading scorecard…" />
            </div>
          ) : (
            <>
              <div className="flex items-start gap-3">
                <Avatar size="xl" alt={data.name} fallback={data.name} ringColor="accent" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-h2 font-semibold text-fg-primary">{data.name}</h3>
                  <p className="text-body-s text-fg-secondary">
                    {data.role} · {data.company}
                  </p>
                  {data.linkedinUrl && (
                    <a
                      href={data.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-caption font-medium text-brand underline-offset-4 hover:underline"
                    >
                      Open LinkedIn <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>

              <ScoreGauge value={data.score} />

              <section className="mt-6">
                <h4 className="text-caption font-semibold uppercase tracking-wide text-fg-muted">
                  Reachability breakdown
                </h4>
                <ul className="mt-3 space-y-2">
                  <Bar label="School / batch overlap" value={data.breakdown.school} />
                  <Bar label="Prior co. overlap" value={data.breakdown.priorCompany} />
                  <Bar label="Mutual friend strength" value={data.breakdown.mutualStrength} />
                  <Bar label="LinkedIn activity" value={data.breakdown.activity} />
                  <Bar label="Tenure at company" value={data.breakdown.tenure} />
                  <Bar label="Seniority weight" value={data.breakdown.seniority} />
                </ul>
              </section>

              <section className="mt-6">
                <h4 className="text-caption font-semibold uppercase tracking-wide text-fg-muted">
                  Path
                </h4>
                <p className="mt-2 text-body-s text-fg-primary">{data.pathLabel}</p>
              </section>

              <section className="mt-6">
                <h4 className="text-caption font-semibold uppercase tracking-wide text-fg-muted">
                  Recent activity
                </h4>
                <ul className="mt-2 space-y-1.5 text-body-s text-fg-secondary">
                  {data.recentActivity.map((a, i) => (
                    <li key={i}>• {a}</li>
                  ))}
                </ul>
              </section>

              <section className="mt-6">
                <h4 className="text-caption font-semibold uppercase tracking-wide text-fg-muted">
                  Mutual friends ({data.mutuals.length})
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.mutuals.map((m) => (
                    <span
                      key={m.name}
                      className="inline-flex items-center gap-2 rounded-pill bg-bg-raised px-2 py-1 text-caption text-fg-primary"
                    >
                      <Avatar size="xs" alt={m.name} fallback={m.name} />
                      {m.name}
                    </span>
                  ))}
                </div>
              </section>
            </>
          )}
        </RightDrawer.Body>
        <RightDrawer.Footer>
          <Button size="lg" onClick={() => referrerId && onCompose(referrerId)}>
            Compose DM ›
          </Button>
        </RightDrawer.Footer>
      </RightDrawer.Content>
    </RightDrawer>
  );
}

function ScoreGauge({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const radius = 36;
  const circ = 2 * Math.PI * radius;
  return (
    <div className="mt-6 flex items-center gap-4">
      <div className="relative inline-flex items-center justify-center" style={{ width: 80, height: 80 }}>
        <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-bg-raised"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - value)}
            className="text-brand transition-[stroke-dashoffset] duration-slow ease-emphasized"
          />
        </svg>
        <span className="absolute font-display text-display-s font-bold tabular text-fg-primary">
          {pct}
        </span>
      </div>
      <div>
        <p className="text-caption font-semibold uppercase tracking-wide text-fg-muted">Score</p>
        <p className="text-body-m text-fg-primary">
          {value >= 0.8 ? 'Strong match' : value >= 0.5 ? 'Likely warm' : 'Cold'}
        </p>
      </div>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  const pct = Math.round(value * 100);
  return (
    <li className="grid grid-cols-[140px_1fr_36px] items-center gap-2">
      <span className="text-body-s text-fg-secondary">{label}</span>
      <span className="h-1.5 overflow-hidden rounded-pill bg-bg-raised">
        <span
          className={cn('block h-full rounded-pill bg-brand transition-all duration-slow ease-emphasized')}
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="text-right text-caption tabular text-fg-muted">{pct}</span>
    </li>
  );
}
