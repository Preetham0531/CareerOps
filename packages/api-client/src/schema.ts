/**
 * Day 7 schema — superset of Day 6 (full inline copy + Day 7 additions).
 *
 * To swap into place:
 *   mv packages/api-client/src/schema.day7.ts packages/api-client/src/schema.ts
 */

import { z } from 'zod';

// ── Day 3-6 carried (auth, onboarding, jobs, dashboard, discovery, apply) ──

export const SendOtpRequest = z.object({
  contact: z.string().min(4),
  channel: z.enum(['phone', 'email']),
});
export type SendOtpRequest = z.infer<typeof SendOtpRequest>;
export const SendOtpResponse = z.object({ ok: z.literal(true), expiresInSec: z.number() });
export type SendOtpResponse = z.infer<typeof SendOtpResponse>;
export const VerifyOtpRequest = z.object({ contact: z.string(), code: z.string().length(6) });
export type VerifyOtpRequest = z.infer<typeof VerifyOtpRequest>;
export const VerifyOtpResponse = z.object({
  ok: z.literal(true),
  user: z.object({
    id: z.string(),
    email: z.string().optional(),
    phone: z.string().optional(),
    name: z.string().optional(),
  }),
});
export type VerifyOtpResponse = z.infer<typeof VerifyOtpResponse>;
export const ParseResumeResponse = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  currentRole: z.string().optional(),
  currentEmployer: z.string().optional(),
  currentCTC: z.number().optional(),
  skills: z.array(z.string()),
  education: z.string(),
});
export type ParseResumeResponse = z.infer<typeof ParseResumeResponse>;

const Location = z.object({
  city: z.string(),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
});
const SalaryRangeS = z.object({
  min: z.number(),
  max: z.number(),
  currency: z.enum(['INR', 'USD', 'EUR']).default('INR'),
  confidence: z.number(),
});
const BondFlag = z.object({
  reason: z.string(),
  severity: z.enum(['low', 'medium', 'high']),
  durationYears: z.number().optional(),
});
const BenchFlag = z.object({
  reason: z.string(),
  severity: z.enum(['low', 'medium', 'high']),
});
const ReferralPathSummary = z.object({
  count: z.number(),
  top: z.array(z.object({ name: z.string(), avatarSrc: z.string().optional() })),
});

export const Job = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  logoSrc: z.string().optional(),
  location: Location,
  postedAt: z.string(),
  salary: SalaryRangeS.optional(),
  employment: z.enum(['full-time', 'part-time', 'contract', 'internship']),
  experience: z.object({ min: z.number(), max: z.number() }),
  wfh: z.enum(['remote', 'hybrid', 'onsite']).optional(),
  ghostScore: z.number(),
  matchScore: z.number(),
  bondFlag: BondFlag.optional(),
  benchFlag: BenchFlag.optional(),
  referralPath: ReferralPathSummary.optional(),
  excerpt: z.string().optional(),
  source: z.string().optional(),
  perks: z.array(z.string()).optional(),
});
export type Job = z.infer<typeof Job>;

export const DashboardResponse = z.object({
  greeting: z.object({
    user: z.string(),
    timeOfDay: z.enum(['morning', 'afternoon', 'evening', 'late']),
    summary: z.string(),
  }),
  surgicalPicks: z.array(Job).max(3),
  stats: z.object({
    callbackRate: z.object({
      value: z.number(),
      delta: z.number(),
      sparkline: z.array(z.number()),
    }),
    appsThisWeek: z.object({
      count: z.number(),
      trend: z.enum(['up', 'down', 'flat']),
      sparkline: z.array(z.number()),
    }),
    upcomingInterviews: z.object({ count: z.number(), nextAt: z.string().nullable() }),
  }),
  referrerPaths: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      role: z.string(),
      company: z.string(),
      score: z.number(),
      mutualNote: z.string(),
      activity: z.string(),
    }),
  ),
  timeline: z.array(
    z.object({
      date: z.string(),
      applied: z.number(),
      callbacks: z.number(),
      interviews: z.number(),
      offers: z.number(),
    }),
  ),
  companyHealth: z.array(
    z.object({
      company: z.string(),
      trend: z.enum(['improving', 'stable', 'declining']),
      saved: z.boolean(),
      applied: z.boolean(),
    }),
  ),
  dnaInsight: z.object({ quote: z.string(), explainerLink: z.string() }),
});
export type DashboardResponse = z.infer<typeof DashboardResponse>;

