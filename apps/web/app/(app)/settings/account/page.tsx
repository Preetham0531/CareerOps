'use client';

import { useState } from 'react';
import { Button, Dialog, LoadingSpinner, Switch, toast } from '@careerops/ui';
import { useAccount, useDeleteAccount } from '@careerops/api-client';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/cn';

export default function AccountSettings() {
  const { data, isLoading } = useAccount();
  const del = useDeleteAccount();
  const signOut = useAuth((s) => s.signOut);
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmation, setConfirmation] = useState('');

  if (isLoading || !data) return <LoadingSpinner size="block" label="Loading…" />;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-display-l font-bold text-fg-primary">Account</h1>
        <p className="mt-2 text-body-m text-fg-secondary">Email, phone, sessions, deletion.</p>
      </header>

      <section className="rounded-md border border-border-subtle bg-bg-surface p-6 space-y-4">
        <Row label="Email">
          <span className="text-body-m text-fg-primary">{data.email}</span>
          <span
            className={cn(
              'rounded-pill px-2 py-0.5 text-caption font-medium',
              data.emailVerified ? 'bg-success-bg text-brand' : 'bg-warning-bg text-warning',
            )}
          >
            {data.emailVerified ? 'verified' : 'unverified'}
          </span>
        </Row>
        <Row label="Phone">
          <span className="text-body-m text-fg-primary">{data.phone}</span>
          <span
            className={cn(
              'rounded-pill px-2 py-0.5 text-caption font-medium',
              data.phoneVerified ? 'bg-success-bg text-brand' : 'bg-warning-bg text-warning',
            )}
          >
            {data.phoneVerified ? 'verified' : 'unverified'}
          </span>
        </Row>
      </section>

      <section className="rounded-md border border-border-subtle bg-bg-surface p-6 space-y-4">
        <h2 className="text-h3 font-semibold text-fg-primary">Security</h2>
        <label className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-fg-primary">Two-factor authentication</p>
            <p className="text-caption text-fg-muted">SMS or authenticator app (sprint-2).</p>
          </div>
          <Switch
            checked={data.twoFactorEnabled}
            onCheckedChange={() => toast.info('2FA setup arrives in sprint-2')}
          />
        </label>
      </section>

      <section className="rounded-md border border-border-subtle bg-bg-surface p-6">
        <h2 className="mb-3 text-h3 font-semibold text-fg-primary">Active sessions</h2>
        <ul className="divide-y divide-border-subtle">
          {data.activeSessions.map((s) => (
            <li key={s.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <p className="text-body-m text-fg-primary">
                  {s.device}
                  {s.current && (
                    <span className="ml-2 rounded-pill bg-success-bg px-2 py-0.5 text-caption font-medium text-brand">
                      current
                    </span>
                  )}
                </p>
                <p className="text-caption text-fg-muted">
                  Last active {new Date(s.lastActive).toLocaleString('en-IN')}
                </p>
              </div>
              {!s.current && (
                <Button size="sm" variant="ghost" onClick={() => toast.success('Session signed out')}>
                  Sign out
                </Button>
              )}
            </li>
          ))}
        </ul>
        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => {
            signOut();
            router.push('/');
          }}
        >
          Sign out everywhere
        </Button>
      </section>

      <section className="rounded-md border border-danger/40 bg-danger-bg/30 p-6">
        <h2 className="text-h3 font-semibold text-danger">Delete account</h2>
        <p className="mt-2 text-body-s text-fg-secondary">
          DPDP right of erasure. Soft-deletes for 30 days; permanent delete after.
        </p>
        <Button variant="danger" className="mt-4" onClick={() => setConfirmOpen(true)}>
          Delete my account
        </Button>
      </section>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <Dialog.Content size="md">
          <Dialog.Header>
            <Dialog.Title>Delete account permanently?</Dialog.Title>
            <Dialog.Description>
              Type <span className="font-mono font-semibold">DELETE</span> to confirm. We'll soft-delete
              for 30 days; you can recover by signing in again before then.
            </Dialog.Description>
          </Dialog.Header>
          <input
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder="Type DELETE"
            className="h-10 rounded-md border border-border-default bg-bg-surface px-3 text-body-m outline-none focus-visible:border-danger"
          />
          <Dialog.Footer>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={confirmation !== 'DELETE'}
              loading={del.isPending}
              onClick={async () => {
                await del.mutateAsync();
                toast.success('Account scheduled for deletion');
                signOut();
                router.push('/');
              }}
            >
              Delete account
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-caption font-semibold uppercase tracking-wide text-fg-muted">
        {label}
      </span>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
