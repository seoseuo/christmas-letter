import { NextResponse } from 'next/server';
import { currentMember } from '../../../lib/server/auth';
import { db } from '../../../lib/server/db';
import { error, sameOrigin } from '../../../lib/server/http';
export async function DELETE(request) {
 if(!sameOrigin(request))return error('잘못된 요청입니다.',403);
 if(!process.env.KAKAO_ADMIN_KEY)return error('회원 탈퇴 설정이 아직 완료되지 않았어요.',503);
 try {
  const user=await currentMember();if(!user)return error('로그인이 필요합니다.',401);
  const member=await db().query('select kakao_id from public.members where id=$1',[user.id]);
  const body=new URLSearchParams({target_id_type:'user_id',target_id:member.rows[0].kakao_id});
  const response=await fetch('https://kapi.kakao.com/v1/user/unlink',{method:'POST',headers:{Authorization:`KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,'Content-Type':'application/x-www-form-urlencoded'},body,cache:'no-store'});
  if(!response.ok)return error('카카오 연결 해제에 실패했어요. 다시 시도해 주세요.',502);
  await db().query('delete from public.members where id=$1',[user.id]);
  const result=NextResponse.json({ok:true});result.cookies.delete('christmas_session');return result;
 } catch{return error('회원 탈퇴를 완료하지 못했어요. 다시 시도해 주세요.',503)}
}
