'use client';

import { LoadingSpinner, Switch } from '@careerops/ui';
import {
  useNotificationSettings,
  useUpdateNotificationSettings,
  type NotificationSettings,
} from '@careerops/api-client';

const CATEGORY_LABELS: Record<keyof NotificationSettings['categories'], string> = {
  referrerReply: 'Referrer reply',
  interviewReminder: 'Interview reminder (24h before)',
  offerReceived: 'Offer received',
  matchFound: 'New strong match',
  cohortActivity: 'Cohort activity',
  weeklyDigest: 'Weekly digest',
  monthlyDNA: 'Monthly DNA review',
};

const CHANNEL_LABELS: Record<keyof NotificationSettings['channels'], string> = {
  email: 'Email',
  push: 'Web push',
  whatsapp: 'WhatsApp Business',
  inApp: 'In-app',
};

export default function NotificationsSettings() {
  const { data, isLoading } = useNotificationSettings();
  const update = useUpdateNotificationSettings();

  if (isLoading || !data) return <LoadingSpinner size="block" label="Loading…" />;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-display-l font-bold text-fg-primary">Notifications</h1>
        <p className="mt-2 text-body-m text-fg-secondary">
          Quiet hours respected. Stealth mode mutes during work hours automatically.
        </p>
      </header>

      <section className="rounded-md border border-border-subtle bg-bg-surface p-5">
        <h2 className="mb-3 text-h3 font-semibold text-fg-primary">Channels</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {Object.entries(CHANNEL_LABELS).map(([key, label]) => (
            <li key={key}>
              <ToggleRow
                label={label}
                checked={data.channels[key as keyof NotificationSettings['channels']]}
                onChange={(v) =>
                  update.mutate({
                    channels: { ...data.channels, [key]: v },
                  })
                }
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-md border border-border-subtle bg-bg-surface p-5">
        <h2 className="mb-3 text-h3 font-semibold text-fg-primary">Categories</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <li key={key}>
              <ToggleRow
                label={label}
                checked={data.categories[key as keyof NotificationSettings['categories']]}
                onChange={(v) =>
                  update.mutate({
                    categories: { ...data.categories, [key]: v },
                  })
                }
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-md border border-border-subtle bg-bg-surface p-5 grid gap-3 sm:grid-cols-2">
        <Field label="Quiet hours" value={`${data.quietHours.start} – ${data.quietHours.end}`} />
        <Field label="Digest delivery" value={data.digestTime + ' IST'} />
      </section>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between rounded-md border border-border-subtle p-3 text-body-s text-fg-primary">
      {label}
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border-subtle bg-bg-app p-3">
      <p className="text-caption font-semibold uppercase tracking-wide text-fg-muted">{label}</p>
      <p className="mt-1 font-mono text-body-m tabular text-fg-primary">{value}</p>
    </div>
  );
}
