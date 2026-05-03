'use client';

/**
 * Day 4 dashboard. Bento layout with 7 tiles fed by a single useDashboard query.
 *
 * To swap into place:
 *   mv apps/web/app/(app)/dashboard/page.tsx.day4 apps/web/app/(app)/dashboard/page.tsx
 */

import { useRouter } from 'next/navigation';
import { useDashboard } from '@careerops/api-client';
import type { JobData } from '@careerops/ui';

import { GreetingBand } from '@/features/dashboard/components/GreetingBand';
import { SurgicalPicks } from '@/features/dashboard/components/SurgicalPicks';
import { StatTile, StatTileSkeleton } from '@/features/dashboard/components/StatTile';
import { ReferrerPathsWaiting } from '@/features/dashboard/components/ReferrerPathsWaiting';
import { ApplicationTimeline } from '@/features/dashboard/components/ApplicationTimeline';
import { CompanyHealthShifts } from '@/features/dashboard/components/CompanyHealthShifts';
import { DNAInsightTile } from '@/features/dashboard/components/DNAInsightTile';

function lpa(min: number): string {
  return `₹${(min / 100_000).toFixed(0)}L`;
}

export default function DashboardPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useDashboard();

  function relativeNext(iso: string | null | undefined): string | undefined {
    if (!iso) return undefined;
    const days = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);
    if (days <= 0) return 'today';
    if (days === 1) return 'tomorrow';
    return `in ${days}d`;
  }

  return (
    <div className="container py-8 lg:py-12">
      <GreetingBand
        loading={isLoading}
        user={data?.greeting.user}
        timeOfDay={data?.greeting.timeOfDay}
        summary={data?.greeting.summary}
      />

      {/* Bento grid */}
      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto_auto]">
        {/* Surgical picks — primary tile, takes 8 cols × 2 rows on lg */}
        <div className="lg:col-span-8 lg:row-span-2">
          <SurgicalPicks
            picks={(data?.surgicalPicks ?? []) as unknown as JobData[]}
            onSelect={(j) => router.push(`/discover?jobId=${j.id}`)}
            onViewReferrers={(j) => router.push(`/referrers/${j.id}`)}
          />
        </div>

        {/* 3 stats stacked in the right column on lg */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-4 lg:row-span-2 lg:grid-cols-1">
          {isLoading ? (
            <>
              <StatTileSkeleton />
              <StatTileSkeleton />
              <StatTileSkeleton />
            </>
          ) : data ? (
            <>
              <StatTile
                label="Callback rate"
                value={`${data.stats.callbackRate.value}%`}
                delta={data.stats.callbackRate.delta}
                sparkline={data.stats.callbackRate.sparkline}
                caption="vs last 30d"
              />
              <StatTile
                label="Apps this week"
                value={data.stats.appsThisWeek.count}
                trend={data.stats.appsThisWeek.trend}
                deltaSuffix=""
                sparkline={data.stats.appsThisWeek.sparkline}
                caption="quality applies"
              />
              <StatTile
                label="Interviews"
                value={data.stats.upcomingInterviews.count}
                deltaSuffix=""
                caption={
                  data.stats.upcomingInterviews.nextAt
                    ? `next ${relativeNext(data.stats.upcomingInterviews.nextAt)}`
                    : 'none scheduled'
                }
              />
            </>
          ) : null}
        </div>

        {/* Referrer paths — full width row */}
        <div className="lg:col-span-12">
          <ReferrerPathsWaiting paths={data?.referrerPaths ?? []} />
        </div>

        {/* Timeline + Company health side by side */}
        <div className="lg:col-span-7">
          <ApplicationTimeline entries={data?.timeline ?? []} />
        </div>
        <div className="lg:col-span-5">
          <CompanyHealthShifts items={data?.companyHealth ?? []} />
        </div>

        {/* DNA insight — full width footer */}
        <div className="lg:col-span-12">
          <DNAInsightTile
            quote={data?.dnaInsight.quote ?? '…'}
            href={data?.dnaInsight.explainerLink ?? '/dna'}
          />
        </div>
      </div>

      {isError && (
        <div role="alert" className="mt-6 rounded-md border border-danger bg-danger-bg p-4 text-body-m text-danger">
          Couldn't load your dashboard. Try refreshing.
        </div>
      )}

      {/* tabular utility hint for tests */}
      <p className="sr-only" data-testid="dashboard-loaded">
        {data && 'ok'}
      </p>
      {/* lpa is referenced for completeness in cv-formatted callouts */}
      <span className="sr-only">{lpa(0)}</span>
    </div>
  );
}
