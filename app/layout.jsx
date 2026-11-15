import './globals.css';

export const metadata = {
  title: '크리스마스 양말에 편지를 담아요',
  description: '소중한 사람들과 주고받는 따뜻한 크리스마스 편지',
  ...(process.env.KAKAO_REDIRECT_URI ? { metadataBase: new URL(new URL(process.env.KAKAO_REDIRECT_URI).origin), openGraph: { title: '크리스마스 양말에 편지를 담아요', description: '소중한 마음을 담아 따뜻한 편지를 남겨주세요.', images: ['/icon.png'] } } : {}),
};

export default function RootLayout({ children }) {
  return <html lang="ko"><body>{children}</body></html>;
}
