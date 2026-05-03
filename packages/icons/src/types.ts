import type { SVGProps } from 'react';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  size?: number | string;
  /** Stroke width override. Default 1.75 to match the Lucide provider config. */
  strokeWidth?: number;
}

/** Default size for icons (16px is our inline default per 05-iconography.md). */
export const DEFAULT_SIZE = 16;
export const DEFAULT_STROKE = 1.75;
