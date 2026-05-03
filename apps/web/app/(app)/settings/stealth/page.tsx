'use client';

import { Kbd, LoadingSpinner, Switch, toast } from '@careerops/ui';
import { useStealth, useUpdateStealth, type StealthRules } from '@careerops/api-client';
import { StealthMask } from '@careerops/icons';

import { useStealthStore } from '@/features/stealth/store';
import { RulesList } from '@/features/stealth/components/RulesList';
import { EmployerPreview } from '@/features/stealth/components/EmployerPreview';
import { ActivityLog } from '@/features/stealth/components/ActivityLog';

export default function StealthPanel() {
  const { data, isLoading } = useStealth();
  const update = useUpdateStealth();
  const setEnabled = useStealthStore((s) => s.setEnabled);

  if (isLoading || !data) {
    return (
      <div className="container py-12">
        <LoadingSpinner size="block" label="Loading stealth state…" />
      </div>
    );
  }

  function patch(rules: Partial<StealthRules>) {
    update.mutate(rules, {
      onSuccess: (snap) => {
        if ('enabled' in rules) {
          setEnabled(snap.rules.enabled);
        }
      },
    });
  }

  return (
    <div className="container py-10">
      <header className="mb-6 flex flex-col items-start gap-3">
        <span className="inline-flex items-center gap-1 rounded-pill border border-accent/40 bg-warning-bg px-2 py-0.5 text-caption font-medium text-accent">
          <StealthMask size={14} /> Stealth
        </span>
        <h1 className="font-display text-display-l font-bold text-fg-primary">Stealth mode</h1>
        <p className="max-w-2xl text-body-m text-fg-secondary">
          Quick-hide hotkey: <Kbd>⌘</Kbd> <Kbd>⇧</Kbd> <Kbd>H</Kbd> swaps the screen instantly.
          Press any of those keys (or <Kbd>Esc</Kbd>) to return.
        </p>
      </header>

      <section className="mb-6 flex items-center justify-between gap-4 rounded-md border border-border-subtle bg-bg-surface p-5">
        <div>
          <p className="font-medium text-fg-primary">
            {data.rules.enabled ? 'Stealth is ON' : 'Stealth is OFF'}
          </p>
          <p className="text-caption text-fg-muted">
            {data.rules.enabled
              ? 'Pseudonym CV active · off-hours queue · current-employer blocked.'
              : 'Activity is visible to your current employer. Toggle to enable stealth.'}
          </p>
        </div>
        <Switch
          checked={data.rules.enabled}
          onCheckedChange={(v) => {
            patch({ enabled: v });
            toast.success(v ? 'Stealth enabled' : 'Stealth disabled', {
              description: v ? 'Pseudonym CV active' : 'Profile is visible again',
            });
          }}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <EmployerPreview snapshot={data} />
          <section>
            <h2 className="mb-3 text-h3 font-semibold text-fg-primary">Rules</h2>
            <RulesList rules={data.rules} onChange={(k, v) => patch({ [k]: v })} />
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-md border border-border-subtle bg-bg-surface p-5">
            <h2 className="mb-2 text-h3 font-semibold text-fg-primary">Off-hours window</h2>
            <p className="text-body-s text-fg-secondary">
              Default 22:00 – 07:00 IST. Outbound activity (applies, DMs, profile updates) is
              confined to this window.
            </p>
            <p className="mt-3 font-mono text-body-s tabular text-fg-primary">
              {data.rules.offHoursWindow.start} – {data.rules.offHoursWindow.end}
            </p>
          </section>
          <ActivityLog entries={data.activityLog} />
        </aside>
      </div>
    </div>
  );
}
