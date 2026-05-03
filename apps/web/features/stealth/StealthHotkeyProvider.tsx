'use client';

import { useEffect } from 'react';

import { useStealthStore } from './store';
import { BossScreen } from './BossScreen';

/**
 * Mounts the global ⌘Shift+H boss-screen hotkey + the overlay itself.
 * Place inside the (app) layout below Providers.
 */
export function StealthHotkeyProvider({ children }: { children: React.ReactNode }) {
  const toggle = useStealthStore((s) => s.toggleBossScreen);
  const close = useStealthStore((s) => s.closeBossScreen);
  const visible = useStealthStore((s) => s.bossScreen);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        toggle();
      } else if (e.key === 'Escape' && visible) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggle, close, visible]);

  return (
    <>
      {children}
      {visible && <BossScreen />}
    </>
  );
}
