'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Auth state. Day 3 stubs only — real OAuth wiring is sprint-2 work.
 *
 * Per docs/frontend/build-plan/day-3.md Block 5, this is the contract the
 * rest of the app relies on. The actual auth handshake is mocked via MSW
 * so the UX flow is testable without backend.
 */

export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  avatarSrc?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      signIn: (user) => set({ user, isAuthenticated: true }),
      signOut: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'careerops:auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
);
