import { DEFAULT_SIZE, DEFAULT_STROKE, type IconProps } from '../types';

/** Clock-with-pause — bench-risk badge. */
export function BenchClock({ size = DEFAULT_SIZE, strokeWidth = DEFAULT_STROKE, ...props }: IconProps) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M10 9v6M14 9v6" data-accent />
    </svg>
  );
}
