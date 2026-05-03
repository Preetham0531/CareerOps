'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Send } from 'lucide-react';
import { Avatar, Button, LoadingSpinner } from '@careerops/ui';
import { useThread } from '@careerops/api-client';

import { cn } from '@/lib/cn';

function relative(iso: string): string {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function ThreadView() {
  const router = useRouter();
  const params = useParams<{ threadId: string }>();
  const { data, isLoading } = useThread(params?.threadId ?? null);
  const [reply, setReply] = useState('');

  return (
    <div className="container py-6">
      <button
        type="button"
        onClick={() => router.push('/inbox')}
        className="mb-4 inline-flex items-center gap-1 text-body-s font-medium text-fg-secondary hover:text-fg-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Inbox
      </button>

      {isLoading || !data ? (
        <LoadingSpinner size="block" label="Loading thread…" />
      ) : (
        <article className="rounded-md border border-border-subtle bg-bg-surface">
          <header className="flex items-center gap-3 border-b border-border-subtle p-4">
            <Avatar size="lg" alt={data.thread.with} fallback={data.thread.with} />
            <div>
              <h1 className="font-display text-h2 font-semibold text-fg-primary">
                {data.thread.with}
              </h1>
              <p className="text-body-s text-fg-secondary">
                {data.thread.withRole} · {data.thread.withCompany}
              </p>
            </div>
          </header>

          <ul className="flex flex-col gap-4 p-4">
            {data.messages.map((m) => (
              <li
                key={m.id}
                className={cn('flex', m.from === 'you' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[75%] whitespace-pre-line rounded-md p-3 text-body-s',
                    m.from === 'you'
                      ? 'bg-brand text-fg-inverse'
                      : 'bg-bg-raised text-fg-primary',
                  )}
                >
                  {m.body}
                  <p
                    className={cn(
                      'mt-1 text-caption',
                      m.from === 'you' ? 'text-fg-inverse/70' : 'text-fg-muted',
                    )}
                  >
                    {relative(m.at)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <footer className="border-t border-border-subtle p-3">
            <div className="flex items-end gap-2">
              <textarea
                rows={3}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Reply…"
                className="flex-1 resize-none rounded-md border border-border-default bg-bg-surface p-2 text-body-s outline-none focus-visible:border-brand"
              />
              <Button
                size="md"
                disabled={!reply.trim()}
                onClick={() => setReply('')}
                trailingIcon={<Send className="h-4 w-4" />}
              >
                Send
              </Button>
            </div>
          </footer>
        </article>
      )}
    </div>
  );
}
