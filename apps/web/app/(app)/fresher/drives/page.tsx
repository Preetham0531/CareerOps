'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { LoadingSpinner } from '@careerops/ui';
import { useFresherDrives } from '@careerops/api-client';

const LAKH = 100_000;

function relativeDays(iso: string): string {
  const days = Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
  if (days <= 0) return 'closed';
  if (days === 1) return '1 day left';
  return `${days} days left`;
}

export default function FresherDrivesPage() {
  const { data, isLoading } = useFresherDrives();

  return (
    <div className="container py-10">
      <Link
        href="/fresher"
        className="mb-4 inline-flex items-center gap-1 text-body-s font-medium text-fg-secondary hover:text-fg-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Fresher hub
      </Link>

      <header className="mb-6">
        <h1 className="font-display text-display-l font-bold text-fg-primary">Campus drives</h1>
        <p className="mt-2 text-body-m text-fg-secondary">
          TCS NQT, Wipro Elite NTH, Infosys InfyTQ, AmCAT, Capgemini Elite, Naukri Campus, Internshala, Unstop.
        </p>
      </header>

      {isLoading ? (
        <LoadingSpinner size="block" label="Loading drives…" />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {data?.map((d) => (
            <li
              key={d.id}
              className="rounded-md border border-border-subtle bg-bg-surface p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-body-m text-fg-primary">{d.name}</p>
                  <p className="text-caption text-fg-muted">{d.organizer}</p>
                </div>
                <span className="rounded-pill bg-warning-bg px-2 py-0.5 text-caption font-medium text-warning">
                  {relativeDays(d.registerCloseAt)}
                </span>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-caption text-fg-secondary">
                <div>
                  <dt className="text-fg-muted">Rounds</dt>
                  <dd>{d.rounds.join(' · ')}</dd>
                </div>
                {d.cgpaCutoff !== undefined && (
                  <div>
                    <dt className="text-fg-muted">CGPA cutoff</dt>
                    <dd>{d.cgpaCutoff}</dd>
                  </div>
                )}
                {d.branches && (
                  <div>
                    <dt className="text-fg-muted">Branches</dt>
                    <dd>{d.branches.join(', ')}</dd>
                  </div>
                )}
                {d.location && (
                  <div>
                    <dt className="text-fg-muted">Location</dt>
                    <dd>{d.location}</dd>
                  </div>
                )}
                {d.salaryBand && (
                  <div className="col-span-2">
                    <dt className="text-fg-muted">Package</dt>
                    <dd className="font-mono tabular">
                      ₹{(d.salaryBand[0] / LAKH).toFixed(1)}–{(d.salaryBand[1] / LAKH).toFixed(1)}L
                    </dd>
                  </div>
                )}
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
