import { cn } from '@/lib/cn';

interface RangeBarProps {
  range: { p10: number; p50: number; p90: number };
  postedBand?: [number, number] | null;
  className?: string;
}

const LAKH = 100_000;
function lpa(v: number) {
  return `₹${(v / LAKH).toFixed(0)}L`;
}

/**
 * Triangulated salary range bar.
 * Per docs/frontend/12-data-viz.md — pure type/CSS, no chart lib.
 */
export function RangeBar({ range, postedBand, className }: RangeBarProps) {
  const min = Math.min(range.p10, postedBand?.[0] ?? range.p10) * 0.9;
  const max = Math.max(range.p90, postedBand?.[1] ?? range.p90) * 1.1;
  const span = max - min || 1;
  const pct = (v: number) => ((v - min) / span) * 100;

  return (
    <div className={cn('w-full', className)}>
      {/* Track */}
      <div className="relative h-10">
        {/* Posted band */}
        {postedBand && (
          <span
            aria-label={`Posted band ${lpa(postedBand[0])}–${lpa(postedBand[1])}`}
            className="absolute top-2 h-6 rounded-md border border-brand/40 bg-success-bg/40"
            style={{
              left: `${pct(postedBand[0])}%`,
              width: `${pct(postedBand[1]) - pct(postedBand[0])}%`,
            }}
          >
            <span className="absolute inset-x-0 -bottom-5 truncate text-center text-caption text-fg-muted">
              JD posted
            </span>
          </span>
        )}
        {/* P10–P90 fill */}
        <span
          aria-label={`Triangulated range ${lpa(range.p10)}–${lpa(range.p90)}`}
          className="absolute top-4 h-2 rounded-pill bg-brand"
          style={{
            left: `${pct(range.p10)}%`,
            width: `${pct(range.p90) - pct(range.p10)}%`,
          }}
        />
        {/* Median tick */}
        <span
          aria-label={`Median ${lpa(range.p50)}`}
          className="absolute top-3 h-4 w-0.5 bg-accent"
          style={{ left: `${pct(range.p50)}%` }}
        />
      </div>
      <div className="mt-8 flex justify-between text-caption text-fg-muted">
        <span className="tabular">{lpa(min)}</span>
        <span className="tabular">{lpa((min + max) / 2)}</span>
        <span className="tabular">{lpa(max)}</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3 text-center text-caption">
        <Stat label="P10" value={lpa(range.p10)} />
        <Stat label="Median" value={lpa(range.p50)} highlight />
        <Stat label="P90" value={lpa(range.p90)} />
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-md border border-border-subtle bg-bg-app py-2',
        highlight && 'border-accent/40 bg-warning-bg/40',
      )}
    >
      <p className="text-caption uppercase tracking-wide text-fg-muted">{label}</p>
      <p className="font-display font-semibold tabular text-fg-primary">{value}</p>
    </div>
  );
}
