/**
 * Typography — fluid clamp scale.
 *
 * Per docs/frontend/03-typography.md:
 *   Display = Fraunces (variable opsz/wght/SOFT)
 *   Body = Geist (Inter fallback)
 *   Mono = JetBrains Mono
 *   Indic = Noto Sans (Devanagari / Tamil / Telugu)
 *
 * Type scale derived from utopia.fyi between 375px and 1440px viewports.
 */

export const fontFamily = {
  display: 'var(--font-display)',
  body: 'var(--font-body)',
  mono: 'var(--font-mono)',
  hi: 'var(--font-hi)',
  ta: 'var(--font-ta)',
  te: 'var(--font-te)',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 900, // reserved for "earned" gold moments only
} as const;

/**
 * Fluid type scale — clamp(min, ideal, max).
 * Mobile baseline 375px, desktop apex 1440px.
 */
export const fontSize = {
  // Display — marketing + earned moments
  'display-2xl': 'clamp(3rem, 2.4rem + 2.6vw, 5.5rem)',
  'display-xl': 'clamp(2.5rem, 2.05rem + 1.95vw, 4rem)',
  'display-l': 'clamp(2rem, 1.65rem + 1.55vw, 3rem)',
  'display-m': 'clamp(1.5rem, 1.3rem + 0.9vw, 2.25rem)',
  'display-s': 'clamp(1.25rem, 1.13rem + 0.55vw, 1.75rem)',

  // Headings
  h1: 'clamp(1.5rem, 1.4rem + 0.45vw, 2rem)',
  h2: 'clamp(1.25rem, 1.2rem + 0.2vw, 1.5rem)',
  h3: 'clamp(1.125rem, 1.1rem + 0.1vw, 1.25rem)',
  h4: 'clamp(1rem, 0.97rem + 0.13vw, 1.125rem)',

  // Body
  'body-l': 'clamp(1rem, 0.97rem + 0.13vw, 1.125rem)',
  'body-m': 'clamp(0.875rem, 0.81rem + 0.27vw, 1rem)',
  'body-s': 'clamp(0.8125rem, 0.79rem + 0.09vw, 0.875rem)',
  caption: '0.75rem',
  micro: '0.6875rem',
} as const;

export const lineHeight = {
  tight: '1.05',
  display: '1.15',
  heading: '1.25',
  body: '1.55',
  bodyTight: '1.45',
  flat: '1.0',
} as const;

export const letterSpacing = {
  tighter: '-0.02em',
  tight: '-0.015em',
  snug: '-0.01em',
  normal: '0',
  wide: '0.04em',
} as const;

export type FontFamilyToken = keyof typeof fontFamily;
export type FontWeightToken = keyof typeof fontWeight;
export type FontSizeToken = keyof typeof fontSize;
