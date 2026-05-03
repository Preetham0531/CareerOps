import { redirect } from 'next/navigation';

/** /start lands the user at the auth step. */
export default function StartIndex() {
  redirect('/start/auth');
}
