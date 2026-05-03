import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

import { cn } from '../utils/cn';

/**
 * Per docs/frontend/10-components-primitives.md.
 *
 * Variants:
 *   primary   — filled brand, white text (the most-rendered)
 *   secondary — subtle bg, primary text
 *   ghost     — transparent, hover bg
 *   accent    — filled gold; reserved for "earned" moments only
 *               (white-on-gold fails AA — always teal-950 text)
 *   danger    — outline gold-700, never red (palette compliance)
 *   link      — inline anchor styling
 */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'accent'
  | 'danger'
  | 'link';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'h-6 px-2 text-body-s font-medium gap-1',
  sm: 'h-8 px-3 text-body-s font-medium gap-1.5',
  md: 'h-10 px-4 text-body-m font-medium gap-2',
  lg: 'h-12 px-5 text-body-m font-semibold gap-2',
  xl: 'h-14 px-6 text-body-l font-semibold gap-2',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-fg-inverse hover:bg-brand-hover active:bg-brand-pressed disabled:bg-brand/50',
  secondary:
    'bg-bg-raised text-fg-primary border border-border-subtle hover:bg-border-subtle active:bg-border-default',
  ghost:
    'text-fg-primary hover:bg-bg-raised active:bg-border-subtle',
  // accent is the only variant that uses dark text on a light fill —
  // white-on-gold fails AA (see 02-color-system.md contrast proofs).
  accent:
    'bg-accent text-neutral-950 hover:bg-accent-hover active:bg-accent disabled:bg-accent/50',
  danger:
    'border border-danger text-danger bg-transparent hover:bg-danger-bg active:bg-danger-bg',
  link:
    'text-brand underline-offset-4 hover:underline px-0 h-auto',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leadingIcon,
      trailingIcon,
      className,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          // base
          'inline-flex items-center justify-center rounded-md transition-all duration-fast ease-standard',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          // press feedback
          'active:scale-[0.97]',
          variant !== 'link' && sizeClasses[size],
          variantClasses[variant],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {loading ? (
          <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
        ) : (
          leadingIcon && <span aria-hidden>{leadingIcon}</span>
        )}
        {children}
        {!loading && trailingIcon && <span aria-hidden>{trailingIcon}</span>}
      </button>
    );
  },
);
Button.displayName = 'Button';

/** Square icon-only button. Always pair with `aria-label`. */
export const IconButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'leadingIcon' | 'trailingIcon' | 'fullWidth' | 'children'> & {
    'aria-label': string;
    children: React.ReactNode;
  }
>(({ size = 'md', variant = 'ghost', className, children, ...props }, ref) => {
  const dim = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-14 w-14',
  }[size];

  return (
    <Button
      ref={ref}
      size={size}
      variant={variant}
      className={cn('px-0', dim, className)}
      {...props}
    >
      {children}
    </Button>
  );
});
IconButton.displayName = 'IconButton';
