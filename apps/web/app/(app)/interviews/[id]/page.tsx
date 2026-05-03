'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Mic } from 'lucide-react';
import { Button, LoadingSpinner, Tabs } from '@careerops/ui';
import { useInterview, useUpdateQuestionStatus } from '@careerops/api-client';

import { QuestionsBoard } from '@/features/interview/components/QuestionsBoard';
import { InterviewerOnePager } from '@/features/interview/components/InterviewerOnePager';

type TabValue = 'questions' | 'interviewer' | 'mock' | 'notes';

export default function InterviewPrepPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id ?? null;
  const { data, isLoading } = useInterview(id);
  const update = useUpdateQuestionStatus();
  const [tab, setTab] = useState<TabValue>('questions');
  const [notes, setNotes] = useState('');

  return (
    <div className="container py-6">
      <button
        type="button"
        onClick={() => router.push('/interviews')}
        className="mb-4 inline-flex items-center gap-1 text-body-s font-medium text-fg-secondary hover:text-fg-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Interviews
      </button>

      {isLoading || !data ? (
        <LoadingSpinner size="block" label="Building prep set…" />
      ) : (
        <>
          <header className="mb-6">
            <h1 className="font-display text-display-l font-bold text-fg-primary">
              {data.role} · {data.company}
            </h1>
            <p className="mt-2 text-body-m text-fg-secondary">
              Scheduled {new Date(data.scheduledAt).toLocaleString('en-IN')}
            </p>
          </header>

          <Tabs value={tab} onValueChange={(v) => setTab(v as TabValue)}>
            <Tabs.List>
              <Tabs.Trigger value="questions">Questions</Tabs.Trigger>
              <Tabs.Trigger value="interviewer">Interviewer</Tabs.Trigger>
              <Tabs.Trigger value="mock">Mock</Tabs.Trigger>
              <Tabs.Trigger value="notes">Notes</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="questions" className="mt-6">
              <QuestionsBoard
                questions={data.questions}
                onUpdateStatus={(qid, status) =>
                  update.mutate({ interviewId: data.id, questionId: qid, status })
                }
              />
            </Tabs.Content>

            <Tabs.Content value="interviewer" className="mt-6">
              {data.interviewer ? (
                <InterviewerOnePager profile={data.interviewer} />
              ) : (
                <p className="rounded-md border border-border-subtle bg-bg-surface p-8 text-center text-body-m text-fg-secondary">
                  Add the interviewer's name to unlock the one-pager.
                </p>
              )}
            </Tabs.Content>

            <Tabs.Content value="mock" className="mt-6">
              <article className="rounded-md border border-border-subtle bg-bg-surface p-8 text-center">
                <Mic className="mx-auto h-10 w-10 text-fg-muted" />
                <p className="mt-3 font-medium text-fg-primary">Voice mock</p>
                <p className="mt-1 max-w-md mx-auto text-body-s text-fg-secondary">
                  Day 7 wires the real audio engine (Whisper STT + ElevenLabs TTS). For now this
                  is the surface — push-to-talk, transcript area, post-session feedback.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <Button variant="secondary">Run text-mode mock</Button>
                  <Button>Voice mock (Day 7)</Button>
                </div>
              </article>
            </Tabs.Content>

            <Tabs.Content value="notes" className="mt-6">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes (markdown supported by Day 7 rich editor)…"
                rows={16}
                className="w-full resize-y rounded-md border border-border-default bg-bg-surface p-4 font-mono text-body-s leading-body outline-none focus-visible:border-brand"
              />
              <p className="mt-2 text-caption text-fg-muted">Auto-saved locally · 16 lines</p>
            </Tabs.Content>
          </Tabs>
        </>
      )}
    </div>
  );
}
