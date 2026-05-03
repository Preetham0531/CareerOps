/**
 * Day 7 factories — superset of Day 6 with Settings/Fresher mocks.
 *
 * To swap into place:
 *   mv apps/web/mocks/factories.day7.ts apps/web/mocks/factories.ts
 */

// Re-export all Day 6 carry-through
export {
  makeJob,
  makeJobs,
  makeDashboard,
  makeParsedResume,
  discover,
  makeReferrersGraph,
  makeReferrerScorecard,
  makeDmDraft,
  makeSendQueue,
  makeEvidenceData,
  makeSalaryIntel,
  makeRedFlagsForJob,
  makeThreads,
  makeThreadDetail,
  getStealth,
  patchStealth,
  makeInterviews,
  makeInterviewPrep,
  makeNegotiations,
  makeDNA,
  makeCohorts,
  makeCohortDetail,
  getNotifications,
  markNotificationsRead,
} from './factories';

// ── Day 7 — Settings ─────────────────────────────────────────────────────

let _profile = {
  id: 'usr_demo_aman',
  name: 'Aman Bhargav',
  pronouns: 'he/him',
  publicProfile: false,
  language: 'en-IN' as const,
  density: 'comfortable' as const,
};

export function getProfile() {
  return _profile;
}

export function patchProfile(p: Partial<typeof _profile>) {
  _profile = { ..._profile, ...p };
  return _profile;
}

export function getAccount() {
  return {
    email: 'aman@example.com',
    emailVerified: true,
    phone: '+91 98765 43210',
    phoneVerified: true,
    twoFactorEnabled: false,
    activeSessions: [
      {
        id: 'sess-1',
        device: 'MacBook Pro · Chrome',
        lastActive: new Date().toISOString(),
        current: true,
      },
      {
        id: 'sess-2',
        device: 'iPhone · Safari',
        lastActive: new Date(Date.now() - 86_400_000 * 2).toISOString(),
        current: false,
      },
    ],
  };
}

let _consents = [
  {
    key: 'process-cv',
    label: 'Process CV for tailoring',
    description: 'Used to generate ATS-optimized variants per JD.',
    granted: true,
    grantedAt: new Date(Date.now() - 86_400_000 * 30).toISOString(),
    required: true,
  },
  {
    key: 'read-linkedin',
    label: 'Read LinkedIn network',
    description: 'Used to find referral paths.',
    granted: true,
    grantedAt: new Date(Date.now() - 86_400_000 * 28).toISOString(),
    required: false,
  },
  {
    key: 'cross-ref-salary',
    label: 'Cross-reference public salary data',
    description: 'Levels.fyi, AmbitionBox, Reddit, Glassdoor triangulation.',
    granted: true,
    grantedAt: new Date(Date.now() - 86_400_000 * 30).toISOString(),
    required: false,
  },
  {
    key: 'voice-stt',
    label: 'Process voice for STT',
    description: 'Whisper transcribes your voice; audio is deleted after.',
    granted: true,
    grantedAt: new Date(Date.now() - 86_400_000 * 15).toISOString(),
    required: false,
  },
  {
    key: 'pool-salary',
    label: 'Share anonymized salary data with pool',
    description: 'Helps the community; no identifiers shared.',
    granted: false,
    grantedAt: null,
    required: false,
  },
  {
    key: 'pool-dna',
    label: 'Share anonymized DNA insights',
    description: 'Aggregate cohort comparisons.',
    granted: false,
    grantedAt: null,
    required: false,
  },
  {
    key: 'voice-train',
    label: 'Use voice data for model training',
    description: 'Help us improve Indic STT/TTS quality.',
    granted: false,
    grantedAt: null,
    required: false,
  },
  {
    key: 'email-digests',
    label: 'Personalized email digests',
    description: 'Daily 06:00 IST summary.',
    granted: true,
    grantedAt: new Date(Date.now() - 86_400_000 * 30).toISOString(),
    required: false,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp Business messages',
    description: 'High-match alerts via WhatsApp.',
    granted: false,
    grantedAt: null,
    required: false,
  },
];

export function getDPDP() {
  return {
    dataSummary: {
      identityFields: ['Name', 'Email', 'Phone'],
      cvFiles: 1,
      cvVariants: 2,
      networkRead: 247,
      activityCount: 47,
      voiceAudio: 0,
      locationCollected: false,
      storageMB: 12,
      lastAccessedAt: new Date().toISOString(),
    },
    consents: _consents,
    accessLog: [
      {
        at: new Date().toISOString(),
        actor: 'You',
        action: 'Viewed dashboard',
        device: 'MacBook · Chrome',
      },
      {
        at: new Date(Date.now() - 60 * 60_000).toISOString(),
        actor: 'Razorpay',
        action: 'Referral DM sent on your behalf',
      },
      {
        at: new Date(Date.now() - 86_400_000).toISOString(),
        actor: 'LinkedIn API',
        action: 'Network read (consented)',
      },
      {
        at: new Date(Date.now() - 86_400_000 * 2).toISOString(),
        actor: 'System',
        action: 'DNA insight calculated',
      },
    ],
    dpo: {
      email: 'dpo@careerops.in',
      grievanceEmail: 'grievance@careerops.in',
      responseSlaDays: 30,
    },
  };
}

