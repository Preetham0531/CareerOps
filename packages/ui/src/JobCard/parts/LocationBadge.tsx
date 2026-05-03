import { CityT1, CityT2, CityT3 } from '@careerops/icons';

import { cn } from '../../utils/cn';
import type { Location } from '../types';

export interface LocationBadgeProps {
  location: Location;
  className?: string;
}

export function LocationBadge({ location, className }: LocationBadgeProps) {
  const Icon = location.tier === 1 ? CityT1 : location.tier === 2 ? CityT2 : CityT3;
  return (
    <span
      className={cn('inline-flex items-center gap-1 text-fg-secondary', className)}
      aria-label={`${location.city}, tier ${location.tier} city`}
    >
      <Icon size={12} className="text-fg-muted" />
      <span>{location.city}</span>
      <span className="text-fg-muted">·</span>
      <span className="text-caption uppercase tracking-wide text-fg-muted">T{location.tier}</span>
    </span>
  );
}
