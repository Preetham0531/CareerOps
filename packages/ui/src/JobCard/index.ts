export { JobCard } from './JobCard';
export type { JobCardProps } from './JobCard';
export type {
  JobData,
  JobCardDensity,
  Location,
  CityTierValue,
  SalaryRange,
  EmploymentType,
  WfhMode,
  BondFlag,
  BenchFlag,
  ReferralPathSummary,
} from './types';

// Sub-component exports for ad-hoc reuse (e.g., dashboard tiles)
export { CompanyLogo } from './parts/CompanyLogo';
export { LocationBadge } from './parts/LocationBadge';
export { MoneyRange } from './parts/MoneyRange';
export { GhostScoreMeter } from './parts/GhostScoreMeter';
export { BondBadge } from './parts/BondBadge';
export { BenchBadge } from './parts/BenchBadge';
export { MatchScoreMeter } from './parts/MatchScoreMeter';
export { ChipRow } from './parts/ChipRow';
export { ReferrerPreview } from './parts/ReferrerPreview';
