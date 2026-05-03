'use client';

import { forwardRef } from 'react';
import * as RS from '@radix-ui/react-slider';

import { cn } from '../utils/cn';

/**
 * Per docs/frontend/10-components-primitives.md.
 * Single + dual-thumb (LPA range). Drag thumb scales 16 → 20 with brand ring shadow.
 */

export const Slider = forwardRef<HTMLSpanElement, RS.SliderProps>(
  ({ className, ...props }, ref) => {
    const value = props.value ?? props.defaultValue ?? [0];
    const thumbCount = Array.isArray(value) ? value.length : 1;

    return (
      <RS.Root
        ref={ref}
        className={cn('relative flex w-full touch-none select-none items-center', className)}
        {...props}
      >
        <RS.Track className="relative h-1 w-full grow overflow-hidden rounded-pill bg-bg-raised">
          <RS.Range className="absolute h-full bg-brand" />
        </RS.Track>
        {Array.from({ length: thumbCount }).map((_, i) => (
          <RS.Thumb
            key={i}
            className={cn(
              'block h-4 w-4 rounded-pill border-2 border-brand bg-bg-surface',
              'transition-transform duration-fast ease-standard',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
              'hover:scale-110 active:scale-110',
              'disabled:pointer-events-none disabled:opacity-50',
            )}
          />
        ))}
      </RS.Root>
    );
  },
);
Slider.displayName = 'Slider';
