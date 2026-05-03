import { cn } from '@/lib/cn';

interface RateBarsProps {
  title: string;
  hint?: string;
  items: Array<{ label: string; applies: number; callbackRate: number }>;
}

export function RateBars({ title, hint, items }: RateBarsProps) {
  const max = Math.max(0.001, ...items.map((i) => i.callbackRate));
  return (
    <section className="rounded-md border border-border-subtle bg-bg-surface p-5">
      <header className="mb-3">
        <h2 className="text-h3 font-semibold text-fg-primary">{title}</h2>
        {hint && <p className="mt-1 text-caption text-fg-muted">{hint}</p>}
      </header>
      <ul className="space-y-3">
        {items.map((it) => {
          const pct = (it.callbackRate / max) * 100;
          return (
            <li key={it.label}>
              <div className="flex items-center justify-between text-body-s">
                <span className="font-medium text-fg-primary">{it.label}</span>
                <span className="font-mono tabular text-fg-secondary">
                  {(it.callbackRate * 100).toFixed(0)}%
                  <span className="ml-2 text-caption text-fg-muted">n={it.applies}</span>
                </span>
              </div>
              <div className="mt-1 h-2 rounded-pill bg-bg-raised">
                <span
                  className={cn('block h-full rounded-pill bg-brand transition-all duration-slow ease-emphasized')}
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
