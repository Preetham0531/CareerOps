'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Radio, RadioGroupItem } from '@careerops/ui';

import { useOnboarding } from '@/features/onboarding/store';
import type { Persona, Priority, Urgency } from '@/features/onboarding/types';
import { StepProgress } from '@/components/onboarding/StepProgress';
import { RequireAuth } from '@/components/RequireAuth';

const PERSONAS: Array<{ value: Persona; label: string }> = [
  { value: 'employed-quiet', label: 'Currently employed, looking quietly' },
  { value: 'active', label: 'Actively searching, not yet placed' },
  { value: 'fresher', label: 'Fresher / recent graduate' },
  { value: 'returner', label: 'Returning to work after a break' },
  { value: 'exploring', label: 'Just exploring' },
];

const URGENCIES: Array<{ value: Urgency; label: string }> = [
  { value: 'this-week', label: 'Today / this week' },
  { value: 'this-month', label: 'Within a month' },
  { value: '1-3m', label: '1–3 months' },
  { value: 'open', label: 'No specific timeline' },
];

const PRIORITIES: Array<{ value: Priority; label: string }> = [
  { value: 'comp', label: 'Better compensation' },
  { value: 'company', label: 'Better company / role' },
  { value: 'flex', label: 'Remote / hybrid flexibility' },
  { value: 'change', label: 'Career change' },
  { value: 'first-job', label: 'First job' },
];

function PersonaInner() {
  const router = useRouter();
  const setPersonaAnswers = useOnboarding((s) => s.setPersonaAnswers);
  const markCompleted = useOnboarding((s) => s.markCompleted);

  const [persona, setPersona] = useState<Persona | undefined>();
  const [urgency, setUrgency] = useState<Urgency | undefined>();
  const [priority, setPriority] = useState<Priority | undefined>();

  const canContinue = persona && urgency && priority;

  function handleContinue() {
    if (!canContinue) return;
    setPersonaAnswers({ persona, urgency, priority });
    markCompleted(2);
    router.push('/start/resume');
  }

  return (
    <main className="container max-w-2xl py-10">
      <StepProgress current={2} onSkip={() => router.push('/start/resume')} />
      <div className="mt-10 space-y-10">
        <h1 className="font-display text-display-l font-bold text-fg-primary">
          Where are you in your search?
        </h1>

        <Question label="Where are you in your search?">
          <Radio value={persona} onValueChange={(v) => setPersona(v as Persona)}>
            {PERSONAS.map(({ value, label }) => (
              <RadioRow key={value} value={value} label={label} />
            ))}
          </Radio>
        </Question>

        <Question label="How urgent is this?">
          <Radio value={urgency} onValueChange={(v) => setUrgency(v as Urgency)}>
            {URGENCIES.map(({ value, label }) => (
              <RadioRow key={value} value={value} label={label} />
            ))}
          </Radio>
        </Question>

        <Question label="What's your top priority?">
          <Radio value={priority} onValueChange={(v) => setPriority(v as Priority)}>
            {PRIORITIES.map(({ value, label }) => (
              <RadioRow key={value} value={value} label={label} />
            ))}
          </Radio>
        </Question>

        <Button size="lg" disabled={!canContinue} onClick={handleContinue}>
          Continue ›
        </Button>
      </div>
    </main>
  );
}

function Question({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-h3 font-semibold text-fg-primary">{label}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function RadioRow({ value, label }: { value: string; label: string }) {
  const id = `radio-${value}`;
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 rounded-md border border-border-subtle bg-bg-surface px-4 py-3 transition-colors hover:border-border-default has-[:checked]:border-brand has-[:checked]:bg-success-bg/40"
    >
      <RadioGroupItem id={id} value={value} />
      <span className="text-body-m text-fg-primary">{label}</span>
    </label>
  );
}

export default function PersonaPage() {
  return (
    <RequireAuth>
      <PersonaInner />
    </RequireAuth>
  );
}
