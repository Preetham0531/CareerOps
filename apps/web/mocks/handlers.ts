/**
 * Day 7 handlers — superset of Day 6.
 *
 * To swap into place:
 *   mv apps/web/mocks/handlers.day7.ts apps/web/mocks/handlers.ts
 */

import { http, HttpResponse, delay } from 'msw';

import {
  discover,
  makeDashboard,
  makeDmDraft,
  makeEvidenceData,
  makeParsedResume,
  makeRedFlagsForJob,
  makeReferrerScorecard,
  makeReferrersGraph,
  makeSalaryIntel,
  makeSendQueue,
  makeThreadDetail,
  makeThreads,
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
  // Day 7
  getProfile,
  patchProfile,
  getAccount,
  getDPDP,
  patchConsent,
  getNotifSettings,
  patchNotifSettings,
  getIntegrations,
  toggleIntegration,
  getBilling,
  setPlan,
  makeFresherHub,
  makeFresherDrives,
} from './factories';

export const handlers = [
  // Auth + onboarding
  http.post('/api/auth/otp/send', async () => {
    await delay(400);
    return HttpResponse.json({ ok: true, expiresInSec: 60 });
  }),
  http.post('/api/auth/otp/verify', async ({ request }) => {
    const body = (await request.json()) as { contact: string; code: string };
    await delay(500);
    if (body.code !== '123456' && body.code.length !== 6)
      return HttpResponse.json({ message: 'Invalid OTP' }, { status: 400 });
    return HttpResponse.json({
      ok: true,
      user: { id: 'usr_demo_aman', phone: body.contact, name: 'Aman Bhargav' },
    });
  }),
  http.post('/api/onboarding/parse-resume', async () => {
    await delay(1800);
    return HttpResponse.json(makeParsedResume());
  }),
  http.post('/api/onboarding/step/:step', async () => {
    await delay(250);
    return HttpResponse.json({ ok: true });
  }),

  // Dashboard / Discovery / Apply
  http.get('/api/dashboard', async () => {
    await delay(450);
    return HttpResponse.json(makeDashboard());
  }),
  http.post('/api/discover', async ({ request }) => {
    const body = (await request.json()) as Parameters<typeof discover>[0];
    await delay(350);
    return HttpResponse.json(discover(body));
  }),
  http.post('/api/apply', async ({ request }) => {
    const body = (await request.json()) as { jobId: string };
    await delay(450);
    return HttpResponse.json({
      ok: true,
      applicationId: `app_${body.jobId}_${Date.now()}`,
      tier: 1 as const,
    });
  }),
  http.post('/api/apply/:appId/undo', async () => {
    await delay(200);
    return HttpResponse.json({ ok: true });
  }),

  // Day 5
  http.get('/api/referrers/:jobId', async ({ params }) => {
    await delay(550);
    return HttpResponse.json(makeReferrersGraph(String(params.jobId)));
  }),
  http.get('/api/referrer/:referrerId', async ({ params }) => {
    await delay(300);
    return HttpResponse.json(makeReferrerScorecard(String(params.referrerId)));
  }),
  http.post('/api/dm/draft', async ({ request }) => {
    const body = (await request.json()) as { tone: 'warm' | 'direct' | 'executive' };
    await delay(900);
    return HttpResponse.json(makeDmDraft(body.tone ?? 'warm'));
  }),
  http.post('/api/dm/send', async () => {
    await delay(450);
    return HttpResponse.json({ ok: true, dmId: `dm-${Date.now()}`, status: 'queued' as const });
  }),
  http.get('/api/dm/queue', async () => {
    await delay(250);
    return HttpResponse.json(makeSendQueue());
  }),
  http.get('/api/evidence', async () => {
    await delay(400);
    return HttpResponse.json(makeEvidenceData());
  }),
  http.get('/api/salary', async ({ request }) => {
    const url = new URL(request.url);
    await delay(450);
    return HttpResponse.json(
      makeSalaryIntel(
        url.searchParams.get('company') ?? 'Razorpay',
        url.searchParams.get('role') ?? 'Senior Backend',
      ),
    );
  }),
  http.get('/api/red-flags/:jobId', async ({ params }) => {
    await delay(250);
    return HttpResponse.json(makeRedFlagsForJob(String(params.jobId)));
  }),
  http.get('/api/inbox/threads', async () => {
    await delay(250);
    return HttpResponse.json(makeThreads());
  }),
  http.get('/api/inbox/threads/:id', async ({ params }) => {
    await delay(300);
    return HttpResponse.json(makeThreadDetail(String(params.id)));
  }),

  // Day 6
  http.get('/api/stealth', async () => {
    await delay(200);
    return HttpResponse.json(getStealth());
  }),
  http.patch('/api/stealth', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    await delay(250);
    return HttpResponse.json(patchStealth(body as Parameters<typeof patchStealth>[0]));
  }),
  http.get('/api/interviews', async () => {
    await delay(250);
    return HttpResponse.json(makeInterviews());
  }),
  http.get('/api/interviews/:id', async ({ params }) => {
    await delay(350);
    return HttpResponse.json(makeInterviewPrep(String(params.id)));
  }),
  http.patch('/api/interviews/:id/questions/:qid', async () => {
    await delay(200);
    return HttpResponse.json({ ok: true });
  }),
  http.get('/api/negotiations', async () => {
    await delay(250);
    return HttpResponse.json(makeNegotiations());
  }),
  http.get('/api/negotiations/:id', async () => {
    await delay(300);
    return HttpResponse.json(makeNegotiations()[0]);
  }),
  http.get('/api/dna', async ({ request }) => {
    const url = new URL(request.url);
    const w = (Number(url.searchParams.get('window')) || 90) as 30 | 90 | 180;
    await delay(400);
    return HttpResponse.json(makeDNA(w));
  }),
  http.get('/api/cohorts', async () => {
    await delay(250);
    return HttpResponse.json(makeCohorts());
  }),
  http.get('/api/cohorts/:id', async ({ params }) => {
    await delay(300);
    return HttpResponse.json(makeCohortDetail(String(params.id)));
  }),
  http.get('/api/notifications', async () => {
    await delay(200);
    return HttpResponse.json(getNotifications());
  }),
  http.post('/api/notifications/read', async () => {
    await delay(100);
    return HttpResponse.json(markNotificationsRead());
  }),

  // Day 7 — Settings
  http.get('/api/settings/profile', async () => {
    await delay(200);
    return HttpResponse.json(getProfile());
  }),
  http.patch('/api/settings/profile', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    await delay(250);
    return HttpResponse.json(patchProfile(body as Parameters<typeof patchProfile>[0]));
  }),
  http.get('/api/settings/account', async () => {
    await delay(200);
    return HttpResponse.json(getAccount());
  }),
  http.delete('/api/settings/account', async () => {
    await delay(800);
    return HttpResponse.json({ ok: true, deletedAt: new Date().toISOString() });
  }),
  http.get('/api/settings/dpdp', async () => {
    await delay(250);
    return HttpResponse.json(getDPDP());
  }),
  http.patch('/api/settings/dpdp/consent', async ({ request }) => {
    const body = (await request.json()) as { key: string; granted: boolean };
    await delay(250);
    return HttpResponse.json(patchConsent(body.key, body.granted));
  }),
  http.post('/api/settings/dpdp/export', async () => {
    await delay(800);
    return HttpResponse.json({
      ok: true,
      jobId: `export-${Date.now()}`,
      expectedAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
    });
  }),
  http.get('/api/settings/notifications', async () => {
    await delay(200);
    return HttpResponse.json(getNotifSettings());
  }),
  http.patch('/api/settings/notifications', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    await delay(250);
    return HttpResponse.json(patchNotifSettings(body as Parameters<typeof patchNotifSettings>[0]));
  }),
  http.get('/api/settings/integrations', async () => {
    await delay(250);
    return HttpResponse.json(getIntegrations());
  }),
  http.post('/api/settings/integrations/:id', async ({ params, request }) => {
    const body = (await request.json()) as { action: 'connect' | 'disconnect' };
    await delay(450);
    return HttpResponse.json(toggleIntegration(String(params.id), body.action));
  }),
  http.get('/api/settings/billing', async () => {
    await delay(250);
    return HttpResponse.json(getBilling());
  }),
  http.post('/api/settings/billing/plan', async ({ request }) => {
    const body = (await request.json()) as { planId: 'free' | 'pro' | 'campus' };
    await delay(800);
    return HttpResponse.json(setPlan(body.planId));
  }),

  // Day 7 — Fresher
  http.get('/api/fresher/hub', async () => {
    await delay(300);
    return HttpResponse.json(makeFresherHub());
  }),
  http.get('/api/fresher/drives', async () => {
    await delay(350);
    return HttpResponse.json(makeFresherDrives());
  }),

  // Catch-all
  http.get('/api/*', async () => {
    await delay(200);
    return HttpResponse.json({ stub: true });
  }),
];
