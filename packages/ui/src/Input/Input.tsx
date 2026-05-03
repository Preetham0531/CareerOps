import { forwardRef, useId, useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

import { cn } from '../utils/cn';

/**
 * Per docs/frontend/10-components-primitives.md.
 *
 * Validation runs on blur (less noisy than per-keystroke).
 * Server-side errors render below the input + animate in 200ms.
 */

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helper?: string;
  error?: string;
  size?: InputSize;
  leadingIcon?: React.ReactNode;
  trailingChip?: React.ReactNode;
  showClearButton?: boolean;
  onClear?: () => void;
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'h-8 text-body-s',
  md: 'h-10 text-body-m',
  lg: 'h-12 text-body-m',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helper,
      error,
      size = 'md',
      leadingIcon,
      trailingChip,
      showClearButton = false,
      onClear,
      type = 'text',
      className,
      id: idProp,
      disabled,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const inputId = idProp ?? id;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const [revealed, setRevealed] = useState(false);

    const isPassword = type === 'password';
    const effectiveType = isPassword && revealed ? 'text' : type;

    const hasValue = value !== undefined && value !== '';
    const hasError = Boolean(error);

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-body-s font-medium text-fg-primary"
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            'group flex items-center gap-2 rounded-md border bg-bg-surface px-3 transition-colors duration-fast ease-standard',
            'border-border-default focus-within:border-border-strong',
            'focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus-ring',
            hasError && 'border-danger focus-within:border-danger',
            disabled && 'opacity-50 cursor-not-allowed',
            sizeClasses[size],
          )}
        >
          {leadingIcon && (
            <span aria-hidden className="text-fg-muted shrink-0">
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={effectiveType}
            value={value}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? errorId : helper ? helperId : undefined}
            className={cn(
              'min-w-0 flex-1 bg-transparent outline-none placeholder:text-fg-muted text-fg-primary',
              'disabled:cursor-not-allowed',
            )}
            {...props}
          />
          {showClearButton && hasValue && !disabled && (
            <button
              type="button"
              aria-label="Clear input"
              onClick={onClear}
              className="text-fg-muted transition-colors hover:text-fg-primary"
            >
              <X aria-hidden className="h-4 w-4" />
            </button>
          )}
          {isPassword && !disabled && (
            <button
              type="button"
              aria-label={revealed ? 'Hide password' : 'Show password'}
              onClick={() => setRevealed((r) => !r)}
              className="text-fg-muted transition-colors hover:text-fg-primary"
            >
              {revealed ? (
                <EyeOff aria-hidden className="h-4 w-4" />
              ) : (
                <Eye aria-hidden className="h-4 w-4" />
              )}
            </button>
          )}
          {trailingChip && (
            <span className="text-caption font-medium text-fg-secondary shrink-0">
              {trailingChip}
            </span>
          )}
        </div>
        {hasError ? (
          <p id={errorId} className="text-body-s text-danger">
            {error}
          </p>
        ) : helper ? (
          <p id={helperId} className="text-body-s text-fg-secondary">
            {helper}
          </p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = 'Input';
