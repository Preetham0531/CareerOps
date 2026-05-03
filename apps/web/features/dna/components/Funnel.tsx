import { cn } from '@/lib/cn';

interface FunnelProps {
  stages: Array<{ stage: string; count: number; nextRate: number }>;
}

const COLORS = ['bg-teal-300', 'bg-teal-500', 'bg-teal-700', 'bg-accent'];

export function Funnel({ stages }: FunnelProps) {
  const max = Math.max(...stages.map((s) => s.count));
  return (
    <section
      aria-label="Application funnel"
      className="rounded-md border border-border-subtle bg-bg-surface p-5"
    >
      <h2 className="mb-3 text-h3 font-semibold text-fg-primary">Funnel</h2>
      <ul className="space-y-3">
        {stages.map((s, i) => {
          const pct = (s.count / max) * 100;
          return (
            <li key={s.stage}>
              <div className="flex items-center justify-between text-body-s">
                <span className="font-medium text-fg-primary">{s.stage}</span>
                <span className="font-mono tabular text-fg-secondary">
                  {s.count}
                  {i < stages.length - 1 && (
                    <span className="ml-2 text-caption text-fg-muted">
                      → {(s.nextRate * 100).toFixed(0)}%
                    </span>
                  )}
                </span>
              </div>
              <div className="mt-1 h-2 rounded-pill bg-bg-raised">
                <span
                  className={cn('block h-full rounded-pill', COLORS[i] ?? COLORS[0])}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
