'use client';

import { Avatar, Button, Input, LoadingSpinner, Switch, toast } from '@careerops/ui';
import { useProfile, useUpdateProfile } from '@careerops/api-client';

const LANGUAGES = [
  { value: 'en-IN', label: 'English (India)' },
  { value: 'hi-IN', label: 'हिन्दी' },
  { value: 'ta-IN', label: 'தமிழ்' },
  { value: 'te-IN', label: 'తెలుగు' },
] as const;

export default function ProfileSettings() {
  const { data, isLoading } = useProfile();
  const update = useUpdateProfile();

  if (isLoading || !data) return <LoadingSpinner size="block" label="Loading profile…" />;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-display-l font-bold text-fg-primary">Profile</h1>
        <p className="mt-2 text-body-m text-fg-secondary">
          Public-facing display + UI preferences. None of this is shared without consent.
        </p>
      </header>

      <section className="rounded-md border border-border-subtle bg-bg-surface p-6 space-y-5">
        <div className="flex items-center gap-4">
          <Avatar size="xl" alt={data.name} fallback={data.name} />
          <div>
            <p className="font-medium text-fg-primary">{data.name}</p>
            <p className="text-caption text-fg-muted">Photo upload arrives in sprint-2.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Name"
            defaultValue={data.name}
            onBlur={(e) => update.mutate({ name: e.target.value })}
          />
          <Input
            label="Pronouns"
            defaultValue={data.pronouns ?? ''}
            onBlur={(e) => update.mutate({ pronouns: e.target.value })}
          />
        </div>

        <div>
          <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-fg-muted">
            Language
          </p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => {
                  update.mutate({ language: l.value });
                  toast.success(`Language: ${l.label}`);
                }}
                className={
                  data.language === l.value
                    ? 'rounded-pill bg-brand px-3 py-1 text-caption font-medium text-fg-inverse'
                    : 'rounded-pill border border-border-subtle px-3 py-1 text-caption text-fg-secondary hover:text-fg-primary'
                }
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center justify-between gap-4 rounded-md border border-border-subtle p-3">
          <div>
            <p className="font-medium text-fg-primary">Compact density</p>
            <p className="text-caption text-fg-muted">For power users comparing many listings.</p>
          </div>
          <Switch
            checked={data.density === 'compact'}
            onCheckedChange={(v) =>
              update.mutate({ density: v ? 'compact' : 'comfortable' })
            }
          />
        </label>

        <label className="flex items-center justify-between gap-4 rounded-md border border-border-subtle p-3">
          <div>
            <p className="font-medium text-fg-primary">Public profile page</p>
            <p className="text-caption text-fg-muted">
              Reverse Job Board (#11) — opt-in. Off by default per Stealth posture.
            </p>
          </div>
          <Switch
            checked={data.publicProfile}
            onCheckedChange={(v) => update.mutate({ publicProfile: v })}
          />
        </label>

        <Button variant="ghost" disabled>
          Manage CV variants (Day 5/6 module)
        </Button>
      </section>
    </div>
  );
}
