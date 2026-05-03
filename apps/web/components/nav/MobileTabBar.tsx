'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Home, Search, Inbox, User } from 'lucide-react';
import { ReferralPath } from '@careerops/icons';

import { cn } from '@/lib/cn';

const TABS = [
  { href: '/dashboard', label: 'Home', Icon: Home },
  { href: '/discover', label: 'Discover', Icon: Search },
  { href: '/referrers', label: 'Referrers', Icon: ReferralPath },
  { href: '/inbox', label: 'Inbox', Icon: Inbox },
  { href: '/settings', label: 'You', Icon: User },
] as const;

export function MobileTabBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) > 8) {
        setHidden(delta > 0 && y > 80);
        lastY.current = y;
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      aria-label="Primary mobile"
      className={cn(
        'fixed inset-x-0 bottom-0 z-sticky border-t border-border-subtle bg-bg-app/95 backdrop-blur-md',
        'transition-transform duration-base ease-standard',
        hidden && 'translate-y-full',
        className,
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-5">
        {TABS.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname?.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'flex h-14 flex-col items-center justify-center gap-0.5 text-caption',
                  active ? 'text-brand' : 'text-fg-secondary',
                )}
              >
                <Icon size={20} aria-hidden />
                <span className="font-medium">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
