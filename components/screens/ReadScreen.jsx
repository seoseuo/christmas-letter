'use client';

import { useEffect, useState } from 'react';
import { papers } from '../../lib/service-config';

export default function ReadScreen({ go, Button }) {
  const [letter, setLetter] = useState(null);
  const [letters, setLetters] = useState([]);
  const [message, setMessage] = useState('편지를 불러오고 있어요.');

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
      {letter && <div className="letter-report-row">
        <button className="letter-report" onClick={() => window.location.assign('/report?id=' + encodeURIComponent(letter.id))}>편지 신고하기</button>
      </div>}
    </div>
  );
}
