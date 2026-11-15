'use client';

import { useEffect, useState } from 'react';
import { papers } from '../../lib/service-config';

export default function ReadScreen({ go, Button }) {
  const [letter, setLetter] = useState(null);
  const [letters, setLetters] = useState([]);
  const [message, setMessage] = useState('편지를 불러오고 있어요.');
  const [showSupport, setShowSupport] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const supportAccount = process.env.NEXT_PUBLIC_SUPPORT_ACCOUNT || '';
  const kbSupportAccount = process.env.NEXT_PUBLIC_KB_SUPPORT_ACCOUNT || '';

  async function copyAccount(account, bank) {
    try {
      await navigator.clipboard.writeText(account);
      setCopyStatus(`${bank} 계좌번호를 복사했어요!`);
    } catch {
      setCopyStatus('복사하지 못했어요. 계좌번호를 직접 선택해 복사해 주세요.');
    }
  }

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
      setMessage('읽을 편지를 선택해 주세요.');
      return;
    }
    const controller = new AbortController();
    const readJson = async (response) => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data;
    };
    Promise.all([
      fetch('/api/letters/' + encodeURIComponent(id), { signal: controller.signal, cache: 'no-store' }).then(readJson),
      fetch('/api/letters', { signal: controller.signal, cache: 'no-store' }).then(readJson),
    ]).then(([detail, list]) => {
      setLetter(detail.letter);
      // 테스트 기간에는 읽기 화면을 열 때마다 안내합니다.
      setShowSupport(true);
      setLetters(list.letters.filter((item) => item.unlocked));
    }).catch((error) => {
      if (error.name !== 'AbortError') setMessage(error.message || '편지를 불러오지 못했어요.');
    });
    return () => controller.abort();
  }, []);

  const index = letters.findIndex((item) => item.id === letter?.id);
  const moveTo = (item) => window.location.assign('/read?id=' + encodeURIComponent(item.id));
  const paper = papers[letter?.paper] || papers[0];

  return (
    <div className="content">
      <div className="page-heading"><h2>편지 읽기 ✉️</h2></div>
      {letter ? <>
        <article className={'letter-paper ' + paper}>
          <div className="letter-paper-content">
            <b>보낸 사람　{letter.writer}</b>
            <p>{letter.body}</p>
          </div>
        </article>
        {index !== -1 && <div className="letter-navigation" aria-label="편지 이동">
          <button onClick={() => moveTo(letters[index - 1])} disabled={index === 0}>‹ 이전 편지</button>
          <span>{index + 1} / {letters.length}</span>
          <button onClick={() => moveTo(letters[index + 1])} disabled={index === letters.length - 1}>다음 편지 ›</button>
        </div>}
      </> : <div className="info" role="status">{message}</div>}
      <Button secondary onClick={() => go('letters')}>목록으로</Button>
      {showSupport && <div className="overlay" role="presentation">
        <div className="modal support-modal" role="dialog" aria-modal="true" aria-labelledby="support-title" aria-describedby="support-description" onKeyDown={(event) => { if (event.key === 'Escape') setShowSupport(false); }}>
          <div className="support-badge">A LITTLE CHRISTMAS SUPPORT ✨</div>
          <h2 id="support-title">🎄 산타는 선물을 나눠주고,<br/>개발자는 밤을 새웠습니다.</h2>
          <div id="support-description" className="support-message">
            <p>여러분의 크리스마스가 편지로 조금 더 따뜻해졌으면 좋겠어요.</p>
            <p>이 서비스가 마음에 드셨다면, 열심히 양말을 만든 개발자에게 작은 응원을 보내주세요. ☕️</p>
            <p>후원금은 서버 운영과 다음 서비스 제작에 소중히 사용됩니다. 🙇🏻‍♂️<br/>감사합니다.</p>
          </div>
          <div className="support-bank-grid">
            <div className="support-method support-woori">
              <div className="support-method-heading"><span>우리은행</span></div>
              {supportAccount ? <button className="support-account" onClick={() => copyAccount(supportAccount, '우리은행')} aria-label="우리은행 계좌번호 복사"><span>{supportAccount}</span><span aria-hidden="true">⧉</span></button> : <p className="support-unavailable">계좌 안내 준비 중</p>}
            </div>
            <div className="support-method support-kb">
              <div className="support-method-heading"><span>국민은행</span></div>
              {kbSupportAccount ? <button className="support-account" onClick={() => copyAccount(kbSupportAccount, '국민은행')} aria-label="국민은행 계좌번호 복사"><span>{kbSupportAccount}</span><span aria-hidden="true">⧉</span></button> : <p className="support-unavailable">계좌 안내 준비 중</p>}
            </div>
          </div>
          <div className="support-copy-status" role="status">{copyStatus || '계좌번호를 누르면 복사돼요'}</div>
          <div className="support-method support-toss">
            <div className="support-method-heading"><span>토스</span><small>QR 코드로 후원하기</small></div>
            <img className="support-qr" src="/images/support-toss.png" alt="토스 후원 QR 코드" />
          </div>
          <button className="button" autoFocus onClick={() => setShowSupport(false)}>편지 읽기</button>
        </div>
      </div>}
      {letter && <div className="letter-report-row">
        <button className="letter-report" onClick={() => window.location.assign('/report?id=' + encodeURIComponent(letter.id))}>편지 신고하기</button>
      </div>}
    </div>
  );
}
