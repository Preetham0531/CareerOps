/**
 * Background service worker (MV3).
 *
 * Day 7 ships:
 *   - Job-detected message handling (logs + storage)
 *   - Auth-token sync surface (sprint-2: actual OAuth)
 *
 * MV3 service workers terminate aggressively; persist any state in chrome.storage.local.
 */

interface JobDetected {
  kind: 'co:job-detected';
  title: string;
  company: string;
  url: string;
}

chrome.runtime.onMessage.addListener((msg: JobDetected, sender) => {
  if (msg.kind !== 'co:job-detected') return;
  void chrome.storage.local.set({
    'careerops:lastDetected': {
      ...msg,
      tabId: sender.tab?.id ?? null,
      at: new Date().toISOString(),
    },
  });
});

// First-install: open onboarding
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    void chrome.tabs.create({ url: 'https://careerops.in/start' });
  }
});
