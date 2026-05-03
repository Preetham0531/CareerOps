'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Dialog, Tabs, toast } from '@careerops/ui';
import { useDraftDm, useSendDm, type DraftDmResponse } from '@careerops/api-client';

import { cn } from '@/lib/cn';

interface DMComposerProps {
  referrerId: string | null;
  referrerName?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Tone = 'warm' | 'direct' | 'executive';

export function DMComposer({ referrerId, referrerName, open, onOpenChange }: DMComposerProps) {
  const [tone, setTone] = useState<Tone>('warm');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [scoreValue, setScoreValue] = useState(0);

  const draft = useDraftDm();
  const send = useSendDm();
  const intervalRef = useRef<number | null>(null);

  // Re-draft on open and on tone change
  useEffect(() => {
    if (!open || !referrerId) return;
    requestDraft(tone);
    return () => stopStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, tone, referrerId]);

  function stopStream() {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStreaming(false);
  }

  async function requestDraft(t: Tone) {
    if (!referrerId) return;
    stopStream();
    try {
      const res = await draft.mutateAsync({ referrerId, tone: t });
      streamReveal(res);
    } catch {
      toast.error('Could not draft DM. Try again.');
    }
  }

  function streamReveal(d: DraftDmResponse) {
    setSubject(d.subject);
    setBody('');
    setScoreValue(d.personalizationScore);
    setStreaming(true);

    // Token-stream simulation: ~30 chars/sec
    let i = 0;
    intervalRef.current = window.setInterval(() => {
      i = Math.min(d.body.length, i + 5);
      setBody(d.body.slice(0, i));
      if (i >= d.body.length) stopStream();
    }, 60);
  }

  async function handleSend(scheduleAt: string | null) {
    if (!referrerId) return;
    try {
      const res = await send.mutateAsync({ referrerId, subject, body, scheduleAt });
      toast.success(scheduleAt ? 'DM scheduled' : 'DM sent', {
        description: `Undo within 5s · ${res.dmId}`,
        duration: 5000,
        action: { label: 'Undo', onClick: () => toast('Send cancelled') },
      });
      onOpenChange(false);
    } catch {
      toast.error('Could not send DM');
    }
  }

  const dots = Math.round(scoreValue * 5);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="lg">
        <Dialog.Header>
          <Dialog.Title>Compose DM{referrerName ? ` · ${referrerName}` : ''}</Dialog.Title>
          <Dialog.Description>
            Tone tabs swap the body. Edit anything before sending.
          </Dialog.Description>
        </Dialog.Header>

        <Tabs value={tone} onValueChange={(v) => setTone(v as Tone)}>
          <Tabs.List variant="pill">
            <Tabs.Trigger value="warm" variant="pill">Warm</Tabs.Trigger>
            <Tabs.Trigger value="direct" variant="pill">Direct</Tabs.Trigger>
            <Tabs.Trigger value="executive" variant="pill">Executive</Tabs.Trigger>
          </Tabs.List>
        </Tabs>

        <div className="grid gap-3">
          <input
            aria-label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="h-10 rounded-md border border-border-default bg-bg-surface px-3 text-body-m outline-none focus-visible:border-brand"
          />
          <textarea
            aria-label="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Loading draft…"
            rows={12}
            className={cn(
              'w-full resize-y rounded-md border border-border-default bg-bg-surface p-3 text-body-m leading-body outline-none focus-visible:border-brand',
              streaming && 'caret-accent',
            )}
            style={{ fontFamily: 'var(--font-body)' }}
          />
          {streaming && (
            <p
              role="status"
              className="-mt-2 inline-flex items-center gap-1 text-caption text-fg-muted"
            >
              <span className="inline-block h-2 w-1 animate-pulse bg-accent" />
              AI is drafting…
            </p>
          )}
        </div>

        <div className="flex items-center justify-between rounded-md border border-border-subtle bg-bg-app px-3 py-2 text-caption text-fg-secondary">
          <span>Personalization quality</span>
          <span className="flex gap-1" aria-label={`${dots} of 5 dots`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-2 w-2 rounded-pill',
                  i < dots ? 'bg-brand' : 'bg-bg-raised',
                )}
              />
            ))}
          </span>
        </div>

        <Dialog.Footer>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              handleSend(new Date(Date.now() + 86_400_000).toISOString())
            }
          >
            Schedule tomorrow 10am
          </Button>
          <Button onClick={() => handleSend(null)} loading={send.isPending}>
            Send now ›
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
