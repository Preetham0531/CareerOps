'use client';

/**
 * Day 6 TopBar — wires real stealth chip + notification center.
 *
 * To swap into place:
 *   mv apps/web/components/nav/TopBar.tsx.day6 apps/web/components/nav/TopBar.tsx
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Bell, Search, X } from 'lucide-react';
import { StealthMask } from '@careerops/icons';
import { Kbd } from '@careerops/ui';
import { useNotifications } from '@careerops/api-client';

import { cn } from '@/lib/cn';
import { CommandPalette } from '@/components/CommandPalette';
import { NotificationCenter } from '@/features/notifications/NotificationCenter';
import { useStealthStore } from '@/features/stealth/store';
import { UserMenu } from './UserMenu';

interface TopBarProps {
  minimal?: boolean;
  title?: string;
  onClose?: () => void;
}

export function TopBar({ minimal = false, title, onClose }: TopBarProps) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const stealthOn = useStealthStore((s) => s.enabled);
  const { data: notifications = [] } = useNotifications();
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-sticky h-14 border-b border-border-subtle bg-bg-app/80 backdrop-blur-md">
        <div className="container flex h-full items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {minimal && onClose ? (
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-fg-secondary hover:bg-bg-raised hover:text-fg-primary"
              >
                <X aria-hidden className="h-4 w-4" />
              </button>
            ) : (
              <Link
                href="/dashboard"
                className="font-display text-h2 font-bold tracking-tight text-fg-primary"
              >
                CareerOps
              </Link>
            )}
            {title && <span className="text-body-m text-fg-secondary">{title}</span>}
          </div>

          {!minimal && (
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className={cn(
                'group hidden h-9 max-w-md flex-1 items-center gap-2 rounded-md border border-border-subtle bg-bg-surface px-3 text-fg-secondary md:flex',
                'transition-colors hover:border-border-default',
              )}
            >
              <Search aria-hidden className="h-4 w-4" />
              <span className="text-body-s">Search jobs, settings, actions…</span>
              <span className="ml-auto flex items-center gap-1">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </span>
            </button>
          )}

          {!minimal && (
            <div className="flex items-center gap-1.5">
              {stealthOn && (
                <Link
                  href="/settings/stealth"
                  className="inline-flex items-center gap-1 rounded-pill border border-accent/40 bg-warning-bg px-2 py-0.5 text-caption font-medium text-accent transition-colors hover:bg-accent hover:text-neutral-950"
                >
                  <StealthMask size={12} />
                  Stealth
                </Link>
              )}
              <button
                type="button"
                aria-label={`Notifications${unread ? ` (${unread} unread)` : ''}`}
                onClick={() => setNotifOpen(true)}
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-fg-secondary hover:bg-bg-raised hover:text-fg-primary"
              >
                <Bell aria-hidden className="h-4 w-4" />
                {unread > 0 && (
                  <span
                    aria-hidden
                    className="absolute right-2 top-2 h-1.5 w-1.5 rounded-pill bg-accent"
                  />
                )}
              </button>
              <UserMenu />
            </div>
          )}
        </div>
      </header>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <NotificationCenter open={notifOpen} onOpenChange={setNotifOpen} />
    </>
  );
}
