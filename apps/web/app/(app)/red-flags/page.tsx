'use client';

import { useState } from 'react';
import { Button } from '@careerops/ui';

import { RedFlagDrawer } from '@/features/red-flags/components/RedFlagDrawer';

const SAMPLE_FLAGGED_JOBS = [
  { id: 'job-1', label: 'TCS · Senior Software Engineer', company: 'TCS', severity: 'high' },
  { id: 'job-5', label: 'Infosys · Systems Engineer', company: 'Infosys', severity: 'high' },
];

export default function RedFlagsHubPage() {
  const [open, setOpen] = useState<{ id: string; label: string } | null>(null);

  return (
    <div className="container py-10">
      <header className="mb-6">
        <h1 className="font-display text-display-l font-bold text-fg-primary">Red flags hub</h1>
        <p className="mt-2 text-body-m text-fg-secondary">
          Listings you've touched that have public red flags. Tap a row to see specific signals.
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {SAMPLE_FLAGGED_JOBS.map((j) => (
          <li
            key={j.id}
            className="flex items-center justify-between rounded-md border border-warning/40 bg-warning-bg/30 p-4"
          >
            <div>
              <p className="font-medium text-fg-primary">{j.label}</p>
              <p className="text-caption text-fg-muted">Severity {j.severity}</p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setOpen({ id: j.id, label: j.label })}
            >
              Details
            </Button>
          </li>
        ))}
      </ul>

      <RedFlagDrawer
        jobId={open?.id ?? null}
        jobLabel={open?.label}
        onClose={() => setOpen(null)}
      />
    </div>
  );
}
