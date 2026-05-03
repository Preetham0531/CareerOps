'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Home,
  Search,
  FileText,
  IndianRupee,
  Calendar,
  Briefcase,
  Settings,
  ChevronLeft,
  ChevronRight,
  Users,
} from 'lucide-react';
import { ReferralPath, StealthMask } from '@careerops/icons';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { cn } from '@/lib/cn';

interface SideNavStore {
  collapsed: boolean;
  toggle: () => void;
}

const useSideNav = create<SideNavStore>()(
  persist(
    (set) => ({
      collapsed: false,
      toggle: () => set((s) => ({ collapsed: !s.collapsed })),
    }),
    { name: 'careerops:sidenav' },
  ),
);

const ITEMS = [
  { href: '/dashboard', label: 'Home', Icon: Home },
  { href: '/discover', label: 'Discover', Icon: Search },
  { href: '/referrers', label: 'Referrers', Icon: ReferralPath },
  { href: '/evidence', label: 'Evidence', Icon: FileText },
  { href: '/salary', label: 'Salary intel', Icon: IndianRupee },
  { href: '/interviews', label: 'Interviews', Icon: Calendar },
  { href: '/negotiations', label: 'Negotiations', Icon: Briefcase },
  { href: '/dna', label: 'App DNA', Icon: Users },
  { href: '/settings/stealth', label: 'Stealth', Icon: StealthMask },
  { href: '/settings', label: 'Settings', Icon: Settings },
] as const;

export function SideNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const { collapsed, toggle } = useSideNav();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (
    <aside
      aria-label="Primary"
      className={cn(
        'sticky top-14 flex h-[calc(100vh-3.5rem)] shrink-0 flex-col border-r border-border-subtle bg-bg-app',
        hydrated && collapsed ? 'w-16' : 'w-60',
        'transition-[width] duration-base ease-standard',
        className,
      )}
    >
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="flex flex-col gap-0.5 px-2">
          {ITEMS.map(({ href, label, Icon }) => {
            const active = pathname === href || pathname?.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'group flex items-center gap-3 rounded-md px-3 py-2 text-body-s font-medium',
                    'transition-colors duration-fast',
                    active
                      ? 'bg-bg-raised text-fg-primary'
                      : 'text-fg-secondary hover:bg-bg-raised hover:text-fg-primary',
                  )}
                  title={collapsed ? label : undefined}
                >
                  <Icon size={18} aria-hidden className="shrink-0" />
                  {!collapsed && <span className="truncate">{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button
        type="button"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={toggle}
        className={cn(
          'flex h-10 items-center justify-center border-t border-border-subtle text-fg-muted hover:bg-bg-raised hover:text-fg-primary',
        )}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
