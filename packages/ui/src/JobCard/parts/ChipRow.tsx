import { Chip } from '../../Chip/Chip';
import { cn } from '../../utils/cn';

export interface ChipRowProps {
  perks: string[];
  className?: string;
}

export function ChipRow({ perks, className }: ChipRowProps) {
  if (!perks.length) return null;
  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {perks.map((p) => (
        <Chip key={p} size="sm" variant="neutral">
          {p}
        </Chip>
      ))}
    </div>
  );
}
