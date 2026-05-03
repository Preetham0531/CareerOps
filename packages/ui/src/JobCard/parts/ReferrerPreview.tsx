import { Avatar, AvatarStack } from '../../Avatar/Avatar';
import { cn } from '../../utils/cn';
import type { ReferralPathSummary } from '../types';

export interface ReferrerPreviewProps {
  referralPath: ReferralPathSummary;
  onView?: () => void;
  className?: string;
}

export function ReferrerPreview({ referralPath, onView, className }: ReferrerPreviewProps) {
  const { count, top } = referralPath;
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <AvatarStack max={3} size="sm">
        {top.map((r) => (
          <Avatar key={r.name} size="sm" src={r.avatarSrc} alt={r.name} fallback={r.name} />
        ))}
      </AvatarStack>
      <span className="text-body-s text-fg-secondary">
        {count} {count === 1 ? 'mutual contact' : 'mutual contacts'} · referral path available
      </span>
      {onView && (
        <button
          type="button"
          onClick={onView}
          className="text-body-s font-medium text-brand underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          View referrers ›
        </button>
      )}
    </div>
  );
}