export function patchConsent(key: string, granted: boolean) {
  _consents = _consents.map((c) =>
    c.key === key
      ? { ...c, granted, grantedAt: granted ? new Date().toISOString() : null }
      : c,
  );
  return getDPDP();
}

let _notifSettings = {
  channels: { email: true, push: false, whatsapp: false, inApp: true },
  categories: {
    referrerReply: true,
    interviewReminder: true,
    offerReceived: true,
    matchFound: false,
    cohortActivity: false,
    weeklyDigest: true,
    monthlyDNA: true,
  },
  quietHours: { start: '22:00', end: '07:00' },
  digestTime: '06:00',
  muteWorkHours: false,
};

export function getNotifSettings() {
  return _notifSettings;
}

export function patchNotifSettings(p: Partial<typeof _notifSettings>) {
  _notifSettings = { ..._notifSettings, ...p };
  return _notifSettings;
}

let _integrations = [
  {
    id: 'linkedin' as const,
    label: 'LinkedIn',
    description: 'Network for referrals',
    status: 'connected' as const,
    lastSync: new Date().toISOString(),
    scopes: ['network.read', 'profile.read'],
  },
  {
    id: 'naukri' as const,
    label: 'Naukri',
    description: 'Indian job portal',
    status: 'connected' as const,
    lastSync: new Date(Date.now() - 86_400_000).toISOString(),
    scopes: ['profile.read'],
  },
  {
    id: 'github' as const,
    label: 'GitHub',
    description: 'Skill claim evidence',
    status: 'connected' as const,
    lastSync: new Date(Date.now() - 60 * 60_000).toISOString(),
    scopes: ['repos.read', 'profile.read'],
  },
  {
    id: 'leetcode' as const,
    label: 'LeetCode',
    description: 'DSA evidence',
    status: 'disconnected' as const,
    lastSync: null,
    scopes: [],
  },
  {
    id: 'kaggle' as const,
    label: 'Kaggle',
    description: 'ML evidence',
    status: 'disconnected' as const,
    lastSync: null,
    scopes: [],
  },
  {
    id: 'calendar' as const,
    label: 'Calendar (Google)',
    description: 'Auto-detect interview events',
    status: 'connected' as const,
    lastSync: new Date(Date.now() - 30 * 60_000).toISOString(),
    scopes: ['calendar.events.read'],
  },
  {
    id: 'email' as const,
    label: 'Email (Gmail)',
    description: 'Detect interview confirmations',
    status: 'expired' as const,
    lastSync: new Date(Date.now() - 86_400_000 * 7).toISOString(),
    scopes: ['gmail.readonly'],
  },
  {
    id: 'whatsapp' as const,
    label: 'WhatsApp Business',
    description: 'Recruiter auto-reply',
    status: 'disconnected' as const,
    lastSync: null,
    scopes: [],
  },
  {
    id: 'slack' as const,
    label: 'Slack',
    description: 'Cohort notifications',
    status: 'disconnected' as const,
    lastSync: null,
    scopes: [],
  },
];

export function getIntegrations() {
  return _integrations;
}

export function toggleIntegration(id: string, action: 'connect' | 'disconnect') {
  _integrations = _integrations.map((it) =>
    it.id === id
      ? {
          ...it,
          status: action === 'connect' ? ('connected' as const) : ('disconnected' as const),
          lastSync: action === 'connect' ? new Date().toISOString() : null,
        }
      : it,
  );
  return _integrations.find((it) => it.id === id)!;
}

const PLANS = [
  {
    id: 'free' as const,
    name: 'Free',
    monthlyPriceInr: 0,
    yearlyPriceInr: 0,
    yearlySavingsInr: 0,
    features: [
      'Job discovery + filters',
      'Ghost-job radar',
      'Basic salary intel',
      '5 referrer searches/mo',
      '3 mock interviews/mo',
      'Voice 30 min/day',
      'Browser extension',
    ],
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    monthlyPriceInr: 599,
    yearlyPriceInr: 4999,
    yearlySavingsInr: 2200,
    features: [
      'Everything in Free',
      'Unlimited referrer searches',
      'Unlimited mock interviews',
      'Negotiation co-pilot',
      'Application DNA insights',
      'Stealth mode',
      'Voice unlimited',
      'Cohort mode',
      'Priority support',
    ],
  },
  {
    id: 'campus' as const,
    name: 'Campus',
    monthlyPriceInr: 199,
    yearlyPriceInr: 1499,
    yearlySavingsInr: 889,
    features: [
      'Everything in Free',
      'Fresher hub',
      'Mock GD (multi-speaker)',
      'HR English coaching',
      'Aptitude prep unlimited',
      'Cohort mode',
      'Verified college email: 25% off',
    ],
  },
];

