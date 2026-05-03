import { TopBar } from '@/components/nav/TopBar';

/** Shell B — focused canvas (referral graph, evidence canvas, interview prep). */
export function ShellB({
  title,
  onClose,
  children,
}: {
  title?: string;
  onClose?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar minimal title={title} onClose={onClose} />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
