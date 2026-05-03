'use client';

import { forwardRef } from 'react';
import { Command as CmdkPrimitive } from 'cmdk';
import { Search } from 'lucide-react';

import { cn } from '../utils/cn';

/**
 * Combobox primitives built on cmdk. Provides:
 *   - Fuzzy-match search
 *   - Keyboard nav (↑↓ Enter Esc)
 *   - Recent + grouped sections
 *
 * Used downstream as the city / company / role pickers and the global ⌘K palette.
 * Per docs/frontend/10-components-primitives.md.
 */

export const Command = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CmdkPrimitive>
>(({ className, ...props }, ref) => (
  <CmdkPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md border border-border-subtle bg-bg-surface text-fg-primary',
      className,
    )}
    {...props}
  />
));
Command.displayName = 'Command';

export const CommandInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof CmdkPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-2 border-b border-border-subtle px-3" cmdk-input-wrapper="">
    <Search aria-hidden className="h-4 w-4 shrink-0 text-fg-muted" />
    <CmdkPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-10 w-full bg-transparent text-body-m text-fg-primary outline-none',
        'placeholder:text-fg-muted disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = 'CommandInput';

export const CommandList = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CmdkPrimitive.List>
>(({ className, ...props }, ref) => (
  <CmdkPrimitive.List
    ref={ref}
    className={cn('max-h-[320px] overflow-y-auto overflow-x-hidden p-1', className)}
    {...props}
  />
));
CommandList.displayName = 'CommandList';

export const CommandEmpty = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CmdkPrimitive.Empty>
>((props, ref) => (
  <CmdkPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-body-s text-fg-secondary"
    {...props}
  />
));
CommandEmpty.displayName = 'CommandEmpty';

export const CommandGroup = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CmdkPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CmdkPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-fg-primary',
      '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5',
      '[&_[cmdk-group-heading]]:text-caption [&_[cmdk-group-heading]]:font-semibold',
      '[&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide',
      '[&_[cmdk-group-heading]]:text-fg-muted',
      className,
    )}
    {...props}
  />
));
CommandGroup.displayName = 'CommandGroup';

export const CommandItem = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CmdkPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CmdkPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5',
      'text-body-s text-fg-primary outline-none',
      'data-[selected=true]:bg-bg-raised',
      'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
      className,
    )}
    {...props}
  />
));
CommandItem.displayName = 'CommandItem';

export const CommandSeparator = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CmdkPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CmdkPrimitive.Separator ref={ref} className={cn('my-1 h-px bg-border-subtle', className)} {...props} />
));
CommandSeparator.displayName = 'CommandSeparator';

export const Combobox = Object.assign(Command, {
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Separator: CommandSeparator,
});
