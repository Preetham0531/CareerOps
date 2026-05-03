'use client';

import { forwardRef } from 'react';
import * as RT from '@radix-ui/react-tabs';

import { cn } from '../utils/cn';

/**
 * Per docs/frontend/10-components-primitives.md.
 *
 * Two visual styles:
 *   - underline (default): 2px brand underline under active
 *   - pill: filled bg-raised on active (used in dense rails)
 */

export type TabsVariant = 'underline' | 'pill';

export const TabsRoot = RT.Root;

interface TabsListProps extends RT.TabsListProps {
  variant?: TabsVariant;
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ variant = 'underline', className, ...props }, ref) => (
    <RT.List
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1',
        variant === 'underline' && 'border-b border-border-subtle',
        variant === 'pill' && 'rounded-md bg-bg-raised p-1 gap-0.5',
        className,
      )}
      {...props}
    />
  ),
);
TabsList.displayName = 'TabsList';

interface TabsTriggerProps extends RT.TabsTriggerProps {
  variant?: TabsVariant;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ variant = 'underline', className, children, ...props }, ref) => (
    <RT.Trigger
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap text-body-s font-medium',
        'transition-colors duration-fast ease-standard',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        variant === 'underline' && [
          'relative px-3 pb-2 -mb-px text-fg-secondary',
          'hover:text-fg-primary',
          'data-[state=active]:text-fg-primary data-[state=active]:font-semibold',
          'data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0',
          'data-[state=active]:after:bottom-0 data-[state=active]:after:h-0.5',
          'data-[state=active]:after:bg-brand data-[state=active]:after:rounded-pill',
        ],
        variant === 'pill' && [
          'rounded-sm px-3 py-1.5 text-fg-secondary',
          'data-[state=active]:bg-bg-surface data-[state=active]:text-fg-primary',
          'data-[state=active]:shadow-sm',
        ],
        className,
      )}
      {...props}
    >
      {children}
    </RT.Trigger>
  ),
);
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = forwardRef<HTMLDivElement, RT.TabsContentProps>(
  ({ className, ...props }, ref) => (
    <RT.Content
      ref={ref}
      className={cn(
        'mt-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
        className,
      )}
      {...props}
    />
  ),
);
TabsContent.displayName = 'TabsContent';

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
