'use client';

import { forwardRef } from 'react';
import * as RD from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '../utils/cn';

/**
 * Per docs/frontend/10-components-primitives.md:
 *   - Sizes sm 480 / md 640 / lg 800
 *   - Scrim: bg-overlay (teal-950 @ 80%) + backdrop-blur 8px
 *   - Focus trapped, restored on close
 *   - Esc + click-outside dismiss (toggleable via dismissible prop)
 */

export type DialogSize = 'sm' | 'md' | 'lg';

const sizeClasses: Record<DialogSize, string> = {
  sm: 'sm:max-w-[480px]',
  md: 'sm:max-w-[640px]',
  lg: 'sm:max-w-[800px]',
};

export const DialogRoot = RD.Root;
export const DialogTrigger = RD.Trigger;
export const DialogClose = RD.Close;

export const DialogOverlay = forwardRef<HTMLDivElement, RD.DialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <RD.Overlay
      ref={ref}
      className={cn(
        'fixed inset-0 z-modal bg-bg-overlay backdrop-blur-md',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className,
      )}
      {...props}
    />
  ),
);
DialogOverlay.displayName = 'DialogOverlay';

interface DialogContentProps extends RD.DialogContentProps {
  size?: DialogSize;
  showCloseButton?: boolean;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, size = 'md', showCloseButton = true, ...props }, ref) => (
    <RD.Portal>
      <DialogOverlay />
      <RD.Content
        ref={ref}
        className={cn(
          'fixed left-[50%] top-[50%] z-modal grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%]',
          'gap-4 rounded-lg border border-border-subtle bg-bg-surface p-6 shadow-xl',
          'duration-medium ease-enter',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
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
      </RD.Content>
    </RD.Portal>
  ),
);
DialogContent.displayName = 'DialogContent';

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5', className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}

export const DialogTitle = forwardRef<HTMLHeadingElement, RD.DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <RD.Title
      ref={ref}
      className={cn('font-display text-display-s font-semibold text-fg-primary', className)}
      {...props}
    />
  ),
);
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = forwardRef<HTMLParagraphElement, RD.DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <RD.Description ref={ref} className={cn('text-body-m text-fg-secondary', className)} {...props} />
  ),
);
DialogDescription.displayName = 'DialogDescription';

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Close: DialogClose,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
});
