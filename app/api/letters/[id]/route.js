import { NextResponse } from 'next/server';
import { currentMember } from '../../../../lib/server/auth';
import { db } from '../../../../lib/server/db';
import { error, uuid } from '../../../../lib/server/http';
export async function GET(_request, { params }) {
 const { id } = await params; if (!uuid(id)) return error('편지를 찾을 수 없어요.',404);
 try {
  const user=await currentMember(); if(!user)return error('로그인이 필요합니다.',401);
  const result=await db().query(`select l.id,l.writer,l.body,l.paper,l.created_at from public.letters l join public.stockings s on s.id=l.stocking_id where l.id=$1 and s.owner_id=$2 and l.status='ACTIVE' and now() < timestamptz '2027-01-16 00:00:00+09' and exists (select 1 from public.letter_access_grants g where g.stocking_id=s.id and (g.kind='ALL_EARLY' or (g.kind='ALL_CHRISTMAS' and now() >= timestamptz '2026-12-25 00:00:00+09') or (g.kind='SINGLE_EARLY' and g.letter_id=l.id)))`,[id,user.id]);
  if(!result.rows.length)return error('편지를 열람할 수 없어요.',403);
  return NextResponse.json({letter:result.rows[0]},{headers:{'Cache-Control':'private, no-store'}});
 } catch {return error('편지를 불러오지 못했어요.',503)}
}
