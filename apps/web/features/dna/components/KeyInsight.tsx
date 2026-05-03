import { Button } from '@careerops/ui';
import type { DnaInsight } from '@careerops/api-client';

import { cn } from '@/lib/cn';

export function KeyInsight({ insight }: { insight: DnaInsight | null }) {
  if (!insight) {
    return (
      <section className="rounded-md border border-dashed border-border-default bg-bg-surface p-6">
        <p className="text-caption font-semibold uppercase tracking-wide text-fg-muted">
          DNA insight
        </p>
        <p className="mt-2 text-body-m text-fg-secondary">
          We need more applications + outcomes to surface a confident insight.
        </p>
      </section>
    );
  }
  const dots = Math.round(insight.confidence * 5);
  return (
    <section
      aria-label="Key insight"
      className="rounded-md border-2 border-accent/40 bg-bg-surface p-6"
    >
      <p className="text-caption font-semibold uppercase tracking-wide text-fg-muted">
        DNA insight · {insight.category}
      </p>
      <p className="mt-3 font-display text-display-s leading-display text-fg-primary">
        “{insight.text}”
      </p>
      <div className="mt-4 flex items-center gap-4 text-caption text-fg-muted">
        <span className="inline-flex items-center gap-1">
          Confidence
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'block h-1.5 w-1.5 rounded-pill',
                  i < dots ? 'bg-brand' : 'bg-bg-raised',
                )}
              />
            ))}
          </span>
        </span>
        <span>· effect {insight.effectSize.toFixed(1)}×</span>
        <span>· n={insight.sampleSize}</span>
      </div>
      {insight.actionLabel && (
        <Button className="mt-4" size="sm">
          {insight.actionLabel}
        </Button>
      )}
    </section>
  );
}
