'use client';

import { useEffect, useState } from 'react';
import { papers } from '../../lib/service-config';

export default function ReadScreen({ go, Button }) {
  const [letter, setLetter] = useState(null);
  const [letters, setLetters] = useState([]);
  const [message, setMessage] = useState('편지를 불러오고 있어요.');
  const [showSupport, setShowSupport] = useState(false);

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
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="support-title" aria-describedby="support-description" onKeyDown={(event) => { if (event.key === 'Escape') setShowSupport(false); }}>
          <div className="big-icon" aria-hidden="true">🎁</div>
          <h2 id="support-title">따뜻한 마음을 전해주셔서 감사해요</h2>
          <p id="support-description">이 서비스를 만든 개발자에게 작은 후원으로 응원을 보내주시면 큰 힘이 돼요. 후원은 자유롭게 선택할 수 있어요.</p>
          <button className="button" autoFocus onClick={() => setShowSupport(false)}>편지 읽기</button>
        </div>
      </div>}
      {letter && <div className="letter-report-row">
        <button className="letter-report" onClick={() => window.location.assign('/report?id=' + encodeURIComponent(letter.id))}>편지 신고하기</button>
      </div>}
    </div>
  );
}
