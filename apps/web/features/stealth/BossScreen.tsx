'use client';

/**
 * Boss screen — neutral cover overlay that pauses any sensitive UI.
 * Press any key (or ⌘Shift+H again) to dismiss.
 */
export function BossScreen() {
  return (
    <div
      role="dialog"
      aria-label="Privacy cover"
      aria-modal="true"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg-app"
    >
      {/* Tiny brand mark — barely identifiable */}
      <span className="font-display text-display-l font-light text-fg-muted">CareerOps</span>
    </div>
  );
}