export const DiscoverFilters = z.object({
  query: z.string().optional(),
  roles: z.array(z.string()).default([]),
  cities: z.array(z.string()).default([]),
  remoteOnly: z.boolean().default(false),
  lpa: z.tuple([z.number(), z.number()]).default([5, 80]),
  experience: z.tuple([z.number(), z.number()]).default([0, 15]),
  workMode: z.array(z.enum(['remote', 'hybrid', 'onsite'])).default([]),
  sources: z.array(z.string()).default([]),
  hideGhostAbove: z.number().default(1),
  hideBondBench: z.boolean().default(false),
  onlyWithReferral: z.boolean().default(false),
  sort: z.enum(['match', 'newest', 'lpa-desc', 'response-rate']).default('match'),
  cursor: z.string().nullable().default(null),
});
export type DiscoverFilters = z.infer<typeof DiscoverFilters>;
export const DiscoverResponse = z.object({
  items: z.array(Job),
  total: z.number(),
  cursor: z.string().nullable(),
  hidden: z
    .object({ byGhost: z.number(), byBond: z.number(), byCompany: z.number() })
    .optional(),
});
export type DiscoverResponse = z.infer<typeof DiscoverResponse>;

export const ApplyRequest = z.object({
  jobId: z.string(),
  cvVariantId: z.string().optional(),
  coverLetter: z.string().optional(),
});
export type ApplyRequest = z.infer<typeof ApplyRequest>;
export const ApplyResponse = z.object({
  ok: z.literal(true),
  applicationId: z.string(),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  externalUrl: z.string().optional(),
});
export type ApplyResponse = z.infer<typeof ApplyResponse>;

// Day 5 referrers/evidence/salary/red-flags/inbox
export const ReferrerNode = z.object({
  id: z.string(),
  kind: z.enum(['you', 'mutual', 'target-reachable', 'target-unreachable']),
  name: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
  avatarSrc: z.string().optional(),
  score: z.number().optional(),
  position: z.object({ x: z.number(), y: z.number() }),
});
export type ReferrerNode = z.infer<typeof ReferrerNode>;
export const ReferrerEdge = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  strength: z.number(),
  kind: z.enum(['solid', 'dashed']),
  label: z.string().optional(),
});
export type ReferrerEdge = z.infer<typeof ReferrerEdge>;
export const ReferrerScorecard = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  company: z.string(),
  avatarSrc: z.string().optional(),
  linkedinUrl: z.string().optional(),
  score: z.number(),
  breakdown: z.object({
    school: z.number(),
    priorCompany: z.number(),
    mutualStrength: z.number(),
    activity: z.number(),
    tenure: z.number(),
    seniority: z.number(),
  }),
  pathLabel: z.string(),
  recentActivity: z.array(z.string()),
  mutuals: z.array(z.object({ name: z.string(), avatarSrc: z.string().optional() })),
});
export type ReferrerScorecard = z.infer<typeof ReferrerScorecard>;
export const ReferrersResponse = z.object({
  jobId: z.string(),
  jobTitle: z.string(),
  company: z.string(),
  nodes: z.array(ReferrerNode),
  edges: z.array(ReferrerEdge),
  topReferrers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      role: z.string(),
      company: z.string(),
      score: z.number(),
      activityNote: z.string(),
      pathLabel: z.string(),
    }),
  ),
});
export type ReferrersResponse = z.infer<typeof ReferrersResponse>;
export const DraftDmRequest = z.object({
  referrerId: z.string(),
  tone: z.enum(['warm', 'direct', 'executive']).default('warm'),
  jobId: z.string().optional(),
});
export type DraftDmRequest = z.infer<typeof DraftDmRequest>;
export const DraftDmResponse = z.object({
  subject: z.string(),
  body: z.string(),
  personalizationScore: z.number(),
});
export type DraftDmResponse = z.infer<typeof DraftDmResponse>;
export const SendDmRequest = z.object({
  referrerId: z.string(),
  subject: z.string(),
  body: z.string(),
  scheduleAt: z.string().nullable().optional(),
});
export type SendDmRequest = z.infer<typeof SendDmRequest>;
export const SendDmResponse = z.object({
  ok: z.literal(true),
  dmId: z.string(),
  status: z.enum(['queued', 'sent']),
});
export type SendDmResponse = z.infer<typeof SendDmResponse>;
export const SendQueueItem = z.object({
  id: z.string(),
  referrerId: z.string(),
  referrerName: z.string(),
  company: z.string(),
  status: z.enum(['scheduled', 'sent', 'replied', 'no-reply']),
  sentAt: z.string().nullable(),
  scheduledAt: z.string().nullable(),
  replyExcerpt: z.string().optional(),
  engagement: z.number(),
});
export type SendQueueItem = z.infer<typeof SendQueueItem>;

