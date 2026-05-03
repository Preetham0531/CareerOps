import { DEFAULT_SIZE, DEFAULT_STROKE, type IconProps } from '../types';

/**
 * Generic phone-with-ring. Per docs/frontend/05-iconography.md, we deliberately
 * avoid the official WhatsApp speech-bubble for ToS reasons.
 */
export function WhatsAppRing({
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
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
      <path d="M19 9c1 .5 1.5 1.5 1.5 3M19 6c2 1 3 3 3 6M5 9c-1 .5-1.5 1.5-1.5 3M5 6c-2 1-3 3-3 6" data-accent />
    </svg>
  );
}
