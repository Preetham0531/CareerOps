'use client';

import { forwardRef } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

import { cn } from '../utils/cn';
import { CompanyLogo } from './parts/CompanyLogo';
import { LocationBadge } from './parts/LocationBadge';
import { MoneyRange } from './parts/MoneyRange';
import { GhostScoreMeter } from './parts/GhostScoreMeter';
import { BondBadge } from './parts/BondBadge';
import { BenchBadge } from './parts/BenchBadge';
import { MatchScoreMeter } from './parts/MatchScoreMeter';
import { ChipRow } from './parts/ChipRow';
import { ReferrerPreview } from './parts/ReferrerPreview';

import type { JobCardDensity, JobData } from './types';

/**
 * JobCard — the most-rendered component in the product.
 *
 * Per docs/frontend/11-components-composite.md:
 *   - Three densities (compact / default / expanded)
 *   - Container queries auto-collapse with width
 *   - Hover lift 2px + soft shadow
 *   - Click anywhere except actions opens detail (callback)
 *   - Bookmark fills with gold on save (200ms)
 */

export interface JobCardProps {
  job: JobData;
  density?: JobCardDensity;
  onSelect?: (job: JobData) => void;
  onSaveToggle?: (job: JobData) => void;
  onTailorCV?: (job: JobData) => void;
  onApply?: (job: JobData) => void;
  onViewReferrers?: (job: JobData) => void;
  className?: string;
}

function relativePosted(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const days = Math.floor((now - then) / 86_400_000);
  if (days < 1) return 'today';
  if (days === 1) return '1d ago';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export const JobCard = forwardRef<HTMLElement, JobCardProps>(
  (
    {
      job,
      density = 'default',
      onSelect,
      onSaveToggle,
      onTailorCV,
      onApply,
      onViewReferrers,
      className,
    },
    ref,
  ) => {
    const showGhost = job.ghostScore >= 0.1;
    const compact = density === 'compact';
    const expanded = density === 'expanded';

    return (
      <article
        ref={ref}
        className={cn(
          // base
          'group relative rounded-md border border-border-subtle bg-bg-surface',
          'transition-all duration-base ease-standard',
          // hover lift (per 06-motion-system.md)
          'hover:-translate-y-0.5 hover:shadow-card-hover hover:border-border-default',
          // container query for density
          '@container',
          compact ? 'p-3' : expanded ? 'p-6' : 'p-5',
          className,
        )}
        // Container query support via inline style
        style={{ containerType: 'inline-size' }}
        aria-labelledby={`job-${job.id}-title`}
      >
        <button
          type="button"
          onClick={() => onSelect?.(job)}
          className="absolute inset-0 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          aria-label={`Open ${job.title} at ${job.company}`}
          tabIndex={0}
        />

        <div className="relative flex items-start gap-3">
          <CompanyLogo src={job.logoSrc} name={job.company} size={compact ? 'sm' : 'md'} />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3
                  id={`job-${job.id}-title`}
                  className={cn(
                    'font-display font-semibold text-fg-primary line-clamp-2',
                    compact ? 'text-h4' : 'text-h3',
                  )}
                >
                  {job.title}
                </h3>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-body-s text-fg-secondary">
                  <span className="font-medium text-fg-primary">{job.company}</span>
                  <span className="text-fg-muted">·</span>
                  <LocationBadge location={job.location} />
                  <span className="text-fg-muted">·</span>
                  <span>Posted {relativePosted(job.postedAt)}</span>
                  {job.source && (
                    <>
                      <span className="text-fg-muted">·</span>
                      <span className="capitalize text-fg-muted">via {job.source}</span>
                    </>
                  )}
                </p>
              </div>

              {/* Actions on the right (above the absolute click target) */}
              <div className="relative z-10 flex items-center gap-2">
                {!compact && <MatchScoreMeter score={job.matchScore} size="sm" />}
                {onSaveToggle && (
                  <button
                    type="button"
                    aria-label={job.saved ? 'Unsave job' : 'Save job'}
                    aria-pressed={job.saved || undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSaveToggle(job);
                    }}
                    className={cn(
                      'inline-flex h-8 w-8 items-center justify-center rounded-md text-fg-secondary',
                      'transition-colors hover:bg-bg-raised hover:text-fg-primary',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
                      job.saved && 'text-accent',
                    )}
                  >
                    {job.saved ? (
                      <BookmarkCheck aria-hidden className="h-4 w-4" />
                    ) : (
                      <Bookmark aria-hidden className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Salary + employment + experience row */}
            {!compact && (
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-body-s text-fg-secondary">
                <MoneyRange salary={job.salary} />
                <span className="text-fg-muted">·</span>
                <span className="capitalize">{job.employment}</span>
                <span className="text-fg-muted">·</span>
                <span>
                  {job.experience.min}–{job.experience.max}y
                </span>
                {job.wfh && (
                  <>
                    <span className="text-fg-muted">·</span>
                    <span className="capitalize">{job.wfh}</span>
                  </>
                )}
              </div>
            )}

            {/* Score chips + perks row */}
            {!compact && (
              <div className="relative z-10 mt-3 flex flex-wrap items-center gap-2">
                {showGhost && <GhostScoreMeter score={job.ghostScore} variant="pill" />}
                {job.bondFlag && <BondBadge flag={job.bondFlag} />}
                {job.benchFlag && <BenchBadge flag={job.benchFlag} />}
                {job.perks && job.perks.length > 0 && <ChipRow perks={job.perks} />}
              </div>
            )}

            {/* Excerpt — only on expanded */}
            {expanded && job.excerpt && (
              <p className="mt-3 line-clamp-3 text-body-s text-fg-secondary">{job.excerpt}</p>
            )}

            {/* Referral preview + actions footer */}
            {(job.referralPath || onTailorCV || onApply) && !compact && (
              <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-3">
                {job.referralPath ? (
                  <ReferrerPreview
                    referralPath={job.referralPath}
                    onView={onViewReferrers ? () => onViewReferrers(job) : undefined}
                  />
                ) : (
                  <span className="text-body-s text-fg-muted">No referral path yet</span>
                )}
                <div className="flex items-center gap-2">
                  {onTailorCV && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTailorCV(job);
                      }}
                      className="text-body-s font-medium text-fg-primary hover:text-brand"
                    >
                      Tailor CV
                    </button>
                  )}
                  {onApply && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onApply(job);
                      }}
                      className="inline-flex h-8 items-center rounded-md bg-brand px-3 text-body-s font-semibold text-fg-inverse hover:bg-brand-hover"
                    >
                      Apply ›
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    );
  },
);
JobCard.displayName = 'JobCard';
