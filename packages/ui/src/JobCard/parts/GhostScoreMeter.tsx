import { GhostListing } from '@careerops/icons';

import { cn } from '../../utils/cn';

export interface GhostScoreMeterProps {
  /** 0–1 */
  score: number;
  variant?: 'pill' | 'dial';
  className?: string;
}

/**
 * Visualizes ghost-job probability per docs/frontend/11-components-composite.md.
 * Hidden if score < 0.1 (caller should gate; we still render but very subtle).
 */
export function GhostScoreMeter({ score, variant = 'pill', className }: GhostScoreMeterProps) {
  const pct = Math.round(score * 100);

  // Severity color (palette-strict — never red)
  const severity =
    score < 0.3
      ? 'bg-bg-raised text-fg-secondary'
      : score < 0.6
        ? 'bg-warning-bg text-warning'
        : 'bg-danger-bg text-danger';

  if (variant === 'dial') {
    const radius = 32;
    const circ = 2 * Math.PI * radius;
    return (
      <div
        role="img"
        aria-label={`Ghost score ${pct}%`}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: 80, height: 80 }}
      >
        <svg width={80} height={80} viewBox="0 0 80 80" className="-rotate-90">
          <circle cx={40} cy={40} r={radius} fill="none" stroke="currentColor" strokeWidth={4} className="text-bg-raised" />
          <circle
            cx={40}
            cy={40}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={4}
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - score)}
            strokeLinecap="round"
            className={cn(score < 0.3 ? 'text-fg-secondary' : score < 0.6 ? 'text-warning' : 'text-danger')}
          />
        </svg>
        <span className="absolute font-semibold tabular text-fg-primary">{pct}%</span>
      </div>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-micro font-medium',
        severity,
        className,
      )}
      aria-label={`Ghost ${pct}%`}
    >
      <GhostListing size={10} />
      Ghost {pct}%
    </span>
  );
}
