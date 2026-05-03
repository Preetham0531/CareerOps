'use client';

/**
 * Day 5 inbox. Thread list. Click → /inbox/:id.
 *
 * To swap into place:
 *   mv "apps/web/app/(app)/inbox/page.tsx.day5" "apps/web/app/(app)/inbox/page.tsx"
 */

import Link from 'next/link';
import { LoadingSpinner } from '@careerops/ui';
import { useThreads } from '@careerops/api-client';

import { cn } from '@/lib/cn';

function relative(iso: string): string {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (d <= 0) return 'today';
  if (d === 1) return '1d ago';
  return `${d}d ago`;
}

export default function InboxPage() {
  const { data, isLoading } = useThreads();

  return (
    <div className="container py-10">
      <header className="mb-6">
        <h1 className="font-display text-display-l font-bold text-fg-primary">Inbox</h1>
        <p className="mt-2 text-body-m text-fg-secondary">Referrer threads + recruiter replies.</p>
      </header>

      {isLoading ? (
        <LoadingSpinner size="block" label="Loading inbox…" />
      ) : !data?.length ? (
        <p className="py-12 text-center text-body-m text-fg-secondary">All caught up.</p>
      ) : (
        <ul className="divide-y divide-border-subtle rounded-md border border-border-subtle bg-bg-surface">
          {data.map((t) => (
            <li key={t.id}>
              <Link
                href={`/inbox/${t.id}`}
                className="flex items-start gap-3 p-4 transition-colors hover:bg-bg-raised"
              >
                <span
                  className={cn(
                    'mt-2 h-2 w-2 shrink-0 rounded-pill',
                    t.unread ? 'bg-accent' : 'bg-transparent',
                  )}
                  aria-label={t.unread ? 'unread' : undefined}
                />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 font-medium text-fg-primary">
                    {t.with}
                    <span className="text-caption font-normal text-fg-muted">
                      · {t.withRole} · {t.withCompany}
                    </span>
                  </p>
                  <p className="mt-1 truncate text-body-s text-fg-secondary">{t.preview}</p>
                </div>
                <span className="shrink-0 text-caption text-fg-muted">{relative(t.lastAt)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
