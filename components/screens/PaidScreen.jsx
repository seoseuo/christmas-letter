'use client';

export default function PaidScreen({ art, go, price, agree, setAgree, loginTarget, back, name, setName, opts, setOpts, colors, setModal, title, origin, stockingId, copy, flash, share, letterCount, saved, writer, setWriter, papers, paper, setPaper, message, setMessage, busy, setBusy, product, reason, setReason, Sock, Button }) {
 return (<div className="content centered success"><div className="big-icon">🧦</div><h2>결제 결과 화면</h2><p>실제 결제 없이 둘러보는 예시 화면이에요.</p><div className="info">결제 기능은 아직 준비 중이에요. 실제 결제나 열람권 발급은 이루어지지 않았어요.</div><Button onClick={()=>go('read')}>✉　편지 읽기 화면 보기 →</Button><Button secondary onClick={()=>go('letters')}>편지함으로</Button></div>);
}
