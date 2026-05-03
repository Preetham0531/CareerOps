'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Chip, Slider, Checkbox } from '@careerops/ui';

import { useOnboarding, deriveFilterDefaults } from '@/features/onboarding/store';
import type { FilterState } from '@/features/onboarding/types';
import { StepProgress } from '@/components/onboarding/StepProgress';
import { RequireAuth } from '@/components/RequireAuth';

const KNOWN_CITIES: Array<{ city: string; tier: 1 | 2 | 3 }> = [
  { city: 'Bangalore', tier: 1 },
  { city: 'Mumbai', tier: 1 },
  { city: 'Hyderabad', tier: 1 },
  { city: 'Pune', tier: 1 },
  { city: 'Chennai', tier: 1 },
  { city: 'Delhi NCR', tier: 1 },
  { city: 'Ahmedabad', tier: 2 },
  { city: 'Coimbatore', tier: 2 },
  { city: 'Jaipur', tier: 2 },
];

function FiltersInner() {
  const router = useRouter();
  const setFilters = useOnboarding((s) => s.setFilters);
  const markCompleted = useOnboarding((s) => s.markCompleted);
  const resume = useOnboarding((s) => s.resume);

  const [state, setState] = useState<FilterState>(() => deriveFilterDefaults(resume));
  const [roleDraft, setRoleDraft] = useState('');

  function addRole() {
    if (!roleDraft.trim()) return;
    setState((s) => ({ ...s, roles: [...s.roles, roleDraft.trim()] }));
    setRoleDraft('');
  }

  function toggleCity(city: { city: string; tier: 1 | 2 | 3 }) {
    setState((s) => {
      const present = s.cities.some((c) => c.city === city.city);
      return {
        ...s,
        cities: present ? s.cities.filter((c) => c.city !== city.city) : [...s.cities, city],
      };
    });
  }

  function toggleMode(mode: 'remote' | 'hybrid' | 'onsite') {
    setState((s) => ({
      ...s,
      workMode: s.workMode.includes(mode)
        ? s.workMode.filter((m) => m !== mode)
        : [...s.workMode, mode],
    }));
  }

  function handleContinue() {
    setFilters(state);
    markCompleted(4);
    router.push('/start/network');
  }

  return (
    <main className="container max-w-2xl py-10">
      <StepProgress current={4} onSkip={() => router.push('/start/network')} />

      <div className="mt-10 space-y-8">
        <h1 className="font-display text-display-l font-bold text-fg-primary">
          What are you looking for?
        </h1>

        {/* Roles */}
        <Section label="Roles">
          <div className="flex flex-wrap items-center gap-2">
            {state.roles.map((r) => (
              <Chip
                key={r}
                variant="brand"
                onRemove={() =>
                  setState((s) => ({ ...s, roles: s.roles.filter((x) => x !== r) }))
                }
              >
                {r}
              </Chip>
            ))}
            <input
              value={roleDraft}
              onChange={(e) => setRoleDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addRole();
                }
              }}
              placeholder="+ add role"
              className="h-7 rounded-md border border-border-subtle bg-bg-surface px-2 text-body-s text-fg-primary outline-none focus-visible:border-brand"
            />
          </div>
        </Section>

        {/* Cities */}
        <Section label="Location">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {KNOWN_CITIES.map((c) => {
              const checked = state.cities.some((x) => x.city === c.city);
              return (
                <label
                  key={c.city}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-border-subtle bg-bg-surface px-3 py-2 transition-colors hover:border-border-default has-[:checked]:border-brand"
                >
                  <Checkbox checked={checked} onCheckedChange={() => toggleCity(c)} />
                  <span className="text-body-s text-fg-primary">
                    {c.city} <span className="text-fg-muted">· T{c.tier}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </Section>

        {/* Salary */}
        <Section label="Salary range">
          <Slider
            min={5}
            max={120}
            step={1}
            value={[state.lpa.min, state.lpa.max]}
            onValueChange={([min, max]) =>
              setState((s) => ({ ...s, lpa: { min: min!, max: max! } }))
            }
          />
          <p className="mt-2 text-body-s text-fg-secondary tabular">
            ₹{state.lpa.min}L – ₹{state.lpa.max}L
          </p>
        </Section>

        {/* Work mode */}
        <Section label="Work mode">
          <div className="flex gap-2">
            {(['remote', 'hybrid', 'onsite'] as const).map((m) => (
              <Chip
                key={m}
                variant={state.workMode.includes(m) ? 'brand' : 'outline'}
                onClick={() => toggleMode(m)}
                className="cursor-pointer capitalize"
              >
                {m}
              </Chip>
            ))}
          </div>
        </Section>

        <Button size="lg" onClick={handleContinue}>
          Continue ›
        </Button>
      </div>
    </main>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-h3 font-semibold text-fg-primary">{label}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default function FiltersPage() {
  return (
    <RequireAuth>
      <FiltersInner />
    </RequireAuth>
  );
}
