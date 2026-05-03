'use client';

import { forwardRef } from 'react';
import * as RR from '@radix-ui/react-radio-group';

import { cn } from '../utils/cn';

export const RadioGroup = forwardRef<HTMLDivElement, RR.RadioGroupProps>(
  ({ className, ...props }, ref) => (
    <RR.Root ref={ref} className={cn('grid gap-2', className)} {...props} />
  ),
);
RadioGroup.displayName = 'RadioGroup';

export const RadioGroupItem = forwardRef<HTMLButtonElement, RR.RadioGroupItemProps>(
  ({ className, ...props }, ref) => (
    <RR.Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-pill border-2 border-border-default bg-bg-surface',
        'transition-colors duration-fast ease-standard',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
        'data-[state=checked]:border-brand',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RR.Indicator className="flex h-full w-full items-center justify-center">
        <span className="block h-2 w-2 rounded-pill bg-brand" />
      </RR.Indicator>
    </RR.Item>
  ),
);
RadioGroupItem.displayName = 'RadioGroupItem';

export const Radio = Object.assign(RadioGroup, { Item: RadioGroupItem });
