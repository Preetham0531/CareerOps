import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

/**
 * Day 1 placeholder hero — exists to prove tokens, fonts, theming, and
 * primitive imports are wired correctly. Real marketing surface is built
 * during Day 3 onboarding work.
 */
export default function HomePage() {
  return (
    <main className="aurora-bg min-h-screen">
      <header className="container flex items-center justify-between py-6">
        <span className="font-display text-display-s font-bold tracking-tight text-fg-primary">
          CareerOps
        </span>
        <ThemeToggle />
      </header>

      <section className="container flex flex-col items-start gap-8 py-20 md:py-32">
        <span className="rounded-pill border border-border-subtle bg-bg-surface px-3 py-1 text-caption font-medium text-fg-secondary">
          Planning phase · Day 1 build
        </span>

        <h1 className="max-w-4xl font-display text-display-xl font-bold leading-tight tracking-tight text-fg-primary">
          The job-search agent built for India.
        </h1>

        <p className="max-w-2xl text-body-l leading-body text-fg-secondary">
          Find roles, prove your skills, engineer referrals, and land offers —
          surgically, not by spamming. Free to start. No credit card. DPDP-aligned.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/start"
            className="inline-flex h-12 items-center rounded-md bg-brand px-6 font-semibold text-fg-inverse transition-colors duration-fast ease-standard hover:bg-brand-hover focus-visible:bg-brand-hover"
          >
            Start your search
            <span aria-hidden className="ml-2">›</span>
          </Link>

          <Link
            href="#demo"
            className="inline-flex h-12 items-center px-2 font-medium text-fg-primary underline-offset-4 transition-colors duration-fast hover:text-brand hover:underline"
          >
            Watch 90s demo
          </Link>
        </div>

        <SwatchStrip />
      </section>
    </main>
  );
}

/**
 * Quick visual proof that the palette is wired. Removed in Day 2 once
 * the proper component playground (Storybook) takes over.
 */
function SwatchStrip() {
  const swatches: Array<{ label: string; className: string; text: 'light' | 'dark' }> = [
    { label: 'brand', className: 'bg-brand', text: 'light' },
    { label: 'accent', className: 'bg-accent', text: 'dark' },
    { label: 'success-bg', className: 'bg-success-bg text-success', text: 'light' },
    { label: 'warning-bg', className: 'bg-warning-bg text-warning', text: 'light' },
    { label: 'danger-bg', className: 'bg-danger-bg text-danger', text: 'light' },
    { label: 'bg-raised', className: 'bg-bg-raised', text: 'light' },
  ];

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {swatches.map((s) => (
        <div
          key={s.label}
          className={`flex h-16 w-32 items-end rounded-md p-2 text-caption font-medium ${s.className} ${s.text === 'light' ? 'text-fg-inverse' : 'text-neutral-700'}`}
          title={s.label}
        >
          {s.label}
        </div>
      ))}
    </div>
  );
}
