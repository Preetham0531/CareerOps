import { DEFAULT_SIZE, DEFAULT_STROKE, type IconProps } from '../types';

/** Leaf-as-proof — evidence chips for skill-claim prover. */
export function EvidenceLeaf({ size = DEFAULT_SIZE, strokeWidth = DEFAULT_STROKE, ...props }: IconProps) {
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
      <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" />
      <path d="M5 19c4-4 7-7 14-14" />
    </svg>
  );
}
