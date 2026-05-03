'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { Button, Input, Divider, toast } from '@careerops/ui';
import { useSendOtp, useVerifyOtp } from '@careerops/api-client';

import { useAuth } from '@/lib/auth';
import { useOnboarding } from '@/features/onboarding/store';
import { StepProgress } from '@/components/onboarding/StepProgress';

type Stage = 'enter' | 'otp';

export default function AuthStepPage() {
  const router = useRouter();
  const signIn = useAuth((s) => s.signIn);
  const markCompleted = useOnboarding((s) => s.markCompleted);

  const [stage, setStage] = useState<Stage>('enter');
  const [contact, setContact] = useState('');
  const [code, setCode] = useState('');

  const sendOtp = useSendOtp();
  const verifyOtp = useVerifyOtp();

  const channel: 'phone' | 'email' = contact.includes('@') ? 'email' : 'phone';

  async function handleSend() {
    if (contact.length < 4) {
      toast.error('Enter a phone number or email.');
      return;
    }
    try {
      await sendOtp.mutateAsync({ contact, channel });
      setStage('otp');
      toast.success('OTP sent. Use 123456 in dev mode.');
    } catch {
      toast.error('Could not send OTP. Try again.');
    }
  }

  async function handleVerify() {
    if (code.length !== 6) {
      toast.error('Enter the 6-digit OTP.');
      return;
    }
    try {
      const res = await verifyOtp.mutateAsync({ contact, code });
      signIn(res.user);
      markCompleted(1);
      router.push('/start/persona');
    } catch {
      toast.error('Invalid OTP.');
    }
  }

  function continueWithStub(provider: 'linkedin' | 'google' | 'github') {
    // OAuth stub — in prod opens the provider window. Here we fake success.
    signIn({ id: `usr_${provider}`, name: 'Aman Bhargav', email: 'aman@example.com' });
    markCompleted(1);
    router.push('/start/persona');
  }

  return (
    <main className="container max-w-md py-10">
      <StepProgress current={1} />
      <div className="mt-10 space-y-6">
        <div>
          <h1 className="font-display text-display-l font-bold text-fg-primary">
            Continue your search
          </h1>
          <p className="mt-2 text-body-m text-fg-secondary">
            Phone OTP or email. We never share your contact.
          </p>
        </div>

        {stage === 'enter' ? (
          <>
            <Input
              label={channel === 'phone' ? 'Phone' : 'Email'}
              leadingIcon={channel === 'phone' ? <Phone className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
              placeholder="+91 98XXX XXXXX or you@example.com"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              inputMode={channel === 'phone' ? 'tel' : 'email'}
              autoComplete={channel === 'phone' ? 'tel' : 'email'}
            />
            <Button
              fullWidth
              size="lg"
              loading={sendOtp.isPending}
              onClick={handleSend}
            >
              Continue ›
            </Button>
            <Divider label="OR" />
            <div className="grid gap-2">
              <Button variant="secondary" fullWidth onClick={() => continueWithStub('linkedin')}>
                Continue with LinkedIn
              </Button>
              <Button variant="secondary" fullWidth onClick={() => continueWithStub('google')}>
                Continue with Google
              </Button>
              <Button variant="secondary" fullWidth onClick={() => continueWithStub('github')}>
                Continue with GitHub
              </Button>
            </div>
          </>
        ) : (
          <>
            <Input
              label="6-digit OTP"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
            />
            <Button
              fullWidth
              size="lg"
              loading={verifyOtp.isPending}
              onClick={handleVerify}
            >
              Verify ›
            </Button>
            <button
              type="button"
              onClick={() => setStage('enter')}
              className="w-full text-body-s text-fg-secondary hover:text-fg-primary"
            >
              ← change number
            </button>
          </>
        )}

        <p className="text-caption text-fg-muted">
          By continuing you agree to our DPDP-aligned privacy notice.{' '}
          <Link href="/settings/privacy" className="text-brand underline-offset-4 hover:underline">
            Read it
          </Link>
        </p>
      </div>
    </main>
  );
}
