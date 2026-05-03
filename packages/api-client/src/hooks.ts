/**
 * Day 7 hooks — adds Settings, Fresher, Voice on top of Day 6.
 *
 * To swap into place:
 *   mv packages/api-client/src/hooks.day7.ts packages/api-client/src/hooks.ts
 */

import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';

import { apiFetch } from './client';
import type {
  AccountInfo,
  ApplyRequest,
  ApplyResponse,
  BillingSnapshot,
  CohortDetail,
  CohortSummary,
  DashboardResponse,
  DiscoverFilters,
  DiscoverResponse,
  DnaResponse,
  DPDPSnapshot,
  DraftDmRequest,
  DraftDmResponse,
  EvidenceResponse,
  FresherDrive,
  FresherHub,
  Integration,
  InterviewPrep,
  InterviewQuestion,
  InterviewSummary,
  Negotiation,
  NotificationItem,
  NotificationSettings,
  ParseResumeResponse,
  RedFlagsForJobResponse,
  ReferrerScorecard,
  ReferrersResponse,
  SalaryIntelResponse,
  SendDmRequest,
  SendDmResponse,
  SendOtpRequest,
  SendOtpResponse,
  SendQueueItem,
  StealthRules,
  StealthSnapshot,
  Thread,
  ThreadDetail,
  UserProfile,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from './schema';

export const queryKeys = {
  dashboard: ['dashboard'] as const,
  discovery: (f: DiscoverFilters) => ['discovery', f] as const,
  referrers: (jobId: string) => ['referrers', jobId] as const,
  referrer: (id: string) => ['referrer', id] as const,
  sendQueue: ['sendQueue'] as const,
  evidence: ['evidence'] as const,
  salary: (c: string, r: string) => ['salary', c, r] as const,
  redFlags: (jobId: string) => ['redFlags', jobId] as const,
  threads: ['threads'] as const,
  thread: (id: string) => ['thread', id] as const,
  applications: ['applications'] as const,
  stealth: ['stealth'] as const,
  interviews: ['interviews'] as const,
  interview: (id: string) => ['interview', id] as const,
  negotiations: ['negotiations'] as const,
  negotiation: (id: string) => ['negotiation', id] as const,
  dna: (window: 30 | 90 | 180) => ['dna', window] as const,
  cohorts: ['cohorts'] as const,
  cohort: (id: string) => ['cohort', id] as const,
  notifications: ['notifications'] as const,
  // Day 7
  profile: ['profile'] as const,
  account: ['account'] as const,
  dpdp: ['dpdp'] as const,
  notifSettings: ['notifSettings'] as const,
  integrations: ['integrations'] as const,
  billing: ['billing'] as const,
  fresherHub: ['fresherHub'] as const,
  fresherDrives: ['fresherDrives'] as const,
} as const;

// (Days 3-6 carry-through)
export function useSendOtp() {
  return useMutation({
    mutationFn: (input: SendOtpRequest) =>
      apiFetch<SendOtpResponse>('/api/auth/otp/send', {
        method: 'POST',
        body: JSON.stringify(input),
      }),
  });
}
export function useVerifyOtp() {
  return useMutation({
    mutationFn: (input: VerifyOtpRequest) =>
      apiFetch<VerifyOtpResponse>('/api/auth/otp/verify', {
        method: 'POST',
        body: JSON.stringify(input),
      }),
  });
}
export function useParseResume() {
  return useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append('file', file);
      return apiFetch<ParseResumeResponse>('/api/onboarding/parse-resume', {
        method: 'POST',
        body: form,
        headers: {},
      });
    },
  });
}
export function useSaveOnboardingStep() {
  return useMutation({
    mutationFn: ({ step, data }: { step: number; data: unknown }) =>
      apiFetch<{ ok: true }>(`/api/onboarding/step/${step}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });
}
export function useDashboard(options?: Partial<UseQueryOptions<DashboardResponse>>) {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: () => apiFetch<DashboardResponse>('/api/dashboard'),
    staleTime: 60_000,
    ...options,
  });
}
export function useDiscover(filters: DiscoverFilters) {
  return useInfiniteQuery({
    queryKey: queryKeys.discovery(filters),
    queryFn: ({ pageParam }) =>
      apiFetch<DiscoverResponse>('/api/discover', {
        method: 'POST',
        body: JSON.stringify({ ...filters, cursor: pageParam ?? null }),
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (last) => last.cursor,
    staleTime: 30_000,
  });
}
export function useApply() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ApplyRequest) =>
      apiFetch<ApplyResponse>('/api/apply', { method: 'POST', body: JSON.stringify(input) }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.applications });
      void qc.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}
export function useUndoApply() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (applicationId: string) =>
      apiFetch<{ ok: true }>(`/api/apply/${applicationId}/undo`, { method: 'POST' }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.applications });
      void qc.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}
export function useReferrers(jobId: string) {
  return useQuery({
    queryKey: queryKeys.referrers(jobId),
    queryFn: () => apiFetch<ReferrersResponse>(`/api/referrers/${jobId}`),
    staleTime: 60_000,
  });
}
export function useReferrer(id: string | null) {
  return useQuery({
    queryKey: id ? queryKeys.referrer(id) : ['referrer-disabled'],
    queryFn: () => apiFetch<ReferrerScorecard>(`/api/referrer/${id}`),
    enabled: !!id,
    staleTime: 60_000,
  });
}
export function useDraftDm() {
  return useMutation({
    mutationFn: (input: DraftDmRequest) =>
      apiFetch<DraftDmResponse>('/api/dm/draft', {
        method: 'POST',
        body: JSON.stringify(input),
      }),
  });
}
export function useSendDm() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: SendDmRequest) =>
      apiFetch<SendDmResponse>('/api/dm/send', {
        method: 'POST',
        body: JSON.stringify(input),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.sendQueue }),
  });
}
export function useSendQueue() {
  return useQuery({
    queryKey: queryKeys.sendQueue,
    queryFn: () => apiFetch<SendQueueItem[]>('/api/dm/queue'),
    staleTime: 30_000,
  });
}
export function useEvidence() {
  return useQuery({
    queryKey: queryKeys.evidence,
    queryFn: () => apiFetch<EvidenceResponse>('/api/evidence'),
    staleTime: 60_000,
  });
}
export function useSalaryIntel(company: string, role: string) {
  return useQuery({
    queryKey: queryKeys.salary(company, role),
    queryFn: () =>
      apiFetch<SalaryIntelResponse>(
        `/api/salary?company=${encodeURIComponent(company)}&role=${encodeURIComponent(role)}`,
      ),
    enabled: !!company && !!role,
    staleTime: 60_000,
  });
}
export function useRedFlagsForJob(jobId: string) {
  return useQuery({
    queryKey: queryKeys.redFlags(jobId),
    queryFn: () => apiFetch<RedFlagsForJobResponse>(`/api/red-flags/${jobId}`),
    enabled: !!jobId,
  });
}
export function useThreads() {
  return useQuery({
    queryKey: queryKeys.threads,
    queryFn: () => apiFetch<Thread[]>('/api/inbox/threads'),
    staleTime: 30_000,
  });
}
export function useThread(threadId: string | null) {
  return useQuery({
    queryKey: threadId ? queryKeys.thread(threadId) : ['thread-disabled'],
    queryFn: () => apiFetch<ThreadDetail>(`/api/inbox/threads/${threadId}`),
    enabled: !!threadId,
  });
}
export function useStealth() {
  return useQuery({
    queryKey: queryKeys.stealth,
    queryFn: () => apiFetch<StealthSnapshot>('/api/stealth'),
    staleTime: 60_000,
  });
}
export function useUpdateStealth() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (rules: Partial<StealthRules>) =>
      apiFetch<StealthSnapshot>('/api/stealth', {
        method: 'PATCH',
        body: JSON.stringify(rules),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.stealth }),
  });
}
export function useInterviews() {
  return useQuery({
    queryKey: queryKeys.interviews,
    queryFn: () => apiFetch<InterviewSummary[]>('/api/interviews'),
    staleTime: 60_000,
  });
}
export function useInterview(id: string | null) {
  return useQuery({
    queryKey: id ? queryKeys.interview(id) : ['interview-disabled'],
    queryFn: () => apiFetch<InterviewPrep>(`/api/interviews/${id}`),
    enabled: !!id,
  });
}
export function useUpdateQuestionStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      interviewId,
      questionId,
      status,
    }: {
      interviewId: string;
      questionId: string;
      status: InterviewQuestion['status'];
    }) =>
      apiFetch<{ ok: true }>(`/api/interviews/${interviewId}/questions/${questionId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
    onSuccess: (_d, vars) =>
      qc.invalidateQueries({ queryKey: queryKeys.interview(vars.interviewId) }),
  });
}
export function useNegotiations() {
  return useQuery({
    queryKey: queryKeys.negotiations,
    queryFn: () => apiFetch<Negotiation[]>('/api/negotiations'),
  });
}
export function useNegotiation(id: string | null) {
  return useQuery({
    queryKey: id ? queryKeys.negotiation(id) : ['negotiation-disabled'],
    queryFn: () => apiFetch<Negotiation>(`/api/negotiations/${id}`),
    enabled: !!id,
  });
}
export function useDNA(window: 30 | 90 | 180 = 90) {
  return useQuery({
    queryKey: queryKeys.dna(window),
    queryFn: () => apiFetch<DnaResponse>(`/api/dna?window=${window}`),
    staleTime: 60_000,
  });
}
export function useCohorts() {
  return useQuery({
    queryKey: queryKeys.cohorts,
    queryFn: () => apiFetch<CohortSummary[]>('/api/cohorts'),
    staleTime: 30_000,
  });
}
export function useCohort(id: string | null) {
  return useQuery({
    queryKey: id ? queryKeys.cohort(id) : ['cohort-disabled'],
    queryFn: () => apiFetch<CohortDetail>(`/api/cohorts/${id}`),
    enabled: !!id,
  });
}
export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications,
    queryFn: () => apiFetch<NotificationItem[]>('/api/notifications'),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}
export function useMarkNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => apiFetch<{ ok: true }>('/api/notifications/read', { method: 'POST' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.notifications }),
  });
}