export const Claim = z.object({
  id: z.string(),
  text: z.string(),
  category: z.enum(['lang', 'framework', 'domain', 'tool', 'soft']),
  strength: z.number().min(0).max(5),
  evidenceIds: z.array(z.string()),
});
export type Claim = z.infer<typeof Claim>;
export const Evidence = z.object({
  id: z.string(),
  type: z.enum(['github', 'leetcode', 'kaggle', 'blog', 'talk', 'hackathon', 'cert', 'project', 'manual']),
  title: z.string(),
  description: z.string().optional(),
  url: z.string().optional(),
  date: z.string(),
  metrics: z.record(z.union([z.string(), z.number()])).optional(),
  weight: z.number().default(0.5),
});
export type Evidence = z.infer<typeof Evidence>;
export const EvidenceResponse = z.object({ claims: z.array(Claim), evidence: z.array(Evidence) });
export type EvidenceResponse = z.infer<typeof EvidenceResponse>;

export const SalaryObservation = z.object({
  source: z.enum([
    'levels.fyi',
    'ambitionbox',
    'glassdoor',
    'reddit',
    'recruiter-other',
    'past-employee',
  ]),
  date: z.string(),
  level: z.string().optional(),
  base: z.number(),
  totalCTC: z.number().optional(),
  weight: z.number(),
  notes: z.string().optional(),
});
export type SalaryObservation = z.infer<typeof SalaryObservation>;
export const SalaryIntelResponse = z.object({
  company: z.string(),
  role: z.string(),
  range: z.object({ p10: z.number(), p50: z.number(), p90: z.number(), confidence: z.number() }),
  postedBand: z.tuple([z.number(), z.number()]).nullable(),
  observations: z.array(SalaryObservation),
  components: z.object({
    base: z.tuple([z.number(), z.number()]),
    variable: z.tuple([z.number(), z.number()]),
    esop: z
      .object({ percent: z.number(), cliffYears: z.number(), vestYears: z.number() })
      .optional(),
    joiningBonus: z.tuple([z.number(), z.number()]).optional(),
  }),
  peers: z.array(
    z.object({
      company: z.string(),
      range: z.tuple([z.number(), z.number()]),
      isFocal: z.boolean().default(false),
    }),
  ),
  sources: z.array(
    z.object({
      source: z.string(),
      observations: z.number(),
      weight: z.number(),
      lastUpdated: z.string(),
    }),
  ),
});
export type SalaryIntelResponse = z.infer<typeof SalaryIntelResponse>;

