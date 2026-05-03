'use client';

import { forwardRef } from 'react';
import * as RS from '@radix-ui/react-separator';

import { cn } from '../utils/cn';

export interface DividerProps extends RS.SeparatorProps {
  /** Optional inline label rendered centred over a horizontal divider. */
  label?: React.ReactNode;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = 'horizontal', label, className, ...props }, ref) => {
    if (label && orientation === 'horizontal') {
      return (
        <div className={cn('flex items-center gap-3', className)}>
          <span className="h-px flex-1 bg-border-subtle" />
          <span className="text-caption font-medium uppercase tracking-wide text-fg-muted">
            {label}
          </span>
          <span className="h-px flex-1 bg-border-subtle" />
        </div>
      );
    }
    return (
      <RS.Root
        ref={ref}
        orientation={orientation}
        decorative
        className={cn(
          'shrink-0 bg-border-subtle',
          orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
          className,
        )}
        {...props}
      />
    );
  },
);
Divider.displayName = 'Divider';
