/**
 * Shadows — shipped per theme.
 *
 * Per docs/frontend/02-color-system.md, shadows are tonal — derived from
 * teal-950 in dark and neutral-700 in light, never pure black.
 */

export const shadowsLight = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(54, 52, 46, 0.04)',
  md: '0 4px 8px -2px rgba(54, 52, 46, 0.06), 0 2px 4px -2px rgba(54, 52, 46, 0.04)',
  lg: '0 8px 24px -4px rgba(54, 52, 46, 0.08), 0 4px 8px -2px rgba(54, 52, 46, 0.04)',
  xl: '0 16px 40px -8px rgba(54, 52, 46, 0.12), 0 6px 12px -4px rgba(54, 52, 46, 0.06)',
  // hover lift on cards (matches 06-motion-system.md hover lift recipe)
  cardHover: '0 8px 24px hsl(178 70% 11% / 0.16)',
} as const;

export const shadowsDark = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(7, 32, 31, 0.4)',
  md: '0 4px 8px -2px rgba(7, 32, 31, 0.5), 0 2px 4px -2px rgba(7, 32, 31, 0.3)',
  lg: '0 8px 24px -4px rgba(7, 32, 31, 0.6), 0 4px 8px -2px rgba(7, 32, 31, 0.3)',
  xl: '0 16px 40px -8px rgba(7, 32, 31, 0.7), 0 6px 12px -4px rgba(7, 32, 31, 0.4)',
  cardHover: '0 8px 24px hsl(178 70% 4% / 0.6)',
} as const;

export type ShadowToken = keyof typeof shadowsLight;
