import { Providers } from '@/components/Providers';

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="min-h-screen bg-bg-app">{children}</div>
    </Providers>
  );
}
