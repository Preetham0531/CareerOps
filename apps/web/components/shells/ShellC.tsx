'use client';

import { cn } from '@/lib/cn';

/**
 * Shell C — wizard split. Onboarding, negotiation co-pilot.
 * 60% main / 40% rail on desktop, stacked on mobile.
 */
export function ShellC({
  header,
  rail,
  children,
  className,
}: {
  header?: React.ReactNode;
  rail?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex min-h-screen flex-col', className)}>
      {header && (
        <div className="sticky top-0 z-sticky border-b border-border-subtle bg-bg-app/80 backdrop-blur-md">
          {header}
        </div>
      )}
      <div className="flex flex-1 flex-col lg:flex-row">
        <main className="container flex-1 py-8 lg:max-w-3xl">{children}</main>
        {rail && (
          <aside className="border-t border-border-subtle bg-bg-raised/40 p-6 lg:w-[40%] lg:max-w-[480px] lg:border-l lg:border-t-0">
            {rail}
          </aside>
        )}
      </div>
    </div>
  );
}
