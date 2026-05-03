import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { JobCard } from './JobCard';
import type { JobData } from './types';

const baseJob: JobData = {
  id: 'razorpay-sse-2026',
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
  perks: ['WFH', 'Stock', 'Joining'],
  source: 'naukri',
};

describe('JobCard', () => {
  it('renders title, company, location and salary', () => {
    render(<JobCard job={baseJob} />);
    expect(screen.getByText(/senior backend engineer/i)).toBeInTheDocument();
    expect(screen.getByText('Razorpay')).toBeInTheDocument();
    expect(screen.getByText(/Bangalore/)).toBeInTheDocument();
    expect(screen.getByText(/T1/)).toBeInTheDocument();
    expect(screen.getByText(/₹32–42L/)).toBeInTheDocument();
  });

  it('shows ghost score pill when ≥ 0.1', () => {
    render(<JobCard job={baseJob} />);
    expect(screen.getByLabelText(/ghost 12%/i)).toBeInTheDocument();
  });

  it('hides ghost score pill when < 0.1', () => {
    render(<JobCard job={{ ...baseJob, ghostScore: 0.05 }} />);
    expect(screen.queryByLabelText(/ghost/i)).not.toBeInTheDocument();
  });

  it('renders bond badge when bondFlag present', () => {
    render(
      <JobCard
        job={{
          ...baseJob,
          bondFlag: { reason: 'TCS 2y bond', severity: 'high', durationYears: 2 },
        }}
      />,
    );
    expect(screen.getByText(/bond 2y/i)).toBeInTheDocument();
  });

  it('shows match score gauge', () => {
    render(<JobCard job={baseJob} />);
    expect(screen.getByLabelText(/match 87%/i)).toBeInTheDocument();
  });

  it('fires onSaveToggle without firing onSelect', async () => {
    const onSelect = vi.fn();
    const onSaveToggle = vi.fn();
    render(<JobCard job={baseJob} onSelect={onSelect} onSaveToggle={onSaveToggle} />);
    await userEvent.click(screen.getByRole('button', { name: /save job/i }));
    expect(onSaveToggle).toHaveBeenCalledTimes(1);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('shows applied bookmark state', () => {
    render(<JobCard job={{ ...baseJob, saved: true }} onSaveToggle={() => {}} />);
    expect(screen.getByRole('button', { name: /unsave job/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('renders referrer preview with mutual count', () => {
    render(
      <JobCard
        job={{
          ...baseJob,
          referralPath: {
            count: 3,
            top: [{ name: 'Priya K' }, { name: 'Aman B' }, { name: 'Sara S' }],
          },
        }}
      />,
    );
    expect(screen.getByText(/3 mutual contacts · referral path available/i)).toBeInTheDocument();
  });
});
