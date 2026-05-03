/**
 * Color ramps — teal (primary) + gold (accent) + warm-cool neutrals.
 *
 * Hard rule per docs/frontend/02-color-system.md:
 *   Every product surface uses ONLY teal + gold + their derived neutrals.
 *   Semantic states (success/warn/danger) are mixed inside this space.
 *   No rogue red/green/blue/purple ever enters the palette.
 */

export const teal = {
  50: '#EAFBFA',
  100: '#C8F4F0',
  200: '#95E7DF',
  300: '#5AD3C7',
  400: '#2EB8AA',
  500: '#14998D',
  600: '#0D7A72',
  700: '#0A615C',
  800: '#0A4A47',
  900: '#0B3633',
  950: '#07201F',
} as const;

export const gold = {
  50: '#FFF8E8',
  100: '#FFEEC2',
  200: '#FBE08E',
  300: '#F4CC56',
  400: '#E5B731',
  500: '#C9991D',
  600: '#A37B14',
  700: '#7E5E0F',
  800: '#5C440B',
  900: '#3F2F08',
  950: '#261C04',
} as const;

/**
 * Neutrals sit slightly warm in light mode, slightly cool in dark mode —
 * keeping the whole palette feeling like one family. We do not use a true gray.
 */
export const neutral = {
  0: '#FFFFFF',
  50: '#FAFAF7',
  100: '#F2F1ED',
  200: '#E5E3DC',
  300: '#C9C6BC',
  400: '#9C9890',
  500: '#6F6B62',
  600: '#4F4C44',
  700: '#36342E',
  800: '#25241F',
  900: '#181714',
  950: '#0E0D0A',
} as const;

export type TealScale = typeof teal;
export type GoldScale = typeof gold;
export type NeutralScale = typeof neutral;

export const ramps = { teal, gold, neutral } as const;
