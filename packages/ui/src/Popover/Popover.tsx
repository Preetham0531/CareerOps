'use client';

import { forwardRef } from 'react';
import * as RP from '@radix-ui/react-popover';

import { cn } from '../utils/cn';

/**
 * Per docs/frontend/10-components-primitives.md: click-triggered (not hover),
 * max-w 360, scale-in 200ms.
 */

export const PopoverRoot = RP.Root;
export const PopoverTrigger = RP.Trigger;
export const PopoverAnchor = RP.Anchor;

export const PopoverContent = forwardRef<HTMLDivElement, RP.PopoverContentProps>(
  ({ className, align = 'center', sideOffset = 8, ...props }, ref) => (
    <RP.Portal>
      <RP.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={8}
        className={cn(
          'z-dropdown max-w-[360px] rounded-md border border-border-subtle bg-bg-surface p-4 shadow-lg',
          'text-body-s text-fg-primary',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
          'origin-[--radix-popover-content-transform-origin]',
          className,
        )}
        {...props}
      />
    </RP.Portal>
  ),
);
PopoverContent.displayName = 'PopoverContent';

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Anchor: PopoverAnchor,
  Content: PopoverContent,
});
