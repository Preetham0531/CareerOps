import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface DNAInsightTileProps {
  quote: string;
  href: string;
}

export function DNAInsightTile({ quote, href }: DNAInsightTileProps) {
  return (
    <section
      aria-label="Application DNA insight"
      className="rounded-md border border-border-subtle bg-bg-surface p-6"
    >
      <p className="text-caption font-semibold uppercase tracking-wide text-fg-muted">
        Application DNA insight
      </p>
      <p className="mt-3 max-w-2xl font-display text-display-s leading-display text-fg-primary">
        “{quote}”
      </p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-1 text-body-s font-medium text-brand underline-offset-4 hover:underline"
      >
        See full analysis <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
