'use client';

import { Button, LoadingSpinner, toast } from '@careerops/ui';
import { useBilling, useChangePlan, type BillingPlan } from '@careerops/api-client';

import { cn } from '@/lib/cn';

export default function BillingSettings() {
  const { data, isLoading } = useBilling();
  const change = useChangePlan();

  if (isLoading || !data) return <LoadingSpinner size="block" label="Loading…" />;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-display-l font-bold text-fg-primary">Billing</h1>
        <p className="mt-2 text-body-m text-fg-secondary">
          Indian-first payments — UPI / Cards / Net banking / Wallets. GST included in price.
        </p>
      </header>

      <p className="text-body-m text-fg-secondary">
        Current plan: <span className="font-semibold text-fg-primary">{data.currentPlan.name}</span>
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {data.plans.map((p) => (
          <PlanCard
            key={p.id}
            plan={p}
            current={p.id === data.currentPlan.id}
            onChoose={async () => {
              await change.mutateAsync(p.id);
              toast.success(`Switched to ${p.name}`, {
                description:
                  p.id === 'free'
                    ? 'Premium features locked next billing cycle'
                    : 'Razorpay checkout opens here in sprint-2',
              });
            }}
            loading={change.isPending}
          />
        ))}
      </div>

      <section className="rounded-md border border-border-subtle bg-bg-surface p-5">
        <h2 className="mb-3 text-h3 font-semibold text-fg-primary">Invoices</h2>
        {data.invoices.length === 0 ? (
          <p className="text-body-s text-fg-muted">No invoices yet.</p>
        ) : (
          <ul className="divide-y divide-border-subtle text-body-s">
            {data.invoices.map((inv) => (
              <li key={inv.id} className="flex items-center justify-between py-2">
                <span className="text-fg-primary">
                  {new Date(inv.date).toLocaleDateString('en-IN')} — {inv.description}
                </span>
                <span className="flex items-center gap-3">
                  <span className="tabular text-fg-secondary">₹{inv.amountInr}</span>
                  <span
                    className={cn(
                      'rounded-pill px-2 py-0.5 text-caption font-medium',
                      inv.status === 'paid' && 'bg-success-bg text-brand',
                      inv.status === 'pending' && 'bg-warning-bg text-warning',
                      inv.status === 'failed' && 'bg-danger-bg text-danger',
                    )}
                  >
                    {inv.status}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-md border border-border-subtle bg-bg-surface p-5 text-body-s text-fg-secondary">
        <p>
          <span className="font-medium text-fg-primary">Payment methods:</span>{' '}
          {data.paymentMethods.join(' · ')}
        </p>
        <p className="mt-2">
          <span className="font-medium text-fg-primary">GSTIN:</span>{' '}
          {data.gstin ?? <span className="text-fg-muted">Not set — add for B2B invoices</span>}
        </p>
        <p className="mt-2 text-caption text-fg-muted">
          GST is included in displayed price (we don't bait-and-switch at checkout).
        </p>
      </section>
    </div>
  );
}

function PlanCard({
  plan,
  current,
  onChoose,
  loading,
}: {
  plan: BillingPlan;
  current: boolean;
  onChoose: () => void;
  loading?: boolean;
}) {
  return (
    <article
      className={cn(
        'flex flex-col rounded-md border bg-bg-surface p-5',
        current ? 'border-brand' : 'border-border-subtle',
      )}
    >
      <h3 className="font-display text-display-s font-semibold text-fg-primary">{plan.name}</h3>
      <p className="mt-1 font-mono tabular text-fg-secondary">
        {plan.monthlyPriceInr === 0 ? (
          'Free'
        ) : (
          <>
            ₹{plan.monthlyPriceInr}/mo or ₹{plan.yearlyPriceInr}/yr{' '}
            {plan.yearlySavingsInr > 0 && (
              <span className="text-caption text-brand">save ₹{plan.yearlySavingsInr}</span>
            )}
          </>
        )}
      </p>
      <ul className="mt-4 flex-1 space-y-1 text-body-s text-fg-secondary">
        {plan.features.map((f) => (
          <li key={f}>✓ {f}</li>
        ))}
      </ul>
      <Button
        className="mt-5"
        size="lg"
        variant={current ? 'secondary' : 'primary'}
        disabled={current}
        loading={loading}
        onClick={onChoose}
      >
        {current ? 'Current plan' : `Switch to ${plan.name}`}
      </Button>
    </article>
  );
}
