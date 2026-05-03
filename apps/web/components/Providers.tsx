'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider, Toaster } from '@careerops/ui';

import { initMocks } from '@/mocks/init';

/**
 * Client-side providers wrapper.
 * Wrapped around any route group that talks to the API.
 */

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            gcTime: 5 * 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  const [mocksReady, setMocksReady] = useState(
    process.env.NEXT_PUBLIC_MOCKS !== 'true',
  );

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MOCKS !== 'true') return;
    initMocks().finally(() => setMocksReady(true));
  }, []);

  if (!mocksReady) {
    // Tiny invisible gate while service worker is registering — avoids
    // races where the first fetch happens before MSW intercepts.
    return null;
  }

  return (
    <QueryClientProvider client={client}>
      <TooltipProvider delayDuration={500}>{children}</TooltipProvider>
      <Toaster />
    </QueryClientProvider>
  );
}
