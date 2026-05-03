/**
 * @careerops/tokens — design tokens entry point.
 *
 * Tokens are the contract between every package. Consume:
 *   import { teal, spacing, easings } from '@careerops/tokens';
 * Or via CSS variables (preferred for runtime theming):
 *   color: var(--brand);
 *   padding: var(--space-4);
 */

export { teal, gold, neutral, ramps } from './colors.js';
export type { TealScale, GoldScale, NeutralScale } from './colors.js';

export { lightTokens, darkTokens } from './semantic.js';
export type { SemanticTokenSet } from './semantic.js';

export { spacing, radii, zIndex, breakpoints } from './spacing.js';
export type {
  SpacingToken,
  RadiusToken,
  ZIndexToken,
  BreakpointToken,
} from './spacing.js';

export {
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
} from './typography.js';
export type {
  FontFamilyToken,
  FontWeightToken,
  FontSizeToken,
} from './typography.js';

export {
  easings,
  easingsArray,
  durations,
  durationsSeconds,
  springs,
  stagger,
} from './motion.js';
export type { EasingToken, DurationToken, SpringToken } from './motion.js';

export { shadowsLight, shadowsDark } from './shadows.js';
export type { ShadowToken } from './shadows.js';
