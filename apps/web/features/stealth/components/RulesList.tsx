'use client';

import { Switch } from '@careerops/ui';

import type { StealthRules } from '@careerops/api-client';

interface RulesListProps {
  rules: StealthRules;
  onChange: (key: keyof StealthRules, value: boolean) => void;
}

const ENTRIES: Array<{ key: keyof StealthRules; label: string; description: string }> = [
  {
    key: 'hideFromCurrentEmployer',
    label: 'Hide profile from current employer',
    description: 'Block visibility from your current company domain.',
  },
  {
    key: 'blockRecruiters',
    label: 'Block company recruiters',
    description: 'Prevent recruiters from your current employer from finding you in search.',
  },
  {
    key: 'pseudonymCV',
    label: 'Use pseudonym CV variant',
    description: 'Default to a CV that strips your current employer’s name.',
  },
  {
    key: 'offHoursOnly',
    label: 'Send applies in off-hours window only',
    description: 'Outbound activity confined to a configurable window.',
  },
  {
    key: 'disableLinkedInUpdates',
    label: 'Disable “share profile updates” on LinkedIn',
    description: 'Prevents resume tweaks broadcasting.',
  },
  {
    key: 'stripEmployerFromCV',
    label: 'Strip current employer name from CV',
    description: 'Replaces with a sector descriptor.',
  },
  {
    key: 'blockOAuthEmails',
    label: 'Hide current-employer-domain emails in OAuth',
    description: 'Won’t use your work email to sign in to portals.',
  },
  {
    key: 'muteWorkHours',
    label: 'Mute notifications during work hours',
    description: '9–18 IST default. Adjust in notifications.',
  },
  {
    key: 'pauseDuringWorkHours',
    label: 'Pause auto-apply during 9–18 IST',
    description: 'Holds off on automated applies during your work day.',
  },
];

export function RulesList({ rules, onChange }: RulesListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {ENTRIES.map(({ key, label, description }) => (
        <li
          key={key}
          className="flex items-start justify-between gap-4 rounded-md border border-border-subtle bg-bg-surface p-4"
        >
          <div>
            <p className="font-medium text-body-m text-fg-primary">{label}</p>
            <p className="mt-0.5 text-caption text-fg-muted">{description}</p>
          </div>
          <Switch
            checked={Boolean(rules[key])}
            onCheckedChange={(v) => onChange(key, v)}
          />
        </li>
      ))}
    </ul>
  );
}
