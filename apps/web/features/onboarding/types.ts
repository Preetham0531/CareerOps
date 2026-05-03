/**
 * Onboarding domain types — shared by store, MSW handlers, and step pages.
 * Mirrors the contract in docs/frontend/20-onboarding-flow.md.
 */

export type StepNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type Persona = 'employed-quiet' | 'active' | 'fresher' | 'returner' | 'exploring';
export type Urgency = 'this-week' | 'this-month' | '1-3m' | 'open';
export type Priority = 'comp' | 'company' | 'flex' | 'change' | 'first-job';

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  currentRole?: string;
  currentEmployer?: string;
  currentCTC?: number;
  skills: string[];
  education: string;
  hideCurrentEmployer?: boolean;
}

export interface FilterState {
  roles: string[];
  cities: Array<{ city: string; tier: 1 | 2 | 3 }>;
  remote: boolean;
  lpa: { min: number; max: number };
  workMode: Array<'remote' | 'hybrid' | 'onsite'>;
  notice: { current: number; negotiable: number };
}

export interface ConnectionsState {
  linkedin: boolean;
  naukri: boolean;
  github: boolean;
  leetcode: boolean;
  kaggle: boolean;
}

export interface PreferencesState {
  stealth: boolean;
  digestEmail: boolean;
  digestTime: string; // HH:mm
  whatsAppOnHighMatch: boolean;
  pushEnabled: boolean;
  voiceEnabled: boolean;
}
