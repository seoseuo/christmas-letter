'use client';

export default function VisitScreen({ art, go, price, agree, setAgree, loginTarget, back, name, setName, opts, setOpts, colors, setModal, title, origin, stockingId, copy, flash, share, letterCount, saved, writer, setWriter, papers, paper, setPaper, message, setMessage, busy, setBusy, product, reason, setReason, Sock, Button }) {
 return (<div className="content centered visit"><div className="eyebrow">A LETTER FOR YOU</div><h2>{title}의<br/>크리스마스 양말</h2><div className="home-art">{art}<div className="home-trees">🎄　　　　　　 🎄</div></div><h3>따뜻한 편지를 남겨주세요 ✉️</h3><p>응원, 감사, 축하의 마음을 담아<br/>친구에게 편지를 전달할 수 있어요.</p><Button onClick={()=>{go('login',{loginTarget:'write'})}}>✉　편지 남기기　→</Button><div className="info">ⓘ 편지 원문은 양말 주인만 볼 수 있어요.</div><small className="demo"></small></div>);
}