export const RedFlag = z.object({
  type: z.enum(['bond', 'bench', 'bait', 'pyramid', 'night-shift', 'layoff-risk']),
  severity: z.enum(['low', 'medium', 'high']),
  jobId: z.string(),
  company: z.string(),
  detectedAt: z.string(),
  evidence: z.array(
    z.object({
      source: z.enum([
        'jd-keyword',
        'glassdoor-review',
        'reddit-thread',
        'quora-thread',
        'linkedin-pattern',
      ]),
      excerpt: z.string(),
      url: z.string().optional(),
      weight: z.number(),
    }),
  ),
});
export type RedFlag = z.infer<typeof RedFlag>;
export const RedFlagsForJobResponse = z.object({ jobId: z.string(), flags: z.array(RedFlag) });
export type RedFlagsForJobResponse = z.infer<typeof RedFlagsForJobResponse>;

export const Thread = z.object({
  id: z.string(),
  with: z.string(),
  withRole: z.string(),
  withCompany: z.string(),
  unread: z.boolean(),
  lastAt: z.string(),
  preview: z.string(),
});
export type Thread = z.infer<typeof Thread>;
export const Message = z.object({
  id: z.string(),
  threadId: z.string(),
  from: z.enum(['you', 'them']),
  body: z.string(),
  at: z.string(),
});
export type Message = z.infer<typeof Message>;
export const ThreadDetail = z.object({ thread: Thread, messages: z.array(Message) });
export type ThreadDetail = z.infer<typeof ThreadDetail>;

// Day 6 stealth/interview/negotiation/dna/cohort/notifications
export const StealthRules = z.object({
  enabled: z.boolean(),
  hideFromCurrentEmployer: z.boolean(),
  blockRecruiters: z.boolean(),
  pseudonymCV: z.boolean(),
  offHoursOnly: z.boolean(),
  offHoursWindow: z.object({ start: z.string(), end: z.string() }),
  disableLinkedInUpdates: z.boolean(),
  stripEmployerFromCV: z.boolean(),
  pseudonymDescriptor: z.string(),
  blockOAuthEmails: z.boolean(),
  muteWorkHours: z.boolean(),
  pauseDuringWorkHours: z.boolean(),
});
export type StealthRules = z.infer<typeof StealthRules>;
export const StealthSnapshot = z.object({
  rules: StealthRules,
  currentEmployer: z.object({ name: z.string(), domain: z.string() }),
  blockedCompanies: z.array(z.object({ name: z.string(), domain: z.string() })),
  visibilityCheck: z.object({
    at: z.string(),
    verdict: z.enum(['invisible', 'leaks-detected']),
    details: z.string(),
    visibleSignals: z.array(z.string()),
    hiddenSignals: z.array(z.string()),
  }),
  activityLog: z.array(
    z.object({ at: z.string(), event: z.string(), kind: z.enum(['ok', 'warn', 'info']) }),
  ),
});
export type StealthSnapshot = z.infer<typeof StealthSnapshot>;

export const InterviewQuestion = z.object({
  id: z.string(),
  text: z.string(),
  round: z.enum(['dsa', 'sys-design', 'behavioral', 'domain']),
  likelihood: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  source: z.enum(['glassdoor', 'leetcode-tag', 'reddit', 'inferred']),
  status: z.enum(['not-started', 'practiced', 'mastered']),
});
export type InterviewQuestion = z.infer<typeof InterviewQuestion>;
export const InterviewerProfile = z.object({
  name: z.string(),
  role: z.string(),
  company: z.string(),
  tenureYears: z.number(),
  past: z.array(z.object({ company: z.string(), years: z.number() })),
  techFocus: z.array(z.string()),
  inferredStyle: z.string(),
  recentContent: z.array(z.string()),
  mutualTies: z.array(z.string()),
});
export type InterviewerProfile = z.infer<typeof InterviewerProfile>;
export const InterviewPrep = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  scheduledAt: z.string(),
  rounds: z.array(z.enum(['dsa', 'sys-design', 'behavioral', 'domain'])),
  questions: z.array(InterviewQuestion),
  interviewer: InterviewerProfile.optional(),
  notes: z.string(),
});
export type InterviewPrep = z.infer<typeof InterviewPrep>;
export const InterviewSummary = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  scheduledAt: z.string(),
  status: z.enum(['upcoming', 'past']),
});
export type InterviewSummary = z.infer<typeof InterviewSummary>;

