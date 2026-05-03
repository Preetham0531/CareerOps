'use client';

import Link from 'next/link';
import { LoadingSpinner } from '@careerops/ui';
import { useInterviews } from '@careerops/api-client';

import { cn } from '@/lib/cn';

function relative(iso: string): string {
  const days = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);
  if (days <= -1) return `${Math.abs(days)}d ago`;
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  return `in ${days}d`;
}

export default function InterviewsPage() {
  const { data, isLoading } = useInterviews();
  const upcoming = data?.filter((i) => i.status === 'upcoming') ?? [];
  const past = data?.filter((i) => i.status === 'past') ?? [];

  return (
    <div className="container py-10">
      <header className="mb-6">
        <h1 className="font-display text-display-l font-bold text-fg-primary">Interviews</h1>
        <p className="mt-2 text-body-m text-fg-secondary">
          Each interview unlocks prep: question Kanban, interviewer one-pager, mock session.
        </p>
      </header>

      {isLoading ? (
        <LoadingSpinner size="block" label="Loading interviews…" />
      ) : (
        <>
          <Group title="Upcoming" items={upcoming} />
          <Group title="Past" items={past} muted />
        </>
      )}
    </div>
  );
}

function Group({
  title,
  items,
  muted,
}: {
  title: string;
  items: Array<{ id: string; company: string; role: string; scheduledAt: string }>;
  muted?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-h3 font-semibold text-fg-primary">{title}</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.id}>
            <Link
              href={`/interviews/${it.id}`}
              className={cn(
                'block rounded-md border border-border-subtle bg-bg-surface p-4 transition-colors hover:border-border-default',
                muted && 'opacity-80',
              )}
            >
              <p className="font-medium text-body-m text-fg-primary">
                {it.role} · {it.company}
              </p>
              <p className="mt-1 text-body-s text-fg-secondary">{relative(it.scheduledAt)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
