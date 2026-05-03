import { Button } from '@careerops/ui';

export default function HelpSettings() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-display-l font-bold text-fg-primary">Help</h1>
        <p className="mt-2 text-body-m text-fg-secondary">Articles, feedback, status, support.</p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {[
          { label: 'Help articles', sub: 'Searchable in ⌘K too.' },
          { label: 'Submit feedback', sub: 'Bug reports + ideas.' },
          { label: 'Status page', sub: 'Live system status.' },
          { label: 'Contact support', sub: 'support@careerops.in · 30-day SLA on DPDP queries.' },
        ].map((it) => (
          <li
            key={it.label}
            className="rounded-md border border-border-subtle bg-bg-surface p-4"
          >
            <p className="font-medium text-fg-primary">{it.label}</p>
            <p className="mt-1 text-caption text-fg-muted">{it.sub}</p>
            <Button size="sm" variant="ghost" className="mt-3">
              Open
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
