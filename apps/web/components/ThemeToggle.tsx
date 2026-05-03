'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/lib/use-theme';

export function ThemeToggle() {
  const { toggle } = useTheme();
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle bg-bg-surface text-fg-primary transition-colors duration-fast ease-standard hover:bg-bg-raised"
    >
      <Sun aria-hidden className="h-4 w-4 dark:hidden" />
      <Moon aria-hidden className="hidden h-4 w-4 dark:block" />
    </button>
  );
}
