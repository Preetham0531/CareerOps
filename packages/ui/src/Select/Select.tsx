'use client';

import { forwardRef } from 'react';
import * as RS from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '../utils/cn';

/**
 * Per docs/frontend/10-components-primitives.md.
 * Sizes match Button (sm/md/lg).
 */

export type SelectSize = 'sm' | 'md' | 'lg';

const sizeClasses: Record<SelectSize, string> = {
  sm: 'h-8 px-3 text-body-s',
  md: 'h-10 px-3 text-body-m',
  lg: 'h-12 px-4 text-body-m',
};

export const SelectRoot = RS.Root;
export const SelectGroup = RS.Group;
export const SelectValue = RS.Value;

interface SelectTriggerProps extends RS.SelectTriggerProps {
  size?: SelectSize;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ size = 'md', className, children, ...props }, ref) => (
    <RS.Trigger
      ref={ref}
      className={cn(
        'inline-flex w-full items-center justify-between gap-2 rounded-md border bg-bg-surface',
        'border-border-default text-fg-primary',
        'transition-colors duration-fast ease-standard',
        'hover:border-border-strong',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
        'data-[placeholder]:text-fg-muted',
        'disabled:cursor-not-allowed disabled:opacity-50',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
      <RS.Icon asChild>
        <ChevronDown aria-hidden className="h-4 w-4 opacity-60" />
      </RS.Icon>
    </RS.Trigger>
  ),
);
SelectTrigger.displayName = 'SelectTrigger';

export const SelectContent = forwardRef<HTMLDivElement, RS.SelectContentProps>(
  ({ className, children, position = 'popper', ...props }, ref) => (
    <RS.Portal>
      <RS.Content
        ref={ref}
        position={position}
        sideOffset={4}
        className={cn(
          'z-dropdown overflow-hidden rounded-md border border-border-subtle bg-bg-surface',
          'shadow-lg max-h-72',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
          className,
        )}
        {...props}
      >
        <RS.ScrollUpButton className="flex h-6 items-center justify-center">
          <ChevronUp aria-hidden className="h-4 w-4" />
        </RS.ScrollUpButton>
        <RS.Viewport className="p-1">{children}</RS.Viewport>
        <RS.ScrollDownButton className="flex h-6 items-center justify-center">
          <ChevronDown aria-hidden className="h-4 w-4" />
        </RS.ScrollDownButton>
      </RS.Content>
    </RS.Portal>
  ),
);
SelectContent.displayName = 'SelectContent';

export const SelectItem = forwardRef<HTMLDivElement, RS.SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <RS.Item
      ref={ref}
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2',
        'text-body-s text-fg-primary',
        'data-[highlighted]:bg-bg-raised data-[highlighted]:outline-none',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <RS.ItemIndicator>
          <Check aria-hidden className="h-3.5 w-3.5 text-brand" />
        </RS.ItemIndicator>
      </span>
      <RS.ItemText>{children}</RS.ItemText>
    </RS.Item>
  ),
);
SelectItem.displayName = 'SelectItem';

export const SelectLabel = forwardRef<HTMLDivElement, RS.SelectLabelProps>(
  ({ className, ...props }, ref) => (
    <RS.Label
      ref={ref}
      className={cn('px-2 py-1.5 text-caption font-semibold uppercase tracking-wide text-fg-muted', className)}
      {...props}
    />
  ),
);
SelectLabel.displayName = 'SelectLabel';

export const SelectSeparator = forwardRef<HTMLDivElement, RS.SelectSeparatorProps>(
  ({ className, ...props }, ref) => (
    <RS.Separator ref={ref} className={cn('my-1 h-px bg-border-subtle', className)} {...props} />
  ),
);
SelectSeparator.displayName = 'SelectSeparator';

export const Select = Object.assign(SelectRoot, {
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Label: SelectLabel,
  Separator: SelectSeparator,
});
