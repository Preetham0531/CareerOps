/**
 * /settings root redirects into /settings/profile.
 *
 * To swap into place:
 *   mv "apps/web/app/(app)/settings/page.tsx.day7" "apps/web/app/(app)/settings/page.tsx"
 */
import { redirect } from 'next/navigation';

export default function SettingsRoot() {
  redirect('/settings/profile');
}
