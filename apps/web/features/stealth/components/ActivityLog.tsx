import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { StealthSnapshot } from '@careerops/api-client';

export function ActivityLog({ entries }: { entries: StealthSnapshot['activityLog'] }) {
  return (
    <section className="rounded-md border border-border-subtle bg-bg-surface p-5">
      <h2 className="mb-3 text-h3 font-semibold text-fg-primary">Stealth activity log</h2>
      <ul className="divide-y divide-border-subtle">
        {entries.map((e, i) => {
          const Icon = e.kind === 'ok' ? CheckCircle2 : e.kind === 'warn' ? AlertTriangle : Info;
          return (
            <li key={i} className="flex items-start gap-3 py-2 first:pt-0 last:pb-0">
              <Icon
                className={cn(
                  'h-4 w-4 mt-0.5',
                  e.kind === 'ok' && 'text-brand',
                  e.kind === 'warn' && 'text-warning',
                  e.kind === 'info' && 'text-fg-muted',
                )}
              />
              <div className="flex-1 text-body-s">
                <p className="text-fg-primary">{e.event}</p>
                <p className="text-caption text-fg-muted">
                  {new Date(e.at).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
