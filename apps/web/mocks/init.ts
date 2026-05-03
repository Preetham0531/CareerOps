'use client';

let started = false;

/** Initialize MSW in the browser. No-op outside dev or when already running. */
export async function initMocks(): Promise<void> {
  if (started) return;
  if (typeof window === 'undefined') return;
  if (process.env.NEXT_PUBLIC_MOCKS !== 'true') return;

  const { setupWorker } = await import('msw/browser');
  const { handlers } = await import('./handlers');
  const worker = setupWorker(...handlers);
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: { url: '/mockServiceWorker.js' },
  });
  started = true;
}
