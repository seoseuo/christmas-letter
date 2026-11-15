import { NextResponse } from 'next/server';
import { db } from '../../../../lib/server/db';
import { cookieOptions, hash, randomToken } from '../../../../lib/server/auth';

export async function POST(request) {
  if (process.env.NODE_ENV !== 'development' || process.env.ENABLE_TEST_LOGIN !== 'true') {
    return NextResponse.json({ error: '사용할 수 없습니다.' }, { status: 404 });
  }
  const origin = request.headers.get('origin');
  if (!origin || !/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin) || request.headers.get('host') !== new URL(origin).host) {
    return NextResponse.json({ error: '로컬에서만 사용할 수 있습니다.' }, { status: 403 });
  }
  try {
    const member = await db().query("select id from public.members where kakao_id = 'test-local-only'");
    if (!member.rowCount) return NextResponse.json({ error: '테스트 사용자를 DB에 먼저 추가해 주세요.' }, { status: 404 });
    const token = randomToken();
    await db().query("insert into public.sessions (token_hash, member_id, expires_at) values ($1,$2,now() + interval '7 days')", [hash(token), member.rows[0].id]);
    const response = NextResponse.json({ ok: true });
    response.cookies.set('christmas_session', token, { ...cookieOptions, maxAge: 604800 });
    return response;
  } catch {
    return NextResponse.json({ error: 'DB 연결 또는 테스트 사용자 설정을 확인해 주세요.' }, { status: 503 });
  }
}
