import { DEFAULT_SIZE, DEFAULT_STROKE, type IconProps } from '../types';

/** Trophy with a gold-fillable cup. Offer-arrived earned moment. */
export function OfferTrophy({ size = DEFAULT_SIZE, strokeWidth = DEFAULT_STROKE, ...props }: IconProps) {
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
      <path d="M7 4h10v5a5 5 0 11-10 0V4z" data-accent />
      <path d="M7 7H5a3 3 0 003 3M17 7h2a3 3 0 01-3 3" />
      <path d="M10 14h4M9 20h6M11 14v6M13 14v6" />
    </svg>
  );
}
