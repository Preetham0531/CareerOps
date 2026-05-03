'use client';

import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { Button, toast } from '@careerops/ui';
import { EvidenceLeaf } from '@careerops/icons';

import { useOnboarding } from '@/features/onboarding/store';
import type { ConnectionsState } from '@/features/onboarding/types';
import { StepProgress } from '@/components/onboarding/StepProgress';
import { RequireAuth } from '@/components/RequireAuth';

const PROVIDERS: Array<{ key: keyof ConnectionsState; label: string; required?: boolean; hint: string }> = [
  { key: 'linkedin', label: 'LinkedIn', required: true, hint: 'For referral paths' },
  { key: 'naukri', label: 'Naukri', hint: 'Indian portal coverage' },
  { key: 'github', label: 'GitHub', hint: 'Skill-claim evidence' },
  { key: 'leetcode', label: 'LeetCode', hint: 'DSA + ranking signal' },
  { key: 'kaggle', label: 'Kaggle', hint: 'ML evidence' },
];

function NetworkInner() {
  const router = useRouter();
  const connections = useOnboarding((s) => s.connections);
  const setConnection = useOnboarding((s) => s.setConnection);
  const markCompleted = useOnboarding((s) => s.markCompleted);

  function fakeConnect(key: keyof ConnectionsState) {
    setConnection(key, true);
    toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} connected`);
  }

  function handleContinue() {
    markCompleted(5);
    router.push('/start/preferences');
  }

  return (
    <main className="container max-w-2xl py-10">
      <StepProgress current={5} onSkip={() => router.push('/start/preferences')} />
      <div className="mt-10 space-y-6">
        <div>
          <h1 className="font-display text-display-l font-bold text-fg-primary">
            Connect your network
          </h1>
          <p className="mt-2 text-body-m text-fg-secondary">
            Most Indian hires happen through referrals. We'll find paths into target companies — but
            we need access to your network first.
          </p>
        </div>

        <ul className="space-y-3">
          {PROVIDERS.map(({ key, label, required, hint }) => {
            const connected = connections[key];
            return (
              <li
                key={key}
                className="flex items-center justify-between gap-3 rounded-md border border-border-subtle bg-bg-surface px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  {connected ? (
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-pill bg-success-bg text-brand">
                      <EvidenceLeaf size={18} />
                    </span>
                  ) : (
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-pill bg-bg-raised text-fg-muted">
                      <EvidenceLeaf size={18} />
                    </span>
                  )}
                  <div>
                    <p className="font-medium text-fg-primary">
                      {label}
                      {required && (
                        <span className="ml-2 text-caption font-normal text-fg-muted">required</span>
                      )}
                    </p>
                    <p className="text-caption text-fg-muted">{hint}</p>
                  </div>
                </div>
                {connected ? (
                  <span className="inline-flex items-center gap-1 text-body-s font-medium text-brand">
                    <Check className="h-4 w-4" /> Connected
                  </span>
                ) : (
                  <Button size="sm" variant="secondary" onClick={() => fakeConnect(key)}>
                    Connect
                  </Button>
                )}
              </li>
            );
          })}
        </ul>

        <p className="text-caption text-fg-muted">
          DPDP-aligned: we store only what's needed, deletable any time. We never post anything on
          your behalf.
        </p>

        <Button size="lg" onClick={handleContinue} disabled={!connections.linkedin}>
          Continue ›
        </Button>
        {!connections.linkedin && (
          <p className="text-caption text-fg-muted">
            LinkedIn is needed for referral paths. You can skip it now and connect later from
            settings.
          </p>
        )}
      </div>
    </main>
  );
}

export default function NetworkPage() {
  return (
    <RequireAuth>
      <NetworkInner />
    </RequireAuth>
  );
}