// ── Day 7 — Settings ─────────────────────────────────────────────────────

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: () => apiFetch<UserProfile>('/api/settings/profile'),
    staleTime: 60_000,
  });
}
export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<UserProfile>) =>
      apiFetch<UserProfile>('/api/settings/profile', {
        method: 'PATCH',
        body: JSON.stringify(patch),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.profile }),
  });
}

export function useAccount() {
  return useQuery({
    queryKey: queryKeys.account,
    queryFn: () => apiFetch<AccountInfo>('/api/settings/account'),
    staleTime: 60_000,
  });
}

export function useDPDP() {
  return useQuery({
    queryKey: queryKeys.dpdp,
    queryFn: () => apiFetch<DPDPSnapshot>('/api/settings/dpdp'),
    staleTime: 30_000,
  });
}
export function useUpdateConsent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: { key: string; granted: boolean }) =>
      apiFetch<DPDPSnapshot>('/api/settings/dpdp/consent', {
        method: 'PATCH',
        body: JSON.stringify(patch),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.dpdp }),
  });
}
export function useRequestDataExport() {
  return useMutation({
    mutationFn: () =>
      apiFetch<{ ok: true; jobId: string; expectedAt: string }>(
        '/api/settings/dpdp/export',
        { method: 'POST' },
      ),
  });
}
export function useDeleteAccount() {
  return useMutation({
    mutationFn: () =>
      apiFetch<{ ok: true; deletedAt: string }>('/api/settings/account', { method: 'DELETE' }),
  });
}

