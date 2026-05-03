/**
 * Spatial system — 4px base.
 *
 * Per docs/frontend/04-spacing-grid-layout.md:
 *   Every spatial measurement is a multiple of 4. No exceptions.
 *   If you reach for 13px or 18px padding, the system is incomplete —
 *   extend deliberately, don't bypass.
 */

export const spacing = {
  0: '0',
  1: '0.25rem',  // 4
  2: '0.5rem',   // 8
  3: '0.75rem',  // 12
  4: '1rem',     // 16
  5: '1.25rem',  // 20
  6: '1.5rem',   // 24
  8: '2rem',     // 32
  10: '2.5rem',  // 40
  12: '3rem',    // 48
  16: '4rem',    // 64
  20: '5rem',    // 80
  24: '6rem',    // 96
} as const;

export const radii = {
  none: '0',
  xs: '0.25rem',   // 4
  sm: '0.375rem',  // 6
  md: '0.5rem',    // 8
  lg: '0.75rem',   // 12
  xl: '1rem',      // 16
  pill: '9999px',
} as const;

/**
 * Z-index scale — strict, finite, no z-index: 9999.
 * Per 04-spacing-grid-layout.md.
 */
export const zIndex = {
  base: 0,
  sticky: 10,
  floating: 20,
  dropdown: 30,
  drawer: 40,
  modal: 50,
  toast: 60,
  palette: 70,
  debug: 80,
  drag: 90,
  tooltip: 100,
} as const;

export const breakpoints = {
  mobile: 0,
  tablet: 640,
  laptop: 1024,
  desktop: 1440,
  large: 1920,
} as const;

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radii;
export type ZIndexToken = keyof typeof zIndex;
export type BreakpointToken = keyof typeof breakpoints;
