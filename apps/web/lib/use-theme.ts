'use client';

import { useCallback, useEffect, useState } from 'react';

import { applyTheme, readStoredTheme, type ThemeMode } from './theme';

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>('system');

  useEffect(() => {
    setMode(readStoredTheme());
  }, []);

  const setTheme = useCallback((next: ThemeMode) => {
    applyTheme(next);
    setMode(next);
  }, []);

  const toggle = useCallback(() => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  return { mode, setTheme, toggle };
}
