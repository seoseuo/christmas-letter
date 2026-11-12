import { NextResponse } from 'next/server';
import { currentMember } from '../../../../../lib/server/auth';
import { db } from '../../../../../lib/server/db';
import { error, sameOrigin, uuid } from '../../../../../lib/server/http';
export async function POST(request, { params }) {
  if (!sameOrigin(request)) return error('잘못된 요청입니다.', 403);
  const { id } = await params; if (!uuid(id)) return error('양말을 찾을 수 없어요.', 404);
  if (Date.now() >= Date.parse('2026-12-24T23:00:00+09:00')) return error('편지 접수가 마감되었어요.', 403);
  try {
    const user = await currentMember(); if (!user) return error('로그인이 필요합니다.', 401);
    const { writer, paper, body } = await request.json();
    if (typeof writer !== 'string' || !writer.trim() || writer.trim().length > 20 || typeof body !== 'string' || !body.trim() || body.length > 500 || !Number.isInteger(paper) || paper < 0 || paper > 5) return error('편지 내용을 확인해 주세요.');
    await db().query('insert into public.letters (stocking_id,author_id,writer,paper,body) values ($1,$2,$3,$4,$5)', [id,user.id,writer.trim(),paper,body.trim()]);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch(e) { if(e.code==='23505') return error('이 양말에 이미 편지를 보냈어요.',409); if(e.code==='23503') return error('양말을 찾을 수 없어요.',404); return error('편지를 보내지 못했어요.',503); }
}
