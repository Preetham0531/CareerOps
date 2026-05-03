'use client';

import { useRef, useState } from 'react';
import { FileText, Upload } from 'lucide-react';
import { LoadingSpinner } from '@careerops/ui';

import { cn } from '@/lib/cn';

interface ResumeDropzoneProps {
  onFile: (file: File) => void;
  status: 'idle' | 'uploading' | 'parsing' | 'error';
  errorMessage?: string;
}

export function ResumeDropzone({ onFile, status, errorMessage }: ResumeDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [hover, setHover] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor="resume-upload"
        onDragOver={(e) => {
          e.preventDefault();
          setHover(true);
        }}
        onDragLeave={() => setHover(false)}
        onDrop={(e) => {
          e.preventDefault();
          setHover(false);
          const f = e.dataTransfer.files[0];
          if (f) onFile(f);
        }}
        className={cn(
          'flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed p-6 text-center transition-colors',
          hover ? 'border-brand bg-success-bg/40' : 'border-border-default bg-bg-surface',
          status === 'error' && 'border-danger',
        )}
      >
        {status === 'uploading' || status === 'parsing' ? (
          <LoadingSpinner
            size="block"
            label={status === 'uploading' ? 'Uploading…' : 'Reading your CV…'}
          />
        ) : (
          <>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-pill bg-bg-raised text-fg-secondary">
              <Upload aria-hidden className="h-5 w-5" />
            </span>
            <p className="font-medium text-fg-primary">
              Drop your CV here, or click to browse
            </p>
            <p className="text-body-s text-fg-muted">PDF · DOCX · 10 MB max</p>
          </>
        )}
        <input
          ref={inputRef}
          id="resume-upload"
          type="file"
          accept=".pdf,.docx,.doc"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
          }}
        />
      </label>
      {status === 'error' && (
        <p role="alert" className="text-body-s text-danger">
          {errorMessage ?? "Couldn't parse that file. Try another, or build one from scratch."}
        </p>
      )}
      <p className="flex items-center gap-2 text-body-s text-fg-secondary">
        <FileText className="h-4 w-4" /> We parse once and reuse it across portals. DPDP-aligned.
      </p>
    </div>
  );
}
