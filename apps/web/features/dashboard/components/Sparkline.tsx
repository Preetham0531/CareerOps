import { cn } from '@/lib/cn';

/**
 * Hand-rolled sparkline. < 5 KB, fully palette-strict.
 * Per docs/frontend/12-data-viz.md: 80×24, 1px stroke, end-point dot, no axes.
 */

export interface SparklineProps {
  values: number[];
  width?: number;
  height?: number;
  className?: string;
  color?: 'brand' | 'accent';
  ariaLabel?: string;
}

export function Sparkline({
  values,
  width = 80,
  height = 24,
  className,
  color = 'brand',
  ariaLabel,
}: SparklineProps) {
  if (values.length < 2) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);

  const points = values
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const lastIdx = values.length - 1;
  const lastV = values[lastIdx]!;
  const endX = lastIdx * stepX;
  const endY = height - ((lastV - min) / range) * height;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={ariaLabel ?? 'Trend sparkline'}
      className={cn(color === 'brand' ? 'text-brand' : 'text-accent', className)}
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={endX} cy={endY} r={2} fill="currentColor" />
    </svg>
  );
}
