import type { Config } from 'tailwindcss';
import {
  teal,
  gold,
  neutral,
  spacing,
  radii,
  zIndex,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  easings,
  durationsSeconds,
} from '@careerops/tokens';

/**
 * Tailwind reads design tokens via CSS variables for runtime theming
 * and direct values for build-time scales.
 */
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1320px',
        '2xl': '1480px',
      },
    },
    extend: {
      colors: {
        // Ramps (build-time)
        teal,
        gold,
        neutral,
        // Semantic (runtime via CSS variables)
        'bg-app': 'var(--bg-app)',
        'bg-surface': 'var(--bg-surface)',
        'bg-raised': 'var(--bg-raised)',
        'bg-overlay': 'var(--bg-overlay)',
        'fg-primary': 'var(--text-primary)',
        'fg-secondary': 'var(--text-secondary)',
        'fg-muted': 'var(--text-muted)',
        'fg-inverse': 'var(--text-inverse)',
        'border-subtle': 'var(--border-subtle)',
        'border-default': 'var(--border-default)',
        'border-strong': 'var(--border-strong)',
        brand: 'var(--brand)',
        'brand-hover': 'var(--brand-hover)',
        'brand-pressed': 'var(--brand-pressed)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'focus-ring': 'var(--focus-ring)',
        success: 'var(--success)',
        'success-bg': 'var(--success-bg)',
        warning: 'var(--warning)',
        'warning-bg': 'var(--warning-bg)',
        danger: 'var(--danger)',
        'danger-bg': 'var(--danger-bg)',
        'ghost-flag': 'var(--ghost-flag)',
        'bond-flag': 'var(--bond-flag)',
      },
      spacing: spacing as Record<string, string>,
      borderRadius: radii as Record<string, string>,
      zIndex: Object.fromEntries(
        Object.entries(zIndex).map(([k, v]) => [k, String(v)]),
      ) as Record<string, string>,
      fontFamily: {
        display: 'var(--font-display)',
        sans: 'var(--font-body)',
        mono: 'var(--font-mono)',
        hi: 'var(--font-hi)',
        ta: 'var(--font-ta)',
        te: 'var(--font-te)',
      },
      fontWeight: Object.fromEntries(
        Object.entries(fontWeight).map(([k, v]) => [k, String(v)]),
      ) as Record<string, string>,
      fontSize: fontSize as Record<string, string>,
      lineHeight: lineHeight as Record<string, string>,
      letterSpacing: letterSpacing as Record<string, string>,
      transitionTimingFunction: easings,
      transitionDuration: Object.fromEntries(
        Object.entries(durationsSeconds).map(([k, v]) => [k, `${v * 1000}ms`]),
      ),
    },
  },
  plugins: [],
};

export default config;
