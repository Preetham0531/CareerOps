'use client';

import { Button, LoadingSpinner } from '@careerops/ui';
import { useIntegrations, useToggleIntegration, type Integration } from '@careerops/api-client';

import { cn } from '@/lib/cn';

const STATUS_BADGE: Record<Integration['status'], { label: string; className: string }> = {
  connected: { label: 'Connected', className: 'bg-success-bg text-brand' },
  expired: { label: 'Expired', className: 'bg-warning-bg text-warning' },
  error: { label: 'Error', className: 'bg-danger-bg text-danger' },
  disconnected: { label: 'Disconnected', className: 'bg-bg-raised text-fg-secondary' },
};

export default function IntegrationsSettings() {
  const { data, isLoading } = useIntegrations();
  const toggle = useToggleIntegration();

  if (isLoading || !data) return <LoadingSpinner size="block" label="Loading…" />;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-display-l font-bold text-fg-primary">Integrations</h1>
        <p className="mt-2 text-body-m text-fg-secondary">
          Each integration shows scope, last sync, and expiry. Disconnect any time.
        </p>
      </header>

      <ul className="grid gap-3">
        {data.map((it) => (
          <li
            key={it.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border-subtle bg-bg-surface p-4"
          >
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 font-medium text-body-m text-fg-primary">
                {it.label}
                <span
                  className={cn(
                    'rounded-pill px-2 py-0.5 text-caption font-medium',
                    STATUS_BADGE[it.status].className,
                  )}
                >
                  {STATUS_BADGE[it.status].label}
                </span>
              </p>
              <p className="mt-1 text-caption text-fg-muted">
                {it.description}
                {it.lastSync && ` · last sync ${new Date(it.lastSync).toLocaleString('en-IN')}`}
              </p>
              {it.scopes.length > 0 && (
                <p className="mt-1 text-caption text-fg-muted">
                  Scopes: {it.scopes.join(' · ')}
                </p>
              )}
            </div>
            {it.status === 'connected' || it.status === 'expired' ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => toggle.mutate({ id: it.id, action: 'disconnect' })}
              >
                Disconnect
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => toggle.mutate({ id: it.id, action: 'connect' })}
              >
                Connect
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
