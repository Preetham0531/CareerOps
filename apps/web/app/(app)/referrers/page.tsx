'use client';

/**
 * Day 5 referrers index — list of opportunities with referral paths.
 *
 * To swap into place:
 *   mv "apps/web/app/(app)/referrers/page.tsx.day5" "apps/web/app/(app)/referrers/page.tsx"
 */

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, EmptyState } from '@careerops/ui';
import { ReferralPath } from '@careerops/icons';
import { useDashboard } from '@careerops/api-client';

export default function ReferrersIndex() {
  const router = useRouter();
  const { data } = useDashboard();
  const paths = data?.referrerPaths ?? [];

  return (
    <div className="container py-10">
      <header className="mb-6">
        <h1 className="font-display text-display-l font-bold text-fg-primary">Referrers</h1>
        <p className="mt-2 text-body-m text-fg-secondary">
          Pick a job from your saved/applied list to see its referral graph.
        </p>
      </header>

      {paths.length === 0 ? (
        <EmptyState
          illustration={<ReferralPath />}
          headline="No referrer paths yet"
          description="We'll notify you the moment a path opens. Save a few jobs to seed the graph."
          primaryAction={
            <Button onClick={() => router.push('/discover')}>Browse jobs</Button>
          }
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {paths.map((p) => (
            <li key={p.id}>
              <Link
                href={`/referrers/${p.id}`}
                className="block rounded-md border border-border-subtle bg-bg-surface p-4 transition-colors hover:border-border-default"
              >
                <p className="font-medium text-fg-primary">
                  {p.role} · {p.company}
                </p>
                <p className="mt-1 text-body-s text-fg-secondary">
                  {p.name} · {p.activity}
                </p>
                <p className="mt-2 text-caption text-fg-muted">{p.mutualNote}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
