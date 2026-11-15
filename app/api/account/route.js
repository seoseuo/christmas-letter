import { NextResponse } from 'next/server';
// The old endpoint physically deleted letters. Keep withdrawal closed until the
// anonymization, soft-delete and recovery flow has been verified end to end.
export async function DELETE() {
 return NextResponse.json({ error: '회원 탈퇴 기능은 안전한 데이터 처리 방식으로 개선 중입니다.' }, { status: 503 });
}
