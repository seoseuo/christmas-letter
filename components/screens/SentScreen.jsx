'use client';

export default function SentScreen({ art, go, price, agree, setAgree, loginTarget, back, name, setName, opts, setOpts, colors, setModal, title, origin, stockingId, copy, flash, share, letterCount, saved, writer, setWriter, papers, paper, setPaper, message, setMessage, busy, setBusy, product, reason, setReason, Sock, Button }) {
 return (<div className="content centered success"><div className="big-icon">💌</div><h2>편지가 무사히<br/>도착했어요!</h2><p>크리스마스에 양말 주인이 읽게 돼요.<br/>따뜻한 마음을 전해주셔서 감사해요.</p><div className="home-art">{art}<div className="home-trees">🎄　　　☃️　　　🎄</div></div><div className="info">따뜻한 마음을 전해주셔서 감사해요.</div><Button onClick={()=>go(saved?'home':'login')}>🧦　나도 양말 만들기　→</Button><Button secondary onClick={()=>go('visit')}>친구 양말로 돌아가기</Button></div>);
}
