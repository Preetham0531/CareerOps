'use client';

import { Checkbox, Chip, Slider, Switch } from '@careerops/ui';

import { useDiscoverUrlState } from '../url-state';

const KNOWN_CITIES = [
  { city: 'Bangalore', tier: 1 },
  { city: 'Mumbai', tier: 1 },
  { city: 'Hyderabad', tier: 1 },
  { city: 'Pune', tier: 1 },
  { city: 'Delhi NCR', tier: 1 },
  { city: 'Chennai', tier: 1 },
  { city: 'Coimbatore', tier: 2 },
  { city: 'Jaipur', tier: 2 },
];
const SOURCES = ['naukri', 'linkedin', 'foundit', 'instahyre'];
const WORK_MODES: Array<'remote' | 'hybrid' | 'onsite'> = ['remote', 'hybrid', 'onsite'];

export function FilterRail({ counts }: { counts?: { total: number } }) {
  const [s, set] = useDiscoverUrlState();

  function toggleArr<K extends 'roles' | 'cities' | 'sources'>(key: K, value: string) {
    void set({
      [key]: s[key].includes(value)
        ? s[key].filter((x: string) => x !== value)
        : [...s[key], value],
    } as Parameters<typeof set>[0]);
  }

  function toggleMode(mode: 'remote' | 'hybrid' | 'onsite') {
    void set({
      workMode: s.workMode.includes(mode)
        ? s.workMode.filter((m) => m !== mode)
        : [...s.workMode, mode],
    });
  }

  function reset() {
    void set({
      query: '',
      roles: [],
      cities: [],
      remoteOnly: false,
      lpaMin: 5,
      lpaMax: 80,
      expMin: 0,
      expMax: 15,
      workMode: [],
      sources: [],
      hideGhostAbove: 100,
      hideBondBench: false,
      onlyWithReferral: false,
    });
  }

  return (
    <aside aria-label="Filters" className="space-y-6 p-1">
      <div>
        <input
          aria-label="Search"
          value={s.query}
          onChange={(e) => set({ query: e.target.value })}
          placeholder="Search jobs, companies, cities…"
          className="h-9 w-full rounded-md border border-border-default bg-bg-surface px-3 text-body-s outline-none focus-visible:border-brand"
        />
      </div>

      {/* Roles */}
      <Section label="Roles">
        <div className="flex flex-wrap gap-1.5">
          {['Backend', 'Frontend', 'Senior SDE', 'Staff', 'EM'].map((r) => (
            <Chip
              key={r}
              variant={s.roles.includes(r) ? 'brand' : 'outline'}
              onClick={() => toggleArr('roles', r)}
              className="cursor-pointer"
            >
              {r}
            </Chip>
          ))}
        </div>
      </Section>

      {/* Cities */}
      <Section label="Location">
        <div className="space-y-1">
          {KNOWN_CITIES.map((c) => (
            <label
              key={c.city}
              className="flex items-center gap-2 rounded-sm px-1 py-1 text-body-s text-fg-primary hover:bg-bg-raised"
            >
              <Checkbox
                checked={s.cities.includes(c.city)}
                onCheckedChange={() => toggleArr('cities', c.city)}
              />
              <span>
                {c.city} <span className="text-fg-muted">· T{c.tier}</span>
              </span>
            </label>
          ))}
        </div>
        <label className="mt-2 flex items-center gap-2 rounded-sm px-1 py-1 text-body-s text-fg-primary hover:bg-bg-raised">
          <Checkbox checked={s.remoteOnly} onCheckedChange={(v) => set({ remoteOnly: !!v })} />
          Remote only
        </label>
      </Section>

      {/* LPA */}
      <Section label="Salary range">
        <Slider
          min={5}
          max={150}
          step={1}
          value={[s.lpaMin, s.lpaMax]}
          onValueChange={([min, max]) => set({ lpaMin: min!, lpaMax: max! })}
        />
        <p className="mt-2 text-caption tabular text-fg-secondary">
          ₹{s.lpaMin}L – ₹{s.lpaMax}L
        </p>
      </Section>

      {/* Experience */}
      <Section label="Experience">
        <Slider
          min={0}
          max={20}
          step={1}
          value={[s.expMin, s.expMax]}
          onValueChange={([min, max]) => set({ expMin: min!, expMax: max! })}
        />
        <p className="mt-2 text-caption tabular text-fg-secondary">
          {s.expMin}–{s.expMax}y
        </p>
      </Section>

      {/* Work mode */}
      <Section label="Work mode">
        <div className="flex gap-1.5">
          {WORK_MODES.map((m) => (
            <Chip
              key={m}
              variant={s.workMode.includes(m) ? 'brand' : 'outline'}
              onClick={() => toggleMode(m)}
              className="cursor-pointer capitalize"
            >
              {m}
            </Chip>
          ))}
        </div>
      </Section>

      {/* Sources */}
      <Section label="Source">
        <div className="grid grid-cols-2 gap-1">
          {SOURCES.map((src) => (
            <label
              key={src}
              className="flex items-center gap-2 rounded-sm px-1 py-1 text-body-s capitalize text-fg-primary hover:bg-bg-raised"
            >
              <Checkbox
                checked={s.sources.includes(src)}
                onCheckedChange={() => toggleArr('sources', src)}
              />
              {src}
            </label>
          ))}
        </div>
      </Section>

      {/* Quality filters — gold-tagged when active */}
      <Section label="Quality">
        <ToggleRow
          label="Hide ghost listings"
          subLabel={`${s.hideGhostAbove}% +`}
          checked={s.hideGhostAbove < 100}
          onChange={(v) => set({ hideGhostAbove: v ? 60 : 100 })}
        />
        <ToggleRow
          label="Hide bond / bench"
          checked={s.hideBondBench}
          onChange={(v) => set({ hideBondBench: v })}
        />
        <ToggleRow
          label="Only with referral path"
          checked={s.onlyWithReferral}
          onChange={(v) => set({ onlyWithReferral: v })}
        />
      </Section>

      <div className="flex items-center justify-between border-t border-border-subtle pt-4 text-caption">
        <span className="text-fg-muted">{counts ? `${counts.total} jobs match` : ''}</span>
        <button
          type="button"
          onClick={reset}
          className="font-medium text-fg-secondary hover:text-fg-primary"
        >
          Reset all
        </button>
      </div>
    </aside>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-caption font-semibold uppercase tracking-wide text-fg-muted">
        {label}
      </h3>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  subLabel,
  checked,
  onChange,
}: {
  label: string;
  subLabel?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-2 px-1 py-1.5 text-body-s text-fg-primary">
      <span>
        {label}
        {subLabel && checked && <span className="ml-2 text-caption text-accent">{subLabel}</span>}
      </span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}
