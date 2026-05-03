import { forwardRef } from 'react';

import { cn } from '../utils/cn';

/**
 * Read-only label. Sizes sm/md/lg.
 * Per docs/frontend/10-components-primitives.md — palette-strict, no rogue colors.
 */

export type BadgeVariant =
  | 'neutral'
  | 'brand'
  | 'accent'
  | 'warning'
  | 'danger'
  | 'outline';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'h-4 px-1.5 text-micro',
  md: 'h-5 px-2 text-caption',
  lg: 'h-6 px-2.5 text-body-s',
};

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-bg-raised text-fg-secondary',
  brand: 'bg-success-bg text-brand',
  accent: 'bg-warning-bg text-accent',
  warning: 'bg-warning-bg text-warning',
  danger: 'bg-danger-bg text-danger',
  outline: 'border border-current bg-transparent text-fg-secondary',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', size = 'md', className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded-pill font-medium',
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  ),
);
Badge.displayName = 'Badge';
