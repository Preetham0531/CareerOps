'use client';

import { Button, RightDrawer } from '@careerops/ui';
import type { Claim, Evidence } from '@careerops/api-client';

import { EvidenceCard } from './EvidenceCard';

interface ClaimDrawerProps {
  claim: Claim | null;
  evidenceById: Record<string, Evidence>;
  onClose: () => void;
}

const STRENGTH_LABEL = ['Weak', 'Weak', 'Medium', 'Medium', 'Strong', 'Strong'];

export function ClaimDrawer({ claim, evidenceById, onClose }: ClaimDrawerProps) {
  return (
    <RightDrawer open={!!claim} onOpenChange={(o) => !o && onClose()}>
      <RightDrawer.Content size="md">
        <RightDrawer.Header>
          <RightDrawer.Title>{claim?.text ?? 'Claim'}</RightDrawer.Title>
        </RightDrawer.Header>
        <RightDrawer.Body>
          {claim && (
            <>
              <p className="text-caption font-semibold uppercase tracking-wide text-fg-muted">
                Strength
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < claim.strength
                          ? 'block h-3 w-3 rounded-pill bg-brand'
                          : 'block h-3 w-3 rounded-pill bg-bg-raised'
                      }
                    />
                  ))}
                </span>
                <span className="text-body-m font-medium text-fg-primary">
                  {STRENGTH_LABEL[claim.strength] ?? 'Unrated'}
                </span>
              </div>

              <h3 className="mt-6 text-caption font-semibold uppercase tracking-wide text-fg-muted">
                Evidence ({claim.evidenceIds.length})
              </h3>
              <ul className="mt-2 flex flex-col gap-2">
                {claim.evidenceIds.map((id) => {
                  const ev = evidenceById[id];
                  if (!ev) return null;
                  return (
                    <li key={id}>
                      <EvidenceCard ev={ev} />
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </RightDrawer.Body>
        <RightDrawer.Footer>
          <Button variant="ghost">Add manual evidence</Button>
        </RightDrawer.Footer>
      </RightDrawer.Content>
    </RightDrawer>
  );
}
