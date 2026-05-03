interface TimelineEntry {
  date: string;
  applied: number;
  callbacks: number;
  interviews: number;
  offers: number;
}

/**
 * 14-day stacked-bar timeline. Stages colored:
 *   applied     teal-300
 *   callbacks   teal-500
 *   interviews  teal-700
 *   offers      gold-400 (the earned moment)
 */
export function ApplicationTimeline({ entries }: { entries: TimelineEntry[] }) {
  const max = Math.max(
    1,
    ...entries.map((e) => e.applied + e.callbacks + e.interviews + e.offers),
  );

  return (
    <section
      aria-label="Application timeline (14 days)"
      className="rounded-md border border-border-subtle bg-bg-surface p-5"
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-h3 font-semibold text-fg-primary">14-day timeline</h2>
        <Legend />
      </header>
      <div className="flex h-32 items-end gap-1">
        {entries.map((e) => {
          const total = e.applied + e.callbacks + e.interviews + e.offers;
          const pct = total / max;
          return (
            <div
              key={e.date}
              className="group relative flex h-full flex-1 flex-col-reverse rounded-sm bg-bg-raised/40"
              style={{ minHeight: 4 }}
              title={`${e.date} · ${total}`}
            >
              {/* applied (bottom) */}
              <BarSegment value={e.applied} max={max} className="bg-teal-300" />
              <BarSegment value={e.callbacks} max={max} className="bg-teal-500" />
              <BarSegment value={e.interviews} max={max} className="bg-teal-700" />
              <BarSegment value={e.offers} max={max} className="bg-accent" />
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-caption text-fg-muted tabular">
        {entries[0]?.date.slice(5)} – {entries[entries.length - 1]?.date.slice(5)}
      </p>
    </section>
  );
}

function BarSegment({ value, max, className }: { value: number; max: number; className: string }) {
  if (value === 0) return null;
  const pct = (value / max) * 100;
  return <span className={className} style={{ height: `${pct}%`, minHeight: 2 }} />;
}

function Legend() {
  return (
    <div className="flex items-center gap-3 text-caption text-fg-secondary">
      <Item color="bg-teal-300" label="Applied" />
      <Item color="bg-teal-500" label="Callbacks" />
      <Item color="bg-teal-700" label="Interviews" />
      <Item color="bg-accent" label="Offers" />
    </div>
  );
}

function Item({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`block h-2 w-2 rounded-pill ${color}`} aria-hidden />
      {label}
    </span>
  );
}
