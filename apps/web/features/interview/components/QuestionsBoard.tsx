'use client';

import { useState } from 'react';
import type { InterviewQuestion } from '@careerops/api-client';

import { cn } from '@/lib/cn';

interface QuestionsBoardProps {
  questions: InterviewQuestion[];
  onUpdateStatus: (questionId: string, status: InterviewQuestion['status']) => void;
}

const COLUMNS: Array<{ value: InterviewQuestion['status']; label: string }> = [
  { value: 'not-started', label: 'Not started' },
  { value: 'practiced', label: 'Practiced' },
  { value: 'mastered', label: 'Mastered' },
];

const ROUND_LABEL: Record<InterviewQuestion['round'], string> = {
  dsa: 'DSA',
  'sys-design': 'Sys design',
  behavioral: 'Behavioral',
  domain: 'Domain',
};

export function QuestionsBoard({ questions, onUpdateStatus }: QuestionsBoardProps) {
  const [dragId, setDragId] = useState<string | null>(null);

  const byColumn: Record<InterviewQuestion['status'], InterviewQuestion[]> = {
    'not-started': [],
    practiced: [],
    mastered: [],
  };
  questions.forEach((q) => byColumn[q.status].push(q));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {COLUMNS.map((col) => (
        <section
          key={col.value}
          aria-label={col.label}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (dragId) onUpdateStatus(dragId, col.value);
            setDragId(null);
          }}
          className="flex flex-col gap-2 rounded-md border border-border-subtle bg-bg-app p-3"
        >
          <header className="flex items-center justify-between">
            <h3 className="text-caption font-semibold uppercase tracking-wide text-fg-muted">
              {col.label}
            </h3>
            <span className="text-caption tabular text-fg-muted">{byColumn[col.value].length}</span>
          </header>
          <ul className="flex flex-col gap-2">
            {byColumn[col.value].map((q) => (
              <li
                key={q.id}
                draggable
                onDragStart={() => setDragId(q.id)}
                onDragEnd={() => setDragId(null)}
                className="cursor-grab rounded-md border border-border-subtle bg-bg-surface p-3 active:cursor-grabbing"
              >
                <p className="text-body-s text-fg-primary line-clamp-3">{q.text}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-pill bg-bg-raised px-2 py-0.5 text-caption text-fg-secondary">
                    {ROUND_LABEL[q.round]}
                  </span>
                  <Difficulty value={q.difficulty} />
                  <Likelihood value={q.likelihood} />
                </div>
                <div className="mt-2 flex justify-end gap-1">
                  {COLUMNS.filter((c) => c.value !== q.status).map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => onUpdateStatus(q.id, c.value)}
                      className="rounded-sm px-2 py-0.5 text-caption text-fg-muted hover:bg-bg-raised hover:text-fg-primary"
                    >
                      → {c.label}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Difficulty({ value }: { value: InterviewQuestion['difficulty'] }) {
  const map = {
    easy: 'bg-success-bg text-brand',
    medium: 'bg-bg-raised text-fg-secondary',
    hard: 'bg-warning-bg text-warning',
  } as const;
  return (
    <span className={cn('rounded-pill px-2 py-0.5 text-caption capitalize', map[value])}>{value}</span>
  );
}

function Likelihood({ value }: { value: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span className="flex gap-0.5" aria-label={`Likelihood ${value}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'block h-1.5 w-1.5 rounded-pill',
            i < value ? 'bg-brand' : 'bg-bg-raised',
          )}
        />
      ))}
    </span>
  );
}
