import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '../../../../../lib/server/db';
import { cookieOptions, hash, randomToken } from '../../../../../lib/server/auth';

export async function GET(request) {
  const url = new URL(request.url);
  const jar = await cookies();
  const fail = () => NextResponse.redirect(new URL('/login?error=auth', url.origin));
  if (!url.searchParams.get('code') || !url.searchParams.get('state') || url.searchParams.get('state') !== jar.get('oauth_state')?.value) return fail();
  try {
    const params = new URLSearchParams({ grant_type: 'authorization_code', client_id: process.env.KAKAO_REST_API_KEY, redirect_uri: process.env.KAKAO_REDIRECT_URI, code: url.searchParams.get('code') });
    if (process.env.KAKAO_CLIENT_SECRET) params.set('client_secret', process.env.KAKAO_CLIENT_SECRET);
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }, body: params, cache: 'no-store' });
    if (!tokenResponse.ok) return fail();
    const token = await tokenResponse.json();
    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', { headers: { Authorization: `Bearer ${token.access_token}` }, cache: 'no-store' });
    if (!userResponse.ok) return fail();
    const user = await userResponse.json();
    if (!user.id) return fail();
    const member = await db().query('insert into public.members (kakao_id) values ($1) on conflict (kakao_id) do update set kakao_id=excluded.kakao_id returning id', [String(user.id)]);
    const session = randomToken();
    await db().query("insert into public.sessions (token_hash, member_id, expires_at) values ($1,$2,now() + interval '7 days')", [hash(session), member.rows[0].id]);
    const target = jar.get('oauth_next')?.value === 'write' ? '/write' : '/home';
    const response = NextResponse.redirect(new URL(target, url.origin));
    response.cookies.set('christmas_session', session, { ...cookieOptions, maxAge: 604800 });
    response.cookies.delete('oauth_state'); response.cookies.delete('oauth_next');
    return response;
  } catch { return fail(); }
}
