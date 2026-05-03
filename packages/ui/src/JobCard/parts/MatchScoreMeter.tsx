import { cn } from '../../utils/cn';

export interface MatchScoreMeterProps {
  /** 0–1 */
  score: number;
  size?: 'sm' | 'md';
  className?: string;
}

/** Radial gauge for match-score. Color shifts: brand 0.8+, warning 0.5–0.8, danger <0.5. */
export function MatchScoreMeter({ score, size = 'sm', className }: MatchScoreMeterProps) {
  const dim = size === 'sm' ? 36 : 48;
  const radius = dim / 2 - 3;
  const circ = 2 * Math.PI * radius;
  const pct = Math.round(score * 100);
  const color =
    score >= 0.8 ? 'text-brand' : score >= 0.5 ? 'text-warning' : 'text-danger';

  return (
    <div
      role="img"
      aria-label={`Match ${pct}%`}
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: dim, height: dim }}
    >
      <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} className="-rotate-90">
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          className="text-bg-raised"
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - score)}
          className={cn('transition-[stroke-dashoffset] duration-slow ease-emphasized', color)}
        />
      </svg>
      <span className={cn('absolute font-semibold tabular', size === 'sm' ? 'text-caption' : 'text-body-s')}>
        {pct}
      </span>
    </div>
  );
}
