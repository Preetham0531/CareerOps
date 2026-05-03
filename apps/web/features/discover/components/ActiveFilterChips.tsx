'use client';

import { Chip } from '@careerops/ui';

import { useDiscoverUrlState } from '../url-state';

export function ActiveFilterChips() {
  const [s, set] = useDiscoverUrlState();

  const chips: Array<{ key: string; label: string; onRemove: () => void }> = [];

  s.roles.forEach((r) =>
    chips.push({
      key: `role:${r}`,
      label: r,
      onRemove: () => set({ roles: s.roles.filter((x) => x !== r) }),
    }),
  );
  s.cities.forEach((c) =>
    chips.push({
      key: `city:${c}`,
      label: c,
      onRemove: () => set({ cities: s.cities.filter((x) => x !== c) }),
    }),
  );
  s.workMode.forEach((m) =>
    chips.push({
      key: `mode:${m}`,
      label: m.charAt(0).toUpperCase() + m.slice(1),
      onRemove: () => set({ workMode: s.workMode.filter((x) => x !== m) }),
    }),
  );
  s.sources.forEach((src) =>
    chips.push({
      key: `src:${src}`,
      label: src,
      onRemove: () => set({ sources: s.sources.filter((x) => x !== src) }),
    }),
  );
  if (s.lpaMin > 5 || s.lpaMax < 80) {
    chips.push({
      key: 'lpa',
      label: `₹${s.lpaMin}–${s.lpaMax}L`,
      onRemove: () => set({ lpaMin: 5, lpaMax: 80 }),
    });
  }
  if (s.expMin > 0 || s.expMax < 15) {
    chips.push({
      key: 'exp',
      label: `${s.expMin}–${s.expMax}y`,
      onRemove: () => set({ expMin: 0, expMax: 15 }),
    });
  }
  if (s.remoteOnly) {
    chips.push({
      key: 'remote',
      label: 'Remote only',
      onRemove: () => set({ remoteOnly: false }),
    });
  }
  if (s.hideGhostAbove < 100) {
    chips.push({
      key: 'ghost',
      label: `Hide ghost ≥ ${s.hideGhostAbove}%`,
      onRemove: () => set({ hideGhostAbove: 100 }),
    });
  }
  if (s.hideBondBench) {
    chips.push({
      key: 'bond',
      label: 'No bond/bench',
      onRemove: () => set({ hideBondBench: false }),
    });
  }
  if (s.onlyWithReferral) {
    chips.push({
      key: 'ref',
      label: 'Has referral',
      onRemove: () => set({ onlyWithReferral: false }),
    });
  }

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border-subtle bg-bg-app px-4 py-3 lg:px-0">
      {chips.map((c) => (
        <Chip key={c.key} variant="neutral" size="sm" onRemove={c.onRemove}>
          {c.label}
        </Chip>
      ))}
    </div>
  );
}
