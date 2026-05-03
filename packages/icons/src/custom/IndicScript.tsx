import { DEFAULT_SIZE, type IconProps } from '../types';

/** Stylized "अ த త" — Indic language toggle. */
export function IndicScript({ size = DEFAULT_SIZE, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <text x="2" y="16" fontSize="9" fontFamily="serif">
        अ
      </text>
      <text x="9" y="16" fontSize="9" fontFamily="serif">
        த
      </text>
      <text x="16" y="16" fontSize="9" fontFamily="serif">
        త
      </text>
    </svg>
  );
}
