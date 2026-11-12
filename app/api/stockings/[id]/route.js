import { NextResponse } from 'next/server';
import { db } from '../../../../lib/server/db';
import { error, uuid } from '../../../../lib/server/http';
export async function GET(_request, { params }) {
  const { id } = await params; if (!uuid(id)) return error('양말을 찾을 수 없어요.', 404);
  try {
    const result = await db().query('select id,nickname,options from public.stockings where id=$1', [id]);
    if (!result.rows.length) return error('양말을 찾을 수 없어요.', 404);
    return NextResponse.json({ stocking: result.rows[0] });
  } catch { return error('양말을 불러오지 못했어요.', 503); }
}
