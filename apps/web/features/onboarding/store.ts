'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type {
  StepNumber,
  Persona,
  Urgency,
  Priority,
  ResumeData,
  FilterState,
  ConnectionsState,
  PreferencesState,
} from './types';

/**
 * Onboarding state. Per docs/frontend/20-onboarding-flow.md.
 * Persisted in localStorage so refresh resumes at the last step.
 */

interface OnboardingState {
  step: StepNumber;
  completed: Partial<Record<StepNumber, boolean>>;

  persona?: Persona;
  urgency?: Urgency;
  priority?: Priority;

  resume?: ResumeData;
  filters?: FilterState;
  connections: ConnectionsState;
  preferences?: PreferencesState;

  setStep: (step: StepNumber) => void;
  markCompleted: (step: StepNumber) => void;
  setPersonaAnswers: (p: { persona: Persona; urgency: Urgency; priority: Priority }) => void;
  setResume: (resume: ResumeData) => void;
  setFilters: (filters: FilterState) => void;
  setConnection: (key: keyof ConnectionsState, value: boolean) => void;
  setPreferences: (prefs: PreferencesState) => void;
  reset: () => void;
}

const defaultConnections: ConnectionsState = {
  linkedin: false,
  naukri: false,
  github: false,
  leetcode: false,
  kaggle: false,
};

export const useOnboarding = create<OnboardingState>()(
  persist(
    (set) => ({
      step: 1,
      completed: {},
      connections: defaultConnections,

      setStep: (step) => set({ step }),
      markCompleted: (step) =>
        set((s) => ({ completed: { ...s.completed, [step]: true } })),
      setPersonaAnswers: ({ persona, urgency, priority }) =>
        set({ persona, urgency, priority }),
      setResume: (resume) => set({ resume }),
      setFilters: (filters) => set({ filters }),
      setConnection: (key, value) =>
        set((s) => ({ connections: { ...s.connections, [key]: value } })),
      setPreferences: (preferences) => set({ preferences }),
      reset: () =>
        set({
          step: 1,
          completed: {},
          persona: undefined,
          urgency: undefined,
          priority: undefined,
          resume: undefined,
          filters: undefined,
          connections: defaultConnections,
          preferences: undefined,
        }),
    }),
    {
      name: 'careerops:onboarding',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/** Suggested defaults for filters when CV parsing yields hints. */
export function deriveFilterDefaults(resume: ResumeData | undefined): FilterState {
  const currentLpa = resume?.currentCTC ? Math.round(resume.currentCTC / 100_000) : 18;
  return {
    roles: resume?.currentRole ? [resume.currentRole] : [],
    cities: [{ city: 'Bangalore', tier: 1 }],
    remote: true,
    lpa: { min: currentLpa, max: Math.round(currentLpa * 1.5) },
    workMode: ['remote', 'hybrid'],
    notice: { current: 60, negotiable: 30 },
  };
}
