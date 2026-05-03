import { forwardRef } from 'react';

import { cn } from '../utils/cn';

/**
 * Diagonal-shimmer placeholder. Per docs/frontend/13-empty-error-loading.md.
 * Uses the .skeleton-shimmer utility from globals.css; pauses on reduced-motion.
 */

export const Skeleton = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-md bg-bg-raised skeleton-shimmer', className)}
      aria-hidden
      {...props}
    />
  ),
);
Skeleton.displayName = 'Skeleton';
