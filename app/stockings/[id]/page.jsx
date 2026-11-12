import ChristmasApp from '../../../components/ChristmasApp';
import Screen from '../../../components/screens/VisitScreen';
import { db } from '../../../lib/server/db';
import { uuid } from '../../../lib/server/http';

export async function generateMetadata({ params }) {
  const { id } = await params;
  let nickname;
  if (uuid(id)) {
    try { const result = await db().query('select nickname from public.stockings where id=$1', [id]); nickname = result.rows[0]?.nickname; } catch {}
  }
  const title = nickname ? `${nickname}님의 크리스마스 양말` : '크리스마스 양말에 편지를 담아요';
  const description = '소중한 마음을 담아 따뜻한 편지를 남겨주세요.';
  const base = process.env.KAKAO_REDIRECT_URI ? new URL(process.env.KAKAO_REDIRECT_URI).origin : undefined;
  return { title, description, openGraph: { title, description, ...(base ? { images: [`${base}/icon.png`] } : {}) } };
}
export default function Page() {
  return <ChristmasApp initialPage="visit" Screen={Screen} />;
}
