'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Mic } from 'lucide-react';
import { Button, LoadingSpinner, Slider, Tabs, toast } from '@careerops/ui';
import { useNegotiation } from '@careerops/api-client';

import { MarketAnchorRail } from '@/features/negotiation/components/MarketAnchorRail';
import { ClauseChecklist } from '@/features/negotiation/components/ClauseChecklist';

const LAKH = 100_000;
const TONES = ['Collaborative', 'Firm', 'Aggressive'] as const;

type Step = '1-capture' | '2-targets' | '3-draft' | '4-roleplay' | '5-send';
const ORDER: Step[] = ['1-capture', '2-targets', '3-draft', '4-roleplay', '5-send'];

export default function NegotiationWizard() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id ?? null;
  const { data, isLoading } = useNegotiation(id);
  const [step, setStep] = useState<Step>('2-targets');
  const [tone, setTone] = useState<(typeof TONES)[number]>('Collaborative');
  const [targetBase, setTargetBase] = useState(34);
  const [clauses, setClauses] = useState<string[]>(['joining', 'wfh', 'notice-buyout']);

  const draftBody = useMemo(() => buildDraft(tone, targetBase, clauses, data?.company), [tone, targetBase, clauses, data]);

  const idx = ORDER.indexOf(step);

  return (
    <div className="container py-6">
      <button
        type="button"
        onClick={() => router.push('/negotiations')}
        className="mb-4 inline-flex items-center gap-1 text-body-s font-medium text-fg-secondary hover:text-fg-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Negotiations
      </button>

      {isLoading || !data ? (
        <LoadingSpinner size="block" label="Loading…" />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <header className="mb-4">
              <h1 className="font-display text-display-l font-bold text-fg-primary">
                {data.role} · {data.company}
              </h1>
              <div className="mt-3 flex items-center gap-1.5">
                {ORDER.map((s, i) => (
                  <span
                    key={s}
                    className={
                      i <= idx
                        ? 'h-1.5 w-8 rounded-pill bg-brand'
                        : 'h-1.5 w-2 rounded-pill bg-bg-raised'
                    }
                  />
                ))}
                <span className="ml-3 text-caption text-fg-muted">
                  Step {idx + 1} of 5
                </span>
              </div>
            </header>

            <Tabs value={step} onValueChange={(v) => setStep(v as Step)}>
              <Tabs.List variant="pill">
                <Tabs.Trigger variant="pill" value="1-capture">Capture</Tabs.Trigger>
                <Tabs.Trigger variant="pill" value="2-targets">Targets</Tabs.Trigger>
                <Tabs.Trigger variant="pill" value="3-draft">Draft</Tabs.Trigger>
                <Tabs.Trigger variant="pill" value="4-roleplay">Role-play</Tabs.Trigger>
                <Tabs.Trigger variant="pill" value="5-send">Send</Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="1-capture" className="mt-6">
                <article className="rounded-md border border-border-subtle bg-bg-surface p-6">
                  <h2 className="text-h3 font-semibold text-fg-primary">Captured offer</h2>
                  <dl className="mt-3 grid grid-cols-2 gap-3 text-body-s">
                    <Field label="Base" value={`₹${(data.offer.base / LAKH).toFixed(1)}L`} />
                    <Field label="Variable" value={`₹${(data.offer.variable / LAKH).toFixed(1)}L`} />
                    <Field label="Joining" value={`₹${(data.offer.joining / LAKH).toFixed(1)}L`} />
                    <Field
                      label="ESOP"
                      value={
                        data.offer.esop
                          ? `${(data.offer.esop.percent * 100).toFixed(2)}% / ${data.offer.esop.cliffYears}y cliff`
                          : '—'
                      }
                    />
                    <Field
                      label="Total CTC"
                      value={`₹${(data.offer.totalCTC / LAKH).toFixed(1)}L`}
                      strong
                    />
                  </dl>
                  <Button className="mt-6" onClick={() => setStep('2-targets')}>
                    Confirm and continue ›
                  </Button>
                </article>
              </Tabs.Content>

              <Tabs.Content value="2-targets" className="mt-6">
                <article className="rounded-md border border-border-subtle bg-bg-surface p-6 space-y-6">
                  <div>
                    <p className="text-h3 font-semibold text-fg-primary">Target base</p>
                    <p className="text-caption text-fg-muted">
                      Drag the thumb to set your target base.
                    </p>
                    <div className="mt-3">
                      <Slider
                        min={20}
                        max={50}
                        step={1}
                        value={[targetBase]}
                        onValueChange={([v]) => setTargetBase(v ?? targetBase)}
                      />
                      <p className="mt-2 text-body-s tabular text-fg-secondary">
                        ₹{targetBase}L
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-h3 font-semibold text-fg-primary">India-specific clauses</p>
                    <p className="mb-3 text-caption text-fg-muted">
                      Pick the levers worth pushing on.
                    </p>
                    <ClauseChecklist selected={clauses} onChange={setClauses} />
                  </div>

                  <Button onClick={() => setStep('3-draft')}>Draft counter ›</Button>
                </article>
              </Tabs.Content>

              <Tabs.Content value="3-draft" className="mt-6">
                <article className="rounded-md border border-border-subtle bg-bg-surface p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    {TONES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTone(t)}
                        className={
                          tone === t
                            ? 'rounded-pill bg-brand px-3 py-1 text-caption font-medium text-fg-inverse'
                            : 'rounded-pill px-3 py-1 text-caption text-fg-secondary hover:text-fg-primary'
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={14}
                    value={draftBody}
                    readOnly
                    className="w-full resize-y rounded-md border border-border-default bg-bg-surface p-4 font-mono text-body-s leading-body outline-none focus-visible:border-brand"
                  />
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => setStep('4-roleplay')}>Role-play first</Button>
                    <Button onClick={() => setStep('5-send')}>Looks good — to send ›</Button>
                  </div>
                </article>
              </Tabs.Content>

              <Tabs.Content value="4-roleplay" className="mt-6">
                <article className="rounded-md border border-border-subtle bg-bg-surface p-8 text-center">
                  <Mic className="mx-auto h-10 w-10 text-fg-muted" />
                  <p className="mt-3 font-medium text-fg-primary">Role-play voice mode</p>
                  <p className="mt-1 max-w-md mx-auto text-body-s text-fg-secondary">
                    Day 7 wires real audio. The role-play simulates the recruiter's responses to
                    your counter; transcript captured + feedback after.
                  </p>
                  <div className="mt-4">
                    <Button onClick={() => setStep('5-send')}>Skip for now ›</Button>
                  </div>
                </article>
              </Tabs.Content>

              <Tabs.Content value="5-send" className="mt-6">
                <article className="rounded-md border border-border-subtle bg-bg-surface p-6 space-y-4">
                  <h2 className="text-h3 font-semibold text-fg-primary">Send counter-offer</h2>
                  <p className="text-body-s text-fg-secondary">
                    Channel · Email · Schedule next weekday 10:00 AM IST · 8s undo on send.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="ghost">Save draft</Button>
                    <Button
                      onClick={() =>
                        toast.success('Counter-offer scheduled', {
                          description: 'Tomorrow 10:00 AM IST · undo within 8s',
                          duration: 8000,
                          action: { label: 'Undo', onClick: () => toast('Send cancelled') },
                        })
                      }
                    >
                      Schedule send ›
                    </Button>
                  </div>
                </article>
              </Tabs.Content>
            </Tabs>
          </div>

          <aside>
            <MarketAnchorRail
              market={data.market}
              current={data.offer.totalCTC}
              target={targetBase * LAKH}
            />
          </aside>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <dt className="text-caption uppercase tracking-wide text-fg-muted">{label}</dt>
      <dd className={strong ? 'font-display text-display-s font-bold tabular text-fg-primary' : 'tabular text-fg-primary'}>
        {value}
      </dd>
    </div>
  );
}

function buildDraft(
  tone: 'Collaborative' | 'Firm' | 'Aggressive',
  targetBase: number,
  clauses: string[],
  company?: string,
): string {
  const tag = company ?? 'the team';
  const intro =
    tone === 'Collaborative'
      ? `Hi Priya,\n\nThanks for the offer. I'm genuinely excited to join ${tag}.`
      : tone === 'Firm'
        ? `Hi Priya,\n\nAppreciate the offer. Before I sign, a few things to align on.`
        : `Priya — appreciate the speed of the offer; before signing I want to be direct on comp.`;

  const body =
    tone === 'Collaborative'
      ? `\n\nBased on Levels.fyi data for L4–L5 SDE at ${tag} (and peer companies), the median total comp sits around ₹33L. The current offer is below that median. I'd like to propose a base of ₹${targetBase}L with the joining bonus adjusted upward to cover my notice buyout.`
      : tone === 'Firm'
        ? `\n\nThe current offer of ₹34L total is ~12% below the median for this role/level. My target is ₹${targetBase}L base with the same variable structure.`
        : `\n\nMarket median for this role at ${tag} is ₹33L total. I'm asking for ₹${targetBase}L base with joining + WFH terms in writing. Anything materially below this isn't workable for me.`;

  const tail =
    clauses.length > 0
      ? `\n\nAdditionally:\n${clauses.map((c) => `• ${c.replace('-', ' ')}`).join('\n')}`
      : '';

  const sign =
    tone === 'Aggressive' ? `\n\n— Aman` : `\n\nHappy to discuss on a call.\n\nThanks,\nAman`;

  return intro + body + tail + sign;
}
