'use client';

import { forwardRef } from 'react';
import * as RT from '@radix-ui/react-tooltip';

import { cn } from '../utils/cn';

/**
 * Per docs/frontend/10-components-primitives.md — 500ms in, 0ms out,
 * collision-aware positioning, max-w 240, scale + opacity in over 120ms.
 */

export const TooltipProvider = RT.Provider;
export const Tooltip = RT.Root;
export const TooltipTrigger = RT.Trigger;

interface TooltipContentProps extends RT.TooltipContentProps {
  arrow?: boolean;
}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ children, arrow = true, sideOffset = 6, className, ...props }, ref) => (
    <RT.Portal>
      <RT.Content
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={8}
        className={cn(
          'z-tooltip max-w-60 rounded-md border border-border-subtle bg-bg-surface px-3 py-1.5',
          'text-body-s text-fg-primary shadow-lg',
          'data-[state=delayed-open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0',
          'data-[state=delayed-open]:zoom-in-95 data-[state=closed]:zoom-out-95',
          'origin-[--radix-tooltip-content-transform-origin]',
          className,
        )}
        {...props}
      >
        {children}
        {arrow && <RT.Arrow className="fill-bg-surface" width={12} height={6} />}
      </RT.Content>
    </RT.Portal>
  ),
);
TooltipContent.displayName = 'TooltipContent';

/** Convenience wrapper for the common case: trigger + label. */
export interface SimpleTooltipProps {
  label: React.ReactNode;
  children: React.ReactElement;
  side?: RT.TooltipContentProps['side'];
  delayMs?: number;
}

export function SimpleTooltip({
  label,
  children,
  side = 'top',
  delayMs = 500,
}: SimpleTooltipProps) {
  return (
    <TooltipProvider delayDuration={delayMs} skipDelayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
