'use client';

import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import { ReferralPath, OfferTrophy } from '@careerops/icons';
import { Button, LoadingSpinner, RightDrawer } from '@careerops/ui';
import { useMarkNotificationsRead, useNotifications, type NotificationItem } from '@careerops/api-client';

import { cn } from '@/lib/cn';

interface NotificationCenterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const KIND_ICON: Record<NotificationItem['kind'], React.ComponentType<{ size?: number; className?: string }>> = {
  referral_reply: ReferralPath,
  interview_scheduled: Bell,
  offer_received: OfferTrophy,
  match_found: Bell,
  digest_summary: Bell,
  system: Bell,
};

const KIND_TINT: Record<NotificationItem['kind'], string> = {
  referral_reply: 'text-brand bg-success-bg',
  interview_scheduled: 'text-fg-secondary bg-bg-raised',
  offer_received: 'text-accent bg-warning-bg',
  match_found: 'text-brand bg-success-bg',
  digest_summary: 'text-fg-secondary bg-bg-raised',
  system: 'text-fg-secondary bg-bg-raised',
};

function relative(iso: string): string {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function NotificationCenter({ open, onOpenChange }: NotificationCenterProps) {
  const router = useRouter();
  const { data, isLoading } = useNotifications();
  const markRead = useMarkNotificationsRead();
  const items = data ?? [];

  function go(href?: string) {
    onOpenChange(false);
    if (href) router.push(href);
  }

  return (
    <RightDrawer open={open} onOpenChange={onOpenChange}>
      <RightDrawer.Content size="sm">
        <RightDrawer.Header>
          <RightDrawer.Title>Notifications</RightDrawer.Title>
        </RightDrawer.Header>
        <RightDrawer.Body>
          {isLoading ? (
            <LoadingSpinner size="block" label="Loading…" />
          ) : items.length === 0 ? (
            <p className="py-12 text-center text-body-m text-fg-secondary">All caught up.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {items.map((n) => {
                const Icon = KIND_ICON[n.kind];
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => go(n.href)}
                      className={cn(
                        'flex w-full items-start gap-3 rounded-md p-3 text-left transition-colors',
                        'hover:bg-bg-raised',
                        !n.read && 'border border-brand/30 bg-success-bg/30',
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill',
                          KIND_TINT[n.kind],
                        )}
                      >
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-body-m text-fg-primary">{n.title}</p>
                        <p className="text-body-s text-fg-secondary line-clamp-2">{n.body}</p>
                        <p className="mt-0.5 text-caption text-fg-muted">{relative(n.at)}</p>
                      </div>
                      {!n.read && (
                        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-pill bg-accent" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </RightDrawer.Body>
        <RightDrawer.Footer>
          <Button
            variant="ghost"
            onClick={() => markRead.mutate()}
            disabled={!items.some((n) => !n.read) || markRead.isPending}
          >
            Mark all read
          </Button>
        </RightDrawer.Footer>
      </RightDrawer.Content>
    </RightDrawer>
  );
}
