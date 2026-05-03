import { describe, it, expect, beforeEach } from 'vitest';

import { useOnboarding, deriveFilterDefaults } from './store';

describe('useOnboarding store', () => {
  beforeEach(() => {
    useOnboarding.getState().reset();
  });

  it('starts at step 1 with no completions', () => {
    const s = useOnboarding.getState();
    expect(s.step).toBe(1);
    expect(s.completed).toEqual({});
  });

  it('marks completed cumulatively', () => {
    useOnboarding.getState().markCompleted(1);
    useOnboarding.getState().markCompleted(2);
    expect(useOnboarding.getState().completed).toEqual({ 1: true, 2: true });
  });

  it('records persona answers', () => {
    useOnboarding.getState().setPersonaAnswers({
      persona: 'employed-quiet',
      urgency: 'this-month',
      priority: 'comp',
    });
    const s = useOnboarding.getState();
    expect(s.persona).toBe('employed-quiet');
    expect(s.urgency).toBe('this-month');
    expect(s.priority).toBe('comp');
  });

  it('toggles a single connection without affecting the others', () => {
    useOnboarding.getState().setConnection('linkedin', true);
    expect(useOnboarding.getState().connections).toMatchObject({
      linkedin: true,
      naukri: false,
      github: false,
    });
  });

  it('resets to defaults', () => {
    useOnboarding.getState().setPersonaAnswers({
      persona: 'fresher',
      urgency: 'open',
      priority: 'first-job',
    });
    useOnboarding.getState().reset();
    expect(useOnboarding.getState().persona).toBeUndefined();
  });
});

describe('deriveFilterDefaults', () => {
  it('defaults to ₹18L–₹27L when no resume present', () => {
    const f = deriveFilterDefaults(undefined);
    expect(f.lpa.min).toBe(18);
    expect(f.lpa.max).toBe(27);
    expect(f.cities[0]?.city).toBe('Bangalore');
  });

  it('seeds LPA range from current CTC', () => {
    const f = deriveFilterDefaults({
      name: 'Aman',
      email: 'a@x.com',
      phone: '+91',
      currentCTC: 2_000_000,
      skills: [],
      education: '',
    });
    expect(f.lpa.min).toBe(20);
    expect(f.lpa.max).toBe(30); // 1.5x
  });

  it('seeds roles from current role when present', () => {
    const f = deriveFilterDefaults({
      name: 'A',
      email: 'a@x.com',
      phone: '+91',
      currentRole: 'Senior SDE',
      skills: [],
      education: '',
    });
    expect(f.roles).toEqual(['Senior SDE']);
  });
});
