'use client';

import { useEffect, useState } from 'react';

import { cn } from '../utils/cn';

/**
 * Top-of-screen banner shown while navigator.onLine is false.
 * Per docs/frontend/13-empty-error-loading.md offline support.
 */

export interface OfflineBannerProps {
  className?: string;
  message?: string;
}

export function OfflineBanner({
  className,
  message = "You're offline. Changes will sync when you reconnect.",
}: OfflineBannerProps) {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  if (online) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'sticky top-0 z-sticky flex items-center justify-center bg-warning-bg px-4 py-2 text-body-s font-medium text-warning',
        className,
      )}
    >
      {message}
    </div>
  );
}
