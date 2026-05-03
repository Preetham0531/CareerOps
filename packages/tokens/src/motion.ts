/**
 * Motion system — easings, durations, springs.
 *
 * Per docs/frontend/06-motion-system.md:
 *   Five canonical easings, eight canonical durations, four spring presets.
 *   No bespoke cubic-beziers per component.
 *   Reduced-motion always honored upstream.
 */

export const easings = {
  // standard - most UI motion (Material's "ease-in-out")
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // entry - things appearing (decelerate)
  enter: 'cubic-bezier(0, 0, 0.2, 1)',
  // exit - things disappearing (accelerate)
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
  // emphasized - hero/marketing moments (long pause then snap)
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  // expressive - delight moments only (overshoot)
  expressive: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

/** Easings as numeric arrays (consumed by Framer Motion) */
export const easingsArray = {
  standard: [0.4, 0, 0.2, 1] as const,
  enter: [0, 0, 0.2, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
  emphasized: [0.2, 0, 0, 1] as const,
  expressive: [0.34, 1.56, 0.64, 1] as const,
} as const;

export const durations = {
  instant: 50,
  fast: 120,
  base: 200,
  medium: 320,
  slow: 480,
  xslow: 720,
  hero: 1200,
} as const;

/** Same set, expressed in seconds for Framer Motion. */
export const durationsSeconds = {
  instant: 0.05,
  fast: 0.12,
  base: 0.2,
  medium: 0.32,
  slow: 0.48,
  xslow: 0.72,
  hero: 1.2,
} as const;

export const springs = {
  // gentle - default for layout
  gentle: { type: 'spring' as const, stiffness: 200, damping: 26, mass: 1 },
  // crisp - for taps and snaps
  crisp: { type: 'spring' as const, stiffness: 400, damping: 30, mass: 0.8 },
  // bouncy - earned/delight moments
  bouncy: { type: 'spring' as const, stiffness: 320, damping: 18, mass: 1 },
  // floppy - drag dismiss
  floppy: { type: 'spring' as const, stiffness: 120, damping: 22, mass: 1.4 },
} as const;

export const stagger = {
  /** 30ms per item; capped 100ms total in component logic. */
  perItemSeconds: 0.03,
  totalCapSeconds: 0.1,
} as const;

export type EasingToken = keyof typeof easings;
export type DurationToken = keyof typeof durations;
export type SpringToken = keyof typeof springs;
