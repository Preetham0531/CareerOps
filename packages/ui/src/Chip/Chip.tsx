import { forwardRef } from 'react';
import { X } from 'lucide-react';

import { cn } from '../utils/cn';
import type { BadgeSize, BadgeVariant } from '../Badge/Badge';

/**
 * Interactive variant of Badge — selectable or removable.
 * Used for filter values, tag inputs, multi-select selections.
 */

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  selected?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'h-5 px-1.5 text-micro gap-0.5',
  md: 'h-6 px-2 text-caption gap-1',
  lg: 'h-7 px-2.5 text-body-s gap-1',
};

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-bg-raised text-fg-secondary hover:bg-border-subtle',
  brand: 'bg-success-bg text-brand hover:bg-success-bg/80',
  accent: 'bg-warning-bg text-accent hover:bg-warning-bg/80',
  warning: 'bg-warning-bg text-warning hover:bg-warning-bg/80',
  danger: 'bg-danger-bg text-danger hover:bg-danger-bg/80',
  outline: 'border border-current bg-transparent text-fg-secondary hover:bg-bg-raised',
};

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    { variant = 'neutral', size = 'md', selected, onRemove, removeLabel = 'Remove', className, children, ...props },
    ref,
  ) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-pill font-medium transition-colors',
        sizeClasses[size],
        variantClasses[variant],
        selected && 'ring-1 ring-brand',
        className,
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 rounded-pill p-0.5 hover:bg-fg-primary/10"
        >
          <X aria-hidden className="h-3 w-3" />
        </button>
      )}
    </span>
  ),
);
Chip.displayName = 'Chip';
