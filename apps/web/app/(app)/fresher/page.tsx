'use client';

import Link from 'next/link';
import { Button, LoadingSpinner } from '@careerops/ui';
import { useFresherHub } from '@careerops/api-client';

import { cn } from '@/lib/cn';

function relativeDays(iso: string): string {
  const days = Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'in 1 day';
  return `in ${days} days`;
}

export default function FresherHubPage() {
  const { data, isLoading } = useFresherHub();

  return (
    <div className="container py-10">
      <header className="mb-6">
        <h1 className="font-display text-display-l font-bold text-fg-primary">Fresher Hub</h1>
        {data && (
          <p className="mt-2 text-body-m text-fg-secondary">
            Welcome, {data.user.college} · {data.user.year}rd-year {data.user.branch} · CGPA{' '}
            {data.user.cgpa.toFixed(1)}
          </p>
        )}
      </header>

      {isLoading || !data ? (
        <LoadingSpinner size="block" label="Loading fresher hub…" />
      ) : (
        <div className="grid gap-5 lg:grid-cols-12">
          {/* Milestones */}
          <section className="rounded-md border border-border-subtle bg-bg-surface p-5 lg:col-span-12">
            <h2 className="mb-3 text-h3 font-semibold text-fg-primary">Next milestones</h2>
            <ul className="space-y-2">
              {data.upcomingDeadlines.map((d) => {
                const days = Math.ceil((new Date(d.at).getTime() - Date.now()) / 86_400_000);
                const urgent = days <= 1;
                return (
                  <li
                    key={d.id}
                    className={cn(
                      'flex items-center justify-between rounded-md border p-3',
                      urgent ? 'border-danger/40 bg-danger-bg/30' : 'border-border-subtle bg-bg-app',
                    )}
                  >
                    <p className={cn('font-medium', urgent ? 'text-danger' : 'text-fg-primary')}>
                      ⏰ {d.name}
                    </p>
                    <span
                      className={cn(
                        'text-caption font-medium',
                        urgent ? 'text-danger' : 'text-fg-muted',
                      )}
                    >
                      {relativeDays(d.at)}
                    </span>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/fresher/drives"
              className="mt-3 inline-block text-body-s font-medium text-brand underline-offset-4 hover:underline"
            >
              See all drives ›
            </Link>
          </section>

          {/* Drives + Aptitude */}
          <article className="rounded-md border border-border-subtle bg-bg-surface p-5 lg:col-span-6">
            <h2 className="text-h3 font-semibold text-fg-primary">Campus drives</h2>
            <dl className="mt-3 grid grid-cols-3 gap-3 text-center">
              <Stat label="Active" value={data.drives.active} />
              <Stat label="For your branch" value={data.drives.branchFit} />
              <Stat label="Filtered out" value={data.drives.filtered} />
            </dl>
            <Link href="/fresher/drives">
              <Button className="mt-4" size="sm">
                See all
              </Button>
            </Link>
          </article>

          <article className="rounded-md border border-border-subtle bg-bg-surface p-5 lg:col-span-6">
            <h2 className="text-h3 font-semibold text-fg-primary">Aptitude prep</h2>
            <ul className="mt-3 space-y-3">
              {data.aptitude.map((a) => (
                <li key={a.topic}>
                  <div className="flex items-center justify-between text-body-s">
                    <span className="text-fg-primary">{a.topic}</span>
                    <span className="font-mono tabular text-fg-secondary">{a.mastery}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-pill bg-bg-raised">
                    <span
                      className="block h-full rounded-pill bg-brand"
                      style={{ width: `${a.mastery}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <Button size="sm" className="mt-4">
              Practice today
            </Button>
          </article>

          {/* Vault + HR + cohort */}
          <article className="rounded-md border border-border-subtle bg-bg-surface p-5 lg:col-span-6">
            <h2 className="text-h3 font-semibold text-fg-primary">Auto-fill vault</h2>
            <p className="mt-2 text-body-s text-fg-secondary">
              {data.vault.fieldsParsed} fields parsed once. Reused everywhere.
            </p>
            <p className="mt-2 text-caption text-fg-muted">
              Ready for: {data.vault.portalsReady.join(' · ')}
            </p>
            <div className="mt-4 flex gap-2">
              <Link href="/fresher/vault">
                <Button size="sm" variant="ghost">
                  Manage
                </Button>
              </Link>
              <Button size="sm">Test against new portal</Button>
            </div>
          </article>

          <article className="rounded-md border border-border-subtle bg-bg-surface p-5 lg:col-span-6">
            <h2 className="text-h3 font-semibold text-fg-primary">HR English coaching</h2>
            <p className="mt-2 text-body-m text-fg-primary">
              Fluency: <span className="font-semibold tabular">{data.hrFluency.level}</span>
            </p>
            <p className="mt-1 text-caption text-fg-muted">
              Common slips: {data.hrFluency.commonSlips.join(', ')}
            </p>
            <Button size="sm" className="mt-4">
              Today's drill
            </Button>
          </article>

          <article className="rounded-md border border-border-subtle bg-bg-surface p-5 lg:col-span-6">
            <h2 className="text-h3 font-semibold text-fg-primary">Mock GD</h2>
            <p className="mt-2 text-body-s text-fg-secondary">
              Multi-speaker AI group discussion — 5 voices in a 15-min session.
            </p>
            <Button size="sm" className="mt-4">
              Start GD
            </Button>
          </article>

          <Link
            href={`/cohorts/${data.cohort.id}`}
            className="rounded-md border border-border-subtle bg-bg-surface p-5 transition-colors hover:border-border-default lg:col-span-6"
          >
            <h2 className="text-h3 font-semibold text-fg-primary">Cohort</h2>
            <p className="mt-2 text-body-s text-fg-primary">{data.cohort.name}</p>
            <p className="mt-1 text-caption text-fg-muted">
              {data.cohort.members} members · {data.cohort.offers} offers
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border-subtle bg-bg-app p-3">
      <p className="font-display text-display-s font-bold tabular text-fg-primary">{value}</p>
      <p className="mt-1 text-caption uppercase tracking-wide text-fg-muted">{label}</p>
    </div>
  );
}
