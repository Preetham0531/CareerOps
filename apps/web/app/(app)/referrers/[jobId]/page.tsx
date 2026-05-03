'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Inbox, X } from 'lucide-react';
import { Button, LoadingSpinner } from '@careerops/ui';
import { useReferrers } from '@careerops/api-client';

import { ReferralGraph } from '@/features/referral/components/ReferralGraph';
import { TopReferrersRail } from '@/features/referral/components/TopReferrersRail';
import { ReferrerScorecard } from '@/features/referral/components/ReferrerScorecard';
import { DMComposer } from '@/features/referral/components/DMComposer';
import { SendQueueDrawer } from '@/features/referral/components/SendQueueDrawer';

/**
 * Per docs/frontend/23-referral-hijack.md.
 * Shell B (focused canvas) — TopBar minimal, full-bleed graph + side rail.
 */
export default function ReferrersJobPage() {
  const router = useRouter();
  const params = useParams<{ jobId: string }>();
  const jobId = params?.jobId ?? '';

  const { data, isLoading } = useReferrers(jobId);
  const [selected, setSelected] = useState<string | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerFor, setComposerFor] = useState<string | null>(null);
  const [queueOpen, setQueueOpen] = useState(false);

  const composeWith = (id: string) => {
    setComposerFor(id);
    setComposerOpen(true);
  };

  const referrerName =
    data?.topReferrers.find((r) => r.id === composerFor)?.name ?? undefined;

  return (
    <div className="flex h-screen flex-col">
      {/* Minimal top bar for Shell B */}
      <header className="flex h-14 items-center justify-between border-b border-border-subtle bg-bg-app/80 px-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Close"
            onClick={() => router.back()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-fg-secondary hover:bg-bg-raised hover:text-fg-primary"
          >
            <X className="h-4 w-4" />
          </button>
          <div>
            <p className="font-medium text-fg-primary">
              {data?.company ?? 'Loading'} · {data?.jobTitle ?? '…'}
            </p>
            <p className="text-caption text-fg-muted">Referrer paths</p>
          </div>
        </div>
        <Button
          size="sm"
          variant="secondary"
          leadingIcon={<Inbox className="h-4 w-4" />}
          onClick={() => setQueueOpen(true)}
        >
          Send queue
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <LoadingSpinner size="page" label="Building your network graph…" />
            </div>
          ) : data ? (
            <ReferralGraph data={data} selectedId={selected} onSelect={setSelected} />
          ) : (
            <div className="flex h-full items-center justify-center text-fg-secondary">
              No referrer data
            </div>
          )}
        </main>
        {data && (
          <TopReferrersRail
            referrers={data.topReferrers}
            selectedId={selected}
            onSelect={setSelected}
            onCompose={composeWith}
          />
        )}
      </div>

      <ReferrerScorecard
        referrerId={selected}
        onClose={() => setSelected(null)}
        onCompose={composeWith}
      />

      <DMComposer
        referrerId={composerFor}
        referrerName={referrerName}
        open={composerOpen}
        onOpenChange={(o) => {
          setComposerOpen(o);
          if (!o) setComposerFor(null);
        }}
      />

      <SendQueueDrawer open={queueOpen} onOpenChange={setQueueOpen} />
    </div>
  );
}
