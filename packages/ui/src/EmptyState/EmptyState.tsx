import { forwardRef } from 'react';

import { cn } from '../utils/cn';

/**
 * Per docs/frontend/13-empty-error-loading.md and 11-components-composite.md.
 * Always: illustration → headline → description → primary action.
 */

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  illustration?: React.ReactNode;
  headline: React.ReactNode;
  description?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ illustration, headline, description, primaryAction, secondaryAction, className, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-md border border-border-subtle bg-bg-surface p-12 text-center',
        className,
      )}
      {...props}
    >
      {illustration && (
        <span aria-hidden className="text-fg-muted [&>svg]:h-24 [&>svg]:w-24">
          {illustration}
        </span>
      )}
      <h3 className="font-display text-display-s font-semibold text-fg-primary">{headline}</h3>
      {description && (
        <p className="max-w-md text-body-m leading-body text-fg-secondary">{description}</p>
      )}
      {(primaryAction || secondaryAction) && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {primaryAction}
          {secondaryAction}
        </div>
      )}
    </div>
  ),
);
EmptyState.displayName = 'EmptyState';
