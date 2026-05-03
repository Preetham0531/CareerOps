import { DEFAULT_SIZE, DEFAULT_STROKE, type IconProps } from '../types';

/** Two-node connection with mutual link. Referral hijack screens. */
export function ReferralPath({ size = DEFAULT_SIZE, strokeWidth = DEFAULT_STROKE, ...props }: IconProps) {
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
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="18" r="2.5" data-accent />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M7 7l3.5 3.5M13.5 13.5L17 17" />
    </svg>
  );
}
