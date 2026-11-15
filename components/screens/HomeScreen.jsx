'use client';

import { useEffect, useState } from 'react';
import { serviceDates } from '../../lib/service-config';

export default function HomeScreen({ art, go, price, agree, setAgree, loginTarget, back, name, setName, opts, setOpts, colors, setModal, title, origin, stockingId, copy, flash, share, letterCount, saved, writer, setWriter, papers, paper, setPaper, message, setMessage, busy, setBusy, product, reason, setReason, Sock, Button }) {
 const [remaining, setRemaining] = useState(null);
 useEffect(() => {
  const update = () => setRemaining(Math.max(0, Math.ceil((Date.parse(serviceDates.opening) - Date.now()) / 1000)));
  update();
  const timer = setInterval(update, 1000);
  return () => clearInterval(timer);
 }, []);
 const days = Math.floor(remaining / 86400);
 const hours = Math.floor((remaining % 86400) / 3600);
 const minutes = Math.floor((remaining % 3600) / 60);
 const seconds = remaining % 60;
 return (<div className="content centered"><div className="capture-card"><div className="eyebrow">MY CHRISTMAS STOCKING</div><h2>{title}의<br/>크리스마스 양말</h2><div className="home-art">{art}<div className="home-trees">🎄　　　　　　 🎄</div></div></div><p>이 화면을 캡처해 친구들에게 공유해 보세요 📸</p><div className="letter-count">✉️　받은 편지 <strong>{letterCount}</strong>통</div><div className="countdown">{remaining === null ? '🎄　크리스마스까지 남은 시간 확인 중' : remaining === 0 ? '🎄　메리 크리스마스! 편지를 열어보세요' : `🎄　2026.12.25 크리스마스까지 ${days}일 ${hours}시 ${minutes}분 ${seconds}초 전`}</div><div className="button-row"><Button secondary onClick={copy} disabled={!stockingId}>공유하기</Button><Button onClick={()=>go('letters')}>내 편지 확인 →</Button></div></div>);
}