export function useNotificationSettings() {
  return useQuery({
    queryKey: queryKeys.notifSettings,
    queryFn: () => apiFetch<NotificationSettings>('/api/settings/notifications'),
    staleTime: 60_000,
  });
}
export function useUpdateNotificationSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<NotificationSettings>) =>
      apiFetch<NotificationSettings>('/api/settings/notifications', {
        method: 'PATCH',
        body: JSON.stringify(patch),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.notifSettings }),
  });
}

export function useIntegrations() {
  return useQuery({
    queryKey: queryKeys.integrations,
    queryFn: () => apiFetch<Integration[]>('/api/settings/integrations'),
    staleTime: 60_000,
  });
}
export function useToggleIntegration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: 'connect' | 'disconnect' }) =>
      apiFetch<Integration>(`/api/settings/integrations/${id}`, {
        method: 'POST',
        body: JSON.stringify({ action }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.integrations }),
  });
}

export function useBilling() {
  return useQuery({
    queryKey: queryKeys.billing,
    queryFn: () => apiFetch<BillingSnapshot>('/api/settings/billing'),
    staleTime: 60_000,
  });
}
export function useChangePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (planId: 'free' | 'pro' | 'campus') =>
      apiFetch<BillingSnapshot>('/api/settings/billing/plan', {
        method: 'POST',
        body: JSON.stringify({ planId }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.billing }),
  });
}

// ── Day 7 — Fresher ──────────────────────────────────────────────────────

export function useFresherHub() {
  return useQuery({
    queryKey: queryKeys.fresherHub,
    queryFn: () => apiFetch<FresherHub>('/api/fresher/hub'),
    staleTime: 60_000,
  });
}
export function useFresherDrives() {
  return useQuery({
    queryKey: queryKeys.fresherDrives,
    queryFn: () => apiFetch<FresherDrive[]>('/api/fresher/drives'),
    staleTime: 60_000,
  });
}
