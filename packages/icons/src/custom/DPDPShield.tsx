import { DEFAULT_SIZE, DEFAULT_STROKE, type IconProps } from '../types';

/** Shield with "D" cutout — DPDP-aware consent screens. */
export function DPDPShield({
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
      <path d="M12 3l8 3v6c0 5-3 9-8 11-5-2-8-6-8-11V6l8-3z" />
      <path d="M9 9h2.5c1.5 0 3 1.2 3 3s-1.5 3-3 3H9V9z" data-accent />
    </svg>
  );
}
