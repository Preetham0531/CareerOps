'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Switch, Chip, toast } from '@careerops/ui';
import { useParseResume } from '@careerops/api-client';

import { useOnboarding } from '@/features/onboarding/store';
import type { ResumeData } from '@/features/onboarding/types';
import { StepProgress } from '@/components/onboarding/StepProgress';
import { ResumeDropzone } from '@/components/onboarding/ResumeDropzone';
import { RequireAuth } from '@/components/RequireAuth';

type Status = 'idle' | 'uploading' | 'parsing' | 'parsed' | 'error';

function ResumeInner() {
  const router = useRouter();
  const setResume = useOnboarding((s) => s.setResume);
  const markCompleted = useOnboarding((s) => s.markCompleted);
  const persona = useOnboarding((s) => s.persona);

  const [status, setStatus] = useState<Status>('idle');
  const [data, setData] = useState<ResumeData | null>(null);

  const parseResume = useParseResume();

  async function handleFile(file: File) {
    setStatus('uploading');
    try {
      setStatus('parsing');
      const parsed = await parseResume.mutateAsync(file);
      setData({
        ...parsed,
        hideCurrentEmployer: persona === 'employed-quiet',
      });
      setStatus('parsed');
      toast.success('Parsed your CV — review below.');
    } catch {
      setStatus('error');
    }
  }

  function handleConfirm() {
    if (!data) return;
    setResume(data);
    markCompleted(3);
    router.push('/start/filters');
  }

  return (
    <main className="container max-w-2xl py-10">
      <StepProgress current={3} onSkip={() => router.push('/start/filters')} />
      <div className="mt-10 space-y-6">
        <div>
          <h1 className="font-display text-display-l font-bold text-fg-primary">
            Upload your CV
          </h1>
          <p className="mt-2 text-body-m text-fg-secondary">
            We parse it once and reuse it across portals. Your data stays yours — DPDP-aligned.
          </p>
        </div>

        {status !== 'parsed' ? (
          <ResumeDropzone onFile={handleFile} status={status === 'parsed' ? 'idle' : status} />
        ) : (
          data && (
            <ParsedPreview
              data={data}
              onChange={setData}
              onConfirm={handleConfirm}
              onReupload={() => {
                setStatus('idle');
                setData(null);
              }}
            />
          )
        )}
      </div>
    </main>
  );
}

function ParsedPreview({
  data,
  onChange,
  onConfirm,
  onReupload,
}: {
  data: ResumeData;
  onChange: (next: ResumeData) => void;
  onConfirm: () => void;
  onReupload: () => void;
}) {
  return (
    <div className="rounded-md border border-border-subtle bg-bg-surface p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-h3 font-semibold text-fg-primary">We found this</h2>
        <button
          type="button"
          onClick={onReupload}
          className="text-body-s font-medium text-fg-secondary hover:text-fg-primary"
        >
          Re-upload
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Name"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
        />
        <Input
          label="Email"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
        />
        <Input
          label="Phone"
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
        />
        <Input
          label="Education"
          value={data.education}
          onChange={(e) => onChange({ ...data, education: e.target.value })}
        />
      </div>
      <Input
        label="Current role"
        value={`${data.currentRole ?? ''} at ${data.currentEmployer ?? ''}`}
        onChange={() => {
          /* combined free-text edit not split — fine for the stub */
        }}
        helper="We'll extract these into structured fields once the parser ships."
      />
      <label className="flex items-center justify-between gap-3 rounded-md border border-border-subtle px-4 py-3">
        <div>
          <p className="font-medium text-fg-primary">Hide current employer in stealth variant</p>
          <p className="text-caption text-fg-muted">
            Recommended when searching while employed.
          </p>
        </div>
        <Switch
          checked={!!data.hideCurrentEmployer}
          onCheckedChange={(v) => onChange({ ...data, hideCurrentEmployer: v })}
        />
      </label>
      <div>
        <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-fg-muted">
          Skills ({data.skills.length})
        </p>
        <div className="flex flex-wrap gap-1.5">
          {data.skills.map((s) => (
            <Chip key={s} variant="brand">
              {s}
            </Chip>
          ))}
        </div>
      </div>
      <Button size="lg" onClick={onConfirm}>
        Confirm ›
      </Button>
    </div>
  );
}

export default function ResumePage() {
  return (
    <RequireAuth>
      <ResumeInner />
    </RequireAuth>
  );
}
