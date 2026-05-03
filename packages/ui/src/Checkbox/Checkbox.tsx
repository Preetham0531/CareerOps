'use client';

import { forwardRef } from 'react';
import * as RC from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';

import { cn } from '../utils/cn';

/**
 * Per docs/frontend/10-components-primitives.md.
 * 16×16, 2px border-default. Checked: brand bg + white check (path-draw 200ms).
 * Indeterminate: horizontal bar.
 */

export const Checkbox = forwardRef<HTMLButtonElement, RC.CheckboxProps>(
  ({ className, ...props }, ref) => (
    <RC.Root
      ref={ref}
      className={cn(
        'peer inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border-2 border-border-default bg-bg-surface',
        'transition-colors duration-fast ease-standard',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
        'data-[state=checked]:border-brand data-[state=checked]:bg-brand',
        'data-[state=indeterminate]:border-brand data-[state=indeterminate]:bg-brand',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RC.Indicator className="flex items-center justify-center text-fg-inverse">
        {props.checked === 'indeterminate' ? (
          <Minus aria-hidden className="h-3 w-3" strokeWidth={3} />
        ) : (
          <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
        )}
      </RC.Indicator>
    </RC.Root>
  ),
);
Checkbox.displayName = 'Checkbox';
