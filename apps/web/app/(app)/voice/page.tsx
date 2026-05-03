'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button, Select, toast } from '@careerops/ui';
import type { VoiceLanguage, VoicePersona, VoiceTurn } from '@careerops/api-client';

const LANGUAGES: Array<{ value: VoiceLanguage; label: string }> = [
  { value: 'en-IN', label: 'English (India)' },
  { value: 'hi-IN', label: 'हिन्दी' },
  { value: 'ta-IN', label: 'தமிழ்' },
  { value: 'te-IN', label: 'తెలుగు' },
];

const PERSONAS: Array<{ value: VoicePersona; label: string }> = [
  { value: 'aanya', label: 'Aanya · neutral female' },
  { value: 'vikram', label: 'Vikram · neutral male' },
  { value: 'riya', label: 'Riya · younger female' },
  { value: 'rohit', label: 'Rohit · younger male' },
];

const SAMPLE_PROMPTS = [
  '"Aaj ka summary bata"',
  '"Show me referrals at Razorpay"',
  '"Real salary for L5 SDE at Cred"',
  '"Practice me for tomorrow\'s interview"',
];

export default function VoicePage() {
  const [language, setLanguage] = useState<VoiceLanguage>('en-IN');
  const [persona, setPersona] = useState<VoicePersona>('aanya');
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [history, setHistory] = useState<VoiceTurn[]>([]);

  function startStub() {
    if (listening) return;
    toast.info('Mic permission requested', {
      description:
        'Sprint-2 wires Whisper STT + ElevenLabs TTS. Today this is the surface.',
    });
    setListening(true);

    // Simulate streaming transcript
    const phrases = ['Show me', 'Show me referrals', 'Show me referrals at Razorpay'];
    let i = 0;
    const id = window.setInterval(() => {
      setTranscript(phrases[i] ?? '');
      i++;
      if (i >= phrases.length) {
        window.clearInterval(id);
        window.setTimeout(() => {
          const userTurn: VoiceTurn = {
            id: `t-${Date.now()}`,
            speaker: 'user',
            transcript: phrases[phrases.length - 1]!,
            language,
            at: new Date().toISOString(),
          };
          const agentTurn: VoiceTurn = {
            id: `t-${Date.now() + 1}`,
            speaker: 'agent',
            transcript:
              'Found 3 referrer paths at Razorpay. Top: Priya Krishnan, EM, score 87. Want me to compose a DM?',
            language,
            at: new Date().toISOString(),
          };
          setHistory((h) => [...h, userTurn, agentTurn]);
          setTranscript('');
          setListening(false);
        }, 700);
      }
    }, 700);
  }

  return (
    <div className="container py-10">
      <header className="mb-6">
        <h1 className="font-display text-display-l font-bold text-fg-primary">Voice</h1>
        <p className="mt-2 text-body-m text-fg-secondary">
          Hindi · English · Tamil · Telugu. Push-to-talk default. Sprint-2 wires real audio
          (Whisper STT + ElevenLabs TTS).
        </p>
      </header>

      {/* Big mic + waveform */}
      <section className="rounded-md border border-border-subtle bg-bg-surface p-8 text-center">
        <button
          type="button"
          aria-label={listening ? 'Stop listening' : 'Tap to speak'}
          onClick={startStub}
          className={
            listening
              ? 'mx-auto flex h-24 w-24 items-center justify-center rounded-pill bg-accent text-neutral-950 shadow-xl ring-4 ring-accent/40'
              : 'mx-auto flex h-24 w-24 items-center justify-center rounded-pill bg-brand text-fg-inverse shadow-xl transition-transform hover:scale-105'
          }
        >
          {listening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
        </button>
        <Waveform active={listening} />
        <p className="mt-2 text-body-s text-fg-secondary">
          {listening ? 'Listening…' : 'Tap the mic to speak. Long-press for hands-free mode.'}
        </p>
        {transcript && (
          <p className="mt-4 font-display text-display-s text-fg-primary">"{transcript}"</p>
        )}
      </section>

      {/* Settings */}
      <section className="mt-6 grid gap-3 md:grid-cols-2">
        <Select value={language} onValueChange={(v) => setLanguage(v as VoiceLanguage)}>
          <Select.Trigger><Select.Value /></Select.Trigger>
          <Select.Content>
            {LANGUAGES.map((l) => (
              <Select.Item key={l.value} value={l.value}>
                {l.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
        <Select value={persona} onValueChange={(v) => setPersona(v as VoicePersona)}>
          <Select.Trigger><Select.Value /></Select.Trigger>
          <Select.Content>
            {PERSONAS.map((p) => (
              <Select.Item key={p.value} value={p.value}>
                {p.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </section>

      {/* History */}
      {history.length > 0 && (
        <section
          aria-label="Conversation"
          className="mt-6 rounded-md border border-border-subtle bg-bg-surface p-5"
        >
          <h2 className="mb-3 text-h3 font-semibold text-fg-primary">Conversation</h2>
          <ul className="flex flex-col gap-3">
            {history.map((t) => (
              <li
                key={t.id}
                className={t.speaker === 'user' ? 'text-right' : 'text-left'}
              >
                <span
                  className={
                    t.speaker === 'user'
                      ? 'inline-block max-w-[75%] rounded-md bg-brand px-3 py-2 text-body-s text-fg-inverse'
                      : 'inline-block max-w-[75%] rounded-md bg-bg-raised px-3 py-2 text-body-s text-fg-primary'
                  }
                >
                  {t.transcript}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sample prompts */}
      <section className="mt-6">
        <h2 className="mb-3 text-caption font-semibold uppercase tracking-wide text-fg-muted">
          Try saying
        </h2>
        <ul className="flex flex-wrap gap-2">
          {SAMPLE_PROMPTS.map((s) => (
            <li
              key={s}
              className="rounded-pill border border-border-subtle bg-bg-surface px-3 py-1 text-body-s text-fg-secondary"
            >
              {s}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Waveform({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [bars] = useState(() => Array.from({ length: 32 }));

  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let raf = 0;
    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const cssBrand = getComputedStyle(canvas).color;
      ctx.fillStyle = cssBrand || '#14998D';
      const barWidth = W / bars.length / 2;
      for (let i = 0; i < bars.length; i++) {
        const phase = frame / 8 + i * 0.4;
        const amp = active ? Math.abs(Math.sin(phase)) * (H * 0.7) + 4 : 4;
        const x = i * (barWidth * 2) + barWidth / 2;
        ctx.fillRect(x, H / 2 - amp / 2, barWidth, amp);
      }
      frame++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [active, bars.length]);

  return (
    <canvas
      ref={ref}
      width={320}
      height={48}
      className="mx-auto mt-4 text-brand"
      aria-hidden
    />
  );
}
