import { DEFAULT_SIZE, DEFAULT_STROKE, type IconProps } from '../types';

/** Abstract ghost — ghost-job radar. */
export function GhostListing({
  size = DEFAULT_SIZE,
  strokeWidth = DEFAULT_STROKE,
  ...props
}: IconProps) {
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
      <path d="M5 11a7 7 0 1114 0v9l-3-2-2 2-2-2-2 2-2-2-3 2z" />
      <circle cx="9.5" cy="11" r="0.6" fill="currentColor" />
      <circle cx="14.5" cy="11" r="0.6" fill="currentColor" />
    </svg>
  );
}
