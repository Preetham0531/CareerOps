'use client';

import Link from 'next/link';
import { LoadingSpinner } from '@careerops/ui';
import { useNegotiations } from '@careerops/api-client';

const LAKH = 100_000;

export default function NegotiationsIndex() {
  const { data, isLoading } = useNegotiations();

  return (
    <div className="container py-10">
      <header className="mb-6">
        <h1 className="font-display text-display-l font-bold text-fg-primary">Negotiations</h1>
        <p className="mt-2 text-body-m text-fg-secondary">
          When an offer arrives, we walk you through targets, draft the counter, role-play the
          recruiter call, and track the back-and-forth.
        </p>
      </header>

      {isLoading ? (
        <LoadingSpinner size="block" label="Loading…" />
      ) : !data?.length ? (
        <p className="rounded-md border border-border-subtle bg-bg-surface p-12 text-center text-body-m text-fg-secondary">
          No active negotiations. Offers detected from your inbox will appear here.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {data.map((n) => (
            <li key={n.id}>
              <Link
                href={`/negotiations/${n.id}`}
                className="block rounded-md border border-border-subtle bg-bg-surface p-4 transition-colors hover:border-border-default"
              >
                <p className="font-medium text-body-m text-fg-primary">
                  {n.role} · {n.company}
                </p>
                <p className="mt-1 text-body-s text-fg-secondary">
                  Offer ₹{(n.offer.totalCTC / LAKH).toFixed(0)}L · Status {n.status}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
