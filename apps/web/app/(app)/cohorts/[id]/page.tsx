'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Star } from 'lucide-react';
import { Avatar, Button, LoadingSpinner, Tabs } from '@careerops/ui';
import { useCohort } from '@careerops/api-client';

import { cn } from '@/lib/cn';

function relative(iso: string): string {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (d <= 0) return 'today';
  if (d === 1) return '1d ago';
  return `${d}d ago`;
}

export default function CohortDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useCohort(params?.id ?? null);

  return (
    <div className="container py-6">
      <button
        type="button"
        onClick={() => router.push('/cohorts')}
        className="mb-4 inline-flex items-center gap-1 text-body-s font-medium text-fg-secondary hover:text-fg-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Cohorts
      </button>

      {isLoading || !data ? (
        <LoadingSpinner size="block" label="Loading cohort…" />
      ) : (
        <>
          <header className="mb-6">
            <h1 className="font-display text-display-l font-bold text-fg-primary">{data.name}</h1>
            <p className="mt-2 text-body-m text-fg-secondary">
              {data.members.length} members · {data.activity.length} recent events
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div>
              <Tabs defaultValue="activity">
                <Tabs.List>
                  <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
                  <Tabs.Trigger value="shared">Shared jobs</Tabs.Trigger>
                  <Tabs.Trigger value="review">Peer review</Tabs.Trigger>
                  <Tabs.Trigger value="research">Research</Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="activity" className="mt-6">
                  <ul className="rounded-md border border-border-subtle bg-bg-surface divide-y divide-border-subtle">
                    {data.activity.map((a) => (
                      <li key={a.id} className="flex items-center gap-3 p-4">
                        <Avatar size="sm" alt={a.actor} fallback={a.actor} />
                        <p className="flex-1 text-body-s">
                          <span className="font-medium text-fg-primary">{a.actor}</span>{' '}
                          <span className="text-fg-secondary">{a.text}</span>
                        </p>
                        <span className="text-caption text-fg-muted">{relative(a.at)}</span>
                      </li>
                    ))}
                  </ul>
                </Tabs.Content>

                <Tabs.Content value="shared" className="mt-6">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {data.sharedJobs.map((sj) => (
                      <li
                        key={sj.id}
                        className="rounded-md border border-border-subtle bg-bg-surface p-4"
                      >
                        <p className="font-medium text-body-m text-fg-primary">
                          {sj.jobTitle} · {sj.company}
                        </p>
                        <p className="mt-1 text-caption text-fg-muted">
                          Shared by {sj.sharedBy} · for {sj.taggedFor.join(', ')}
                        </p>
                        {sj.note && (
                          <p className="mt-2 rounded-md border-l-2 border-brand bg-success-bg/40 px-2 py-1 text-body-s italic text-fg-primary">
                            “{sj.note}”
                          </p>
                        )}
                        <div className="mt-3 flex justify-end gap-2">
                          <Button size="sm" variant="ghost">
                            Save to mine
                          </Button>
                          <Button size="sm">Open</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Tabs.Content>

                <Tabs.Content value="review" className="mt-6">
                  <ul className="space-y-3">
                    {data.reviews.map((r) => (
                      <li
                        key={r.id}
                        className="rounded-md border border-border-subtle bg-bg-surface p-4"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-body-m text-fg-primary">
                            {r.submitter}'s CV — {r.variantName}
                          </p>
                          <span className="inline-flex items-center gap-1 text-caption text-fg-muted">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  'h-3 w-3',
                                  i < Math.round(r.avgRating)
                                    ? 'fill-accent text-accent'
                                    : 'text-bg-raised',
                                )}
                              />
                            ))}
                            <span className="ml-1 tabular">{r.avgRating.toFixed(1)}</span>
                          </span>
                        </div>
                        <p className="mt-1 text-caption text-fg-muted">
                          {r.reviews} reviews · submitted {relative(r.submittedAt)}
                        </p>
                        <div className="mt-3 flex justify-end gap-2">
                          <Button size="sm" variant="ghost">
                            View diff
                          </Button>
                          <Button size="sm">Add review</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Tabs.Content>

                <Tabs.Content value="research" className="mt-6">
                  <ul className="space-y-3">
                    {data.research.map((rt) => (
                      <li
                        key={rt.id}
                        className="rounded-md border border-border-subtle bg-bg-surface p-4"
                      >
                        <p className="font-medium text-body-m text-fg-primary">{rt.topic}</p>
                        <p className="mt-1 text-caption text-fg-muted">
                          Owner: {rt.owner} · updated {relative(rt.updatedAt)}
                        </p>
                        <p className="mt-2 text-body-s text-fg-secondary">{rt.notesPreview}</p>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-4" variant="secondary">
                    Claim a research topic
                  </Button>
                </Tabs.Content>
              </Tabs>
            </div>

            <aside className="space-y-6">
              <section className="rounded-md border border-border-subtle bg-bg-surface p-4">
                <h2 className="text-caption font-semibold uppercase tracking-wide text-fg-muted">
                  Members
                </h2>
                <ul className="mt-3 flex flex-col gap-3">
                  {data.members.map((m) => {
                    const pct = (m.weeklyDone / m.weeklyTarget) * 100;
                    return (
                      <li key={m.id} className="flex items-center gap-3">
                        <Avatar size="sm" alt={m.name} fallback={m.name} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-body-s text-fg-primary truncate">
                            {m.name}
                            {m.isMentor && (
                              <span className="ml-2 rounded-pill bg-accent px-1.5 py-0.5 text-caption font-medium text-neutral-950">
                                Mentor
                              </span>
                            )}
                          </p>
                          <div className="mt-1 h-1.5 w-full rounded-pill bg-bg-raised">
                            <span
                              className={cn('block h-full rounded-pill bg-brand')}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                        <span className="font-mono text-caption tabular text-fg-muted">
                          {m.weeklyDone}/{m.weeklyTarget}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <Button variant="ghost" size="sm" className="mt-3" fullWidth>
                  Invite
                </Button>
              </section>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}
