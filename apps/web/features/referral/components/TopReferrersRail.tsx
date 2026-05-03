import { Avatar, Button } from '@careerops/ui';

import { cn } from '@/lib/cn';

interface TopReferrer {
  id: string;
  name: string;
  role: string;
  company: string;
  score: number;
  activityNote: string;
  pathLabel: string;
}

interface TopReferrersRailProps {
  referrers: TopReferrer[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCompose: (id: string) => void;
}

export function TopReferrersRail({
  referrers,
  selectedId,
  onSelect,
  onCompose,
}: TopReferrersRailProps) {
  return (
    <aside
      aria-label="Top referrers"
      className="flex h-full w-full flex-col border-l border-border-subtle bg-bg-surface lg:w-[360px]"
    >
      <header className="border-b border-border-subtle px-4 py-3">
        <h2 className="text-h3 font-semibold text-fg-primary">Top referrers</h2>
        <p className="mt-0.5 text-caption text-fg-muted">Ranked by reachability score</p>
      </header>
      <div className="flex-1 overflow-y-auto p-2">
        <ul className="flex flex-col gap-1">
          {referrers.map((r, i) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => onSelect(r.id)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-md p-3 text-left transition-colors',
                  'hover:bg-bg-raised',
                  selectedId === r.id && 'bg-bg-raised ring-1 ring-brand',
                )}
              >
                <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-bg-app text-caption font-semibold tabular text-fg-secondary">
                  {i + 1}
                </span>
                <Avatar size="md" alt={r.name} fallback={r.name} />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-body-m text-fg-primary truncate">{r.name}</p>
                  <p className="text-caption text-fg-secondary truncate">
                    {r.role} · {r.company}
                  </p>
                  <p className="mt-0.5 text-caption text-fg-muted truncate">{r.activityNote}</p>
                </div>
                <span className="text-caption font-semibold tabular text-brand">
                  {(r.score * 100).toFixed(0)}
                </span>
              </button>
              <div className="px-3 pb-2">
                <Button
                  size="xs"
                  variant="ghost"
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    onCompose(r.id);
                  }}
                >
                  Compose DM
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
