import { cn } from '@/lib/cn';
import type { SalaryObservation } from '@careerops/api-client';

const LAKH = 100_000;

const SOURCE_COLOR: Record<SalaryObservation['source'], string> = {
  'levels.fyi': 'fill-teal-500 stroke-teal-700',
  ambitionbox: 'fill-teal-300 stroke-teal-500',
  glassdoor: 'fill-teal-400 stroke-teal-600',
  reddit: 'fill-accent stroke-gold-500',
  'recruiter-other': 'fill-gold-300 stroke-gold-500',
  'past-employee': 'fill-gold-200 stroke-gold-500',
};

interface TriangulationBubbleProps {
  observations: SalaryObservation[];
  className?: string;
}

/**
 * Hand-rolled SVG bubble chart per docs/frontend/12-data-viz.md.
 * X = date (sorted), Y = base LPA, bubble size = weight.
 */
export function TriangulationBubble({ observations, className }: TriangulationBubbleProps) {
  if (!observations.length) return null;

  const W = 720;
  const H = 240;
  const PADX = 56;
  const PADY = 32;

  const dates = observations.map((o) => new Date(o.date).getTime());
  const minD = Math.min(...dates);
  const maxD = Math.max(...dates);
  const dSpan = Math.max(1, maxD - minD);

  const values = observations.map((o) => o.base);
  const minV = Math.min(...values) * 0.9;
  const maxV = Math.max(...values) * 1.1;

  const x = (t: number) => PADX + ((t - minD) / dSpan) * (W - PADX * 2);
  const y = (v: number) => H - PADY - ((v - minV) / (maxV - minV)) * (H - PADY * 2);
  const r = (w: number) => 4 + w * 12;

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }).map((_, i) => minV + ((maxV - minV) * i) / yTicks);

  return (
    <div className={cn('overflow-x-auto', className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Salary observations by date"
        className="w-full min-w-[640px]"
      >
        {/* Y axis grid + labels */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={PADX}
              x2={W - PADX}
              y1={y(t)}
              y2={y(t)}
              className="stroke-border-subtle"
              strokeDasharray="2 4"
            />
            <text
              x={PADX - 8}
              y={y(t) + 4}
              textAnchor="end"
              className="fill-fg-muted text-[10px] tabular"
            >
              ₹{(t / LAKH).toFixed(0)}L
            </text>
          </g>
        ))}

        {/* X axis label endpoints */}
        <text x={PADX} y={H - 8} className="fill-fg-muted text-[10px]">
          {new Date(minD).toISOString().slice(0, 7)}
        </text>
        <text x={W - PADX} y={H - 8} textAnchor="end" className="fill-fg-muted text-[10px]">
          {new Date(maxD).toISOString().slice(0, 7)}
        </text>

        {/* Bubbles */}
        {observations.map((o, i) => (
          <g key={i}>
            <circle
              cx={x(new Date(o.date).getTime())}
              cy={y(o.base)}
              r={r(o.weight)}
              className={cn('opacity-80', SOURCE_COLOR[o.source])}
              strokeWidth={1.5}
            >
              <title>
                {o.source}: ₹{(o.base / LAKH).toFixed(0)}L · {o.date}
                {o.notes ? ` · ${o.notes}` : ''}
              </title>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
