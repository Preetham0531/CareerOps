import { Skeleton } from '@careerops/ui';

interface GreetingBandProps {
  user?: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'late';
  summary?: string;
  loading?: boolean;
}

export function GreetingBand({ user, timeOfDay, summary, loading }: GreetingBandProps) {
  return (
    <header className="aurora-bg -mx-4 rounded-lg p-8 sm:-mx-6 lg:-mx-0 lg:p-12">
      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-5 w-96" />
        </div>
      ) : (
        <>
          <h1 className="font-display text-display-xl font-bold text-fg-primary">
            Good {timeOfDay ?? 'evening'}, {user?.split(' ')[0] ?? 'you'}.
          </h1>
          <p className="mt-2 max-w-2xl text-body-l text-fg-secondary">{summary}</p>
        </>
      )}
    </header>
  );
}
