'use client';

import { Button, LoadingSpinner, Switch, toast } from '@careerops/ui';
import { DPDPShield } from '@careerops/icons';
import {
  useDPDP,
  useUpdateConsent,
  useRequestDataExport,
  type ConsentEntry,
} from '@careerops/api-client';

import { cn } from '@/lib/cn';

export default function PrivacyCenter() {
  const { data, isLoading } = useDPDP();
  const updateConsent = useUpdateConsent();
  const exportData = useRequestDataExport();

  if (isLoading || !data) return <LoadingSpinner size="block" label="Loading privacy data…" />;

  return (
    <div className="space-y-8">
      <header className="flex flex-col items-start gap-3">
        <span className="inline-flex items-center gap-1 rounded-pill border border-brand/30 bg-success-bg px-2 py-0.5 text-caption font-medium text-brand">
          <DPDPShield size={14} /> DPDP Act 2023 aligned
        </span>
        <h1 className="font-display text-display-l font-bold text-fg-primary">Privacy</h1>
        <p className="max-w-2xl text-body-m text-fg-secondary">
          We are the data fiduciary; you are the data principal. Your consent is freely given and
          may be withdrawn. Below: what we hold, how we use it, who accesses it, your rights.
        </p>
      </header>

      <DataSummary summary={data.dataSummary} />

      <section className="rounded-md border border-border-subtle bg-bg-surface p-5">
        <h2 className="mb-3 text-h3 font-semibold text-fg-primary">Consents</h2>
        <p className="mb-4 text-caption text-fg-muted">
          Granular toggles. Withdrawing some may disable specific features — we'll explain inline.
        </p>
        <ul className="flex flex-col gap-2">
          {data.consents.map((c) => (
            <ConsentRow
              key={c.key}
              consent={c}
              onToggle={(granted) => {
                updateConsent.mutate({ key: c.key, granted });
                toast.success(granted ? `Consent granted: ${c.label}` : `Consent withdrawn: ${c.label}`);
              }}
            />
          ))}
        </ul>
      </section>

      <section className="rounded-md border border-border-subtle bg-bg-surface p-5">
        <h2 className="mb-3 text-h3 font-semibold text-fg-primary">Data rights (DPDP §11–14)</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <RightCard
            title="Download all my data"
            description="JSON + CSV bundle. Emailed when ready (~30 minutes)."
            actionLabel="Request export"
            onAction={async () => {
              const r = await exportData.mutateAsync();
              toast.success('Export queued', {
                description: `Job ${r.jobId} · expected by ${new Date(r.expectedAt).toLocaleTimeString()}`,
              });
            }}
            loading={exportData.isPending}
          />
          <RightCard
            title="Delete specific data"
            description="Per-category deletion (CV files, network reads, voice transcripts)."
            actionLabel="Open chooser"
            onAction={() => toast.info('Per-category deletion arrives sprint-2')}
          />
          <RightCard
            title="Pause processing"
            description="Stops all algorithmic use of your data. Manual flows still work."
            actionLabel="Pause"
            onAction={() => toast.info('Processing paused (mock)')}
          />
          <RightCard
            title="Contact our DPO"
            description={`${data.dpo.email} · grievance ${data.dpo.grievanceEmail} · 30-day SLA`}
            actionLabel="Email DPO"
            onAction={() => (window.location.href = `mailto:${data.dpo.email}`)}
          />
        </div>
      </section>

      <section className="rounded-md border border-border-subtle bg-bg-surface p-5">
        <h2 className="mb-3 text-h3 font-semibold text-fg-primary">Access log</h2>
        <p className="mb-4 text-caption text-fg-muted">Who and what accessed your data.</p>
        <ul className="divide-y divide-border-subtle text-body-s">
          {data.accessLog.map((e, i) => (
            <li key={i} className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0">
              <div>
                <p className="text-fg-primary">
                  <span className="font-medium">{e.actor}</span> — {e.action}
                </p>
                {e.device && <p className="text-caption text-fg-muted">{e.device}</p>}
              </div>
              <span className="shrink-0 text-caption tabular text-fg-muted">
                {new Date(e.at).toLocaleString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function DataSummary({ summary }: { summary: NonNullable<ReturnType<typeof useDPDP>['data']>['dataSummary'] }) {
  return (
    <section className="rounded-md border border-border-subtle bg-bg-surface p-5">
      <h2 className="mb-1 text-h3 font-semibold text-fg-primary">Data summary</h2>
      <p className="mb-4 text-caption text-fg-muted">
        {summary.storageMB.toFixed(0)} MB total · last accessed{' '}
        {new Date(summary.lastAccessedAt).toLocaleString('en-IN')}
      </p>
      <ul className="grid gap-2 text-body-s sm:grid-cols-2">
        <Bullet label="Identity" value={summary.identityFields.join(', ')} />
        <Bullet label="CV" value={`${summary.cvFiles} file · ${summary.cvVariants} variants`} />
        <Bullet label="Network" value={`${summary.networkRead} LinkedIn connections (read)`} />
        <Bullet label="Activity" value={`${summary.activityCount} applications`} />
        <Bullet label="Voice" value={`${summary.voiceAudio} audio (transcripts kept)`} />
        <Bullet label="Location" value={summary.locationCollected ? 'collected' : 'never collected'} />
      </ul>
    </section>
  );
}

function Bullet({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-baseline gap-2">
      <span className="text-caption font-semibold uppercase tracking-wide text-fg-muted">{label}</span>
      <span className="text-fg-primary">{value}</span>
    </li>
  );
}

function ConsentRow({
  consent,
  onToggle,
}: {
  consent: ConsentEntry;
  onToggle: (granted: boolean) => void;
}) {
  return (
    <li
      className={cn(
        'flex items-start justify-between gap-4 rounded-md border border-border-subtle bg-bg-surface p-3',
        consent.required && 'opacity-90',
      )}
    >
      <div>
        <p className="font-medium text-body-m text-fg-primary">
          {consent.label}
          {consent.required && (
            <span className="ml-2 rounded-pill bg-bg-raised px-1.5 py-0.5 text-caption text-fg-muted">
              required
            </span>
          )}
        </p>
        <p className="text-caption text-fg-muted">{consent.description}</p>
        {consent.grantedAt && (
          <p className="mt-1 text-caption text-fg-muted">
            Granted {new Date(consent.grantedAt).toLocaleDateString('en-IN')}
          </p>
        )}
      </div>
      <Switch
        checked={consent.granted}
        onCheckedChange={onToggle}
        disabled={consent.required && consent.granted}
      />
    </li>
  );
}

function RightCard({
  title,
  description,
  actionLabel,
  onAction,
  loading,
}: {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  loading?: boolean;
}) {
  return (
    <article className="rounded-md border border-border-subtle bg-bg-app p-4">
      <h3 className="font-medium text-body-m text-fg-primary">{title}</h3>
      <p className="mt-1 text-caption text-fg-muted">{description}</p>
      <Button size="sm" variant="ghost" className="mt-3" onClick={onAction} loading={loading}>
        {actionLabel}
      </Button>
    </article>
  );
}
