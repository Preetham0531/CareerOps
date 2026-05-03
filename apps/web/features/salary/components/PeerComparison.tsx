import { cn } from '@/lib/cn';

interface PeerComparisonProps {
  peers: Array<{ company: string; range: [number, number]; isFocal: boolean }>;
}

const LAKH = 100_000;

export function PeerComparison({ peers }: PeerComparisonProps) {
  const min = Math.min(...peers.map((p) => p.range[0]));
  const max = Math.max(...peers.map((p) => p.range[1]));
  const span = max - min || 1;

  return (
    <section
      aria-label="Peer companies"
      className="rounded-md border border-border-subtle bg-bg-surface p-5"
    >
      <h3 className="mb-3 text-caption font-semibold uppercase tracking-wide text-fg-muted">
        Peer comps
      </h3>
      <ul className="space-y-3">
        {peers.map((p) => {
          const left = ((p.range[0] - min) / span) * 100;
          const width = ((p.range[1] - p.range[0]) / span) * 100;
          return (
            <li key={p.company}>
              <div className="flex items-center justify-between text-body-s">
                <span
                  className={cn(
                    'font-medium',
                    p.isFocal ? 'text-fg-primary' : 'text-fg-secondary',
                  )}
                >
                  {p.company}
                  {p.isFocal && <span className="ml-2 text-caption text-accent">← focal</span>}
                </span>
                <span className="tabular text-fg-muted">
                  ₹{(p.range[0] / LAKH).toFixed(0)}–{(p.range[1] / LAKH).toFixed(0)}L
                </span>
              </div>
              <div className="mt-1 relative h-2 rounded-pill bg-bg-raised">
                <span
                  className={cn(
                    'absolute h-full rounded-pill',
                    p.isFocal ? 'bg-accent' : 'bg-brand',
                  )}
                  style={{ left: `${left}%`, width: `${width}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
