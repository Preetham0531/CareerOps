'use client';

/**
 * Day 4 Discovery surface.
 * Three-column shell on desktop: filter rail / virtualized list / preview pane.
 * Mobile collapses filter rail to a bottom sheet and preview becomes a route push.
 *
 * To swap into place:
 *   mv apps/web/app/(app)/discover/page.tsx.day4 apps/web/app/(app)/discover/page.tsx
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Filter } from 'lucide-react';
import { BottomSheet, Button } from '@careerops/ui';
import type { JobData } from '@careerops/ui';

import { FilterRail } from '@/features/discover/components/FilterRail';
import { ActiveFilterChips } from '@/features/discover/components/ActiveFilterChips';
import { JobList } from '@/features/discover/components/JobList';
import { PreviewPane } from '@/features/discover/components/PreviewPane';
import { SortDropdown } from '@/features/discover/components/SortDropdown';
import { ApplyDialog } from '@/features/apply/components/ApplyDialog';

export default function DiscoverPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<JobData | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const handleSelect = (j: JobData) => setSelected(j);
  const handleSave = (_j: JobData) => {
    /* Day 5 wires Saved store; Day 4 keeps it visual */
  };
  const handleApply = (j: JobData) => {
    setSelected(j);
    setApplyOpen(true);
  };
  const handleTailor = (j: JobData) => router.push(`/evidence?jobId=${j.id}`);
  const handleViewReferrers = (j: JobData) => router.push(`/referrers/${j.id}`);

  return (
    <>
      {/* Mobile: filter trigger + sort */}
      <div className="flex items-center justify-between gap-2 border-b border-border-subtle px-4 py-3 lg:hidden">
        <Button
          variant="secondary"
          size="sm"
          leadingIcon={<Filter className="h-4 w-4" />}
          onClick={() => setFilterSheetOpen(true)}
        >
          Filters
        </Button>
        <SortDropdown />
      </div>

      <ActiveFilterChips />

      <div className="grid h-[calc(100vh-3.5rem-3rem)] grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_380px]">
        {/* Filter rail (desktop) */}
        <div className="hidden overflow-y-auto border-r border-border-subtle p-4 lg:block">
          <FilterRail />
        </div>

        {/* List */}
        <div className="flex min-w-0 flex-col">
          <div className="hidden items-center justify-between border-b border-border-subtle px-4 py-2 lg:flex">
            <SortDropdown />
          </div>
          <JobList
            selectedId={selected?.id ?? null}
            onSelect={handleSelect}
            onSaveToggle={handleSave}
            onApply={handleApply}
            onTailorCV={handleTailor}
            onViewReferrers={handleViewReferrers}
          />
        </div>

        {/* Preview (desktop) */}
        <div className="hidden lg:block">
          {selected ? (
            <PreviewPane
              job={selected}
              onClose={() => setSelected(null)}
              onApply={handleApply}
              onTailorCV={handleTailor}
              onViewReferrers={handleViewReferrers}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-12 text-center">
              <p className="max-w-xs text-body-s text-fg-muted">
                Click a job to preview details, see referral paths, and apply.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      <BottomSheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
        <BottomSheet.Content className="max-h-[88vh]">
          <BottomSheet.Title className="px-4 pt-4">Filters</BottomSheet.Title>
          <div className="overflow-y-auto p-4">
            <FilterRail />
          </div>
          <div className="border-t border-border-subtle p-4">
            <Button fullWidth onClick={() => setFilterSheetOpen(false)}>
              Apply filters
            </Button>
          </div>
        </BottomSheet.Content>
      </BottomSheet>

      {/* Apply dialog */}
      <ApplyDialog job={selected} open={applyOpen} onOpenChange={setApplyOpen} />
    </>
  );
}
