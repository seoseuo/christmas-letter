import 'server-only';
import { createHash, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { db } from './db';

export const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/' };
export const randomToken = () => randomBytes(32).toString('base64url');
export const hash = (value) => createHash('sha256').update(value).digest('hex');
export async function currentMember() {
  const token = (await cookies()).get('christmas_session')?.value;
  if (!token) return null;
  const result = await db().query('select m.id from public.sessions s join public.members m on m.id=s.member_id where s.token_hash=$1 and s.expires_at > now()', [hash(token)]);
  return result.rows[0] || null;
}
