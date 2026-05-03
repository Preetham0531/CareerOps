import { cn } from '../../utils/cn';

export interface CompanyLogoProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-caption',
  md: 'h-10 w-10 text-body-s',
  lg: 'h-12 w-12 text-body-m',
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

export function CompanyLogo({ src, name, size = 'md', className }: CompanyLogoProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-bg-raised font-semibold text-fg-primary',
        sizeClasses[size],
        className,
      )}
      aria-hidden
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
      ) : (
        initials(name)
      )}
    </span>
  );
}
