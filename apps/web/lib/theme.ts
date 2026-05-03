/**
 * Theme orchestration.
 *
 * Per docs/frontend/02-color-system.md:
 *   - Default: dark (most users hit the product evening hours)
 *   - System preference (prefers-color-scheme) used as initial fallback
 *   - User preference stored in cookie + Zustand
 *   - No FOUC — inline script in <head> applies stored value before hydration
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export const THEME_STORAGE_KEY = 'careerops:theme';

/**
 * Inline script string injected into <head> via next/script `beforeInteractive`.
 * Must be a string of plain JS — runs before React hydrates to prevent flash.
 */
export const themeBootstrapScript = `
(function () {
  try {
    var stored = document.cookie
      .split('; ')
      .find(function (r) { return r.indexOf('${THEME_STORAGE_KEY}=') === 0; });
    var pref = stored ? stored.split('=')[1] : 'system';
    var resolved = pref;
    if (pref === 'system' || !pref) {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', resolved);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`.trim();

export function applyTheme(mode: ThemeMode): void {
  const resolved =
    mode === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : mode;

  document.documentElement.setAttribute('data-theme', resolved);
  document.cookie = `${THEME_STORAGE_KEY}=${mode}; path=/; max-age=31536000; samesite=lax`;
}

export function readStoredTheme(): ThemeMode {
  if (typeof document === 'undefined') return 'system';
  const match = document.cookie
    .split('; ')
    .find((r) => r.startsWith(`${THEME_STORAGE_KEY}=`));
  if (!match) return 'system';
  const value = match.split('=')[1];
  if (value === 'light' || value === 'dark' || value === 'system') return value;
  return 'system';
}
