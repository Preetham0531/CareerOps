/**
 * Self-hosted fonts via next/font.
 *
 * Per docs/frontend/03-typography.md:
 *   - Display: Fraunces (variable opsz/wght/SOFT)
 *   - Body: Geist (Inter fallback below at the CSS level)
 *   - Mono: JetBrains Mono
 *   - Indic: Noto Sans Devanagari / Tamil / Telugu — conditionally needed
 *
 * Subsetting: latin for body/mono; per-script for Indic.
 * No runtime Google Fonts call — privacy + perf.
 */

import {
  Fraunces,
  Inter,
  JetBrains_Mono,
  Noto_Sans_Devanagari,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
} from 'next/font/google';

export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-display',
  axes: ['SOFT', 'opsz'],
});

export const geist = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const notoHi = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  display: 'swap',
  variable: '--font-hi',
  weight: ['400', '500', '600', '700'],
});

export const notoTa = Noto_Sans_Tamil({
  subsets: ['tamil'],
  display: 'swap',
  variable: '--font-ta',
  weight: ['400', '500', '600', '700'],
});

export const notoTe = Noto_Sans_Telugu({
  subsets: ['telugu'],
  display: 'swap',
  variable: '--font-te',
  weight: ['400', '500', '600', '700'],
});

/**
 * Combined className for <html> — applies all font CSS variables.
 * Indic fonts only render their glyphs when matched by `unicode-range`,
 * so adding the variable is harmless on routes that don't use them.
 */
export const fontVariables = [
  fraunces.variable,
  geist.variable,
  jetbrainsMono.variable,
  notoHi.variable,
  notoTa.variable,
  notoTe.variable,
].join(' ');
