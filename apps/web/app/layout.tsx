import type { Metadata, Viewport } from 'next';
import './globals.css';
import { fontVariables } from './fonts';
import { themeBootstrapScript } from '@/lib/theme';

export const metadata: Metadata = {
  title: {
    default: 'CareerOps India',
    template: '%s · CareerOps',
  },
  description:
    "India's AI job-search agent. Find roles, prove your skills, engineer referrals, land offers — surgically, not by spamming.",
  applicationName: 'CareerOps India',
  authors: [{ name: 'CareerOps' }],
  generator: 'Next.js',
  keywords: ['jobs', 'India', 'referrals', 'careers', 'naukri', 'linkedin'],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF7' },
    { media: '(prefers-color-scheme: dark)', color: '#07201F' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* No-FOUC theme application — runs before hydration */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
