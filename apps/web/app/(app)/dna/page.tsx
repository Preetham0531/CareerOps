'use client';

import { useState } from 'react';
import { LoadingSpinner } from '@careerops/ui';
import { useDNA } from '@careerops/api-client';

import { StatTile } from '@/features/dashboard/components/StatTile';
import { KeyInsight } from '@/features/dna/components/KeyInsight';
import { Heatmap } from '@/features/dna/components/Heatmap';
import { Funnel } from '@/features/dna/components/Funnel';
import { RateBars } from '@/features/dna/components/RateBars';

const WINDOWS = [30, 90, 180] as const;

export default function DNAPage() {
  const [windowDays, setWindowDays] = useState<(typeof WINDOWS)[number]>(90);
  const { data, isLoading } = useDNA(windowDays);

  return (
    <div className="container py-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-display-l font-bold text-fg-primary">Application DNA</h1>
          <p className="mt-2 text-body-m text-fg-secondary">
            Last {windowDays} days · {data?.totals.applies ?? '…'} applications · {data?.totals.callbacks ?? '…'} callbacks · {data?.totals.interviews ?? '…'} interviews · {data?.totals.offers ?? '…'} offers
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {WINDOWS.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setWindowDays(w)}
              className={
                windowDays === w
                  ? 'rounded-pill bg-brand px-3 py-1 text-caption font-medium text-fg-inverse'
                  : 'rounded-pill px-3 py-1 text-caption text-fg-secondary hover:text-fg-primary'
              }
            >
              {w}d
            </button>
          ))}
        </div>
      </header>

      {isLoading || !data ? (
        <LoadingSpinner size="block" label="Crunching DNA…" />
      ) : (
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-12">
            <KeyInsight insight={data.primaryInsight} />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-12 lg:grid-cols-3">
            <StatTile
              label="Callback rate"
              value={`${data.stats.callbackRate.value}%`}
              delta={data.stats.callbackRate.delta}
              sparkline={data.stats.callbackRate.sparkline}
              caption={`vs prior ${windowDays}d`}
            />
            <StatTile
              label="Interview rate"
              value={`${data.stats.interviewRate.value}%`}
              delta={data.stats.interviewRate.delta}
              sparkline={data.stats.interviewRate.sparkline}
              caption={`vs prior ${windowDays}d`}
            />
            <StatTile
              label="Offer rate"
              value={`${data.stats.offerRate.value}%`}
              delta={data.stats.offerRate.delta}
              sparkline={data.stats.offerRate.sparkline}
              caption={`vs prior ${windowDays}d`}
            />
          </div>

          <div className="lg:col-span-12">
            <Heatmap cells={data.heatmap} />
          </div>

          <div className="lg:col-span-6">
            <RateBars
              title="CV variant performance"
              hint="By variant"
              items={data.cvVariants.map((v) => ({
                label: v.variant,
                applies: v.applies,
                callbackRate: v.callbackRate,
              }))}
            />
          </div>
          <div className="lg:col-span-6">
            <RateBars
              title="Cover-letter angle"
              hint="By angle"
              items={data.letterAngles.map((v) => ({
                label: v.angle,
                applies: v.applies,
                callbackRate: v.callbackRate,
              }))}
            />
          </div>

          <div className="lg:col-span-6">
            <Funnel stages={data.funnel} />
          </div>
          <div className="lg:col-span-6">
            <RateBars
              title="Sector performance"
              hint="By company sector"
              items={data.sectors.map((s) => ({
                label: s.sector,
                applies: s.applies,
                callbackRate: s.callbackRate,
              }))}
            />
          </div>

          {data.moreInsights.length > 0 && (
            <section className="lg:col-span-12 rounded-md border border-border-subtle bg-bg-surface p-5">
              <h2 className="mb-3 text-h3 font-semibold text-fg-primary">More insights</h2>
              <ul className="space-y-2">
                {data.moreInsights.map((ins) => (
                  <li
                    key={ins.id}
                    className="flex items-start gap-3 rounded-md border border-border-subtle p-3"
                  >
                    <p className="text-body-m text-fg-primary flex-1">{ins.text}</p>
                    <span className="shrink-0 text-caption text-fg-muted">
                      n={ins.sampleSize} · {(ins.effectSize).toFixed(1)}×
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
