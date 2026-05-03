import { Loader2 } from 'lucide-react';

import { cn } from '../utils/cn';

/**
 * Single source of truth for inline + block + page-level spinners.
 * Per docs/frontend/13-empty-error-loading.md.
 */

export type SpinnerSize = 'inline' | 'block' | 'page';

const sizeClasses: Record<SpinnerSize, string> = {
  inline: 'h-4 w-4',
  block: 'h-8 w-8',
  page: 'h-12 w-12',
};

export interface LoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}

export function LoadingSpinner({ size = 'inline', className, label }: LoadingSpinnerProps) {
  return (
    <span role="status" aria-label={label ?? 'Loading'} className={cn('inline-flex flex-col items-center gap-2', className)}>
      <Loader2
        aria-hidden
        className={cn('animate-spin text-brand', sizeClasses[size])}
      />
      {label && <span className="text-body-s text-fg-secondary">{label}</span>}
    </span>
  );
}
