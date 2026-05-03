import { cn } from '@/lib/cn';
import type { Claim } from '@careerops/api-client';

interface ClaimRowProps {
  claim: Claim;
  selected?: boolean;
  onSelect?: () => void;
}

const CATEGORY_LABEL: Record<Claim['category'], string> = {
  lang: 'Language',
  framework: 'Framework',
  domain: 'Domain',
  tool: 'Tool',
  soft: 'Soft skill',
};

export function ClaimRow({ claim, selected, onSelect }: ClaimRowProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-3 rounded-md border border-border-subtle bg-bg-surface p-3 text-left transition-colors',
        'hover:border-border-default',
        selected && 'border-brand bg-success-bg/40',
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="font-medium text-body-m text-fg-primary">{claim.text}</p>
        <p className="text-caption text-fg-muted">
          {CATEGORY_LABEL[claim.category]} · {claim.evidenceIds.length} pieces of evidence
        </p>
      </div>
      <span className="flex shrink-0 gap-0.5" aria-label={`Strength ${claim.strength} of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'block h-2 w-2 rounded-pill',
              i < claim.strength ? 'bg-brand' : 'bg-bg-raised',
            )}
          />
        ))}
      </span>
    </button>
  );
}
