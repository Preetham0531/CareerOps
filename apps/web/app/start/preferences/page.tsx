'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Switch } from '@careerops/ui';

import { useOnboarding } from '@/features/onboarding/store';
import type { PreferencesState } from '@/features/onboarding/types';
import { StepProgress } from '@/components/onboarding/StepProgress';
import { RequireAuth } from '@/components/RequireAuth';

function PreferencesInner() {
  const router = useRouter();
  const persona = useOnboarding((s) => s.persona);
  const setPreferences = useOnboarding((s) => s.setPreferences);
  const markCompleted = useOnboarding((s) => s.markCompleted);

  const [prefs, setPrefs] = useState<PreferencesState>({
    stealth: persona === 'employed-quiet',
    digestEmail: true,
    digestTime: '06:00',
    whatsAppOnHighMatch: false,
    pushEnabled: false,
    voiceEnabled: false,
  });

  function handleFinish() {
    setPreferences(prefs);
    markCompleted(6);
    router.push('/dashboard');
  }

  return (
    <main className="container max-w-2xl py-10">
      <StepProgress current={6} />

      <div className="mt-10 space-y-8">
        <h1 className="font-display text-display-l font-bold text-fg-primary">
          Set your defaults
        </h1>

        <ToggleRow
          label="Stealth mode"
          description="Hide profile from current employer · use pseudonym CV variant · send applies after-hours."
          value={prefs.stealth}
          onChange={(v) => setPrefs({ ...prefs, stealth: v })}
        />
        <ToggleRow
          label="Email digest"
          description="One short email at 06:00 IST with today's matches."
          value={prefs.digestEmail}
          onChange={(v) => setPrefs({ ...prefs, digestEmail: v })}
        />
        <ToggleRow
          label="WhatsApp on high-match (≥ 90%)"
          description="A nudge only when something really fits."
          value={prefs.whatsAppOnHighMatch}
          onChange={(v) => setPrefs({ ...prefs, whatsAppOnHighMatch: v })}
        />
        <ToggleRow
          label="Push notifications"
          description="Off by default — opt in if you want them."
          value={prefs.pushEnabled}
          onChange={(v) => setPrefs({ ...prefs, pushEnabled: v })}
        />
        <ToggleRow
          label="Voice (Hindi · English · Tamil · Telugu)"
          description="Voice queries + interview mock."
          value={prefs.voiceEnabled}
          onChange={(v) => setPrefs({ ...prefs, voiceEnabled: v })}
        />

        <Button size="xl" onClick={handleFinish}>
          Take me in ›
        </Button>
      </div>
    </main>
  );
}

function ToggleRow({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-md border border-border-subtle bg-bg-surface px-4 py-3">
      <div>
        <p className="font-medium text-fg-primary">{label}</p>
        <p className="text-caption text-fg-muted">{description}</p>
      </div>
      <Switch checked={value} onCheckedChange={onChange} />
    </label>
  );
}

export default function PreferencesPage() {
  return (
    <RequireAuth>
      <PreferencesInner />
    </RequireAuth>
  );
}
