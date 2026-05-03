'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Local stealth presence — used by TopBar chip + boss-screen overlay.
 * The authoritative server state lives in the /api/stealth endpoint;
 * this store mirrors enabled state for snappy chrome.
 */

interface StealthState {
  enabled: boolean;
  bossScreen: boolean;
  setEnabled: (v: boolean) => void;
  toggleBossScreen: () => void;
  closeBossScreen: () => void;
}

export const useStealthStore = create<StealthState>()(
  persist(
    (set) => ({
      enabled: true,
      bossScreen: false,
      setEnabled: (v) => set({ enabled: v }),
      toggleBossScreen: () => set((s) => ({ bossScreen: !s.bossScreen })),
      closeBossScreen: () => set({ bossScreen: false }),
    }),
    { name: 'careerops:stealth' },
  ),
);
