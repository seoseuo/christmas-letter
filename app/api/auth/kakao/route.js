import { NextResponse } from 'next/server';
import { cookieOptions, randomToken } from '../../../../lib/server/auth';

export async function GET(request) {
  const client = process.env.KAKAO_REST_API_KEY;
  const redirect = process.env.KAKAO_REDIRECT_URI;
  if (!client || !redirect) return NextResponse.json({ error: '카카오 로그인 설정이 필요합니다.' }, { status: 503 });
  const state = randomToken();
  const next = new URL(request.url).searchParams.get('next') === 'write' ? 'write' : 'home';
  const url = new URL('https://kauth.kakao.com/oauth/authorize');
  url.search = new URLSearchParams({ client_id: client, redirect_uri: redirect, response_type: 'code', state }).toString();
  const response = NextResponse.redirect(url);
  response.cookies.set('oauth_state', state, { ...cookieOptions, maxAge: 600 });
  response.cookies.set('oauth_next', next, { ...cookieOptions, maxAge: 600 });
  return response;
}
