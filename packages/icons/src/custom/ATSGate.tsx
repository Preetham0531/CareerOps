import { DEFAULT_SIZE, DEFAULT_STROKE, type IconProps } from '../types';

/** Gate with checkmark — ATS compatibility. */
export function ATSGate({ size = DEFAULT_SIZE, strokeWidth = DEFAULT_STROKE, ...props }: IconProps) {
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
      <path d="M4 21V5a2 2 0 012-2h12a2 2 0 012 2v16" />
      <path d="M4 9h16M4 15h16" />
      <path d="M9 12l2 2 4-4" data-accent />
    </svg>
  );
}
