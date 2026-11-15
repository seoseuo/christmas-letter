'use client';

export function BackButton() {
  return <button className="legal-back" type="button" onClick={() => {
    if (window.history.length > 1 && document.referrer && new URL(document.referrer).origin === window.location.origin) window.history.back();
    else window.location.assign('/login');
  }}>← 뒤로 가기</button>;
}
