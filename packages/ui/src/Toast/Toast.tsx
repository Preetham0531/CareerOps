'use client';

import { Toaster as SonnerToaster, toast as sonnerToast, type ToasterProps } from 'sonner';

/**
 * Per docs/frontend/10-components-primitives.md: themed Sonner.
 *   - Position desktop top-right, mobile bottom-center
 *   - Variants info / success / warning / danger / loading / action
 *   - Danger uses gold-700 (palette compliance — never red)
 */

export interface CareerOpsToasterProps extends ToasterProps {}

export function Toaster(props: CareerOpsToasterProps) {
  return (
    <SonnerToaster
      position="top-right"
      mobileOffset={16}
      closeButton
      richColors={false}
      toastOptions={{
        classNames: {
          toast:
            'group flex items-start gap-3 rounded-md border border-border-subtle bg-bg-surface p-4 shadow-lg text-fg-primary',
          title: 'font-medium text-body-m text-fg-primary',
          description: 'text-body-s text-fg-secondary',
          actionButton:
            'rounded-sm bg-brand px-3 py-1 text-body-s font-medium text-fg-inverse hover:bg-brand-hover',
          cancelButton:
            'rounded-sm bg-bg-raised px-3 py-1 text-body-s font-medium text-fg-primary hover:bg-border-subtle',
          success: 'border-success/30',
          info: 'border-border-subtle',
          warning: 'border-warning/40',
          error: 'border-danger/40',
          loading: 'border-border-subtle',
          closeButton: 'text-fg-muted hover:text-fg-primary',
        },
      }}
      {...props}
    />
  );
}

export const toast = sonnerToast;
