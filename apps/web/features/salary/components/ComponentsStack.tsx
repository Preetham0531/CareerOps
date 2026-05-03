interface ComponentsStackProps {
  components: {
    base: [number, number];
    variable: [number, number];
    esop?: { percent: number; cliffYears: number; vestYears: number };
    joiningBonus?: [number, number];
  };
}

const LAKH = 100_000;
function lpa(v: number) {
  return `₹${(v / LAKH).toFixed(0)}L`;
}

export function ComponentsStack({ components }: ComponentsStackProps) {
  const baseMax = components.base[1];
  const varMax = components.variable[1];
  const joiningMax = components.joiningBonus?.[1] ?? 0;
  const total = baseMax + varMax + joiningMax;

  const segments = [
    { label: 'Base', range: components.base, color: 'bg-brand', share: baseMax / total },
    { label: 'Variable', range: components.variable, color: 'bg-teal-300', share: varMax / total },
    ...(components.joiningBonus
      ? [
          {
            label: 'Joining',
            range: components.joiningBonus,
            color: 'bg-accent',
            share: joiningMax / total,
          },
        ]
      : []),
  ];

  return (
    <section
      aria-label="Comp components breakdown"
      className="rounded-md border border-border-subtle bg-bg-surface p-5"
    >
      <h3 className="mb-3 text-caption font-semibold uppercase tracking-wide text-fg-muted">
        Components breakdown
      </h3>
      <div className="flex h-3 w-full overflow-hidden rounded-pill bg-bg-raised">
        {segments.map((s) => (
          <span
            key={s.label}
            className={s.color}
            style={{ width: `${s.share * 100}%` }}
            title={`${s.label} ${lpa(s.range[0])}–${lpa(s.range[1])}`}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-2 text-body-s">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-fg-secondary">
              <span className={`h-2 w-2 rounded-pill ${s.color}`} aria-hidden />
              {s.label}
            </span>
            <span className="tabular text-fg-primary">
              {lpa(s.range[0])}–{lpa(s.range[1])}
            </span>
          </li>
        ))}
        {components.esop && (
          <li className="flex items-center justify-between border-t border-border-subtle pt-2 text-fg-secondary">
            <span>ESOP</span>
            <span className="tabular text-fg-primary">
              {(components.esop.percent * 100).toFixed(2)}% · {components.esop.cliffYears}y cliff /{' '}
              {components.esop.vestYears}y vest
            </span>
          </li>
        )}
      </ul>
    </section>
  );
}
