'use client';

import { useRouter } from 'next/navigation';
import { Avatar, Button } from '@careerops/ui';
import { ReferralPath } from '@careerops/icons';

interface Path {
  id: string;
  name: string;
  role: string;
  company: string;
  score: number;
  mutualNote: string;
  activity: string;
}

export function ReferrerPathsWaiting({ paths }: { paths: Path[] }) {
  const router = useRouter();

  return (
    <section
      aria-label="Referrer paths waiting"
      className="rounded-md border border-border-subtle bg-bg-surface p-5"
    >
      <header className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-h3 font-semibold text-fg-primary">
          <ReferralPath size={20} className="text-brand" />
          Referrer paths waiting
        </h2>
        <span className="text-caption text-fg-muted">{paths.length}</span>
      </header>
      <ul className="divide-y divide-border-subtle">
        {paths.map((p) => (
          <li
            key={p.id}
            className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
          >
            <Avatar size="md" alt={p.name} fallback={p.name} />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-fg-primary">{p.name}</p>
              <p className="text-body-s text-fg-secondary">
                {p.role} · {p.company}
              </p>
              <p className="text-caption text-fg-muted">
                Mutual: {p.mutualNote} · {p.activity}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="font-mono text-caption tabular text-brand">
                {(p.score * 100).toFixed(0)}
              </span>
              <Button
                size="sm"
                onClick={() => router.push(`/referrers?seed=${p.id}`)}
              >
                Compose DM
              </Button>
            </div>
          </li>
        ))}
        {paths.length === 0 && (
          <li className="py-6 text-center text-body-s text-fg-secondary">
            No referrer paths yet. Connect more accounts or wait — we're watching.
          </li>
        )}
      </ul>
    </section>
  );
}
