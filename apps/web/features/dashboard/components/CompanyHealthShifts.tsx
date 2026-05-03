import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

import { cn } from '@/lib/cn';

interface Health {
  company: string;
  trend: 'improving' | 'stable' | 'declining';
  saved: boolean;
  applied: boolean;
}

export function CompanyHealthShifts({ items }: { items: Health[] }) {
  return (
    <section
      aria-label="Company health shifts"
      className="rounded-md border border-border-subtle bg-bg-surface p-5"
    >
      <header className="mb-3">
        <h2 className="text-h3 font-semibold text-fg-primary">Company health</h2>
        <p className="text-caption text-fg-muted">Companies you've saved or applied to</p>
      </header>
      <ul className="divide-y divide-border-subtle">
        {items.map((h) => (
          <li
            key={h.company}
            className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
          >
            <div>
              <p className="font-medium text-body-m text-fg-primary">{h.company}</p>
              <p className="text-caption text-fg-muted">
                {h.applied ? 'Applied · ' : ''}
                {h.saved && !h.applied ? 'Saved' : ''}
              </p>
            </div>
            <TrendChip trend={h.trend} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function TrendChip({ trend }: { trend: Health['trend'] }) {
  const map = {
    improving: { icon: TrendingUp, label: 'improving', className: 'bg-success-bg text-brand' },
    stable: { icon: Minus, label: 'stable', className: 'bg-bg-raised text-fg-secondary' },
    declining: { icon: TrendingDown, label: 'declining', className: 'bg-danger-bg text-danger' },
  } as const;
  const { icon: Icon, label, className } = map[trend];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-caption font-medium',
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
