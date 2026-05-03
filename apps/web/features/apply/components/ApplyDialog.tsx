'use client';

import { useState } from 'react';
import { Button, Dialog, Badge, toast } from '@careerops/ui';
import { useApply, useUndoApply } from '@careerops/api-client';
import type { JobData } from '@careerops/ui';

interface ApplyDialogProps {
  job: JobData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplied?: (jobId: string) => void;
}

/**
 * Apply confirmation dialog.
 * Per docs/frontend/22-job-discovery.md the apply flow has three submission tiers.
 * Today we route everything through the mock /api/apply (Tier 1); Tier 2/3 UX
 * (assist mode + manual prefill) lands during sprint-2 with real portal integrations.
 */
export function ApplyDialog({ job, open, onOpenChange, onApplied }: ApplyDialogProps) {
  const [submitted, setSubmitted] = useState(false);
  const apply = useApply();
  const undo = useUndoApply();

  async function handleSubmit() {
    if (!job) return;
    try {
      const res = await apply.mutateAsync({ jobId: job.id });
      setSubmitted(true);
      onApplied?.(job.id);

      // 8-second undo window per docs/frontend/01-design-principles.md reversibility
      const t = toast(`Applied to ${job.title}`, {
        description: `${job.company} · undo within 8s`,
        duration: 8000,
        action: {
          label: 'Undo',
          onClick: () => {
            void undo.mutateAsync(res.applicationId);
            toast.success('Application withdrawn');
          },
        },
      });

      // close dialog
      setTimeout(() => onOpenChange(false), 300);
      return t;
    } catch {
      toast.error('Could not submit application. Try again.');
    }
  }

  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="md">
        <Dialog.Header>
          <Dialog.Title>Apply to {job.title}</Dialog.Title>
          <Dialog.Description>
            {job.company} · {job.location.city} · T{job.location.tier}
          </Dialog.Description>
        </Dialog.Header>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="md">
              Tier 1 · 1-click apply
            </Badge>
            <span className="text-caption text-fg-muted">Tailored CV attached</span>
          </div>

          {(job.bondFlag || job.benchFlag) && (
            <div className="rounded-md border border-warning/40 bg-warning-bg p-3 text-body-s text-warning">
              Heads up: this listing has{' '}
              {job.bondFlag ? `a ${job.bondFlag.durationYears ?? ''}y bond` : ''}
              {job.bondFlag && job.benchFlag ? ' and ' : ''}
              {job.benchFlag ? 'bench risk' : ''}. Apply only if you've reviewed it.
            </div>
          )}

          <p className="text-body-s text-fg-secondary">
            Clicking Submit will apply to this listing using your default CV variant. You can undo
            within 8 seconds.
          </p>
        </div>

        <Dialog.Footer>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={apply.isPending} disabled={submitted}>
            Submit application
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