export const NegotiationOffer = z.object({
  base: z.number(),
  variable: z.number(),
  joining: z.number(),
  esop: z
    .object({ percent: z.number(), cliffYears: z.number(), vestYears: z.number() })
    .optional(),
  totalCTC: z.number(),
  perks: z.array(z.string()),
});
export type NegotiationOffer = z.infer<typeof NegotiationOffer>;
export const Negotiation = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  status: z.enum(['drafting', 'sent', 'replied', 'accepted', 'walked-away']),
  offer: NegotiationOffer,
  market: z.object({ p10: z.number(), p50: z.number(), p90: z.number(), n: z.number() }),
  target: z.object({
    base: z.tuple([z.number(), z.number()]),
    variable: z.tuple([z.number(), z.number()]),
    joining: z.number(),
    clauses: z.array(z.string()),
  }),
});
export type Negotiation = z.infer<typeof Negotiation>;

export const DnaInsight = z.object({
  id: z.string(),
  text: z.string(),
  effectSize: z.number(),
  confidence: z.number(),
  sampleSize: z.number(),
  category: z.enum(['cv', 'tone', 'time', 'sector', 'channel', 'salary-ask']),
  actionLabel: z.string().optional(),
});
export type DnaInsight = z.infer<typeof DnaInsight>;
export const DnaResponse = z.object({
  windowDays: z.union([z.literal(30), z.literal(90), z.literal(180)]),
  totals: z.object({
    applies: z.number(),
    callbacks: z.number(),
    interviews: z.number(),
    offers: z.number(),
  }),
  primaryInsight: DnaInsight.nullable(),
  moreInsights: z.array(DnaInsight),
  stats: z.object({
    callbackRate: z.object({
      value: z.number(),
      delta: z.number(),
      sparkline: z.array(z.number()),
    }),
    interviewRate: z.object({
      value: z.number(),
      delta: z.number(),
      sparkline: z.array(z.number()),
    }),
    offerRate: z.object({
      value: z.number(),
      delta: z.number(),
      sparkline: z.array(z.number()),
    }),
  }),
  heatmap: z.array(
    z.object({ day: z.number(), hour: z.number(), applies: z.number(), callbacks: z.number() }),
  ),
  cvVariants: z.array(
    z.object({ variant: z.string(), applies: z.number(), callbackRate: z.number() }),
  ),
  letterAngles: z.array(
    z.object({ angle: z.string(), applies: z.number(), callbackRate: z.number() }),
  ),
  funnel: z.array(z.object({ stage: z.string(), count: z.number(), nextRate: z.number() })),
  sectors: z.array(
    z.object({ sector: z.string(), applies: z.number(), callbackRate: z.number() }),
  ),
});
export type DnaResponse = z.infer<typeof DnaResponse>;

