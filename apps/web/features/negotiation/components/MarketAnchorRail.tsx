import { cn } from '@/lib/cn';

interface MarketAnchorRailProps {
  market: { p10: number; p50: number; p90: number; n: number };
  current: number;
  target: number;
}

const LAKH = 100_000;

export function MarketAnchorRail({ market, current, target }: MarketAnchorRailProps) {
  const min = Math.min(market.p10, current) * 0.9;
  const max = Math.max(market.p90, target) * 1.1;
  const span = max - min;
  const pct = (v: number) => ((v - min) / span) * 100;

  const aboveMedian = target > market.p50;

  return (
    <section
      aria-label="Market anchor"
      className="rounded-md border border-border-subtle bg-bg-surface p-5"
    >
      <h3 className="text-h3 font-semibold text-fg-primary">Market anchor</h3>
      <p className="mt-1 text-caption text-fg-muted">
        Levels.fyi · n={market.n}
      </p>

      <div className="relative mt-4 h-12">
        <span
          className="absolute top-4 h-2 rounded-pill bg-brand"
          style={{ left: `${pct(market.p10)}%`, width: `${pct(market.p90) - pct(market.p10)}%` }}
        />
        <span
          aria-label={`Median ₹${(market.p50 / LAKH).toFixed(0)}L`}
          className="absolute top-3 h-4 w-0.5 bg-accent"
          style={{ left: `${pct(market.p50)}%` }}
        />
        <span
          aria-label={`Current offer ₹${(current / LAKH).toFixed(0)}L`}
          title="Current offer"
          className="absolute top-2 h-6 w-1 rounded-pill bg-fg-primary"
          style={{ left: `${pct(current)}%` }}
        />
        <span
          aria-label={`Target ₹${(target / LAKH).toFixed(0)}L`}
          title="Target"
          className="absolute top-1 h-8 w-1 rounded-pill bg-brand"
          style={{ left: `${pct(target)}%` }}
        />
      </div>

      <ul className="mt-4 space-y-1 text-body-s">
        <Row label="P10" value={market.p10} />
        <Row label="Median" value={market.p50} highlight />
        <Row label="P90" value={market.p90} />
        <Row label="Current" value={current} muted />
        <Row label="Target" value={target} brand />
      </ul>

      <div
        className={cn(
          'mt-4 rounded-md border p-3 text-body-s',
          aboveMedian
            ? 'border-success/30 bg-success-bg text-brand'
            : 'border-warning/40 bg-warning-bg text-warning',
        )}
      >
        Target is {aboveMedian ? 'above' : 'at or below'} median by{' '}
        <span className="font-semibold tabular">
          ₹{Math.abs((target - market.p50) / LAKH).toFixed(1)}L
        </span>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  highlight,
  brand,
  muted,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  brand?: boolean;
  muted?: boolean;
}) {
  return (
    <li className="flex items-center justify-between">
      <span
        className={cn(
          'text-fg-secondary',
          highlight && 'text-accent font-medium',
          brand && 'text-brand font-medium',
          muted && 'text-fg-muted',
        )}
      >
        {label}
      </span>
      <span className="font-mono tabular text-fg-primary">
        ₹{(value / LAKH).toFixed(1)}L
      </span>
    </li>
  );
}
