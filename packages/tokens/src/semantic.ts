/**
 * Semantic token map — light + dark mode.
 *
 * Per docs/frontend/02-color-system.md:
 *   - Success uses teal-500 (brand-as-success ties affirmation to identity)
 *   - Warning uses gold-500 (gold = signal)
 *   - Danger uses gold-700 / gold-400 (warm amber-gold; never red)
 *   - Focus ring is always gold (visible against both surfaces)
 */

import { teal, gold, neutral } from './colors.js';

export interface SemanticTokenSet {
  // Backgrounds
  bgApp: string;
  bgSurface: string;
  bgRaised: string;
  bgOverlay: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  // Borders
  borderSubtle: string;
  borderDefault: string;
  borderStrong: string;

  // Brand + accent
  brand: string;
  brandHover: string;
  brandPressed: string;
  accent: string;
  accentHover: string;
  focusRing: string;

  // Semantic states (palette-strict)
  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
  danger: string;
  dangerBg: string;

  // India-specific flags
  ghostFlag: string;
  bondFlag: string;
}

export const lightTokens: SemanticTokenSet = {
  bgApp: neutral[50],
  bgSurface: neutral[0],
  bgRaised: neutral[50],
  bgOverlay: 'rgba(242, 241, 237, 0.8)',

  textPrimary: neutral[700],
  textSecondary: neutral[500],
  textMuted: neutral[400],
  textInverse: neutral[0],

  borderSubtle: neutral[200],
  borderDefault: neutral[300],
  borderStrong: neutral[500],

  brand: teal[500],
  brandHover: teal[400],
  brandPressed: teal[600],
  accent: gold[400],
  accentHover: gold[300],
  focusRing: gold[300],

  success: teal[500],
  successBg: teal[50],
  warning: gold[500],
  warningBg: gold[50],
  danger: gold[700],
  dangerBg: gold[100],

  ghostFlag: neutral[400],
  bondFlag: gold[600],
};

export const darkTokens: SemanticTokenSet = {
  bgApp: teal[950],
  bgSurface: teal[900],
  bgRaised: teal[800],
  bgOverlay: 'rgba(7, 32, 31, 0.8)',

  textPrimary: neutral[100],
  textSecondary: neutral[300],
  textMuted: neutral[400],
  textInverse: teal[950],

  borderSubtle: teal[800],
  borderDefault: neutral[800],
  borderStrong: neutral[300],

  brand: teal[400],
  brandHover: teal[300],
  brandPressed: teal[500],
  accent: gold[300],
  accentHover: gold[200],
  focusRing: gold[400],

  success: teal[300],
  successBg: 'rgba(10, 74, 71, 0.6)',
  warning: gold[300],
  warningBg: 'rgba(92, 68, 11, 0.6)',
  danger: gold[400],
  dangerBg: 'rgba(63, 47, 8, 0.6)',

  ghostFlag: neutral[500],
  bondFlag: gold[300],
};
