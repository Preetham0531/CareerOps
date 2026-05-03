import { BondLink } from '@careerops/icons';

import { cn } from '../../utils/cn';
import type { BondFlag } from '../types';

export interface BondBadgeProps {
  flag: BondFlag;
  className?: string;
}

export function BondBadge({ flag, className }: BondBadgeProps) {
  const label = flag.durationYears ? `Bond ${flag.durationYears}y` : 'Bond';
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
      <BondLink size={10} />
      {label}
    </span>
  );
}
