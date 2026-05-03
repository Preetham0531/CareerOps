import { TopBar } from '@/components/nav/TopBar';
import { SideNav } from '@/components/nav/SideNav';
import { MobileTabBar } from '@/components/nav/MobileTabBar';

/**
 * Shell A — dense workspace.
 * Default for most product routes (dashboard, discover, settings...).
 */
export function ShellA({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <div className="flex flex-1">
        <SideNav className="hidden lg:flex" />
        <main className="flex-1 overflow-x-hidden pb-16 lg:pb-0">{children}</main>
      </div>
      <MobileTabBar className="lg:hidden" />
    </div>
  );
}
