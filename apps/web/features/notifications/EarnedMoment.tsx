'use client';

import { motion } from 'framer-motion';
import { OfferTrophy } from '@careerops/icons';

/**
 * One-shot CSS-driven celebration. Per docs/frontend/06-motion-system.md:
 *   - Trophy scale 1 → 1.02 (200ms)
 *   - Gold border glows from 0 → 1 (320ms)
 *   - 12 gold confetti particles drift down (1500ms) and fade
 *   - Total ~2.4s
 *
 * No Lottie this sprint — pure Framer Motion + CSS.
 */
export function EarnedMoment({ visible, onDone }: { visible: boolean; onDone?: () => void }) {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-0 z-[150] flex items-center justify-center"
    >
      {/* Confetti — 12 particles, gold-only */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: -20, x: (i - 6) * 8, scale: 0.8 }}
          animate={{ opacity: [0, 1, 0], y: 240, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.2, 0, 0, 1], delay: 0.2 + i * 0.04 }}
          onAnimationComplete={i === 0 ? onDone : undefined}
          className="absolute h-2 w-2 rounded-pill bg-accent"
        />
      ))}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: [0.95, 1.02, 1], opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.72, ease: [0.34, 1.56, 0.64, 1] }}
        className="rounded-lg border-2 border-accent bg-bg-surface px-6 py-4 text-center shadow-xl"
      >
        <OfferTrophy size={48} className="mx-auto text-accent" />
        <p className="mt-2 font-display text-display-s font-bold text-fg-primary">Offer received!</p>
      </motion.div>
    </div>
  );
}
