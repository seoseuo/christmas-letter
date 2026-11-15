import { NextResponse } from 'next/server';
import { currentMember } from '../../../lib/server/auth';
import { db } from '../../../lib/server/db';
import { error } from '../../../lib/server/http';
export async function GET() {
 try {
  const user = await currentMember(); if (!user) return error('로그인이 필요합니다.', 401);
  const result = await db().query(`select l.id, l.paper, l.created_at,
   (now() >= timestamptz '2026-12-25 00:00:00+09' or exists (select 1 from public.letter_access_grants g where g.stocking_id=s.id and g.kind='ALL_EARLY')) and now() < timestamptz '2027-01-16 00:00:00+09' as unlocked
   from public.letters l join public.stockings s on s.id=l.stocking_id where s.owner_id=$1 and l.status='ACTIVE' order by l.created_at, l.id`, [user.id]);
  return NextResponse.json({ letters: result.rows });
 } catch { return error('편지 목록을 불러오지 못했어요.',503); }
}
