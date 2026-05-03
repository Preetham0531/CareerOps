import {
  EvidenceLeaf,
} from '@careerops/icons';
import { ExternalLink, Github, Link2, Mic, Award, Briefcase, FileText, Presentation } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { Evidence } from '@careerops/api-client';

const TYPE_ICON: Record<Evidence['type'], React.ComponentType<{ className?: string }>> = {
  github: Github,
  leetcode: Award,
  kaggle: Award,
  blog: FileText,
  talk: Presentation,
  hackathon: Award,
  cert: EvidenceLeaf,
  project: Briefcase,
  manual: Link2,
};

const TYPE_LABEL: Record<Evidence['type'], string> = {
  github: 'GitHub',
  leetcode: 'LeetCode',
  kaggle: 'Kaggle',
  blog: 'Blog',
  talk: 'Talk',
  hackathon: 'Hackathon',
  cert: 'Cert',
  project: 'Project',
  manual: 'Manual',
};

export function EvidenceCard({ ev }: { ev: Evidence }) {
  const Icon = TYPE_ICON[ev.type] ?? Mic;
  const metricsEntries = ev.metrics ? Object.entries(ev.metrics) : [];

  return (
    <article className="rounded-md border border-border-subtle bg-bg-surface p-3">
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md',
            'bg-bg-raised text-fg-secondary',
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-caption font-semibold uppercase tracking-wide text-fg-muted">
            {TYPE_LABEL[ev.type]}
          </p>
          <h3 className="font-medium text-body-m text-fg-primary truncate">{ev.title}</h3>
          {ev.description && (
            <p className="mt-1 text-body-s text-fg-secondary line-clamp-2">{ev.description}</p>
          )}
          {metricsEntries.length > 0 && (
            <p className="mt-2 flex flex-wrap gap-2 text-caption text-fg-muted">
              {metricsEntries.map(([k, v]) => (
                <span key={k}>
                  <span className="font-semibold tabular text-fg-secondary">
                    {String(v)}
                  </span>{' '}
                  {k}
                </span>
              ))}
            </p>
          )}
        </div>
        {ev.url && (
          <a
            href={ev.url}
            target="_blank"
            rel="noreferrer"
            aria-label="Open source"
            className="rounded-md p-1 text-fg-muted hover:bg-bg-raised hover:text-fg-primary"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </article>
  );
}
