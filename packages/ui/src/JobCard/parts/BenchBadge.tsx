import { BenchClock } from '@careerops/icons';

import { cn } from '../../utils/cn';
import type { BenchFlag } from '../types';

export interface BenchBadgeProps {
  flag: BenchFlag;
  className?: string;
}

export function BenchBadge({ flag, className }: BenchBadgeProps) {
  const severity =
    flag.severity === 'high'
      ? 'border-danger text-danger bg-danger-bg'
      : flag.severity === 'medium'
        ? 'border-warning text-warning bg-warning-bg'
        : 'border-warning/40 text-warning bg-bg-raised';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-pill border px-2 py-0.5 text-micro font-medium',
        severity,
        className,
      )}
      title={flag.reason}
    >
      <BenchClock size={10} />
      Bench risk
    </span>
  );
}
