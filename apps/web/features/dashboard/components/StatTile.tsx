'use client';

import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';

import { cn } from '@/lib/cn';
import { Sparkline } from './Sparkline';

interface StatTileProps {
  label: string;
  value: string | number;
  delta?: number;
  deltaSuffix?: string;
  sparkline?: number[];
  trend?: 'up' | 'down' | 'flat';
  caption?: string;
  className?: string;
}

export function StatTile({
  label,
  value,
  delta,
  deltaSuffix = 'pp',
  sparkline,
  trend,
  caption,
  className,
}: StatTileProps) {
  const positive = (delta ?? 0) > 0 || trend === 'up';
  const negative = (delta ?? 0) < 0 || trend === 'down';

  return (
    <article
      className={cn(
        'rounded-md border border-border-subtle bg-bg-surface p-5',
        'transition-colors hover:border-border-default',
        className,
      )}
    >
      <p className="text-caption font-semibold uppercase tracking-wide text-fg-muted">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <span className="font-display text-display-m font-bold tabular text-fg-primary">{value}</span>
        {sparkline && <Sparkline values={sparkline} className="shrink-0" />}
      </div>
      <div className="mt-2 flex items-center gap-2 text-body-s">
        {delta !== undefined && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 rounded-pill px-2 py-0.5 text-caption font-medium',
              positive && 'bg-success-bg text-brand',
              negative && 'bg-danger-bg text-danger',
              !positive && !negative && 'bg-bg-raised text-fg-secondary',
            )}
          >
            {positive ? (
              <ArrowUp className="h-3 w-3" />
            ) : negative ? (
              <ArrowDown className="h-3 w-3" />
            ) : (
              <ArrowRight className="h-3 w-3" />
            )}
            {delta > 0 ? '+' : ''}
            {delta}
            {deltaSuffix}
          </span>
        )}
        {caption && <span className="text-fg-muted">{caption}</span>}
      </div>
    </article>
  );
}

export function StatTileSkeleton() {
  return (
    <div className="h-[120px] animate-pulse rounded-md border border-border-subtle bg-bg-raised" />
  );
}
