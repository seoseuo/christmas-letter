import { NextResponse } from 'next/server';
import { currentMember } from '../../../../../lib/server/auth';
import { db } from '../../../../../lib/server/db';
import { error, sameOrigin, uuid } from '../../../../../lib/server/http';
export async function POST(request,{params}) {
 if(!sameOrigin(request))return error('잘못된 요청입니다.',403);
 const {id}=await params;if(!uuid(id))return error('편지를 찾을 수 없어요.',404);
 try {
  const user=await currentMember();if(!user)return error('로그인이 필요합니다.',401);
  const {reason}=await request.json();if(!['모욕 / 비방','협박','성적 불쾌감','개인정보 노출','기타'].includes(reason))return error('신고 사유를 선택해 주세요.');
  const result=await db().query(`with hidden as (update public.letters l set status='REPORTED_HIDDEN' from public.stockings s where l.id=$1 and l.stocking_id=s.id and s.owner_id=$2 and l.status='ACTIVE' and now() < timestamptz '2027-01-16 00:00:00+09' and (now() >= timestamptz '2026-12-25 00:00:00+09' or exists (select 1 from public.letter_access_grants g where g.stocking_id=s.id and g.kind='ALL_EARLY')) returning l.id) insert into public.letter_reports(letter_id,reporter_id,reason) select id,$2,$3 from hidden returning id`,[id,user.id,reason]);
  if(!result.rowCount)return error('신고할 수 없는 편지입니다.',403);
  return NextResponse.json({ok:true});
 }catch{return error('신고를 접수하지 못했어요.',503)}
}
