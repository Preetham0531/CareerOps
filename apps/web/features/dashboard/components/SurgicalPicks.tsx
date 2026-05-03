'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { JobCard, type JobData } from '@careerops/ui';

import { cn } from '@/lib/cn';

interface SurgicalPicksProps {
  picks: JobData[];
  onSelect?: (job: JobData) => void;
  onSaveToggle?: (job: JobData) => void;
  onApply?: (job: JobData) => void;
  onViewReferrers?: (job: JobData) => void;
  onTailorCV?: (job: JobData) => void;
  className?: string;
}

const ROTATE_MS = 6000;

export function SurgicalPicks({
  picks,
  onSelect,
  onSaveToggle,
  onApply,
  onViewReferrers,
  onTailorCV,
  className,
}: SurgicalPicksProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotate. Per docs/frontend/06-motion-system.md, respects reduced-motion via the
  // CSS guard set in globals.css (transitions become 0ms; the timer still ticks but the
  // user already sees state changes without disorienting motion).
  useEffect(() => {
    if (paused || picks.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % picks.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, picks.length]);

  // 3D tilt — only on this primary tile (per 07-trending-design-tactics.md)
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-1, 1], [4, -4]), { stiffness: 300, damping: 30 });
  const ry = useSpring(useTransform(x, [-1, 1], [-4, 4]), { stiffness: 300, damping: 30 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    y.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
    setPaused(false);
  }

  if (!picks.length) return null;
  const job = picks[active]!;

  return (
    <section
      aria-label="Today's surgical picks"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={handleLeave}
      className={cn('relative', className)}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-h3 font-semibold text-fg-primary">Today's surgical picks</h2>
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Pick">
          {picks.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show pick ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                'h-1.5 rounded-pill transition-all',
                i === active ? 'w-6 bg-brand' : 'w-1.5 bg-bg-raised',
              )}
            />
          ))}
        </div>
      </div>

      <motion.div
        ref={containerRef}
        onMouseMove={handleMove}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 1200 }}
        className="relative"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
          >
            <JobCard
              job={job}
              density="expanded"
              onSelect={onSelect}
              onSaveToggle={onSaveToggle}
              onApply={onApply}
              onViewReferrers={onViewReferrers}
              onTailorCV={onTailorCV}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
