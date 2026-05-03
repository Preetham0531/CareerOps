'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CreditCard, FileText, HelpCircle, Link2, Lock, ShieldCheck, User, Bell } from 'lucide-react';
import { StealthMask } from '@careerops/icons';

import { cn } from '@/lib/cn';

const ITEMS = [
  { href: '/settings/profile', label: 'Profile', Icon: User },
  { href: '/settings/account', label: 'Account', Icon: Lock },
  { href: '/settings/privacy', label: 'Privacy (DPDP)', Icon: ShieldCheck, starred: true },
  { href: '/settings/stealth', label: 'Stealth', Icon: StealthMask },
  { href: '/settings/notifications', label: 'Notifications', Icon: Bell },
  { href: '/settings/integrations', label: 'Integrations', Icon: Link2 },
  { href: '/settings/billing', label: 'Billing', Icon: CreditCard },
  { href: '/settings/help', label: 'Help', Icon: HelpCircle },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container py-8 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside aria-label="Settings menu" className="lg:sticky lg:top-20 lg:h-fit">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-0.5">
            {ITEMS.map(({ href, label, Icon, starred }) => {
              const active = pathname === href || pathname?.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-body-s font-medium transition-colors',
                    active
                      ? 'bg-bg-raised text-fg-primary'
                      : 'text-fg-secondary hover:bg-bg-raised hover:text-fg-primary',
                  )}
                >
                  <Icon size={16} />
                  {label}
                  {starred && <span className="ml-auto text-accent">★</span>}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
