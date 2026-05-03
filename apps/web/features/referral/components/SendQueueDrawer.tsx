'use client';

import { Avatar, Button, LoadingSpinner, RightDrawer } from '@careerops/ui';
import { useSendQueue, type SendQueueItem } from '@careerops/api-client';

import { cn } from '@/lib/cn';

interface SendQueueDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SendQueueDrawer({ open, onOpenChange }: SendQueueDrawerProps) {
  const { data, isLoading } = useSendQueue();

  return (
    <RightDrawer open={open} onOpenChange={onOpenChange}>
      <RightDrawer.Content size="md">
        <RightDrawer.Header>
          <RightDrawer.Title>Send queue</RightDrawer.Title>
        </RightDrawer.Header>
        <RightDrawer.Body>
          {isLoading ? (
            <div className="py-12 text-center">
              <LoadingSpinner size="block" label="Loading queue…" />
            </div>
          ) : !data?.length ? (
            <p className="py-12 text-center text-body-m text-fg-secondary">
              No DMs in flight. Start by composing one from a referrer.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {data.map((item) => (
                <QueueRow key={item.id} item={item} />
              ))}
            </ul>
          )}
        </RightDrawer.Body>
      </RightDrawer.Content>
    </RightDrawer>
  );
}

function QueueRow({ item }: { item: SendQueueItem }) {
  return (
    <li className="rounded-md border border-border-subtle bg-bg-surface p-4">
      <div className="flex items-start gap-3">
        <Avatar size="md" alt={item.referrerName} fallback={item.referrerName} />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-body-m text-fg-primary">{item.referrerName}</p>
          <p className="text-caption text-fg-muted">{item.company}</p>
          <p className="mt-1 text-caption text-fg-secondary">
            <Status item={item} />
          </p>
        </div>
        <EngagementDots count={item.engagement} />
      </div>
      {item.replyExcerpt && (
        <blockquote className="mt-3 rounded-md border-l-2 border-brand bg-success-bg/40 px-3 py-2 text-body-s italic text-fg-primary">
          “{item.replyExcerpt}”
        </blockquote>
      )}
      <div className="mt-3 flex justify-end gap-2">
        {item.status === 'no-reply' && (
          <>
            <Button size="sm" variant="ghost">
              Send follow-up
            </Button>
            <Button size="sm">Auto-escalate</Button>
          </>
        )}
        {item.status === 'replied' && <Button size="sm">Schedule call</Button>}
        {item.status === 'scheduled' && (
          <>
            <Button size="sm" variant="ghost">
              Edit
            </Button>
            <Button size="sm" variant="danger">
              Cancel
            </Button>
          </>
        )}
      </div>
    </li>
  );
}

function Status({ item }: { item: SendQueueItem }) {
  if (item.status === 'replied' && item.sentAt)
    return <>Sent {daysAgo(item.sentAt)}d ago · Replied</>;
  if (item.status === 'no-reply' && item.sentAt)
    return <>Sent {daysAgo(item.sentAt)}d ago · No reply</>;
  if (item.status === 'scheduled' && item.scheduledAt)
    return <>Scheduled {scheduledFor(item.scheduledAt)}</>;
  return <>Sent</>;
}

function daysAgo(iso: string) {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
}

function scheduledFor(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('en-IN', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
}

function EngagementDots({ count }: { count: number }) {
  return (
    <span className="flex shrink-0 gap-0.5" aria-label={`${count} engagement signals`}>
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'block h-1.5 w-1.5 rounded-pill',
            i < count ? 'bg-brand' : 'bg-bg-raised',
          )}
        />
      ))}
    </span>
  );
}
