'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '../utils/cn';

/**
 * 24px circular countdown — used for 5-second undo toasts, send-scheduled
 * timers, OTP expiry. Per docs/frontend/11-components-composite.md.
 */

export interface CountdownRingProps {
  /** Total duration in seconds. */
  durationSec: number;
  /** Called when countdown reaches 0. */
  onComplete?: () => void;
  /** Initial trigger; pass a unique key to restart. */
  active?: boolean;
  size?: number;
  className?: string;
  ariaLabel?: string;
}

export function CountdownRing({
  durationSec,
  onComplete,
  active = true,
  size = 24,
  className,
  ariaLabel,
}: CountdownRingProps) {
  const [remaining, setRemaining] = useState(durationSec);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!active) {
      setRemaining(durationSec);
      return;
    }
    setRemaining(durationSec);
    const startedAt = performance.now();
    const total = durationSec * 1000;
    let frame = 0;
    const tick = () => {
      const elapsed = performance.now() - startedAt;
      const rem = Math.max(0, (total - elapsed) / 1000);
      setRemaining(rem);
      if (rem <= 0) {
        onCompleteRef.current?.();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durationSec, active]);

  const radius = size / 2 - 2;
  const circumference = 2 * Math.PI * radius;
  const progress = remaining / durationSec;
  const isUrgent = remaining <= 3;

  return (
    <span
      role="status"
      aria-label={ariaLabel ?? `${Math.ceil(remaining)} seconds remaining`}
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="text-bg-raised"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          className={cn(
            'transition-[stroke-dashoffset] duration-fast linear',
            isUrgent ? 'text-accent' : 'text-brand',
          )}
        />
      </svg>
      <span className="absolute text-[10px] font-medium tabular text-fg-primary">
        {Math.ceil(remaining)}
      </span>
    </span>
  );
}
