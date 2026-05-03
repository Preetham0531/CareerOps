/**
 * Day 6 (app) layout — adds StealthHotkeyProvider for ⌘Shift+H boss-screen.
 *
 * To swap into place:
 *   mv "apps/web/app/(app)/layout.tsx.day6" "apps/web/app/(app)/layout.tsx"
 */

import { Providers } from '@/components/Providers';
import { ShellA } from '@/components/shells/ShellA';
import { RequireAuth } from '@/components/RequireAuth';
import { StealthHotkeyProvider } from '@/features/stealth/StealthHotkeyProvider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <RequireAuth>
        <StealthHotkeyProvider>
          <ShellA>{children}</ShellA>
        </StealthHotkeyProvider>
      </RequireAuth>
    </Providers>
  );
}