export const CohortMember = z.object({
  id: z.string(),
  name: z.string(),
  avatarSrc: z.string().optional(),
  weeklyTarget: z.number(),
  weeklyDone: z.number(),
  isMentor: z.boolean(),
});
export type CohortMember = z.infer<typeof CohortMember>;
export const CohortActivity = z.object({
  id: z.string(),
  at: z.string(),
  actor: z.string(),
  text: z.string(),
});
export type CohortActivity = z.infer<typeof CohortActivity>;
export const CohortSharedJob = z.object({
  id: z.string(),
  sharedBy: z.string(),
  jobTitle: z.string(),
  company: z.string(),
  taggedFor: z.array(z.string()),
  note: z.string().optional(),
});
export type CohortSharedJob = z.infer<typeof CohortSharedJob>;
export const CohortReview = z.object({
  id: z.string(),
  submitter: z.string(),
  variantName: z.string(),
  reviews: z.number(),
  avgRating: z.number(),
  submittedAt: z.string(),
});
export type CohortReview = z.infer<typeof CohortReview>;
export const CohortResearchTopic = z.object({
  id: z.string(),
  topic: z.string(),
  owner: z.string(),
  updatedAt: z.string(),
  notesPreview: z.string(),
});
export type CohortResearchTopic = z.infer<typeof CohortResearchTopic>;
export const CohortSummary = z.object({
  id: z.string(),
  name: z.string(),
  membersCount: z.number(),
  unreadActivity: z.number(),
});
export type CohortSummary = z.infer<typeof CohortSummary>;
export const CohortDetail = z.object({
  id: z.string(),
  name: z.string(),
  members: z.array(CohortMember),
  activity: z.array(CohortActivity),
  sharedJobs: z.array(CohortSharedJob),
  reviews: z.array(CohortReview),
  research: z.array(CohortResearchTopic),
});
export type CohortDetail = z.infer<typeof CohortDetail>;

export const NotificationItem = z.object({
  id: z.string(),
  kind: z.enum([
    'referral_reply',
    'interview_scheduled',
    'offer_received',
    'match_found',
    'digest_summary',
    'system',
  ]),
  title: z.string(),
  body: z.string(),
  at: z.string(),
  read: z.boolean(),
  href: z.string().optional(),
});
export type NotificationItem = z.infer<typeof NotificationItem>;

// ── Day 7 — Settings + Fresher + Voice ─────────────────────────────────

export const UserProfile = z.object({
  id: z.string(),
  name: z.string(),
  pronouns: z.string().optional(),
  avatarSrc: z.string().optional(),
  publicProfile: z.boolean(),
  language: z.enum(['en-IN', 'hi-IN', 'ta-IN', 'te-IN']),
  density: z.enum(['comfortable', 'compact']),
});
export type UserProfile = z.infer<typeof UserProfile>;

export const AccountInfo = z.object({
  email: z.string(),
  emailVerified: z.boolean(),
  phone: z.string(),
  phoneVerified: z.boolean(),
  twoFactorEnabled: z.boolean(),
  activeSessions: z.array(
    z.object({
      id: z.string(),
      device: z.string(),
      lastActive: z.string(),
      current: z.boolean(),
    }),
  ),
});
export type AccountInfo = z.infer<typeof AccountInfo>;

export const ConsentEntry = z.object({
  key: z.string(),
  label: z.string(),
  description: z.string(),
  granted: z.boolean(),
  grantedAt: z.string().nullable(),
  required: z.boolean(),
});
export type ConsentEntry = z.infer<typeof ConsentEntry>;

export const AccessLogEntry = z.object({
  at: z.string(),
  actor: z.string(),
  action: z.string(),
  device: z.string().optional(),
});
export type AccessLogEntry = z.infer<typeof AccessLogEntry>;

export const DPDPSnapshot = z.object({
  dataSummary: z.object({
    identityFields: z.array(z.string()),
    cvFiles: z.number(),
    cvVariants: z.number(),
    networkRead: z.number(),
    activityCount: z.number(),
    voiceAudio: z.number(),
    locationCollected: z.boolean(),
    storageMB: z.number(),
    lastAccessedAt: z.string(),
  }),
  consents: z.array(ConsentEntry),
  accessLog: z.array(AccessLogEntry),
  dpo: z.object({ email: z.string(), grievanceEmail: z.string(), responseSlaDays: z.number() }),
});
export type DPDPSnapshot = z.infer<typeof DPDPSnapshot>;

export const NotificationSettings = z.object({
  channels: z.object({
    email: z.boolean(),
    push: z.boolean(),
    whatsapp: z.boolean(),
    inApp: z.boolean(),
  }),
  categories: z.object({
    referrerReply: z.boolean(),
    interviewReminder: z.boolean(),
    offerReceived: z.boolean(),
    matchFound: z.boolean(),
    cohortActivity: z.boolean(),
    weeklyDigest: z.boolean(),
    monthlyDNA: z.boolean(),
  }),
  quietHours: z.object({ start: z.string(), end: z.string() }),
  digestTime: z.string(),
  muteWorkHours: z.boolean(),
});
export type NotificationSettings = z.infer<typeof NotificationSettings>;

