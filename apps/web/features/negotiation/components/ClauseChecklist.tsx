'use client';

import { Checkbox } from '@careerops/ui';

interface ClauseChecklistProps {
  selected: string[];
  onChange: (next: string[]) => void;
}

const CLAUSES: Array<{ id: string; label: string; tooltip: string }> = [
  { id: 'joining', label: 'Joining bonus push', tooltip: 'Often easier to push than base. ₹2–10L typical.' },
  { id: 'esop-cliff', label: 'ESOP cliff acceleration on layoff', tooltip: '1y standard; push for accelerated.' },
  { id: 'notice-buyout', label: 'Notice-period buyout', tooltip: 'Employer covers your current notice (₹0–8L).' },
  { id: 'variable-fixed', label: 'Push variable into fixed', tooltip: 'Higher fixed % means more guaranteed take-home.' },
  { id: 'wfh', label: 'WFH days in writing', tooltip: 'Lock 3 days/wk WFH explicitly, not "manager discretion".' },
  { id: 'reeval', label: 'Re-eval in 6 months', tooltip: 'For borderline offers — agreed comp review.' },
  { id: 'stock-refresh', label: 'Sign-on stock refresh', tooltip: 'Annual top-up of vesting RSUs.' },
  { id: 'dependents', label: 'Health insurance — dependents', tooltip: 'Covers parents (significant in India).' },
  { id: 'relocation', label: 'Relocation allowance', tooltip: 'One-time move stipend.' },
];

export function ClauseChecklist({ selected, onChange }: ClauseChecklistProps) {
  function toggle(id: string) {
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  }
  return (
    <ul className="grid gap-2 md:grid-cols-2">
      {CLAUSES.map((c) => (
        <li key={c.id}>
          <label
            className="flex cursor-pointer items-start gap-3 rounded-md border border-border-subtle bg-bg-surface p-3 transition-colors hover:border-border-default has-[:checked]:border-brand has-[:checked]:bg-success-bg/40"
            title={c.tooltip}
          >
            <Checkbox checked={selected.includes(c.id)} onCheckedChange={() => toggle(c.id)} />
            <div>
              <p className="font-medium text-body-s text-fg-primary">{c.label}</p>
              <p className="text-caption text-fg-muted">{c.tooltip}</p>
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
}
