'use client';

import Link from 'next/link';
import { Button, EmptyState, LoadingSpinner } from '@careerops/ui';
import { ReferralPath } from '@careerops/icons';
import { useCohorts } from '@careerops/api-client';

export default function CohortsIndex() {
  const { data, isLoading } = useCohorts();

  return (
    <div className="container py-10">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-display-l font-bold text-fg-primary">Cohorts</h1>
          <p className="mt-2 text-body-m text-fg-secondary">
            4–6 friends. Share filters, peer-review CVs, stay accountable.
          </p>
        </div>
        <Button variant="secondary">New cohort</Button>
      </header>

      {isLoading ? (
        <LoadingSpinner size="block" label="Loading…" />
      ) : !data?.length ? (
        <EmptyState
          illustration={<ReferralPath />}
          headline="Job-hunting alone is brutal"
          description="Create a cohort with 4–6 batchmates or friends to share filters, peer-review CVs, and stay accountable."
          primaryAction={<Button>Create a cohort</Button>}
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {data.map((c) => (
            <li key={c.id}>
              <Link
                href={`/cohorts/${c.id}`}
                className="block rounded-md border border-border-subtle bg-bg-surface p-4 transition-colors hover:border-border-default"
              >
                <p className="font-medium text-body-m text-fg-primary">{c.name}</p>
                <p className="mt-1 text-body-s text-fg-secondary">
                  {c.membersCount} members
                  {c.unreadActivity > 0 && (
                    <span className="ml-2 rounded-pill bg-success-bg px-2 py-0.5 text-caption text-brand">
                      {c.unreadActivity} new
                    </span>
                  )}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
