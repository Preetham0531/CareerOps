/**
 * Day 2 showcase route — visible proof JobCard + primitives are wired.
 * Removed in Day 3 once the real Discovery surface lands.
 */

'use client';

import { useState } from 'react';
import {
  JobCard,
  type JobData,
  Button,
  Badge,
  Chip,
  Skeleton,
  Divider,
  Kbd,
  EmptyState,
  Switch,
  Checkbox,
  Slider,
  LinearProgress,
  CountdownRing,
} from '@careerops/ui';
import { GhostListing, ReferralPath, OfferTrophy, DPDPShield } from '@careerops/icons';

const sampleJobs: JobData[] = [
  {
    id: 'razorpay-sse',
    title: 'Senior Backend Engineer',
    company: 'Razorpay',
    location: { city: 'Bangalore', tier: 1 },
    postedAt: '2026-04-26T10:00:00.000Z',
    salary: { min: 3_200_000, max: 4_200_000, currency: 'INR', confidence: 0.85 },
    employment: 'full-time',
    experience: { min: 4, max: 7 },
    wfh: 'hybrid',
    ghostScore: 0.12,
    matchScore: 0.87,
    perks: ['WFH', 'Stock', 'Joining bonus'],
    source: 'naukri',
    referralPath: {
      count: 3,
      top: [{ name: 'Priya K' }, { name: 'Aman B' }, { name: 'Sara S' }],
    },
  },
  {
    id: 'tcs-sse',
    title: 'Senior Software Engineer',
    company: 'TCS',
    location: { city: 'Pune', tier: 2 },
    postedAt: '2026-04-22T10:00:00.000Z',
    salary: { min: 1_400_000, max: 1_800_000, currency: 'INR', confidence: 0.55 },
    employment: 'full-time',
    experience: { min: 3, max: 6 },
    wfh: 'onsite',
    ghostScore: 0.62,
    matchScore: 0.45,
    bondFlag: { reason: 'TCS 2-year bond', severity: 'high', durationYears: 2 },
    benchFlag: { reason: 'Hire-then-bench pattern', severity: 'medium' },
    source: 'naukri',
  },
];

export default function ShowcasePage() {
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [stealthOn, setStealthOn] = useState(true);
  const [salary, setSalary] = useState<number[]>([18, 35]);

  return (
    <main className="container py-12">
      <h1 className="font-display text-display-l font-bold text-fg-primary">Day 2 showcase</h1>
      <p className="mt-2 max-w-2xl text-body-l text-fg-secondary">
        Visible proof primitives + JobCard composite are wired. Removed in Day 3.
      </p>

      {/* Section: JobCards */}
      <section className="mt-12">
        <h2 className="text-h2 font-semibold text-fg-primary">JobCard variants</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {sampleJobs.map((job) => (
            <JobCard
              key={job.id}
              job={{ ...job, saved: !!saved[job.id] }}
              onSelect={(j) => alert(`Open ${j.title}`)}
              onSaveToggle={(j) => setSaved((s) => ({ ...s, [j.id]: !s[j.id] }))}
              onTailorCV={(j) => alert(`Tailor CV for ${j.title}`)}
              onApply={(j) => alert(`Apply to ${j.title}`)}
              onViewReferrers={(j) => alert(`Show referrers at ${j.company}`)}
            />
          ))}
        </div>
      </section>

      {/* Section: badges + chips + icons */}
      <section className="mt-12">
        <h2 className="text-h2 font-semibold text-fg-primary">Badges, Chips, Icons</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge variant="brand">Brand</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="outline">Outline</Badge>
          <Chip variant="brand" onRemove={() => {}}>
            Backend Engineer
          </Chip>
          <Chip variant="neutral">Bangalore · T1</Chip>
          <span className="inline-flex items-center gap-2 text-fg-secondary">
            <GhostListing size={20} /> ghost
            <ReferralPath size={20} /> path
            <OfferTrophy size={20} /> offer
            <DPDPShield size={20} /> dpdp
          </span>
        </div>
      </section>

      {/* Section: form primitives */}
      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-h2 font-semibold text-fg-primary">Switch, Checkbox</h2>
          <div className="mt-4 flex items-center gap-6">
            <label className="flex items-center gap-2 text-body-m text-fg-primary">
              <Switch checked={stealthOn} onCheckedChange={setStealthOn} />
              Stealth mode
            </label>
            <label className="flex items-center gap-2 text-body-m text-fg-primary">
              <Checkbox defaultChecked /> Hide ghost &gt; 0.6
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-h2 font-semibold text-fg-primary">Slider (LPA range)</h2>
          <div className="mt-4">
            <Slider
              value={salary}
              onValueChange={setSalary}
              min={5}
              max={80}
              step={1}
            />
            <p className="mt-2 text-body-s text-fg-secondary tabular">
              ₹{salary[0]}L – ₹{salary[1]}L
            </p>
          </div>
        </div>
      </section>

      {/* Section: progress */}
      <section className="mt-12">
        <h2 className="text-h2 font-semibold text-fg-primary">Progress</h2>
        <div className="mt-4 grid gap-4 max-w-md">
          <LinearProgress value={42} ariaLabel="Onboarding progress" />
          <LinearProgress value={88} variant="accent" thickness="slim" ariaLabel="ATS readiness" />
          <div className="flex items-center gap-3">
            <CountdownRing durationSec={5} active />
            <span className="text-body-s text-fg-secondary">undo budget</span>
          </div>
        </div>
      </section>

      {/* Section: skeleton + divider + kbd */}
      <section className="mt-12">
        <h2 className="text-h2 font-semibold text-fg-primary">Skeleton, Divider, Kbd</h2>
        <div className="mt-4 max-w-md space-y-3">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="mt-6">
          <Divider label="OR" />
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-body-s text-fg-secondary">
          Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open palette
        </div>
      </section>

      {/* Section: empty state */}
      <section className="mt-12">
        <h2 className="text-h2 font-semibold text-fg-primary">EmptyState</h2>
        <div className="mt-4 max-w-md">
          <EmptyState
            illustration={<ReferralPath />}
            headline="No referrers found yet"
            description="We'll keep watching your network and notify you the moment a path opens."
            primaryAction={<Button>Connect LinkedIn</Button>}
            secondaryAction={
              <Button variant="ghost" size="md">
                Learn more
              </Button>
            }
          />
        </div>
      </section>
    </main>
  );
}
