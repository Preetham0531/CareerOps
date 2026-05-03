import { Avatar } from '@careerops/ui';
import { ExternalLink } from 'lucide-react';

import type { InterviewerProfile } from '@careerops/api-client';

export function InterviewerOnePager({ profile }: { profile: InterviewerProfile }) {
  return (
    <article className="rounded-md border border-border-subtle bg-bg-surface p-6">
      <header className="flex items-start gap-4">
        <Avatar size="xl" alt={profile.name} fallback={profile.name} ringColor="brand" />
        <div>
          <h2 className="font-display text-h2 font-semibold text-fg-primary">{profile.name}</h2>
          <p className="text-body-s text-fg-secondary">
            {profile.role} · {profile.company}
          </p>
          <button
            type="button"
            className="mt-1 inline-flex items-center gap-1 text-caption font-medium text-brand underline-offset-4 hover:underline"
          >
            Open LinkedIn <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Section label="Tenure">
          <p className="text-body-m text-fg-primary">
            {profile.company}: {profile.tenureYears}y
          </p>
          <ul className="mt-1 text-body-s text-fg-secondary">
            {profile.past.map((p, i) => (
              <li key={i}>
                {p.company}: {p.years}y
              </li>
            ))}
          </ul>
        </Section>
        <Section label="Tech focus">
          <div className="flex flex-wrap gap-1.5">
            {profile.techFocus.map((t) => (
              <span
                key={t}
                className="rounded-pill bg-bg-raised px-2 py-0.5 text-caption text-fg-secondary"
              >
                #{t}
              </span>
            ))}
          </div>
        </Section>
        <Section label="Inferred style" full>
          <p className="text-body-s text-fg-primary">{profile.inferredStyle}</p>
        </Section>
        <Section label="Recent content" full>
          <ul className="space-y-1 text-body-s text-fg-secondary">
            {profile.recentContent.map((c, i) => (
              <li key={i}>• {c}</li>
            ))}
          </ul>
        </Section>
        <Section label="Mutual ties" full>
          <ul className="space-y-1 text-body-s text-fg-secondary">
            {profile.mutualTies.map((t, i) => (
              <li key={i}>• {t}</li>
            ))}
          </ul>
        </Section>
      </div>
    </article>
  );
}

function Section({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <section className={full ? 'md:col-span-2' : undefined}>
      <h3 className="mb-2 text-caption font-semibold uppercase tracking-wide text-fg-muted">
        {label}
      </h3>
      {children}
    </section>
  );
}
