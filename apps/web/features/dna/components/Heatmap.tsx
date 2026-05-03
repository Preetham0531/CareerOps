import { cn } from '@/lib/cn';

interface HeatmapProps {
  cells: Array<{ day: number; hour: number; applies: number; callbacks: number }>;
}

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

/**
 * Time-of-day heatmap — 7 rows × 24 cols.
 * Single-hue teal sequential scale per docs/frontend/12-data-viz.md.
 */
export function Heatmap({ cells }: HeatmapProps) {
  // Build a lookup
  const map = new Map<string, { applies: number; callbacks: number }>();
  cells.forEach((c) => map.set(`${c.day}-${c.hour}`, c));
  const maxApplies = Math.max(1, ...cells.map((c) => c.applies));

  return (
    <section
      aria-label="Time-of-day heatmap"
      className="rounded-md border border-border-subtle bg-bg-surface p-5 overflow-x-auto"
    >
      <header className="mb-4">
        <h2 className="text-h3 font-semibold text-fg-primary">Time-of-day heatmap</h2>
        <p className="mt-1 text-caption text-fg-muted">
          Applies by day-of-week × hour-of-day · darker = more
        </p>
      </header>

      <div className="grid grid-cols-[24px_1fr] gap-2 min-w-[600px]">
        <span aria-hidden />
        <div className="grid grid-cols-24 gap-0.5 text-caption text-fg-muted">
          {[0, 6, 12, 18].map((h) => (
            <span key={h} style={{ gridColumn: `${h + 1} / span 1` }}>
              {h}
            </span>
          ))}
        </div>

        {DAYS.map((d, dayIdx) => (
          <RowFragment key={dayIdx} day={d}>
            {HOURS.map((hour) => {
              const c = map.get(`${dayIdx}-${hour}`);
              const intensity = c ? c.applies / maxApplies : 0;
              return (
                <span
                  key={hour}
                  title={c ? `${d} ${hour}:00 — ${c.applies} applies, ${c.callbacks} cb` : 'no activity'}
                  className={cn(
                    'block aspect-square h-3 rounded-xs transition-colors',
                    intensityClass(intensity),
                  )}
                />
              );
            })}
          </RowFragment>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-caption text-fg-muted">
        less
        <span className={cn('h-2 w-2 rounded-xs', intensityClass(0))} />
        <span className={cn('h-2 w-2 rounded-xs', intensityClass(0.25))} />
        <span className={cn('h-2 w-2 rounded-xs', intensityClass(0.5))} />
        <span className={cn('h-2 w-2 rounded-xs', intensityClass(0.75))} />
        <span className={cn('h-2 w-2 rounded-xs', intensityClass(1))} />
        more
      </div>
    </section>
  );
}

function intensityClass(v: number): string {
  if (v === 0) return 'bg-bg-raised';
  if (v < 0.25) return 'bg-teal-100';
  if (v < 0.5) return 'bg-teal-300';
  if (v < 0.75) return 'bg-teal-500';
  return 'bg-teal-700';
}

function RowFragment({ day, children }: { day: string; children: React.ReactNode }) {
  return (
    <>
      <span className="text-caption font-medium text-fg-secondary">{day}</span>
      <div className="grid grid-cols-24 gap-0.5">{children}</div>
    </>
  );
}
