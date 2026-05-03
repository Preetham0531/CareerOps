import { DEFAULT_SIZE, DEFAULT_STROKE, type IconProps } from '../types';

/**
 * City-tier icons — concentric rings (3 = T1, 2 = T2, 1 = T3).
 * Used on JobCard LocationBadge per docs/frontend/01-design-principles.md
 * (T1/T2/T3 metro classification).
 */

interface CityTierProps extends IconProps {
  tier: 1 | 2 | 3;
}

export function CityTier({
  tier,
  size = DEFAULT_SIZE,
  strokeWidth = DEFAULT_STROKE,
  ...props
}: CityTierProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="3" />
      {tier >= 2 && <circle cx="12" cy="12" r="6" opacity="0.6" />}
      {tier >= 3 && <circle cx="12" cy="12" r="9" opacity="0.3" />}
    </svg>
  );
}

export const CityT1 = (props: IconProps) => <CityTier tier={3} {...props} />;
export const CityT2 = (props: IconProps) => <CityTier tier={2} {...props} />;
export const CityT3 = (props: IconProps) => <CityTier tier={1} {...props} />;
