'use client';

import { useState } from 'react';

export default function LoginScreen({ go, loginTarget, Button, testLoginEnabled }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function testLogin() {
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/auth/test', { method: 'POST' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      window.location.assign(loginTarget === 'write' ? '/write' : '/home');
    } catch (e) { setError(e.message || '테스트 로그인에 실패했어요.'); setBusy(false); }
  }
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
      <p className="login-legal">시작하기 전에 <a href="/terms">이용약관</a> 및 <a href="/privacy">개인정보 처리방침</a>을 확인해 주세요.</p>
      {testLoginEnabled && <Button secondary disabled={busy} onClick={testLogin}>테스트 로그인 (로컬 전용)</Button>}
      {error && <div className="warning" role="alert">{error}</div>}
      <button className="text-link" onClick={() => go('guide')}>서비스 이용 안내</button>
    </div>
  );
}
