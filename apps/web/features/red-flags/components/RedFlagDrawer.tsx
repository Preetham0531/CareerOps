'use client';

import { Button, LoadingSpinner, RightDrawer } from '@careerops/ui';
import { BondLink, BenchClock } from '@careerops/icons';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { useRedFlagsForJob, type RedFlag } from '@careerops/api-client';

import { cn } from '@/lib/cn';

interface RedFlagDrawerProps {
  jobId: string | null;
  jobLabel?: string;
  onClose: () => void;
}

const SEVERITY_CLASS: Record<RedFlag['severity'], string> = {
  low: 'border-warning/40 bg-warning-bg/40 text-warning',
  medium: 'border-warning bg-warning-bg text-warning',
  high: 'border-danger bg-danger-bg text-danger',
};

const TYPE_ICON = {
  bond: BondLink,
  bench: BenchClock,
  bait: AlertTriangle,
  pyramid: AlertTriangle,
  'night-shift': AlertTriangle,
  'layoff-risk': AlertTriangle,
} as const;

const TYPE_LABEL: Record<RedFlag['type'], string> = {
  bond: 'Service bond',
  bench: 'Bench risk',
  bait: 'Bait & switch',
  pyramid: 'Pyramid consultancy',
  'night-shift': 'Night-shift only',
  'layoff-risk': 'Layoff risk',
};

export function RedFlagDrawer({ jobId, jobLabel, onClose }: RedFlagDrawerProps) {
  const { data, isLoading } = useRedFlagsForJob(jobId ?? '');

  return (
    <RightDrawer open={!!jobId} onOpenChange={(o) => !o && onClose()}>
      <RightDrawer.Content size="md">
        <RightDrawer.Header>
          <RightDrawer.Title>Red flags{jobLabel ? ` · ${jobLabel}` : ''}</RightDrawer.Title>
        </RightDrawer.Header>
        <RightDrawer.Body>
          {isLoading ? (
            <LoadingSpinner size="block" label="Scanning sources…" />
          ) : !data?.flags.length ? (
            <p className="py-12 text-center text-body-m text-fg-secondary">
              No public red flags detected. <span className="block text-caption text-fg-muted">Apply with care — silence isn't the same as 'all clear'.</span>
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {data.flags.map((flag, i) => {
                const Icon = TYPE_ICON[flag.type];
                return (
                  <li
                    key={i}
                    className={cn(
                      'rounded-md border p-4',
                      SEVERITY_CLASS[flag.severity],
                    )}
                  >
                    <header className="flex items-center gap-2">
                      <Icon size={18} />
                      <h3 className="font-semibold uppercase text-caption tracking-wide">
                        {TYPE_LABEL[flag.type]} · severity {flag.severity}
                      </h3>
                    </header>
                    <ul className="mt-3 space-y-2">
                      {flag.evidence.map((ev, j) => (
                        <li
                          key={j}
                          className="rounded-sm border border-border-subtle bg-bg-surface p-3 text-body-s text-fg-primary"
                        >
                          <p>“{ev.excerpt}”</p>
                          <p className="mt-1 flex items-center gap-2 text-caption text-fg-muted">
                            <span className="capitalize">{ev.source.replace('-', ' ')}</span>
                            <span>· weight {(ev.weight * 100).toFixed(0)}%</span>
                            {ev.url && (
                              <a
                                href={ev.url}
                                target="_blank"
                                rel="noreferrer"
                                className="ml-auto inline-flex items-center gap-1 text-brand underline-offset-4 hover:underline"
                              >
                                Source <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          )}
        </RightDrawer.Body>
        <RightDrawer.Footer>
          <Button variant="ghost">Hide jobs with this flag</Button>
          <Button>Got it</Button>
        </RightDrawer.Footer>
      </RightDrawer.Content>
    </RightDrawer>
  );
}