export const Integration = z.object({
  id: z.enum([
    'linkedin',
    'naukri',
    'github',
    'leetcode',
    'kaggle',
    'calendar',
    'email',
    'whatsapp',
    'slack',
  ]),
  label: z.string(),
  description: z.string(),
  status: z.enum(['connected', 'expired', 'error', 'disconnected']),
  lastSync: z.string().nullable(),
  scopes: z.array(z.string()).default([]),
});
export type Integration = z.infer<typeof Integration>;

export const BillingPlan = z.object({
  id: z.enum(['free', 'pro', 'campus']),
  name: z.string(),
  monthlyPriceInr: z.number(),
  yearlyPriceInr: z.number(),
  yearlySavingsInr: z.number(),
  features: z.array(z.string()),
});
export type BillingPlan = z.infer<typeof BillingPlan>;
export const Invoice = z.object({
  id: z.string(),
  date: z.string(),
  description: z.string(),
  amountInr: z.number(),
  status: z.enum(['paid', 'pending', 'failed']),
});
export type Invoice = z.infer<typeof Invoice>;
export const BillingSnapshot = z.object({
  currentPlan: BillingPlan,
  plans: z.array(BillingPlan),
  invoices: z.array(Invoice),
  paymentMethods: z.array(z.string()),
  gstin: z.string().nullable(),
});
export type BillingSnapshot = z.infer<typeof BillingSnapshot>;

export const FresherDrive = z.object({
  id: z.string(),
  name: z.string(),
  organizer: z.string(),
  registerCloseAt: z.string(),
  rounds: z.array(z.string()),
  cgpaCutoff: z.number().optional(),
  branches: z.array(z.string()).optional(),
  location: z.string().optional(),
  salaryBand: z.tuple([z.number(), z.number()]).optional(),
});
export type FresherDrive = z.infer<typeof FresherDrive>;

export const AutofillSection = z.object({
  id: z.string(),
  label: z.string(),
  fields: z.array(z.object({ key: z.string(), label: z.string(), value: z.string() })),
});
export type AutofillSection = z.infer<typeof AutofillSection>;

export const AptitudeProgress = z.object({ topic: z.string(), mastery: z.number() });
export type AptitudeProgress = z.infer<typeof AptitudeProgress>;

export const FresherHub = z.object({
  user: z.object({ college: z.string(), branch: z.string(), year: z.number(), cgpa: z.number() }),
  drives: z.object({ active: z.number(), branchFit: z.number(), filtered: z.number() }),
  upcomingDeadlines: z.array(z.object({ id: z.string(), name: z.string(), at: z.string() })),
  aptitude: z.array(AptitudeProgress),
  vault: z.object({ portalsReady: z.array(z.string()), fieldsParsed: z.number() }),
  hrFluency: z.object({ level: z.string(), commonSlips: z.array(z.string()) }),
  cohort: z.object({ id: z.string(), name: z.string(), members: z.number(), offers: z.number() }),
});
export type FresherHub = z.infer<typeof FresherHub>;

export const VoiceLanguage = z.enum(['en-IN', 'hi-IN', 'ta-IN', 'te-IN']);
export type VoiceLanguage = z.infer<typeof VoiceLanguage>;
export const VoicePersona = z.enum(['aanya', 'vikram', 'riya', 'rohit']);
export type VoicePersona = z.infer<typeof VoicePersona>;
export const VoiceTurn = z.object({
  id: z.string(),
  speaker: z.enum(['user', 'agent']),
  transcript: z.string(),
  language: VoiceLanguage,
  intent: z.string().optional(),
  at: z.string(),
});
export type VoiceTurn = z.infer<typeof VoiceTurn>;
