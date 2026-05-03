'use client';

import { Select } from '@careerops/ui';

import { useDiscoverUrlState } from '../url-state';

const OPTIONS = [
  { value: 'match', label: 'Best match' },
  { value: 'newest', label: 'Newest' },
  { value: 'lpa-desc', label: 'Highest LPA' },
  { value: 'response-rate', label: 'Most likely to respond' },
] as const;

export function SortDropdown() {
  const [s, set] = useDiscoverUrlState();

  return (
    <Select
      value={s.sort}
      onValueChange={(v) => set({ sort: v as (typeof OPTIONS)[number]['value'] })}
    >
      <Select.Trigger size="sm" className="w-48">
        <Select.Value />
      </Select.Trigger>
      <Select.Content>
        {OPTIONS.map((o) => (
          <Select.Item key={o.value} value={o.value}>
            {o.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
}
