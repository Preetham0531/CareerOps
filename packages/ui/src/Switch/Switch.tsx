'use client';

import { forwardRef } from 'react';
import * as RS from '@radix-ui/react-switch';

import { cn } from '../utils/cn';

/**
 * Per docs/frontend/10-components-primitives.md — 32×20, spring-flip.
 * Always pair with a label (left of switch) and optional helper text below.
 */

export const Switch = forwardRef<HTMLButtonElement, RS.SwitchProps>(
  ({ className, ...props }, ref) => (
    <RS.Root
      ref={ref}
      className={cn(
        'peer relative inline-flex h-5 w-8 shrink-0 cursor-pointer items-center rounded-pill border-2 border-transparent',
        'transition-colors duration-base ease-standard',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=unchecked]:bg-bg-raised data-[state=checked]:bg-brand',
        className,
      )}
      {...props}
    >
      <RS.Thumb
        className={cn(
          'pointer-events-none block h-4 w-4 rounded-pill bg-bg-surface shadow-md',
          'ring-0 transition-transform duration-base',
          'data-[state=unchecked]:translate-x-0.5 data-[state=checked]:translate-x-3.5',
        )}
      />
    </RS.Root>
  ),
);
Switch.displayName = 'Switch';
