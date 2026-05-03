import { DEFAULT_SIZE, DEFAULT_STROKE, type IconProps } from '../types';

/** Broken-chain icon. Used for service-bond warnings. */
export function BondLink({ size = DEFAULT_SIZE, strokeWidth = DEFAULT_STROKE, ...props }: IconProps) {
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
      <path d="M9 7h-2a4 4 0 100 8h2" />
      <path d="M15 7h2a4 4 0 010 8h-2" />
      <path d="M9 11l-2 2M15 11l2 2" data-accent />
      <path d="M11 9l-1.5 -1.5M13 15l1.5 1.5" data-accent />
    </svg>
  );
}
