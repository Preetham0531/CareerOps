import { DEFAULT_SIZE, DEFAULT_STROKE, type IconProps } from '../types';

/** Half-mask — stealth mode toggle. */
export function StealthMask({ size = DEFAULT_SIZE, strokeWidth = DEFAULT_STROKE, ...props }: IconProps) {
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
      <path d="M3 9c2-1 5-2 9-2s7 1 9 2c0 4-2 7-5 7-2 0-3-1-4-3-1 2-2 3-4 3-3 0-5-3-5-7z" />
      <circle cx="8" cy="11" r="0.8" fill="currentColor" />
      <circle cx="16" cy="11" r="0.8" fill="currentColor" />
    </svg>
  );
}
