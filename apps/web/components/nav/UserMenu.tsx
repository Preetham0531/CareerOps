'use client';

import { useRouter } from 'next/navigation';
import { LogOut, Settings } from 'lucide-react';
import { Avatar, Popover } from '@careerops/ui';

import { useAuth } from '@/lib/auth';

export function UserMenu() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  return (
    <Popover>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          className="rounded-pill focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          <Avatar
            size="md"
            src={user?.avatarSrc}
            alt={user?.name ?? 'You'}
            fallback={user?.name ?? 'You'}
          />
        </button>
      </Popover.Trigger>
      <Popover.Content align="end" className="min-w-56 p-2">
        <div className="px-2 py-1.5">
          <p className="font-medium text-body-m text-fg-primary">{user?.name ?? 'Signed in'}</p>
          {user?.phone && <p className="text-caption text-fg-muted">{user.phone}</p>}
          {user?.email && <p className="text-caption text-fg-muted">{user.email}</p>}
        </div>
        <div className="my-1 h-px bg-border-subtle" />
        <button
          type="button"
          onClick={() => router.push('/settings')}
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-body-s text-fg-primary hover:bg-bg-raised"
        >
          <Settings className="h-4 w-4" /> Settings
        </button>
        <button
          type="button"
          onClick={() => {
            signOut();
            router.push('/');
          }}
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-body-s text-fg-primary hover:bg-bg-raised"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </Popover.Content>
    </Popover>
  );
}
