'use client';

import { forwardRef } from 'react';
import * as RD from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '../utils/cn';

/**
 * Right-edge sliding drawer.
 * Per docs/frontend/10-components-primitives.md: sm 400 / md 560 / lg 720.
 */

export type DrawerSize = 'sm' | 'md' | 'lg';

const sizeClasses: Record<DrawerSize, string> = {
  sm: 'sm:max-w-[400px]',
  md: 'sm:max-w-[560px]',
  lg: 'sm:max-w-[720px]',
};

export const RightDrawerRoot = RD.Root;
export const RightDrawerTrigger = RD.Trigger;
export const RightDrawerClose = RD.Close;

interface RightDrawerContentProps extends RD.DialogContentProps {
  size?: DrawerSize;
  showCloseButton?: boolean;
}

export const RightDrawerContent = forwardRef<HTMLDivElement, RightDrawerContentProps>(
  ({ className, children, size = 'md', showCloseButton = true, ...props }, ref) => (
    <RD.Portal>
      <RD.Overlay
        className={cn(
          'fixed inset-0 z-drawer bg-bg-overlay backdrop-blur-sm',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        )}
      />
      <RD.Content
        ref={ref}
        className={cn(
          'fixed right-0 top-0 z-drawer h-full w-full bg-bg-surface shadow-xl',
          'flex flex-col',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=open]:slide-in-from-right',
          'data-[state=closed]:slide-out-to-right',
          'duration-medium ease-enter',
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {showCloseButton && (
          <RD.Close
            className={cn(
              'absolute right-4 top-4 rounded-sm p-1 text-fg-muted opacity-70 transition-opacity',
              'hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring',
            )}
            aria-label="Close"
          >
            <X aria-hidden className="h-4 w-4" />
          </RD.Close>
        )}
        {children}
      </RD.Content>
    </RD.Portal>
  ),
);
RightDrawerContent.displayName = 'RightDrawerContent';

export function RightDrawerHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('sticky top-0 border-b border-border-subtle bg-bg-surface px-6 py-4', className)}
      {...props}
    />
  );
}

export function RightDrawerBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex-1 overflow-y-auto px-6 py-4', className)} {...props} />;
}

export function RightDrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'sticky bottom-0 flex items-center justify-end gap-2 border-t border-border-subtle bg-bg-surface px-6 py-4',
        className,
      )}
      {...props}
    />
  );
}

export const RightDrawerTitle = forwardRef<HTMLHeadingElement, RD.DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <RD.Title
      ref={ref}
      className={cn('font-display text-display-s font-semibold text-fg-primary', className)}
      {...props}
    />
  ),
);
RightDrawerTitle.displayName = 'RightDrawerTitle';

export const RightDrawer = Object.assign(RightDrawerRoot, {
  Trigger: RightDrawerTrigger,
  Close: RightDrawerClose,
  Content: RightDrawerContent,
  Header: RightDrawerHeader,
  Body: RightDrawerBody,
  Footer: RightDrawerFooter,
  Title: RightDrawerTitle,
});
