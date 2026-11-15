'use client';

export default function LoginScreen({ go, loginTarget, back, Button }) {
  return (
    <div className="content centered login">
      <div className="illustration">☃️ <span>♡</span> 🐈</div>
      <div className="eyebrow">WELCOME!</div>
      <h2>반가워요!<br/>함께 마음을 전해요.</h2>
      <p>카카오로 간편하게 시작하고,<br/>나만의 크리스마스 양말을 만들어보세요.</p>
      <div className="info">ⓘ 같은 카카오 계정으로 로그인하면 이전에 만든 양말을 다시 만날 수 있어요.</div>
      <Button onClick={() => window.location.assign('/api/auth/kakao?next=' + (loginTarget === 'write' ? 'write' : 'home'))}>
        ●　카카오로 시작하기
      </Button>
      <button className="text-link" onClick={() => go('guide')}>서비스 이용 안내</button>
    </div>
  );
}
