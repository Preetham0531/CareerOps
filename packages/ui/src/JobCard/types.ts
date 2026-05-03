/**
 * Domain types for JobCard.
 * Mirrors the spec in docs/frontend/11-components-composite.md.
 */

export type CityTierValue = 1 | 2 | 3;

export interface Location {
  city: string;
  tier: CityTierValue;
}

export interface SalaryRange {
  min: number;
  max: number;
  currency?: 'INR' | 'USD' | 'EUR';
  /** 0 (low) – 1 (high) */
  confidence: number;
}

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type WfhMode = 'remote' | 'hybrid' | 'onsite';

export interface BondFlag {
  reason: string;
  severity: 'low' | 'medium' | 'high';
  durationYears?: number;
}

export interface BenchFlag {
  reason: string;
  severity: 'low' | 'medium' | 'high';
}

export interface ReferralPathSummary {
  count: number;
  top: Array<{ name: string; avatarSrc?: string }>;
}

export type JobCardDensity = 'compact' | 'default' | 'expanded';

export interface JobData {
  id: string;
  title: string;
  company: string;
  logoSrc?: string;
  location: Location;
  postedAt: string; // ISO
  salary?: SalaryRange;
  employment: EmploymentType;
  experience: { min: number; max: number };
  wfh?: WfhMode;
  /** 0–1 (hidden from UI if < 0.1) */
  ghostScore: number;
  /** 0–1 */
  matchScore: number;
  bondFlag?: BondFlag;
  benchFlag?: BenchFlag;
  referralPath?: ReferralPathSummary;
  excerpt?: string;
  source?: string; // 'naukri' | 'linkedin' | …
  perks?: string[]; // ['WFH', 'Stock', 'Joining']
  saved?: boolean;
  applied?: boolean;
}
