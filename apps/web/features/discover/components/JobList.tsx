'use client';

import { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useDiscover } from '@careerops/api-client';
import { JobCard, Skeleton, type JobData } from '@careerops/ui';

import { urlStateToApiInput, useDiscoverUrlState } from '../url-state';

interface JobListProps {
  selectedId: string | null;
  onSelect: (job: JobData) => void;
  onSaveToggle: (job: JobData) => void;
  onApply: (job: JobData) => void;
  onTailorCV: (job: JobData) => void;
  onViewReferrers: (job: JobData) => void;
}

/**
 * Virtualized list of JobCards. Per docs/frontend/build-plan/day-4.md
 * uses TanStack Virtual to handle 10k+ rows; pages via useDiscover infinite query.
 */
export function JobList({
  selectedId,
  onSelect,
  onSaveToggle,
  onApply,
  onTailorCV,
  onViewReferrers,
}: JobListProps) {
  const [urlState] = useDiscoverUrlState();
  const apiInput = urlStateToApiInput(urlState);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useDiscover(apiInput);

  const items = data?.pages.flatMap((p) => p.items) ?? [];
  const total = data?.pages[0]?.total ?? 0;
  const hidden = data?.pages[0]?.hidden;

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length + (hasNextPage ? 1 : 0), // last virtual row is the loader
    getScrollElement: () => parentRef.current,
    estimateSize: () => 220,
    overscan: 6,
  });

  // Auto-load next page when user nears the bottom
  useEffect(() => {
    const last = virtualizer.getVirtualItems().at(-1);
    if (!last) return;
    if (last.index >= items.length - 1 && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [virtualizer, items.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="p-12 text-center">
        <p className="font-display text-display-s font-semibold text-fg-primary">
          No matches in your filter
        </p>
        <p className="mt-2 text-body-m text-fg-secondary">
          Try widening the LPA range, or open it to remote.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div
        role="status"
        className="flex items-center justify-between gap-3 border-b border-border-subtle bg-bg-app/80 px-4 py-2 text-caption text-fg-muted backdrop-blur-md"
      >
        <span>
          Showing <span className="text-fg-primary tabular">{items.length}</span> of{' '}
          <span className="tabular">{total}</span>
        </span>
        {hidden && (hidden.byGhost > 0 || hidden.byBond > 0) && (
          <span className="text-fg-secondary">
            {hidden.byGhost + hidden.byBond} hidden by quality filters
          </span>
        )}
      </div>

      <div ref={parentRef} className="flex-1 overflow-auto">
        <div
          style={{ height: virtualizer.getTotalSize(), position: 'relative' }}
          className="px-4 pb-8 pt-3"
        >
          {virtualizer.getVirtualItems().map((row) => {
            const isLoaderRow = row.index >= items.length;
            const job = items[row.index];
            return (
              <div
                key={row.key}
                data-index={row.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  transform: `translateY(${row.start}px)`,
                  paddingBottom: 16,
                }}
              >
                {isLoaderRow ? (
                  <Skeleton className="h-44 w-full" />
                ) : job ? (
                  <JobCard
                    job={job as unknown as JobData}
                    density={selectedId === job.id ? 'expanded' : 'default'}
                    onSelect={onSelect}
                    onSaveToggle={onSaveToggle}
                    onApply={onApply}
                    onTailorCV={onTailorCV}
                    onViewReferrers={onViewReferrers}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
