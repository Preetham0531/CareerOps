import { Check, X } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { StealthSnapshot } from '@careerops/api-client';

export function EmployerPreview({ snapshot }: { snapshot: StealthSnapshot }) {
  const v = snapshot.visibilityCheck;
  const ok = v.verdict === 'invisible';

  return (
    <section className="rounded-md border border-border-subtle bg-bg-surface p-5">
      <header className="mb-3">
        <h2 className="text-h3 font-semibold text-fg-primary">
          What your current employer sees
        </h2>
        <p className="mt-0.5 text-caption text-fg-muted">
          Last checked {new Date(v.at).toLocaleString('en-IN')}
        </p>
      </header>

      <div
        className={cn(
          'rounded-md border p-4 text-body-s',
          ok
            ? 'border-success/30 bg-success-bg text-brand'
            : 'border-warning bg-warning-bg text-warning',
        )}
      >
        {ok ? '✓ Invisible to your current employer.' : '⚠ Leaks detected — review below.'}
        <p className="mt-1 text-fg-secondary">{v.details}</p>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Column label="Visible" items={v.visibleSignals} positive={ok} icon="check" />
        <Column label="Hidden" items={v.hiddenSignals} positive={true} icon="x" />
      </div>
    </section>
  );
}

function Column({
  label,
  items,
  positive,
  icon,
}: {
  label: string;
  items: string[];
  positive: boolean;
  icon: 'check' | 'x';
}) {
  const Icon = icon === 'check' ? Check : X;
  return (
    <div>
      <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-fg-muted">
        {label}
      </p>
      <ul className="flex flex-col gap-1">
        {items.length === 0 ? (
          <li className="text-body-s text-fg-muted">—</li>
        ) : (
          items.map((it) => (
            <li
              key={it}
              className={cn(
                'inline-flex items-center gap-2 text-body-s',
                positive ? 'text-fg-secondary' : 'text-warning',
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {it}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
