'use client';

import { forwardRef, Children, isValidElement, cloneElement } from 'react';
import * as RA from '@radix-ui/react-avatar';

import { cn } from '../utils/cn';

/**
 * Per docs/frontend/10-components-primitives.md.
 * Sizes xs 20 / sm 24 / md 32 / lg 48 / xl 64.
 */

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-5 w-5 text-[10px]',
  sm: 'h-6 w-6 text-[10px]',
  md: 'h-8 w-8 text-caption',
  lg: 'h-12 w-12 text-body-s',
  xl: 'h-16 w-16 text-body-m',
};

export interface AvatarProps extends RA.AvatarProps {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  fallback?: string;
  status?: 'online' | 'offline';
  ringColor?: 'brand' | 'accent' | 'none';
}

function initialsFor(name: string | undefined): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size = 'md', src, alt, fallback, status, ringColor = 'none', ...props }, ref) => (
    <span
      className={cn(
        'relative inline-flex shrink-0',
        ringColor === 'brand' && 'ring-2 ring-brand ring-offset-2 ring-offset-bg-app',
        ringColor === 'accent' && 'ring-2 ring-accent ring-offset-2 ring-offset-bg-app',
        sizeClasses[size],
      )}
    >
      <RA.Root
        ref={ref}
        className={cn(
          'inline-flex aspect-square h-full w-full items-center justify-center overflow-hidden rounded-pill bg-bg-raised',
          className,
        )}
        {...props}
      >
        {src && <RA.Image src={src} alt={alt ?? fallback ?? 'avatar'} className="h-full w-full object-cover" />}
        <RA.Fallback className="flex h-full w-full items-center justify-center font-medium text-fg-primary">
          {initialsFor(fallback ?? alt)}
        </RA.Fallback>
      </RA.Root>
      {status && (
        <span
          aria-hidden
          className={cn(
            'absolute bottom-0 right-0 block h-1/3 w-1/3 rounded-pill border-2 border-bg-app',
            status === 'online' ? 'bg-success' : 'bg-fg-muted',
          )}
        />
      )}
    </span>
  ),
);
Avatar.displayName = 'Avatar';

export interface AvatarStackProps {
  max?: number;
  size?: AvatarSize;
  children: React.ReactNode;
  className?: string;
}

/** Overlapping avatars; collapses overflow into a "+N" chip. */
export function AvatarStack({ max = 5, size = 'sm', children, className }: AvatarStackProps) {
  const items = Children.toArray(children).filter(isValidElement);
  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;

  return (
    <div className={cn('flex items-center', className)}>
      {visible.map((child, i) =>
        cloneElement(child as React.ReactElement<AvatarProps>, {
          key: i,
          size,
          className: cn(
            (child as React.ReactElement<AvatarProps>).props.className,
            'ring-2 ring-bg-app',
            i > 0 && '-ml-2',
          ),
        }),
      )}
      {overflow > 0 && (
        <span
          aria-label={`+${overflow} more`}
          className={cn(
            'inline-flex items-center justify-center rounded-pill bg-bg-raised text-fg-secondary',
            '-ml-2 ring-2 ring-bg-app font-medium',
            sizeClasses[size],
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
