import { MobileTabBar } from '@/components/nav/MobileTabBar';

/** Shell D — mobile-first stacked. WhatsApp surface, voice. */
export function ShellD({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pb-16">{children}</main>
      <MobileTabBar />
    </div>
  );
}
