import { DEFAULT_SIZE, DEFAULT_STROKE, type IconProps } from '../types';

/** ₹L pill — used for salary chips on JobCard. */
export function LpaPill({ size = DEFAULT_SIZE, strokeWidth = DEFAULT_STROKE, ...props }: IconProps) {
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
      <rect x="2" y="6" width="20" height="12" rx="6" />
      <path d="M7 10h4M7 13h4M11 10c0 2-2 3-4 3l4 3" />
      <path d="M15 10v4M14 14h2.5a1.5 1.5 0 100-3" />
    </svg>
  );
}
