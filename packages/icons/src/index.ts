/**
 * @careerops/icons — flat barrel for all icons used in the product.
 *
 * Default stroke width across the library is 1.75 (per docs/frontend/05-iconography.md).
 * For Lucide icons, pass `strokeWidth={1.75}` or apply globally via class:
 *
 *   <Briefcase size={16} strokeWidth={1.75} />
 */

export type { IconProps } from './types';
export { DEFAULT_SIZE, DEFAULT_STROKE } from './types';

// Lucide barrel — tree-shaken
export * from './lucide';

// Custom India-specific iconset
export * from './custom';
