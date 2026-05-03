'use client';

import { cn } from '@/lib/cn';

interface StepProgressProps {
  current: number;
  total?: number;
  onSkip?: () => void;
  className?: string;
}

export function StepProgress({ current, total = 6, onSkip, className }: StepProgressProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const idx = i + 1;
          const isActive = idx === current;
          const isDone = idx < current;
          return (
            <span
              key={idx}
              aria-current={isActive ? 'step' : undefined}
              aria-label={`Step ${idx} of ${total}`}
              className={cn(
                'h-1.5 rounded-pill transition-all',
                isActive && 'w-8 bg-accent',
                isDone && 'w-2 bg-brand',
                !isActive && !isDone && 'w-2 bg-bg-raised',
              )}
            />
          );
        })}
      </div>
      <div className="flex items-center gap-3 text-caption text-fg-muted">
        <span>
          Step {current} of {total}
        </span>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="font-medium text-fg-secondary hover:text-fg-primary"
          >
            Skip ›
          </button>
        )}
      </div>
    </div>
  );
}
