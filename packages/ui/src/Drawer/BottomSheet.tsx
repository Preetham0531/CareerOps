'use client';

import { forwardRef } from 'react';
import { Drawer as VaulRoot } from 'vaul';

import { cn } from '../utils/cn';

/**
 * Mobile bottom sheet — vaul-based.
 * Snap points [0.4, 0.8, 1.0] per docs/frontend/10-components-primitives.md.
 */

export const BottomSheetRoot = VaulRoot.Root;
export const BottomSheetTrigger = VaulRoot.Trigger;
export const BottomSheetClose = VaulRoot.Close;
export const BottomSheetPortal = VaulRoot.Portal;

export const BottomSheetOverlay = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof VaulRoot.Overlay>
>(({ className, ...props }, ref) => (
  <VaulRoot.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-drawer bg-bg-overlay backdrop-blur-sm', className)}
    {...props}
  />
));
BottomSheetOverlay.displayName = 'BottomSheetOverlay';

export const BottomSheetContent = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof VaulRoot.Content>
>(({ className, children, ...props }, ref) => (
  <BottomSheetPortal>
    <BottomSheetOverlay />
    <VaulRoot.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-drawer flex h-auto max-h-[96vh] flex-col rounded-t-lg',
        'border-t border-border-subtle bg-bg-surface',
        className,
      )}
      {...props}
    >
      {/* Drag handle */}
      <div className="mx-auto mt-3 h-1 w-12 rounded-pill bg-border-default" aria-hidden />
      {children}
    </VaulRoot.Content>
  </BottomSheetPortal>
));
BottomSheetContent.displayName = 'BottomSheetContent';

export const BottomSheetTitle = forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<typeof VaulRoot.Title>
>(({ className, ...props }, ref) => (
  <VaulRoot.Title
    ref={ref}
    className={cn('font-display text-display-s font-semibold text-fg-primary', className)}
    {...props}
  />
));
BottomSheetTitle.displayName = 'BottomSheetTitle';

export const BottomSheetDescription = forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<typeof VaulRoot.Description>
>(({ className, ...props }, ref) => (
  <VaulRoot.Description
    ref={ref}
    className={cn('text-body-m text-fg-secondary', className)}
    {...props}
  />
));
BottomSheetDescription.displayName = 'BottomSheetDescription';

export const BottomSheet = Object.assign(BottomSheetRoot, {
  Trigger: BottomSheetTrigger,
  Close: BottomSheetClose,
  Content: BottomSheetContent,
  Title: BottomSheetTitle,
  Description: BottomSheetDescription,
});
