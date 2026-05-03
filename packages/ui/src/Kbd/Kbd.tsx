import { forwardRef } from 'react';

import { cn } from '../utils/cn';

/** Inline keyboard shortcut display per docs/frontend/10-components-primitives.md. */
export const Kbd = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        'inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-xs border border-border-subtle bg-bg-raised',
        'px-1.5 font-mono text-[11px] font-medium text-fg-secondary',
        className,
      )}
      {...props}
    />
  ),
);
Kbd.displayName = 'Kbd';
