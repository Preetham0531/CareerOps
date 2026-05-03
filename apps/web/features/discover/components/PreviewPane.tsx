'use client';

import { X, ExternalLink } from 'lucide-react';
import { Button } from '@careerops/ui';
import type { JobData } from '@careerops/ui';

import { cn } from '@/lib/cn';

interface PreviewPaneProps {
  job: JobData | null;
  onClose: () => void;
  onApply: (job: JobData) => void;
  onTailorCV: (job: JobData) => void;
  onViewReferrers: (job: JobData) => void;
  className?: string;
}

const LPA = 100_000;
function lpa(v: number) {
  const l = v / LPA;
  return `${l.toFixed(l % 1 === 0 ? 0 : 1)}L`;
}

export function PreviewPane({
  job,
  onClose,
  onApply,
  onTailorCV,
  onViewReferrers,
  className,
}: PreviewPaneProps) {
  if (!job) return null;

  return (
    <aside
      role="region"
      aria-label="Job preview"
      className={cn(
        'flex h-full w-full flex-col overflow-y-auto border-l border-border-subtle bg-bg-surface',
        className,
      )}
    >
      <header className="sticky top-0 z-sticky flex items-start justify-between gap-3 border-b border-border-subtle bg-bg-surface p-4">
        <div className="min-w-0">
          <h2 className="font-display text-h2 font-semibold text-fg-primary">{job.title}</h2>
          <p className="mt-1 text-body-s text-fg-secondary">
            {job.company} · {job.location.city} · T{job.location.tier}
          </p>
        </div>
        <button
          type="button"
          aria-label="Close preview"
          onClick={onClose}
          className="rounded-md p-1 text-fg-muted hover:bg-bg-raised hover:text-fg-primary"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="flex-1 space-y-6 p-5">
        {job.salary && (
          <Block label="Salary">
            <p className="font-display text-display-s font-semibold tabular text-fg-primary">
              ₹{lpa(job.salary.min)}–{lpa(job.salary.max)}
            </p>
            <p className="mt-1 text-caption text-fg-muted">
              Confidence{' '}
              {job.salary.confidence >= 0.7
                ? 'high'
                : job.salary.confidence >= 0.4
                  ? 'medium'
                  : 'low'}
            </p>
          </Block>
        )}

        <div className="grid grid-cols-3 gap-3">
          <Stat label="Match" value={`${Math.round(job.matchScore * 100)}%`} />
          <Stat label="Ghost" value={`${Math.round(job.ghostScore * 100)}%`} />
          <Stat label="ATS" value="—" />
        </div>

        {job.excerpt && (
          <Block label="Description">
            <p className="text-body-m leading-body text-fg-primary">{job.excerpt}</p>
          </Block>
        )}

        {job.referralPath && (
          <Block label="Referral paths">
            <p className="text-body-s text-fg-secondary">
              {job.referralPath.count} mutual contacts at {job.company}
            </p>
            <Button
              size="sm"
              variant="secondary"
              className="mt-2"
              onClick={() => onViewReferrers(job)}
            >
              View referrers
            </Button>
          </Block>
        )}

        {(job.bondFlag || job.benchFlag) && (
          <Block label="Red flags">
            {job.bondFlag && (
              <p className="text-body-s text-warning">
                Bond {job.bondFlag.durationYears ?? ''}y · {job.bondFlag.reason}
              </p>
            )}
            {job.benchFlag && (
              <p className="mt-1 text-body-s text-warning">Bench risk · {job.benchFlag.reason}</p>
            )}
          </Block>
        )}
      </div>

      <footer className="sticky bottom-0 flex items-center justify-end gap-2 border-t border-border-subtle bg-bg-surface p-4">
        <Button variant="ghost" size="md" onClick={() => onTailorCV(job)}>
          Tailor CV
        </Button>
        <Button size="md" onClick={() => onApply(job)}>
          Apply <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </footer>
    </aside>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 text-caption font-semibold uppercase tracking-wide text-fg-muted">
        {label}
      </h3>
      {children}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border-subtle bg-bg-app p-3 text-center">
      <p className="text-caption uppercase tracking-wide text-fg-muted">{label}</p>
      <p className="mt-1 font-display text-display-s font-bold tabular text-fg-primary">{value}</p>
    </div>
  );
}
