import { NextResponse } from 'next/server';
import { currentMember } from '../../../lib/server/auth';
import { db } from '../../../lib/server/db';
import { error, sameOrigin } from '../../../lib/server/http';
export async function GET() {
  try {
    const user = await currentMember(); if (!user) return error('로그인이 필요합니다.', 401);
    const result = await db().query("select s.id, s.nickname, s.options, count(l.id)::int as letter_count from public.stockings s left join public.letters l on l.stocking_id=s.id and l.status='ACTIVE' where s.owner_id=$1 group by s.id", [user.id]);
    return NextResponse.json({ stocking: result.rows[0] || null });
  } catch { return error('서버 설정을 확인해 주세요.', 503); }
}
export async function POST(request) {
  if (!sameOrigin(request)) return error('잘못된 요청입니다.', 403);
  try {
    const user = await currentMember(); if (!user) return error('로그인이 필요합니다.', 401);
    const { nickname, options } = await request.json();
    if (typeof nickname !== 'string' || !nickname.trim() || nickname.trim().length > 12 || !Array.isArray(options) || options.length !== 4 || !options.every(n => Number.isInteger(n) && n >= 0 && n < 4)) return error('닉네임 또는 꾸미기 설정을 확인해 주세요.');
    const result = await db().query('insert into public.stockings (owner_id,nickname,options) values ($1,$2,$3) returning id,nickname,options', [user.id, nickname.trim(), JSON.stringify(options)]);
    return NextResponse.json({ stocking: result.rows[0] }, { status: 201 });
  } catch (e) { if (e.code === '23505') return error('이미 양말을 만들었어요.', 409); return error('양말을 저장하지 못했어요.', 503); }
}