let _currentPlan: 'free' | 'pro' | 'campus' = 'free';

export function getBilling() {
  return {
    currentPlan: PLANS.find((p) => p.id === _currentPlan)!,
    plans: PLANS,
    invoices:
      _currentPlan === 'free'
        ? []
        : [
            {
              id: 'inv-2026-04',
              date: new Date(Date.now() - 86_400_000 * 5).toISOString(),
              description: 'Pro · monthly',
              amountInr: 599,
              status: 'paid' as const,
            },
          ],
    paymentMethods: ['UPI', 'Cards', 'Net banking', 'Wallets'],
    gstin: null,
  };
}

export function setPlan(planId: 'free' | 'pro' | 'campus') {
  _currentPlan = planId;
  return getBilling();
}

// ── Day 7 — Fresher ─────────────────────────────────────────────────────

export function makeFresherDrives() {
  return [
    {
      id: 'tcs-nqt-2026',
      name: 'TCS NQT 2026',
      organizer: 'TCS',
      registerCloseAt: new Date(Date.now() + 86_400_000).toISOString(),
      rounds: ['Aptitude', 'Coding', 'Communication', 'Interview'],
      cgpaCutoff: 6.0,
      branches: ['CSE', 'IT', 'ECE', 'EEE', 'Mech'],
      location: 'Pan-India',
      salaryBand: [350_000, 730_000] as [number, number],
    },
    {
      id: 'wipro-elite-nth',
      name: 'Wipro Elite NTH',
      organizer: 'Wipro',
      registerCloseAt: new Date(Date.now() + 86_400_000 * 12).toISOString(),
      rounds: ['Online test', 'Coding', 'Interview'],
      cgpaCutoff: 6.0,
      branches: ['CSE', 'IT', 'ECE'],
      location: 'Bangalore / Pune / Hyderabad',
      salaryBand: [350_000, 650_000] as [number, number],
    },
    {
      id: 'infosys-infytq',
      name: 'Infosys InfyTQ',
      organizer: 'Infosys',
      registerCloseAt: new Date(Date.now() + 86_400_000 * 18).toISOString(),
      rounds: ['Quiz', 'Coding', 'Interview'],
      cgpaCutoff: 6.5,
      branches: ['CSE', 'IT'],
      location: 'Pan-India',
    },
    {
      id: 'amcat-apr-2026',
      name: 'AmCAT — April slot',
      organizer: 'Aspiring Minds',
      registerCloseAt: new Date(Date.now() + 86_400_000 * 2).toISOString(),
      rounds: ['Aptitude', 'Domain'],
      branches: ['Any'],
      location: 'Bangalore (centre)',
    },
    {
      id: 'capgemini-elite',
      name: 'Capgemini Elite',
      organizer: 'Capgemini',
      registerCloseAt: new Date(Date.now() + 86_400_000 * 25).toISOString(),
      rounds: ['Pseudo-coding', 'Coding', 'Behavioral'],
      cgpaCutoff: 6.0,
      branches: ['CSE', 'IT', 'ECE'],
    },
  ];
}

export function makeFresherHub() {
  return {
    user: { college: 'VIT Vellore', branch: 'CSE', year: 3, cgpa: 8.4 },
    drives: { active: 23, branchFit: 14, filtered: 8 },
    upcomingDeadlines: [
      {
        id: 'tcs-nqt-2026',
        name: 'TCS NQT 2026 — registration closes',
        at: new Date(Date.now() + 86_400_000).toISOString(),
      },
      {
        id: 'wipro-elite-nth',
        name: 'Wipro Elite NTH',
        at: new Date(Date.now() + 86_400_000 * 12).toISOString(),
      },
      {
        id: 'amcat-apr-2026',
        name: 'AmCAT next slot',
        at: new Date(Date.now() + 86_400_000 * 2).toISOString(),
      },
    ],
    aptitude: [
      { topic: 'Quantitative', mastery: 67 },
      { topic: 'Logical', mastery: 78 },
      { topic: 'Verbal', mastery: 54 },
      { topic: 'Coding', mastery: 71 },
    ],
    vault: {
      portalsReady: ['TCS NQT', 'Wipro NTH', 'AmCAT', 'Naukri Campus'],
      fieldsParsed: 47,
    },
    hrFluency: { level: 'B2', commonSlips: ['tense agreement', 'articles', 'word stress'] },
    cohort: { id: 'coh-1', name: 'VIT 2026 batch', members: 5, offers: 2 },
  };
}
