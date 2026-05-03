import { forwardRef } from 'react';

import { cn } from '../utils/cn';

export interface LinearProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0–100
  max?: number;
  thickness?: 'slim' | 'default';
  variant?: 'brand' | 'accent';
  ariaLabel?: string;
}

export const LinearProgress = forwardRef<HTMLDivElement, LinearProgressProps>(
  (
    { value, max = 100, thickness = 'default', variant = 'brand', className, ariaLabel, ...props },
    ref,
  ) => {
    const pct = Math.max(0, Math.min(100, (value / max) * 100));
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel}
        className={cn(
          'w-full overflow-hidden rounded-pill bg-bg-raised',
          thickness === 'slim' ? 'h-1' : 'h-2',
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full rounded-pill transition-[width] duration-slow ease-emphasized',
            variant === 'brand' ? 'bg-brand' : 'bg-accent',
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    );
  },
);
LinearProgress.displayName = 'LinearProgress';
