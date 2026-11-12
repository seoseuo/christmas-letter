import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { currentMember, hash } from '../../../../lib/server/auth';
import { db } from '../../../../lib/server/db';
export async function GET() {
  try { return NextResponse.json({ authenticated: Boolean(await currentMember()) }); }
  catch { return NextResponse.json({ error: '서버 설정을 확인해 주세요.' }, { status: 503 }); }
}
export async function DELETE(request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 403 });
  const jar = await cookies(); const token = jar.get('christmas_session')?.value;
  if (token) await db().query('delete from public.sessions where token_hash=$1', [hash(token)]);
  const response = NextResponse.json({ ok: true }); response.cookies.delete('christmas_session'); return response;
}
